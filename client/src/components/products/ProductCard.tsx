import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Link } from "wouter";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist,
  isInWishlist = false 
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group hover-elevate overflow-visible" data-testid={`card-product-${product.id}`}>
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden rounded-t-lg bg-muted cursor-pointer">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              data-testid={`img-product-${product.id}`}
            />
          </div>
        </Link>
        
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 bg-background/80 backdrop-blur-sm ${
            isInWishlist ? 'text-destructive' : ''
          }`}
          onClick={() => onToggleWishlist?.(product.id)}
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </Button>

        {product.badge && (
          <Badge className="absolute top-2 left-2" data-testid={`badge-${product.badge.toLowerCase()}-${product.id}`}>
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{product.category}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold line-clamp-2 hover:text-primary cursor-pointer" data-testid={`text-name-${product.id}`}>
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground" data-testid={`text-reviews-${product.id}`}>
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold" data-testid={`text-price-${product.id}`}>
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(product.id)}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}