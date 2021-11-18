const imageRoute = require("../routes/image")
const imagesRoute = require("../routes/images")

exports.init = (app) => {
	app.use("/image", imageRoute)
	app.use("/images", imagesRoute)
}
