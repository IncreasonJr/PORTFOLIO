import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delator Caleb Edudzi | AI Engineer & Full-Stack Developer",
  description: "Portfolio of Delator Caleb Edudzi - FullStack AI Engineer. Building production-grade AI solutions and full-stack architectures.",
  openGraph: {
    title: "Delator Caleb Edudzi | AI Engineer & Full-Stack Developer",
    description: "Portfolio of Delator Caleb Edudzi - FullStack AI Engineer. Building production-grade AI solutions and full-stack architectures.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delator Caleb Edudzi | AI Engineer & Full-Stack Developer",
    description: "Portfolio of Delator Caleb Edudzi - FullStack AI Engineer.",
  },
};

const themeScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" style={{ scrollBehavior: "smooth" }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased text-foreground bg-background selection:bg-foreground selection:text-background">
        {children}
      </body>
    </html>
  );
}
