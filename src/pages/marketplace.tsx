import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Sparkles,
  FileText,
  GitBranch,
  Star,
  Download,
} from "lucide-react";

type Item = {
  id: string;
  title: string;
  description: string;
  author: string;
  category: "prompt" | "template" | "pipeline";
  rating: number;
  downloads: number;
};

const items: Item[] = [
  {
    id: "1",
    title: "Creative Writing Prompt",
    description: "A versatile prompt for creative writing exercises",
    author: "Alice",
    category: "prompt",
    rating: 4.5,
    downloads: 1200,
  },
  {
    id: "2",
    title: "SEO Content Template",
    description: "Template for creating SEO-optimized blog posts",
    author: "Bob",
    category: "template",
    rating: 4.2,
    downloads: 980,
  },
  {
    id: "3",
    title: "Image to Video Pipeline",
    description: "Convert still images into short video clips",
    author: "Charlie",
    category: "pipeline",
    rating: 4.8,
    downloads: 1500,
  },
  {
    id: "4",
    title: "Product Description Generator",
    description: "AI-powered product description creator",
    author: "David",
    category: "prompt",
    rating: 4.3,
    downloads: 850,
  },
  {
    id: "5",
    title: "Social Media Content Calendar",
    description: "Template for planning social media content",
    author: "Eve",
    category: "template",
    rating: 4.6,
    downloads: 1100,
  },
  {
    id: "6",
    title: "Text to Speech Pipeline",
    description: "Convert written content into natural-sounding speech",
    author: "Frank",
    category: "pipeline",
    rating: 4.7,
    downloads: 1300,
  },
];

const categoryStyles = {
  prompt: "border-orange-200",
  template: "border-green-200",
  pipeline: "border-blue-200",
};

const categoryIcons = {
  prompt: Sparkles,
  template: FileText,
  pipeline: GitBranch,
};

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = items.filter(
    (item) =>
      (activeCategory === "all" || item.category === activeCategory) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">AI Forge Marketplace</h1>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search marketplace..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
              All
            </TabsTrigger>
            <TabsTrigger
              value="prompts"
              onClick={() => setActiveCategory("prompt")}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Prompts
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              onClick={() => setActiveCategory("template")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="pipelines"
              onClick={() => setActiveCategory("pipeline")}
            >
              <GitBranch className="mr-2 h-4 w-4" />
              Pipelines
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const CategoryIcon = categoryIcons[item.category];
            return (
              <Card
                key={item.id}
                className={`overflow-hidden border-l-4 ${
                  categoryStyles[item.category]
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{item.title}</span>
                    <CategoryIcon className="h-5 w-5" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-400">By {item.author}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm">{item.downloads}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Get
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
