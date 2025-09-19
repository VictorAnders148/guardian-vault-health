# Guardian Vault Health

A revolutionary medical data exchange platform where patients control encrypted health records through blockchain technology. Share with doctors securely, decrypt only with consent.

## Features

- **Fully Homomorphic Encryption (FHE)**: Core medical data is encrypted using FHE technology
- **Patient-Controlled Data**: Patients maintain full control over their health records
- **Secure Doctor Access**: Healthcare providers can access encrypted data with patient consent
- **Blockchain Integration**: Decentralized and tamper-proof medical records
- **Privacy-First Design**: Zero-knowledge architecture ensures maximum privacy

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/VictorAnders148/guardian-vault-health.git

# Navigate to the project directory
cd guardian-vault-health

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Application pages
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

This application implements state-of-the-art encryption and privacy measures:

- **FHE Encryption**: All sensitive medical data is encrypted using Fully Homomorphic Encryption
- **Zero-Knowledge Proofs**: Patient consent is verified without revealing data
- **Decentralized Storage**: Medical records are stored on blockchain for immutability
- **Access Control**: Granular permissions for data sharing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository.

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Integration with major EHR systems
- [ ] AI-powered health insights (privacy-preserving)