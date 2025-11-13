import { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductGrid from "../components/products/ProductGrid";
import Filters from "../components/products/Filters";
import Pagination from "../components/common/Pagination";
import CartSidebar from "../components/cart/CartSidebar";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Filter } from "lucide-react";

export default function ProductListingPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");

  // Products will be managed by context/API
  const products: any[] = [];
  const cartItems: any[] = [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartItems.length} onCartClick={() => setCartOpen(true)} />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">Showing {products.length} results</p>
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
                products={products}
                onAddToCart={(id) => console.log('Add to cart:', id)}
                onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(products.length / 12)}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <CartSidebar
        items={cartItems}
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileFiltersOpen(false)}
                data-testid="button-close-filters"
              >
                Close
              </Button>
            </div>
            <Filters />
          </div>
        </>
      )}
    </div>
  );
}