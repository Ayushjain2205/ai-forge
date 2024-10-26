import React from "react";
import { Handle, Position } from "reactflow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Type, Image, Video, Brain, Code, Globe } from "lucide-react";

const NodeWrapper = ({
  children,
  title,
  bgColor,
  textColor,
  icon: Icon,
}: {
  children: React.ReactNode;
  title: string;
  bgColor: string;
  textColor: string;
  icon: React.ElementType;
}) => (
  <Card className="w-[250px] overflow-hidden">
    <CardHeader className={`py-2 px-3 ${bgColor}`}>
      <CardTitle
        className={`text-sm font-medium flex items-center ${textColor}`}
      >
        <Icon className="mr-2 h-4 w-4" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="py-2">{children}</CardContent>
  </Card>
);

const nodeTypes = {
  textGeneration: {
    title: "Text Generation",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    icon: Type,
  },
  imageGeneration: {
    title: "Image Generation",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    icon: Image,
  },
  videoGeneration: {
    title: "Video Generation",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    icon: Video,
  },
  llmCall: {
    title: "LLM Call",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    icon: Brain,
  },
  functionCall: {
    title: "Function Call",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    icon: Code,
  },
  apiCall: {
    title: "API Call",
    bgColor: "bg-gray-50",
    textColor: "text-gray-600",
    icon: Globe,
  },
};

const createNodeComponent = (type: keyof typeof nodeTypes) => {
  const { title, bgColor, textColor, icon } = nodeTypes[type];

  return ({ data }: { data: any }) => {
    const [input, setInput] = React.useState(data.input || "");

    return (
      <NodeWrapper
        title={title}
        bgColor={bgColor}
        textColor={textColor}
        icon={icon}
      >
        <Handle type="target" position={Position.Top} />
        <div className="space-y-2">
          <Label htmlFor={`${type}-input`}>Input</Label>
          <Input
            id={`${type}-input`}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              data.onChange({ input: e.target.value });
            }}
            placeholder={`Enter ${title.toLowerCase()} input...`}
          />
        </div>
        <Handle type="source" position={Position.Bottom} />
      </NodeWrapper>
    );
  };
};

export const TextGenerationNode = createNodeComponent("textGeneration");
export const ImageGenerationNode = createNodeComponent("imageGeneration");
export const VideoGenerationNode = createNodeComponent("videoGeneration");
export const LLMCallNode = createNodeComponent("llmCall");
export const FunctionCallNode = createNodeComponent("functionCall");
export const APICallNode = createNodeComponent("apiCall");
