## 1.基础配置

### 1.1 library选项

- webpack的配置文件中的output对象中的library选项允许我们将模块导出的内容作为库（library）暴露给外部使用

- `library`属性用于指定库的名称，可以是一个字符串或者一个对象。如果是一个字符串，则将其作为全局变量暴露给浏览器环境。如果是一个对象，则可以在对象中指定library的名称和导出方式等相关选项

- `libraryExport`属性用于指定要导出的内容，可以是一个字符串、一个字符串数组或者一个对象。如果是一个字符串，则将该字符串指定的导出内容暴露给外部使用。如果是一个字符串数组，则将数组中指定的导出内容暴露给外部使用。如果是一个对象，则可以在对象中指定要导出的内容和导出方式等相关选项

- ```
  libraryTarget
  ```

  属性用于指定库的导出方式，可以是以下值之一

  - `var`：将库导出为一个变量，该变量在全局作用域下可用
  - `assign`：将库导出为一个变量，该变量在全局作用域下可用，但可以被其他库或模块覆盖
  - `this`：将库导出为一个变量，该变量在this对象下可用
  - `window`：将库导出为一个变量，该变量在window对象下可用（仅在浏览器环境下有效）
  - `global`：将库导出为一个变量，该变量在global对象下可用（仅在Node.js环境下有效）
  - `commonjs`：将库导出为一个CommonJS模块，该模块在Node.js环境下可用
  - `commonjs2`：将库导出为一个CommonJS2模块，该模块在Node.js环境下可用
  - `amd`：将库导出为一个AMD模块，该模块在浏览器环境下可用
  - `umd`：将库导出为一个UMD模块，该模块既可在浏览器环境下，也可在Node.js环境下使用

### 1.2 externals

- `externals`选项用于指定哪些模块应该被视为外部模块，不应该被打包进输出的bundle中

- ```
  externals
  ```

  选项可以是一个对象、一个字符串、一个正则表达式或者一个函数

  - 如果是一个字符串，则表示要排除的模块名称
  - 如果是一个正则表达式，则表示要排除的模块名称与该正则表达式匹配的所有模块。
  - 如果是一个函数，则在函数中可以自定义判断哪些模块应该被排除在打包之外，需要返回一个布尔值来表示是否排除该模块

- 如果是一个对象，该对象的键表示要排除的模块名称，值表示在哪种环境下使用该模块。可以指定`commonjs`、`commonjs2`、`amd`或者`root`等选项来指定在不同的环境下使用该模块时的名称

### 1.3 webpack-node-externals

- `webpack-node-externals`是一个npm包，它可以帮助我们排除Node.js应用程序中不需要打包的第三方模块。与webpack的externals选项类似，webpack-node-externals也可以将指定的模块排除在webpack打包之外，从而减小输出的bundle体积，提高应用程序的加载速度
- `nodeExternals`函数将返回一个排除所有`node_modules`中的模块的externals对象。这样，所有的`node_modules`中的模块都将被排除在webpack打包之外

### 1.4 mini-css-extract-plugin

- `mini-css-extract-plugin`是一个webpack插件，用于将CSS样式从JavaScript代码中提取出来，并将其保存为单独的CSS文件

### 1.5 Sourcemap

- `Sourcemap`是一种技术，它可以将编译后的代码映射回原始源代码，从而方便我们在调试代码时定位问题。在开发过程中，我们经常会使用压缩后的JavaScript和CSS文件，这样可以减小文件体积，提高页面的加载速度。但是，当出现问题时，我们通常很难直接定位问题所在，因为压缩后的代码已经不再具有可读性。这时，Sourcemap就可以帮助我们解决这个问题

### 1.6 .npmignore

- .npmignore是一个用于指定npm包发布时忽略哪些文件或目录的文件，它类似于.gitignore文件
- 在发布npm包时，如果没有指定.npmignore文件，npm会默认将当前目录下的所有文件都发布到npm仓库中，这样会包含很多不必要的文件或目录，增加npm包的体积和下载时间

### 1.7 prepublishOnly

- prepublishOnly是一个npm script，在执行npm publish命令发布npm包之前会自动执行该脚本
- 通常情况下，prepublishOnly脚本用于在npm包发布之前进行一些检查或准备工作，例如检查代码风格、运行单元测试、打包代码等。

## 2.开发NPM

### 2.1 安装

```js
npm install webpack webpack-cli jquery lodash webpack-node-externals  mini-css-extract-plugin css-loader --save
```

### 2.1 webpack.config.js

webpack.config.js

```js
const path = require("path");
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: "./src/index.js",
  externals: [
    /* {
      jquery: {
        commonjs: 'jquery',
        commonjs2: 'jquery',
        amd: 'jquery',
        root: '$',
      },
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_',
      },
    }, */
    nodeExternals()
  ],  
  module: {
   rules: [
     {
       test: /\.css$/,
       use: [MiniCssExtractPlugin.loader, "css-loader"],
     },
   ],
 },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    library: "math",
    libraryExport: 'add',
    libraryTarget: 'umd'
  },
  plugins: [new MiniCssExtractPlugin()],
};
```

### 2.2 src\index.js

src\index.js

```js
import $ from 'jquery';
import _ from 'lodash';
import './index.css';
export { 
 _,
 $
}
export const add = (a, b) => a + b
export const minus = (a, b) => a -b
```

### 2.3 src\index.css

src\index.css

```css
body{
    background-color: green;
}
```

## 3.输出多种产物

### 3.1 webpack.config.js

webpack.config.js

```diff
const path = require("path");
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const baseConfig = {
  mode: "development",
  devtool: 'source-map',
  entry: "./src/index.js",
  externals: [
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    library: "math",
    libraryExport: 'add',
    libraryTarget: 'umd'
  },
  plugins: [new MiniCssExtractPlugin()],
};

+module.exports = [
+  merge(baseConfig, {
+    output: {
+      filename: "[name]-commonjs.js",
+      libraryTarget: 'commonjs'
+    },
+  }),
+  merge(baseConfig, {
+    output: {
+      filename: "[name]-amd.js",
+      libraryTarget: 'amd'
+    },
+  })
+];
```

## 4.配置函数

- `env`参数可以用于在命令行中设置环境变量
- `argv`参数可以用于获取命令行参数

```js
webpack --env mode=production --watch
env { WEBPACK_WATCH: true, mode: 'production' }
argv { env: { WEBPACK_WATCH: true, mode: 'production' }, watch: true }
```

webpack.config.js

```diff
const path = require("path");
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = function (env, argv) {
+ const isProduction = env.mode === 'production';
+ const isWatch = argv.watch;
  return {
+   mode:  isProduction ? 'production' : 'development',
+   devtool: isProduction ? 'source-map' : 'eval-source-map',
    entry: "./src/index.js",
+   watch: isWatch,
    externals: [
      nodeExternals()
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "./dist"),
      library: "math",
      libraryExport: 'add',
      libraryTarget: 'umd'
    },
    plugins: [new MiniCssExtractPlugin()],
  }
}
```

## 5.区分环境

### 5.1 mode

- `mode`用于指定webpack的打包模式

- ```
  mode
  ```

  可以设置为

  ```
  none
  ```

  、

  ```
  development
  ```

  或

  ```
  production
  ```

  ，分别表示不使用任何优化选项、开发模式和生产模式

  - `none`：不使用任何优化选项，通常用于测试环境
  - `development`：在打包过程中启用调试工具，例如`sourcemap`等，同时优化打包速度和开发体验
  - `production`：在打包过程中进行各种优化，包括代码压缩、去除无用代码等，以及启用各种性能优化工具，以提升网站的加载速度和性能

### 5.2 区分环境

- `--mode`用来设置模块内的`process.env.NODE_ENV`
- `cross-env`用来设置node环境的`process.env.NODE_ENV`
- `DefinePlugin`用来设置模块内的全局变量

#### 5.2.1 命令行配置

- webpack的`mode`默认为`production`
- `webpack-dev-server`的`mode`默认为`development`
- 可以在模块内通过`process.env.NODE_ENV`获取当前的环境变量,无法在webpack配置文件中获取此变量

#### 5.2.2 mode配置

webpack.config.js

```diff
module.exports = function (env, argv) {
+ const isProduction = env.mode === 'production';
  const isWatch = argv.watch;
  return {
    mode:  isProduction ? 'production' : 'development'
  }
}
```

#### 5.2.3 DefinePlugin

- 可以在任意模块内通过 `process.env.NODE_ENV` 获取当前的环境变量
- 但无法在node环境(webpack 配置文件中)下获取当前的环境变量

index.js

```js
console.log(NODE_ENV);//production
```

webpack.config.js

```js
console.log('process.env.NODE_ENV',process.env.NODE_ENV);// undefined
```

#### 5.2.4 cross-env

- 只能设置node环境下的变量NODE_ENV

package.json

```js
"scripts": {
  "build": "cross-env NODE_ENV=development webpack"
}
```

webpack.config.js

```js
console.log('process.env.NODE_ENV',process.env.NODE_ENV);// development
`
```

×

#### 请登录

姓名: 

密码: 