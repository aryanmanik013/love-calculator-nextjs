import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Crush Calculator",
    description: "Does your crush like you back? Use our Crush Calculator to analyze your connection and find out if there's a potential spark.",
    openGraph: {
        title: "Crush Calculator – See if Your Crush Likes You Back",
        description: "Analyze your connection and discover the truth about your crush's feelings with our fun and accurate tool.",
    }
};

export default function CrushCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
