import {Schema, model} from 'mongoose'

import passportLocalMongoose from 'passport-local-mongoose'

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
        select: false,
    },
    esAdmin:{
        type: Boolean,
        default :false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

userSchema.plugin(passportLocalMongoose,{usernameField:'email'})
 
export default model('Users', userSchema)