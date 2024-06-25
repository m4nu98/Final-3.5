import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
  nombreApellido: {
    type: String,
    required: true
  },
  
  provincia: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  nroTelefono: {
    type: String,
    required: true
  },
  servicio: {
    type: String,
    required: true
  },
  costo: {  // Cambio de codigoPostal a costo
    type: Number,  // Cambio a tipo Number para almacenar valores numéricos
    required: true
},
  descripcionTrabajo: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistroUsuario', // Referencia al modelo de usuarios si lo tienes
    required: true
  }
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

export default JobPosting;
