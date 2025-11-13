import { Card } from "../ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  isPositive: boolean;
}

function StatCard({ title, value, change, icon, isPositive }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold" data-testid={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </p>
        <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change} from last month
        </p>
      </div>
    </Card>
  );
}

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue"
        value="$0.00"
        change="+0%"
        icon={<DollarSign className="h-5 w-5" />}
        isPositive={true}
      />
      <StatCard
        title="Total Orders"
        value="0"
        change="+0%"
        icon={<ShoppingCart className="h-5 w-5" />}
        isPositive={true}
      />
      <StatCard
        title="Products"
        value="0"
        change="+0%"
        icon={<Package className="h-5 w-5" />}
        isPositive={true}
      />
      <StatCard
        title="Customers"
        value="0"
        change="+0%"
        icon={<Users className="h-5 w-5" />}
        isPositive={true}
      />
    </div>
  );
}