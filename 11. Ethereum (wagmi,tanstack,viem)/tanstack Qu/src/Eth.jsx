import { useEffect } from 'react'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// 0xA1b6F10B407e0c84308525Ba12D10E4758f0A55a
const client = createPublicClient({
    chain: mainnet,
    transport: http(),
})

const latestBlockFu = async () => {

    const latestBlock = await client.getBlockNumber()
    console.log(latestBlock);

}

export const Eth = () => {
    useEffect(() => {
        latestBlockFu()
    }, [])
    return (
        <div>Using Viem Performing some Ethereum operations</div>
    )
}
