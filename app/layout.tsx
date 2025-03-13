import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import ConvexClientProvider from "@/providers/ConvexClientProvider";


export const metadata: Metadata = {
  title: "NutriAção",
  description: "Explore como uma alimentação balanceada pode transformar sua saúde e bem-estar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="relative">
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
