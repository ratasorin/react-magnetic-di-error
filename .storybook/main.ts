import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-webpack5-compiler-babel",
  ],

  babel: async (config, { configType }) => {
    console.log(config);
    if (configType === "DEVELOPMENT") {
      const reactMagneticSetup = ["react-magnetic-di/babel-plugin", {
        exclude: [/stories/, ".storybook"],
      }];

      if (config.plugins) config.plugins.push(reactMagneticSetup);
      else config.plugins = [reactMagneticSetup];

      if(config.presets) config.presets.push("@babel/preset-typescript");
      else config.presets = ["@babel/preset-typescript"];
    }

    return config;
  },

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        "@utils": path.resolve(__dirname, "../src/utils"),
        "@shared": path.resolve(__dirname, "../src/shared"),
        "@components": path.resolve(__dirname, "../src/components"),
      };
    }

    return config;
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // 👇 Default prop filter, which excludes props from node_modules
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  staticDirs: ["../public"],

  docs: {},
};
export default config;
