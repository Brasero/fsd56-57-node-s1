import fs from "node:fs";
import path from "node:path"

console.log(process.cwd())
const cwd = process.cwd()

const dataPath = path.join(cwd, "data", "student.json")

const students = JSON.parse(fs.readFileSync(dataPath, {encoding: 'utf8'}))


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

export const saveFile = () => {
	fs.writeFileSync(dataPath, JSON.stringify(students, null, 2))
	console.log("Fichier sauvegardé")
}