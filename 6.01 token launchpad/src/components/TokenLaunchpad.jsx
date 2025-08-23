import{ createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
export function TokenLaunchpad() {

    const wallet = useWallet();
    const { connection } = useConnection()
    const submitToken = async () => {
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate()
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, 9, wallet.publicKey),
        );
        transaction.feePayer = wallet.publicKey
        transaction.recentBlockhash = (await connection.getLatestBlockhash())

        transaction.partialSign(keypair)
        await wallet.sendTransaction(transaction, connection)
        console.log(`Token mint created at ${keypair.publicKey.toBase58()}`);

        // await sendAndConfirmTransaction(connection, transaction, [payer, keypair], confirmOptions);

    }
    return <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' type='text' placeholder='Name'></input> <br />
        <input className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={submitToken} className='btn'>Create a token</button>
    </div>
}

// [13,173,127,98,110,203,18,94,83,22,38,116,37,18,170,45,47,217,58,125,197,186,224,176,96,80,53,181,4,250,45,48,69,156,70,0,42,227,31,149,3,63,24,20,124,151,37,5,49,168,68,32,61,173,69,244,138,81,125,8,73,90,3,79]