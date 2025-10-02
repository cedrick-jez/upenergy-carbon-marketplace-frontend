# UpEnergy Carbon Credit Marketplace - Frontend

A modern React frontend for the UpEnergy Carbon Credit Tokenization Platform.

## 🚀 Features

### User Management
- **Role-based Authentication** - Admin and Investor roles
- **Profile Management** - Update personal information
- **Hedera Account Integration** - Create and manage blockchain accounts

### Token Management
- **Token Viewing** - Browse all carbon credit tokens with metadata
- **Marketplace** - Buy and sell tokens in a secure marketplace
- **Portfolio Management** - Track owned tokens and trading history
- **Advanced Filtering** - Search by country, status, and other criteria

### Admin Features
- **Dashboard** - Comprehensive overview of platform statistics
- **Token Creation** - Generate new tokens from distribution data
- **Account Management** - Monitor all Hedera accounts

### Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Material-UI Components** - Professional, accessible interface
- **Real-time Updates** - Live data synchronization
- **Intuitive Navigation** - Easy-to-use interface

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Material-UI (MUI)** - Professional component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Context API** - State management for authentication

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

The frontend connects to the backend API running on `http://localhost:3000`. Make sure the backend server is running before starting the frontend.

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3000
```

## 📱 Pages & Features

### Home Page
- Hero section with platform overview
- Feature highlights
- Call-to-action buttons
- Platform statistics

### Login Page
- Role selection (Admin/Investor)
- Simple authentication (demo mode)
- Profile creation

### Dashboard
- Platform statistics overview
- Recent token activity
- Account information
- Quick actions

### Marketplace
- **All Tokens** - Browse complete token catalog
- **Marketplace** - View tokens available for sale
- **My Tokens** - Personal portfolio view
- Advanced filtering and search

### Profile
- Personal information management
- Hedera account details
- Account settings

### Account Creation
- Generate new Hedera testnet accounts
- Copy account credentials
- Account management

## 🎨 Design System

### Color Palette
- **Primary Green**: #2E7D32 (UpEnergy brand)
- **Secondary Orange**: #FF6F00 (Accent color)
- **Success**: #4CAF50
- **Info**: #2196F3
- **Warning**: #FF9800
- **Error**: #F44336

### Typography
- **Font Family**: Roboto, Helvetica, Arial
- **Weights**: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)

### Components
- Rounded corners (8-12px border radius)
- Consistent spacing
- Hover effects and transitions
- Responsive grid system

## 🔐 Authentication

The app uses a simple authentication system for demo purposes:

- **Admin Role**: Full access to all features including token creation
- **Investor Role**: Access to marketplace and portfolio features
- **Session Management**: Local storage for user data
- **Protected Routes**: Role-based access control

## 📊 API Integration

The frontend integrates with the following backend endpoints:

### Account Management
- `GET /accounts/create` - Create new Hedera account
- `GET /accounts/list` - List all accounts

### Token Management
- `GET /tokens/create` - Create tokens from distribution data
- `GET /tokens/upenergy` - Get all UpEnergy tokens
- `GET /tokens/market` - Get tokens for sale
- `GET /tokens/sell?tokenId=X` - Mark token for sale
- `GET /tokens/buy?tokenId=X&buyerAccount=Y` - Buy token

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-backend-api.com
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📝 Development Notes

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components
│   ├── Tokens/         # Token-related components
│   └── Accounts/       # Account management components
├── contexts/           # React contexts
├── pages/              # Page components
├── services/           # API services
└── App.js             # Main app component
```

### Key Features Implemented
- ✅ User authentication and role management
- ✅ Token viewing with metadata display
- ✅ Buy/sell token functionality
- ✅ Hedera account creation interface
- ✅ Admin dashboard with statistics
- ✅ Responsive design and modern UI
- ✅ API integration with backend

## 🎯 Hackathon Focus

This frontend is designed to showcase:
1. **Professional UI/UX** - Modern, intuitive interface
2. **Blockchain Integration** - Seamless Hedera account management
3. **Real-time Data** - Live token marketplace
4. **Scalable Architecture** - Clean, maintainable code
5. **User Experience** - Smooth interactions and feedback


This project is part of the UpEnergy Hedera Hackathon submission.

