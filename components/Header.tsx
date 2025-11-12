"use client";

export function Header({ onAddClick }: { onAddClick: () => void }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">ChatPT Atlas</h1>
        <p className="text-gray-600">Discover, search, and curate AI prompts.</p>
      </div>
      <div className="flex gap-2">
        <a
          href="https://agentic-e465115c.vercel.app"
          className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50"
        >
          Home
        </a>
        <button
          className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          onClick={onAddClick}
        >
          Add Prompt
        </button>
      </div>
    </header>
  );
}
