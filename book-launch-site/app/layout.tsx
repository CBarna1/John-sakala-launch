import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
// @ts-ignore Next.js processes global CSS imports.
import "./globals.css";
import { BOOK, EVENT_DATE_LABEL } from "@/lib/event";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: `${BOOK.title} Launch | ${BOOK.author}`,
  description: `You are invited to the launch of ${BOOK.title} by ${BOOK.author} on ${EVENT_DATE_LABEL}. RSVP today to reserve your spot and a copy of the book.`,
  openGraph: {
    title: `${BOOK.title} Launch`,
    description: `Join us to celebrate the launch of ${BOOK.title}.`,
    // If you have a book cover, update this to your live URL later
    // images: ['https://yourdomain.com/book-cover.jpg'], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}