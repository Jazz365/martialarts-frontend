import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "rc-pagination/assets/index.css";


const mako = localFont({
  src: "./fonts/Mako/Mako-Regular.ttf",
  variable: "--mako-font",
  weight: "500 600 700 800 900",
});

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins/Poppins-Thin.ttf",
      style: "normal",
      weight: "100",
    },
    {
      path: "./fonts/Poppins/Poppins-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "./fonts/Poppins/Poppins-Regular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--poppins-font",
});

export const metadata: Metadata = {
  title: "Martial Arts Guru",
  description: "Martial arts directory listing site",
  authors: [
    { 
      name: 'Ayoola Oloyede', 
      url: 'https://github.com/Josh-Ay', 
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mako.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
