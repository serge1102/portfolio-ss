/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sunset-blue": "#68c8e8",
        "sunset-yellow": "#eadeb9",
        "sunset-orange": "#f9b15f",
      },
      animation: {
        "ping-slow": "ping 1.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("daisyui")],
};
