import {Router} from 'express'
import pool from '../database.js'

const router = Router();

// Ruta para mostrar el formulario de agregar una persona
router.get('/add', isAuthenticated, (req,res)=>{
    res.render('personas/add');
});

// Ruta para procesar la creación de una nueva persona
router.post('/add', isAuthenticated, async (req, res) => {
    try {
        const { name, lastname, age } = req.body;
        const userId = req.session.userId; // Obtén el ID del usuario autenticado
        const newPersona = { name, lastname, age, user_id: userId };

        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        req.flash('success', 'Persona registrada exitosamente');
        res.redirect('/list'); // Redirige a la lista después de registrar
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error al registrar la persona' });
    }
});


router.post('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const { name, lastname, age } = req.body;
        const { id } = req.params;
        const userId = req.session.userId; // ID del usuario autenticado

        // Verifica que el registro pertenece al usuario autenticado
        const [check] = await pool.query('SELECT * FROM personas WHERE id = ? AND user_id = ?', [id, userId]);
        if (check.length === 0) {
            req.flash('error', 'No tienes permiso para editar este registro.');
            return res.redirect('/list');
        }

        // Actualiza el registro
        const updatedPersona = { name, lastname, age };
        await pool.query('UPDATE personas SET ? WHERE id = ?', [updatedPersona, id]);
        req.flash('success', 'Registro actualizado exitosamente.');
        res.redirect('/list');
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error al procesar la solicitud.' });
    }
});


// Ruta para listar todas las personas
router.get('/list', isAuthenticated, async(req, res)=>{
    try{
        const userId = req.session.userId; // Obtén el ID del usuario autenticado
        const [result] = await pool.query('SELECT * FROM personas WHERE user_id = ?', [userId]);    // Consulta la base de datos para obtener todas las personas
        res.render('personas/list', {personas: result});   // Renderiza la vista de lista con los datos obtenidos
    }
    catch(err){
        res.status(500).json({message:err.message});    // Manejo de errores
    }
});


// Ruta para procesar la edición de una persona
router.get('/edit/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params; // Obtén el ID desde los parámetros de la URL
        const userId = req.session.userId; // ID del usuario autenticado

        // Consulta para verificar que el registro pertenece al usuario
        const [persona] = await pool.query('SELECT * FROM personas WHERE id = ? AND user_id = ?', [id, userId]);
        if (persona.length === 0) {
            req.flash('error', 'No tienes permiso para editar este registro o no existe.');
            return res.redirect('/list');
        }

        // Renderiza la vista de edición con los datos obtenidos
        res.render('personas/edit', { persona: persona[0] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Ruta para eliminar una persona
router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');    // Redirige a la lista después de la eliminación
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

// Middleware para proteger rutas
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    req.flash('error', 'Por favor, inicia sesión primero');
    res.redirect('/login');
}

// Aplica el middleware a todas las rutas
router.get('/list', isAuthenticated, async (req, res) => {
    // Lógica para listar personas
});

export default router;
