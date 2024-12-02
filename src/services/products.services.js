import { productDao } from "../daos/product.dao.js";
import { CustomError } from "../utils/error.custom.js";


export const getAll = async (page,limit,categoria,sort) => {
    try {
      return await productDao.getAll(page,limit,categoria,sort);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const getById = async (id) => {
    try {
      const producto = await productDao.getById(id);
      if (!producto) throw new CustomError("Product Not Found", 404);
      return producto;
    } catch (error) {
        throw error;
    }
  };
  
  export const create = async (obj) => {
    try {
      const newProd = await productDao.create(obj);
      if (!newProd) throw new CustomError("Error create product", 400);
      return newProd;
    } catch (error) {
      throw error;
    }
  };
  
  export const update = async (id, obj) => {
    try {
      const prodUpd = await productDao.update(id, obj);
      if (!prodUpd) throw new CustomError("error update product", 400);
      return prodUpd;
    } catch (error) {
      throw error;
    }
  };
  
  export const remove = async (id) => {
    try {
      const prodDel = await productDao.delete(id);
      if (!prodDel) throw new CustomError("error delete product", 400);
      return prodDel;
    } catch (error) {
      throw error;
    }
  };