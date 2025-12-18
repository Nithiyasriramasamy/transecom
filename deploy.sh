#!/bin/bash

# MERN E-commerce Deployment Script for AWS EC2
# Backend serves both API and frontend build on port 5000

echo "=========================================="
echo "MERN E-commerce Deployment Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}This deployment serves frontend from backend${NC}"
echo -e "${YELLOW}Everything runs on port 5000${NC}"
echo ""

# Update backend .env file
echo -e "${GREEN}[1/5] Updating backend configuration...${NC}"
cat > backend/.env << EOF
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=production
EOF

# Update frontend API URL (relative path since backend serves it)
echo -e "${GREEN}[2/5] Updating frontend API configuration...${NC}"
cat > frontend/src/utils/api.js << EOF
// API utility - handles all backend requests
// Using relative URL since backend serves frontend
const API_URL = '/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Register new user
export const register = async (email, password) => {
  const response = await fetch(\`\${API_URL}/auth/register\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Login user
export const login = async (email, password) => {
  const response = await fetch(\`\${API_URL}/auth/login\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Get all products
export const getProducts = async () => {
  const response = await fetch(\`\${API_URL}/products\`);
  return response.json();
};

// Create new product (requires authentication)
export const createProduct = async (productData) => {
  const token = getToken();
  const response = await fetch(\`\${API_URL}/products\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
    body: JSON.stringify(productData)
  });
  return response.json();
};
EOF

# Install backend dependencies
echo -e "${GREEN}[3/5] Installing backend dependencies...${NC}"
cd backend
npm install --production
cd ..

# Install frontend dependencies
echo -e "${GREEN}[4/5] Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

# Build frontend for production
echo -e "${GREEN}[5/5] Building frontend for production...${NC}"
cd frontend
npm run build
cd ..

echo ""
echo -e "${GREEN}=========================================="
echo "Deployment preparation complete!"
echo "==========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Install PM2: npm install -g pm2"
echo "2. Start application: pm2 start ecosystem.config.js"
echo "3. Save PM2 config: pm2 save"
echo "4. Setup auto-start: pm2 startup"
echo ""
echo -e "${YELLOW}Access your application at:${NC}"
echo "http://localhost:5000 (or http://YOUR_EC2_IP:5000)"
echo ""
echo -e "${YELLOW}Monitor application:${NC}"
echo "pm2 status"
echo "pm2 logs ecommerce-app"
echo ""
echo -e "${GREEN}✅ Backend serves both API and frontend on port 5000${NC}"
echo ""
