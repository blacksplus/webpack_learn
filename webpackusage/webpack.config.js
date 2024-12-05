//引入内置模块path
const path = require('path');
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//可以将css文件提取到单独的文件中，不再打包到js文件中，可以有效减少http请求数且可以并行加载不会阻塞渲染
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//引入语法检查工具
const ESLintPlugin = require('eslint-webpack-plugin');
const { runtime } = require('webpack');
//获取环境变量，区分开发环境和生产环境 通过启动时npm run cross-env NODE_ENV=development或npm run cross-env NODE_ENV=production设置环境变量
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  mode: 'development', //开发模式
  devtool: false, //关闭source-map，因为生产环境不需要，可以加快打包速度
  devServer: {
    //开发服务器配置
    contentBase: path.join(__dirname, 'dist'), //指定服务器的根目录
    open: true, //自动打开浏览器
    port: 9000, //指定端口号
    hot: true, //开启热更新
    compress: true, //开启gzip压缩，减少网络传输量
    watchFiles: ['src/**/*'], //监听文件变化，自动刷新浏览器，如果不指定，默认监听所有文件变化
    historyApiFallback: true, //不管访问什么路径，都重定向到index.html，交给前端路由控制
    proxy: { //代理能够转发请求，可以解决跨域问题
      // '/api': {
      //   target: 'http://localhost:3000',
      //   pathRewrite: {
      //     '^/api': '',
      //   }
      // },
      // onBeforeSetupMiddleware: function({app}) { //自定义一个接口用于返回数据
      //   app.get('/api', function(req, res) {
      //     res.json({
      //       msg: 'Hello World!'
      //     })
      //   })
      // }
    },
  },
  //打包入口文件，找到入口文件并将其依赖的资源打包到一起
  //   entry: './src/index.js',
  //可以是数组表示多个文件打包到一个入口文件，如果是对象表示，多个入口文件对应多个以key命名的打包文件；本质上所有的方式结果都会转成对象形式，只不过key默认命名是main
  //   entry: ['./src/index.js', './src/index2.js', './src/useCss.js'],
  entry: {
    vender: './src/vender.js',
    index: ['./src/index.js', './src/useCss.js'],
    index2: {
      import: './src/index2.js',
      // 当一个入口模块引入另一个入口模块时，使用dependOn或runtime要维护一块引入代码（require）这代码浏览器不识别所以改成浏览器识别的模样，dependOn将这块放到前置依赖，而runtime抽离出来到公共runtime，其它入口要是指定属性值相同就可以共用
      // dependOn: 'vender', //依赖于vender.js,这样打包不会再将vender.js打包进index2.js中，可以减少体积
      // runtime: 'runtime', //依赖于runtime.js,runtime.js是webpack运行时代码，可以将一些公共代码提取到runtime.js中，减少重复代码，提高性能。即多个入口可以设置相同的runtime提取到公共代码，可以减少重复打包。解释就是webpack维护了一份引入清单，将这份清单分成两部分，一部分是入口文件，一部分是依赖文件，入口文件和依赖文件都会被打包到一起，但是入口文件和依赖文件之间有依赖关系，webpack会将依赖文件提取到runtime.js中，这样可以减少重复打包，提高性能。
    },
    index3: './src/index.ts',
    img: './src/img.js',
    txt: './src/txt.js',
  },
  //打包出口文件
  output: {
    path: path.resolve(__dirname, 'dist'), //打包后的文件存放的地方,__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
    filename: '[name].js', //打包后的文件名，可以替换成[name].js来生成多个入口文件对应的多个打包文件
    clean: true, //打包前先清空dist目录
  },
  //配置webpack如何处理不同文件，比如.js，.jsx，.css，.less，.scss等
  // module.rules数组中存放着一系列的规则，每个规则针对一种文件类型，webpack在遇到这些文件时，会根据这些规则进行处理
  // 常见的规则有：
  // test: 匹配文件的正则表达式
  // use: 应用的loader，可以是一个字符串，也可以是一个数组，表示多个loader
  // exclude: 排除的文件，匹配的文件将不会被处理
  // include: 包含的文件，只有匹配的文件才会被处理
  module: {
    rules: [
      //   {
      //     test: /\.css$/, //匹配所有.css文件
      //     //use的处理方式是从右到左
      //     //use: ['style-loader', 'css-loader', MiniCssExtractPlugin.loader], //style-loader将样式插入到head中，css-loader将css文件转换成commonjs模块；其本质就是webpack将css文件读取成字符串交给style-loader，style-loader将字符串插入到head中，然后css-loader将字符串再变成commonjs模块；最重要的是两个loader位置的顺序，style-loader必须在css-loader之前，
      //     // use: [MiniCssExtractPlugin.loader, 'css-loader'],
      //     use: [
      //       isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      //       'css-loader',
      //     ], //因为生产环境和开发环境不一样，生产环境使用MiniCssExtractPlugin.loader和css-loader，开发环境使用style-loader和css-loader(需要多次快速打包)
      //   },
      {
        test: /\.css$/, //匹配所有.css文件
        //use的处理方式是从右到左
        //use: ['style-loader', 'css-loader', MiniCssExtractPlugin.loader], //style-loader将样式插入到head中，css-loader将css文件转换成commonjs模块；其本质就是webpack将css文件读取成字符串交给style-loader，style-loader将字符串插入到head中，然后css-loader将字符串再变成commonjs模块；最重要的是两个loader位置的顺序，style-loader必须在css-loader之前，
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', //postcss-loader用来处理css兼容性问题，可以自动添加浏览器前缀，压缩代码，添加前缀等,需要在postcss.config.js中配置
        ], //因为生产环境和开发环境不一样，生产环境使用MiniCssExtractPlugin.loader和css-loader，开发环境使用style-loader和css-loader(需要多次快速打包)
      },
      {
        test: /\.less$/, //匹配所有.less文件
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', //postcss-loader用来处理css兼容性问题，可以自动添加浏览器前缀，压缩代码，添加前缀等,需要在postcss.config.js中配置
          'less-loader',
        ], //同上
      },
      //es6语法并不是所有浏览器都兼容，需要使用babel-loader将es6语法转换成es5语法，再交给浏览器执行
      {
        test: /\.js$/, //匹配所有.js文件
        // exclude: /node_modules/, //排除node_modules目录
        //因为要传参所以是对象形式
        use: {
          loader: 'babel-loader',
          options: {
            //预设是一系列插件的集合，可以让babel做一些额外的处理，比如@babel/preset-env可以让babel转换es6语法到es5语法，每个插件对应一种语法
            //配置可以写在.babelrc文件中，也可以写在webpack.config.js中
            presets: ['@babel/preset-env'], //使用@babel/preset-env来转换es6语法
            // modules: false, //不使用es6模块化语法，因为webpack本身就支持es6模块化语法，不需要再额外处理，即不转成commonjs模块
            // {
            //   target: {
            //     // chrome: '58', // 指定浏览器版本，默认是当前环境的浏览器版本
            //     // firefox: '57',
            //     // ie: '11',
            //     // safari: '11',
            //   },
            // }
            //指定转换哪些语法，比如只转换箭头函数，可以这样配置：
            // plugins: ['@babel/plugin-transform-runtime'], //使用@babel/plugin-transform-runtime来优化代码，比如将箭头函数转换成普通函数，减少函数调用开销
          },
        },
      },
      {
        test: /\.ts$/, //匹配所有.ts文件
        use: [
          // 'ts-loader', //使用ts-loader来加载ts文件，在tsconfig.json中配置编译选项，编译比较慢不推荐使用
          //推荐使用babel-loader来加载ts文件，可以将ts编译成es5语法，再交给浏览器执行
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'], //使用@babel/preset-env来转换es6语法
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/i, //匹配所有图片文件
      //   // type: 'asset/resource', //将图片文件打包成资源文件，可以直接用img标签引用，不需要再配置publicPath
      //   // type: 'asset/inline', //将图片文件内联到js文件中，可以直接用img标签引用，格式为base64编码，不需要再配置publicPath
      //   type: 'asset',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 4 * 1024, // 图片大小小于4kb，会被转为base64编码
      //     },
      //   },
      // },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
      //   use: [
      //     {
      //       loader: 'image-webpack-loader', //使用image-webpack-loader来压缩图片，压缩效果不错
      //       options: {
      //         disable: isDev, //开发环境不压缩图片
      //         mozjpeg: {
      //           progressive: true, // 是否开启渐进式JPEG，可以有效提升JPEG图片加载速度
      //           quality: 65, // 压缩JPEG图片的质量，取值范围为0到100，值越大质量越好但文件越大
      //         },
      //         optipng: {
      //           enabled: true, // 是否开启PNG图片的优化，可以有效提升PNG图片加载速度
      //         },
      //         pngquant: {
      //           // 压缩PNG图片的质量范围，取值范围为0到1，值越大质量越好但文件越大
      //           // 第一个数字表示压缩质量的下限，第二个数字表示压缩质量的上限
      //           quality: [0.65, 0.9],
      //           speed: 4, // 压缩PNG图片的速度，取值范围为1到10，值越大速度越快但质量越低
      //         },
      //         svgo: {
      //           plugins: [
      //             // 压缩SVG图片的插件列表，这里包含removeViewBox和cleanupIDs两个插件
      //             {
      //               //用于删除SVG图片中的viewBox属性
      //               //viewBox属性是用来指定SVG视口范围的，它的值是一个矩形框的坐标和宽高
      //               removeViewBox: false,
      //             },
      //             {
      //               //用于删除SVG图片中的无用ID属性
      //               cleanupIDs: true,
      //             },
      //           ],
      //         },
      //         gifsicle: {
      //           interlaced: true, // 是否开启GIF图片的隔行扫描,可以有效提升GIF图片加载速度
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.png$/, //匹配所有.png文件
        oneOf: [
          //oneOf是一个优化选项，因为每个文件转换时都要遍历loader，使用oneOf就只会匹配一个loader就退出，从上往下匹配
          {
            resourceQuery: /sizes/, //resourceQuery用于匹配请求路径中的访问参数。这里，我们通过正则表达式/sizes/来判断是否存在sizes参数。如果存在，该规则将被应用。
            use: [
              {
                loader: 'responsive-loader', //使用responsive-loader来生成不同尺寸的图片，可以自动生成srcset属性，适用于图片响应式加载

                options: {
                  // sizes: [320, 640, 960, 1280], //生成的图片尺寸 因为上方已经设置了图片大小限制sizes，这里可以不用设置，默认会生成所有尺寸的图片
                  adapter: require('responsive-loader/sharp'), //使用sharp来切成不同规格图片，速度更快
                },
              },
            ],
          },
          {
            type: 'asset/resource', //将图片文件打包成资源文件，可以直接用img标签引用，不需要再配置publicPath
          },
        ],
      },
      {
        test: /\.txt$/, //匹配所有.txt文件
        type: 'asset/source', //导出源内容，可以直接用txt文件内容，不需要再配置publicPath
      },
    ],
  },
  //配置插件，可以用来扩展webpack的功能，比如自动生成html文件，压缩js文件，分析打包文件体积等
  plugins: [
    // new HtmlWebpackPlugin(), //自动生成html文件，默认会生成index.html，也可以指定生成的文件名和模板文件，并且可以自动引入打包后的js文件，同样可以多次new多个HtmlWebpackPlugin，生成多个html文件
    new HtmlWebpackPlugin({
      template: './src/index.html', //指定生成的html文件
      filename: 'index.html', //指定生成的html文件名
      //   inject: true, //js插入到html文件中
      chunks: ['index'], //指定需要插入的js文件，这里只插入index.js文件
    }),
    new HtmlWebpackPlugin({
      template: './src/index2.html', //指定生成的html文件
      filename: 'index2.html', //指定生成的html文件名
      //   inject: true, //js插入到html文件中
      chunks: ['index2', 'img'], //指定需要插入的js文件，这里只插入index.js文件
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', //生成的css文件名，可以替换成[name].css来生成多个入口文件对应的多个css文件
    }),
    //语法检查工具，可以检查代码是否符合eslint规范，可以自动修复一些错误，在.eslintrc中配置规则
    new ESLintPlugin({
      extensions: ['jsx', 'ts', 'tsx'], //检查的文件类型
      fix: false, //自动修复错误，如果不想自动修复，可以设置为false
    }),
  ],
};
