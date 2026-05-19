import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ─── Colors (mapped to CSS custom properties) ─── */
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          dark: "var(--accent-dark)",
        },
        neutral: {
          bg: "var(--neutral-bg)",
        },
        govt: {
          text: "var(--text-primary)",
          muted: "var(--text-muted)",
          border: "var(--border)",
          white: "var(--white)",
        },
        status: {
          success: "var(--success)",
          "success-light": "var(--success-light)",
          warning: "var(--warning)",
          "warning-light": "var(--warning-light)",
          error: "var(--error)",
          "error-light": "var(--error-light)",
        },
      },

      /* ─── Font Families ─── */
      fontFamily: {
        heading: ["var(--font-heading)", "Merriweather", "Georgia", "serif"],
        body: [
          "var(--font-body)",
          "'Source Sans 3'",
          "system-ui",
          "sans-serif",
        ],
      },

      /* ─── Font Sizes (matching design spec) ─── */
      fontSize: {
        "page-title": [
          "2.5rem",
          { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.01em" },
        ],
        "section-head": [
          "1.75rem",
          { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.01em" },
        ],
        "card-title": [
          "1.25rem",
          { lineHeight: "1.4", fontWeight: "600" },
        ],
        caption: [
          "0.875rem",
          { lineHeight: "1.5" },
        ],
      },

      /* ─── Spacing ─── */
      spacing: {
        "header": "var(--header-height)",
        "topbar": "var(--topbar-height)",
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      /* ─── Max Width ─── */
      maxWidth: {
        site: "var(--max-width)",
        content: "960px",
        narrow: "720px",
      },

      /* ─── Border Radius ─── */
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },

      /* ─── Box Shadow ─── */
      boxShadow: {
        "card": "var(--shadow-card)",
        "sm": "var(--shadow-sm)",
        "md": "var(--shadow-md)",
        "lg": "var(--shadow-lg)",
        "primary-glow": "0 4px 14px rgba(26, 58, 107, 0.2)",
        "accent-glow": "0 4px 14px rgba(201, 153, 26, 0.25)",
      },

      /* ─── Transition ─── */
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "350ms",
      },

      /* ─── Animation ─── */
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "count-up": "count-up 0.6s ease-out forwards",
        "ticker": "ticker-scroll 30s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      /* ─── Screens (Responsive Breakpoints) ─── */
      screens: {
        xs: "475px",
      },

      /* ─── Background Image (subtle hero overlay) ─── */
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgba(15, 35, 71, 0.75), rgba(26, 58, 107, 0.85))",
        "hero-gradient-light":
          "linear-gradient(to bottom, rgba(15, 35, 71, 0.5), rgba(26, 58, 107, 0.65))",
      },
    },
  },
  plugins: [],
};

export default config;
