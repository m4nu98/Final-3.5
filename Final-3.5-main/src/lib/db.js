//archivo conexion a la base de datos
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('conexion a MongoDB exitosa ');
  } catch (error) {
    console.error(' error en la coneccion a MongoDB  :', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
