import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BFF Test - Friendship Calculator",
    description: "How strong is your friendship? Test your bond with our BFF Friendship Calculator and see if you're truly best friends forever.",
    openGraph: {
        title: "BFF Test – Is Your Friendship Truly Forever?",
        description: "Calculate your friendship strength and see how well you and your bestie connect with our fun BFF test.",
    }
};

export default function FriendshipCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
