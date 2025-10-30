import { Link } from "wouter";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import headphonesImg from '@assets/generated_images/Black_wireless_headphones_product_f97b0eac.png';
import smartwatchImg from '@assets/generated_images/Silver_smartwatch_product_photo_02dd5d6c.png';
import backpackImg from '@assets/generated_images/Navy_laptop_backpack_product_80ff1ba5.png';

export default function CartPage() {
  // todo: remove mock functionality
  const mockCartItems = [
    { id: '1', name: 'Premium Wireless Headphones', price: 199.99, quantity: 2, image: headphonesImg },
    { id: '2', name: 'Smart Fitness Watch', price: 299.99, quantity: 1, image: smartwatchImg },
    { id: '3', name: 'Professional Laptop Backpack', price: 79.99, quantity: 1, image: backpackImg }
  ];

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;

  const isEmpty = mockCartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={mockCartItems.length} />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart ({mockCartItems.length})</h1>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add some products to get started
              </p>
              <Link href="/products">
                <Button size="lg" data-testid="button-shop-now">
                  Shop Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-2">
                {mockCartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
                    onRemove={(id) => console.log('Remove item:', id)}
                  />
                ))}
              </div>

              <div>
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  onCheckout={() => console.log('Proceed to checkout')}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
