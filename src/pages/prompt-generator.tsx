import React, { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import CustomCodeEditor from "@/components/CustomCodeEditor";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import copy from "copy-to-clipboard";
import { Loader2, Copy, Check, WandSparkles } from "lucide-react";

// Import languages you want to use
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";

// Register the languages you want to use
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("bash", bash);

export default function PromptGenerator() {
  const [input, setInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("javascript");

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    // Simulating API call with setTimeout
    setTimeout(() => {
      const prompt = `Generate a {creative} and {engaging} prompt about ${input} that includes {specific_details} and {vivid_descriptions}.`;
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 2000);
  }, [input]);

  const handleCopy = useCallback((text: string) => {
    copy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const codeSnippets = {
    javascript: `const prompt = \`${generatedPrompt}\`;
const response = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: prompt,
  max_tokens: 100
});`,
    python: `prompt = f"${generatedPrompt}"
response = openai.Completion.create(
    engine="text-davinci-002",
    prompt=prompt,
    max_tokens=100
)`,
    bash: `curl https://api.openai.com/v1/engines/davinci-codex/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "prompt": "${generatedPrompt}",
    "max_tokens": 100
  }'`,
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Prompt Generator</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What are you generating a prompt for?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input">Your topic</Label>
                <Input
                  id="input"
                  placeholder="Enter your topic here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !input}
                  className="bg-[#FF6B2C] hover:bg-[#E55A1B] text-white"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <WandSparkles className="mr-2 h-4 w-4" />
                      Generate Prompt
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {generatedPrompt && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#FF6B2C] flex items-center">
                <WandSparkles className="mr-2 h-5 w-5" />
                Generated Prompt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-100 p-4 rounded-md">
                <p className="mb-4 text-lg">
                  {generatedPrompt.split("{").map((part, index) => {
                    if (index === 0) return part;
                    const [variable, rest] = part.split("}");
                    return (
                      <React.Fragment key={index}>
                        <span className="bg-blue-100 px-1 rounded">
                          {"{" + variable + "}"}
                        </span>
                        {rest}
                      </React.Fragment>
                    );
                  })}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(generatedPrompt)}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {generatedPrompt && (
          <Card>
            <CardHeader>
              <CardTitle className="text-[#FF6B2C] flex items-center">
                <WandSparkles className="mr-2 h-5 w-5" />
                Code Snippets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="bash">cURL</TabsTrigger>
                </TabsList>
                <TabsContent value="javascript">
                  <CustomCodeEditor
                    value={codeSnippets.javascript}
                    language="javascript"
                    placeholder="Please enter JS code."
                  />
                </TabsContent>
                <TabsContent value="python">
                  <CustomCodeEditor
                    value={codeSnippets.python}
                    language="python"
                    placeholder="Please enter Python code."
                  />
                </TabsContent>
                <TabsContent value="bash">
                  <CustomCodeEditor
                    value={codeSnippets.bash}
                    language="bash"
                    placeholder="Please enter cURL command."
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() =>
                  handleCopy(
                    codeSnippets[activeTab as keyof typeof codeSnippets]
                  )
                }
                className="bg-[#FF6B2C] hover:bg-[#E55A1B] text-white"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
}
