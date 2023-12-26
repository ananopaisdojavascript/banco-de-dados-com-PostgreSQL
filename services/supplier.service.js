import SupplierRepository from "../repositories/supplier.repository.js"

const createSupplier = async (supplier) => {
  return await SupplierRepository.insertSupplier(supplier)
}

const getSuppliers = async () => {
  return await SupplierRepository.getSuppliers()
}

const getSupplier = async (id) => {
  return await SupplierRepository.getSupplier(id)
}

const updateSupplier = async (supplier) => {
  return await SupplierRepository.updateSupplier(supplier)
};

const deleteSupplier = async (id) => {
  await SupplierRepository.deleteSupplier(id)
};


export default {
  createSupplier, getSuppliers, getSupplier, updateSupplier, deleteSupplier
}