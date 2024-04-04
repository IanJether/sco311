'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { MyContextProvider } from "@/state/context";
import Footer from "@/components/common/Footer";
import { auth } from "@/db/config";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {


  const user = auth.currentUser

  const router = useRouter()

  useEffect(()=>{
    if(!user){
      router.push('/signin')
    }
  },[])


  return (

      <MyContextProvider>
        <html lang="en">
          <body className={inter.className}>
            <Navbar />
            <div className="mt-[0px]">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </MyContextProvider>
 

  );
}


// npx tailwindcss -i ./app/globals.css -o ./app/output.css --watch