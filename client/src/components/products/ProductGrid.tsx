import ProductCard, { type Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: string[];
}

export default function ProductGrid({ 
  products, 
  onAddToCart, 
  onToggleWishlist,
  wishlistIds = []
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="grid-products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlistIds.includes(product.id)}
        />
      ))}
    </div>
  );
}

