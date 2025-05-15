import pug from 'pug'
import path from "node:path"

const dirname = import.meta.dirname

const viewPath = path.join(dirname, "view")

const menuItems = [
	{ path: '/', title: 'Home', isActive: true },
	{ path: '/about-me', title: 'About', isActive: false },
	{ path: '/references', title: 'References', isActive: false },
	{ path: '/contact-me', title: 'Contact', isActive: false },
];

pug.renderFile(path.join(viewPath, "home.pug"), {
	pretty: true,
	menuItems
}, (err, data) => {
	if (err) throw err
	console.log(data)
})