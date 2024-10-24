import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, History, Plus, Save, Undo } from "lucide-react";

// Dummy data structure for prompt collections
const dummyPromptCollections = [
  {
    id: 1,
    name: "Story Generator",
    variations: [
      {
        name: "main",
        versions: [
          {
            id: 1,
            note: "Initial version",
            prompt: "Write a short story about {character} in {setting}",
            output: "Once upon a time, in a bustling city...",
          },
          {
            id: 2,
            note: "Improved character description",
            prompt:
              "Create a vivid tale featuring {character} with {trait} embarking on an adventure in {setting}",
            output:
              "In the heart of a vibrant metropolis, a determined young woman...",
          },
        ],
      },
      {
        name: "experimental",
        versions: [
          {
            id: 1,
            note: "Initial version",
            prompt: "Write a short story about {character} in {setting}",
            output: "Once upon a time, in a bustling city...",
          },
          {
            id: 3,
            note: "Added genre parameter",
            prompt: "Write a {genre} story about {character} in {setting}",
            output: "The neon-lit streets of Neo Tokyo buzzed with...",
          },
        ],
      },
    ],
  },
  // ... other prompt collections
];

export default function PromptBuilder() {
  const [selectedCollection, setSelectedCollection] = useState(
    dummyPromptCollections[0]
  );
  const [selectedVariation, setSelectedVariation] = useState(
    selectedCollection.variations[0]
  );
  const [selectedVersion, setSelectedVersion] = useState(
    selectedVariation.versions[selectedVariation.versions.length - 1]
  );

  const handleCollectionSelect = (collection) => {
    setSelectedCollection(collection);
    setSelectedVariation(collection.variations[0]);
    setSelectedVersion(
      collection.variations[0].versions[
        collection.variations[0].versions.length - 1
      ]
    );
  };

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
    setSelectedVersion(variation.versions[variation.versions.length - 1]);
  };

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-gray-50">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Prompt Collections</h2>
            <Button className="w-full mb-4">
              <Plus className="mr-2 h-4 w-4" /> New Collection
            </Button>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {dummyPromptCollections.map((collection) => (
                <div
                  key={collection.id}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedCollection.id === collection.id ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleCollectionSelect(collection)}
                >
                  <div className="flex items-center">
                    <ChevronRight className="mr-2 h-4 w-4" />
                    <span>{collection.name}</span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-[#FF6B2C]">
              {selectedCollection.name}
            </h1>
            <div className="flex mt-4 space-x-4">
              <Select
                value={selectedVariation.name}
                onValueChange={(value) =>
                  handleVariationSelect(
                    selectedCollection.variations.find((v) => v.name === value)
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select variation" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCollection.variations.map((variation) => (
                    <SelectItem key={variation.name} value={variation.name}>
                      {variation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> New Variation
              </Button>
              <Button variant="outline">
                <Undo className="mr-2 h-4 w-4" /> Rollback
              </Button>
            </div>
          </div>
          <div className="flex-1 flex">
            <div className="w-1/2 p-4 border-r border-gray-200">
              <Tabs defaultValue="edit" className="w-full">
                <TabsList>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight">
                        Prompt Editor
                      </CardTitle>
                      <CardDescription>
                        Edit your prompt and save a new version
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={selectedVersion.prompt}
                        onChange={() => {}}
                        className="min-h-[200px] mb-4"
                      />
                      <Input placeholder="Version note" className="mb-4" />
                      <Button className="w-full">
                        <Save className="mr-2 h-4 w-4" /> Save New Version
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight">
                        Version History
                      </CardTitle>
                      <CardDescription>
                        View and select previous versions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        {selectedVariation.versions
                          .slice()
                          .reverse()
                          .map((version) => (
                            <div
                              key={version.id}
                              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                selectedVersion.id === version.id
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                              onClick={() => handleVersionSelect(version)}
                            >
                              <div className="flex items-center mb-2">
                                <History className="mr-2 h-4 w-4" />
                                <span className="font-medium">
                                  Version {version.id}: {version.note}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-1">
                                Prompt: {version.prompt}
                              </div>
                              <div className="text-sm text-gray-600">
                                Output: {version.output.substring(0, 50)}...
                              </div>
                            </div>
                          ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="w-1/2 p-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight">
                    Output
                  </CardTitle>
                  <CardDescription>
                    View the generated output for this prompt version
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={selectedVersion.output}
                    readOnly
                    className="min-h-[200px]"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
