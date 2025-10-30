import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Heart, MapPin } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  // todo: remove mock functionality
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={0} />
      
      <main className="flex-1 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="profile" className="gap-2" data-testid="tab-profile">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2" data-testid="tab-orders">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="gap-2" data-testid="tab-wishlist">
                <Heart className="h-4 w-4" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="addresses" className="gap-2" data-testid="tab-addresses">
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6 max-w-2xl">
                <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={mockUser.name} data-testid="input-profile-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={mockUser.email} data-testid="input-profile-email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue={mockUser.phone} data-testid="input-profile-phone" />
                  </div>
                  <Button type="submit" data-testid="button-save-profile">Save Changes</Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                <p className="text-muted-foreground">No orders yet</p>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                <p className="text-muted-foreground">Your wishlist is empty</p>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Saved Addresses</h2>
                <p className="text-muted-foreground">No saved addresses</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
