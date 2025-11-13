import React from 'react';
import { Product } from '../../types';
import ProductCard from '../products/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface SimilarProductsProps {
  currentProduct: Product;
  maxItems?: number;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ 
  currentProduct, 
  maxItems = 4 
}) => {
  const { data: products, isLoading, error } = useProducts({
    category: currentProduct.category,
    limit: maxItems + 1 // Get one extra to exclude current product
  });

  // Filter out the current product and limit to maxItems
  const similarProducts = products?.filter(product => 
    product._id !== currentProduct._id
  ).slice(0, maxItems);

  if (error) {
    return null; // Don't show anything if there's an error
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Similar Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

  if (!similarProducts || similarProducts.length === 0) {
    return null; // Don't show if no similar products
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Similar Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {similarProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              showAddToCart={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarProducts;