const router = require("express").Router()
const imagesController = require("../controllers/images")

router.get("/", imagesController.getImages)
router.post("/add", imagesController.postImages)
router.delete("/delete", imagesController.deleteImages)

module.exports = router
