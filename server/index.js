require("ignore-styles");

require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    ["@babel/preset-react"],
  ],
});

require("./server");
