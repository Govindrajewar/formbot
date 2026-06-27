const DRAFT_KEY = "formBotWorkspaceDraft";

export function saveWorkspaceDraft(draft) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function loadWorkspaceDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearWorkspaceDraft() {
  localStorage.removeItem(DRAFT_KEY);
}
