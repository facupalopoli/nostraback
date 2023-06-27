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
        if(req.user && req.user.esAdmin){
            /* req.flash('error_msg', 'Cierre su sesion primero') */
            return res.redirect('/admin/dashboard')
        }else if(req.isAuthenticated()){
            req.flash('success_msg', `${req.user.nombre} ya podes hacer tu compra!`)
            return res.redirect('/products/cart')
        }
        res.render('users/login')
    }catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

router.get('/logout', (req,res)=>{
    req.logout(()=>{
        req.flash('success_msg', 'Sesion cerrada correctamente')
        res.redirect('/users/login')
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
        req.flash('error_msg', 'ERROR: ' + error);
        return res.redirect('/users/register')
    }
    req.flash('success_msg', 'Usuario registrado correctamente.')
    res.redirect('/users/login')
    })    
})

router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login'}),(req, res)=>{
    // Verificar el tipo de usuario y redirigir según corresponda
    if (req.user.esAdmin) {
        res.redirect('/admin/dashboard')
    }else{
        res.redirect('/')
    }
    }
);
  
export default router