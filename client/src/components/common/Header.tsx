import { ShoppingCart, Search, User, Menu, Heart } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartItemCount = 0, onCartClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/">
              <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-lg px-2 py-1 cursor-pointer" data-testid="link-home">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">T</span>
                  </div>
                  <span className="font-bold text-xl hidden sm:inline">Trendze AI</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="hidden md:flex" data-testid="button-wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/login">
              <Button size="icon" variant="ghost" data-testid="button-account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-mobile"
              />
            </div>
            <nav className="flex flex-col gap-2">
              <Link href="/products">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-products-mobile">
                  All Products
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button variant="ghost" className="w-full justify-start" data-testid="link-wishlist-mobile">
                  Wishlist
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>

      <div className="hidden md:block border-t">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <nav className="flex items-center gap-6 h-12">
            <Link href="/products?category=electronics">
              <Button variant="ghost" size="sm" data-testid="link-electronics">
                Electronics
              </Button>
            </Link>
            <Link href="/products?category=fashion">
              <Button variant="ghost" size="sm" data-testid="link-fashion">
                Fashion
              </Button>
            </Link>
            <Link href="/products?category=home">
              <Button variant="ghost" size="sm" data-testid="link-home-decor">
                Home & Decor
              </Button>
            </Link>
            <Link href="/products?category=accessories">
              <Button variant="ghost" size="sm" data-testid="link-accessories">
                Accessories
              </Button>
            </Link>
            <Link href="/products?category=new">
              <Button variant="ghost" size="sm" data-testid="link-new-arrivals">
                New Arrivals
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
