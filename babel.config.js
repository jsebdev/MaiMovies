module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@app": "./src",
            "@screens": "./src/screens",
            "@assets": "./src/assets",
          },
        },
      ],
      ["module:react-native-dotenv"],
      // ["@babel/plugin-proposal-class-properties", { loose: false }],
    ],
  };
};