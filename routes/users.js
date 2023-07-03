import express from 'express'
const router=express.Router()
import passport from 'passport'

import Users from '../models/Users.js'

//router de /users

//---------------------GET

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
            return res.redirect('/')
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

//registro de usuario
router.post('/register', async (req,res)=>{
    let {nombre , email, password, passwordConfirm} = req.body 
    let userData={
        nombre:nombre,
        email:email
    }
    //compara que sean iguales los campos de password y passwordConfirm que llegan del body
    if (password === passwordConfirm){
        await Users.register(userData,password,(error,user)=>{
        if(error){
            req.flash('error_msg', 'ERROR: Esta operación no puede realizarse, probablemente el usuario ya existe en la base de datos.')
            return res.redirect('/users/register')
        }
        req.flash('success_msg', 'Usuario registrado correctamente.')
        res.redirect('/users/login')
        })        
    }else{
        req.flash('error_msg', 'La contraseña no coincide')
        res.redirect('/users/register')
    }
})

//logueo de usuario
router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login', failureFlash: 'Error al iniciar sesión. Verifica tus credenciales.'}),(req, res)=>{
    // Verificar el tipo de usuario y redirigir según corresponda
    if (req.user.esAdmin) {
        res.redirect('/admin/dashboard')
    }else{
        res.redirect('/')
    }
    }
);
  
export default router