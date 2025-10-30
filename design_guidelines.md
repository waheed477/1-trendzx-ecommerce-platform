# Trendze AI Ecommerce Platform - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from successful ecommerce platforms including Shopify's clean product focus, Amazon's trust-building elements, and modern DTC brands' visual appeal. The design prioritizes product discovery, seamless shopping experience, and conversion optimization while incorporating AI-powered recommendations as a differentiating feature.

**Core Principles**:
- Product-first visual hierarchy with large, high-quality imagery
- Trust-building through clear information architecture and social proof
- Frictionless shopping with persistent cart visibility and streamlined checkout
- AI recommendations presented as natural discovery, not intrusive upsells
- Admin dashboard emphasizes data clarity and quick actions

---

## Typography

**Font System** (Google Fonts):
- **Primary**: Inter (400, 500, 600, 700) - Clean, highly legible for UI and body text
- **Accent**: DM Sans (500, 700) - Product titles and headings for visual impact

**Hierarchy**:
- **Hero Headlines**: text-5xl to text-6xl, font-bold, DM Sans
- **Section Headers**: text-3xl to text-4xl, font-bold, DM Sans
- **Product Titles**: text-xl to text-2xl, font-semibold, DM Sans
- **Body Text**: text-base, font-normal, Inter
- **Metadata** (prices, SKUs, labels): text-sm to text-base, font-medium, Inter
- **Microcopy** (badges, tags): text-xs to text-sm, font-medium, Inter

---

## Layout System

**Spacing Primitives**: Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** (e.g., p-4, gap-6, my-12, px-16)

**Container Strategy**:
- Page containers: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Content sections: max-w-6xl mx-auto for narrower focus areas
- Product grids: w-full with responsive column gaps

**Grid Systems**:
- Product grids: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
- Feature sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Admin dashboard: grid-cols-1 lg:grid-cols-3 gap-6 for stats cards
- Cart layout: Two-column split on desktop (8/4 ratio) with items list and summary

**Responsive Breakpoints**:
- Mobile-first approach with progressive enhancement
- Key breakpoints: md: (768px), lg: (1024px), xl: (1280px)

---

## Component Library

### Navigation & Header
- **Main Header**: Sticky top navigation with logo (left), search bar (center, expandable on mobile), cart icon with item count badge, user account menu (right)
- **Category Navigation**: Secondary horizontal menu below header with 6-8 main categories, hover reveals mega-menu with subcategories and featured products
- **Mobile Navigation**: Hamburger menu revealing full-screen overlay with category accordion and user actions
- **Search Bar**: Prominent search with autocomplete dropdown showing product suggestions with thumbnails

### Product Components
- **Product Card**: Vertical layout with 4:5 aspect ratio image, wishlist heart icon (top-right overlay), product title (2-line truncation), price display, star rating with review count, quick "Add to Cart" button on hover (desktop) or always visible (mobile)
- **Product Grid**: Masonry-style layout option for varied image heights, standard grid for consistency
- **Product Detail Page**: Left 60% large image gallery with thumbnails, right 40% product information (title, price, rating/reviews, size/variant selector, quantity input, prominent CTA buttons, accordion for description/specifications/shipping)
- **Filters Sidebar**: Desktop left sidebar with collapsible filter groups (price range slider, category checkboxes, rating filter, brand selection), mobile opens as bottom sheet
- **AI Recommendations**: Horizontal scrollable carousel titled "Recommended for You" with 6-8 product cards, subtle AI badge indicator

### Cart & Checkout
- **Cart Sidebar**: Slide-in panel from right showing mini cart (max 3 items preview), subtotal, "View Cart" and "Checkout" CTAs
- **Cart Page**: Full cart items list with product thumbnail (left), details and quantity controls (center), price and remove action (right), sticky order summary card on right
- **Checkout Form**: Single-page layout with step indicators (Contact → Delivery → Review), form sections with clear labels, COD payment selection with icon and description, order summary card always visible

### User Account
- **Profile Page**: Two-column layout with sidebar menu (Profile, Orders, Wishlist, Addresses) and main content area
- **Order History**: Table/card view toggle, each order card shows order number, date, status badge, item count, total, "View Details" action
- **Order Detail**: Timeline-style status tracker, itemized list with thumbnails, delivery address, payment method, download invoice option

### Admin Dashboard
- **Admin Sidebar**: Fixed left navigation (280px width) with logo, dashboard stats overview, menu items (Dashboard, Products, Orders, Customers, Analytics), current page highlighted
- **Dashboard Stats**: 4-column grid of stat cards showing total revenue, orders, products, customers - each with icon, number (large), label, percentage change indicator
- **Product Management Table**: Data table with sortable columns (Image thumbnail, Name, Category, Price, Stock, Status), inline edit icons, bulk actions checkbox, pagination below
- **Product Form**: Two-column form layout - left for product images (main + gallery upload), right for product details (name, description textarea, category dropdown, pricing, inventory, variants)
- **Order Management**: Filterable table with status badges (Pending, Processing, Shipped, Delivered), order number as clickable link, customer name, date, total, quick status update dropdown

### Common Elements
- **Buttons**: 
  - Primary CTA: px-6 py-3, rounded-lg, font-medium
  - Secondary: Same sizing with outline variant
  - Icon buttons: p-2, rounded-full for actions like wishlist, remove
  - Blurred background buttons over images: backdrop-blur-sm bg-white/20 (no hover states needed)
- **Loading States**: Skeleton screens matching content structure with pulse animation for product cards, forms use spinner overlay
- **Modals**: Center-screen overlay with max-w-lg, rounded-xl, backdrop blur, close button top-right
- **Pagination**: Centered horizontal layout with prev/next arrows, page numbers (show 5 max), active page highlighted
- **Badges**: Rounded-full px-3 py-1 text-xs font-medium for status, discounts, new arrivals
- **Input Fields**: Consistent h-12, px-4, rounded-lg with focus ring, labels above inputs (text-sm font-medium), error states with red border and helper text

---

## Page-Specific Layouts

### Homepage
- **Hero Section**: Full-width 70vh hero with large background image, centered headline (text-5xl), subheading, dual CTAs ("Shop Now" primary, "Learn More" secondary) with backdrop-blur-sm backgrounds
- **Category Showcase**: 3-column grid of category cards with representative images, category name overlay at bottom
- **Featured Products**: "Trending Now" section with 4-column product grid
- **AI Recommendations**: "Picked for You" carousel section with horizontal scroll
- **Trust Indicators**: 4-column grid showing free shipping, secure checkout, easy returns, 24/7 support icons with text
- **Footer**: 4-column layout (About, Shop, Support, Newsletter signup), social icons, payment method icons, copyright

### Product Listing
- **Filter Bar**: Horizontal top bar with "Filter" button (opens sidebar on mobile), "Sort by" dropdown (right), results count (left)
- **Main Content**: Left sidebar filters (desktop only, 280px), right product grid with responsive columns
- **Pagination**: Bottom of grid with "Load More" option or traditional pagination

### Product Detail
- **Breadcrumb**: Top navigation showing Home > Category > Product
- **Main Content**: 60/40 split (image gallery/product info) on desktop, stacked on mobile
- **Below Fold**: Full-width tabs for Reviews, Related Products, Recently Viewed sections

---

## Images

**Hero Images**:
- Homepage: Large lifestyle hero image showing products in use, aspirational setting, 1920x1080 minimum
- Category pages: Smaller banner images (1920x600) representing category aesthetic

**Product Images**:
- Primary product photos: Square format (1:1) or portrait (4:5), white background for consistency, minimum 800x800px
- Lifestyle images: Show products in context, varied compositions
- Detail shots: Close-ups for texture, features, quality

**Image Placement**:
- Homepage hero: Full-width background image with centered content overlay
- Category cards: Background images with gradient overlay for text readability
- Product cards: Prominent centered images, full bleed within card bounds
- Product detail gallery: Main large image with 4-5 thumbnail options below
- Admin product form: Upload area for main image plus gallery (max 5 additional)

**Image Treatment**:
- Consistent aspect ratios across similar content types
- Lazy loading for performance
- Hover zoom on product detail images
- Thumbnail previews in cart and order summaries (80x80px)

---

**Animation Guidance**: Minimal animations limited to micro-interactions - card hover lift (translate-y-1), smooth transitions on tab switches, fade-in for modals. No scroll-triggered animations or complex page transitions to maintain performance and accessibility.