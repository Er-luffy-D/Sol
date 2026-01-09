import { createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export function TokenLaunchpad() {


    const wallet = useWallet();
    const { connection } = useConnection()
    // const submitToken = async () => {
    //     const lamports = await getMinimumBalanceForRentExemptMint(connection);
    //     const keypair = Keypair.generate()
    //     const transaction = new Transaction().add(
    //         SystemProgram.createAccount({
    //             fromPubkey: wallet.publicKey,
    //             newAccountPubkey: keypair.publicKey,
    //             space: MINT_SIZE,
    //             lamports,
    //             programId: TOKEN_PROGRAM_ID,
    //         }),
    //         createInitializeMint2Instruction(keypair.publicKey, 9, wallet.publicKey),
    //     );
    //     transaction.feePayer = wallet.publicKey
    //     const { blockhash } = await connection.getLatestBlockhash();
    //     transaction.recentBlockhash = blockhash;

    //     transaction.partialSign(keypair)
    //     await wallet.sendTransaction(transaction, connection)
    //     console.log(`Token mint created at ${keypair.publicKey.toBase58()}`);

    //     // await sendAndConfirmTransaction(connection, transaction, [payer, keypair], confirmOptions);

    // }
    const submitTokenWithMetaData = async () => {
        const inputs = document.querySelectorAll(".inputText");

        const name = inputs[0].value;
        const symbol = inputs[1].value;
        const URL = inputs[2].value;
        const initialSupply = inputs[3].value;

        if (name === "" || symbol === "" || URL === "" || initialSupply === "") {
            console.warn("enter all values")
            return
        }
        if (!wallet.connected) {
            console.error('Wallet not connected');
            return;
        }


        const mintKeypair = Keypair.generate();
        const metadata = {
            mint: mintKeypair.publicKey,
            name: name,
            symbol: symbol,
            uri: URL,
            additionalMetadata: [],
        }

        const mintLen = getMintLen([ExtensionType.MetadataPointer])
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length
        console.log('Mint Length:', mintLen);
        console.log('Metadata Length:', metadataLen);

        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);


        const transaction = new Transaction().add(

            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: mintLen,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID
            }),
            createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mintKeypair.publicKey,
                metadata: mintKeypair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: wallet.publicKey,
                updateAuthority: wallet.publicKey
            })
        )

        transaction.feePayer = wallet.publicKey
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair)

        const res = await wallet.sendTransaction(transaction, connection);
        console.log("\nCreate Mint Account:",
            `https://solana.fm/tx/${res}?cluster=devnet-solana`,)


        const associatedToken = getAssociatedTokenAddressSync(
            mintKeypair.publicKey,
            wallet.publicKey,
            false,
            TOKEN_2022_PROGRAM_ID,
        );
        console.log(associatedToken.toBase58());
        const transaction2 = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID
            )
        )

        await wallet.sendTransaction(transaction2, connection);
        const transaction3 = new Transaction().add(
            createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey, initialSupply, [], TOKEN_2022_PROGRAM_ID)
        )
        await wallet.sendTransaction(transaction3, connection);

    }




    return <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>

        <input className='inputText' type='text' required placeholder='Name'></input> <br />
        <input className='inputText' type='text' required placeholder='Symbol'></input> <br />
        <input className='inputText' type='text' required placeholder='Image URL'></input> <br />
        <input className='inputText' type='text' required placeholder='Initial Supply'></input> <br />
        <button onClick={submitTokenWithMetaData} className='btn'>Create a token</button>

    </div>
}
