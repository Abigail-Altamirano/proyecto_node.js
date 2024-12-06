import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../database.js'; // Conexión a tu base de datos
import { body, validationResult } from 'express-validator';


const router = Router();

// Registro de usuario
router.get('/register', (req, res) => {
    res.render('auth/register');
});

// Registro de usuario con validación
router.post(
    '/register',
    [
        body('username')
            .isLength({ min: 3 })
            .withMessage('El usuario debe tener al menos 3 caracteres'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('La contraseña debe tener al menos 6 caracteres'),
    ],
    async (req, res) => {
        // Verifica si hay errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map((err) => err.msg).join(' '));
            return res.redirect('/register');
        }

        const { username, password } = req.body;
        try {
            // Hashea la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(password, 12);
            await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [
                username,
                hashedPassword,
            ]);
            req.flash('success', 'Usuario registrado con éxito');
            res.redirect('/');
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                req.flash('error', 'El nombre de usuario ya está en uso.');
            } else {
                req.flash('error', 'Error al registrar usuario.');
            }
            res.redirect('/register');
        }
    }
);

// Login de usuario
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.userId = user.id;
            req.flash('success', 'Inicio de sesión exitoso');
            res.redirect('/add'); // Redirige a tu página principal
        } else {
            req.flash('error', 'Credenciales incorrectas');
            res.redirect('/login');
        }
    } catch (error) {
        req.flash('error', 'Error al iniciar sesión');
        res.redirect('/login');
    }
});

// Logout de usuario (con manejo de errores y mensajes flash)
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            req.flash('error', 'No se pudo cerrar la sesión. Inténtalo de nuevo.');
            return res.redirect('/list'); // Redirige a la lista en caso de error
        }
        req.flash('success', 'Sesión cerrada correctamente');
        res.redirect('/login'); // Redirige a la página de inicio de sesión
    });
});

export default router;
