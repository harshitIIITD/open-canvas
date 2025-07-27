"use client";

import { ComposerPrimitive, ThreadPrimitive } from "@assistant-ui/react";
import { type FC, useState, useEffect } from "react";
import { useAppConfig } from "@/contexts/AppConfigContext";

import { TooltipIconButton } from "@/components/ui/assistant-ui/tooltip-icon-button";
import { SendHorizontalIcon } from "lucide-react";
import { DragAndDropWrapper } from "./drag-drop-wrapper";
import { ComposerAttachments } from "../assistant-ui/attachment";
import { ComposerActionsPopOut } from "./composer-actions-popout";

const GENERIC_PLACEHOLDERS = [
  "Share your big idea and let's research it together",
  "What would you like me to research and write about?",
  "Your masterpiece begins with intelligent research",
  "Ask me anything - I'll find the latest sources",
  "Turn your curiosity into comprehensive content",
  "Research any topic with AI-powered insights",
  "Your next breakthrough starts with a question",
  "Let's explore ideas with real-time information",
  "Research, analyze, and create in one place",
  "Transform questions into researched content",
];

const SEARCH_PLACEHOLDERS = [
  "Research any topic with live data and sources",
  "Ask me to investigate and I'll cite everything", 
  "Deep research with real-time fact-checking",
  "Comprehensive analysis with source verification",
  "Your research assistant with citation powers",
  "Live data research with academic standards",
  "Fact-based content with transparent sourcing",
  "Research-grade analysis in real-time",
  "Evidence-based writing with live sources",
  "Professional research with citation tracking",
];

const getRandomPlaceholder = (searchEnabled: boolean) => {
  return searchEnabled
    ? SEARCH_PLACEHOLDERS[
        Math.floor(Math.random() * SEARCH_PLACEHOLDERS.length)
      ]
    : GENERIC_PLACEHOLDERS[
        Math.floor(Math.random() * GENERIC_PLACEHOLDERS.length)
      ];
};

const CircleStopIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="16"
      height="16"
    >
      <rect width="10" height="10" x="3" y="3" rx="2" />
    </svg>
  );
};

interface ComposerProps {
  chatStarted: boolean;
  userId: string | undefined;
  searchEnabled: boolean;
}

export const Composer: FC<ComposerProps> = (props: ComposerProps) => {
  const { config } = useAppConfig();
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    // Use custom placeholder if configured, otherwise use random default
    if (config.customBranding.placeholderText) {
      setPlaceholder(config.customBranding.placeholderText);
    } else {
      setPlaceholder(getRandomPlaceholder(props.searchEnabled));
    }
  }, [props.searchEnabled, config.customBranding.placeholderText]);

  return (
    <DragAndDropWrapper>
      <ComposerPrimitive.Root className="focus-within:border-aui-ring/20 flex flex-col w-full min-h-[64px] flex-wrap items-center justify-center border px-2.5 shadow-sm transition-colors ease-in bg-white rounded-2xl">
        <div className="flex flex-wrap gap-2 items-start mr-auto">
          <ComposerAttachments />
        </div>

        <div className="flex flex-row w-full items-center justify-start my-auto">
          <ComposerActionsPopOut
            userId={props.userId}
            chatStarted={props.chatStarted}
          />
          <ComposerPrimitive.Input
            autoFocus
            placeholder={placeholder}
            rows={1}
            className="placeholder:text-muted-foreground max-h-40 flex-grow resize-none border-none bg-transparent px-2 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed"
          />
          <ThreadPrimitive.If running={false}>
            <ComposerPrimitive.Send asChild>
              <TooltipIconButton
                tooltip="Send"
                variant="default"
                className="my-2.5 size-8 p-2 transition-opacity ease-in"
              >
                <SendHorizontalIcon />
              </TooltipIconButton>
            </ComposerPrimitive.Send>
          </ThreadPrimitive.If>
          <ThreadPrimitive.If running>
            <ComposerPrimitive.Cancel asChild>
              <TooltipIconButton
                tooltip="Cancel"
                variant="default"
                className="my-2.5 size-8 p-2 transition-opacity ease-in"
              >
                <CircleStopIcon />
              </TooltipIconButton>
            </ComposerPrimitive.Cancel>
          </ThreadPrimitive.If>
        </div>
      </ComposerPrimitive.Root>
    </DragAndDropWrapper>
  );
};
