const router = require("express").Router()
const imagesController = require("../controllers/images")

router.get("/", imagesController.getImages)
router.post("/add", imagesController.postImages)

module.exports = router
