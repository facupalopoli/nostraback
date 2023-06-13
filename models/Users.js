/* import {Schema, model} from 'mongoose' */
import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const userSchema = new mongoose.Schema({
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
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

userSchema.plugin(passportLocalMongoose,{usernameField:'email'})
export default mongoose.model('Users', userSchema)