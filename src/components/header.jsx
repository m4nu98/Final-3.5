

"use client";




import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SignupForm from '@/components/SignupForm';
import SigninForm from '@/components/SigninForm';
import { MenuIcon } from '@/components/ui/icons';



const Header = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = JSON.parse(localStorage.getItem('currentUser'));
            setCurrentUser(storedUser);
        }
    }, [])

    const handleLoginSuccess = (currentUser) => {
        setCurrentUser(currentUser);
        console.log(currentUser,"estado del handleLoginSuccess")
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('currentUser');
            console.log(currentUser,"estado del handleLogout")
        }
        setCurrentUser(null);
    };

    return (
        <header className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex items-center justify-between relative">
            <Link href="/" className="flex items-center" prefetch={false}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="text-lg font-semibold ml-2">Servicios a Domicilio</span>
            </Link>

            <nav className="hidden lg:flex gap-6">
                {currentUser ? (
                    <>
                        <Link href="/servicios" className="hover:underline" prefetch={false}>Servicios</Link>
                        <Link href="/mipublicacion" className="hover:underline" prefetch={false}>Mis Publicaciones</Link>
                        <Link href="/misDatos" className="hover:underline" prefetch={false}>Mis datos</Link>
                        <Link href="/about" className="hover:underline" prefetch={false}>Acerca de Nosotros</Link>
                    </>
                ) : (
                    <>
                        <Link href="/" className="hover:underline" prefetch={false}>Inicio</Link>
                        <Link href="/about" className="hover:underline" prefetch={false}>Sobre Nosotros</Link>
                    </>
                )}
            </nav>

            <div className="flex gap-2">
                {currentUser ? (
                    <div className="flex items-center gap-2">
                        <span>Bienvenido, {currentUser.nombre}</span>
                        <Button variant="outline" className="text-white hover:bg-white hover:text-gray-900" onClick={() => {
    handleLogout();
    window.history.pushState({}, '', '/'); 
    window.location.reload(); // Opcional, si quieres recargar la página
  }}
>
                            Cerrar sesión
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button variant="outline" className="text-white hover:bg-white hover:text-gray-900" onClick={() => setIsSigninModalOpen(true)}>
                            Iniciar sesión
                        </Button>
                        <Button className="bg-white text-gray-900 hover:bg-gray-900 hover:text-white" onClick={() => setIsSignupModalOpen(true)}>
                            Registrarse
                        </Button>
                    </>
                )}
            </div>

            <nav className="lg:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-gray-800"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Alternar menú</span>
                </Button>
            </nav>

            <MobileMenu 
    menuOpen={menuOpen} 
    setMenuOpen={setMenuOpen} 
    currentUser={currentUser}  // <-- Agrega esta línea
    logout={handleLogout} 
/>
            {isSignupModalOpen && (
                <SignupForm onClose={() => setIsSignupModalOpen(false)} />
            )}

            {isSigninModalOpen && (
                <SigninForm onClose={() => setIsSigninModalOpen(false)} onLoginSuccess={handleLoginSuccess} />
            )}
        </header>
    );
};
export default Header;

const MobileMenu = ({ menuOpen, setMenuOpen, currentUser , logout }) => (
    
    <div className={`absolute top-16 right-0 bg-gray-900 w-64 flex flex-col items-start gap-4 p-4 z-50 ${menuOpen ? 'block' : 'hidden'}`}>
        {console.log(currentUser,"currentUser en MobileMenu")}
        {currentUser ? (
            <>
                <Link href="/misDatos" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Mi cuenta
                </Link>
                <Link href="/servicios" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Servicios
                </Link>
                <Link href="/" className="hover:underline w-full text-left" prefetch={false} onClick={() => { setMenuOpen(false); logout(); }}>
                    Salir
                </Link>
            </>
        ) : (
            <>
                <Link href="/" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                <Link href="/servicios" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Servicios
                </Link>
               
                
            </>
        )}
    </div>
);