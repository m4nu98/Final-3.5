import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "@/app/globals.css";

export default function Component() {
  return (
    <section className="centrar py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 grid gap-8">
      <div className="ml-28 text-left space-y-4">
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Actualiza tu Perfil</h2>
    <p className="text-gray-500 md:text-xl">Administra tu información personal y ajustes.</p>
  </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-7xl  shadow-xl">
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Actualiza tu información de perfil.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Ingresa tu nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Apellido</Label>
                <Input id="surname" placeholder="Ingresa tu apellido" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" placeholder="Ingresa tu correo electrónico" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" placeholder="Ingresa tu contraseña" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Ingresa tu dirección" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input id="country" placeholder="Ingresa tu país" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" placeholder="Ingresa tu estado" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Ingresa tu ciudad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Código Postal</Label>
                <Input id="zip" placeholder="Ingresa tu código postal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input id="age" placeholder="Ingresa tu edad" type="number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono</Label>
                <Input id="phone" placeholder="Ingresa tu número de teléfono" type="tel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea id="bio" placeholder="Ingresa tu biografía" className="min-h-[100px]" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Guardar</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
