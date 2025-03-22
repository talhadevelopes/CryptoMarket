module.exports = {
  mode: 'jit', // Enable JIT compiler
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      spacing: {
        '200': '200px', // Add custom spacing if needed
      },
    },
  },
};