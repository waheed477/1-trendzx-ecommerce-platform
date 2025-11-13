import { useState, useEffect } from "react";
import { Link } from "wouter";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductGrid from "../components/products/ProductGrid";
import RecommendationSection from "../components/ai/RecommendationSection";
import CartSidebar from "../components/cart/CartSidebar";
import ProductSkeleton from "../components/common/ProductSkeleton";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Truck, Shield, RotateCcw, Headphones, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import heroImg from '../../../attached_assets/generated_images/Shopping_lifestyle_hero_image_5344adde.png';
import { useProducts } from "../hooks/useProducts";

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use real products hook - FIXED: Extract products from nested response
  const { data: productsResponse, isLoading, error } = useProducts({ limit: 8 });
  const products = productsResponse?.data?.products || [];
  const cartItems: any[] = [];

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Free Shipping",
      description: "On orders over $50",
      delay: "0"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure Checkout",
      description: "100% secure payment",
      delay: "100"
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-primary" />,
      title: "Easy Returns",
      description: "30-day return policy",
      delay: "200"
    },
    {
      icon: <Headphones className="h-6 w-6 text-primary" />,
      title: "24/7 Support",
      description: "Always here to help",
      delay: "300"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
          <img 
            src={heroImg} 
            alt="Shopping hero" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center">
            <div className={`max-w-2xl space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Trend-Focused Shopping
                </span>
              </div>
               <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Discover Smart Shopping with AI
              </h1>
               <p className="text-lg text-muted-foreground">
                Experience personalized product recommendations powered by AI. Find exactly what you need, when you need it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2 group" data-testid="button-shop-now">
                    Explore Trends
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="backdrop-blur-sm bg-background/20 border-foreground/20 hover:bg-background/30"
                  data-testid="button-learn-more"
                >
                  How It Works
                </Button>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Trendzx Cart?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We bring you the latest trends with cutting-edge technology and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="p-8 text-center space-y-4 card-hover group border-2 border-transparent hover:border-primary/20 transition-all duration-300"
                style={{
                  animationDelay: `${feature.delay}ms`,
                  animation: isVisible ? 'fadeInUp 0.6s ease-out both' : 'none'
                }}
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Recommendations Section */}
        <section className="bg-gradient-to-br from-primary/5 to-purple-100/50 py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-4xl font-bold">Trending Recommendations</h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover products that are trending right now with our intelligent recommendation system
              </p>
            </div>
            
            <RecommendationSection 
              products={products.slice(0, 6)}
              onAddToCart={(id) => console.log('Add to cart:', id)}
              onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
            />
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-4">Hot Right Now</h2>
              <p className="text-xl text-muted-foreground">
                See what's trending and stay ahead of the curve
              </p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="lg" className="gap-2 group" data-testid="button-view-all">
                View All Trends
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <ProductSkeleton count={8} />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Unable to load trends at the moment.</p>
            </div>
          ) : products && products.length > 0 ? (
            <ProductGrid 
              products={products}
              onAddToCart={(id) => console.log('Add to cart:', id)}
              onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No trending products available at the moment.</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="max-w-4xl mx-auto text-center px-4 md:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">Ready to Discover Trends?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of style-savvy customers who trust Trendzx Cart for the latest trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="gap-2 group">
                  Browse Trends
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Join Trendzx
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <CartSidebar
        items={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
        onRemove={(id) => console.log('Remove item:', id)}
      />
    </div>
  );
}