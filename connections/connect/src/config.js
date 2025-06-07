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
    walletConnectProjectId: 'c772b9aa9079034ee60dd841be164a13', // Get from https://cloud.walletconnect.com/
    chains: [avalancheFuji], // Add more chains like `polygon`, `optimism`
});