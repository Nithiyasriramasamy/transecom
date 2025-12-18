#!/usr/bin/env node

// Configuration script to update EC2 IP address
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('========================================');
console.log('EC2 IP Configuration Script');
console.log('========================================\n');

rl.question('Enter your EC2 Public IP address: ', (ec2Ip) => {
  if (!ec2Ip || ec2Ip.trim() === '') {
    console.log('❌ Error: IP address cannot be empty');
    rl.close();
    return;
  }

  const ip = ec2Ip.trim();
  console.log(`\n✅ Using IP: ${ip}\n`);

  // Update frontend API URL
  const apiFilePath = path.join(__dirname, 'frontend', 'src', 'utils', 'api.js');
  const apiContent = `// API utility - handles all backend requests
const API_URL = 'http://${ip}:5000/api';

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
`;

  try {
    fs.writeFileSync(apiFilePath, apiContent);
    console.log('✅ Updated: frontend/src/utils/api.js');
  } catch (error) {
    console.log('❌ Error updating api.js:', error.message);
  }

  // Update vite config
  const viteConfigPath = path.join(__dirname, 'frontend', 'vite.config.js');
  const viteContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 5000,
    host: '0.0.0.0'
  }
})
`;

  try {
    fs.writeFileSync(viteConfigPath, viteContent);
    console.log('✅ Updated: frontend/vite.config.js');
  } catch (error) {
    console.log('❌ Error updating vite.config.js:', error.message);
  }

  console.log('\n========================================');
  console.log('Configuration Complete!');
  console.log('========================================\n');
  console.log('Your application will be accessible at:');
  console.log(`http://${ip}:5000\n`);
  console.log('Next steps:');
  console.log('1. Build frontend: cd frontend && npm run build');
  console.log('2. Start services: pm2 start ecosystem.config.js');
  console.log('3. Access your app at the URL above\n');

  rl.close();
});
