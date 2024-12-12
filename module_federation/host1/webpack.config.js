const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/', // 把生成的bundle.js自动插入生成的html中的文件路径前缀
    clean: true, // 每次打包前清空dist目录
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-react',
                  {
                    runtime: 'classic',
                    // runtime: 'automatic' // 自动导入React的Runtime
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ModuleFederationPlugin({
      filename: 'remoteEntry.js', // 打包后生成的远程入口文件名
      name: 'host1', //这个值是必须的，这个字段表示该模块在远程应用时的名称，name的值作为远程应用的前缀，即其它应用中使用该模块的路径是${name}/${expose}
      exposes: {
        // 要暴露的模块
        './host1Component': './src/host1Component', // 这里的路径是相对于当前项目的路径，打包后生成的远程入口文件会自动把这个模块暴露到远程应用中
        './click': './src/click',
      },
      remotes: {
        remote: 'host2@http://localhost:3001/remoteEntry.js', // 声明远程应用的名称和入口地址，host1是http://localhost:3000/remoteEntry.js的别名及其中一个变量名，对应暴露时的name属性值
      },
    }),
    new ModuleFederationPlugin({}),
  ],
};
