"use client";

import NavBarComponent from '../../components/NavBar';
import { NavbarProvider } from './context/NavbarContext'; 

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" />
      </head>
      <body>
        <NavbarProvider> 
          <NavBarComponent />
          <main>{children}</main>
        </NavbarProvider>
      </body>
    </html>
  );
}
