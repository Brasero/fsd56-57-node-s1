import http from "node:http";

const server = http.createServer((req, res) => {
	const url = req.url.replace("/", "")
	
	if (url === "favicon.ico") {
		res.writeHead(200, {
			"Content-type": "image/x-icon"
		})
		res.end()
		return;
	}
	
	if (url === "toto") {
		res.writeHead(200, {
			"Content-type": "text/plain"
		})
		res.end("Bonjour toto")
		return
	}
	
	if (url === "html") {
		res.writeHead(200, {
			"Content-type": "text/html"
		})
		
		res.end(`
			<!DOCTYPE html>
			<html lang="fr">
				<head>
				 <title>Mon html</title>
				</head>
				<body>
					<div>Hello Node</div>
				</body>
			</html>
		`)
		return
	}
	
	res.writeHead(200, {
		"Content-type": "text/plain"
	})
	res.end("Hello world !")
})

server.listen(8000, "localhost", () => {
	console.log(`Server running on http://localhost:8000`)
})