import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
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
      fontSize: {
        '14xl': '12rem',
        '18xl': '14rem',
        '22xl': '16rem',
        '24xl': '18rem',
        '32xl': '22rem',
        '36xl': '24rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};

export default config;
