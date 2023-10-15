/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // screens: {
      //   lg: "1800px",
      //   xm: "1300px",
      //   md: "990px",
      //   sm: "600px",
      //   xs: "400px",
      //   minmd: "1700px",
      //   minlg: "2100px",
      // },
      screens: {
        lgs: { max: "1800px" },
        xms: { max: "1300px" },
        mds: { max: "990px" },
        sms: { max: "600px" },
        xss: { max: "400px" },
        minmd: "1700px",
        minlg: "2100px",
      },
    },
  },
  plugins: [],
};
