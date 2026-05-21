/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // JHM Flow brand palette
        ink: {
          DEFAULT: "#0B1220",
          50: "#F6F7F9",
          100: "#EAECF0",
          200: "#D0D5DD",
          300: "#98A2B3",
          400: "#667085",
          500: "#475467",
          600: "#344054",
          700: "#1D2939",
          800: "#101828",
          900: "#0B1220",
        },
        flame: {
          DEFAULT: "#F97316",
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        sage: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 4px 12px rgba(16,24,40,0.06)",
        pop: "0 8px 30px rgba(16,24,40,0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(16,24,40,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,24,40,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
