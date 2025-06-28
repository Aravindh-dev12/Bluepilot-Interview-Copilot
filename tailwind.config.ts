import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'btn-grad': 'linear-gradient(to right, #FDFC47 0%, #24FE41 51%, #FDFC47 100%)',
      },
      backgroundSize: {
        '200': '200%',
      },
      transitionProperty: {
        'bg': 'background-position, color',
      },
      fontFamily: {
        kabel: ['Informal011 BT'],
      },
      height: {
        'custom': '120vh', // Custom height value
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};

export default config;
