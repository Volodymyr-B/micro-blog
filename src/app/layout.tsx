import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/providers/query-provider";
import { Container } from "@mui/material";
import "@/styles/globals.css";

const font = Roboto({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Micro Blog",
  description: "Micro Blog App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <QueryProvider>
          <Toaster />
          <main className="flex-auto">
            <Container>{children}</Container>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
