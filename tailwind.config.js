const withOpacity =
  (variable) =>
  ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`;
    }
    return `rgb(var(${variable}))`;
  };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "rgb(var(--color-brand-base-rgb))",
          light: "rgb(var(--color-brand-light-rgb))",
          dark: "rgb(var(--color-brand-dark-rgb))",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent-rgb))",
          foreground: "rgb(var(--color-text-primary-rgb))",
        },
        text: {
          primary: "rgb(var(--color-text-primary-rgb))",
          secondary: "rgb(var(--color-text-secondary-rgb))",
          muted: "rgb(var(--color-text-muted-rgb))",
        },
        surface: {
          base: "var(--color-surface)",
          muted: "var(--color-surface-muted)",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          subtle: "var(--color-border-subtle)",
          strong: "var(--color-border-strong)",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "page-gradient": "var(--gradient-page)",
        "hero-gradient": "var(--gradient-hero)",
        "section-spotlight": "var(--gradient-spotlight)",
        "device-gradient": "var(--gradient-device)",
        "button-gradient": "var(--gradient-button)",
      },
      boxShadow: {
        "theme-soft": "var(--shadow-soft)",
        "theme-strong": "var(--shadow-strong)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "aurora-float-1": {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1)",
            opacity: "0.4",
          },
          "33%": {
            transform: "translate(5%, -8%) scale(1.05)",
            opacity: "0.5",
          },
          "66%": {
            transform: "translate(-3%, 5%) scale(0.95)",
            opacity: "0.35",
          },
        },
        "aurora-float-2": {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1)",
            opacity: "0.35",
          },
          "25%": {
            transform: "translate(-8%, 5%) scale(1.1)",
            opacity: "0.45",
          },
          "50%": { transform: "translate(5%, -5%) scale(0.9)", opacity: "0.3" },
          "75%": {
            transform: "translate(-3%, -8%) scale(1.05)",
            opacity: "0.4",
          },
        },
        "aurora-float-3": {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1)",
            opacity: "0.3",
          },
          "40%": { transform: "translate(8%, 8%) scale(1.08)", opacity: "0.4" },
          "80%": {
            transform: "translate(-5%, -3%) scale(0.92)",
            opacity: "0.25",
          },
        },
      },
      animation: {
        "aurora-1": "aurora-float-1 20s ease-in-out infinite",
        "aurora-2": "aurora-float-2 25s ease-in-out infinite",
        "aurora-3": "aurora-float-3 22s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
