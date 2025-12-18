# 🛒 Simple MERN E-commerce Application

A beginner-friendly e-commerce web application built with MongoDB, Express.js, React, and Node.js.

## 📋 Features

✅ User Authentication (JWT)
- Register new account
- Login with email/password
- Secure password hashing with bcrypt

✅ Product Management
- Add products (logged-in users only)
- View all products
- Product details (name, price, description, image)

✅ Shopping Cart
- Add products to cart
- View cart items
- Remove items from cart
- Calculate total price

✅ Clean UI with Tailwind CSS

---

## 🚀 How to Run This Project

### Prerequisites
Make sure you have installed:
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

The `.env` file is already created in the backend folder. Update it if needed:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_12345
```

**Note:** If using MongoDB Atlas, replace `MONGO_URI` with your connection string.

### Step 3: Start MongoDB

If using local MongoDB:
```bash
mongod
```

### Step 4: Start Backend Server

```bash
cd backend
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
```

### Step 5: Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### Step 6: Start Frontend Development Server

```bash
cd frontend
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:3000/
```

### Step 7: Open in Browser

Visit: **http://localhost:3000**

---

## 🎯 How to Use the Application

### 1. Register a New Account
- Click "Register" in the navbar
- Enter email and password (min 6 characters)
- Click "Register" button
- You'll be redirected to login page

### 2. Login
- Click "Login" in the navbar
- Enter your registered email and password
- Click "Login" button
- You'll be redirected to home page

### 3. Add a Product (Must be logged in)
- Click "Add Product" in the navbar
- Fill in product details:
  - Name: e.g., "Laptop"
  - Price: e.g., 999.99
  - Description: e.g., "High-performance laptop"
  - Image URL: e.g., "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
- Click "Add Product"
- Product will appear on home page

### 4. View Products
- Go to Home page
- All products are displayed in a grid
- Each product shows name, description, price, and image

### 5. Add to Cart
- Click "Add to Cart" button on any product
- Item is saved to cart (localStorage)

### 6. View Cart
- Click "Cart" in navbar
- See all items in your cart
- View total price
- Remove items if needed

### 7. Logout
- Click "Logout" button in navbar
- Token is removed from localStorage
- You'll be redirected to login page

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Product.js            # Product schema
│   ├── controllers/
│   │   ├── authController.js     # Login/Register logic
│   │   └── productController.js  # Product CRUD logic
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── productRoutes.js      # Product endpoints
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── .env                      # Environment variables
│   ├── index.js                  # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   └── ProductCard.jsx   # Product display card
    │   ├── pages/
    │   │   ├── Home.jsx          # Home page (products list)
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Register page
    │   │   ├── Cart.jsx          # Shopping cart page
    │   │   └── AddProduct.jsx    # Add product page
    │   ├── utils/
    │   │   └── api.js            # API calls to backend
    │   ├── App.jsx               # Main app with routing
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Tailwind CSS
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## 🔐 How JWT Authentication Works

### Registration Flow:
1. User enters email and password
2. Backend hashes password using bcrypt
3. User data saved to MongoDB
4. Success message returned

### Login Flow:
1. User enters email and password
2. Backend finds user by email
3. Backend compares password with hashed password
4. If match, JWT token is generated
5. Token sent to frontend
6. Frontend stores token in localStorage

### Protected Routes:
1. User tries to add product
2. Frontend sends request with JWT token in header
3. Backend middleware verifies token
4. If valid, request proceeds
5. If invalid, 401 error returned

### Token Structure:
```javascript
{
  userId: "user_id_from_database",
  iat: 1234567890,  // issued at
  exp: 1234567890   // expires in 7 days
}
```

---

## 🌐 API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST** `/api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Products
- **GET** `/api/products` - Get all products (public)

- **POST** `/api/products` - Create product (protected)
  ```json
  {
    "name": "Laptop",
    "price": 999.99,
    "description": "High-performance laptop",
    "image": "https://example.com/image.jpg"
  }
  ```
  Headers: `Authorization: Bearer <token>`

---

## 📦 Sample Product Data

Use these image URLs when adding products:

```javascript
// Laptop
{
  name: "Gaming Laptop",
  price: 1299.99,
  description: "High-performance gaming laptop with RTX graphics",
  image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302"
}

// Phone
{
  name: "Smartphone",
  price: 699.99,
  description: "Latest smartphone with amazing camera",
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
}

// Headphones
{
  name: "Wireless Headphones",
  price: 199.99,
  description: "Noise-cancelling wireless headphones",
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
}

// Watch
{
  name: "Smart Watch",
  price: 299.99,
  description: "Fitness tracking smart watch",
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
}
```

---

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Fetch API** - HTTP requests

---

## 🐛 Troubleshooting

### Backend won't start
- Make sure MongoDB is running
- Check if port 5000 is available
- Verify .env file exists with correct values

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is available
- Clear browser cache

### Can't add products
- Make sure you're logged in
- Check if backend is running
- Open browser console for errors

### Products not showing
- Check if backend is running on port 5000
- Verify MongoDB has data
- Check browser console for errors

---

## 📝 Notes

- Cart data is stored in **localStorage** (simple approach)
- No payment integration (this is a learning project)
- Images are URLs only (no file upload)
- Basic validation only
- No admin panel (all logged-in users can add products)

---

## 🎓 Learning Points

This project teaches:
- REST API design
- JWT authentication flow
- React hooks (useState, useEffect)
- MongoDB CRUD operations
- Password hashing
- Protected routes
- localStorage usage
- Tailwind CSS styling
- React Router navigation

---

## 📧 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Verify all dependencies are installed
3. Make sure MongoDB is running
4. Check browser console for errors
5. Check terminal for backend errors

---

**Happy Coding! 🚀**
