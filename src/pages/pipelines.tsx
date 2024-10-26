import { useCallback, useRef, useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  NodeTypes,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Type, Image, Video } from "lucide-react";
import {
  TextGenerationNode,
  ImageGenerationNode,
  VideoGenerationNode,
} from "@/components/CustomNodes";

const nodeTypes: NodeTypes = {
  textGeneration: TextGenerationNode,
  imageGeneration: ImageGenerationNode,
  videoGeneration: VideoGenerationNode,
};

const initialNodes: Node[] = [];

const NODE_WIDTH = 200;
const NODE_HEIGHT = 150;
const HORIZONTAL_SPACING = 20;
const VERTICAL_SPACING = 20;

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project, fitView } = useReactFlow();
  const [maxNodesPerRow, setMaxNodesPerRow] = useState(1);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const updateMaxNodesPerRow = useCallback(() => {
    if (reactFlowWrapper.current) {
      const wrapperWidth = reactFlowWrapper.current.offsetWidth;
      const maxNodes = Math.floor(
        wrapperWidth / (NODE_WIDTH + HORIZONTAL_SPACING)
      );
      setMaxNodesPerRow(Math.max(1, maxNodes));
    }
  }, []);

  useEffect(() => {
    updateMaxNodesPerRow();
    window.addEventListener("resize", updateMaxNodesPerRow);
    return () => window.removeEventListener("resize", updateMaxNodesPerRow);
  }, [updateMaxNodesPerRow]);

  const addNode = (type: string) => {
    if (!reactFlowWrapper.current) return;

    const nodeCount = nodes.length;
    const row = Math.floor(nodeCount / maxNodesPerRow);
    const col = nodeCount % maxNodesPerRow;

    const xPos = col * (NODE_WIDTH + HORIZONTAL_SPACING);
    const yPos = row * (NODE_HEIGHT + VERTICAL_SPACING);

    const newNode: Node = {
      id: (nodeCount + 1).toString(),
      type: type,
      position: { x: xPos, y: yPos },
      data: {
        label: type,
        onChange: (newData: any) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === newNode.id) {
                node.data = { ...node.data, ...newData };
              }
              return node;
            })
          );
        },
      },
      style: { width: NODE_WIDTH, height: NODE_HEIGHT },
    };
    setNodes((nds) => nds.concat(newNode));

    if (nodeCount > 0) {
      const newEdge: Edge = {
        id: `e${nodeCount}-${nodeCount + 1}`,
        source: nodes[nodeCount - 1].id,
        target: newNode.id,
      };
      setEdges((eds) => eds.concat(newEdge));
    }

    setTimeout(() => fitView({ padding: 0.2 }), 0);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex space-x-2 mb-4">
        <Button
          onClick={() => addNode("textGeneration")}
          className="bg-[#FF6B2C] hover:bg-[#E55A1B] text-white"
        >
          <Type className="mr-2 h-4 w-4" />
          Add Text
        </Button>
        <Button
          onClick={() => addNode("imageGeneration")}
          className="bg-[#FF6B2C] hover:bg-[#E55A1B] text-white"
        >
          <Image className="mr-2 h-4 w-4" />
          Add Image
        </Button>
        <Button
          onClick={() => addNode("videoGeneration")}
          className="bg-[#FF6B2C] hover:bg-[#E55A1B] text-white"
        >
          <Video className="mr-2 h-4 w-4" />
          Add Video
        </Button>
      </div>
      <div ref={reactFlowWrapper} className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          minZoom={1}
          maxZoom={1}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={false}
          panOnDrag={false}
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function Pipelines() {
  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-4rem-64px)]">
        <h1 className="text-3xl font-bold mb-4">AI Prompt Pipelines</h1>
        <div className="flex-grow border border-gray-300 rounded-md overflow-hidden">
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        </div>
      </div>
    </Layout>
  );
}
