"use client";

import React, { useState } from "react";
import { useAppConfig } from "@/contexts/AppConfigContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Settings, Palette, Search, FileText, Users, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AppConfigDialog() {
  const { config, updateConfig, resetConfig } = useAppConfig();
  const [open, setOpen] = useState(false);
  const [tempConfig, setTempConfig] = useState(config);

  const handleSave = () => {
    updateConfig(tempConfig);
    setOpen(false);
  };

  const handleReset = () => {
    resetConfig();
    setTempConfig(config);
  };

  const ColorPicker = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-10"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1"
        />
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>App Configuration</DialogTitle>
          <DialogDescription>
            Customize CALW to match your preferences and branding needs.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
                <CardDescription>Configure the basic app information and branding.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appName">App Name</Label>
                  <Input
                    id="appName"
                    value={tempConfig.appName}
                    onChange={(e) => setTempConfig({ ...tempConfig, appName: e.target.value })}
                    placeholder="CALW"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={tempConfig.description}
                    onChange={(e) => setTempConfig({ ...tempConfig, description: e.target.value })}
                    placeholder="Next-Generation AI Research & Collaboration Platform"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="headerTitle">Header Title</Label>
                  <Input
                    id="headerTitle"
                    value={tempConfig.customBranding.headerTitle || ""}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      customBranding: { ...tempConfig.customBranding, headerTitle: e.target.value }
                    })}
                    placeholder="CALW"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={tempConfig.customBranding.welcomeMessage || ""}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      customBranding: { ...tempConfig.customBranding, welcomeMessage: e.target.value }
                    })}
                    placeholder="Welcome to CALW - Your AI-Powered Research Assistant"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="placeholderText">Input Placeholder Text</Label>
                  <Input
                    id="placeholderText"
                    value={tempConfig.customBranding.placeholderText || ""}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      customBranding: { ...tempConfig.customBranding, placeholderText: e.target.value }
                    })}
                    placeholder="Ask me anything, and I'll research it for you..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Color Scheme
                </CardTitle>
                <CardDescription>Customize the color scheme of your application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ColorPicker
                  label="Primary Color"
                  value={tempConfig.primaryColor}
                  onChange={(value) => setTempConfig({ ...tempConfig, primaryColor: value })}
                />
                <ColorPicker
                  label="Secondary Color"
                  value={tempConfig.secondaryColor}
                  onChange={(value) => setTempConfig({ ...tempConfig, secondaryColor: value })}
                />
                <ColorPicker
                  label="Accent Color"
                  value={tempConfig.accentColor}
                  onChange={(value) => setTempConfig({ ...tempConfig, accentColor: value })}
                />
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL (optional)</Label>
                  <Input
                    id="logoUrl"
                    value={tempConfig.logoUrl || ""}
                    onChange={(e) => setTempConfig({ ...tempConfig, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Feature Toggles
                </CardTitle>
                <CardDescription>Enable or disable specific features of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="advancedSearch">Advanced Search</Label>
                      <p className="text-sm text-muted-foreground">Enable enhanced search capabilities with source citation</p>
                    </div>
                  </div>
                  <Switch
                    id="advancedSearch"
                    checked={tempConfig.enableAdvancedSearch}
                    onCheckedChange={(checked) => setTempConfig({ ...tempConfig, enableAdvancedSearch: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="sourceCitation">Source Citation</Label>
                      <p className="text-sm text-muted-foreground">Automatically cite sources in research responses</p>
                    </div>
                  </div>
                  <Switch
                    id="sourceCitation"
                    checked={tempConfig.enableSourceCitation}
                    onCheckedChange={(checked) => setTempConfig({ ...tempConfig, enableSourceCitation: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="collaborativeResearch">Collaborative Research</Label>
                      <p className="text-sm text-muted-foreground">Enable real-time collaboration features</p>
                    </div>
                  </div>
                  <Switch
                    id="collaborativeResearch"
                    checked={tempConfig.enableCollaborativeResearch}
                    onCheckedChange={(checked) => setTempConfig({ ...tempConfig, enableCollaborativeResearch: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="realTimeUpdates">Real-time Updates</Label>
                      <p className="text-sm text-muted-foreground">Enable live updates and notifications</p>
                    </div>
                  </div>
                  <Switch
                    id="realTimeUpdates"
                    checked={tempConfig.enableRealTimeUpdates}
                    onCheckedChange={(checked) => setTempConfig({ ...tempConfig, enableRealTimeUpdates: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Advanced configuration options and data management.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Configuration Export/Import</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const dataStr = JSON.stringify(tempConfig, null, 2);
                        const blob = new Blob([dataStr], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "calw-config.json";
                        link.click();
                      }}
                    >
                      Export Config
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = ".json";
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              try {
                                const imported = JSON.parse(e.target?.result as string);
                                setTempConfig({ ...tempConfig, ...imported });
                              } catch (error) {
                                alert("Invalid configuration file");
                              }
                            };
                            reader.readAsText(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      Import Config
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Reset Configuration</Label>
                  <p className="text-sm text-muted-foreground">
                    Reset all settings to default values. This action cannot be undone.
                  </p>
                  <Button variant="destructive" onClick={handleReset}>
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setTempConfig(config)}>
              Revert Changes
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}