import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import productsRouter from './routes/products.js'
import './mongodb.js'
import Products from './models/Products.js'


const app = express()

app.use(morgan('dev'))
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())

app.get('/', async (req,res)=>{
    try{
        const productsPerPage = 4
        const productos = await Products.aggregate([{ $sample: { size: 4 } }])
        res.render('pages/index', {productos:productos, productsPerPage: productsPerPage})    
    }
    catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

app.use('/products', productsRouter)

app.all('/*',(req,res)=>{
    res.status(404).json({mensaje:'no se reconoce la direccion web'})
})

app.listen(3030,()=>{
    console.log('servidor ejecutado')
})

