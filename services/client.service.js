import ClientRepository from "../repositories/client.repository.js"

const createClient = async (client) => {
    return await ClientRepository.insertClient(client)
}

export default {
    createClient
}