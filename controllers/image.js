const resHandler = require("../util/resHandler")
const fs = require("fs")
const path = require("path")
const Image = require("../models/image")

FILE_PATH = path.join(require.main.path, "data.json")

exports.postImage = (req, res) => {
	const { name, url } = req.body
	image = new Image(name, url)
	image.save()
	res.json(image)
}

exports.getImage = (req, res) => {
	Image.findById(req.params.id, (image) =>
		resHandler.successResMsg({
			res,
			success: true,
			message: "File deleted successfully",
			data: image,
		})
	)
}

exports.putImage = (req, res) => {
	Image.fetchAll((images) => {
		let prevImage = images.find((image) => image.id === req.params.id)
		const newImage = {
			...prevImage,
			...req.body,
		}
		images.splice(images.indexOf(prevImage), 1, newImage)
		fs.writeFile(FILE_PATH, JSON.stringify(images), (err) => {
			if (err) throw err
			resHandler.successResMsg({
				res,
				success: true,
				message: "Image saved successfully",
			})
		})
	})
}

exports.deleteImage = (req, res) => {
	Image.fetchAll((images) => {
		let prevImage = images.find((image) => image.id === req.params.id)
		images.splice(images.indexOf(prevImage), 1)
		fs.writeFile(FILE_PATH, JSON.stringify(images), (err) => {
			if (err) throw err
			resHandler.successResMsg({
				res,
				success: true,
				message: "Image deleted successfully",
			})
		})
	})
}

exports.getImages = (req, res) => {
	Image.fetchAll((images) => {
		resHandler.successResMsg({
			res,
			success: true,
			message: "File deleted successfully",
			data: images,
		})
	})
}

exports.postImages = (req, res) => {
	Image.fetchAll((images) => {
		const data = [...images, ...req.body]
		fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
			if (err) throw err
			resHandler.successResMsg({
				res,
				success: true,
				message: "Image deleted successfully",
			})
		})
	})
}
