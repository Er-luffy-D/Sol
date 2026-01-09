import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { useState } from "react"

export const SendTransaction = () => {

    const [reciever, setReciever] = useState("")
    const [stat, setStat] = useState("")
    const [sol, SetSol] = useState(0)
    const wallet = useWallet()
    const { connection } = useConnection();
    const transact = async () => {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(reciever),
                lamports: LAMPORTS_PER_SOL * sol
            })
        )
        await wallet.sendTransaction(transaction, connection)
        alert(`${sol} amount is transferred to ${reciever}`)
    }
    const Verify = async () => {
        setStat("loading")
        if (reciever !== "") {
            try {
                const acc = await connection.getAccountInfo(new PublicKey(reciever));
                if (acc) {
                    setStat("Verified")
                } else {
                    setStat("Not Verified")
                }
            }
            catch (e) {
                setStat("Error Public key wrong")
                console.log(e)
            }
        }
        else {
            setStat("Empty Public Key")
        }
    }

    return (
        <>
            <div>SendTransaction</div>
            <div>
                <input type="text" placeholder="Enter Public key" value={reciever} onChange={e => setReciever(e.target.value)} />
                <button onClick={Verify}>Verify account</button>
                <>{stat}</>
                {stat === "Verified" ? <><input type="number" placeholder="1 Sol" value={sol} onChange={e => SetSol(e.target.value)} /> Sol

                    <button onClick={transact}>Proceed</button></> : <></>}
            </div>
        </>

    )
}
