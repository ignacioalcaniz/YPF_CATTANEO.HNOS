import * as services from "../services/products.services.js";

export const getAll = async (req, res, next) => {
  try {
    const { page, limit,categoria,sort } = req.query;
    const response = await services.getAll(page,limit,categoria,sort);
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

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await services.getById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProduct = await services.create(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpdated = await services.update(id, req.body);
    res.json(productUpdated);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDel = await services.remove(id);
    res.json(prodDel);
  } catch (error) {
    next(error);
  }
};

