const config = {
  multipass: false, // boolean
  js2svg: {
    indent: 4, // number
    pretty: false, // boolean
  },
  plugins: [
    "preset-default", // built-in plugins enabled by default
    { name: "removeAttrs", params: { attrs: ["*:class:*"] } },
  ],
};

export default config;
