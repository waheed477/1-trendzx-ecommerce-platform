import { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { CreditCard, Wallet } from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Cart items will be managed by context/API
  const cartItems: any[] = [];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order placed with payment method:', paymentMethod);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartItems.length} />
      
      <main className="flex-1 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {cartItems.length === 0 ? (
            <Card className="p-8 text-center">
              <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some products to proceed with checkout</p>
              <Button asChild>
                <a href="/products">Shop Products</a>
              </Button>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required data-testid="input-first-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required data-testid="input-last-name" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required data-testid="input-email" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" required data-testid="input-phone" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" required data-testid="input-address" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required data-testid="input-city" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" required data-testid="input-state" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" required data-testid="input-zip" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover-elevate cursor-pointer">
                          <RadioGroupItem value="cod" id="cod" data-testid="radio-cod" />
                          <Label htmlFor="cod" className="flex-1 cursor-pointer flex items-center gap-3">
                            <Wallet className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Cash on Delivery</p>
                              <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover-elevate cursor-pointer opacity-50">
                          <RadioGroupItem value="card" id="card" disabled data-testid="radio-card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-3">
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Credit/Debit Card</p>
                              <p className="text-sm text-muted-foreground">Coming soon</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </Card>
                </div>

                <div>
                  <Card className="p-6 space-y-6 sticky top-20">
                    <h2 className="text-xl font-bold">Order Summary</h2>

                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <div className="font-medium">${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium" data-testid="text-checkout-subtotal">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium text-green-600">FREE</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between font-bold text-lg">
                        <span>Total</span>
                        <span data-testid="text-checkout-total">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" data-testid="button-place-order">
                      Place Order
                    </Button>
                  </Card>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}