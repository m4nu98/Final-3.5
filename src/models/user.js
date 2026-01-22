import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  direccion: { type: String, default: '' },
  localidad: { type: String, default: '' },
  provincia: { type: String, default: '' },
  pais: { type: String, default: '' },
  nroTelefono: { type: String, default: '' },
  edad: { type: Number, default: 0 },
  biografia: { type: String, default: '' },
});

// Método para hashear la contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  const user = this; // Accede al documento de usuario que se está guardando
  if (!user.isModified('password')) return next(); // Si la contraseña no ha sido modificada, continua con el siguiente middleware
  // Genera un salt (sal) para usar en el hashing con un costo de 10
  const salt = await bcrypt.genSalt(10);
  // Hashea la contraseña del usuario usando el salt generado
  const hash = await bcrypt.hash(user.password, salt);
  // Actualiza la contraseña del usuario con el hash generado
  user.password = hash;
  next(); // Continúa con el siguiente middleware o acción de guardado
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const RegistroUsuario = mongoose.model('RegistroUsuario', usuarioSchema);

export default RegistroUsuario;
