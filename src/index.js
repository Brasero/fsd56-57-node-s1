import {extractArg} from "./utils/utils.js";
import {list, find, more, addNote, saveFile} from "./controller/studentController.js"
import readline from "node:readline";
import dotenv from "dotenv"

dotenv.config(/*{
// 	path: "costume/path/to/.env"//pour préciser le chemin vers le fichier .env
 }*/)

console.log(process.env)

const commands = [
	{
		name: "list",
		description: "Liste tout les élèves."
	},
	{
		name: 'find <string>',
		description: "Cherche puis affiche les infos d'un élève si il existe."
	},
	{
		name: 'more <number>',
		description: "Filtre les élèves en fonction de leur moyenne"
	},
	{
		name: "addNote",
		description: "Ajoute une note à un élève spécifique"
	}
]

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

rl.setPrompt("STUDENT > ")
rl.prompt()
rl.on("line", (line) => {
	let arg;
	
	switch (line) {
		
		case 'list':
			list()
			break
		
		case line.match(/^find /) ? line : null :
			arg = extractArg(line)
			find(arg)
			break
		
		case line.match(/^more /) ? line : null:
			arg = extractArg(line)
			more(arg)
			break
		
		case "addNote":
			rl.question("A qui souhaitez vous ajouter une note ?", (studentName) => {
				rl.question("Quelle est la note à ajouter ?", (note) => {
					addNote(studentName, note);
					rl.prompt()
				})
			})
			break;
		case "quit":
			rl.close()
			break;
		default:
			console.group('Commande inconnu, voici la liste des commandes')
			console.table(commands)
			console.groupEnd()
			break
	}
	rl.prompt()
})
rl.on("close", () => {
	saveFile()
	process.exit(0)
})