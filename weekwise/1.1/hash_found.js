const crypto = require("crypto");

let hash = crypto.createHash("sha256");
let n = 2274800;
let input;
while (true) {
	input = "100xdevs" + n;
	hash = crypto.createHash("sha256").update(input.toString()).digest("hex");
	if (hash.startsWith("00000")) {
		console.log(`Current input: ${input}, Hash: ${hash}`);
		console.log(`The lowest number that produces a hash starting with "000000" is: ${input}`);
		break;
	}
	n++;
	console.log(`Current input: ${input}, Hash: ${hash}`);
}
