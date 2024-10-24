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
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  ChevronDown,
  ChevronRight,
  History,
  Plus,
  Save,
  Undo,
  Check,
} from "lucide-react";

// Dummy data structure for prompt collections
const dummyPromptCollections = [
  {
    id: 1,
    name: "Story Generator",
    icon: "📚",
    variations: [
      {
        name: "main",
        versions: [
          {
            id: 1,
            note: "Initial version",
            prompt: "Write a short story about {character} in {setting}",
            output: "Once upon a time, in a bustling city...",
            date: "2023-05-01",
            promptTokens: 10,
            outputTokens: 50,
          },
          {
            id: 2,
            note: "Improved character description",
            prompt:
              "Create a vivid tale featuring {character} with {trait} embarking on an adventure in {setting}",
            output:
              "In the heart of a vibrant metropolis, a determined young woman...",
            date: "2023-05-03",
            promptTokens: 15,
            outputTokens: 60,
          },
          {
            id: 3,
            note: "Added conflict element",
            prompt:
              "Write an engaging story about {character} with {trait} facing {conflict} in {setting}",
            output:
              "The sun was setting over the ancient ruins when Sarah, a brilliant archaeologist with an insatiable curiosity, stumbled upon a mysterious artifact...",
            date: "2023-05-05",
            promptTokens: 18,
            outputTokens: 70,
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
            date: "2023-05-02",
            promptTokens: 10,
            outputTokens: 50,
          },
          {
            id: 2,
            note: "Added genre parameter",
            prompt: "Write a {genre} story about {character} in {setting}",
            output: "The neon-lit streets of Neo Tokyo buzzed with...",
            date: "2023-05-04",
            promptTokens: 12,
            outputTokens: 55,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Code Explainer",
    icon: "💻",
    variations: [
      {
        name: "main",
        versions: [
          {
            id: 1,
            note: "Initial version",
            prompt: "Explain the following code: {code}",
            output: "This code is a function that...",
            date: "2023-05-06",
            promptTokens: 8,
            outputTokens: 40,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Data Analyzer",
    icon: "📊",
    variations: [
      {
        name: "main",
        versions: [
          {
            id: 1,
            note: "Initial version",
            prompt: "Analyze the following data: {data}",
            output: "Based on the provided data, we can observe...",
            date: "2023-05-07",
            promptTokens: 9,
            outputTokens: 45,
          },
        ],
      },
    ],
  },
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
  const [open, setOpen] = useState(false);

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
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Top Bar */}
        <div className="p-4 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[250px] justify-between"
                >
                  {selectedCollection.icon} {selectedCollection.name}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search collections..."
                    className="h-9"
                  />
                  <CommandEmpty>No collection found.</CommandEmpty>
                  <CommandGroup>
                    {dummyPromptCollections.map((collection) => (
                      <CommandItem
                        key={collection.id}
                        onSelect={() => {
                          handleCollectionSelect(collection);
                          setOpen(false);
                        }}
                        className="flex items-center"
                      >
                        <span className="mr-2">{collection.icon}</span>
                        {collection.name}
                        <Check
                          className={`ml-auto h-4 w-4 ${
                            selectedCollection.id === collection.id
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
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
                    onClick={() => handleVersionSelect(version)}
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
                <Textarea
                  value={selectedVersion.prompt}
                  onChange={() => {}}
                  className="min-h-[100px] mb-4 border-gray-300 focus:border-[#FF6B2C] focus:ring-[#FF6B2C]"
                />
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
                <Textarea
                  value={selectedVersion.output}
                  readOnly
                  className="min-h-[200px] mb-4 bg-gray-50 border-gray-300"
                />
                <div className="flex justify-between items-center text-sm text-gray-600">
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
