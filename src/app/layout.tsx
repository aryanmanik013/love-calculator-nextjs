import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `${siteConfig.name} – Advanced Love & Compatibility Calculators`,
    description: siteConfig.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`} style={{ background: '#FFF0F3', color: '#590D22' }}>
                <Header />
                <main style={{ minHeight: '80vh' }}>
                    <Container>
                        {children}
                    </Container>
                </main>
                <Footer />

                {/* Ad Slot: Bottom Sticky Anchor */}
                <div id="ad-slot-anchor" style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', background: '#F8F9FA', borderTop: '1px solid #ddd', padding: '10px 0', zIndex: 1000, display: 'none' }}>
                    {/* AdSense code would go here */}
                    <p style={{ color: '#999', fontSize: '10px' }}>SPONSORED AD</p>
                </div>
            </body>
        </html>
    );
}
