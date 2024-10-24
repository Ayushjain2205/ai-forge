import { useState, useCallback, useMemo } from "react";
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
import { Separator } from "@/components/ui/separator";
import { ChevronRight, History, Plus, Save, Undo } from "lucide-react";
import { promptCollections } from "@/data/promptData";

export default function PromptBuilder() {
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    promptCollections[0].id.toString()
  );
  const [selectedVariationName, setSelectedVariationName] = useState(
    promptCollections[0].variations[0].name
  );
  const [selectedVersionId, setSelectedVersionId] = useState(
    promptCollections[0].variations[0].versions[0].id
  );

  const selectedCollection = useMemo(
    () =>
      promptCollections.find((c) => c.id.toString() === selectedCollectionId),
    [selectedCollectionId]
  );
  const selectedVariation = useMemo(
    () =>
      selectedCollection?.variations.find(
        (v) => v.name === selectedVariationName
      ),
    [selectedCollection, selectedVariationName]
  );
  const selectedVersion = useMemo(
    () => selectedVariation?.versions.find((v) => v.id === selectedVersionId),
    [selectedVariation, selectedVersionId]
  );

  const handleCollectionSelect = useCallback((collectionId: string) => {
    setSelectedCollectionId(collectionId);
    const newCollection = promptCollections.find(
      (c) => c.id.toString() === collectionId
    );
    if (newCollection) {
      setSelectedVariationName(newCollection.variations[0].name);
      setSelectedVersionId(newCollection.variations[0].versions[0].id);
    }
  }, []);

  const handleVariationSelect = useCallback(
    (variationName: string) => {
      setSelectedVariationName(variationName);
      const newVariation = selectedCollection?.variations.find(
        (v) => v.name === variationName
      );
      if (newVariation) {
        setSelectedVersionId(newVariation.versions[0].id);
      }
    },
    [selectedCollection]
  );

  if (!selectedCollection || !selectedVariation || !selectedVersion) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Top Bar */}
        <div className="p-4 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select
              value={selectedCollectionId}
              onValueChange={handleCollectionSelect}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select collection">
                  {selectedCollection ? (
                    <span className="flex items-center">
                      <span className="mr-2">{selectedCollection.icon}</span>
                      {selectedCollection.name}
                    </span>
                  ) : (
                    "Select collection"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {promptCollections.map((collection) => (
                  <SelectItem
                    key={collection.id}
                    value={collection.id.toString()}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{collection.icon}</span>
                      {collection.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedVariationName}
              onValueChange={handleVariationSelect}
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
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
            >
              <Plus className="mr-2 h-4 w-4" /> New Collection
            </Button>
            <Button
              variant="outline"
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> New Variation
            </Button>
            <Button
              variant="outline"
              className="bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700"
            >
              <Undo className="mr-2 h-4 w-4" /> Rollback
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden bg-gray-50">
          {/* Version History */}
          <div className="w-1/4 p-4 border-r border-gray-200 bg-white overflow-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Version History
            </h2>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {selectedVariation.versions
                .slice()
                .reverse()
                .map((version) => (
                  <div
                    key={version.id}
                    className={`p-3 mb-2 cursor-pointer rounded-lg transition-all duration-200 ${
                      selectedVersion.id === version.id
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "hover:bg-gray-100 border-l-4 border-transparent"
                    }`}
                    onClick={() => setSelectedVersionId(version.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">
                        V{version.id}
                      </span>
                      <span className="text-xs text-gray-500">
                        {version.date}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 truncate mt-1">
                      {version.note}
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </div>
          {/* Prompt and Output */}
          <div className="flex-1 p-4 overflow-auto">
            <Card className="mb-4 shadow-md">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Prompt (Version {selectedVersion.id})
                </CardTitle>
                <CardDescription>{selectedVersion.note}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Input Prompt:
                  </h3>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {selectedVersion.prompt}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Date:</span>{" "}
                    {selectedVersion.date}
                  </div>
                  <div>
                    <span className="font-medium">Prompt Tokens:</span>{" "}
                    {selectedVersion.promptTokens}
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between">
                  <Input placeholder="Version note" className="w-2/3 mr-2" />
                  <Button className="w-1/3 bg-[#FF6B2C] hover:bg-[#E55A1B] text-white">
                    <Save className="mr-2 h-4 w-4" /> Save New Version
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-[#FF6B2C] text-lg font-semibold tracking-tight flex items-center">
                  <ChevronRight className="mr-2 h-5 w-5" />
                  Output
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
                  {selectedVersion.output.type === "text" && (
                    <p className="text-gray-800 whitespace-pre-wrap">
                      {selectedVersion.output.content}
                    </p>
                  )}
                  {selectedVersion.output.type === "image" && (
                    <img
                      src={selectedVersion.output.content}
                      alt="Generated image"
                      className="max-w-full h-auto rounded-md"
                    />
                  )}
                  {selectedVersion.output.type === "video" && (
                    <video controls className="w-full rounded-md">
                      <source
                        src={selectedVersion.output.content}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Output Type:</span>{" "}
                    {selectedVersion.output.type}
                  </div>
                  <div>
                    <span className="font-medium">Output Tokens:</span>{" "}
                    {selectedVersion.outputTokens}
                  </div>
                  <div>
                    <span className="font-medium">Total Tokens:</span>{" "}
                    {selectedVersion.promptTokens +
                      selectedVersion.outputTokens}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
