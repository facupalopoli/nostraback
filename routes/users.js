import express from 'express'
const router=express.Router()

import Users from '../models/Users.js'

//---------------------GET

//router de /users
router.get('/',(req,res)=>{
    res.send('hola desde el router de users')
}) 

router.get('/register', async (req,res)=>{
    try{
        res.render('users/register')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

/*obtener rutas POST */

router.post('/register',(req,res)=>{
    let {nombre , email, password}=  req.body 
    console.log(password)
    let userData={
         nombre : nombre,
         email : email
    }
    Users.register(userData,password,(error,user)=>{
         if(error){
            console.log(error)
             return res.redirect('/users/register')
         }        
         res.redirect('/')
    })    
 })

export default router