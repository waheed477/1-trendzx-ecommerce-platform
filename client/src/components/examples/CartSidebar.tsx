import CartSidebar from '../cart/CartSidebar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import headphonesImg from '@assets/generated_images/Black_wireless_headphones_product_f97b0eac.png';
import smartwatchImg from '@assets/generated_images/Silver_smartwatch_product_photo_02dd5d6c.png';

export default function CartSidebarExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  const items = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      quantity: 2,
      image: headphonesImg
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 299.99,
      quantity: 1,
      image: smartwatchImg
    }
  ];

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Cart Sidebar</Button>
      <CartSidebar 
        items={items}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onUpdateQuantity={(id, qty) => console.log('Update:', id, qty)}
        onRemove={(id) => console.log('Remove:', id)}
      />
    </div>
  );
}

