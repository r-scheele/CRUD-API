const fs = require("fs")
const path = require("path")
const Image = require("../models/image")
const resHandler = require("../util/resHandler")
FILE_PATH = path.join(require.main.path, "data.json")

exports.getImages = (req, res) => {
	Image.fetchAll((images) =>
		resHandler.successResMsg({
			res,
			success: true,
			message: "File deleted successfully",
			data: images,
		})
	)
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
			resHandler.successResMsg({
				res,
				success: true,
				message: "Images saved successfully",
			})
		})
	})
}

exports.deleteImages = (req, res) => {
	let fileExists = fs.existsSync(FILE_PATH)
	if (fileExists) {
		fs.unlink(FILE_PATH, (err) => {
			if (err) throw err
			resHandler.successResMsg({
				res,
				success: true,
				message: "File deleted successfully",
			})
		})
	} else {
		res.json({msg: "File does not exist"})
	}
}
