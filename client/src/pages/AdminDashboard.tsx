import { useState } from "react";
import DashboardStats from "../components/admin/DashboardStats";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { LayoutDashboard, Package, ShoppingCart, Users, Search, Plus } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // todo: remove mock functionality
  const mockOrders = [
    { id: 'ORD-001', customer: 'John Doe', date: '2024-01-15', total: 299.99, status: 'Delivered' },
    { id: 'ORD-002', customer: 'Jane Smith', date: '2024-01-14', total: 499.98, status: 'Shipped' },
    { id: 'ORD-003', customer: 'Bob Johnson', date: '2024-01-13', total: 159.99, status: 'Processing' },
    { id: 'ORD-004', customer: 'Alice Brown', date: '2024-01-12', total: 89.99, status: 'Pending' }
  ];

  const mockProducts = [
    { id: 'PRD-001', name: 'Premium Wireless Headphones', category: 'Electronics', price: 199.99, stock: 45, status: 'Active' },
    { id: 'PRD-002', name: 'Smart Fitness Watch', category: 'Electronics', price: 299.99, stock: 23, status: 'Active' },
    { id: 'PRD-003', name: 'Laptop Backpack', category: 'Accessories', price: 79.99, stock: 0, status: 'Out of Stock' }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Delivered': 'bg-green-500/10 text-green-600',
      'Shipped': 'bg-blue-500/10 text-blue-600',
      'Processing': 'bg-yellow-500/10 text-yellow-600',
      'Pending': 'bg-orange-500/10 text-orange-600',
      'Active': 'bg-green-500/10 text-green-600',
      'Out of Stock': 'bg-red-500/10 text-red-600'
    };
    return colors[status] || '';
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <h1 className="text-xl font-bold">Trendze Admin</h1>
          </div>
          <Button variant="outline" data-testid="button-logout">Logout</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview" className="gap-2" data-testid="tab-overview">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2" data-testid="tab-products">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2" data-testid="tab-admin-orders">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="customers" className="gap-2" data-testid="tab-customers">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
            
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Product Management</h2>
                <Button data-testid="button-add-product">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-10" data-testid="input-search-products" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" data-testid={`button-edit-${product.id}`}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Order Management</h2>
              
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="pl-10" data-testid="input-search-orders" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" data-testid={`button-view-${order.id}`}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Customer Management</h2>
              <p className="text-muted-foreground">Customer management features coming soon.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}