import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { UserProvider } from "@/lib/user-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solead - Simulação de Energia Solar",
  description:
    "Analise o ROI da instalação de painéis solares e encontre os melhores fornecedores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <Navigation />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
