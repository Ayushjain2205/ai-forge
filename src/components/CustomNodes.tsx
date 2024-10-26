import React from "react";
import { Handle, Position } from "reactflow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Type, Image, Video, Brain, Code, Globe } from "lucide-react";

const NodeWrapper = ({
  children,
  title,
  color,
  icon: Icon,
}: {
  children: React.ReactNode;
  title: string;
  color: string;
  icon: React.ElementType;
}) => (
  <Card className="w-[250px]" style={{ borderColor: color }}>
    <CardHeader
      className="py-3"
      style={{ backgroundColor: color, color: "white" }}
    >
      <CardTitle className="text-sm font-medium flex items-center">
        <Icon className="mr-2 h-4 w-4" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="py-2">{children}</CardContent>
  </Card>
);

const nodeTypes = {
  textGeneration: { title: "Text Generation", color: "#FF6B2C", icon: Type },
  imageGeneration: { title: "Image Generation", color: "#4CAF50", icon: Image },
  videoGeneration: { title: "Video Generation", color: "#2196F3", icon: Video },
  llmCall: { title: "LLM Call", color: "#9C27B0", icon: Brain },
  functionCall: { title: "Function Call", color: "#FF9800", icon: Code },
  apiCall: { title: "API Call", color: "#607D8B", icon: Globe },
};

const createNodeComponent = (type: keyof typeof nodeTypes) => {
  const { title, color, icon } = nodeTypes[type];

  return ({ data }: { data: any }) => {
    const [input, setInput] = React.useState(data.input || "");

    return (
      <NodeWrapper title={title} color={color} icon={icon}>
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
