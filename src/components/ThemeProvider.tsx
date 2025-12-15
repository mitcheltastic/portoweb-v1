"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// ⬇️ FIX: Extract the props directly from the component itself
// This works for ANY version of next-themes.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}