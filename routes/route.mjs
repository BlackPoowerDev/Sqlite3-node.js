import express from "express"
import * as clientControllers from "../src/controllers/clientControllers.mjs"

const app = express()

app.get('/user/:id', clientControllers.getUser)
app.post('/register', clientControllers.register)
app.put('/update/user/:id', clientControllers.updateUser)
app.delete('/delete/user/:id', clientControllers.deleteUser)

export default app

