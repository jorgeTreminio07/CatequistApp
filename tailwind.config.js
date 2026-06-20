/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "geist-black": ["Geist-Black", "sans-serif"],
        "geist-bold": ["Geist-Bold", "sans-serif"],
        "geist-extra-bold": ["Geist-ExtraBold", "sans-serif"],
        "geist-extra-light": ["Geist-ExtraLight", "sans-serif"],
        "geist-italic": ["Geist-Italic", "sans-serif"],
        "geist-light": ["Geist-Light", "sans-serif"],
        "geist-medium": ["Geist-Medium", "sans-serif"],
        "geist-regular": ["Geist-Regular", "sans-serif"],
        "geist-semi-bold": ["Geist-SemiBold", "sans-serif"],
        "geist-thin": ["Geist-Thin", "sans-serif"],
        "geist-black-italic": ["Geist-BlackItalic", "sans-serif"],
        "geist-bold-italic": ["Geist-BoldItalic", "sans-serif"],
        "geist-extra-bold-italic": ["Geist-ExtraBoldItalic", "sans-serif"],
        "geist-extra-light-italic": ["Geist-ExtraLightItalic", "sans-serif"],
        "geist-light-italic": ["Geist-LightItalic", "sans-serif"],
        "geist-medium-italic": ["Geist-MediumItalic", "sans-serif"],
        "geist-semi-bold-italic": ["Geist-SemiBoldItalic", "sans-serif"],
        "geist-thin-italic": ["Geist-ThinItalic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
