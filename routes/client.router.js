import express from "express"
import ClientController from "../controllers/client.controller.js"

const router = express.Router()

router.use((error, request, response, _next) => {
    logger.error(`${request.method} ${request.baseUrl} - ${error.message}`)
    response.status(400).send({
        error: error.message
    })
})

router.post("/", ClientController.createClient)

export default router