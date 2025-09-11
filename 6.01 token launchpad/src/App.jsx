import './App.css'
import { TokenLaunchpad } from './components/TokenLaunchpad'
// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  return (
    <ConnectionProvider endpoint='https://solana-devnet.g.alchemy.com/v2/g8YHQF3M96jxT4wOu3QXkJ_eRsZXucaG'>
      {/* <ConnectionProvider endpoint='https://api.devnet.solana.com'> */}
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
            position: "relative",
            top: "50px"
          }}>

            <WalletMultiButton></WalletMultiButton>
            <WalletDisconnectButton></WalletDisconnectButton>
          </div>

          <TokenLaunchpad></TokenLaunchpad>
        </WalletModalProvider>
      </WalletProvider>

    </ConnectionProvider>
  )
}

export default App
