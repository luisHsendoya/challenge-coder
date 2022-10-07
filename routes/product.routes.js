import express from "express";
import Contenedor from "../service/product.service.js";
import {
  displayAllProducts,
  createNewProduct,
  showFormulario
} from "../controllers/producto.controller.js";

const router = express.Router();
const service = new Contenedor();

router.get("/home", displayAllProducts);

router.get("/submit", showFormulario);

router.get("/random", async (req, res) => {
  try {
    const product = await service.randomProduct();
    res.json(product);
  } catch (error) {
    console.error("error");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    console.error("error");
  }
});

router.post("/submit", createNewProduct);

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const productUpdated = await service.update(id, data);

    return {
      status: 200,
      message: `the product id #${id} was updated succesfully`,
      data: productUpdated,
    };
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await service.deleteById(id);

    res.json({
      status: 200,
      message: `The product id #${id} was deleted succesfully`,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
