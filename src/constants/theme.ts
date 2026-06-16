/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "../../global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#6c3fc5",
    primaryForeground: "#ffffff",
    background: "#f5f0ff",
    foreground: "#1a1040",
    card: "#ffffff",
    secondary: "#ede8ff",
    muted: "#7a6a9a",
    accent: "#f5c842",
    success: "#2bb87a",
    error: "#e05b8c",
    info: "#3b8cf5",
    gradientPrimary: ["#6c3fc5", "#FFF"],
    diosColor: "#f5c842",
    diosBg: "#fffbe6",
    bibliaColor: "#6c3fc5",
    bibliaBg: "#ede8ff",
    jesusColor: "#e05b8c",
    jesusBg: "#fde8f0",
    sacramentosColor: "#3b8cf5",
    sacramentosBg: "#e8f0ff",
    oracionColor: "#2bb87a",
    oracionBg: "#e6f9f0",
  },
  dark: {
    primary: "#9b6fe8",
    primaryForeground: "#ffffff",
    background: "#0f0a1e",
    foreground: "#e8e0ff",
    card: "#1c1335",
    secondary: "#2a1f4a",
    muted: "#a89bc2",
    accent: "#f5c842",
    success: "#2bb87a",
    error: "#e05b8c",
    info: "#5b9cf5",
    gradientPrimary: ["#4a2490", "#7b4fd4"],
    diosColor: "#f5c842",
    dioBg: "#2a2510",
    bibliaColor: "#9b6fe8",
    bibliaBg: "#1e1535",
    jesusColor: "#e05b8c",
    jesusBg: "#2a1525",
    sacramentosColor: "#5b9cf5",
    sacramentosBg: "#121c35",
    oracionColor: "#2bb87a",
    oracionBg: "#0f2820",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
