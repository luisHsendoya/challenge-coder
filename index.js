import express from 'express';
import * as dotenv from 'dotenv';
import apiRouter from './routes/index.js'
dotenv.config()

const app= express()

app.use(express.urlencoded({
    extended: true
  }))
app.use(express.static('public'));

apiRouter(app);




const PORT= process.env.PORT_ENV
app.listen(PORT, ()=>{console.log(`listenig port on the http://localhost:${PORT}`);})

