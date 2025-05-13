import readline from "node:readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
})

// rl.question("Quelle est votre nom ?", (answer) => {
// 	console.log(`Bonjour ${answer}`)
//
// 	rl.close()
// })

rl.setPrompt("Mon process >> ")
rl.prompt()

rl.on("line", (line) => {
	switch (line.trim()) {
		case "hello":
			console.log("world")
			break;
		case "quit":
			rl.close()
			break;
			
		case 'name':
			rl.question("Quel est votre nom ? ", (name) =>{
				rl.question("Quel est votre prénom ?", (surname) => {
					console.log(`Bonjour ${name} ${surname}`)
					rl.prompt()
				})
			})
			break
		default:
			console.log("command unknown")
			break;
	}
	rl.prompt()
})
rl.on("close", () => {
	console.log("Shutdown")
	process.exit(0)
})