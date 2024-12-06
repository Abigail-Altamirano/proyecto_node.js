import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import {join, dirname } from 'path';
import { fileURLToPath } from 'url';
import personasRoutes from './routes/personas.routes.js'
import authRoutes from './routes/auth.routes.js';
import session from 'express-session';
import flash from 'connect-flash';
import './config.js'



//inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));    // Obtiene el directorio actual, necesario para ese modulo


// Configuración del motor de plantillas Handlebars
app.set('port', process.env.PORT || 3000);    // Configura el puerto del servidor, usa el valor de entorno si está disponible
app.set('views', join(__dirname, 'views'));    // Define la carpeta de vistas
app.engine('.hbs', engine({
    defaultLayout: 'main',   // Layout principal 
    layoutsDir: join(app.get('views'), 'layouts'),   // Carpeta de layouts
    partialsDir: join(app.get('views'), 'partials'),   // Carpeta para parciales reutilizables
    extname: '.hbs'   // Extensión para las vistas
}));
app.set('view engine', '.hbs');  

// Configuración de sesiones y mensajes flash
app.use(session({
    secret: 'mysecretkey', // Cambia por un valor más seguro en producción
    resave: false,   // Evita que se guarde la sesión en cada solicitud
    saveUninitialized: false   // No guarda sesiones vacías
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.userId = req.session.userId || null;
    next();
});

//middleware 
app.use(morgan('dev'));   // Muestra las solicitudes HTTP en la consola 
app.use(express.urlencoded({extended: false}));  // Procesa formularios con datos simples
app.use(express.json());  // Permite el procesamiento de datos JSON


//rutas
app.get('/', (req, res)=>{
    res.render('index')    // Renderiza ./views/index.hbs
})

app.use(personasRoutes);

app.use(authRoutes);

//archivos públicos
app.use(express.static(join(__dirname, 'public')));  // Sirve archivos estáticos desde la carpeta `public`

//ejecutar el servidor
app.listen(app.get('port'), ()=>
    console.log('Servidor corriendo por puerta', app.get('port')));   // Muestra en la consola que el servidor está funcionando
