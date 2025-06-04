import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/UI/header";
import Footer from "@/components/UI/footer";
import { Work_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const workSans = Work_Sans({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: "Movie-Scout",
	description: "Find a movie to watch",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ClerkProvider>
				<body className={workSans.className}>
					<Header />
					{children}
					<Footer />
				</body>
			</ClerkProvider>
		</html>
	);
}
