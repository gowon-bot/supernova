import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
      },
    },
  },
  plugins: [],
};

export default config;
