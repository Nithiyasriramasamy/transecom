# 🔄 Separate Ports Configuration Restored!

## ✅ Successfully Reversed to Separate Ports

Your MERN application is now running on **separate ports** as requested!

---

## 🌐 Current Configuration

### Frontend (React + Vite)
- **Port:** 3001
- **URL:** http://localhost:3001
- **Purpose:** User interface

### Backend (Express API)
- **Port:** 5001
- **URL:** http://localhost:5001
- **Purpose:** API server

### MongoDB
- **Port:** 27017
- **Access:** Localhost only

---

## 📊 Current Status

```
Frontend (Port 3001):
VITE v5.4.21 ready in 218 ms
➜ Local: http://localhost:3001/

Backend (Port 5001):
🚀 Server running on port 5001
✅ MongoDB Connected Successfully
```

---

## 🔧 Configuration Files Updated

### 1. Frontend API Configuration
**File:** `frontend/src/utils/api.js`
```javascript
const API_URL = 'http://localhost:5001/api';
```

### 2. Backend Port Configuration
**File:** `backend/.env`
```
PORT=5001
```

**File:** `backend/index.js`
```javascript
const PORT = process.env.PORT || 5001;
```

### 3. Frontend Port Configuration
**File:** `frontend/vite.config.js`
```javascript
server: {
  port: 3000  // Vite auto-selected 3001 due to conflict
}
```

### 4. PM2 Configuration
**File:** `ecosystem.config.js`
```javascript
apps: [
  { name: 'ecommerce-backend', port: 5001 },
  { name: 'ecommerce-frontend', port: 3000 }
]
```

---

## 🌐 URL Structure

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Frontend | 3001 | http://localhost:3001 | React UI |
| Backend API | 5001 | http://localhost:5001/api | Express API |
| MongoDB | 27017 | localhost:27017 | Database |

---

## 🎯 Benefits of Separate Ports

✅ **Clear Separation** - Frontend and backend are distinct
✅ **Independent Scaling** - Can scale each service separately
✅ **Development Flexibility** - Can restart services independently
✅ **Debugging Easier** - Can test API directly
✅ **Microservices Ready** - Follows microservices pattern

---

## 🧪 Test Your Application

### 1. Frontend Test
Open: http://localhost:3001
- ✅ Homepage should load
- ✅ Navigation should work
- ✅ All pages accessible

### 2. Backend API Test
```bash
# Test products endpoint
curl http://localhost:5001/api/products

# Test health check
curl http://localhost:5001/
```

### 3. Full Integration Test
1. Register new user at http://localhost:3001/register
2. Login with credentials
3. Add a product
4. View products on homepage
5. Add to cart
6. View cart

---

## 💻 Development Commands

### Start Both Servers
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Using PM2 (Production)
```bash
# Start both services
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Restart services
pm2 restart all
```

---

## 🚀 For AWS EC2 Deployment

### Security Group Ports Needed
- **Port 22** - SSH access
- **Port 80** - HTTP (optional)
- **Port 3001** - Frontend access
- **Port 5001** - Backend API access

### Access URLs on EC2
- **Frontend:** `http://YOUR_EC2_IP:3001`
- **Backend API:** `http://YOUR_EC2_IP:5001/api`

### Updated Deployment
The deployment scripts will need to be updated to reflect the new ports:
- Frontend: 3001
- Backend: 5001

---

## 🔄 Architecture Diagram

```
Browser → http://localhost:3001 (Frontend)
          ↓ (API calls)
          http://localhost:5001/api (Backend)
          ↓
          MongoDB (localhost:27017)
```

---

## 📝 What Changed from Single Port

### Removed from Backend:
- Static file serving for React build
- Catch-all route for React Router
- Path imports for serving frontend

### Added Back:
- CORS middleware for cross-origin requests
- Separate frontend development server
- Direct API URL in frontend

---

## 🎉 Ready for Development!

Your application is now running on separate ports:

**Frontend:** http://localhost:3001
**Backend:** http://localhost:5001

Both servers are running independently and communicating properly!

---

## 📞 Quick Commands Reference

```bash
# Check what's running
pm2 status

# View logs
pm2 logs

# Restart backend only
pm2 restart ecommerce-backend

# Restart frontend only
pm2 restart ecommerce-frontend

# Stop all
pm2 stop all

# Test API directly
curl http://localhost:5001/api/products
```

---

**Perfect! Your MERN application is back to separate ports configuration!** 🎯