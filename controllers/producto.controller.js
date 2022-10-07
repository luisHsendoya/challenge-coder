import Contenedor from "../service/product.service.js";

const service = new Contenedor();

async function displayAllProducts(req, res) {
  try {
    const products = await service.getAll();
    res.render("product/home", { products: products });
  } catch (error) {
    console.error(error);
  }
}

async function createNewProduct(req, res) {
  const { title, price, thumbnail } = req.body;

  try {
   
    await service.create({ title, price, thumbnail });
    
    
  } catch (error) {
    console.error(error);
  }
}


function showFormulario(req,res){

    res.render("product/submit");
}

export { displayAllProducts, createNewProduct, showFormulario };
