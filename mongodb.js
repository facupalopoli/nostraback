import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({path : './config.env'})

mongoose
.connect(process.env.MONGO_LOCAL)
// .connect(process.env.MONGO_ATLAS)
.then(()=>console.log('CONEXION ESTABLECIDA CON LA BASE DE DATOS'))
.catch(error=>console.log(error))
