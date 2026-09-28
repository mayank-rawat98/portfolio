import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hostOf(href?: string) {
  if (!href) return undefined;
  try {
    return new URL(href).host;
  } catch {
    return href;
  }
}
