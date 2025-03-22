module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/TS/JSX/TSX files in src
    "./public/index.html", // Include your HTML file
  ],
  theme: {
    extend: {
      spacing: {
        200: "200px", // Custom spacing
        30: "30px", // Custom spacing
        50: "50px", // Custom spacing
        // Add more custom spacing if needed
      },
    },
  },
  plugins: [], // Add Tailwind plugins here if needed
};