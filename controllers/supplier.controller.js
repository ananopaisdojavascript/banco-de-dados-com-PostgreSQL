import SupplierService from "../services/supplier.service.js"

const createSupplier = async(request, response, next) => {
  try {
    let supplier = request.body
    const areTheFieldsValid = !supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address

    if (areTheFieldsValid) {
      throw new Error("O preenchimento dos campos de nome, CNPJ, telefone, e-mail e endereço é obrigatório.")
    }
    supplier = await SupplierService.createSupplier(supplier)
    logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);
    response.send(supplier)
  } catch (error) {
    next(error)
  }
}

const getSuppliers = async(_request, response, next) => {
  try {
    response.send(await SupplierService.getSuppliers())
    logger.info("GET /supplier")
  } catch(error) {
    next(error)
  }
}

const getSupplier = async (request, response, next) => {
  try {
    response.send(await SupplierService.getSupplier(request.params.id));
    logger.info("GET /supplier/:id");
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async(request, response, next) => {
  try {
    let supplier = request.body
    const areTheFieldsValid = !supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address

    if (areTheFieldsValid) {
      throw new Error("O preenchimento dos campos de nome, CNPJ, telefone, e-mail e endereço é obrigatório.")
    }
    supplier = await SupplierService.updateSupplier(supplier)
    logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`);
    response.send(supplier)
  } catch (error) {
    next(error)
  }
}

const deleteSupplier = async (request, response, next) => {
  try {
    await SupplierService.deleteSupplier(request.params.id)
    response.end();
    logger.info(`DELETE /supplier/:id - ${request.params.id}`);
  } catch (error) {
    next(error);
  }
};

export default {
  createSupplier, getSuppliers, getSupplier, updateSupplier, deleteSupplier
}