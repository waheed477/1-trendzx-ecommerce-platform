import CartSummary from '../cart/CartSummary';

export default function CartSummaryExample() {
  return (
    <div className="max-w-sm">
      <CartSummary 
        subtotal={399.98}
        shipping={0}
        tax={32.00}
        onCheckout={() => console.log('Checkout clicked')}
      />
    </div>
  );
}
