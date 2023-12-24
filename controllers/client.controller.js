import ClientService from "../services/client.service.js"

const createClient = async (request, response, next) => {
    try {
        let client = request.body
        const areTheFieldsValid = !client.name || !client.cpf || !client.phone || !client.email || !client.address

        if (areTheFieldsValid) {
            throw new Error("O preenchimento dos campos de nome, CPF, telefone, e-mail e endereço é obrigatório.")
        }

        response.send(await ClientService.createClient(client))
        logger.info(`POST /client - ${JSON.stringify(client)}`)
    } catch (error) {
        next(error)
    }
}

export default {
    createClient
}