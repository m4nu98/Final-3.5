import dotenv from 'dotenv';
import connectDB from './src/lib/db.js';
import express from 'express';
import RegistroUsuario from './src/models/user.js';
import JobPosting from "./src/models/jobs.js";
import cors from 'cors';

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// Conexión a la base de datos
connectDB();

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Habilitar CORS (puedes personalizar las opciones según tu entorno)
app.use(cors());

// Ruta para manejar el registro de usuarios
app.post('/api/usuarios', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Ejemplo: Guardar el usuario en la base de datos
        const nuevoUsuario = new RegistroUsuario({ nombre, email, password });
        await nuevoUsuario.save();

        // Respuesta exitosa
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error); 
        if (error.code === 11000) { // Verifica si es un error de correo duplicado
            res.status(409).json({ 
                error: 'duplicate_email', 
                mensaje: 'Este correo electrónico ya está registrado. Por favor, utiliza otro.' 
            });
        } else {
            res.status(500).json({ 
                error: 'server_error', 
                mensaje: 'Error al registrar usuario. Inténtalo de nuevo más tarde.' 
            });
        }
    }
});


// Ruta para manejar el inicio de sesión de usuarios
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Datos recibidos:", req.body);  // Añadir registro para ver los datos recibidos

        // Verifica si los campos email y password están presentes
        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Faltan credenciales' });
        }

        // Busca el usuario por email en la base de datos
        const usuario = await RegistroUsuario.findOne({ email });

        // Si no encuentra el usuario, devuelve un error
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        // Compara la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await usuario.comparePassword(password);

        // Si las contraseñas no coinciden, devuelve un error
        if (!isMatch) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, devuelve los datos del usuario
        res.status(200).json({
            id: usuario._id, // Asegúrate de incluir el ID del usuario
            email: usuario.email,
            nombre: usuario.nombre,
            // Otros datos que quieras devolver
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});




app.post('/api/jobs', async (req, res) => {
    try {
      const { nombreApellido, provincia,costo, direccion, nroTelefono, servicio, descripcionTrabajo } = req.body;
  
      // Obtener userId desde el cuerpo de la solicitud
      const userId = req.body.userId;
  
      // Validar que userId esté presente y sea válido
      if (!userId) {
        throw new Error('ID de usuario no especificado');
      }
  
      // Crear un nuevo documento Job con los datos del formulario y userId
      const nuevoJob = new JobPosting({ 
        nombreApellido, 
        provincia, 
        direccion, 
        nroTelefono, 
        servicio, 
        costo: Number(costo), 
        descripcionTrabajo,
        userId // Asegúrate de incluir userId aquí
      });
  
      // Guardar el nuevo job en la base de datos
      await nuevoJob.save();
  
      // Enviar una respuesta exitosa
      res.status(201).json({ mensaje: 'Job posting creado exitosamente' });
  
    } catch (error) {
      console.error('Error al crear job posting:', error);
      res.status(500).json({ mensaje: 'Error al crear job posting' });
    }
  });


  app.get('/api/jobpostings', async (req, res) => {
    try {
        const jobPostings = await JobPosting.find().populate('userId', 'RegistroUsuario');
        res.json(jobPostings);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error); // Registra el error completo
      res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
  });
  

  app.get('/api/jobpostings/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const jobPostings = await JobPosting.find({ userId }).populate('userId', 'RegistroUsuario');
        res.json(jobPostings);
    } catch (error) {
        console.error('Error al obtener las publicaciones del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las publicaciones del usuario' });
    }
});


//endpoint para actualizar los datos del usuario:
// Ruta para obtener los datos del usuario
app.get('/api/usuarios/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const usuario = await RegistroUsuario.findById(userId);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

// Ruta para actualizar los datos del usuario
app.put('/api/usuarios/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updates = req.body;

        const usuario = await RegistroUsuario.findByIdAndUpdate(userId, updates, { new: true });

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json({ mensaje: 'Datos actualizados correctamente', usuario });
    } catch (error) {
        console.error('Error al actualizar datos del usuario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

// Ruta para actualizar una publicación
app.put('/api/jobpostings/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
  
      const updatedPosting = await JobPosting.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedPosting) {
        return res.status(404).json({ mensaje: 'Publicación no encontrada' });
      }
  
      res.status(200).json({ mensaje: 'Publicación actualizada correctamente', updatedPosting });
    } catch (error) {
      console.error('Error al actualizar publicación:', error);
      res.status(500).json({ mensaje: 'Error al actualizar publicación' });
    }
  });
  
  
  // Ruta para eliminar una publicación
  app.delete('/api/jobpostings/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      const deletedPosting = await JobPosting.findByIdAndDelete(id);
  
      if (!deletedPosting) {
        return res.status(404).json({ mensaje: 'Publicación no encontrada' });
      }
  
      res.status(200).json({ mensaje: 'Publicación eliminada correctamente', deletedPosting });
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
      res.status(500).json({ mensaje: 'Error al eliminar publicación' });
    }
  });


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

  