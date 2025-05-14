import http from "node:http";
import dotenv from "dotenv";
import {getUserById, getUsers, saveUsers} from "./controller/users.controller.js";
import path from "node:path";
import fs from "node:fs";
import * as querystring from "querystring";

dotenv.config();

const {HOST, PORT} = process.env

const dirname = import.meta.dirname
const viewPath = path.join(dirname, "view")

const server = http.createServer((req, res) => {
	const header = fs.readFileSync(path.join(viewPath, "__header.html"), {encoding: "utf-8"})
	const footer = fs.readFileSync(path.join(viewPath, "__footer.html"), {encoding: "utf-8"})
	const url = req.url.replace("/", "")
	
	if (url === "favicon.ico") {
		res.writeHead(200, {
			"content-type": "image/x-icon"
		})
		res.end()
		return
	}
	
	if (url === "") {
		const users = getUsers();
		
		let html = header;
		users.forEach((user, i) => {
			html += `<a href="/detail/${i}">${user.nom}</a><br />`
		})
		html += footer
		res.writeHead(200, {
			"content-type": "text/html"
		})
		res.end(html)
		return
	}
	
	if (url.startsWith("detail")) {
		const id = url.split("/").pop()
		const user = getUserById(id)
		if (!user) {
			res.writeHead(500, {
				"content-type": "text/html"
			})
			res.end(`${header}
			<div>
				<p>Utilisateur inconnu</p>
				<a href="/">Retour</a>
			</div>
			${footer}`)
			return
		}
		let html = header
		html += `
		<div>
		<p>Nom : ${user.nom}</p>
		<p>Email : ${user.email}</p>
		<p>Role : ${user.role}</p>
</div>
<div><a href="/">Retour</a></div>
		`
		html += footer;
		
		res.writeHead(200, {
			"content-type": "text/html"
		})
		res.end(html)
		return
	}
	
	if (url === "add") {
		const form = fs.readFileSync(path.join(viewPath, "form.html"))
		if (req.method === "GET") {
			
			let html = header + form + footer;
			res.writeHead(200, {
				"content-type": "text/html"
			})
			res.end(html)
			return
		}
		if (req.method === "POST") {
			let body = "";
			req.on('data', (chunk) => {
				body += chunk.toString()
			}).on("end", () => {
				const data = querystring.parse(body)
				if (!data.nom || data.nom.trim() === "" || !data.email || data.email.trim() === "") {
					res.writeHead(500, {
						"content-type": "text/html"
					})
					let html = header + `<span style="color: red;">Merci de bien remplir tout les champs</span>` + form + footer
					res.end(html)
					return
				}
				const user = {
					...data,
					role: "utilisateur"
				}
				const users = getUsers();
				users.push(user)
				saveUsers(users)
				res.writeHead(302, {
					"location": "/"
				})
				res.end()
			})
			
		}
	}
	
})

server.listen(PORT, HOST, () => {
	console.log(`Listening on http://${HOST}:${PORT}`)
})