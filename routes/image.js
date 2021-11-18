const express = require("express")
const router = express.Router()
const imageController = require("../controllers/image")

router.get("/:id", imageController.getImage)
router.post("/", imageController.postImage)
router.put("/:id", imageController.putImage)
router.delete("/:id", imageController.deleteImage)

module.exports = router
