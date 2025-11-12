"use client";

import { useEffect, useMemo, useState } from "react";
import { allPrompts, Prompt } from "@/lib/prompts";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { TagFilter } from "@/components/TagFilter";
import { PromptCard } from "@/components/PromptCard";
import { loadUserPrompts, saveUserPrompts } from "@/lib/storage";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setUserPrompts(loadUserPrompts());
  }, []);

  useEffect(() => {
    saveUserPrompts(userPrompts);
  }, [userPrompts]);

  const all = useMemo(() => {
    const tags = new Set<string>();
    [...allPrompts, ...userPrompts].forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return {
      prompts: [...allPrompts, ...userPrompts],
      tags: Array.from(tags).sort((a, b) => a.localeCompare(b)),
    };
  }, [userPrompts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.prompts.filter((p) => {
      const matchesText = q
        ? p.title.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q)
        : true;
      const matchesTags = selectedTags.length
        ? selectedTags.every((t) => p.tags.includes(t))
        : true;
      return matchesText && matchesTags;
    });
  }, [all.prompts, query, selectedTags]);

  function handleAdd(prompt: Prompt) {
    setUserPrompts((prev) => [prompt, ...prev]);
    setShowForm(false);
  }

  function handleDelete(id: string) {
    setUserPrompts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main className="container py-8">
      <Header onAddClick={() => setShowForm(true)} />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 order-2 md:order-1">
          <SearchBar value={query} onChange={setQuery} count={filtered.length} />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <PromptCard
                key={p.id}
                prompt={p}
                onDelete={p.id.startsWith("user-") ? () => handleDelete(p.id) : undefined}
              />
            ))}
          </div>
        </div>

        <aside className="order-1 md:order-2">
          <TagFilter
            allTags={all.tags}
            selected={selectedTags}
            onChange={setSelectedTags}
          />

          {showForm && (
            <AddPromptForm onCancel={() => setShowForm(false)} onSave={handleAdd} />)
          }
        </aside>
      </div>
    </main>
  );
}

function AddPromptForm({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (p: Prompt) => void;
}) {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [tags, setTags] = useState<string>("");

  function submit() {
    if (!title.trim() || !prompt.trim()) return;
    const now = new Date().toISOString();
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const p: Prompt = {
      id: `user-${crypto.randomUUID()}`,
      title: title.trim(),
      prompt: prompt.trim(),
      tags: tagList,
      createdAt: now,
    };

    onSave(p);
    setTitle("");
    setPrompt("");
    setTags("");
  }

  return (
    <div className="mt-6 rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold">Add Prompt</h3>
      <div className="mt-3 space-y-3">
        <input
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Prompt text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <input
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
            onClick={submit}
          >
            Save
          </button>
          <button
            className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
