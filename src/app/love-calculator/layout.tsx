import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Love Calculator",
    description: "Calculate your romantic compatibility with your partner or crush using our advanced Love Calculator tool.",
    openGraph: {
        title: "Love Calculator – Test Your Romantic Compatibility",
        description: "Are you and your partner a perfect match? Find out with our accurate Love Calculator.",
    }
};

export default function LoveCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
