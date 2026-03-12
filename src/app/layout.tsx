import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { siteConfig } from "@/config/site";
import { GoogleAnalytics } from '@next/third-parties/google';
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
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: "LoveToolsHub Team" }],
    creator: "LoveToolsHub",
    metadataBase: new URL(siteConfig.url),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: siteConfig.twitter,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    verification: {
        google: "QIvMy-wbqTBt9XXP8ttGnzO1_-8RSHCm0XhBu_3BHSY",
    },
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
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": siteConfig.name,
                            "url": siteConfig.url,
                            "description": siteConfig.description,
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": `${siteConfig.url}/search?q={search_term_string}`,
                                "query-input": "required name=search_term_string"
                            }
                        })
                    }}
                />
                <Script
                    src="https://pl28896860.effectivegatecpm.com/bb/02/ac/bb02ac3ba5e3c0140206cc60e3cd0ce3.js"
                    strategy="afterInteractive"
                />

                <main style={{ minHeight: '80vh' }}>
                    <Container>
                        {children}
                    </Container>
                </main>
                <Footer />
                <GoogleAnalytics gaId={siteConfig.analyticsId} />


                {/* Adsterra Social Bar */}
                <Script
                    src="https://pl28896908.effectivegatecpm.com/2c/47/99/2c47992c9aec058df553c050bc64c94f.js"
                    strategy="afterInteractive"
                />

                {/* Ad Slot: Bottom Sticky Anchor */}
                <div id="ad-slot-anchor" style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', background: '#F8F9FA', borderTop: '1px solid #ddd', padding: '10px 0', zIndex: 1000, display: 'none' }}>
                    {/* AdSense code would go here */}
                    <p style={{ color: '#999', fontSize: '10px' }}>SPONSORED AD</p>
                </div>
            </body>
        </html>
    );
}
