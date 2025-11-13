import ProductCard from '../products/ProductCard';
import headphonesImg from '@assets/generated_images/Black_wireless_headphones_product_f97b0eac.png';

export default function ProductCardExample() {
  const product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: headphonesImg,
    rating: 4.5,
    reviews: 128,
    category: 'Electronics',
    badge: 'New'
  };

  return (
    <div className="max-w-xs">
      <ProductCard 
        product={product} 
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
      />
    </div>
  );
}

