import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Trendze</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered shopping platform bringing you the best products with personalized recommendations.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8" data-testid="button-youtube">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="link-all-products">
                    All Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=new">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="link-new-arrivals-footer">
                    New Arrivals
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=trending">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="link-trending">
                    Trending
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?sale=true">
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="link-sale">
                    Sale
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="link-contact">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="link-shipping">
                  Shipping Info
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="link-returns">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-foreground cursor-pointer" data-testid="link-faq">
                  FAQ
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" data-testid="input-newsletter" />
              <Button data-testid="button-subscribe">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Trendze AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}