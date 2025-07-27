"use client";

import { Canvas } from "@/components/canvas";
import { AssistantProvider } from "@/contexts/AssistantContext";
import { GraphProvider } from "@/contexts/GraphContext";
import { ThreadProvider } from "@/contexts/ThreadProvider";
import { UserProvider } from "@/contexts/UserContext";
import { AppConfigProvider } from "@/contexts/AppConfigContext";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <AppConfigProvider>
        <UserProvider>
          <ThreadProvider>
            <AssistantProvider>
              <GraphProvider>
                <Canvas />
              </GraphProvider>
            </AssistantProvider>
          </ThreadProvider>
        </UserProvider>
      </AppConfigProvider>
    </Suspense>
  );
}
