module.exports = {
  sourceMap: true,
  ident: "postcss",
  plugins: [require("tailwindcss")("./tailwind.js"), require("autoprefixer")],
};
