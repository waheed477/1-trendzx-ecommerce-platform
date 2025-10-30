import { db } from "./db";
import { 
  type User, 
  type InsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type Wishlist,
  type InsertWishlist,
  users,
  products,
  cartItems,
  orders,
  orderItems,
  wishlist
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;

  // Product operations
  getProducts(filters?: { category?: string; featured?: boolean }): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Cart operations
  getCartItems(userId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(userId: string): Promise<boolean>;

  // Order operations
  getOrders(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderWithItems(id: string): Promise<{ order: Order; items: OrderItem[] } | undefined>;
  createOrder(order: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;

  // Wishlist operations
  getWishlist(userId: string): Promise<(Wishlist & { product: Product })[]>;
  addToWishlist(item: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(userId: string, productId: string): Promise<boolean>;
  isInWishlist(userId: string, productId: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(user).where(eq(users.id, id)).returning();
    return result[0];
  }

  // Product operations
  async getProducts(filters?: { category?: string; featured?: boolean }): Promise<Product[]> {
    const conditions = [];
    
    if (filters?.category) {
      conditions.push(eq(products.category, filters.category));
    }
    if (filters?.featured !== undefined) {
      conditions.push(eq(products.featured, filters.featured));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(products).where(and(...conditions)).orderBy(desc(products.createdAt));
    }
    
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  // Cart operations
  async getCartItems(userId: string): Promise<(CartItem & { product: Product })[]> {
    const result = await db
      .select()
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId));
    
    return result.map((row: any) => ({
      ...row.cart_items,
      product: row.products!
    }));
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const existing = await db
      .select()
      .from(cartItems)
      .where(and(eq(cartItems.userId, item.userId), eq(cartItems.productId, item.productId)));
    
    if (existing.length > 0) {
      const updated = await db
        .update(cartItems)
        .set({ quantity: existing[0].quantity + item.quantity })
        .where(eq(cartItems.id, existing[0].id))
        .returning();
      return updated[0];
    }
    
    const result = await db.insert(cartItems).values(item).returning();
    return result[0];
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const result = await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id)).returning();
    return result[0];
  }

  async removeFromCart(id: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id)).returning();
    return result.length > 0;
  }

  async clearCart(userId: string): Promise<boolean> {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));
    return true;
  }

  // Order operations
  async getOrders(userId: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async getOrderWithItems(id: string): Promise<{ order: Order; items: OrderItem[] } | undefined> {
    const order = await this.getOrder(id);
    if (!order) return undefined;
    
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
    return { order, items };
  }

  async createOrder(order: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<Order> {
    return await db.transaction(async (tx: any) => {
      const result = await tx.insert(orders).values(order).returning();
      const createdOrder = result[0];
      
      if (items.length > 0) {
        await tx.insert(orderItems).values(
          items.map(item => ({ ...item, orderId: createdOrder.id }))
        );
      }
      
      return createdOrder;
    });
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const result = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return result[0];
  }

  // Wishlist operations
  async getWishlist(userId: string): Promise<(Wishlist & { product: Product })[]> {
    const result = await db
      .select()
      .from(wishlist)
      .leftJoin(products, eq(wishlist.productId, products.id))
      .where(eq(wishlist.userId, userId));
    
    return result.map((row: any) => ({
      ...row.wishlist,
      product: row.products!
    }));
  }

  async addToWishlist(item: InsertWishlist): Promise<Wishlist> {
    const result = await db.insert(wishlist).values(item).returning();
    return result[0];
  }

  async removeFromWishlist(userId: string, productId: string): Promise<boolean> {
    const result = await db
      .delete(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)))
      .returning();
    return result.length > 0;
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const result = await db
      .select()
      .from(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)));
    return result.length > 0;
  }
}

export const storage = new DbStorage();
