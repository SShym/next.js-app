import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function MainLayout({ children }: Readonly<{children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className}>
        {children}
        <Toaster
          toastOptions={{
            success: {
              iconTheme: {
                primary: '#FF7F50',
                secondary: 'white',
              },
            },
          }}
        />
      </body>
    </html>
  );
}