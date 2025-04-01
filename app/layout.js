import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deepseek",
  description: "Chat With Deepseek",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body className={`${inter.variable} antialiased`} >
            <Toaster toastOptions={{ 
              success: {style: {background: 'black',color: 'white'}},
              error: {style: {background: 'black',color: 'white'}}
             }} />
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
