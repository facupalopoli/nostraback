import express from 'express'
const router=express.Router()

import passport from 'passport'
import async from 'async'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

import dotenv from 'dotenv'
dotenv.config({path : './config.env'})

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

router.get('/forgot', (req, res) => {
    res.render('users/forgot')
})

router.get('/reset/:token', (req, res) => {
    Users.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                req.flash('error_msg', 'Password reset token in invalid or has been expired.');
                res.redirect('/users/forgot');
            }

            res.render('users/newpassword', { token: req.params.token });
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: ' + err);
            res.redirect('/users/forgot');
        });
});

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

//para resetar el password por token

router.post('/forgot', (req, res, next) => {
    async.waterfall([
        (done) => {
            crypto.randomBytes(20, (err, buf) => {
                let token = buf.toString('hex');
                console.log(token);
                done(err, token);
            });
        },
        (token, done) => {
            Users.findOne({ email: req.body.email })
                .then(user => {
                    console.log(user);
                    if (!user) {
                        req.flash('error_msg', 'El usuario no existe con este mail');
                        return res.redirect('/users/forgot');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 1800000; // 1/2 hours

                    user.save()
                        .then(() => {
                            done(null, token, user);
                        })
                        .catch(err => {
                            done(err);
                        });
                })
                .catch(err => {
                    done(err);
                });
        },
        (token, user, done) => {
            let smtpTransport = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: 'nostragrupo7@hotmail.com',
                    pass: process.env.EMAIL_PASS
                }
            });

            let mailOptions = {
                to: user.email,
                from: 'Grupo 7 nostragrupo7@hotmail.com',
                subject: 'Email de recuperacion para proyecto NOSTRA',
                text: 'Por favor ingrese en el siguiente link para recuperar su password: \n\n' +
                    'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
                    'Si usted no solicitó esto entonces ignore este mail.'
            };

            smtpTransport.sendMail(mailOptions, err => {
                if (err) {
                    return done(err);
                }
                done(null);
            });
        }
    ], (err) => {
        if (err) {
            console.log(err)
            req.flash('error_msg', 'ERROR: ' + err);
            res.redirect('/users/forgot');
        } else {
            req.flash('success_msg', 'Las instrucciones han sido enviadas a su correo. Por favor revise su bandeja de entrada.');
            res.redirect('/users/forgot');
        }
    });
});

router.post('/reset/:token', (req, res) => {
    async.waterfall([
        function(done) {
            Users.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
                .then(user => {
                    if (!user) {
                        req.flash('error_msg', 'El token es inválido o ha expirado.');
                        return res.redirect('/users/forgot');
                    }

                    if (req.body.password !== req.body.confirmpassword) {
                        req.flash('error_msg', 'El password no coincide.');
                        return res.redirect('/users/forgot');
                    }

                    user.setPassword(req.body.password, () => {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save()
                            .then(() => {
                                done(null, user);
                            })
                            .catch(err => {
                                done(err);
                            });
                    });
                })
                .catch(err => {
                    done(err);
                });
        },
        function(user, done) {
            let smtpTransport = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: 'nostragrupo7@hotmail.com',
                    pass: process.env.EMAIL_PASS
                }
            });

            let mailOptions = {
                to: user.email,
                from: 'Grupo 7 nostragrupo7@hotmail.com',
                subject: 'Su password ha sido modificado!',
                text: `Hola, ${user.nombre}\n\n` +
                    `Este es un mensaje de confirmación que su password ha sido modificado para ${user.email}.`
            };

            smtpTransport.sendMail(mailOptions, err => {
                if (err) {
                    req.flash('error_msg', 'ERROR: ' + err);
                    res.redirect('/users/login');
                } else {
                    req.flash('success_msg', 'Su password ha sido modificado con éxito');
                    res.redirect('/users/login');
                }
                done(err);
            });
        }
    ], err => {
        req.flash('error_msg', 'ERROR: ' + err);
        res.redirect('/users/login');
    });
});
  
export default router