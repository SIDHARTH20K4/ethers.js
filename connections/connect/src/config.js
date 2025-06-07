import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    polygonAmoy,
    avalancheFuji
} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'My WalletConnect App',
    projectId: 'ebff9f33307904b828cc6562f048dd3a', // Get from https://cloud.walletconnect.com/
    chains: [avalancheFuji], // Add more chains like `polygon`, `optimism`
});