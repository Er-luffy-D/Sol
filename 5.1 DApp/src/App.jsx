import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'

import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './Airdrop';
import { SendTransaction } from "./SendTransaction"
import { ShowBalance } from './ShowBalance';
import { SignMessage } from './SignMessage';

export const App = () => {
  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/g8YHQF3M96jxT4wOu3QXkJ_eRsZXucaG"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div style={{

              display: "flex",
              alignItems: 'center',
              justifyContent: "space-between"
            }}>

              <Airdrop />
              <div style={{
                display: "flex",
                padding: "10px",
                margin: "10px",
                gap: "10px"
              }}>

                <WalletMultiButton />

                <WalletDisconnectButton />
              </div>
            </div>
            <ShowBalance />
            <SendTransaction />
            <SignMessage />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
