import { ProgrammingLanguageOptions } from "@opencanvas/shared/types";
import { ThreadPrimitive, useThreadRuntime } from "@assistant-ui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC, useMemo } from "react";
import { TighterText } from "../ui/header";
import { NotebookPen } from "lucide-react";
import { ProgrammingLanguagesDropdown } from "../ui/programming-lang-dropdown";
import { Button } from "../ui/button";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { AppConfigDialog } from "@/components/app-config-dialog";

const QUICK_START_PROMPTS_SEARCH = [
  "Research and analyze the latest developments in artificial intelligence regulation across major economies",
  "Investigate current trends in renewable energy adoption and their economic impact on traditional energy sectors",
  "Analyze the effects of remote work on urban real estate markets and city planning strategies",
  "Research breakthrough treatments in cancer immunotherapy and their clinical trial results",
  "Examine the current state of quantum computing development and its potential business applications",
  "Investigate the latest cybersecurity threats facing cloud infrastructure and enterprise solutions",
  "Research the impact of central bank digital currencies (CBDCs) on traditional banking systems",
  "Analyze emerging supply chain technologies and their role in addressing global logistics challenges",
  "Study the environmental and economic effects of carbon pricing mechanisms worldwide",
  "Research advances in gene therapy and CRISPR technology for treating genetic disorders",
  "Investigate the latest developments in space commercialization and private space exploration",
  "Analyze the impact of microplastics on marine ecosystems and human health research",
  "Research current semiconductor industry challenges and technological solutions being developed",
  "Examine the latest breakthroughs in battery technology and energy storage solutions",
  "Investigate the effects of social media algorithms on information consumption and democracy",
];

const QUICK_START_PROMPTS = [
  "Write a compelling short story about AI consciousness awakening in a smart city",
  "Create a comprehensive guide to building a sustainable indoor garden ecosystem", 
  "Draft a professional proposal for implementing remote work policies in traditional companies",
  "Build a TypeScript application for tracking personal carbon footprint with data visualization",
  "Write an inspiring speech about the future of human-AI collaboration",
  "Create a Python script for automated email management and intelligent filtering",
  "Design a React component library for accessible web interfaces",
  "Write a detailed analysis of emerging technologies that will shape the next decade",
  "Create a personal finance tracker with React and implement goal-setting features",
  "Draft a comprehensive business plan for a sustainable technology startup",
  "Build a command-line tool for developer productivity optimization",
  "Write a creative manifesto on the intersection of art and technology",
  "Create a full-stack web application for community resource sharing",
  "Design an API for real-time collaboration features in creative software",
  "Write a technical deep-dive into modern web performance optimization strategies",
];

function getRandomPrompts(prompts: string[], count: number = 6): string[] {
  return [...prompts].sort(() => Math.random() - 0.5).slice(0, count);
}

interface QuickStartButtonsProps {
  handleQuickStart: (
    type: "text" | "code",
    language?: ProgrammingLanguageOptions
  ) => void;
  composer: React.ReactNode;
  searchEnabled: boolean;
}

interface QuickStartPromptsProps {
  searchEnabled: boolean;
}

const QuickStartPrompts = ({ searchEnabled }: QuickStartPromptsProps) => {
  const threadRuntime = useThreadRuntime();

  const handleClick = (text: string) => {
    threadRuntime.append({
      role: "user",
      content: [{ type: "text", text }],
    });
  };

  const selectedPrompts = useMemo(
    () =>
      getRandomPrompts(
        searchEnabled ? QUICK_START_PROMPTS_SEARCH : QUICK_START_PROMPTS
      ),
    [searchEnabled]
  );

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
        {selectedPrompts.map((prompt, index) => (
          <Button
            key={`quick-start-prompt-${index}`}
            onClick={() => handleClick(prompt)}
            variant="outline"
            className="min-h-[80px] w-full flex items-center justify-center p-4 whitespace-normal text-gray-500 hover:text-gray-700 transition-colors ease-in rounded-2xl text-xs leading-relaxed"
          >
            <p className="text-center break-words font-normal">
              {prompt}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
};

const QuickStartButtons = (props: QuickStartButtonsProps) => {
  const handleLanguageSubmit = (language: ProgrammingLanguageOptions) => {
    props.handleQuickStart("code", language);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full">
      <div className="flex flex-col gap-6">
        <p className="text-gray-600 text-sm">Start with a blank canvas</p>
        <div className="flex flex-row gap-1 items-center justify-center w-full">
          <Button
            variant="outline"
            className="text-gray-500 hover:text-gray-700 transition-colors ease-in rounded-2xl flex items-center justify-center gap-2 w-[250px] h-[64px]"
            onClick={() => props.handleQuickStart("text")}
          >
            New Markdown
            <NotebookPen />
          </Button>
          <ProgrammingLanguagesDropdown handleSubmit={handleLanguageSubmit} />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-2 w-full">
        <p className="text-gray-600 text-sm">or with a message</p>
        {props.composer}
        <QuickStartPrompts searchEnabled={props.searchEnabled} />
      </div>
    </div>
  );
};

interface ThreadWelcomeProps {
  handleQuickStart: (
    type: "text" | "code",
    language?: ProgrammingLanguageOptions
  ) => void;
  composer: React.ReactNode;
  searchEnabled: boolean;
}

export const ThreadWelcome: FC<ThreadWelcomeProps> = (
  props: ThreadWelcomeProps
) => {
  const { config } = useAppConfig();

  return (
    <ThreadPrimitive.Empty>
      <div className="flex items-center justify-center mt-16 w-full">
        <div className="text-center max-w-3xl w-full">
          <div className="flex items-center justify-center mb-4">
            <AppConfigDialog />
          </div>
          <Avatar className="mx-auto">
            {config.logoUrl ? (
              <AvatarImage src={config.logoUrl} alt={`${config.appName} Logo`} />
            ) : (
              <AvatarImage src="/lc_logo.jpg" alt="Logo" />
            )}
            <AvatarFallback>{config.appName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <TighterText className="mt-4 text-lg font-medium">
            {config.customBranding.welcomeMessage || `What would you like to write today?`}
          </TighterText>
          <div className="mt-8 w-full">
            <QuickStartButtons
              composer={props.composer}
              handleQuickStart={props.handleQuickStart}
              searchEnabled={props.searchEnabled}
            />
          </div>
        </div>
      </div>
    </ThreadPrimitive.Empty>
  );
};
