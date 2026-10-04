import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Light / dark / system theme, persisted in localStorage and applied to <html>.
 * The inline script in index.html applies the same logic before first paint,
 * so the page never flashes the wrong theme while React boots.
 */

type Attribute = "class" | `data-${string}`;
type ColorScheme = "light" | "dark";

export interface ThemeProviderProps {
  children?: ReactNode;
  /** Theme names the provider can apply */
  themes?: string[];
  /** Theme used when nothing has been saved yet */
  defaultTheme?: string;
  /** Resolve the "system" theme from prefers-color-scheme */
  enableSystem?: boolean;
  /** Mirror the active theme into `color-scheme` on <html> (native controls, scrollbars) */
  enableColorScheme?: boolean;
  /** localStorage key that persists the user's choice */
  storageKey?: string;
  /** <html> attribute that receives the active theme */
  attribute?: Attribute;
}

interface ThemeContextValue {
  /** Selected theme — may be "system" */
  theme?: string;
  /** Theme actually applied ("light" / "dark" when following the system) */
  resolvedTheme?: string;
  /** Current OS preference */
  systemTheme?: ColorScheme;
  themes: string[];
  setTheme: (theme: string) => void;
}

const MEDIA = "(prefers-color-scheme: dark)";
const COLOR_SCHEMES = ["light", "dark"];
const DEFAULT_THEMES = ["light", "dark"];

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const fallbackContext: ThemeContextValue = { setTheme: () => {}, themes: [] };

export const useTheme = () => useContext(ThemeContext) ?? fallbackContext;

const getSystemTheme = (query: MediaQueryList | MediaQueryListEvent = window.matchMedia(MEDIA)): ColorScheme =>
  query.matches ? "dark" : "light";

function getSavedTheme(storageKey: string, fallback: string) {
  try {
    return localStorage.getItem(storageKey) || fallback;
  } catch {
    return fallback;
  }
}

export function ThemeProvider({
  children,
  themes = DEFAULT_THEMES,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  defaultTheme = enableSystem ? "system" : "light",
  attribute = "data-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState(() => getSavedTheme(storageKey, defaultTheme));
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme());

  const appliedTheme = theme === "system" && enableSystem ? systemTheme : theme;

  // Reflect the applied theme on <html>
  useEffect(() => {
    if (!appliedTheme) return;
    const root = document.documentElement;
    if (attribute === "class") {
      root.classList.remove(...themes);
      root.classList.add(appliedTheme);
    } else {
      root.setAttribute(attribute, appliedTheme);
    }
    if (enableColorScheme) {
      const fallback = COLOR_SCHEMES.includes(defaultTheme) ? defaultTheme : "";
      root.style.colorScheme = COLOR_SCHEMES.includes(appliedTheme) ? appliedTheme : fallback;
    }
  }, [appliedTheme, attribute, themes, enableColorScheme, defaultTheme]);

  // Follow OS preference changes
  useEffect(() => {
    const media = window.matchMedia(MEDIA);
    const onChange = (event: MediaQueryListEvent) => setSystemTheme(getSystemTheme(event));
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback(
    (value: string) => {
      setThemeState(value);
      try {
        localStorage.setItem(storageKey, value);
      } catch {
        // Storage unavailable (e.g. privacy mode) — the choice just won't persist
      }
    },
    [storageKey]
  );

  // Keep other open tabs in sync
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      if (event.newValue) setThemeState(event.newValue);
      else setTheme(defaultTheme);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey, defaultTheme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      resolvedTheme: theme === "system" ? systemTheme : theme,
      systemTheme: enableSystem ? systemTheme : undefined,
      themes: enableSystem ? [...themes, "system"] : themes,
    }),
    [theme, setTheme, systemTheme, enableSystem, themes]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
