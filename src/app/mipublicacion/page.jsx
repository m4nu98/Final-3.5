"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KfWuxb8sQsc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import '../globals.css';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export default function Component() {
  const [jobPostings, setJobPostings] = useState([]);
  const [filteredJobPostings, setFilteredJobPostings] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableProvinces, setAvailableProvinces] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);

  useEffect(() => {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      const userId = currentUser.id; // Obtiene el ID del objeto currentUser
      fetch(`http://localhost:4000/api/jobpostings/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setJobPostings(data);
          setFilteredJobPostings(data); // Inicialmente, todos los postings están filtrados
        })
        .catch((error) => {
          console.error('Error fetching user job postings:', error);
        });
    }
  }, []);

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
                      {availableCategories.map((categoria) => (
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
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="provinces">
                  <AccordionTrigger className="text-base">
                    Provincias
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      {availableProvinces.map((provincia) => (
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
                  <AccordionTrigger className="text-base">
                    Publicaciones
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      {/* Aquí irían los checkboxes de publicaciones */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobPostings.map((posting) => (
                <div
                  key={posting._id}
                  className="bg-white colorblanco rounded-lg shadow-md p-6 flex flex-col items-start gap-4"
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
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 underline-offset-4 h-10 px-4 py-2 text-gray-900 dark:text-gray-50 hover:underline">
                    Más información
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          
        </div>
      </section>
    </div>
  );
}
