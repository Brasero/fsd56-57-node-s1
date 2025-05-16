import dotenv from "dotenv"
import http from "node:http";
import app from "./src/app.js";

dotenv.config()

const {APP_ENV, APP_PORT, APP_HOST} = process.env
const port = APP_PORT || 8000;
const host = APP_HOST || "localhost";
const env = APP_ENV || "production";

http.createServer(app)
.listen(port, host, () => {
	if (env !== "production") {
		console.log(`Server running on http://${host}:${port}`)
	}
})