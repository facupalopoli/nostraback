import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    titulo:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
    categoria:{
        type: String,
        required: true,
    },
    talle:{
        type: String,
        required: true,
    },
    marca:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    url_imagen:{
        type: Array,
        required: true,
    }
})

export default model('Productos', productSchema)

