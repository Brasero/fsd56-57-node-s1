import fs from "node:fs"
import path from "node:path"

const dirname = import.meta.dirname
const dataPath = path.join(dirname, "..", "data", "users.json")
const users = JSON.parse(fs.readFileSync(dataPath, {encoding: "utf-8"}))

export const getUsers = () => {
	return users;
}

export const getUserById = (id) => {
	return users.find((user, i) => i === Number(id))
}

export const saveUsers = (users) => {
	fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))
	return
}