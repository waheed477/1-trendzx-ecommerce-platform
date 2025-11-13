import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface FiltersProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function Filters({ onClose, showCloseButton = false }: FiltersProps) {
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Decor",
    "Accessories",
    "Sports & Outdoors"
  ];

  const brands = [
    "TechPro",
    "StyleCo",
    "HomeEssentials",
    "ModernLife",
    "SmartGear"
  ];

  return (
    <div className="space-y-6">
      {showCloseButton && (
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-lg font-bold">Filters</h2>
          <Button size="icon" variant="ghost" onClick={onClose} data-testid="button-close-filters">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["category", "price", "rating"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold" data-testid="accordion-category">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} data-testid={`checkbox-${category.toLowerCase()}`} />
                  <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="font-semibold" data-testid="accordion-price">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider defaultValue={[0, 500]} max={1000} step={10} data-testid="slider-price" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="font-semibold" data-testid="accordion-rating">
            Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} data-testid={`checkbox-rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                    {rating}+ Stars
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="font-semibold" data-testid="accordion-brand">
            Brand
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand}`} data-testid={`checkbox-${brand.toLowerCase()}`} />
                  <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="outline" className="w-full" data-testid="button-clear-filters">
        Clear All Filters
      </Button>
    </div>
  );
}