import express from "express"
import cors from "cors"
import winston from "winston"
import ClientRouter from "./routes/client.router.js"

const app = express()

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

app.use(express.json())
app.use(cors())
app.use("/client", ClientRouter)
app.use((error, request, response, _next) => {
  logger.error(`${request.method} ${request.baseUrl} - ${error.message}`);
  response.status(400).send({
    error: error.message,
  });
});

const port = 3000

app.listen(port, () => {
  try {
    logger.info(`Servidor rodando na porta ${port}`)
  } catch (error) {
    logger.error(error)
  }
})