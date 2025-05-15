import http from "node:http";
import dotenv from "dotenv";
import path from "node:path";
import pug from "pug";
import fs from "node:fs";

dotenv.config();

const {HOST, PORT} = process.env

const dirname = import.meta.dirname
const viewPath = path.join(dirname, "view")
const assetsPath = path.join(dirname, "assets")

const server = http.createServer((req, res) => {
	
	const url = req.url.replace("/", "")
	
	if (url === "favicon.ico") {
		res.writeHead(200, {
			"content-type": "image/x-icon"
		})
		res.end()
		return
	}
	
	if (url.startsWith("style")) {
		const stylesheetName = url.split("/").pop()
		const stylesheet = fs.readFileSync(path.join(assetsPath, stylesheetName))
		
		res.writeHead(200, {
			"content-type": "text/css"
		})
		res.end(stylesheet)
		return
	}
	
	if (url === "" ) {
		res.writeHead(200, {
			"content-type": "text/html"
		})
		
		pug.renderFile(path.join(viewPath, "home.pug"), {}, (err, data) => {
			if (err) throw err;
			res.end(data)
		})
		return
	}
	
	if (url === "user") {
		res.writeHead(200, {
			"content-type": "text/html"
		})
		
		pug.renderFile(path.join(viewPath, "user.pug"), {}, (err, data) => {
			if (err) throw err;
			res.end(data)
		})
	}
	
})

server.listen(PORT, HOST, () => {
	console.log("running")
})