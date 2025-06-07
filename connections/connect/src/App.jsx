import DepositForm from './components/depositForm';
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme()}
        >
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <ConnectButton />
            <DepositForm />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;