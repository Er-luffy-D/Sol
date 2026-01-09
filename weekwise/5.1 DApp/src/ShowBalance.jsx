import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useState } from 'react'

export const ShowBalance = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [bal, Setbal] = useState(-2);
    const Balance = async () => {
        if (wallet.publicKey) {
            Setbal(await connection.getBalance(wallet.publicKey) / LAMPORTS_PER_SOL)
        }
        else {
            Setbal(-1)
        }
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: '20px'
        }}>
            <div style={{
                fontSize: '16px',
                lineHeight: '1.5',
                border: '2px solid black',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: 'white'
            }}>
                <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>ShowBalance</div>

                <div style={{
                    display: 'flex',
                    flexDirection: "column",
                    gap: '12px',
                    maxWidth: '200px'
                }}>
                    <button style={{
                        padding: "10px",
                        fontSize: "14px",
                        cursor: "pointer",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f0f0f0"
                    }} onClick={Balance}>Check Balance</button>

                    {bal === -1 ? <>Error public key not found</> :
                        bal === -2 ? <>Check balance</> :
                            <>{bal} sol</>}
                </div>
            </div>
        </div>



    )
}
