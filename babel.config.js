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
            "@screens": "./src/ui/screens",
            "@assets": "./src/assets",
            "@components": "./src/ui/components",
            "@hooks": "./src/ui/hooks",
            "@config": "./src/config",
          },
        },
      ],
      ["module:react-native-dotenv"],
      // ["@babel/plugin-proposal-class-properties", { loose: false }],
    ],
  };
};
