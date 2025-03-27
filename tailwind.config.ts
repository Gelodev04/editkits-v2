import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  //@ts-ignore
  safeList: [
    'text-[48px]',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-lato)', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        workSans: ['Work Sans', 'sans-serif'],
        alexandria: ['Alexandria', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      '2lg': '1156px',
      'xl': '1280px',
      'mxl': '1350px',
      '2xl': '1536px',
      '3xl': '1920px'
    },
    animation: {
      float: "float 3s ease-in-out infinite",
      pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      spin: 'spin 1s linear infinite'
    },
    keyframes: {
      float: {
        "0%, 100%": {transform: "translateY(0)"},
        "50%": {transform: "translateY(-10px)"},
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '.5' },
      },
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
  },
  plugins: [],
};
export default config;
