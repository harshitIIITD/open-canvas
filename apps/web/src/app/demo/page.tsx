"use client";

import { Canvas } from "@/components/canvas";
import { AppConfigProvider } from "@/contexts/AppConfigContext";
import { AppConfigDialog } from "@/components/app-config-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Settings, Zap, Search, FileText, Users, Palette } from "lucide-react";

export default function DemoPage() {
  return (
    <AppConfigProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                C
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">CALW</h1>
                <p className="text-lg text-gray-600">Next-Generation AI Research & Collaboration Platform</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <AppConfigDialog />
              <Badge variant="secondary" className="text-sm">Demo Mode</Badge>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Advanced Configuration
                </CardTitle>
                <CardDescription>
                  Customize every aspect of your research environment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Configurable app name and branding</li>
                  <li>• Custom color schemes and themes</li>
                  <li>• Personalized welcome messages</li>
                  <li>• Export/import settings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-green-600" />
                  Research-Grade Search
                </CardTitle>
                <CardDescription>
                  Perplexity-style research with source verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time source reliability scoring</li>
                  <li>• Professional citation tools</li>
                  <li>• Advanced research prompts</li>
                  <li>• Live data integration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Smart Content Creation
                </CardTitle>
                <CardDescription>
                  AI-powered writing with research integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Collaborative canvas editing</li>
                  <li>• Version control and history</li>
                  <li>• Multi-format support</li>
                  <li>• Real-time collaboration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  Team Collaboration
                </CardTitle>
                <CardDescription>
                  Advanced collaboration features for research teams
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time collaborative editing</li>
                  <li>• Shared research libraries</li>
                  <li>• Team memory and insights</li>
                  <li>• Custom quick actions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  God-Tier Features
                </CardTitle>
                <CardDescription>
                  Never-before-seen capabilities and innovations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Dynamic reliability assessment</li>
                  <li>• Intelligent source ranking</li>
                  <li>• Contextual research suggestions</li>
                  <li>• Advanced memory systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-600" />
                  Customizable Interface
                </CardTitle>
                <CardDescription>
                  Highly editable UI that adapts to your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Dynamic theme system</li>
                  <li>• Configurable layouts</li>
                  <li>• Custom branding options</li>
                  <li>• Adaptive user experience</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Experience the Future of AI Research
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CALW combines the best of Perplexity's research capabilities with advanced collaboration tools, 
              creating a platform that's truly in a league of its own.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Open Settings Demo
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </div>

          {/* Technology Stack */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">Built with Cutting-Edge Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-blue-600 font-bold">⚛</span>
                  </div>
                  <p className="text-sm font-medium">Next.js 14</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-green-600 font-bold">🤖</span>
                  </div>
                  <p className="text-sm font-medium">LangGraph</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-purple-600 font-bold">🎨</span>
                  </div>
                  <p className="text-sm font-medium">Tailwind CSS</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-orange-600 font-bold">⚡</span>
                  </div>
                  <p className="text-sm font-medium">TypeScript</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppConfigProvider>
  );
}