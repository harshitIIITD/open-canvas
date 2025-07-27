"use client";

import { Login } from "@/components/auth/login/Login";
import { AppConfigProvider } from "@/contexts/AppConfigContext";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="h-screen">
      <AppConfigProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </AppConfigProvider>
    </main>
  );
}
