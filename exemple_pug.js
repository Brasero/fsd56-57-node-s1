import pug from "pug"
import path from 'node:path'

const dirname = import.meta.dirname
const viewPath = path.join(dirname, "view")

const template = `
if age >= 18
	h1 Accès autorisé
else
	h1 Accès refusée
`;

// const compileTemplate = pug.compile(template)
// const result = compileTemplate({ age: 17 })

// pug.render(template, {age: 19}, (err, data) => {
// 	if (err) throw err
// 	console.log(data)
// })

// const compileTemplate = pug.compileFile(path.join(viewPath, "exemple.pug"));
// console.log(compileTemplate({age: 18}))

pug.renderFile(path.join(viewPath, "exemple.pug"), {age: 12}, (err, data) => {
	if (err) throw err
	console.log(data)
})