"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Dictionary, type Locale } from "./translations";

const STORAGE_KEY = "papu-locale";
const DEFAULT_LOCALE: Locale = "ca";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "ca" || stored === "es") {
        // Se lee después del montaje a propósito: el servidor siempre renderiza
        // DEFAULT_LOCALE, así que hacerlo aquí (en vez de en un initializer de
        // useState) evita un mismatch de hidratación entre servidor y cliente.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLocaleState(stored);
      }
    } catch {
      // localStorage no disponible (modo privado, etc.): nos quedamos con el idioma por defecto.
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale() debe usarse dentro de <LocaleProvider>");
  }
  return ctx;
}
