const Image = require("../models/Image")
const Cart = require("../models/Cart")

exports.getCart = (req, res) => {
	console.log("Get cart")
}

exports.postCart = (req, res) => {
	const id = req.body.id
	Image.findById(id, (image) => {
		Cart.addProduct(id, image.price)
	})
}
