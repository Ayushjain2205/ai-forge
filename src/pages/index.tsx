import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Code,
  GitBranch,
  History,
  MessageSquare,
  Plus,
  Save,
  Share2,
  Users,
} from "lucide-react";

export default function Component() {
  const [promptText, setPromptText] = useState(
    "Generate a creative story about {character} in {setting}."
  );

  return (
    <div className="flex h-screen bg-white text-[#2A2D3E]">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-[#FF6B2C]">AI Dev Platform</h1>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-white bg-[#FF6B2C]"
          >
            <BookOpen className="mr-3 h-5 w-5" />
            Prompt Management
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-[#2A2D3E] hover:bg-gray-100"
          >
            <Code className="mr-3 h-5 w-5" />
            Model Integration
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-[#2A2D3E] hover:bg-gray-100"
          >
            <Users className="mr-3 h-5 w-5" />
            Team Collaboration
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#2A2D3E]">
            Prompt Management System
          </h2>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="mr-2 border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> New Prompt
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 overflow-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prompt Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C]">Prompt Templates</CardTitle>
              <CardDescription>
                Browse and select from pre-defined templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {[
                    "Story Generator",
                    "Code Explainer",
                    "Data Analyzer",
                    "Image Describer",
                  ].map((template) => (
                    <div
                      key={template}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
                    >
                      <span>{template}</span>
                      <Badge className="bg-[#2D3BE0] text-white">AI</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Visual Prompt Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C]">
                Visual Prompt Builder
              </CardTitle>
              <CardDescription>
                Create and edit prompts with parameter highlighting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="min-h-[100px] mb-2 border-gray-300 focus:border-[#FF6B2C] focus:ring-[#FF6B2C]"
              />
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Parameter
                </Button>
                <Select>
                  <SelectTrigger className="w-[180px] border-gray-300">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3">GPT-3</SelectItem>
                    <SelectItem value="gpt4">GPT-4</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Version Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C]">Version Control</CardTitle>
              <CardDescription>
                Manage prompt versions and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-[#2A2D3E]">
                    <GitBranch className="mr-2 h-4 w-4" /> main
                  </span>
                  <Badge
                    variant="outline"
                    className="border-[#2D3BE0] text-[#2D3BE0]"
                  >
                    Latest
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center">
                    <GitBranch className="mr-2 h-4 w-4" /> feature/new-params
                  </span>
                  <span className="text-xs">2 days ago</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white"
                >
                  <History className="mr-2 h-4 w-4" /> History
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white"
                >
                  <GitBranch className="mr-2 h-4 w-4" /> Branch
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Collaborative Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C]">Collaboration</CardTitle>
              <CardDescription>Work together in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar-2.jpg" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-[#2D3BE0] hover:bg-[#3D4BE0] text-white">
                  <MessageSquare className="mr-2 h-4 w-4" /> Open Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#2D3BE0] text-[#2D3BE0] hover:bg-[#2D3BE0] hover:text-white"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share Prompt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
