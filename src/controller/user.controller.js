import {join} from "node:path"
import fs from "node:fs"

const dirname = import.meta.dirname
const dataPath = join(dirname, "..", "..", "data")

export const getUsers = () => JSON.parse(fs.readFileSync(join(dataPath, "all.json"), {encoding: "utf8"}))
export const saveUsers = (users) => {
	fs.writeFileSync(join(dataPath, "all.json"), JSON.stringify(users, null, 2))
}
export const saveUser = (user) => {
	fs.writeFileSync(join(dataPath, `${user.name}.json`), JSON.stringify(user, null, 2))
}
export const deleteUserByName = name => {
	const users = getUsers()
	const newUsers = users.filter(user => user.name !== name)
	saveUsers(newUsers)
	fs.unlinkSync(join(dataPath, `${name}.json`))
	return newUsers
}
export const getUser = (name) => JSON.parse(fs.readFileSync(join(dataPath, `${name}.json`), {encoding: "utf8"}))