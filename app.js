import readline from "node:readline";
import Chifoumi from "./utils/Chifoumi.js";
import dotenv from "dotenv"


dotenv.config()

const {APP_SHEET, APP_ROCK, APP_SCISSORS} = process.env

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

const game = new Chifoumi(APP_ROCK, APP_SHEET, APP_SCISSORS);

const commands = {
	start: {
		name: "start <number>",
		description: "Lance une partie de <number> manches"
	},
	stats: {
		name: "stats",
		description: "Affiche les statistique de la dernière partie jouée"
	},
	reset: {
		name: "reset",
		description: "Reinitialise les statistique de partie"
	}
}

rl.setPrompt("CHIFOUMI >>")
rl.prompt()

rl.on("line", (line) => {
	switch(line) {
		
		case line.match(/^start /) ? line : null :
			game.run(line.split(" ")[1])
			break;
			
		case "stats":
			game.displayStats()
			break;
			
		case "reset":
			game.resetStats()
			break;
			
		default:
			console.log("Commande inconnue\n")
			console.group("Commande disponible : ")
			console.table(commands)
	}
	
	rl.prompt()
}).on("end", () => {
	console.log("Au revoir")
	process.exit(0)
})