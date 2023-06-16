import express from 'express'
const router=express.Router()
import passport from 'passport'

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

router.get('/login', async (req,res)=>{
    try{
        res.render('users/login')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

router.get('/logout', (req,res)=>{
    req.logout(()=>{
        res.redirect('/')
    })
})

/*obtener rutas POST */

/* router.post('/register', async (req,res)=>{
    try{
        let { nombre, email, password } = req.body
        let userData={
            nombre: nombre,
            email: email
        }
        await Users.register(userData, password)
        res.redirect('/')
    }catch(error){
        console.log(error)
        res.redirect('/users/register')
    }
}) */

router.post('/register',(req,res)=>{//AGREGAR TRY CATCH?
    let {nombre , email, password}=  req.body 
    let userData={
        nombre:nombre,
        email:email
    }
    Users.register(userData,password,(error,user)=>{
    if(error){
        console.log(error)
        return res.redirect('/users/register')
    }
    req.flash('success_msg', 'Usuario registrado correctamente.')
    res.redirect('/')
    })    
})

router.post('/login', passport.authenticate('local',{
    successRedirect: '/', // Redireccionar en caso de autenticación exitosa
    failureRedirect: '/users/login', // Redireccionar en caso de autenticación fallida
    }), (req,res)=>{
        console.log(req.user)
})
  
export default router