import express from "express"
import cors from "cors"
import winston from "winston"
import ProductsRouter from "./routes/client.router.js"
import ClientsRouter from "./routes/product.router.js"
import SuppliersRouter from "./routes/supplier.router.js"
import SalesRouter from "./routes/sale.router.js"

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level} : ${message}`
})

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "store-api.log" })
    ],
    format: combine(
        label({ label: "store-api" }),
        timestamp(),
        myFormat
    )
})

const port = 3000
const app = express()
app.use(express.json())
app.use(cors())
app.use("/client", ClientsRouter)
app.use("/product", ProductsRouter)
app.use("/supplier", SuppliersRouter)
app.use("/sale", SalesRouter)
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})