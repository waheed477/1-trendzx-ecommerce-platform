import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import RecommendationSection from "@/components/ai/RecommendationSection";
import CartSidebar from "@/components/cart/CartSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import heroImg from '@assets/generated_images/Shopping_lifestyle_hero_image_5344adde.png';
import headphonesImg from '@assets/generated_images/Black_wireless_headphones_product_f97b0eac.png';
import smartwatchImg from '@assets/generated_images/Silver_smartwatch_product_photo_02dd5d6c.png';
import backpackImg from '@assets/generated_images/Navy_laptop_backpack_product_80ff1ba5.png';
import lampImg from '@assets/generated_images/White_minimalist_desk_lamp_adce920c.png';
import walletImg from '@assets/generated_images/Brown_leather_wallet_product_bb04b500.png';
import espressoImg from '@assets/generated_images/Stainless_espresso_machine_product_49a2bc3f.png';

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  
  // todo: remove mock functionality
  const mockProducts = [
    { id: '1', name: 'Premium Wireless Headphones', price: 199.99, image: headphonesImg, rating: 4.5, reviews: 128, category: 'Electronics', badge: 'New' },
    { id: '2', name: 'Smart Fitness Watch', price: 299.99, image: smartwatchImg, rating: 4.8, reviews: 256, category: 'Electronics', badge: 'Trending' },
    { id: '3', name: 'Professional Laptop Backpack', price: 79.99, image: backpackImg, rating: 4.3, reviews: 89, category: 'Accessories' },
    { id: '4', name: 'Minimalist Desk Lamp', price: 59.99, image: lampImg, rating: 4.6, reviews: 142, category: 'Home & Decor' },
    { id: '5', name: 'Premium Leather Wallet', price: 89.99, image: walletImg, rating: 4.4, reviews: 73, category: 'Accessories' },
    { id: '6', name: 'Espresso Coffee Machine', price: 349.99, image: espressoImg, rating: 4.7, reviews: 198, category: 'Home & Kitchen' },
    { id: '7', name: 'Wireless Earbuds Pro', price: 149.99, image: headphonesImg, rating: 4.6, reviews: 312, category: 'Electronics' },
    { id: '8', name: 'Modern Office Chair', price: 279.99, image: lampImg, rating: 4.5, reviews: 156, category: 'Home & Decor' }
  ];

  const mockCartItems = [
    { id: '1', name: 'Premium Wireless Headphones', price: 199.99, quantity: 2, image: headphonesImg },
    { id: '2', name: 'Smart Fitness Watch', price: 299.99, quantity: 1, image: smartwatchImg }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={3} onCartClick={() => setCartOpen(true)} />
      
      <main className="flex-1">
        <section className="relative h-[70vh] overflow-hidden">
          <img 
            src={heroImg} 
            alt="Shopping hero" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/50" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Discover Smart Shopping with AI
              </h1>
              <p className="text-lg text-muted-foreground">
                Experience personalized product recommendations powered by AI. Find exactly what you need, when you need it.
              </p>
              <div className="flex gap-4">
                <Link href="/products">
                  <Button size="lg" data-testid="button-shop-now">
                    Shop Now
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="backdrop-blur-sm bg-background/20" data-testid="button-learn-more">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $50</p>
            </Card>
            <Card className="p-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Secure Checkout</h3>
              <p className="text-sm text-muted-foreground">100% secure payment</p>
            </Card>
            <Card className="p-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">30-day return policy</p>
            </Card>
            <Card className="p-6 text-center space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Always here to help</p>
            </Card>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
          <RecommendationSection 
            products={mockProducts.slice(0, 6)}
            onAddToCart={(id) => console.log('Add to cart:', id)}
            onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
          />
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Link href="/products">
              <Button variant="outline" data-testid="button-view-all">View All</Button>
            </Link>
          </div>
          <ProductGrid 
            products={mockProducts}
            onAddToCart={(id) => console.log('Add to cart:', id)}
            onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
          />
        </section>
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
