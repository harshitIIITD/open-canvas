"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AppConfig {
  appName: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl?: string;
  enableAdvancedSearch: boolean;
  enableSourceCitation: boolean;
  enableCollaborativeResearch: boolean;
  enableRealTimeUpdates: boolean;
  customBranding: {
    headerTitle?: string;
    welcomeMessage?: string;
    placeholderText?: string;
  };
}

const defaultConfig: AppConfig = {
  appName: "CALW",
  description: "Next-Generation AI Research & Collaboration Platform",
  primaryColor: "#2563eb", // blue-600
  secondaryColor: "#64748b", // slate-500  
  accentColor: "#0ea5e9", // sky-500
  enableAdvancedSearch: true,
  enableSourceCitation: true,
  enableCollaborativeResearch: true,
  enableRealTimeUpdates: true,
  customBranding: {
    headerTitle: "CALW",
    welcomeMessage: "Welcome to CALW - Your AI-Powered Research Assistant",
    placeholderText: "Ask me anything, and I'll research it for you...",
  },
};

interface AppConfigContextType {
  config: AppConfig;
  updateConfig: (updates: Partial<AppConfig>) => void;
  resetConfig: () => void;
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined);

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("calw-app-config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsed });
      } catch (error) {
        console.error("Failed to parse saved config:", error);
      }
    }
  }, []);

  // Save config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("calw-app-config", JSON.stringify(config));
    
    // Apply CSS custom properties for theming
    const root = document.documentElement;
    root.style.setProperty("--primary-color", config.primaryColor);
    root.style.setProperty("--secondary-color", config.secondaryColor);
    root.style.setProperty("--accent-color", config.accentColor);
  }, [config]);

  const updateConfig = (updates: Partial<AppConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...updates,
      customBranding: { ...prev.customBranding, ...updates.customBranding },
    }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem("calw-app-config");
  };

  return (
    <AppConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const context = useContext(AppConfigContext);
  if (context === undefined) {
    throw new Error("useAppConfig must be used within an AppConfigProvider");
  }
  return context;
}