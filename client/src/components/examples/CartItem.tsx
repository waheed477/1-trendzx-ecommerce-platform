import CartItem from '../cart/CartItem';
import headphonesImg from '@assets/generated_images/Black_wireless_headphones_product_f97b0eac.png';

export default function CartItemExample() {
  const item = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    quantity: 2,
    image: headphonesImg
  };

  return (
    <div className="max-w-md">
      <CartItem 
        item={item}
        onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
        onRemove={(id) => console.log('Remove item:', id)}
      />
    </div>
  );
}

