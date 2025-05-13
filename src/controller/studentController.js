import fs from "node:fs";
import path from "node:path"
import {writeFile} from "node:fs/promises"
import dotenv from "dotenv"

dotenv.config(/*{
// 	path: "costume/path/to/.env"//pour préciser le chemin vers le fichier .env
 }*/)

const cwd = process.cwd()

const dataPath = path.join(cwd, "data", "student.json")
const savePath = path.join(cwd, "data", "test.json")

const students = JSON.parse(fs.readFileSync(dataPath, {encoding: 'utf8'}))

const {APP_P, APP_B, APP_AB, APP_TB} = process.env

export const list = () => {
	const names = students.map(student => student.name)
	console.log(names.join('\n'))
}

export const find = (name) => {
	const student = students.find((student) => student.name.trim().toLowerCase() === name.trim().toLowerCase())
	if (!student) {
		console.log(`L'élève ${name} n'existe pas.`)
		return
	}
	console.table(student)
}

export const more = (num) => {
	const filterStudent =  students.filter(student => {
		return (student.notes.reduce((acc, curr) => acc + curr, 0) / student.notes.length) > num
	})
	
	console.table(filterStudent)
}

export const addNote = (name, note) => {
	const student = students.find((s) => s.name.toLowerCase() === name.toLowerCase().trim())
	
	if (!student) {
		console.log(`L'étudiant ${name} n'éxiste pas.`)
		return
	}
	const sanitizeNote = parseFloat(note.trim());
	
	if (isNaN(sanitizeNote) || sanitizeNote < 0 || sanitizeNote > 20) {
		console.log("Merci de saisir une valeur numérique comprise entre 0 et 20")
		return
	}
	
	student.notes.push(sanitizeNote)
	console.log(`La note de ${sanitizeNote} à bien été attribuer à ${name}`)
}

export const addMention = (name) => {
	const student = students.find((s) => s.name.toLowerCase() === name.toLowerCase().trim())
	
	if (!student) {
		console.log("Cette élève n'existe pas")
		return
	}
	
	const avg = student.notes.reduce((acc, curr) => acc + curr) / student.notes.length
	let mention;
	if (avg <= 10) {
		mention = null
	} else if (avg > 10 && avg <= 12) {
		mention = APP_P
	} else if (avg > 12 && avg <= 14) {
		mention = APP_B
	} else if (avg > 14 && avg <= 16) {
		mention = APP_AB
	} else {
		mention = APP_TB
	}
	
	student.mention = mention
	console.log(`Mention ${mention} ajouté pour l'élève ${student.name}`)
}

export const saveFile = async () => {
	
	const data = JSON.stringify(students.map((s) => s), null, 2)
	await writeFile(dataPath, data)
	console.log("Fichier enregistré")
}