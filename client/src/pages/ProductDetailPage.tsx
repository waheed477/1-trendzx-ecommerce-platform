import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import RecommendationSection from "@/components/ai/RecommendationSection";
import CartSidebar from "@/components/cart/CartSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, ShoppingCart, ChevronRight, Minus, Plus } from "lucide-react";
import headphonesImg from '@assets/generated_images/Black_wireless_headphones_product_f97b0eac.png';
import smartwatchImg from '@assets/generated_images/Silver_smartwatch_product_photo_02dd5d6c.png';
import backpackImg from '@assets/generated_images/Navy_laptop_backpack_product_80ff1ba5.png';
import lampImg from '@assets/generated_images/White_minimalist_desk_lamp_adce920c.png';

export default function ProductDetailPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // todo: remove mock functionality
  const product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    rating: 4.5,
    reviews: 128,
    category: 'Electronics',
    badge: 'New',
    description: 'Experience exceptional sound quality with our premium wireless headphones. Featuring advanced noise cancellation technology, comfortable over-ear design, and up to 30 hours of battery life. Perfect for music lovers, professionals, and travelers alike.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium comfort design',
      'Multi-device connectivity',
      'Built-in microphone',
      'Foldable design'
    ],
    specifications: {
      'Brand': 'TechPro',
      'Model': 'TP-WH3000',
      'Color': 'Matte Black',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '2 years'
    }
  };

  const images = [headphonesImg, headphonesImg, headphonesImg];

  const relatedProducts = [
    { id: '2', name: 'Smart Fitness Watch', price: 299.99, image: smartwatchImg, rating: 4.8, reviews: 256, category: 'Electronics' },
    { id: '3', name: 'Professional Laptop Backpack', price: 79.99, image: backpackImg, rating: 4.3, reviews: 89, category: 'Accessories' },
    { id: '4', name: 'Minimalist Desk Lamp', price: 59.99, image: lampImg, rating: 4.6, reviews: 142, category: 'Home & Decor' }
  ];

  const mockCartItems = [
    { id: '1', name: 'Premium Wireless Headphones', price: 199.99, quantity: 2, image: headphonesImg }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={2} onCartClick={() => setCartOpen(true)} />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/">
              <span className="hover:text-foreground cursor-pointer">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products">
              <span className="hover:text-foreground cursor-pointer">Products</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid="img-main-product"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden bg-muted border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {product.badge && <Badge>{product.badge}</Badge>}
              
              <div>
                <h1 className="text-4xl font-bold mb-2" data-testid="text-product-name">{product.name}</h1>
                <p className="text-muted-foreground">{product.category}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="text-3xl font-bold" data-testid="text-product-price">
                ${product.price.toFixed(2)}
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button size="lg" className="flex-1" data-testid="button-add-to-cart">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                <Button size="icon" variant="outline" className="h-11 w-11" data-testid="button-add-to-wishlist">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Brand:</span>
                  <span className="font-medium">{product.specifications.Brand}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Model:</span>
                  <span className="font-medium">{product.specifications.Model}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Warranty:</span>
                  <span className="font-medium">{product.specifications.Warranty}</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="mb-16">
            <TabsList>
              <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
              <TabsTrigger value="specifications" data-testid="tab-specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4 pt-6">
              <p className="text-muted-foreground">{product.description}</p>
              <div>
                <h3 className="font-semibold mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4 py-3 border-b">
                    <span className="text-muted-foreground min-w-32">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <p className="text-muted-foreground">Customer reviews will be displayed here.</p>
            </TabsContent>
          </Tabs>

          <RecommendationSection 
            products={relatedProducts}
            title="Similar Products"
            onAddToCart={(id) => console.log('Add to cart:', id)}
            onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
          />
        </div>
      </main>

      <Footer />
      
      <CartSidebar
        items={mockCartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
        onRemove={(id) => console.log('Remove item:', id)}
      />
    </div>
  );
}
