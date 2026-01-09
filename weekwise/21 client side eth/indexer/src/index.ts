import { id, JsonRpcProvider } from "ethers";

const Provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/g8YHQF3M96jxT4wOu3QXkJ_eRsZXucaG");

async function pollBlock(blockNumber: number) {
	const logs = await Provider.getLogs({
		address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		fromBlock: blockNumber,
		toBlock: blockNumber,
		topics: [id("Transfer(address,address,uint256)")],
	});
	console.log("logs");
	console.log(logs.length);
}
async function main() {
	const block = await Provider.getBlockNumber();
	console.log(block);
	pollBlock(block);
}

main();
