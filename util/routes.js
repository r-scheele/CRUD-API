const imageRoute = require("../routes/image")
const imagesRoute = require("../routes/images")
const cartRoute = require("../routes/cart")

exports.init = (app) => {
	app.use("/image", imageRoute)
	app.use("/images", imagesRoute)
	app.use("/cart", cartRoute)
}
