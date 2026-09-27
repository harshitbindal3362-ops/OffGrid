# E-commerce Website: Pages and Features Checklist

A breakdown of what a typical product-selling website includes, split into the customer side, the admin side, and the behind-the-scenes essentials.

---

## 1. Customer-facing pages

- [ ] **Home page**: banners, featured products, categories, offers
- [ ] **Product listing page**: filters (price, category, size, color), sorting, search
- [ ] **Product detail page**: images, description, price, stock status, reviews, size guide, "add to cart"
- [ ] **Cart**: edit quantities, remove items, apply coupon codes
- [ ] **Checkout**: address, shipping method, payment (UPI, cards, COD, etc.)
- [ ] **Order confirmation page**: order number and summary
- [ ] **Login / signup / forgot password**
- [ ] **My account**: profile, saved addresses, wishlist
- [ ] **My orders (order history)**: list of past orders with status, invoice download, and a "track order" option
- [ ] **Order detail page**: items, payment info, delivery status, and buttons for cancel, return, or exchange
- [ ] **Return / exchange request page**: pick the item, select a reason, upload photos if needed, choose refund or exchange
- [ ] **Wishlist**
- [ ] **Static pages**: About, Contact, FAQ, Shipping policy, Return/refund policy, Privacy policy, Terms and conditions

---

## 2. Admin panel

### Dashboard
- Sales today / week / month
- New orders
- Low-stock alerts
- Pending returns
- Top-selling products

### Product management
- Add, edit, and delete products (name, description, images, price, discount, SKU, category)
- Variants (size, color) with separate stock for each
- Availability toggle (in stock / out of stock / hidden / coming soon)
- Bulk upload via CSV or Excel
- Stock quantity management with low-stock alerts

### Category and brand management
- Add, edit, and reorder categories and subcategories

### Order management
- List of all orders with filters (new, processing, shipped, delivered, cancelled, returned)
- Update order status, add tracking number
- Print invoice or shipping label
- Cancel or refund an order
- Order notes

### Returns and exchanges
- View requests, approve or reject with a reason
- Track the return pickup, mark the item as received
- Process a refund or create a replacement order

### Customer management
- Customer list and their order history
- Block or unblock accounts

### Marketing
- Coupons and discount codes
- Banners and homepage sections
- Flash sales
- Email or SMS campaigns

### Reviews and support
- Approve or delete reviews
- Customer queries or support tickets

### Payments and finance
- Transaction list
- Refund status
- Payouts
- Tax (GST) reports

### Reports and analytics
- Sales reports
- Inventory reports
- Customer behavior
- Downloadable as CSV

### Settings
- Store info
- Shipping charges and zones
- Tax rates
- Payment gateway keys
- Email templates
- Staff accounts with roles and permissions (e.g., a "staff" role can process orders but not delete products)

---

## 3. Behind-the-scenes essentials

| Area | What it covers |
|---|---|
| **Security** | HTTPS, password hashing, role-based admin access, protection against SQL injection and XSS |
| **Payment gateway** | Razorpay, Stripe, PayPal, etc. |
| **Notifications** | Order confirmation, shipping, and delivery emails / SMS / WhatsApp |
| **Inventory sync** | Stock reduces automatically when an order is placed and is restored on cancellation or return |
| **Search and SEO** | Clean URLs, meta tags, sitemap |
| **Shipping integration** | Courier APIs for tracking and label generation |
| **Backups and logs** | Track admin actions, keep database backups |
| **Mobile responsiveness** | Most shoppers will be on phones |

---

## 4. Suggested build order

1. **Phase 1 (essentials):** product listing, cart, checkout, order history, admin panel for products and orders
2. **Phase 2:** returns / exchanges, coupons, customer management
3. **Phase 3:** analytics, marketing tools, reviews, support tickets, staff roles
