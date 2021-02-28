module.exports = {
    // root: true, // 根配置文件
    parser: "babel-eslint", // 解析器,把源代码转成抽象语法树
    extends: "airbnb", // 继承airbnb
    // 指定解析器选项
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2015,
    },
    // 指定脚本的运行环境
    env: {
        browser: true,
    },
    // 启用的规则及其各自的错误级别
    rules: {
        indent: ["error", 4], // 缩进风格
        quotes: "off", // 引号类型

        "no-console": "off", // 禁止使用console
        "react/jsx-filename-extension": "off",
        "class-methods-use-this": "off",
        "no-param-reassign": "off",
        "no-restricted-syntax": "off",
    },
};
