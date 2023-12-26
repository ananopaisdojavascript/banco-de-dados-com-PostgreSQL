import ProductService from "../services/product.service.js";

const createProduct = async(request, response, next) => {
  try {
    let product = request.body
    const areTheFieldsValid = !product.name || !product.description || !product.value || !product.stock || !product.supplier_id
    if (areTheFieldsValid) {
      throw new Error("O preenchimento dos campos de nome, descrição, valor, estoque e id do fornecedor é obrigatório.")
    }
    product = await ProductService.createProduct(product)
    logger.info(`POST /product - ${JSON.stringify(product)}`);
    response.send(product)
  } catch(error) {
    next(error)
  }
}

const getProducts = async (_request, response, next) => {
  try {
    response.send(await ProductService.getProducts())
    logger.info("GET /product")
  } catch (error) {
    next(error)
  }
}

const getProduct = async (request, response, next) => {
  try {
    response.send(await ProductService.getProduct(request.params.id));
    logger.info("GET /product/:id");
  } catch (error) {
    next(error);
  }
};


const updateProduct = async(request, response, next) => {
  try {
    let product = request.body
    const areTheFieldsValid = !product.name || !product.description || !product.value || !product.stock || !product.supplier_id
    if (areTheFieldsValid) {
      throw new Error("O preenchimento dos campos de nome, descrição, valor, estoque e id do fornecedor é obrigatório.")
    }
    product = await ProductService.updateProduct(product)
    logger.info(`PUT /product - ${JSON.stringify(product)}`)
    response.send(product)
  } catch(error) {
    next(error)
  }
}

const deleteProduct = async (request, response, next) => {
  try {
    await ProductService.deleteProduct(request.params.id)
    response.end();
    logger.info(`DELETE /product/:id - ${request.params.id}`);
  } catch (error) {
    next(error);
  }
};

export default {
  createProduct, getProducts, getProduct, updateProduct, deleteProduct
}