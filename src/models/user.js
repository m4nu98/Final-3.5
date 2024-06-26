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
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const RegistroUsuario = mongoose.model('RegistroUsuario', usuarioSchema);

export default RegistroUsuario;
