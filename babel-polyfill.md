1. ## 1. babel-polyfill

  - ```
    Babel
    ```

    默认只转换新的

    ```
    Javascript
    ```

    语法，而不转换新的API，比如

    - `Iterator`, `Generator`, `Set`, `Maps`, `Proxy`, `Reflect`,`Symbol`,`Promise` 等全局对象
    - 在全局对象上的方法,比如说ES6在Array对象上新增了`Array.find`方法，Babel就不会转码这个方法

  - 如果想让这个方法运行，必须使用 `babel-polyfill`来转换等

  - `@babel/polyfill` 是一个 JavaScript 库，可以为旧版浏览器提供缺失的 ECMAScript 新特性和 API。它通过在全局对象上添加缺失的方法和属性来模拟 ECMAScript 的新特性，以便在旧版浏览器中运行现代的 JavaScript 代码

  - @babel/polyfill 实现了对以下内容的兼容性：

    - 新的原生类型：例如 Array.from、Promise、Set、Map 等
    - 实例方法：例如 Array.prototype.includes、String.prototype.startsWith、Object.assign 等
    - 静态方法：例如 Object.entries、Object.values、Array.from 等
    - Symbol、迭代器、生成器等

  - `@babel/polyfill`会将所有特性添加到全局对象上

  - `@babel/polyfill`会在全局对象上添加很多新的方法和属性，因此它的体积非常大

  ### 1.1 安装

  ```js
  npm install @babel/polyfill --save
  ```

  ### 1.2 targets

  - 配置参数`targets`表示我们需要支持哪些平台和哪些版本
  - [browserslist](https://www.npmjs.com/package/browserslist)

  ```js
  {
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
          options: {
              targets: {
                  "browsers": [">0.1%"]
              }
          }
      }
  }
  ```

  ### 1.3 useBuiltIns: false

  - `babel-polyfill` 它是通过向全局对象和内置对象的`prototype`上添加方法来实现的。比如运行环境中不支持`Array.prototype.find`方法，引入`polyfill`, 我们就可以使用`ES6`方法来编写了，但是缺点就是会造成全局空间污染
  - [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)为每一个环境的预设
  - `@babel/preset-env`默认只支持语法转化，需要开启`useBuiltIns`配置才能转化API和实例方法
  - `useBuiltIns`可选值包括："usage" | "entry" | false, 默认为 false，表示不对`polyfills` 处理，这个配置是引入 polyfills 的关键
  - 当 useBuiltIns 设置为 false 时，`@babel/preset-env` 不会自动在代码中注入 polyfill，这意味着如果你使用了一些新的 ECMAScript 特性或 API，它们在旧版浏览器中可能不被支持，你需要手动引入对应的 polyfill
  - `useBuiltIns: false` 此时不对 `polyfill` 做操作。如果引入 `@babel/polyfill`，则无视配置的浏览器兼容，引入所有的 `polyfill`

  #### 1.3.1 src/index.js

  src/index.js

  ```js
  //463 KiB
  import '@babel/polyfill';
  let sum = (a, b) => a + b;
  let promise = Promise.resolve();
  console.log([1, 2, 3].find(item => item === 2));
  ```

  #### 1.3.2 webpack.config.js

  webpack.config.js

  ```diff
  const path = require('path');
  module.exports = {
      mode: 'development',
      devtool: false,
      entry: './src/index.js',
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'main.js'
      },
      module: {
          rules: [
              {
                  test: /\.js?$/,
                  exclude: /node_modules/,
                  use: {
                      loader: 'babel-loader',
                      options: {
                          sourceType: "unambiguous",
  +                       presets: [["@babel/preset-env", { useBuiltIns: false }]]
                      }
                  }
              }
          ]
      },
      plugins: []
  };
  ```

  ### 1.4 useBuiltIns: "entry"

  - 当 `useBuiltIns` 设置为 `entry` 时，`@babel/preset-env` 会根据目标浏览器的版本和你的代码中使用的 ECMAScript 特性，自动引入对应的 polyfill，并将它们添加到入口文件中
  - "useBuiltIns": "entry" 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 `import '@babel/polyfill'`，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill
  - 这里需要指定 core-js 的版本
  - 50.8 KiB

  #### 1.4.1 安装

  ```js
  npm install --save core-js@3
  ```

  #### 1.4.2 src\index.js

  src\index.js

  core-js@3

  ```js
  //89.4 KiB
  import 'core-js/stable';
  import 'regenerator-runtime/runtime';
  let sum = (a, b) => a + b;
  let promise = Promise.resolve();
  console.log([1, 2, 3].find(item => item === 2));
  ```

  #### 1.4.3 webpack.config.js

  ```diff
  {
    test: /\.js?$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
  +         presets: [["@babel/preset-env", { useBuiltIns: 'entry', corejs: 3 }]]
        }
    }
  }
  ```

  ### 1.5 "useBuiltIns": "usage"

  - "useBuiltIns": "usage" `usage` 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
  - 当 useBuiltIns 设置为 "usage" 时，@babel/preset-env 会根据你的代码中使用的 ECMAScript 特性和目标浏览器的版本，自动引入对应的 polyfill，而不是将所有的 polyfill 打包到入口文件中。这样可以减小代码体积，避免无用的 polyfill 被引入
  - 当设置为usage时，polyfill会自动按需添加，不再需要手工引入`@babel/polyfill`

  #### 1.5.1 src/index.js

  src/index.js

  ```js
  //781 bytes
  console.log([1, 2, 3].find(item => item === 2));
  console.log(Array.prototype.find);
  console.log(Array.prototype.hasOwnProperty('find'));
  ```

  #### 1.5.2 webpack.config.js

  webpack.config.js

  ```diff
  {
    test: /\.js?$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
  +         presets: [["@babel/preset-env", { useBuiltIns: 'usage', corejs: 3 }]]
        }
    }
  }
  ```

  ## 2. babel-runtime

  - Babel为了解决全局空间污染的问题，提供了单独的包[babel-runtime](https://babeljs.io/docs/en/babel-runtime)用以提供编译模块的工具函数
  - 与 `@babel/polyfill` 不同，`babel-runtime` 并不会在全局对象上添加新的方法和属性，而是将这些方法和属性封装在一个独立的运行时库中，以便在编译后的代码中使用
  - 简单说 `babel-runtime` 更像是一种按需加载的实现，比如你哪里需要使用 `Promise`，只要在这个文件头部`import Promise from 'babel-runtime/core-js/promise'`就行了

  ### 2.1 安装

  ```js
  npm i babel-runtime --save-dev
  ```

  ### 2.2 src/index.js

  src/index.js

  ```js
  import Promise from 'babel-runtime/core-js/promise';
  const p = new Promise(()=> {});
  ```

  ## 3. babel-plugin-transform-runtime

  - ```
    @babel/plugin-transform-runtime
    ```

    插件是为了解决

    - 多个文件重复引用 相同helpers(帮助函数)=>提取运行时
    - 新API方法全局污染 -> 局部引入

  - 启用插件`babel-plugin-transform-runtime`后，Babel就会使用`babel-runtime`下的工具函数

  - `babel-plugin-transform-runtime`插件能够将这些工具函数的代码转换成`require`语句，指向为对`babel-runtime`的引用

  - ```
    babel-plugin-transform-runtime
    ```

     

    就是可以在我们使用新 API 时自动 import

     

    ```
    babel-runtime
    ```

     

    里面的

     

    ```
    polyfill
    ```

    - 当我们使用 `async/await` 时，自动引入 `babel-runtime/regenerator`
    - 当我们使用 ES6 的静态事件或内置对象时，自动引入 `babel-runtime/core-js`
    - 移除内联`babel helpers`并替换使用`babel-runtime/helpers` 来替换

  ### 3.1 安装

  ```js
  npm i @babel/plugin-transform-runtime @babel/runtime-corejs3 --save-dev
  ```

  ### 3.2 webpack.config.js

  webpack.config.js

  ```diff
  {
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
          options: {
              sourceType: "unambiguous",
              presets: [["@babel/preset-env", { useBuiltIns: 'usage', corejs: { version: 3 } }]],
              plugins: [
                  [
                      "@babel/plugin-transform-runtime",
                      {
                          corejs: 3,
                          helpers: true,
                          regenerator: true
                      }
                  ],
              ]
          }
      }
   }
  ```

  ### 3.3 corejs: 3

  - 当我们使用 ES6 的静态事件或内置对象时自动引入 babel-runtime/core-js

    ```js
    //var _Promise = __webpack_require__("./node_modules/@babel/runtime-corejs3/core-js-stable/promise.js");
    const p = new Promise(() => { });
    console.log(p);
    ```

  ### 3.4 helpers: true

  - 移除内联babel helpers并替换使用`babel-runtime/helpers` 来替换
  - 避免内联的 helper 代码在多个文件重复出现

  ```js
  class A {
  
  }
  class B extends A {
  
  }
  console.log(new B());
  ```

  ### 3.5 regenerator: true

  - 是否开启`generator`函数转换成使用`regenerator runtime`来避免污染全局域

  ```js
  //var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
  
  function* gen() {
  
  }
  console.log(gen());
  ```

  ## 4. 最佳实践

  - @babel/preset-env和plugin-transform-runtime二者都可以设置使用corejs来处理polyfill

  ### 4.1 项目开发

  - useBuiltIns使用usage

  - plugin-transform-runtime只使用其移除内联复用的辅助函数的特性，减小打包体积

    ```json
    {
      "presets": [
          [
              "@babel/preset-env",
              {
                  "useBuiltIns": "usage",
                  "corejs": 3
              }
          ]
      ],
      "plugins": [
          [
              "@babel/plugin-transform-runtime",
              {
                  "corejs": false
              }
          ]
      ]
    }
    ```

  ### 4.2 类库开发

  - 类库开发尽量不使用污染全局环境的`polyfill`，因此`@babel/preset-env`只发挥语法转换的功能
  - polyfill由`@babel/plugin-transform-runtime`来处理，推荐使用core-js@3

  ```json
  {
      "presets": [
          [
              "@babel/preset-env"
          ]
      ],
      "plugins": [
          [
              "@babel/plugin-transform-runtime",
              {
                  "corejs": {
                      "version": 3
                  }
              }
          ]
      ]
  }
  ```

  ## 5. polyfill-service

  - [polyfill.io](https://polyfill.io/v3/)自动化的 JavaScript Polyfill 服务
  - [polyfill.io](https://polyfill.io/v3/)通过分析请求头信息中的 UserAgent 实现自动加载浏览器所需的 polyfills

  ```js
  <script src="https://polyfill.io/v3/polyfill.min.js"></script>
  ```

  ×

  #### 请登录
