import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';
import { cn } from '../../lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true,
  className 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link href="/">
      <div className={cn(
        "flex items-center space-x-2 cursor-pointer",
        className
      )}>
        <div className={cn(
          "bg-primary rounded-lg flex items-center justify-center text-primary-foreground",
          sizeClasses[size]
        )}>
          <ShoppingBag className={cn(sizeClasses[size])} />
        </div>
        {showText && (
          <span className={cn(
            "font-bold text-foreground",
            textSizes[size]
          )}>
            Trendzx Cart
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;