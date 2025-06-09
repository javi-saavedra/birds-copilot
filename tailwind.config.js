/** @type {import('tailwindcss').Config} */
import { twMerge } from 'tailwind-merge';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'primary': 'var(--text-color)',
        'background': 'var(--bg-color)',
        'text-secondary': 'var(--text-secondary)',
        'sidebar-color': 'var(--bg-sidebar)',
        'border-color': 'var(--border-color)',
        'black': 'var(--black)',
        'accent': 'var(--accent)',
        'secondary-color': 'var(--bg-secondary)',
      },
    },
  },
	plugins: [twMerge],
};
