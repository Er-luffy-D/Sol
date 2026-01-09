import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react";

export const Airdrop = () => {

    const wallet = useWallet();
    // The useWallet hook is provided by WalletProvider , it provide wallet variable , So that we can access the current wallet from anywhere
    // to use this u need to wrap the component with a WalletProvider Component which acts as context provider

    const [amount, setAmount] = useState(0)
    const { connection } = useConnection();
    const [error, setError] = useState("")
    const SendAirdropToUser = async () => {
        // alert(wallet.publicKey)
        try {

            await connection.requestAirdrop(wallet.publicKey, amount * 1000000000)
            alert('Done')
        } catch (e) {
            alert('error')
            setError(e);
        }
    }
    return (
        <>
            <div>
                <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <button onClick={SendAirdropToUser}>Airdrop</button>

            </div>
            <div>Error is :
                {error}
            </div>
        </>

    )
}
