export type OutputType =
  | "text"
  | "image"
  | "code"
  | "json"
  | "video"
  | "audio"
  | "markdown";

export type PromptVersion = {
  id: number;
  note: string;
  prompt: string;
  output: {
    type: OutputType;
    content: string;
  };
  date: string;
  promptTokens: number;
  outputTokens: number;
  metadata?: {
    temperature?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    maxTokens?: number;
  };
  tags?: string[];
};

export type PromptVariation = {
  name: string;
  description?: string;
  versions: PromptVersion[];
};

export type PromptCollection = {
  id: number;
  name: string;
  icon: string;
  model: string;
  description: string;
  createdDate: string;
  lastModified: string;
  author: string;
  variations: PromptVariation[];
  tags: string[];
  isPublic: boolean;
  forkCount: number;
  starCount: number;
};

export const promptCollections: PromptCollection[] = [
  {
    id: 1,
    name: "Advanced Code Generator",
    icon: "⚡",
    model: "GPT-4-Turbo",
    description:
      "Enterprise-grade code generation system with type safety and documentation",
    createdDate: "2024-08-01",
    lastModified: "2024-10-08",
    author: "TechLead",
    tags: ["development", "automation", "typescript"],
    isPublic: true,
    forkCount: 234,
    starCount: 1892,
    variations: [
      {
        name: "main",
        description: "Production-ready code generation",
        versions: [
          {
            id: 1,
            note: "Initial TypeScript implementation",
            prompt:
              "Generate a {language} {componentType} that implements {interface} with {features}. Include proper error handling, logging, and unit tests. Follow {company} coding standards and use {framework} best practices.",
            output: {
              type: "code",
              content:
                "export class UserService implements IUserService {\n  private logger: Logger;\n  // ... implementation\n}",
            },
            date: "2024-08-01",
            promptTokens: 45,
            outputTokens: 250,
            metadata: {
              temperature: 0.3,
              topP: 0.9,
              frequencyPenalty: 0.2,
            },
            tags: ["typescript", "clean-code"],
          },
          {
            id: 2,
            note: "Added documentation generation",
            prompt:
              "Generate a {language} {componentType} that implements {interface} with {features}. Include proper error handling, logging, unit tests, and comprehensive documentation following {docStandard}. Implement monitoring hooks for {observabilityPlatform}.",
            output: {
              type: "code",
              content:
                "/**\n * @package UserService\n * @implements IUserService\n */\nexport class UserService implements IUserService {\n  // ... enhanced implementation\n}",
            },
            date: "2024-09-15",
            promptTokens: 60,
            outputTokens: 350,
            metadata: {
              temperature: 0.2,
              topP: 0.95,
            },
            tags: ["documentation", "observability"],
          },
        ],
      },
      {
        name: "experimental",
        description: "Testing new patterns and features",
        versions: [
          {
            id: 1,
            note: "Microservices architecture",
            prompt:
              "Generate a microservice scaffold in {language} with {features} implementing {pattern}. Include service discovery, circuit breakers, and deployment manifests for {platform}.",
            output: {
              type: "code",
              content:
                "// Microservice implementation with kubernetes manifests",
            },
            date: "2024-10-01",
            promptTokens: 55,
            outputTokens: 400,
            tags: ["microservices", "kubernetes"],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Data Pipeline Builder",
    icon: "🔄",
    model: "GPT-4-Turbo",
    description:
      "Enterprise data pipeline generation with validation and monitoring",
    createdDate: "2024-08-15",
    lastModified: "2024-10-07",
    author: "DataArchitect",
    tags: ["data-engineering", "etl", "analytics"],
    isPublic: true,
    forkCount: 167,
    starCount: 1243,
    variations: [
      {
        name: "main",
        description: "Production data pipelines",
        versions: [
          {
            id: 1,
            note: "Data validation framework",
            prompt:
              "Create a data pipeline that processes {dataType} from {source}, applies {transformations}, validates using {schema}, and loads to {destination}. Include error handling, retry logic, and data quality checks.",
            output: {
              type: "code",
              content:
                "from airflow import DAG\nfrom operators import *\n# Pipeline implementation",
            },
            date: "2024-08-15",
            promptTokens: 50,
            outputTokens: 300,
            metadata: {
              temperature: 0.4,
              maxTokens: 1000,
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "System Design Document Generator",
    icon: "📐",
    model: "GPT-4-Turbo",
    description:
      "Automated generation of system design documents and architecture diagrams",
    createdDate: "2024-09-01",
    lastModified: "2024-10-05",
    author: "SystemArchitect",
    tags: ["architecture", "documentation", "diagrams"],
    isPublic: true,
    forkCount: 89,
    starCount: 567,
    variations: [
      {
        name: "main",
        description: "Enterprise architecture documentation",
        versions: [
          {
            id: 1,
            note: "Architecture Decision Records",
            prompt:
              "Generate an Architecture Decision Record (ADR) for implementing {feature} using {technology}. Include context, decision drivers, considered alternatives, consequences, and compliance with {standards}.",
            output: {
              type: "markdown",
              content:
                "# ADR-001: Implementation of Payment Gateway\n\n## Context\n\n## Decision\n\n## Consequences",
            },
            date: "2024-09-01",
            promptTokens: 40,
            outputTokens: 200,
            tags: ["adr", "documentation"],
          },
          {
            id: 2,
            note: "Added sequence diagrams",
            prompt:
              "Create a detailed system design document for {system} including sequence diagrams for {workflows}, component diagrams showing {components}, and deployment architecture for {environment}. Include security considerations and scaling strategy.",
            output: {
              type: "markdown",
              content:
                "# System Design: Payment Processing Service\n\n```mermaid\nsequenceDiagram\n  participant User\n  participant PaymentService\n```",
            },
            date: "2024-10-05",
            promptTokens: 55,
            outputTokens: 400,
            tags: ["diagrams", "architecture"],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "API Documentation Generator",
    icon: "📚",
    model: "GPT-4-Turbo",
    description: "OpenAPI specification and documentation generator",
    createdDate: "2024-09-15",
    lastModified: "2024-10-08",
    author: "APIDesigner",
    tags: ["api", "documentation", "openapi"],
    isPublic: true,
    forkCount: 156,
    starCount: 892,
    variations: [
      {
        name: "main",
        description: "OpenAPI specification generation",
        versions: [
          {
            id: 1,
            note: "RESTful API documentation",
            prompt:
              "Generate OpenAPI 3.0 specification for a {serviceName} API with {endpoints}. Include authentication using {authMethod}, rate limiting details, and example responses for {scenarios}. Follow {standards} API design guidelines.",
            output: {
              type: "json",
              content:
                '{\n  "openapi": "3.0.0",\n  "info": {\n    "title": "Payment API",\n    "version": "1.0.0"\n  }\n}',
            },
            date: "2024-09-15",
            promptTokens: 45,
            outputTokens: 250,
            metadata: {
              temperature: 0.2,
            },
          },
        ],
      },
    ],
  },
];
