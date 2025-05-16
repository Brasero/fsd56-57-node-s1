import fs from "node:fs"
import path from "node:path"
import pug from "pug";
import * as querystring from "querystring";
import {deleteUserByName, getUser, getUsers, saveUser, saveUsers} from "./controller/user.controller.js";

const dirname = import.meta.dirname
const assetsPath = path.join(dirname, "..", "assets")
const stylePath = path.join(assetsPath, "css")
const viewPath = path.join(dirname, "view", "page")

const renderPage = (pageName, data = null) => {
	return pug.renderFile(path.join(viewPath, `${pageName}.pug`), {...data})
}

const app = (req, res) => {

	const throwCompilationError = (fileName) => {
		res.writeHead(500, {
			"content-type": "text/plain"
		})
		res.end(`
			Internal server error.
			${process.env.APP_ENV !== "production" && `Une erreur s'est produite lors de la compilation du fichier ${fileName}.pug`}
		`)
	}
	const send = (mime, data, code = 200) => {
		res.writeHead(code, {
			"content-type": mime
		})
		res.end(data)
	}
	
	const url = req.url.replace("/", "")
	
	if (url.startsWith("styles")) {
		const stylesheetName = url.split("/").pop()
		const stylesheet =  fs.readFileSync(path.join(stylePath, `${stylesheetName}`), {encoding: "utf8"})
		return send("text/css", stylesheet)
	}
	
	if (url === "") {
		switch(req.method) {
			case "GET":
				try {
					send('text/html', renderPage("home"))
				} catch(e) {
					throwCompilationError("home")
				}
				break
			case "POST":
				let body = "";
				req.on("data", (chunk) => {
					body += chunk.toString()
				})
				 .on("end", () => {
					 const data = querystring.parse(body)
					 if (!data.name || !data.birth || data.name.trim() === "") {
						 const toast = {
							 status: "error",
							 message: "Merci de compléter tout les champs"
						 }
						 try {
							 send("text/html", renderPage("home", {toast}), 400)
						 } catch(e) {
							 throwCompilationError('home')
						 }
					 } else {
						const users = getUsers()
						 const name = data.name.trim()
						 const {birth} = data
						 const user = {
							name,
						  birth
						 }
						 users.push(user)
						 saveUsers(users)
						 saveUser(user)
						 const toast = {
							status: "success",
						  message: "Utilisateur ajouté avec succées"
						 }
						 send("text/html", renderPage("home", {toast}))
					 }
				 })
				break
			default:
				send("text/html", "404")
		}
		
		return
	}
	
	if (url === "users") {
		const users = getUsers()
		send("text/html", renderPage("users", {users}))
		return
	}
	
	if (url.startsWith("delete")) {
		const name = url.split("/").pop()
		const users = deleteUserByName(name)
		const toast = {
			status: "success",
			message: "Suppression réussie"
		}
		return send("text/html", renderPage("users", {users, toast}))
	}
	
	if (url.startsWith("user")) {
		switch (req.method) {
			case "GET":
				const name = url.split("/").pop()
				const user = getUser(name)
			  send("text/html", renderPage("home", {user, formAction: req.url}))
				break;
			case "POST":
				let body = "";
				req.on('data', (chunk) => {
					body += chunk.toString()
				})
				 .on("end", () => {
					 const name = req.url.split("/").pop()
					 const data = querystring.parse(body)
					 const users = deleteUserByName(name)
					 const newUsers = [...users, {...data}]
					 saveUsers(newUsers)
					 saveUser(data)
					 const toast = {
						 status: "success",
						 message: "Utilisateur modifier."
					 }
					 return send(
						"text/html",
					  renderPage(
						 "home",
					   {
							 user: data,
						   toast,
						   formAction: req.url,
						 })
					 )
				 })
				break
		}
		return
	}
	
	return send("text/html", "404")
}

export default app;