// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         times: ['"Times New Roman"', 'Times', 'serif'],
//       },
//       keyframes: {
//         shake: {
//           '0%, 100%': { transform: 'translate(0)' },
//           '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
//           '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
//         },
//       },
//       animation: {
//         shake: 'shake 0.5s ease-in-out',
//       },
//     },
//   },
//   plugins: [],
// }
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "maybe-break",
    "avoid-break"
  ],
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', 'Times', 'serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translate(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

