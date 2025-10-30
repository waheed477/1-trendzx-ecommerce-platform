import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem, { type CartItemType } from "./CartItem";
import { Link } from "wouter";

interface CartSidebarProps {
  items: CartItemType[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export default function CartSidebar({ 
  items, 
  isOpen, 
  onClose, 
  onUpdateQuantity,
  onRemove 
}: CartSidebarProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
        data-testid="overlay-cart"
      />
      
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-bold text-xl">Shopping Cart ({items.length})</h2>
          <Button size="icon" variant="ghost" onClick={onClose} data-testid="button-close-cart">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={onClose} data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {items.slice(0, 3).map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
              {items.length > 3 && (
                <p className="text-sm text-muted-foreground text-center py-2">
                  +{items.length - 3} more items
                </p>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex items-center justify-between font-bold text-lg">
              <span>Subtotal</span>
              <span data-testid="text-cart-subtotal">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <Link href="/cart">
                <Button variant="outline" className="w-full" onClick={onClose} data-testid="button-view-cart">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout">
                <Button className="w-full" onClick={onClose} data-testid="button-cart-checkout">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
