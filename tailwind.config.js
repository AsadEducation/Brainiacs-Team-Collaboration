/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primaryColor: "#2E5077",
          secondaryColor: "#4DA1A9",
          accentColor: "#79D7BE",
        },
      },
    },
  };
  