import pug from "pug"
import path from 'node:path'
import http from 'node:http'

const dirname = import.meta.dirname
const viewPath = path.join(dirname, "view")

// const template = `
// if age >= 18
// 	h1 Accès autorisé
// else
// 	h1 Accès refusée
// `;

// const compileTemplate = pug.compile(template)
// const result = compileTemplate({ age: 17 })

// pug.render(template, {age: 19}, (err, data) => {
// 	if (err) throw err
// 	console.log(data)
// })

// const compileTemplate = pug.compileFile(path.join(viewPath, "exemple.pug"));
// console.log(compileTemplate({age: 18}))

// pug.renderFile(path.join(viewPath, "exemple.pug"), {age: 12}, (err, data) => {
// 	if (err) throw err
// 	console.log(data)
// })

// const server = http.createServer((req, res) => {
// 	const url = req.url.replace("/", "")
// 	const user = {
// 		isAdmin: true
// 	}
// 	if (url === "") {
// 		user.isAdmin = false
// 	}
//
// 	pug.renderFile(path.join(viewPath, "admin.pug"), {user}, (err, data) => {
// 		if (err) {
// 			res.writeHead(500, {
// 				'content-type': "text/plain"
// 			})
// 			res.end("Une erreur s'est produite lors de la compilation")
// 			return
// 		}
// 		res.writeHead(200, {
// 			"content-type": "text/html"
// 		})
// 		res.end(data)
// 	})
// })
//
// server.listen(8000, "localhost", () => {
// 	console.log("server running")
// })

// pug.renderFile(path.join(viewPath, "nav.pug"), {}, (err, data) => {
// 	if (err) throw err
// 	console.log(data)
// })

const html = `<div>Hello</div>`

const compile = pug.compileFile(path.join(viewPath, "nav.pug"), {pretty: true})

console.log(compile({
	name: "Paul",
	age: 32,
	html,
	color: "toto"
}))