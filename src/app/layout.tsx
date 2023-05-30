import './globals.css'
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: ["300", "500"], subsets: ["latin"] });

export const metadata = {
  title: "Encurtador de Links",
  description:
    "Uma ferramenta simples feita com Next.js para encurtar URLs longos.",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}

export default RootLayout;