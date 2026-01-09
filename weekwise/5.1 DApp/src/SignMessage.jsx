import { useWallet } from "@solana/wallet-adapter-react"
import { ed25519 } from "@noble/curves/ed25519"
import { useState } from "react"
import bs58 from "bs58"
export const SignMessage = () => {
  const [message, setMessage] = useState("")
  const { publicKey, signMessage } = useWallet()
  const Sign = async () => {

    if (!publicKey) throw new Error("Public key not found")
    if (!signMessage) throw new Error("Message signing not supported")
    if (message === "") throw new Error("message is empty")
    const text = new TextEncoder().encode(message)
    const signature = await signMessage(text)



    // Below line is verifying that -> is the signature(1st argument) is generated from signing a text(2nd argument in Uint8 form) from private key(getted by wallet) , whose corresponding public key is this  3rd argument  
    if (!ed25519.verify(signature, text, publicKey.toBytes())) throw new Error("signature is invalid")
    alert(`Success, Encode mEssage:${bs58.encode(text)} Message Signature: ${bs58.encode(signature)}`)
  }
  return (
    <div>
      <div>
        Sign Message
      </div>
      <div>
        <input type="text" placeholder='Message' value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={Sign}>Sign</button>
      </div>
    </div>
  )
}
