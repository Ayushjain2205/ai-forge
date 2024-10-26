import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NodeWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <Card className="w-[250px]">
    <CardHeader className="py-3">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="py-2">{children}</CardContent>
  </Card>
);

export const TextGenerationNode = ({ data }: { data: any }) => {
  const [prompt, setPrompt] = useState(data.prompt || "");

  return (
    <NodeWrapper title="Text Generation">
      <Handle type="target" position={Position.Top} />
      <div className="space-y-2">
        <Label htmlFor="text-prompt">Prompt</Label>
        <Input
          id="text-prompt"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            data.onChange({ prompt: e.target.value });
          }}
          placeholder="Enter your prompt here..."
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  );
};

export const ImageGenerationNode = ({ data }: { data: any }) => {
  const [prompt, setPrompt] = useState(data.prompt || "");
  const [style, setStyle] = useState(data.style || "");

  return (
    <NodeWrapper title="Image Generation">
      <Handle type="target" position={Position.Top} />
      <div className="space-y-2">
        <Label htmlFor="image-prompt">Prompt</Label>
        <Input
          id="image-prompt"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            data.onChange({ prompt: e.target.value, style });
          }}
          placeholder="Describe the image..."
        />
        <Label htmlFor="image-style">Style</Label>
        <Input
          id="image-style"
          value={style}
          onChange={(e) => {
            setStyle(e.target.value);
            data.onChange({ prompt, style: e.target.value });
          }}
          placeholder="e.g., photorealistic, cartoon, etc."
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  );
};

export const VideoGenerationNode = ({ data }: { data: any }) => {
  const [prompt, setPrompt] = useState(data.prompt || "");
  const [duration, setDuration] = useState(data.duration || "");

  return (
    <NodeWrapper title="Video Generation">
      <Handle type="target" position={Position.Top} />
      <div className="space-y-2">
        <Label htmlFor="video-prompt">Prompt</Label>
        <Input
          id="video-prompt"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            data.onChange({ prompt: e.target.value, duration });
          }}
          placeholder="Describe the video..."
        />
        <Label htmlFor="video-duration">Duration (seconds)</Label>
        <Input
          id="video-duration"
          type="number"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
            data.onChange({ prompt, duration: e.target.value });
          }}
          placeholder="Enter duration in seconds"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  );
};
