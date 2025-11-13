import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  onCheckout?: () => void;
}

export default function CartSummary({ subtotal, shipping, tax, onCheckout }: CartSummaryProps) {
  const total = subtotal + shipping + tax;

  return (
    <Card className="p-6 space-y-4 sticky top-20">
      <h3 className="font-bold text-lg">Order Summary</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium" data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium" data-testid="text-shipping">
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium" data-testid="text-tax">${tax.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between font-bold text-lg">
          <span>Total</span>
          <span data-testid="text-total">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full" size="lg" onClick={onCheckout} data-testid="button-checkout">
        Proceed to Checkout
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Free shipping on orders over $50
      </p>
    </Card>
  );
}