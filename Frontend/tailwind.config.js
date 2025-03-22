module.exports = {
  mode: 'jit', // Enable JIT compiler
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      spacing: {
        '200': '200px',
        "30": "30px",
        "50": "50px",
        // Add custom spacing if needed
      },
    },
  },
};