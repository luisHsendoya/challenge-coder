import express from 'express'
import producRouter from './product.routes.js'

export default function apiRouter(app){
    const router= express.Router()
    app.use('/api/v1',router);
    router.use('/product',producRouter)


}

