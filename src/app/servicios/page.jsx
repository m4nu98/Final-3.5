"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import "../globals.css";
import Formulario from "@/components/FormularioPubliacion";

export default function Component() {
  const [showFormulario, setShowFormulario] = useState(false);
  const [jobPostings, setJobPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableProvinces, setAvailableProvinces] = useState(new Set());
  const [availableCategories, setAvailableCategories] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedProvinces, setSelectedProvinces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/jobpostings")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setJobPostings(Array.isArray(data) ? data : []);
        const provinciasDisponibles = new Set(
          data.map((posting) => posting.provincia)
        );
        setAvailableProvinces(provinciasDisponibles);

        const categoriasDisponibles = new Set(
          data.map((posting) => posting.servicio)
        );
        setAvailableCategories(categoriasDisponibles);
      })

      .catch((error) => {
        console.error("Error fetching job postings:", error);
      });
  }, []);

  const handleOpenFormulario = () => {
    setShowFormulario(true);
  };

  const handleCloseFormulario = () => {
    setShowFormulario(false);
  };

  const handleProvinceChange = (e) => {
    const provincia = e.target.value;
    if (e.target.checked) {
      setSelectedProvinces([...selectedProvinces, provincia]);
    } else {
      setSelectedProvinces(selectedProvinces.filter((p) => p !== provincia));
    }
  };

  const handleCategoryChange = (e) => {
    const categoria = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoria]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoria));
    }
  };

  const filteredJobPostings = jobPostings.filter((posting) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(posting.servicio);

    const matchesSearch =
      posting.servicio.toLowerCase().includes(searchTermLower) ||
      posting.nombreApellido.toLowerCase().includes(searchTermLower) ||
      posting.provincia.toLowerCase().includes(searchTermLower);
    const matchesProvince =
      selectedProvinces.length === 0 ||
      selectedProvinces.includes(posting.provincia);
    return matchesSearch && matchesProvince && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-[100vh]">
      <main>
        <section className="centrar py-12 md:py-24 lg:py-32 sectionservicio">
          <div className="container px-4 md:px-6 grid gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Nuestros servicios
                </h1>
                <p className="text-gray-500 md:text-xl">
                  Encuentre los mejores profesionales para las necesidades de su
                  hogar o negocio.
                </p>
              </div>
              <div className="relative w-full max-w-md flex items-center">
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="pl-10 pr-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <span className="sr-only">Buscar</span>
                </Button>
                <Button
                  variant="azul"
                  className="colorazul ml-2"
                  onClick={handleOpenFormulario}
                >
                  Publicar
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
              <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6 flex flex-col gap-6">
                <h3 className="text-xl font-semibold">Filters</h3>
                <Accordion type="single" collapsible>
                  <AccordionItem value="categories">
                    <AccordionTrigger className="text-base">
                      Categorias
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2">
                        {Array.from(availableCategories).map((categoria) => (
                          <label
                            key={categoria}
                            className="flex items-center gap-2 font-normal"
                          >
                            <input
                              type="checkbox"
                              value={categoria}
                              checked={selectedCategories.includes(categoria)}
                              onChange={(e) => handleCategoryChange(e)}
                              className="peer h-4 w-4 shrink-0 rounded-sm border-2 border-black ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-black dark:focus-visible:ring-white"
                            />
                            <span className="sans-serif">{categoria}</span>
                          </label>
                        ))}{" "}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="provinces">
                    <AccordionTrigger className="text-base">
                      Provincias
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-2">
                        {Array.from(availableProvinces).map((provincia) => (
                          <label
                            key={provincia}
                            className="flex items-center gap-2 font-normal"
                          >
                            <input
                              type="checkbox"
                              value={provincia}
                              checked={selectedProvinces.includes(provincia)}
                              onChange={(e) => handleProvinceChange(e)}
                              className="peer h-4 w-4 shrink-0 rounded-sm border-2 border-black ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-black dark:focus-visible:ring-white"
                            />
                            <span className="sans-serif">{provincia}</span>
                          </label>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Publicaciones">
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(filteredJobPostings) &&
  filteredJobPostings.map((posting) => (
    <div
      key={posting._id}
      className="bg-white colorblanco rounded-lg shadow-md p-6 flex flex-col items-start gap-4"
    >
      <h3 className="text-xl font-semibold">
        {posting.servicio}
      </h3>
      <div className="flex items-center gap-2">
        <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
          <img
            className="aspect-square h-full w-full"
            src="/placeholder-user.jpg"
            alt="User"
          />
        </span>
        <div>
          <div className="font-semibold">
            {posting.nombreApellido}
          </div>
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
          <path d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10a10 10 0 0 1-10-10a10 10 0 0 1 10-10Z"></path>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        {"Telefono: "+posting.nroTelefono} {/* Agregar aquí el número de teléfono */}
      </div>
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 underline-offset-4 h-10 px-4 py-2 text-gray-900 dark:text-gray-50 hover:underline">
        Más información
      </button>
    </div>
  ))}

              </div>
            </div>
          </div>
        </section>
      </main>
      {showFormulario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white dark:bg-gray rounded-lg shadow-md p-6">
            <Formulario onClose={handleCloseFormulario} />
          </div>
        </div>
      )}
    </div>
  );
}

function BoltIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function BrushIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  );
}

function LeafIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PipetteIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="m2 22 1-1h3l9-9" />
      <path d="M3 21v-3l9-9" />
      <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
