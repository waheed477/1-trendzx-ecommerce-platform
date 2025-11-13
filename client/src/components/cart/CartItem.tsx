import { Minus, Plus, X } from "lucide-react";
import { Button } from "../ui/button";

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b" data-testid={`cart-item-${item.id}`}>
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          data-testid={`img-cart-${item.id}`}
        />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium line-clamp-2" data-testid={`text-name-${item.id}`}>
            {item.name}
          </h4>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 flex-shrink-0"
            onClick={() => onRemove?.(item.id)}
            data-testid={`button-remove-${item.id}`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
              data-testid={`button-decrease-${item.id}`}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.id}`}>
              {item.quantity}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
              data-testid={`button-increase-${item.id}`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <span className="font-bold" data-testid={`text-total-${item.id}`}>
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}