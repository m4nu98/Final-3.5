import React from 'react';
import Link from 'next/link'; // Importa Link de Next.js

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white margin-top: 0 px-4 lg:px-6 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm">&copy; 2024 Cleaning Pros. All rights reserved.</p>
      <nav className="flex gap-4 sm:gap-6">
        <Link href="/about" passHref legacyBehavior>
          <a className="hover:underline">Politica de Privacidad</a>
        </Link>
        <Link href="/about" passHref legacyBehavior>
          <a className="hover:underline">Terminos y Servicios</a>
        </Link>
        <Link href="/about" passHref legacyBehavior>
          <a className="hover:underline">Contactanos</a>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
