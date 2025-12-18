# 🚀 AWS EC2 Deployment Guide

Complete guide to deploy your MERN e-commerce application on AWS EC2.

---

## 📋 Prerequisites

- AWS Account
- Basic knowledge of SSH and Linux commands
- Your application files ready

---

## 🔧 Part 1: AWS EC2 Setup

### Step 1: Launch EC2 Instance

1. **Login to AWS Console**
   - Go to https://aws.amazon.com/console/
   - Navigate to EC2 Dashboard

2. **Launch Instance**
   - Click "Launch Instance"
   - **Name:** ecommerce-app
   - **AMI:** Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance Type:** t2.micro (Free tier) or t2.small (recommended)
   - **Key Pair:** Create new or use existing (download .pem file)
   - **Network Settings:**
     - Allow SSH (port 22)
     - Allow HTTP (port 80)
     - Allow Custom TCP (port 5000) - Frontend
     - Allow Custom TCP (port 5001) - Backend
   - **Storage:** 20 GB (minimum)
   - Click "Launch Instance"

3. **Wait for Instance to Start**
   - Status should be "Running"
   - Note your **Public IPv4 address** (e.g., 54.123.45.67)

### Step 2: Configure Security Group

1. Go to **Security Groups** in EC2 Dashboard
2. Select your instance's security group
3. Click **Edit inbound rules**
4. Add these rules:

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| SSH | TCP | 22 | My IP | SSH access |
| HTTP | TCP | 80 | 0.0.0.0/0 | HTTP access |
| Custom TCP | TCP | 5000 | 0.0.0.0/0 | Frontend |
| Custom TCP | TCP | 5001 | 0.0.0.0/0 | Backend API |
| Custom TCP | TCP | 27017 | 127.0.0.1/32 | MongoDB (localhost only) |

5. Click **Save rules**

---

## 💻 Part 2: Connect to EC2 Instance

### Windows (Using PowerShell or CMD):

```bash
# Navigate to folder with your .pem file
cd C:\path\to\your\key

# Set permissions (PowerShell)
icacls "your-key.pem" /inheritance:r
icacls "your-key.pem" /grant:r "%username%:R"

# Connect to EC2
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

### Mac/Linux:

```bash
# Set permissions
chmod 400 your-key.pem

# Connect to EC2
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

**Replace `YOUR_EC2_PUBLIC_IP` with your actual EC2 public IP address**

---

## 🛠️ Part 3: Install Required Software on EC2

Once connected to your EC2 instance, run these commands:

### 1. Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Node.js (v18 LTS)

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install MongoDB

```bash
# Import MongoDB public key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update and install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

### 4. Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 5. Install Git

```bash
sudo apt install -y git
```

---

## 📦 Part 4: Deploy Your Application

### Option A: Upload Files Directly (Recommended for beginners)

#### From Your Local Machine:

**Windows (PowerShell):**
```powershell
# Navigate to your project folder
cd C:\path\to\your\project

# Upload entire project to EC2
scp -i "your-key.pem" -r . ubuntu@YOUR_EC2_PUBLIC_IP:~/ecommerce-app
```

**Mac/Linux:**
```bash
# Navigate to your project folder
cd /path/to/your/project

# Upload entire project to EC2
scp -i "your-key.pem" -r . ubuntu@YOUR_EC2_PUBLIC_IP:~/ecommerce-app
```

### Option B: Using Git (If you have a GitHub repository)

```bash
# On EC2 instance
cd ~
git clone https://github.com/yourusername/your-repo.git ecommerce-app
cd ecommerce-app
```

---

## 🚀 Part 5: Configure and Run Application

### 1. Navigate to Project Directory

```bash
cd ~/ecommerce-app
```

### 2. Run Deployment Script

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

**When prompted, enter your EC2 Public IP address**

### 3. Start Application with PM2

```bash
# Start both frontend and backend
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Copy and run the command it outputs
```

---

## 🌐 Part 6: Access Your Application

### Open in Browser:

```
http://YOUR_EC2_PUBLIC_IP:5000
```

**Example:** If your EC2 IP is `54.123.45.67`, open:
```
http://54.123.45.67:5000
```

---

## 🔍 Part 7: Verify Everything is Working

### Check Services Status:

```bash
# Check PM2 processes
pm2 status

# Check backend logs
pm2 logs ecommerce-backend

# Check frontend logs
pm2 logs ecommerce-frontend

# Check MongoDB status
sudo systemctl status mongod
```

### Test Application:

1. Open `http://YOUR_EC2_IP:5000` in browser
2. Register a new account
3. Login
4. Add a product
5. View products
6. Add to cart

---

## 🛡️ Part 8: Security Best Practices

### 1. Setup Firewall (UFW)

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow Frontend
sudo ufw allow 5000/tcp

# Allow Backend
sudo ufw allow 5001/tcp

# Check status
sudo ufw status
```

### 2. Secure MongoDB

```bash
# Edit MongoDB config
sudo nano /etc/mongod.conf

# Ensure bindIp is set to localhost only:
# net:
#   port: 27017
#   bindIp: 127.0.0.1

# Restart MongoDB
sudo systemctl restart mongod
```

### 3. Change JWT Secret

```bash
# Edit backend .env file
nano ~/ecommerce-app/backend/.env

# Change JWT_SECRET to a strong random string
# JWT_SECRET=your_very_long_random_secret_key_here_12345678

# Restart backend
pm2 restart ecommerce-backend
```

---

## 🔄 Part 9: Useful PM2 Commands

```bash
# View all processes
pm2 status

# View logs
pm2 logs

# View specific app logs
pm2 logs ecommerce-backend
pm2 logs ecommerce-frontend

# Restart apps
pm2 restart all
pm2 restart ecommerce-backend
pm2 restart ecommerce-frontend

# Stop apps
pm2 stop all
pm2 stop ecommerce-backend

# Delete apps
pm2 delete all
pm2 delete ecommerce-backend

# Monitor resources
pm2 monit
```

---

## 🔧 Part 10: Troubleshooting

### Issue: Can't access application

**Solution:**
1. Check security group allows port 5000
2. Check PM2 status: `pm2 status`
3. Check logs: `pm2 logs`
4. Verify EC2 instance is running

### Issue: MongoDB connection failed

**Solution:**
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB if stopped
sudo systemctl start mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Issue: Backend not starting

**Solution:**
```bash
# Check backend logs
pm2 logs ecommerce-backend

# Restart backend
pm2 restart ecommerce-backend

# Check if port 5001 is in use
sudo lsof -i :5001
```

### Issue: Frontend not loading

**Solution:**
```bash
# Check frontend logs
pm2 logs ecommerce-frontend

# Rebuild frontend
cd ~/ecommerce-app/frontend
npm run build

# Restart frontend
pm2 restart ecommerce-frontend
```

---

## 📊 Part 11: Monitoring

### Check System Resources:

```bash
# CPU and Memory usage
htop

# Disk usage
df -h

# PM2 monitoring
pm2 monit
```

### Check Application Health:

```bash
# Test backend API
curl http://localhost:5001/api/products

# Test frontend
curl http://localhost:5000
```

---

## 🔄 Part 12: Updating Your Application

### When you make changes to your code:

```bash
# On your local machine, upload new files
scp -i "your-key.pem" -r . ubuntu@YOUR_EC2_PUBLIC_IP:~/ecommerce-app

# On EC2 instance
cd ~/ecommerce-app

# Rebuild frontend
cd frontend
npm run build
cd ..

# Restart services
pm2 restart all
```

---

## 💰 Part 13: Cost Optimization

### Free Tier Limits:
- **t2.micro:** 750 hours/month (free for 12 months)
- **Storage:** 30 GB (free for 12 months)
- **Data Transfer:** 15 GB/month (free for 12 months)

### Tips:
1. Stop instance when not in use
2. Use t2.micro for testing
3. Monitor usage in AWS Billing Dashboard
4. Set up billing alerts

---

## 🌟 Part 14: Optional Enhancements

### 1. Setup Domain Name

1. Buy domain from Route 53 or other provider
2. Point A record to EC2 IP
3. Update API URL in frontend

### 2. Setup HTTPS with Let's Encrypt

```bash
# Install Nginx
sudo apt install -y nginx

# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

### 3. Setup Nginx as Reverse Proxy

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/ecommerce

# Add configuration (see nginx.conf in project)

# Enable site
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📝 Quick Reference

### Important Files:
- **Backend Config:** `~/ecommerce-app/backend/.env`
- **Frontend API:** `~/ecommerce-app/frontend/src/utils/api.js`
- **PM2 Config:** `~/ecommerce-app/ecosystem.config.js`
- **MongoDB Config:** `/etc/mongod.conf`

### Important Commands:
```bash
# Start services
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Restart all
pm2 restart all

# Stop all
pm2 stop all
```

### Important URLs:
- **Frontend:** `http://YOUR_EC2_IP:5000`
- **Backend API:** `http://YOUR_EC2_IP:5001/api`
- **MongoDB:** `localhost:27017` (internal only)

---

## 🎉 Congratulations!

Your MERN e-commerce application is now deployed on AWS EC2!

**Access your app at:** `http://YOUR_EC2_IP:5000`

---

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Check MongoDB: `sudo systemctl status mongod`
3. Check security group settings
4. Verify all ports are open
5. Check EC2 instance is running

---

**Happy Deploying! 🚀**
