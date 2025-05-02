import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignedOut } from "@clerk/nextjs";
import { ViewTransitions } from "next-view-transitions"
import { ReactLenis } from '../util/lenis'

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
        <ViewTransitions>
            <html lang="pt-br">
                <ReactLenis root>
                    <body>
                        <ClerkProvider>
                            <SignedOut>
                                {children}
                            </SignedOut>
                        </ClerkProvider>
                    </body>
                </ReactLenis>
            </html>
        </ViewTransitions>
    );
}