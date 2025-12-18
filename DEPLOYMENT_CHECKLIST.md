# ✅ AWS EC2 Deployment Checklist

Use this checklist to ensure everything is configured correctly.

---

## 📋 Pre-Deployment Checklist

### Local Machine:
- [ ] All code is working locally
- [ ] Backend runs on port 5001
- [ ] Frontend runs on port 5000
- [ ] MongoDB is connected
- [ ] All dependencies installed
- [ ] `.gitignore` file created
- [ ] Deployment scripts are ready

### AWS Account:
- [ ] AWS account created
- [ ] Credit card added (for verification)
- [ ] Free tier eligible or budget set

---

## 🚀 EC2 Instance Setup Checklist

### Launch Instance:
- [ ] Instance launched (Ubuntu 22.04 LTS)
- [ ] Instance type: t2.micro or t2.small
- [ ] Key pair created and downloaded (.pem file)
- [ ] Key pair file saved securely
- [ ] Instance is running
- [ ] Public IP address noted

### Security Group Configuration:
- [ ] Port 22 (SSH) - Open to My IP
- [ ] Port 80 (HTTP) - Open to 0.0.0.0/0
- [ ] Port 5000 (Frontend) - Open to 0.0.0.0/0
- [ ] Port 5001 (Backend) - Open to 0.0.0.0/0
- [ ] Port 27017 (MongoDB) - Localhost only

---

## 💻 EC2 Connection Checklist

### SSH Connection:
- [ ] Can connect to EC2 via SSH
- [ ] Key permissions set correctly (chmod 400)
- [ ] Connected as ubuntu user
- [ ] Can run sudo commands

---

## 🛠️ Software Installation Checklist

### On EC2 Instance:
- [ ] System updated (`apt update && apt upgrade`)
- [ ] Node.js installed (v18+)
- [ ] npm installed
- [ ] MongoDB installed
- [ ] MongoDB running (`systemctl status mongod`)
- [ ] MongoDB enabled on boot
- [ ] PM2 installed globally
- [ ] Git installed (optional)

### Verify Installations:
```bash
node --version    # Should show v18.x.x
npm --version     # Should show 9.x.x or higher
mongod --version  # Should show 7.x.x
pm2 --version     # Should show 5.x.x
```

---

## 📦 Application Upload Checklist

### File Transfer:
- [ ] Project files uploaded to EC2
- [ ] Files in `~/ecommerce-app` directory
- [ ] All folders present (backend, frontend)
- [ ] deploy.sh script uploaded
- [ ] ecosystem.config.js uploaded

### Verify Upload:
```bash
cd ~/ecommerce-app
ls -la
# Should see: backend/ frontend/ deploy.sh ecosystem.config.js
```

---

## ⚙️ Configuration Checklist

### Backend Configuration:
- [ ] `backend/.env` file exists
- [ ] PORT set to 5001
- [ ] MONGO_URI set correctly
- [ ] JWT_SECRET is secure
- [ ] NODE_ENV set to production

### Frontend Configuration:
- [ ] API_URL updated with EC2 IP
- [ ] `frontend/src/utils/api.js` has correct IP
- [ ] Vite config has correct ports
- [ ] Build directory configured

### Run Configuration Script:
```bash
cd ~/ecommerce-app
node configure-ec2-ip.js
# Enter your EC2 Public IP when prompted
```

---

## 🏗️ Build Checklist

### Backend:
- [ ] Navigate to backend folder
- [ ] Run `npm install --production`
- [ ] No errors during installation
- [ ] node_modules folder created

### Frontend:
- [ ] Navigate to frontend folder
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] dist/ folder created
- [ ] No build errors

---

## 🚀 Deployment Checklist

### PM2 Setup:
- [ ] ecosystem.config.js configured
- [ ] Backend app name: ecommerce-backend
- [ ] Frontend app name: ecommerce-frontend
- [ ] Ports configured correctly

### Start Services:
- [ ] Run `pm2 start ecosystem.config.js`
- [ ] Both services show "online" status
- [ ] No errors in `pm2 logs`
- [ ] Run `pm2 save`
- [ ] Run `pm2 startup` and execute output command

### Verify Services:
```bash
pm2 status
# Both apps should show "online"

pm2 logs
# Should show no errors
```

---

## 🌐 Access Checklist

### Browser Access:
- [ ] Open `http://YOUR_EC2_IP:5000`
- [ ] Frontend loads successfully
- [ ] No console errors (F12)
- [ ] Can see homepage
- [ ] Navbar displays correctly

### API Access:
- [ ] Backend API accessible at `http://YOUR_EC2_IP:5001/api`
- [ ] Can test with: `curl http://localhost:5001/api/products`

---

## 🧪 Functionality Testing Checklist

### User Registration:
- [ ] Can access registration page
- [ ] Can enter email and password
- [ ] Registration creates user in MongoDB
- [ ] Success message displayed
- [ ] Redirected to login page

### User Login:
- [ ] Can access login page
- [ ] Can enter credentials
- [ ] Login returns JWT token
- [ ] Token saved in localStorage
- [ ] Navbar updates (shows Logout)
- [ ] Redirected to homepage

### Add Product:
- [ ] "Add Product" link visible when logged in
- [ ] Can access add product page
- [ ] Can fill product form
- [ ] Product saves to MongoDB
- [ ] Success message displayed
- [ ] Redirected to homepage

### View Products:
- [ ] Products display on homepage
- [ ] Product cards show correctly
- [ ] Images load properly
- [ ] Prices display correctly
- [ ] "Add to Cart" buttons work

### Shopping Cart:
- [ ] Can add products to cart
- [ ] Cart page displays items
- [ ] Quantities show correctly
- [ ] Total price calculates correctly
- [ ] Can remove items
- [ ] Cart persists in localStorage

### Logout:
- [ ] Logout button works
- [ ] Token removed from localStorage
- [ ] Redirected to login page
- [ ] Navbar updates (shows Login)

---

## 🔒 Security Checklist

### MongoDB Security:
- [ ] MongoDB bound to localhost only
- [ ] MongoDB not accessible from internet
- [ ] MongoDB port 27017 not in security group

### Application Security:
- [ ] JWT_SECRET is strong and unique
- [ ] Passwords hashed with bcrypt
- [ ] CORS configured correctly
- [ ] Environment variables not exposed

### Server Security:
- [ ] UFW firewall enabled
- [ ] Only necessary ports open
- [ ] SSH key-based authentication
- [ ] Root login disabled
- [ ] System packages updated

---

## 📊 Monitoring Checklist

### PM2 Monitoring:
- [ ] Can run `pm2 status`
- [ ] Can view `pm2 logs`
- [ ] Can run `pm2 monit`
- [ ] Logs are being written

### System Monitoring:
- [ ] Can check disk space: `df -h`
- [ ] Can check memory: `free -h`
- [ ] Can check CPU: `htop`

---

## 🔄 Auto-Start Checklist

### PM2 Startup:
- [ ] PM2 startup script configured
- [ ] Services restart after reboot
- [ ] Test by rebooting: `sudo reboot`
- [ ] After reboot, services are running

---

## 📝 Documentation Checklist

### Record Information:
- [ ] EC2 Public IP documented
- [ ] EC2 Instance ID documented
- [ ] Key pair name documented
- [ ] MongoDB connection string documented
- [ ] Application URLs documented

### Save Credentials:
- [ ] Admin email/password saved
- [ ] JWT_SECRET backed up
- [ ] .pem key file backed up
- [ ] AWS account details saved

---

## 🎯 Final Verification

### Complete Test Flow:
1. [ ] Open application in browser
2. [ ] Register new account
3. [ ] Login with credentials
4. [ ] Add 3 products
5. [ ] View products on homepage
6. [ ] Add 2 products to cart
7. [ ] View cart
8. [ ] Remove 1 item from cart
9. [ ] Logout
10. [ ] Login again
11. [ ] Cart still has items
12. [ ] All features working

### Performance Check:
- [ ] Pages load quickly (< 3 seconds)
- [ ] No lag when clicking buttons
- [ ] Images load properly
- [ ] API responses are fast

---

## 🎉 Deployment Complete!

If all items are checked, your deployment is successful!

### Your Application URLs:
- **Frontend:** `http://YOUR_EC2_IP:5000`
- **Backend API:** `http://YOUR_EC2_IP:5001/api`

### Important Commands:
```bash
# Check status
pm2 status

# View logs
pm2 logs

# Restart services
pm2 restart all

# Stop services
pm2 stop all

# Monitor resources
pm2 monit
```

---

## 📞 Troubleshooting

If any item is not checked, refer to:
- **AWS_DEPLOYMENT_GUIDE.md** - Complete deployment guide
- **QUICK_DEPLOY.md** - Fast deployment steps
- PM2 logs: `pm2 logs`
- MongoDB logs: `sudo tail -f /var/log/mongodb/mongod.log`

---

**Congratulations on your successful deployment! 🚀**
