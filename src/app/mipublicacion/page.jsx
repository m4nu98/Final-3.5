"use client";

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import '../globals.css';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

export default function Component() {
  const [jobPostings, setJobPostings] = useState([]);
  const [filteredJobPostings, setFilteredJobPostings] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableProvinces, setAvailableProvinces] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [editingPosting, setEditingPosting] = useState(null);

  useEffect(() => {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      const userId = currentUser.id;
      fetch(`http://localhost:4000/api/jobpostings/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setJobPostings(data);
          setFilteredJobPostings(data);
        })
        .catch((error) => {
          console.error('Error fetching user job postings:', error);
        });
    }
  }, []);

  useEffect(() => {
    const filterJobPostings = () => {
      let filtered = jobPostings;

      if (selectedCategories.length > 0) {
        filtered = filtered.filter((posting) =>
          selectedCategories.includes(posting.categoria)
        );
      }

      if (selectedProvinces.length > 0) {
        filtered = filtered.filter((posting) =>
          selectedProvinces.includes(posting.provincia)
        );
      }

      setFilteredJobPostings(filtered);
    };

    filterJobPostings();
  }, [selectedCategories, selectedProvinces, jobPostings]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevSelectedCategories) =>
      checked
        ? [...prevSelectedCategories, value]
        : prevSelectedCategories.filter((category) => category !== value)
    );
  };

  const handleProvinceChange = (event) => {
    const { value, checked } = event.target;
    setSelectedProvinces((prevSelectedProvinces) =>
      checked
        ? [...prevSelectedProvinces, value]
        : prevSelectedProvinces.filter((province) => province !== value)
    );
  };

  const handleEditar = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobpostings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPosting),
      });

      if (!response.ok) {
        throw new Error('Error al editar la publicación');
      }

      console.log(`Publicación con ID ${id} editada correctamente`);

      // Actualizar localmente las publicaciones
      const updatedJobPostings = jobPostings.map(post =>
        post._id === id ? editingPosting : post
      );
      setJobPostings(updatedJobPostings);
      setFilteredJobPostings(updatedJobPostings);

      // Limpiar el estado de edición
      setEditingPosting(null);
    } catch (error) {
      console.error('Error al editar la publicación:', error);
    }
  };

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobpostings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la publicación');
      }

      console.log(`Publicación con ID ${id} eliminada correctamente`);

      // Actualizar localmente las publicaciones después de eliminar
      const updatedJobPostings = jobPostings.filter(post => post._id !== id);
      setJobPostings(updatedJobPostings);
      setFilteredJobPostings(updatedJobPostings);

    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  };

  const cancelEdit = () => {
    setEditingPosting(null);
  };

  const handleUpdate = (event) => {
    const { id, value } = event.target;
    setEditingPosting({ ...editingPosting, [id]: value });
  };
  // Define el array de provincias
  const provinciasArgentina = [
    "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
    "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
    "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
    "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán"
  ];
  // Define el array de servicios
  const serviciosOfrecidos = [
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
  ].sort();


  return (
    <div>
      <section className="w-full pt-12 md:pt-24 lg:pt-32 centrar sectionmargeninferior">
  <div className="container space-y-8 px-4 md:px-6 lg:space-y-12">
    <div className="flex flex-col items-start justify-center space-y-4 text-left">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mis Publicaciones</h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Mira mis últimas publicaciones
        </p>
      </div>
    </div>
    <div className="bg-white dark:bg-gray rounded-lg flex flex-wrap gap-8">
      {filteredJobPostings.length === 0 ? (
        <p className="text-lg font-semibold text-center col-span-full pmjs">
          Aún no tienes publicaciones de trabajos realizadas.
        </p>
      ) : (
        filteredJobPostings.map((posting) => (
          <div
            key={posting._id}
            className="bg-white dark:bg-gray rounded-lg shadow-md p-6 flex flex-col items-start gap-4"
          >
            <h3 className="text-xl font-semibold">{posting.servicio}</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
                <img
                  className="aspect-square h-full w-full"
                  src="/placeholder-user.jpg"
                  alt="User"
                />
              </span>
              <div>
                <div className="font-semibold">{posting.nombreApellido}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {posting.servicio}
                </div>
              </div>
            </div>
            <div className="font-semibold">${posting.costo}</div>
            <div className="text-left">
              <p className="text-gray-500 dark:text-gray-400">
                {posting.descripcionTrabajo}
              </p>
            </div>
            <div className="text-sm text-gray-500 flex dark:text-gray-400">
              <svg
                className="w-4 h-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {posting.provincia}
            </div>
            <button
              onClick={() => setEditingPosting(posting)}
              className="text-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 underline-offset-4 h-10 px-4 py-2"
            >
              Editar
            </button>
            <button
              onClick={() => handleEliminar(posting._id)}
              className="text-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 underline-offset-4 h-10 px-4 py-2"
            >
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  </div>
</section>

      {editingPosting && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-300">Editar Publicación</h3>
              <div className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Servicio</label>
                  <select
                    id="servicio"
                    value={editingPosting.servicio || ''}
                    onChange={(e) => setEditingPosting({ ...editingPosting, servicio: e.target.value })}
                    className="inputfield block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Selecciona un servicio</option>
                    {serviciosOfrecidos.map((servicio) => (
                      <option key={servicio} value={servicio}>
                        {servicio}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="precio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio</label>
                  <input
                    id="precio"
                    type="number"
                    value={editingPosting.costo || ''}
                    onChange={(e) =>
                      setEditingPosting({
                        ...editingPosting,
                        costo: e.target.value,
                      })
                    }
                    className="inputfield block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Provincia</label>
                  <select
                    id="provincia"
                    value={editingPosting.provincia || ''}
                    onChange={(e) => setEditingPosting({ ...editingPosting, provincia: e.target.value })}
                    className="inputfield block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Selecciona una provincia</option>
                    {provinciasArgentina.map((provincia) => (
                      <option key={provincia} value={provincia}>
                        {provincia}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="descripcionTrabajo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción del Trabajo</label>
                  <textarea
                    id="descripcionTrabajo"
                    value={editingPosting.descripcionTrabajo || ''}
                    onChange={(e) =>
                      setEditingPosting({
                        ...editingPosting,
                        descripcionTrabajo: e.target.value,
                      })
                    }
                    className="inputfield block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none h-40"
                    placeholder="Describe detalladamente el trabajo ofrecido..."
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4 bg-gray-100 dark:bg-gray-900">
              <button
                onClick={cancelEdit}
                className="mr-2 px-4 py-2 bg-black text-gray-700 dark:text-gray-300 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleEditar(editingPosting._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
