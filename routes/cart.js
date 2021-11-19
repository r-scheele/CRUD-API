const router = require("express").Router()
const cartController = require("../controllers/cart")

router.get("/", cartController.getCart)
router.post("/add", cartController.postCart)

module.exports = router
