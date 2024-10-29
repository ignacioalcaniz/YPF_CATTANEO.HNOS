import { Router } from "express";
import { prodManager } from "../Manager/products.manager.js";



export const packageRouter = Router();

packageRouter.get("/", async (req, res) => {
   try {
      const paquetes = await prodManager.getAll()
      res.status(200).json(paquetes)
   } catch (error) {
      res.status(500).json(error)
   }
})

packageRouter.get("/:id", async (req, res) => {
   try {
      const { id } = req.params
      const packageId = await prodManager.getProductbyId(id)
      res.status(200).json(packageId)
   } catch (error) {
      res.status(404).json({ message: error.message })
   }

})


packageRouter.post("/", async (req, res) => {
   try {
      const paquete = await prodManager.createProduct(req.body)
      res.status(201).json( paquete)
   } catch (error) {
      res.status(404).json({ message: error.message })
   }

})
packageRouter.delete("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const packageDel = await prodManager.deleteById(id)
      res.status(200).json({ message: `package id:${packageDel.id} deleted successfully` })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
})

packageRouter.delete("/", async (req, res) => {
   try {
      await prodManager.deleteAll()
      res.status(200).json({ message: "paquetes eliminados con exito" })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
})

packageRouter.put("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const packageUpdate = await prodManager.updateProduct(id, req.body)
      res.status(200).json({ message: `paquete con id: ${packageUpdate.id} modificado con exito` })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
})

