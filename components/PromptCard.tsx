"use client";

import { Prompt } from "@/lib/prompts";

export function PromptCard({
  prompt,
  onDelete,
}: {
  prompt: Prompt;
  onDelete?: () => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 flex flex-col gap-3">
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-semibold text-lg leading-tight">{prompt.title}</h3>
        <div className="flex gap-2">
          <button
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={() => navigator.clipboard.writeText(prompt.prompt)}
            title="Copy prompt"
          >
            Copy
          </button>
          {onDelete && (
            <button
              className="text-sm text-red-600 hover:text-red-700"
              onClick={onDelete}
              title="Delete prompt"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-6">{prompt.prompt}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {prompt.tags.map((t) => (
          <span key={t} className="rounded-full border px-2 py-0.5 text-xs text-gray-700">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
