import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignedOut } from "@clerk/nextjs";

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
        <ClerkProvider>
          <SignedOut>
            {children}
          </SignedOut>
        </ClerkProvider>
      </body>
    </html>
  );
}
