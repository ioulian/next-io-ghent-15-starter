const config = {
  multipass: true, // boolean
  js2svg: {
    indent: 4, // number
    pretty: false, // boolean
  },
  plugins: [
    //"preset-default", // built-in plugins enabled by default
    { name: "removeAttrs", params: { attrs: ["*:class:*"] } },
    { name: "removeStyleElement" },
  ],
};

export default config;
