const express = require("express")

const route = require("./util/routes")

const app = express()
app.use(express.json())
route.init(app)

app.listen(3000, console.log("server listening on port http://localhost:3000"))
