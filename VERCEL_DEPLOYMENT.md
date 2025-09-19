# Vercel Deployment Guide for Guardian Vault Health

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Node.js**: Version 18+ installed locally (for testing)

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" or "Import Project"
3. Connect your GitHub account if not already connected
4. Select the repository: `VictorAnders148/guardian-vault-health`

### Step 2: Configure Project Settings

1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Leave as default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
VITE_RPC_URL=https://1rpc.io/sepolia
```

**To add environment variables:**
1. Go to Project Settings → Environment Variables
2. Add each variable with the values above
3. Make sure to select "Production", "Preview", and "Development" for all variables

### Step 4: Build Configuration

Create a `vercel.json` file in the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 5: Deploy

1. Click "Deploy" button in Vercel dashboard
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your application will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Update Contract Addresses

After deploying your smart contracts to Sepolia testnet, update the environment variables:

```
VITE_GUARDIAN_VAULT_HEALTH_CONTRACT_ADDRESS=0x[YourContractAddress]
```

### 2. Test the Application

1. Visit your deployed URL
2. Connect your wallet (MetaMask, Rainbow, etc.)
3. Switch to Sepolia testnet
4. Test the core functionality

### 3. Monitor Performance

- Check Vercel Analytics for performance metrics
- Monitor build logs for any issues
- Set up error tracking if needed

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check if all dependencies are properly installed
   - Verify environment variables are set correctly
   - Check build logs for specific error messages
   - **Dependency Issues**: If you see "No matching version found" errors, check package.json for invalid version numbers

2. **Wallet Connection Issues**:
   - Ensure WalletConnect Project ID is correct
   - Verify RPC URLs are accessible
   - Check browser console for errors

3. **Contract Interaction Issues**:
   - Verify contract address is correct
   - Ensure user is on Sepolia testnet
   - Check if contract is deployed and verified

### Performance Optimization

1. **Enable Vercel Analytics**:
   - Go to Project Settings → Analytics
   - Enable Web Analytics

2. **Optimize Bundle Size**:
   - Use dynamic imports for large components
   - Implement code splitting
   - Optimize images and assets

3. **Caching Strategy**:
   - Configure appropriate cache headers
   - Use Vercel Edge Functions for dynamic content

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**:
   - Vercel automatically provides HTTPS
   - Ensure all external API calls use HTTPS

3. **CORS Configuration**:
   - Configure CORS headers if needed
   - Restrict access to specific domains

## Monitoring and Maintenance

1. **Uptime Monitoring**:
   - Set up uptime monitoring services
   - Configure alerts for downtime

2. **Performance Monitoring**:
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Set up performance budgets

3. **Error Tracking**:
   - Integrate error tracking services (Sentry, etc.)
   - Monitor application errors
   - Set up alerting for critical errors

## Rollback Strategy

1. **Previous Deployments**:
   - Vercel keeps deployment history
   - Easy rollback to previous versions
   - Use Vercel CLI for advanced rollback options

2. **Database Migrations**:
   - Plan for database schema changes
   - Test migrations in staging environment
   - Have rollback procedures ready

## Cost Optimization

1. **Vercel Pro Plan**:
   - Consider Pro plan for production use
   - Includes advanced features and higher limits
   - Better performance and reliability

2. **Resource Usage**:
   - Monitor function execution time
   - Optimize bundle size
   - Use CDN effectively

## Support and Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **RainbowKit Documentation**: [rainbowkit.com](https://rainbowkit.com)
- **Wagmi Documentation**: [wagmi.sh](https://wagmi.sh)

## Next Steps

1. **Set up CI/CD**: Configure automatic deployments
2. **Add Testing**: Implement automated testing
3. **Performance Monitoring**: Set up comprehensive monitoring
4. **Security Audit**: Conduct security review
5. **User Feedback**: Collect and implement user feedback

---

**Note**: This deployment guide assumes you have already deployed your smart contracts to Sepolia testnet. If not, you'll need to deploy the contracts first using tools like Hardhat, Foundry, or Remix IDE.
