import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        select:false,
    }
})

export default model('Usuarios', userSchema)