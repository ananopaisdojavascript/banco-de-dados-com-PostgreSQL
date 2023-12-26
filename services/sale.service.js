import SaleRepository from "../repositories/sale.repository.js"
import ClientRepository from "../repositories/client.repository.js"
import ProductRepository from "../repositories/product.repository.js"

const createSale = async (sale) => {
  // Quantidade de produtos em estoque
  const product = await ProductRepository.getProduct(sale.product_id)

  if (!await ClientRepository.getClient(sale.client_id) || !product) {
    throw new Error("O id (do cliente ou do produto) informado não existe")
  }

  if (product.stock > 0) {
    sale = await SaleRepository.insertSale(sale)
    product.stock--
    await ProductRepository.updateProduct(product)
    return sale
  } else {
    throw new Error("Não tem estoque do produto informado.")
  }
}

const getSales = async (productId) => {
  if (productId) {
    return await SaleRepository.getSalesByProductId(productId)
  }
  return await SaleRepository.getSales()

}

const getSale = async (id) => {
  return await SaleRepository.getSale(id)
}

const updateSale = async (sale) => {
  if (!await ClientRepository.getClient(sale.client_id) || !await ProductRepository.getProduct(sale.product_id)) {
    throw new Error("O id (do cliente ou do produto) informado não existe")
  }
  return await SaleRepository.updateSale(sale)
};

const deleteSale = async (id) => {
  const sale = await SaleRepository.getSale(id)
  if (sale) {
    const product = await ProductRepository.getProduct(sale.product_id)
    await SaleRepository.deleteSale(id)
    product.stock++
    await ProductRepository.updateProduct(product)
  } else {
    throw new Error("O id da venda informada não existe.")
  }

};

export default {
  createSale, getSales, getSale, updateSale, deleteSale
}