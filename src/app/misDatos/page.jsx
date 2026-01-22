"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card2";

import { Label } from "@/components/ui/label"; // Importar el componente Label personalizado
import { Input } from "@/components/ui/input"; // Importar el componente Input personalizado

export default function ProfileForm() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.id) {
      setUserId(currentUser.id);
      fetch(`http://localhost:4000/api/usuarios/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          reset(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [reset]);

  const onSubmit = async (data) => {
    if (userId) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/usuarios/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          console.log("Datos actualizados correctamente");
          alert("Datos actualizados correctamente");

        } else {
          console.error("Error al actualizar datos");
        }
      } catch (error) {
        console.error("Error al enviar datos:", error);
      }
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <section className="centrar py-12 md:py-24 lg:py-32 sectionmisdatos">
      <div className="container px-4 md:px-6 grid gap-8">
        <div className="ml-28 text-left space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Actualiza tu Perfil
          </h2>
          <p className="text-gray-500 md:text-xl">
            Administra tu información personal y ajustes.
          </p>
        </div>
        <div className="flex justify-center">
        <Card className="  w-full max-w-7xl  shadow-xl">
        <div className="p-8">
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>
                  Actualiza tu información de perfil.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre y Apellido</Label>
                    <Input
                      {...register("nombre")}
                      id="nombre"
                      type="text"
                      placeholder="Ingresa tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="Ingresa tu correo electrónico"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      {...register("direccion")}
                      id="direccion"
                      type="text"
                      placeholder="Ingresa tu dirección"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provincia">Provincia</Label>
                    <Input
                      {...register("provincia")}
                      id="provincia"
                      type="text"
                      placeholder="Ingresa tu provincia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pais">País</Label>
                    <Input
                      {...register("pais")}
                      id="pais"
                      type="text"
                      placeholder="Ingresa tu país"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localidad">Localidad</Label>
                    <Input
                      {...register("localidad")}
                      id="localidad"
                      type="text"
                      placeholder="Ingresa tu localidad"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edad">Edad</Label>
                    <Input
                      {...register("edad")}
                      id="edad"
                      type="number"
                      placeholder="Ingresa tu edad"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nroTelefono">Número de Teléfono</Label>
                    <Input
                      {...register("nroTelefono")}
                      id="nroTelefono"
                      type="tel"
                      placeholder="Ingresa tu número de teléfono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biografia">Biografía</Label>
                    <textarea
                      {...register("biografia")}
                      id="biografia"
                      placeholder="Ingresa tu biografía"
                      className="block w-full shadow-sm sm:text-sm border-black border-2 rounded-md p-2"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
            </Card>

        </div>
      </div>
    </section>
  );
}
