const path = require('path');
//merge可以合并两个配置对象
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const baseConfig = {
  mode: 'development',
  devtool: 'source-map', //Webpack 会生成一个完整的 source map 文件。这意味着每一个编译后的文件都会生成一个对应的 .map 文件，其中包含了原始代码的信息。
  entry: './src/index.js',
  output: {
    globalObject: 'this',
    library: 'math', // 打包成一个库
    // libraryExport: 'add', // 指定导出库的内容
    clean: true, // 每次打包前清空输出目录
  },
  externals: [
    nodeExternals(), // 排除 node_modules 中的模块
    // {
    //   jquery: {
    //     commonjs: 'jquery', //指定 jQuery 模块在 CommonJS 环境（例如 Node.js）下的引用方式。这里用的是字符串 'jquery'，表示在 CommonJS 模块中通过 require('jquery') 引入。
    //     commonjs2: 'jquery', //该属性通常与 CommonJS 兼容性相关，实际使用与 commonjs 相同，也设置为 'jquery'。
    //     amd: 'jquery', //在 AMD (异步模块定义) 环境中的模块定义，设置为 'jquery'，表示使用 define(['jquery'], ...) 的方式引入。
    //     root: '$', // 该属性用于浏览器环境，表示在全局变量作用域下如何获取 jQuery。在这里指定为 $，这意味着可以通过 $ 来访问 jQuery。
    //   },
    //   lodash: {
    //     commonjs: 'lodash',
    //     commonjs2: 'lodash',
    //     amd: 'lodash',
    //     root: '_',
    //   },
    // },
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};

module.exports = [
  merge(baseConfig, {
    output: {
      filename: '[name]-commonjs.js',
      libraryTarget: 'commonjs2', // 库的类型，这里是 commonjs2
    },
  }),
  merge(baseConfig, {
    output: {
      filename: '[name]-amd.js',
      libraryTarget: 'amd', // 库的类型，这里是 amd
    },
  }),
  merge(baseConfig, {
    output: {
      filename: '[name]-var.js',
      libraryTarget: 'var', // 库的类型，这里是 var
    },
  }),
  merge(baseConfig, {
    output: {
      filename: '[name]-window.js',
      libraryTarget: 'window', // 库的类型，这里是 window
    },
  }),
  merge(baseConfig, {
    output: {
      filename: '[name]-umd.js',
      libraryTarget: 'umd', // 库的类型，这里是 umd
    },
  }),
  merge(baseConfig, {
    output: {
      filename: '[name]-this.js',
      libraryTarget: 'this', // 库的类型，这里是 this
    },
  }),
];
