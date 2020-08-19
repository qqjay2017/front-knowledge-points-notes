module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",   // 各个故事书中进行跳转，相当于a标签一样
    "@storybook/addon-essentials",
    { name: "@storybook/addon-docs", options: { configureJSX: true } },
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y" ,  // 用来自动检测组件是否支持视障人士等规范的。
    
  ],
  webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve("react-docgen-typescript-loader"),
				},
			],
		});
		config.resolve.extensions.push(".ts", ".tsx");
		return config;
	},
}