import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

// Mock wishlist data - replace with real data from your API
const mockWishlist: Product[] = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    images: ['/images/headphones.jpg'],
    category: 'Electronics',
    brand: 'AudioTech',
    stock: 15,
    ratings: 4.5,
    numReviews: 128,
    features: ['Noise Cancellation', '30hr Battery', 'Bluetooth 5.0'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 299.99,
    images: ['/images/smartwatch.jpg'],
    category: 'Electronics',
    brand: 'TechWear',
    stock: 8,
    ratings: 4.2,
    numReviews: 89,
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const Wishlist: React.FC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = React.useState<Product[]>(mockWishlist);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product);
      // Show success notification (handled by cart context)
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item._id !== productId));
    // TODO: Call API to remove from wishlist
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Sign in to view your wishlist</h3>
              <p className="text-gray-600 mt-2">Please log in to save and view your favorite items.</p>
              <Button className="mt-4" onClick={() => window.location.href = '/login'}>
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-600 mt-2">Your saved favorite items</p>
      </div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Your wishlist is empty</h3>
              <p className="text-gray-600 mt-2">Start adding items you love to your wishlist.</p>
              <Button className="mt-4" onClick={() => window.location.href = '/products'}>
                Explore Products
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <Card key={product._id} className="group">
              <CardHeader className="p-4 pb-2">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <img
                    src={product.images[0] || '/images/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {product.description}
                </p>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">
                      {product.ratings} ({product.numReviews})
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveFromWishlist(product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;