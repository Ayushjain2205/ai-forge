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
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import copy from "copy-to-clipboard";
import { Loader2, Copy, Check } from "lucide-react";

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
        <Card>
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
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !input}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Prompt"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedPrompt && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Generated Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-muted px-1 py-0.5 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {generatedPrompt.replace(/\{([^}]+)\}/g, "`{$1}`")}
                </ReactMarkdown>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-0 right-0"
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
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Code Snippets</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
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
            <CardFooter>
              <Button
                onClick={() =>
                  handleCopy(
                    codeSnippets[activeTab as keyof typeof codeSnippets]
                  )
                }
              >
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
}
