const fs = require("fs")
const path = require("path")
const FILE_PATH = path.join(require.main.path, "data", "images.json")

const getImages = (callback) => {
	let fileExists = fs.existsSync(FILE_PATH)
	if (fileExists) {
		fs.readFile(FILE_PATH, (err, data) => {
			if (err) throw err
			let content = JSON.parse(data)
			// console.log(content)
			callback(content)
		})
	} else {
		callback([])
	}
}

const getImage = (id, cb) => {
	let fileExists = fs.existsSync(FILE_PATH)
	if (fileExists) {
		fs.readFile(FILE_PATH, (err, data) => {
			if (err) throw err
			let content = JSON.parse(data)
			const image = content.find((image) => image.id === id)
			cb(image)
		})
	} else {
		cb({})
	}
}

class Image {
	constructor(name, url, price) {
		this.name = name
		this.url = url
		this.price = price
		this.FILE_PATH
	}
	static findById(id, cb) {
		getImage(id, cb)
	}
	save() {
		this.id = Math.random().toString()
		let fileExists = fs.existsSync(FILE_PATH)
		if (fileExists) {
			fs.readFile(FILE_PATH, (err, data) => {
				if (err) throw err
				let content = JSON.parse(data)
				content.push(this)

				fs.writeFile(FILE_PATH, JSON.stringify(content), function (err) {
					if (err) throw err
					console.log("It's saved!")
				})
			})
		} else {
			fs.writeFile(
				FILE_PATH,
				JSON.stringify([this]),
				{ flag: "wx" },
				function (err) {
					if (err) throw err
					console.log("It's saved!")
				}
			)
		}
	}

	static fetchAll(callback) {
		getImages(callback)
	}

	static deleteImage(imageName) {
		let fileExists = fs.existsSync(FILE_PATH)
		if (fileExists) {
			fs.readFile(FILE_PATH, (err, data) => {
				if (err) throw err

				let left = JSON.parse(data).filter((image) => image.name !== imageName)
				fs.writeFile(FILE_PATH, JSON.stringify(left), function (err) {
					if (err) throw err
					console.log("It's deleted")
				})
			})
		} else {
			console.log("File does not exist")
		}
	}
}

module.exports = Image
