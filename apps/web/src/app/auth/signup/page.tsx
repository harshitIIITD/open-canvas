"use client";

import { Signup } from "@/components/auth/signup/Signup";
import { AppConfigProvider } from "@/contexts/AppConfigContext";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="h-screen">
      <AppConfigProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Signup />
        </Suspense>
      </AppConfigProvider>
    </main>
  );
}
