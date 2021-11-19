const path = require("path")
const fs = require("fs")

const FILE_PATH = path.join(require.main.path, "data", "cart.json")
module.exports = class Cart {
	static addProduct(id, productPrice) {
		fs.readFile(FILE_PATH, (err, data) => {
			let cart = { products: [], totalPrice: 0 }
			if (!err) {
				cart = JSON.parse(data)
			}
			const existingProductIndex = cart.products.findIndex(
				(product) => product.id === id
			)
			const existingProduct = cart.products[existingProductIndex]

			let updatedProduct
			if (existingProduct) {
				updatedProduct = { ...existingProduct }
				updatedProduct.qty = updatedProduct.qty + 1
				cart.products = [...cart.products]
				cart.products[existingProductIndex] = updatedProduct
			} else {
				updatedProduct = { id: id, qty: 1 }
				cart.products = [...cart.products, updatedProduct]
			}
			cart.totalPrice = cart.totalPrice + +productPrice

			fs.writeFile(FILE_PATH, JSON.stringify(cart), (err) => {
				console.log(err)
			})
		})
	}
}
