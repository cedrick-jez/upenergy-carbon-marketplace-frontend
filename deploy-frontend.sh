#!/bin/bash

# UpEnergy Frontend Deployment Script for EC2
echo "🚀 Deploying UpEnergy Frontend to EC2"
echo "====================================="

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js if not already installed
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install npm if not already installed
if ! command -v npm &> /dev/null; then
    echo "📦 Installing npm..."
    sudo apt-get install -y npm
fi

# Check Node.js and npm versions
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Clone the frontend repository (replace with actual repo URL)
echo "📥 Cloning frontend repository..."
# git clone <YOUR_FRONTEND_REPO_URL> market-place-frontend
# cd market-place-frontend

# For now, we'll assume the code is already uploaded
echo "📁 Setting up frontend directory..."
mkdir -p /home/ubuntu/market-place-frontend
cd /home/ubuntu/market-place-frontend

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build the production version
echo "🔨 Building production version..."
npm run build

# Install PM2 for process management
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Create PM2 ecosystem file
echo "📝 Creating PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'upenergy-frontend',
    script: 'serve',
    args: '-s build -l 3001',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
EOF

# Install serve for serving the built React app
echo "📦 Installing serve..."
sudo npm install -g serve

# Start the application with PM2
echo "🚀 Starting frontend application..."
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

echo ""
echo "🎉 Frontend deployment completed!"
echo "================================"
echo "✅ Frontend running on: http://3.94.159.232:3001"
echo "✅ Backend API: http://3.94.159.232:3000"
echo ""
echo "📊 PM2 Status:"
pm2 status
echo ""
echo "🔧 Useful commands:"
echo "  pm2 status          - Check application status"
echo "  pm2 logs            - View application logs"
echo "  pm2 restart all     - Restart all applications"
echo "  pm2 stop all        - Stop all applications"
