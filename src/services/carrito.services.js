import { CartDao } from "../daos/cart.dao.js";
import * as Productservices from "../services/products.services.js";
import { CustomError } from "../utils/error.custom.js";





export const getAll = async () => {
    try {
      return await CartDao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };


    
  export const create = async (nombre) => {
    try {
      const newCart = await CartDao.createCart(nombre);
      if ( newCart) throw new CustomError("Error create cart", 400);
      return newCart;
    } catch (error) {
      throw error;
    }
  };
  
  export const getById = async (id) => {
    try {
      const cart = await CartDao.getCartById(id);
      if (!cart) throw new CustomError("cart Not Found", 404);
      return cart;
    } catch (error) {
      throw error;
    }
  };
  

export const addProductToCart = async(cartId, productId) => {
      try {
          await Productservices.getById(productId);   
          const productexist= await CartDao.addProductToCart(cartId, productId);       
          if(!productexist) throw new CustomError('Error adding product', 404);
          return productexist;
      } catch (error) {
          throw error;
      }
  }