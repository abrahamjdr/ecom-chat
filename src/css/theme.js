import { Preferences } from "@capacitor/preferences";

const KEY_THEME = "theme_preference"; // 'system' | 'light' | 'dark'
const KEY_ACCENT = "accent_choice"; // mint | emerald | teal | lime | forest

const PALETTES = {
  mint: { accent: "#34d399", a600: "#10b981", a700: "#059669" },
  emerald: { accent: "#10b981", a600: "#059669", a700: "#047857" }, // default
  teal: { accent: "#14b8a6", a600: "#0d9488", a700: "#0f766e" },
  lime: { accent: "#84cc16", a600: "#65a30d", a700: "#4d7c0f" },
  forest: { accent: "#047857", a600: "#065f46", a700: "#064e3b" },
};

export async function initTheme() {
  const { value: savedTheme } = await Preferences.get({ key: KEY_THEME });
  applyTheme(savedTheme || "system");

  const { value: savedAccent } = await Preferences.get({ key: KEY_ACCENT });
  applyAccent(savedAccent || "emerald");

  if ((savedTheme || "system") === "system") {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.onchange = () => applyTheme("system");
  }
}

export async function setTheme(mode) {
  await Preferences.set({ key: KEY_THEME, value: mode });
  applyTheme(mode);
}

export async function setAccentChoice(name) {
  await Preferences.set({ key: KEY_ACCENT, value: name });
  applyAccent(name);
}

function applyTheme(mode) {
  const dark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("theme-light", !dark);
}

function applyAccent(name) {
  const p = PALETTES[name] || PALETTES.emerald;
  const root = document.documentElement.style;
  root.setProperty("--accent", p.accent);
  root.setProperty("--accent-600", p.a600);
  root.setProperty("--accent-700", p.a700);
}
