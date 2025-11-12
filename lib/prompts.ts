export type Prompt = {
  id: string;
  title: string;
  prompt: string;
  tags: string[];
  createdAt: string; // ISO date
};

export const allPrompts: Prompt[] = [
  {
    id: "seed-1",
    title: "Summarize a research paper",
    prompt:
      "You are an expert research assistant. Summarize the following paper in 5 bullet points, capturing contributions, methodology, and limitations:",
    tags: ["research", "summary", "academia"],
    createdAt: "2024-01-10T00:00:00.000Z",
  },
  {
    id: "seed-2",
    title: "Code review checklist",
    prompt:
      "Perform a thorough code review. Identify correctness issues, security risks, performance bottlenecks, readability problems, and missing tests. Provide concrete suggestions.",
    tags: ["code", "review", "engineering"],
    createdAt: "2024-02-02T00:00:00.000Z",
  },
  {
    id: "seed-3",
    title: "User interview insights",
    prompt:
      "Act as a UX researcher. Given raw interview notes, synthesize key insights, pain points, and opportunities. Propose 3-5 actionable product recommendations.",
    tags: ["ux", "product", "research"],
    createdAt: "2024-03-15T00:00:00.000Z",
  },
  {
    id: "seed-4",
    title: "Marketing copy A/B variants",
    prompt:
      "You are a senior copywriter. Generate 5 headline variants and 5 subhead variants for the following value proposition. Include tone options and target audiences.",
    tags: ["marketing", "copy", "content"],
    createdAt: "2024-05-09T00:00:00.000Z",
  },
];
