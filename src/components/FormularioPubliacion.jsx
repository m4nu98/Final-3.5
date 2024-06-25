"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "@/app/globals.css"

const CreateJobForm = ({ onCreate, onClose }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();


  let ServiciosOfrecidos = [
    "Otros Servicios",
    "Plomero", "Gasista", "Taxista", "Chofer", "Electricista", "Pintor",
    "Carpintero", "Albañil", "Jardinero", "Mecánico", "Cerrajero", "Fontanero",
    "Fumigador", "Reparación de electrodomésticos", "Mudanzas", "Limpieza de casas",
    "Limpieza de oficinas", "Niñera", "Cuidado de ancianos", "Peluquero", "Estilista",
    "Manicurista", "Masajista", "Entrenador personal", "Instructor de yoga", "Profesor de música",
    "Tutor de matemáticas", "Tutor de inglés", "Diseñador gráfico", "Desarrollador web",
    "Programador", "Consultor de IT", "Asesor financiero", "Abogado", "Contador",
    "Gestor administrativo", "Traductor", "Fotógrafo", "Videógrafo", "Catering",
    "Organizador de eventos", "Decorador de interiores", "Paisajista", "Sastre",
    "Modista", "Costurera", "Reparación de computadoras", "Soporte técnico",
    "Diseñador de interiores", "Reparación de celulares", "Instructor de conducción",
    "Psicólogo", "Psiquiatra", "Nutricionista", "Dietista", "Fisioterapeuta",
    "Podólogo", "Dentista", "Veterinario", "Cuidador de mascotas", "Paseador de perros",
    "Entrenador de perros", "Reparación de bicicletas", "Reparación de motos", "Reparación de coches",
    "Instalador de aire acondicionado", "Técnico de calefacción", "Reparación de electrodomésticos grandes",
    "Limpiador de ventanas", "Reparador de techos", "Instalador de ventanas", "Instalador de puertas",
    "Reparador de electrodomésticos pequeños", "Personal de seguridad", "Guardia de seguridad",
    "Detective privado", "Consultor de seguridad", "Técnico de alarmas", "Instalador de cámaras de seguridad",
    "Montador de muebles", "Decorador de fiestas", "Organizador de bodas", "Maquillador",
    "Instructor de baile", "Coach de vida", "Asesor de imagen", "Asesor de moda", "Coach deportivo",
    "Instructor de artes marciales", "Instructor de natación", "Instructor de tenis",
    "Instructor de esquí", "Instructor de snowboard", "Instructor de surf", "Guía turístico",
    "Recepcionista", "Auxiliar administrativo", "Secretaria", "Asistente personal",
    "Auxiliar de enfermería", "Auxiliar de veterinaria", "Cocinero a domicilio", "Chef personal",
    "Bartender", "Barista", "Pastelero", "Panadero", "Chef de repostería",
  ].sort(); // Ordena alfabéticament

  // Crea una nueva lista con cada servicio repetido 3 veces
  let ServiciosOfrecidosRepetidos = Array(3).fill("Otros Servicios"); // Agrega "Otros Servicios" 3 veces al principio
  ServiciosOfrecidos.forEach(servicio => {
    for (let i = 0; i < 3; i++) {
      ServiciosOfrecidosRepetidos.push(servicio);
    }
  });
  ServiciosOfrecidos = ["Otros Servicios", "Otros Servicios", "Otros Servicios", ...ServiciosOfrecidosRepetidos];

  // Define el array de provincias
  const provinciasArgentina = [
    "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
    "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
    "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
    "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán"
  ];
  const handleServicioChange = (event) => {
    const selectedService = event.target.value;
    // Actualizar el valor seleccionado
    register('servicio').onChange(selectedService);
  };

  const onSubmit = async (formData) => {
    try {
      // Obtener el ID de usuario desde localStorage
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      const userId = userData.id;

      if (!userId) {
        throw new Error('ID de usuario no encontrado en localStorage');
      }

      const dataToSend = { ...formData, userId };

      const response = await fetch('http://localhost:4000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Error al crear el job posting');
      }

      const responseData = await response.json();
      console.log("Job posting creado exitosamente:", responseData);

      // Mostrar alerta de éxito
      alert('Publicación generada con éxito');

      // Llamar a la función onClose para cerrar el formulario
      onClose();

    } catch (err) {
      console.error("Error al crear el job posting:", err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Crear Post de Trabajo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="nombreApellido" className="block text-sm font-medium text-gray-700">
              Nombre y Apellido
            </label>
            <input
              type="text"
              id="nombreApellido"
              {...register('nombreApellido', { required: true })}
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
              placeholder="Nombre y apellido"
            />
            {errors.nombreApellido && <p className="text-red-500 text-xs italic">Este campo es requerido</p>}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">
              Provincia
            </label>
            <select
              id="provincia"
              {...register('provincia', { required: true })}
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
            >
              <option value="">Selecciona una provincia</option>
              {provinciasArgentina.map(provincia => (
                <option key={provincia} value={provincia}>{provincia}</option>
              ))}
            </select>
            {errors.provincia && <p className="text-red-500 text-xs italic">Este campo es requerido</p>}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              {...register('direccion', { required: true })}
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
              placeholder="Dirección"
            />
            {errors.direccion && <p className="text-red-500 text-xs italic">Este campo es requerido</p>}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="nroTelefono" className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <input
              type="text"
              id="nroTelefono"
              {...register('nroTelefono', { required: true })}
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
              placeholder="Número de Teléfono"
            />
            {errors.nroTelefono && <p className="text-red-500 text-xs italic">Este campo es requerido</p>}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="servicio" className="block text-sm font-medium text-gray-700">
              Servicio
            </label>
            <select
             id="servicio"
             {...register('servicio', { required: true })}
             className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
             onChange={(event) => {
               const selectedService = event.target.value;
               // Aquí puedes hacer algo con el valor seleccionado, si es necesario
             }}
            >
              <option value="">Selecciona un servicio</option>
              {ServiciosOfrecidosRepetidos.map((servicio, index) => (
                <option key={servicio} value={servicio}>{servicio}</option>
              ))}
            </select>
            {errors.servicio && <p className="text-red-500 text-xs italic">Este campo es requerido</p>}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="costo" className="block text-sm font-medium text-gray-700">
              Costo
            </label>
            <input
              type="number"
              id="costo"
              {...register('costo', { required: true })}
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
              placeholder="Ingrese el costo en dólares"
              step="0.01"
            />
            {errors.costo && <p className="text-red-500 text-xs italic">Este campo es requerido</p>}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="descripcionTrabajo" className="block text-sm font-medium text-gray-700">
              Descripción de Trabajo
            </label>
            <input
              type="text"
              id="descripcionTrabajo"
              {...register('descripcionTrabajo', { required: true })}
              className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full sm:text-sm border p-2"
              placeholder="Descripción de Trabajo"
            />
            {errors.descripcionTrabajo && <p className="text-red-500 text-xs italic">Este campo es requerido</p>}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-50"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-50 ml-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;