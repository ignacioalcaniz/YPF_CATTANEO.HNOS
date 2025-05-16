import { productServices } from "../services/products.services.js";




class ProductController {
  constructor(services) {
    this.services = services;
  }
  getAll = async (req, res, next) => {
     try {
    const { page, limit,categoria,sort } = req.query;
    const response = await this.services.getAll(page,limit,categoria,sort);
    const status = response && response.docs && response.docs.length > 0 ? 'success' : 'error';
    res.json(({
      status: status,
      payload: response.docs,
      page:response.page,
      info: {
        TotalDocs: response.totalDocs,
        Totalpages: response.totalPages,
        nextPage: response ? response.nextPage : null,
        prevPage: response ? response.prevPage : null, 
        nextLink: response.hasNextPage ? `http://localhost:3000/products?page=${response.nextPage}` : null,
        prevLink: response.hasPrevPage ? `http://localhost:3000/products?page=${response.prevPage}` : null
      }
    }));
  } catch (error) {
    next(error);
  }
  };

  getById = async (req, res, next) => {
     try {
    const { id } = req.params;
    const product = await this.services.getById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
  };

  create = async (req, res, next) => {
   try {
    const newProduct = await this.services.create(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
  };

  update = async (req, res, next) => {
    try {
    const { id } = req.params;
    const productUpdated = await this.services.update(id, req.body);
    res.json(productUpdated);
  } catch (error) {
    next(error);
  }
  };

  delete = async (req, res, next) => {
     try {
    const { id } = req.params;
    const prodDel = await this.services.remove(id);
    res.json(prodDel);
  } catch (error) {
    next(error);
  }
  };
}

export const productController = new ProductController(productServices);
