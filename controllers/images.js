const fs = require("fs")
const path = require("path")
const Image = require("../models/image")

FILE_PATH = path.join(require.main.path, "data.json")

exports.getImages = (req, res) => {
	Image.fetchAll((images) => res.json(images))
}

exports.postImages = (req, res) => {
	const newImages = []
	for (const image of req.body) {
		if (!image.id) {
			image.id = Math.random().toString()
			newImages.push(image)
		}
	}
	console.log(newImages)
	Image.fetchAll((images) => {
		let data
		if (images.length > 0) data = [...images, ...newImages]
		else data = newImages

		fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
			if (err) throw err
			res.json({ msg: `saved successfully` })
		})
	})
}
