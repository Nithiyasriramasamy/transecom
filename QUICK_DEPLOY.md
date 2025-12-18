# ⚡ Quick Deploy to AWS EC2

Fast deployment guide - 15 minutes from start to finish!

---

## 🚀 Step 1: Launch EC2 Instance (5 minutes)

1. **AWS Console** → EC2 → Launch Instance
2. **Settings:**
   - Name: `ecommerce-app`
   - AMI: Ubuntu 22.04 LTS
   - Instance: t2.micro (free tier)
   - Key pair: Create new (download .pem)
   - Security Group: Allow ports 22, 80, 5000, 5001
3. **Launch** and note your **Public IP**

---

## 💻 Step 2: Connect to EC2 (2 minutes)

```bash
# Windows/Mac/Linux
ssh -i "your-key.pem" ubuntu@YOUR_EC2_IP
```

---

## 🛠️ Step 3: Install Software (5 minutes)

Copy and paste this entire block:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2
sudo npm install -g pm2

# Verify installations
node --version
npm --version
mongod --version
pm2 --version
```

---

## 📦 Step 4: Upload Your Application (2 minutes)

**From your local machine** (new terminal):

```bash
# Navigate to your project
cd C:\Users\nithi\Downloads\transaws

# Upload to EC2 (replace YOUR_EC2_IP and path to .pem)
scp -i "your-key.pem" -r . ubuntu@YOUR_EC2_IP:~/ecommerce-app
```

---

## 🚀 Step 5: Deploy Application (1 minute)

**Back on EC2 terminal:**

```bash
# Navigate to project
cd ~/ecommerce-app

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

**When prompted, enter your EC2 Public IP**

---

## ▶️ Step 6: Start Application (30 seconds)

```bash
# Start services
pm2 start ecosystem.config.js

# Save configuration
pm2 save

# Setup auto-start on reboot
pm2 startup
# Run the command it outputs
```

---

## 🌐 Step 7: Access Your App!

Open in browser:
```
http://YOUR_EC2_IP:5000
```

**Example:** `http://54.123.45.67:5000`

---

## ✅ Verify Everything Works

```bash
# Check services
pm2 status

# Should show:
# ecommerce-backend  | online
# ecommerce-frontend | online
```

---

## 🎯 Quick Commands

```bash
# View logs
pm2 logs

# Restart services
pm2 restart all

# Stop services
pm2 stop all

# Check MongoDB
sudo systemctl status mongod
```

---

## 🔧 If Something Goes Wrong

### Can't connect to EC2?
- Check security group allows port 22
- Verify .pem file permissions: `chmod 400 your-key.pem`

### Can't access app in browser?
- Check security group allows ports 5000 and 5001
- Run: `pm2 status` to verify services are running

### MongoDB not working?
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

### Services not starting?
```bash
pm2 logs
# Check error messages
```

---

## 📊 Monitor Your App

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs

# Check system resources
htop
```

---

## 🔄 Update Your App Later

```bash
# Upload new files from local machine
scp -i "your-key.pem" -r . ubuntu@YOUR_EC2_IP:~/ecommerce-app

# On EC2, rebuild and restart
cd ~/ecommerce-app/frontend
npm run build
cd ..
pm2 restart all
```

---

## 💰 Cost Estimate

**Free Tier (12 months):**
- t2.micro: FREE (750 hours/month)
- 30 GB storage: FREE
- 15 GB data transfer: FREE

**After Free Tier:**
- t2.micro: ~$8-10/month
- Storage: ~$2/month
- Data transfer: ~$1/GB

---

## 🎉 Done!

Your MERN e-commerce app is now live on AWS!

**Access at:** `http://YOUR_EC2_IP:5000`

**Next steps:**
1. Register an account
2. Add products
3. Start shopping!

---

**Total Time: ~15 minutes** ⚡
