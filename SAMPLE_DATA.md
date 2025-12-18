# 📦 Sample Data for Testing

Use this data to test your e-commerce application after MongoDB is connected.

---

## 👤 Sample User Accounts

### Test User 1:
```
Email: admin@shop.com
Password: admin123
```

### Test User 2:
```
Email: john@example.com
Password: john123
```

### Test User 3:
```
Email: test@test.com
Password: test123
```

---

## 🛍️ Sample Products

### Product 1: Gaming Laptop
```javascript
{
  name: "Gaming Laptop Pro",
  price: 1299.99,
  description: "High-performance gaming laptop with RTX 4060 graphics card, 16GB RAM, and 512GB SSD. Perfect for gaming and content creation.",
  image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500"
}
```

### Product 2: Wireless Headphones
```javascript
{
  name: "Premium Wireless Headphones",
  price: 199.99,
  description: "Noise-cancelling wireless headphones with 30-hour battery life. Crystal clear sound quality and comfortable design.",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
}
```

### Product 3: Smartphone
```javascript
{
  name: "Smartphone X Pro",
  price: 899.99,
  description: "Latest flagship smartphone with 6.7-inch OLED display, 128GB storage, and professional camera system.",
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
}
```

### Product 4: Smart Watch
```javascript
{
  name: "Fitness Smart Watch",
  price: 249.99,
  description: "Advanced fitness tracking smart watch with heart rate monitor, GPS, and 7-day battery life.",
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
}
```

### Product 5: Wireless Mouse
```javascript
{
  name: "Ergonomic Wireless Mouse",
  price: 49.99,
  description: "Comfortable ergonomic wireless mouse with precision tracking and long battery life.",
  image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"
}
```

### Product 6: Mechanical Keyboard
```javascript
{
  name: "RGB Mechanical Keyboard",
  price: 129.99,
  description: "Premium mechanical keyboard with RGB backlighting and customizable keys. Perfect for gaming and typing.",
  image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
}
```

### Product 7: Tablet
```javascript
{
  name: "Pro Tablet 12.9",
  price: 799.99,
  description: "Professional tablet with 12.9-inch display, Apple Pencil support, and powerful performance.",
  image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"
}
```

### Product 8: Webcam
```javascript
{
  name: "4K Webcam Pro",
  price: 149.99,
  description: "Professional 4K webcam with auto-focus and built-in microphone. Perfect for streaming and video calls.",
  image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500"
}
```

### Product 9: External SSD
```javascript
{
  name: "Portable SSD 1TB",
  price: 119.99,
  description: "Ultra-fast portable SSD with 1TB storage. USB-C connection with read speeds up to 1000MB/s.",
  image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500"
}
```

### Product 10: Monitor
```javascript
{
  name: "27-inch 4K Monitor",
  price: 399.99,
  description: "Stunning 27-inch 4K monitor with HDR support and 144Hz refresh rate. Perfect for work and gaming.",
  image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
}
```

---

## 🎯 How to Add Sample Products

### Method 1: Using the UI (Recommended)

1. **Login** to your account
2. Click **"Add Product"** in navbar
3. Copy and paste data from above
4. Click **"Add Product"** button
5. Repeat for each product

### Method 2: Using API (Advanced)

You can use tools like Postman or curl:

```bash
# First, login to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shop.com","password":"admin123"}'

# Copy the token from response

# Then add product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Gaming Laptop Pro",
    "price": 1299.99,
    "description": "High-performance gaming laptop",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500"
  }'
```

---

## 🖼️ More Image URLs

If you want to use different images, here are more Unsplash URLs:

### Electronics:
```
Laptop: https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500
Phone: https://images.unsplash.com/photo-1592286927505-4a9d1222a34d?w=500
Tablet: https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500
Camera: https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500
Speaker: https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500
```

### Accessories:
```
Backpack: https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500
Sunglasses: https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500
Watch: https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500
Shoes: https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500
Bag: https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500
```

### Home & Office:
```
Desk Lamp: https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500
Chair: https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500
Plant: https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500
Book: https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500
Coffee Mug: https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500
```

---

## 🧪 Testing Scenarios

### Scenario 1: Complete User Journey
```
1. Register new account
2. Login with credentials
3. Add 3 products
4. Go to home page
5. Add all 3 products to cart
6. View cart
7. Remove 1 item
8. Check total price
9. Logout
```

### Scenario 2: Multiple Users
```
1. Register User A
2. Login as User A
3. Add 2 products
4. Logout
5. Register User B
6. Login as User B
7. Add 2 different products
8. Both users' products visible on home
```

### Scenario 3: Cart Persistence
```
1. Login
2. Add 3 items to cart
3. Close browser
4. Open browser again
5. Go to cart page
6. Items still there (localStorage)
```

### Scenario 4: Protected Routes
```
1. Without login, try to access /add-product
2. Should redirect to login
3. Login
4. Now can access /add-product
5. Logout
6. Try again - redirected to login
```

---

## 📊 Expected Results

### After Adding All Sample Products:

**Home Page:**
- Grid of 10 products
- Each with image, name, description, price
- "Add to Cart" button on each

**Cart (after adding 3 items):**
```
Gaming Laptop Pro      $1,299.99 x 1 = $1,299.99  [Remove]
Wireless Headphones    $199.99 x 1 = $199.99      [Remove]
Smartphone X Pro       $899.99 x 1 = $899.99      [Remove]

Total: $2,399.97
[Checkout]
```

**Database (MongoDB):**
```
users collection: 3 documents
products collection: 10 documents
```

---

## 🎨 Product Categories (for organization)

You can mentally organize products like this:

**Computers & Laptops:**
- Gaming Laptop Pro
- Pro Tablet 12.9

**Audio:**
- Premium Wireless Headphones

**Mobile Devices:**
- Smartphone X Pro
- Fitness Smart Watch

**Accessories:**
- Ergonomic Wireless Mouse
- RGB Mechanical Keyboard
- 4K Webcam Pro

**Storage:**
- Portable SSD 1TB

**Displays:**
- 27-inch 4K Monitor

---

## 💡 Tips for Testing

1. **Start Small:** Add 2-3 products first to test
2. **Use Real Images:** Unsplash URLs work great
3. **Vary Prices:** Test with different price ranges
4. **Test Cart:** Add multiple quantities of same product
5. **Test Logout:** Ensure cart persists after logout
6. **Test Multiple Browsers:** Check localStorage isolation

---

## 🚀 Quick Start Commands

After MongoDB is connected:

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm run dev

# Browser
http://localhost:3000
```

Then:
1. Register: admin@shop.com / admin123
2. Login with same credentials
3. Add products from this file
4. Start shopping!

---

**Happy Testing! 🎉**
