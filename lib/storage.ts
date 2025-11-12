import { Prompt } from "./prompts";

const KEY = "chatptatlas:user-prompts:v1";

export function loadUserPrompts(): Prompt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Prompt[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean);
  } catch {
    return [];
  }
}

export function saveUserPrompts(prompts: Prompt[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(prompts));
  } catch {
    // ignore write errors
  }
}
