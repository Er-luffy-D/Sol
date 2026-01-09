import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

// A placeholder for the Viem client, connecting to the Ethereum mainnet.
const client = createPublicClient({
    chain: mainnet,
    transport: http(),
});

/**
 * A functional component to display and interact with Ethereum data using Viem.
 * It provides a UI to check the balance of an Ethereum address.
 */

export const Eth = () => {
    const [balance, setBalance] = useState('');
    const [latestBlock, setBlock] = useState('');
    const [publicke, setpublicke] = useState("")



    // A dummy function that could be used to fetch the latest block number.
    useEffect(() => {
        const fetchLatestBlock = async () => {
            try {
                const latestBlock = await client.getBlockNumber();
                setBlock(latestBlock);
                console.log('Latest block number:', latestBlock);
            } catch (error) {
                console.error('Failed to fetch latest block:', error);
            }
        };
        fetchLatestBlock();
    }, []);


    // -------------------------------------------------------------------


    /**
     * Fetches the ETH balance for a given address and updates the state.
     * @param {string} address The Ethereum address to check.
     */



    const fetchBalance = async (address) => {
        if (!address) {
            setBalance('Please enter a valid address.');
            return;
        }
        try {

            // Fetches the balance in Wei.
            const rawBalance = await client.getBalance({ address });


            // Converts Wei to ETH and formats for display.
            const formattedBalance = Number(rawBalance) / 1e18;
            setBalance(`${formattedBalance.toFixed(4)} ETH`);

        } catch (error) {

            console.error('Failed to fetch balance:', error);
            setBalance('Error fetching balance. Check the address.');
        }
    };



    // const doAirdrop = async (address, value) => {
    //     client.
    // }



    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 font-sans">
            <div className='p-2 m-2 bg-green-400 rounded-xl text-lg text-cyan-950 absolute right-2 top-2 font-bold'>Latest Block 📦: {latestBlock == "" ? <>Loading</> : <>{latestBlock}</>}</div>
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 drop-shadow-lg">
                    Viem Ethereum Explorer
                </h1>
                <p className="mt-2 text-lg text-gray-400">
                    A simple UI to perform Ethereum operations.
                </p>
            </header>

            <main className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-8 space-y-8">

                {/* Balance Checker Section */}
                <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
                    <h2 className="text-2xl font-bold mb-4 text-gray-200">
                        Check Account Balance 🔍
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <input
                            id="acc"
                            type="text"
                            placeholder="Enter Ethereum public address"
                            className="flex-1 p-3 rounded-lg bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 border border-transparent focus:border-blue-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    fetchBalance(e.target.value);
                                }
                            }}
                        />
                        <button
                            onClick={() => fetchBalance(document.getElementById('acc').value)}
                            className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300 shadow-lg transform hover:scale-105"
                        >
                            Check
                        </button>
                    </div>
                    {balance && (
                        <div className="mt-4 text-center p-4 bg-gray-900 rounded-lg font-mono text-lg text-green-400 border border-green-500">
                            Balance: <span className="font-bold">{balance}</span>
                        </div>
                    )}
                </section>

                <hr className="border-gray-700" />

                {/* Airdrop Section (Placeholder) */}
                <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
                    <h2 className="text-2xl font-bold mb-4 text-gray-200">
                        Airdrop Tokens 🎁
                    </h2>
                    <p className="text-gray-400">
                        Enter Your public Address .
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                        <input
                            id="keyp"
                            type="text"
                            placeholder="Enter Ethereum public address"
                            className="flex-1 p-3 rounded-lg bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 border border-transparent focus:border-blue-500"
                        />
                        {/* <input
                            id="amount"
                            type="text"
                            placeholder="Enter Ethereum public address"
                            className="flex-1 p-3 rounded-lg bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 border border-transparent focus:border-blue-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    doAirdrop(document.getElementById('keyp').value, e.target.value);
                                }
                            }}

                        />

                        < button
                            onClick={() => doAirdrop(document.getElementById('acc').value, document.getElementById('amount').value)}
                            className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300 shadow-lg transform hover:scale-105"
                        >
                            Drop
                        </button>*/}
                    </div>
                </section>
            </main>

        </div >
    );
};