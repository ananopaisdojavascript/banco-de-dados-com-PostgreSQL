import SaleService from "../services/sale.service.js";

const createSale = async (request, response, next) => {
  try {
    let sale = request.body
    const areTheFieldsValid = !sale.value || !sale.date || !sale.client_id || !sale.product_id

    if (areTheFieldsValid) {
      throw new Error("O preenchimento dos campos de valor, data, id do cliente e id do produto é obrigatório.")
    }
    sale = await SaleService.createSale(sale)
    logger.info(`POST /sale - ${JSON.stringify(sale)}`);
    response.send(sale)
  } catch (error) {
    next(error)
  }
};

const getSales = async (request, response, next) => {
  try {
    response.send(await SaleService.getSales(request.query.product_id))
    logger.info("GET /sale")
  } catch (error) {
    next(error)
  }
}

const getSale = async (request, response, next) => {
  try {
    response.send(await SaleService.getSale(request.params.id));
    logger.info("GET /sale/:id");
  } catch (error) {
    next(error);
  }
};

const updateSale = async (request, response, next) => {
  try {
    let sale = request.body;
    const areTheFieldsValid = !sale.sale_id || !sale.value || !sale.date || !sale.client_id || !sale.product_id

    if (areTheFieldsValid) {
      throw new Error("O preenchimento dos campos de valor, data, id do cliente e id do produto é obrigatório.")
    }
    sale = await SaleService.updateSale(sale)
    response.send(sale)
    logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (request, response, next) => {
  try {
    await SaleService.deleteSale(request.params.id)
    response.end();
    logger.info(`DELETE /sale/:id - ${request.params.id}`);
  } catch (error) {
    next(error);
  }
};

export default {
  createSale, getSales, getSale, updateSale, deleteSale
}