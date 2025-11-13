import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface ProductSkeletonProps {
  count?: number;
  layout?: 'grid' | 'list';
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ 
  count = 1, 
  layout = 'grid' 
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Card key={index} className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <Skeleton className="aspect-square w-full rounded-lg" />
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-20" />
        </div>
      </CardContent>
    </Card>
  ));

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skeletons}
      </div>
    );
  }

  return <div className="space-y-4">{skeletons}</div>;
};

export default ProductSkeleton;