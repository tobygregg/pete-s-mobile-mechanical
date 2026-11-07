/** @type {import('tailwindcss').Config} */
// Pete's Mobile Mechanical Services – brand tokens.
// Colours are sampled from Pete's badge logo (images/brand/logo.webp).
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Navy outline of the badge – main text and dark surfaces
        ink: { DEFAULT: '#0f1b2b', 900: '#0a1320', 800: '#16263b', 700: '#22364f', 600: '#3a4d66' },
        // Shield blue behind "MOBILE MECHANICAL"
        blue: { DEFAULT: '#2363a4', 700: '#1b4f85', 600: '#1f5994', 400: '#3d82c4', 200: '#bcd3ea', 100: '#dce8f5', 50: '#eef4fa' },
        // Orange outline of the "Pete's" script – small accents and the main call to action
        orange: { DEFAULT: '#cf5f2a', 700: '#ad4b1d', 600: '#bd5423', 100: '#f8e3d7' },
        // Chrome/steel of the tools in the badge
        steel: { DEFAULT: '#8a9099', 600: '#646b75', 300: '#cfd2d6', 200: '#e1e3e6', 100: '#eceef0' },
        // Warm paper background – the job-sheet feel
        paper: { DEFAULT: '#f5f3ee', 200: '#ebe7de', 300: '#ddd7ca' },
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.9rem, 9.5vw, 6.4rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,27,43,.06), 0 8px 24px -12px rgba(15,27,43,.18)',
        lift: '0 2px 4px rgba(15,27,43,.06), 0 18px 36px -18px rgba(15,27,43,.35)',
      },
      keyframes: {
        wrench: { '0%,100%': { transform: 'rotate(-16deg)' }, '50%': { transform: 'rotate(14deg)' } },
        drive: { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
        spark: { '0%,60%,100%': { opacity: '0' }, '70%,85%': { opacity: '1' } },
        draw: { from: { strokeDashoffset: '1' }, to: { strokeDashoffset: '0' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-1.5px)' } },
      },
      animation: {
        wrench: 'wrench 2.6s ease-in-out infinite',
        drive: 'drive 48s linear infinite',
        spark: 'spark 2.6s ease-in-out infinite',
        draw: 'draw 1.1s .5s cubic-bezier(.65,0,.35,1) both',
        bob: 'bob .5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
