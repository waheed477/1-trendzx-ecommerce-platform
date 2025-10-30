import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import Filters from "@/components/products/Filters";
import Pagination from "@/components/common/Pagination";
import CartSidebar from "@/components/cart/CartSidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import headphonesImg from '@assets/generated_images/Black_wireless_headphones_product_f97b0eac.png';
import smartwatchImg from '@assets/generated_images/Silver_smartwatch_product_photo_02dd5d6c.png';
import backpackImg from '@assets/generated_images/Navy_laptop_backpack_product_80ff1ba5.png';
import lampImg from '@assets/generated_images/White_minimalist_desk_lamp_adce920c.png';
import walletImg from '@assets/generated_images/Brown_leather_wallet_product_bb04b500.png';
import espressoImg from '@assets/generated_images/Stainless_espresso_machine_product_49a2bc3f.png';

export default function ProductListingPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");

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
    { id: '1', name: 'Premium Wireless Headphones', price: 199.99, quantity: 2, image: headphonesImg }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={2} onCartClick={() => setCartOpen(true)} />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">Showing 24 results</p>
          </div>

          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setMobileFiltersOpen(true)}
              data-testid="button-open-filters"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]" data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            <aside className="hidden md:block w-64 flex-shrink-0">
              <Filters />
            </aside>

            <div className="flex-1 space-y-8">
              <ProductGrid 
                products={mockProducts}
                onAddToCart={(id) => console.log('Add to cart:', id)}
                onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
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

      {mobileFiltersOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-full max-w-sm bg-background border-r z-50 p-6 overflow-y-auto md:hidden">
            <Filters showCloseButton onClose={() => setMobileFiltersOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}
