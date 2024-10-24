export const promptCollections = [
  {
    id: 1,
    name: "Story Generator",
    icon: "📚",
    model: "GPT-4",
    createdDate: "2023-05-01",
    lastModified: "2023-05-05",
    variations: [
      {
        name: "main",
        versions: [
          {
            id: 1,
            note: "Initial version",
            prompt: "Write a short story about {character} in {setting}",
            output: {
              type: "text",
              content: "Once upon a time, in a bustling city...",
            },
            date: "2023-05-01",
            promptTokens: 10,
            outputTokens: 50,
          },
          {
            id: 2,
            note: "Improved character description",
            prompt:
              "Create a vivid tale featuring {character} with {trait} embarking on an adventure in {setting}",
            output: {
              type: "text",
              content:
                "In the heart of a vibrant metropolis, a determined young woman...",
            },
            date: "2023-05-03",
            promptTokens: 15,
            outputTokens: 60,
          },
          {
            id: 3,
            note: "Added conflict element",
            prompt:
              "Write an engaging story about {character} with {trait} facing {conflict} in {setting}",
            output: {
              type: "text",
              content:
                "The sun was setting over the ancient ruins when Sarah, a brilliant archaeologist with an insatiable curiosity, stumbled upon a mysterious artifact...",
            },
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
            output: {
              type: "text",
              content: "Once upon a time, in a bustling city...",
            },
            date: "2023-05-02",
            promptTokens: 10,
            outputTokens: 50,
          },
          {
            id: 2,
            note: "Added genre parameter",
            prompt: "Write a {genre} story about {character} in {setting}",
            output: {
              type: "text",
              content: "The neon-lit streets of Neo Tokyo buzzed with...",
            },
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
    name: "Image Generator",
    icon: "🖼️",
    model: "DALL-E 2",
    createdDate: "2023-05-06",
    lastModified: "2023-05-06",
    variations: [
      {
        name: "main",
        versions: [
          {
            id: 1,
            note: "Initial version",
            prompt: "Generate an image of {subject} in {style} style",
            output: {
              type: "image",
              content: "/placeholder.svg?height=300&width=300",
            },
            date: "2023-05-06",
            promptTokens: 8,
            outputTokens: 0,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Video Creator",
    icon: "🎥",
    model: "Runway ML",
    createdDate: "2023-05-07",
    lastModified: "2023-05-07",
    variations: [
      {
        name: "main",
        versions: [
          {
            id: 1,
            note: "Initial version",
            prompt: "Create a short video of {subject} with {mood} atmosphere",
            output: {
              type: "video",
              content: "https://example.com/sample-video.mp4",
            },
            date: "2023-05-07",
            promptTokens: 9,
            outputTokens: 0,
          },
        ],
      },
    ],
  },
];
