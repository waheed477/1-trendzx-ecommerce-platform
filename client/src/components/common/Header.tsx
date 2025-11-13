import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Logo from './Logo';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, ShoppingCart, Heart, User, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const { user, logout } = useAuth();
  const { state: cartState } = useCart();
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Calculate cart items count from context
  const actualCartItemCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
  const displayCartCount = cartItemCount !== undefined ? cartItemCount : actualCartItemCount;

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      setLocation('/cart');
    }
  };

  const navigationItems = [
    { label: 'All Products', href: '/products' },
    { label: 'Electronics', href: '/products?category=electronics' },
    { label: 'Clothing', href: '/products?category=clothing' },
    { label: 'Home & Garden', href: '/products?category=home' },
    { label: 'Sports', href: '/products?category=sports' },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="md" showText={true} />
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search trends..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Icon - Mobile only */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {/* Add search functionality */}}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation('/wishlist')}
              title="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="relative"
              title="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {displayCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {displayCartCount}
                </span>
              )}
            </Button>

            {/* User Profile / Auth */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLocation('/profile')}
                  title="Profile"
                >
                  <User className="h-5 w-5" />
                </Button>
                
                {user.role === 'admin' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocation('/admin')}
                  >
                    Admin
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocation('/login')}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => setLocation('/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6 mt-4">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              onClick={() => setLocation(item.href)}
              className="text-sm font-medium"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setLocation(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Mobile Search */}
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search trends..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;