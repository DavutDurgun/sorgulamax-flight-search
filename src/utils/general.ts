import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isValid, parseISO, type Locale } from "date-fns";
import { tr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// debounce (simple browser-safe)
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 350
) {
  let timer = 0;
  return (...args: Parameters<T>) => {
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay) as unknown as number;
  };
}

// misc
export function getLocationDisplayName(loc: { code: string; name: string }) {
  return `${loc.name} (${loc.code})`;
}

export function getTodayString() {
  return format(new Date(), "yyyy-MM-dd");
}

export function getTomorrowString() {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return format(t, "yyyy-MM-dd");
}

// date helpers (light)
export function formatDate(dateString: string, formatStr = "dd.MM.yyyy") {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return dateString;
    return format(date, formatStr, { locale: tr });
  } catch {
    return dateString;
  }
}
