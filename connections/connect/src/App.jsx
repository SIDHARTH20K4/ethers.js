import '@rainbow-me/rainbowkit/styles.css';
import './App.css'; // Your custom CSS
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import { ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import DepositForm from './components/depositForm';
const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
        modalSize="compact"
          theme={darkTheme({
            accentColor: '#3b82f6',
            borderRadius: 'medium',
            fontStack: 'system',
          })}
          coolMode
        >
          <div className="wallet-container">
            <ConnectButton 
              chainStatus="icon"
              showBalance={false}
              label="Connect Wallet"
              accountStatus="address"
              className="connect-button-overrides"
            />
          </div> 
          <DepositForm/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;