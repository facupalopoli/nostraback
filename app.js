import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import flash from 'connect-flash'
import methodOverride from 'method-override'
import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import './mongodb.js'

import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'
import adminRouter from './routes/admin.js'
import Products from './models/Products.js'
import Users from './models/Users.js'

// Creación de la aplicación Express
const app = express()

// Seteo del motor de plantillas
app.set('view engine', 'ejs')

// Configuracion del dotenv para almacenar variables sensibles
dotenv.config({path : './config.env'})

// -------------------Middlewares varios
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public')) //La sentencia app.use(express.static('public')) es utilizada para servir archivos estáticos en Express. Es un middleware que indica a Express que los archivos estáticos, como archivos CSS, JavaScript o imágenes, se encuentran en el directorio especificado, es decir 'public'.

// Configuración de la sesión
app.use(session({
    secret: 'nostra',
    resave: true,
    saveUninitialized: true
})) // Configura el middleware de sesión en Express utilizando el paquete express-session. En este caso, se establece un secreto (secret) para firmar las cookies de sesión, resave se establece en true para que la sesión se guarde en el almacenamiento incluso si no se ha modificado, y saveUninitialized se establece en true para guardar sesiones nuevas pero no modificadas en el almacenamiento.

// Configuración de Passport.js
app.use(passport.initialize()) // Inicializa Passport.js en Express. Esto configura el middleware de inicialización de Passport.
app.use(passport.session()) //Configura el middleware de sesión de Passport en Express. Esto habilita la persistencia de sesiones de Passport.
passport.use(new LocalStrategy({usernameField:'email'}, Users.authenticate())) //Configura una estrategia de autenticación local en Passport utilizando el paquete passport-local. En este caso, se utiliza el campo email como nombre de usuario para la autenticación local.
passport.serializeUser(Users.serializeUser()) // Configura la función de serialización de Passport. Esta función determina qué datos del usuario se almacenarán en la sesión. En este caso, se utiliza la función serializeUser del modelo Users para serializar el usuario y almacenar solo su ID en la sesión.
passport.deserializeUser(Users.deserializeUser()) // Configura la función de deserialización de Passport. Esta función se utiliza para recuperar los datos del usuario almacenados en la sesión y convertirlos en un objeto de usuario. En este caso, se utiliza la función deserializeUser del modelo Users para deserializar el usuario a partir de su ID almacenado en la sesión.

// Middleware para mensajes flash
app.use(flash()) // La función app.use(flash()) se utiliza para habilitar el uso de mensajes flash. Los mensajes flash son mensajes temporales que se almacenan en la sesión del usuario y se muestran en la siguiente solicitud. Se utilizan comúnmente para mostrar mensajes de éxito, errores o información después de realizar una acción, como enviar un formulario o completar una operación. La línea app.use(flash()) debe colocarse después de la configuración de 'session'.

app.use((req, res, next) => {
    res.locals.success_msg = req.flash(('success_msg'))
    res.locals.error_msg = req.flash(('error_msg'))
    res.locals.error = req.flash(('error'))
    res.locals.currentUser = req.user
    next()
}) // Este middleware se encarga de asignar mensajes flash y el usuario actual a variables locales en res.locals, lo que permite acceder a ellos fácilmente en las plantillas para mostrar mensajes de éxito o error y mostrar información del usuario autenticado.

//Middleware para method override
app.use(methodOverride('_method')) //La función app.use(methodOverride('_method')) se utiliza para habilitar la capacidad de enviar solicitudes PUT y DELETE a través de formularios HTML, (ya que los formularios HTML solo admiten los métodos GET y POST) utilizando un campo oculto _method con el valor correspondiente (por ejemplo, <input type="hidden" name="_method" value="PUT">). El middleware method-override se encargará de reemplazar el método de la solicitud con el valor especificado antes de que llegue a tus rutas. La línea app.use(methodOverride('_method')) debe colocarse después de la configuración de body-parser, pero antes de la definición de rutas.

global.cart = [] // Declaro una variable global cart para manejarla en las diferentes rutas

// --------------------Rutas

app.get('/', async (req,res)=>{
    try{
        const productsPerPage = 4
        const productosDestacados = await Products.aggregate([{ $sample: { size: 9 } }])
        res.render('pages/index', {productosDestacados:productosDestacados, productsPerPage: productsPerPage})    
    }
    catch(error){
        console.log(error)
        res.status(404).json({mensaje:'error interno del sistema'})
    }
})

app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/admin', adminRouter)

app.all('/*',(req,res)=>{
    /* res.status(404).json({mensaje:'no se reconoce la direccion web'}) */
    res.render('pages/notfound')
})

// ----------------------Iniciar servidor

app.listen(3030,()=>{
    console.log('servidor ejecutado')
})