import React from 'react';
import { Product } from '../../types';
import ProductCard from '../products/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface RecommendationSectionProps {
  products?: Product[];
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
  title?: string;
  category?: string;
  maxItems?: number;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ 
  products: externalProducts,
  onAddToCart,
  onToggleWishlist,
  title = "Recommended For You",
  category,
  maxItems = 6
}) => {
  // Use external products if provided, otherwise fetch
  const { data: fetchedProductsResponse, isLoading, error } = useProducts({
    category,
    limit: maxItems
  });

  // FIXED: Handle nested API response structure
  const fetchedProducts = fetchedProductsResponse?.data?.products || [];
  const products = externalProducts || fetchedProducts;

  if (error) {
    return null;
  }

  if (isLoading && !externalProducts) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {Array.from({ length: maxItems }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {products.slice(0, maxItems).map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              showAddToCart={true}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationSection;