import express from 'express'
import  Contenedor from '../service/product.service.js'

const router= express.Router()
const service= new Contenedor()


router.get('/',async (req,res)=>{

    try {
        const products= await service.getAll()
        res.json(products)
    } catch (error) {
        console.error(error);
        
    }

})

router.get('/random',async(req,res)=>{

    try {
        const product= await service.randomProduct()
        res.json(product)
        
    } catch (error) {
        console.error('error')
    }

})

router.get('/:id',async(req,res)=>{
    const {id}= req.params

    try {
        const product= await service.findOne(id)
        res.json(product)
        
    } catch (error) {
        console.error('error')
    }

})

router.post('/submit', async (req,res)=>{
    const {title,price,thumbnail}=req.body;

    try {
        const newProduct= await service.create({title,price,thumbnail})
        return {status:201,
            message:`the object has been created succesfully`,
            data:newProduct
    }
        
    } catch (error) {
        console.error(error)
        
    }

})

router.patch('/:id',async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    try {
        const productUpdated= await service.update(id,data)

        return {
            status:200,
            message:`the product id #${id} was updated succesfully`,
            data: productUpdated
        }
        
    } catch (error) {
        console.log(error)
        
    }
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        await service.deleteById(id)
       
        res.json({
            status:200,
            message:`The product id #${id} was deleted succesfully`,
            
        })
        

        
    } catch (error) {
        console.log(error)
        
    }

})

export default router;