import RecommendationSection from '../ai/RecommendationSection';
import headphonesImg from '@assets/generated_images/Black_wireless_headphones_product_f97b0eac.png';
import smartwatchImg from '@assets/generated_images/Silver_smartwatch_product_photo_02dd5d6c.png';
import backpackImg from '@assets/generated_images/Navy_laptop_backpack_product_80ff1ba5.png';
import lampImg from '@assets/generated_images/White_minimalist_desk_lamp_adce920c.png';
import walletImg from '@assets/generated_images/Brown_leather_wallet_product_bb04b500.png';
import espressoImg from '@assets/generated_images/Stainless_espresso_machine_product_49a2bc3f.png';

export default function RecommendationSectionExample() {
  const products = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      image: headphonesImg,
      rating: 4.5,
      reviews: 128,
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 299.99,
      image: smartwatchImg,
      rating: 4.8,
      reviews: 256,
      category: 'Electronics'
    },
    {
      id: '3',
      name: 'Professional Laptop Backpack',
      price: 79.99,
      image: backpackImg,
      rating: 4.3,
      reviews: 89,
      category: 'Accessories'
    },
    {
      id: '4',
      name: 'Minimalist Desk Lamp',
      price: 59.99,
      image: lampImg,
      rating: 4.6,
      reviews: 142,
      category: 'Home & Decor'
    },
    {
      id: '5',
      name: 'Premium Leather Wallet',
      price: 89.99,
      image: walletImg,
      rating: 4.4,
      reviews: 73,
      category: 'Accessories'
    },
    {
      id: '6',
      name: 'Espresso Coffee Machine',
      price: 349.99,
      image: espressoImg,
      rating: 4.7,
      reviews: 198,
      category: 'Home & Kitchen'
    }
  ];

  return (
    <RecommendationSection 
      products={products}
      onAddToCart={(id) => console.log('Add to cart:', id)}
      onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
    />
  );
}

