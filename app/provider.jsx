"use client";

import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";

import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

import { SidebarProvider } from "@/components/ui/sidebar"; 
import AppSideBar from "@/components/custom/AppSideBar";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";

function Provider({ children }) {
  // State for contexts
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const [action, setAction] = useState();
  const router=useRouter();
  const convex = useConvex();

  useEffect(() => {
    isAuthenticated();
  }, [convex]);

  const isAuthenticated = async () => {
    if (typeof window !== undefined) {
      const token = JSON.parse(localStorage.getItem("user"));
      if (token) {
        try {
          
          const result = await convex.query(api.users.getUsers, {
            email: token?.email,
          });
          setUserDetail(result);
        
        } catch (error) {
          console.error("Convex query failed during authentication:", error);
        }
      } else {
        // console.log("No user logged in");
        router.push('/')
      }
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
    >
      {/* 1. Nesting all data/auth contexts */}
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessageContext.Provider value={{ messages, setMessages }}>
          {/* FIX: Ensuring correct component capitalization (.Provider) */}
          <ActionContext.Provider value={{ action, setAction }}>
            
            {/* 2. SidebarProvider must wrap components that use its context (Header, AppSideBar) */}
            <SidebarProvider defaultOpen={false}> 
              <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {/* 3. Layout Fix: Define the full-screen structure (Header, Sidebar, Content) */}
                <div className="flex flex-col h-screen w-full">
                    
                    {/* Header spans the top */}
                    <Header /> 
                    
                    {/* Main content area: Sidebar and Page Content (takes up remaining height) */}
                    <div className="flex flex-1 overflow-hidden">
                        <AppSideBar />
                        
                        {/* Page Content: takes up remaining space and scrolls */}
                        <main className="flex-1 overflow-y-auto">
                            {children}
                        </main>
                    </div>
                </div>
              </NextThemesProvider>
            </SidebarProvider>

          </ActionContext.Provider>
        </MessageContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default Provider;