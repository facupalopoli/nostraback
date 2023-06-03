import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    titulo:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
})

export default model('Productos', productSchema)