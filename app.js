import express from "express"
import env from "dotenv"
import routers from "./routes/route.mjs"

const port = env.config().parsed.port
const app = express()

app.use(express.json())
app.use(routers)

app.listen(port, ()=>{
    console.log(`Servidor ligado na porta: ${port}`)
})

// import sqlite3 from "sqlite3"

// const db = new sqlite3.Database("./src/models/database.db")

// db.serialize( ()=>{
//     db.run("CREATE TABLE usuarios (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, senha TEXT, data DATE)")
// })