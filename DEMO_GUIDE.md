# UpEnergy Carbon Credit Platform - Demo Guide

## 🎯 Demo Overview

This is a complete blockchain-backed carbon credit tokenization platform that demonstrates:
- **Synthetic data generation** for clean cooking devices across Africa
- **Blockchain integration** with Hedera Testnet
- **Token marketplace** for buying/selling carbon credit tokens
- **Modern web interface** with role-based access

## 🚀 Quick Start

### Option 1: Automated Startup
```bash
./start-demo.sh
```

### Option 2: Manual Startup

1. **Start Backend API**
   ```bash
   cd carbon-forward-credit-api-main-2
   npm install
   npm start
   ```

2. **Start Frontend** (in new terminal)
   ```bash
   cd market-place-frontend
   npm install
   npm start
   ```

3. **Access the Platform**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## 🎭 Demo Scenarios

### Scenario 1: Admin User Journey

1. **Login as Admin**
   - Go to http://localhost:3001
   - Click "Get Started" or "Login"
   - Enter name: "Admin User"
   - Enter email: "admin@upenergy.com"
   - Select role: "Administrator"
   - Click "Sign In"

2. **Create Hedera Account**
   - Navigate to "Dashboard" → "Create Hedera Account"
   - Click "Create Hedera Account"
   - Copy and save the account credentials
   - Note the 10 HBAR initial balance

3. **Generate Tokens**
   - Go to "Marketplace"
   - Click "Create Tokens" button
   - Confirm token creation
   - Watch tokens appear in the marketplace

4. **Monitor Platform**
   - View dashboard statistics
   - Check recent token activity
   - Monitor account information

### Scenario 2: Investor User Journey

1. **Login as Investor**
   - Go to http://localhost:3001
   - Click "Login"
   - Enter name: "Investor User"
   - Enter email: "investor@example.com"
   - Select role: "Investor"
   - Click "Sign In"

2. **Create Hedera Account**
   - Navigate to "Accounts" in the header
   - Create a new Hedera account
   - Save account credentials

3. **Browse Marketplace**
   - Go to "Marketplace"
   - Browse "All Tokens" tab
   - Use filters to find specific tokens
   - View token metadata (location, device info, etc.)

4. **Buy Tokens**
   - Switch to "Marketplace" tab
   - Find tokens marked "For Sale"
   - Click "Buy" on desired tokens
   - Tokens will be added to your portfolio

5. **Manage Portfolio**
   - Switch to "My Tokens" tab
   - View owned tokens
   - Sell tokens by clicking "Sell" button

### Scenario 3: Data Generation (Optional)

1. **Generate Distribution Data**
   ```bash
   cd carbon-forward-credit-api-main-2
   python3 distribution_generator.py
   ```

2. **Generate Usage Data**
   ```bash
   python3 usage_generator.py
   ```

## 🔍 Key Features to Demonstrate

### 1. **Token Metadata Display**
- Device serial numbers
- Geographic information (country, region, district, village)
- Distribution dates
- Contact information
- Ownership status

### 2. **Blockchain Integration**
- Hedera account creation
- Account credential management
- Token ownership tracking
- Transaction history

### 3. **Marketplace Functionality**
- Token listing and delisting
- Buy/sell operations
- Portfolio management
- Search and filtering

### 4. **Admin Features**
- Token creation from distribution data
- Platform statistics
- Account management
- System monitoring

### 5. **User Experience**
- Responsive design
- Real-time updates
- Intuitive navigation
- Professional UI

## 📊 Platform Statistics

The platform demonstrates:
- **9 African Countries** covered
- **10,000+ Device Distributions** simulated
- **1,000 Active Devices** monitored
- **Real-time Usage Data** generation
- **Blockchain Tokenization** of carbon credits

## 🛠️ Technical Architecture

### Backend (Node.js)
- **Express API** with RESTful endpoints
- **Hedera SDK** for blockchain integration
- **SQLite Database** for token storage
- **AWS S3 Integration** for data storage

### Frontend (React)
- **Material-UI** for professional design
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API communication

### Data Pipeline
- **Python Scripts** for data generation
- **Synthetic Data** for realistic simulation
- **S3 Storage** for data persistence
- **Real-time Updates** via API

## 🎯 Hackathon Highlights

### Innovation
- **First-of-its-kind** carbon credit tokenization platform
- **Real-world Impact** with African clean cooking focus
- **Blockchain Integration** for transparency and security

### Technical Excellence
- **Modern Tech Stack** with React and Node.js
- **Professional UI/UX** with Material-UI
- **Scalable Architecture** for future growth
- **Real-time Data** processing and display

### Business Value
- **Marketplace Model** for carbon credit trading
- **Role-based Access** for different user types
- **Portfolio Management** for investors
- **Admin Tools** for platform management

## 🔧 Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check if port 3000 is available
   - Ensure Node.js dependencies are installed
   - Verify environment variables are set

2. **Frontend not connecting**
   - Ensure backend is running on port 3000
   - Check browser console for errors
   - Verify API endpoints are accessible

3. **Database issues**
   - Check if tokens.db file exists
   - Verify SQLite is properly installed
   - Check database permissions

### Environment Setup

Create `.env` file in `carbon-forward-credit-api-main-2/`:
```env
MY_ACCOUNT_ID=0.0.xxxxx
MY_PRIVATE_KEY=302e020100300506032b657004220420...
S3_BUCKET=hedera-hackathon
S3_KEY=distributions/distributions.csv
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

## 📈 Future Enhancements

- **Real-time Notifications** for token transactions
- **Advanced Analytics** and reporting
- **Mobile App** for field data collection
- **Integration** with carbon credit registries
- **Automated Pricing** based on usage data
- **Multi-language Support** for African markets



**Ready to showcase the future of carbon credit trading! 🌱**
