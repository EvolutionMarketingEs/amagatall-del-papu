import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/LocaleProvider";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'amagatall del Papu · Sitges 2026",
  description:
    "Escape room immersiu de realitat virtual al Festival Internacional de Cinema Fantàstic de Catalunya. Reserva la teva plaça a l'Espai Joan Tarrida, Sitges.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ca" className={`${cinzel.variable} ${inter.variable} h-full antialiased`}>
      <body className="portal-bg min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
