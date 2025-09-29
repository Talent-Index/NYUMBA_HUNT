# Nyumba Hunt - Kenya's Premier Property Rental Platform

![Nyumba Hunt Logo](public/favicon.ico)

**Nyumba Hunt** is a modern, blockchain-integrated property rental platform designed specifically for the Kenyan market. Built with React, TypeScript, and Sui blockchain technology, it connects landlords and tenants through a seamless, secure, and user-friendly interface.

## 🏠 Project Overview

Nyumba Hunt (meaning "House Hunt" in Swahili) is a comprehensive property rental platform that aims to revolutionize the Kenyan real estate market by providing:

- **Verified Property Listings**: All properties are verified for authenticity and accuracy
- **Blockchain Integration**: Built on Sui blockchain for secure transactions and transparent records
- **Smart Matching**: AI-powered recommendations based on user preferences
- **Virtual Tours**: Explore properties from the comfort of your home
- **Instant Messaging**: Direct communication between landlords and tenants
- **Mobile-First Design**: Optimized for mobile devices, perfect for Kenya's mobile-first market

## 🚀 Features

### For Tenants
- 🔍 **Advanced Search**: Filter by location, price, property type, and amenities
- 📱 **Mobile-Optimized**: Responsive design for all devices
- 🏠 **Property Types**: Apartments, Houses, Bungalows, Maisonettes, Bedsitters, Single Rooms, Studios
- 📍 **Location Coverage**: Nairobi, Mombasa, Kisumu, and other major Kenyan cities
- 💰 **Price Ranges**: From KSh 15,000 to KSh 200,000+ per month
- ⭐ **Ratings & Reviews**: Read reviews from other tenants
- 🔒 **Secure Payments**: Blockchain-secured payment processing

### For Landlords
- 📝 **Easy Listing**: Simple form to list properties with photos and details
- 📊 **Analytics Dashboard**: Track views, inquiries, and rental performance
- ✅ **Verification System**: Build trust with verified landlord status
- 💬 **Tenant Communication**: Direct messaging with potential tenants
- 📈 **Market Insights**: Understand local rental market trends

### Blockchain Features
- 🔗 **Sui Wallet Integration**: Connect with Slush Wallet and other Sui-compatible wallets
- 🛡️ **Secure Transactions**: All payments and contracts secured on blockchain
- 📜 **Smart Contracts**: Automated rental agreements and payments
- 🔍 **Transparent Records**: Immutable property and transaction history

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Blockchain & Web3
- **Sui Blockchain** - High-performance blockchain for real estate
- **@mysten/dapp-kit** - Sui dApp development toolkit
- **@mysten/slush-wallet** - Slush wallet integration
- **@mysten/wallet-standard** - Wallet standard compliance

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── ConnectWalletButton.tsx
│   ├── DebugWalletDetector.tsx
│   └── Navbar.tsx
├── pages/               # Application pages
│   ├── Index.tsx        # Landing page
│   ├── Properties.tsx   # Property listings
│   ├── PropertyDetails.tsx
│   ├── ListProperty.tsx # Property creation form
│   ├── Dashboard.tsx    # Tenant dashboard
│   ├── LandlordDashboard.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Profile.tsx
├── lib/                 # Utility libraries
│   ├── sui.tsx          # Sui blockchain configuration
│   └── utils.ts         # Helper functions
├── hooks/               # Custom React hooks
├── assets/              # Images and static assets
└── App.tsx              # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Sui wallet (Slush Wallet recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd home-finder-ke
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### Sui Network Configuration
The app is configured to work with Sui testnet by default. To change networks, modify `src/lib/sui.tsx`:

```typescript
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});
```

### Wallet Integration
The app supports multiple Sui wallets:
- **Slush Wallet** (primary)
- **Ethos Wallet**
- **Suiet Wallet**
- Other Sui-compatible wallets

## 📱 Usage

### For Tenants
1. **Browse Properties**: Visit the homepage or properties page
2. **Search & Filter**: Use filters to find properties matching your criteria
3. **View Details**: Click on any property to see full details
4. **Contact Landlord**: Use the contact form or direct messaging
5. **Connect Wallet**: Connect your Sui wallet for secure transactions

### For Landlords
1. **Connect Wallet**: Connect your Sui wallet to verify ownership
2. **List Property**: Fill out the property listing form
3. **Upload Photos**: Add high-quality photos of your property
4. **Manage Listings**: Use the landlord dashboard to manage your properties
5. **Communicate**: Respond to tenant inquiries through the platform

## 🔒 Security Features

- **Wallet Authentication**: Secure login using Sui blockchain wallets
- **Encrypted Communications**: All messages are encrypted
- **Verified Listings**: Properties are verified before going live
- **Smart Contracts**: Automated and secure rental agreements
- **Immutable Records**: All transactions recorded on blockchain

## 🌍 Market Focus

### Kenyan Property Types
- **Apartments**: Modern multi-story residential buildings
- **Houses**: Standalone residential properties
- **Bungalows**: Single-story houses with gardens
- **Maisonettes**: Two-story houses with separate entrances
- **Bedsitters**: Single rooms with basic amenities
- **Single Rooms**: Basic accommodation for budget-conscious tenants
- **Studios**: Self-contained units with kitchen and bathroom

### Price Ranges (Kenyan Shillings)
- **Budget**: KSh 15,000 - 35,000/month
- **Mid-range**: KSh 35,000 - 80,000/month
- **Premium**: KSh 80,000 - 150,000/month
- **Luxury**: KSh 150,000+/month

### Major Cities Covered
- **Nairobi**: Kilimani, Karen, Westlands, Lavington, Runda
- **Mombasa**: Nyali, Diani, Bamburi
- **Kisumu**: Milimani, Mamboleo
- **Nakuru**: Milimani, Section 58
- **Eldoret**: Kapsoya, Langas

## 🚧 Current Status

### ✅ Completed Features
- Responsive UI/UX design
- Property listing and browsing
- Sui wallet integration
- Multi-wallet support (Slush, Ethos)
- Property search and filtering
- User authentication via blockchain
- Mobile-optimized interface

### 🚧 In Development
- Smart contract integration for property creation
- On-chain property ownership verification
- Automated rental payments
- Advanced search algorithms
- Property verification system

### 📋 Planned Features
- **NFT Property Deeds**: Digital property ownership certificates
- **Rental Payment Automation**: Smart contract-based rent collection
- **Property Insurance**: Blockchain-based insurance integration
- **Market Analytics**: Real-time rental market data
- **Mobile App**: Native iOS and Android applications
- **Multi-language Support**: Swahili and local language support

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint for code formatting
- Write meaningful commit messages
- Test wallet integrations thoroughly
- Ensure mobile responsiveness

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Sui Foundation** - For the amazing blockchain platform
- **Mysten Labs** - For excellent developer tools and documentation
- **shadcn/ui** - For beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Kenyan Real Estate Community** - For market insights and feedback

## 📞 Support

- **Email**: support@nyumbahunt.ke
- **Discord**: [Join our community](https://discord.gg/nyumbahunt)
- **Twitter**: [@NyumbaHuntKE](https://twitter.com/NyumbaHuntKE)
- **Documentation**: [docs.nyumbahunt.ke](https://docs.nyumbahunt.ke)

## 🔗 Links

- **Live Demo**: [nyumbahunt.ke](https://nyumbahunt.ke)
- **Sui Blockchain**: [sui.io](https://sui.io)
- **Slush Wallet**: [slushwallet.app](https://slushwallet.app)
- **Developer Docs**: [docs.sui.io](https://docs.sui.io)

---

**Built with ❤️ in Kenya for the Kenyan real estate market**

*Nyumba Hunt - Where Kenyans find their perfect home*