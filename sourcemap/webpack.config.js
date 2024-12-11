const isDev = process.env.NODE_ENV === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = {
  mode: process.env.NODE_ENV,
  /** sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术，打包后的代码会进行压缩，在开发调试的时候难以找到原始的代码
   *  sourcemap在打包时生产.map文件，在浏览器中调试时会根据.map文件映射到原始代码，方便我们调试。
   *  一般由五个单词进行组合，分别是： cheap module eval inline sourcemap
   * sourcemap生产.map文件（在源文件最下面一行加入 //# sourceMappingURL=xxx.map，xxx.map文件是压缩后的代码与源代码的映射关系，可以是网络地址也可以是本地地址）
   * cheap： 低开销的sourcemap，不包含列信息，不包含loader信息，不包含模块信息；要结合source-map
   * eval：由eval包裹的模块代码
   * module：包含loader信息，loader信息可以帮助我们定位到原始代码的位置；比如如果没有loader，就只能看到loader的转换后的代码，无法定位到原始代码
   * inline：将.map文件内联到.js文件中，可以减少请求数，提高性能；不过在生产环境下，不建议使用inline模式，因为会增加.js文件的体积
   * 官方更加推荐在开发模式下选择eval模式，因为eval执行的是一串字符串，可以缓存下来，因此rebuild会更快
   * 开发模式推荐使用cheap-module-eval-source-map
   * 生产环境下我们不希望别人看到我们的源代码，但是又想要定位到源代码，可以设置 hidden-source-map，这样打包后的入口文件就不会有映射信息，只有.map文件，可以将.map文件上传到服务器，让别人下载到本地，然后使用source-map-loader加载映射文件
   * 我们也可以自己使用插件配置sourcemap
   *  */
  //
  devtool: 'hidden-source-map',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    //SourceMapDevToolPlugin是webpack内置插件，可以更加精细的控制sourcemap的生成，比如是否生成，如何生成，如何映射等等
    new webpack.SourceMapDevToolPlugin({
        filename: '[name].js.map',
        append: '//# sourceMappingURL=http://localhost:5500/sourcemap/dist/[url]',
    }),
    //FileManagerPlugin可以实现文件复制，移动，删除等操作
    new FileManagerPlugin({
        events: {
            onEnd: {
                copy: [
                    {
                        source: './dist/*.map',
                        destination: path.resolve('./dist/sourcemaps/'),
                    },
                ],
                delete: [
                    './dist/*.map'
                ]
            },
        }
    })
  ],
};
