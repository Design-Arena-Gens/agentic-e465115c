"use client";

export function TagFilter({
  allTags,
  selected,
  onChange,
}: {
  allTags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
}) {
  function toggle(tag: string) {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  }

  if (!allTags.length) {
    return (
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold">Tags</h3>
        <p className="text-gray-600 text-sm mt-1">No tags yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tags</h3>
        {selected.length > 0 && (
          <button className="text-sm text-primary-700 hover:underline" onClick={() => onChange([])}>
            Clear
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const active = selected.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={
                "rounded-full border px-3 py-1 text-sm " +
                (active
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "hover:bg-gray-50")
              }
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
