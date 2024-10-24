import { useState } from "react";
import { Layout } from "@/components/Layout";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitBranch, History, MessageSquare, Plus, Share2 } from "lucide-react";

export default function PromptBuilder() {
  const [promptText, setPromptText] = useState(
    "Generate a creative story about {character} in {setting}."
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visual Prompt Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight">
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
                className="min-h-[200px] mb-4 border-gray-300 focus:border-[#FF6B2C] focus:ring-[#FF6B2C] font-normal"
              />
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white font-medium"
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

          {/* Prompt Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight">
                Prompt Templates
              </CardTitle>
              <CardDescription>
                Browse and select from pre-defined templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
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
                      <span className="font-medium">{template}</span>
                      <Badge className="bg-[#2D3BE0] text-white font-normal">
                        AI
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Version Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight">
                Version Control
              </CardTitle>
              <CardDescription>
                Manage prompt versions and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-[#2A2D3E] font-medium">
                    <GitBranch className="mr-2 h-4 w-4" /> main
                  </span>
                  <Badge
                    variant="outline"
                    className="border-[#2D3BE0] text-[#2D3BE0] font-normal"
                  >
                    Latest
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span className="flex items-center font-medium">
                    <GitBranch className="mr-2 h-4 w-4" /> feature/new-params
                  </span>
                  <span className="text-xs">2 days ago</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white font-medium"
                >
                  <History className="mr-2 h-4 w-4" /> History
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C] hover:text-white font-medium"
                >
                  <GitBranch className="mr-2 h-4 w-4" /> Branch
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Collaborative Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight">
                Collaboration
              </CardTitle>
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
                <Button className="w-full bg-[#2D3BE0] hover:bg-[#3D4BE0] text-white font-medium">
                  <MessageSquare className="mr-2 h-4 w-4" /> Open Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#2D3BE0] text-[#2D3BE0] hover:bg-[#2D3BE0] hover:text-white font-medium"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share Prompt
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
