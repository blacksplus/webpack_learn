## 1.动机

- Module Federation的动机是为了不同开发小组间共同开发一个或者多个应用
- 应用将被划分为更小的应用块，一个应用块，可以是比如头部导航或者侧边栏的前端组件，也可以是数据获取逻辑的逻辑组件
- 每个应用块由不同的组开发
- 应用或应用块共享其他其他应用块或者库

![1608392171072](https://img.zhufengpeixun.com/1608392171072)

## 2.Module Federation

- 使用Module Federation时，每个应用块都是一个独立的构建，这些构建都将编译为容器
- 容器可以被其他应用或者其他容器应用
- 一个被引用的容器被称为`remote`, 引用者被称为`host`，`remote`暴露模块给`host`, `host`则可以使用这些暴露的模块，这些模块被成为`remote`模块

![1608722799323](https://img.zhufengpeixun.com/1608722799323)

## 3.实战

### 3.1 配置参数

| 字段     | 类型   | 含义                                                         |
| :------- | :----- | :----------------------------------------------------------- |
| name     | string | 是必须的，这个字段表示该模块在远程应用中的名称，其他远程应用将使用这个名称来引用该模块。name的值将作为远程应用的前缀，即其他应用中使用该模块的路径将是${name}/${expose} |
| library  | object | 一个对象，它指定了模块在使用webpack模块联邦时在全局范围内注册的名称。这个名称在UMD模块中使用，确保该模块可以通过脚本标记或使用类似require的函数来访问 |
| filename | string | 构建输出的文件名，指定输出的文件名。                         |
| remotes  | object | 远程应用的别名映射。这个对象将其他远程应用的名称作为键，将别名作为值。当一个远程应用需要使用其他应用中的模块时，就可以使用这些别名来引用这些模块 |
| exposes  | object | 被远程应用引用时可以暴露的模块和文件。这个对象将模块和文件名作为键，将暴露的名称作为值 |
| shared   | object | 共享依赖项，这个对象指定了与其他应用程序共享的第三方依赖项。这可以避免在不同的应用程序中加载相同的依赖项，从而减少页面加载时间和文件大小 |

### 3.2 remote

#### 3.2.1 安装依赖

```js
npm init -y
npm install react react-dom --save
npm install webpack webpack-dev-server html-webpack-plugin babel-loader @babel/core @babel/preset-env --save-dev
```

#### 3.2.2 remote\webpack.config.js

```js
let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:3000/",
    },
    devServer: {
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"]
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js",
            name: "remote",
            exposes: {
                "./NewsList": "./src/NewsList",
            }
          })
    ]
}
```

#### 3.2.3 public\index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mf</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

#### 3.2.4 remote\src\index.js

remote\src\index.js

```js
import("./bootstrap");
```

#### 3.2.5 remote\src\bootstrap.js

remote\src\bootstrap.js

```js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")).render(<App />);
```

#### 3.2.6 remote\src\App.js

remote\src\App.js

```js
import React from "react";
import NewsList from './NewsList';
const App = () => (
  <div>
    <h2>本地组件NewsList</h2>
    <NewsList />
  </div>
);

export default App;
```

#### 3.2.7 remote\src\NewsList.js

remote\src\NewsList.js

```js
import React from "react";
export default ()=>(
    <div>新闻列表</div>
)
```

### 3.3 host

#### 3.3.1 host\webpack.config.js

host\webpack.config.js

```js
let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:8000/",
    },
    devServer: {
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"]
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js",
            name: "host",
            remotes: {
                remote: "remote@http://localhost:3000/remoteEntry.js"
            }
        })
    ]
}
```

#### 3.3.2 host\src\index.js

host\src\index.js

```js
import("./bootstrap");
```

#### 3.3.3 host\src\bootstrap.js

host\src\bootstrap.js

```js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")).render(<App />);
```

#### 3.3.4 host\src\App.js

host\src\App.js

```js
import React from "react";
import Slides from './Slides';
const RemoteNewsList = React.lazy(() => import("remote/NewsList"));

const App = () => (
  <div>
    <h2 >本地组件Slides, 远程组件NewsList</h2>
    <Slides />
    <React.Suspense fallback="Loading NewsList">
      <RemoteNewsList />
    </React.Suspense>
  </div>
);
export default App;
```

#### 3.3.5 host\src\Slides.js

host\src\Slides.js

```js
import React from "react";
export default ()=>(
    <div>轮播图</div>
)
```

## 4.shared

- shared是Webpack 5中ModuleFederationPlugin提供的一个配置项，它允许开发人员在多个应用程序之间共享依赖关系，减少冗余代码和减小构建大小

- 使用shared配置项，我们可以将依赖项列表指定为一个对象，其中每个属性的名称是依赖项的名称，而属性的值指定了如何共享这些依赖项。shared对象的属性可以有以下几个值

  - ```
    singleton
    ```

    ：表示这个依赖项是共享的，并且只有一个实例。这个选项可以确保这个依赖项在所有应用程序中都只被加载一次

    - `requiredVersion`：表示这个依赖项需要的版本号。如果版本号不匹配，Webpack会抛出一个错误

  - `import`：指定从哪个应用程序中导入这个依赖项。这个选项需要使用一个字符串，表示其他应用程序的名称

  - `shareKey`：指定共享依赖项的名称。如果没有指定，那么这个依赖项的名称将使用其自身的名称

- 如果一个应用程序依赖于另一个应用程序，那么这些依赖关系应该由remotes选项来指定，而不是由shared选项来指定。shared选项只应该用于共享依赖关系，而不是应用程序之间的依赖关系

- 使用`shareKey`选项可以确保我们使用自定义名称来共享依赖项。这个选项可以用于避免依赖项名称冲突，并允许我们使用更具有描述性的名称来引用共享依赖项

![1608851802459](https://static.zhufengpeixun.com/shared_1678595980634.png)

### 4.1 remote\webpack.config.js

```diff
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js",
            name: "remote",
            exposes: {
                "./NewsList": "./src/NewsList",
            },
+            shared:{
+                react: { singleton: true, requiredVersion: '^17.0.2',shareKey: 'myReact'   },
+                "react-dom": { singleton: true, requiredVersion: '^17.0.2',shareKey: 'myReactDOM'   }
+              }
          })
    ]
```

### 4.2 host\webpack.config.js

```diff
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js",
            name: "host",
            remotes: {
                remote: "remote@http://localhost:3000/remoteEntry.js"
            },
+           shared:{//意味着它们将在每个应用程序中共享，并且只被加载一次
+                myReact: { singleton: true , requiredVersion: '^17.0.2'},
+                "myReactDOM": { singleton: true, requiredVersion: '^17.0.2' }
+           }
        })
    ]
```

## 5.双向依赖

- Module Federation 的共享可以是双向的

### 5.1 remote\webpack.config.js

```diff
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js",
            name: "remote",
+            remotes: {
+                host: "host@http://localhost:8000/remoteEntry.js"
+            },
            exposes: {
                "./NewsList": "./src/NewsList",
            },
            shared:{
                react: { singleton: true },
                "react-dom": { singleton: true }
              }
          })
    ]
```

### 5.2 host\webpack.config.js

```diff
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js",
            name: "host",
            remotes: {
                remote: "remote@http://localhost:3000/remoteEntry.js"
            },
+           exposes: {
+                "./Slides": "./src/Slides",
+           },
            shared:{
                react: { singleton: true },
                "react-dom": { singleton: true }
              }
        })
    ]
```

### 5.3 remote\src\App.js

remote\src\App.js

```diff
import React from "react";
import NewsList from './NewsList';
+const RemoteSlides = React.lazy(() => import("host/Slides"));
const App = () => (
  <div>
+    <h2>本地组件NewsList,远程组件Slides</h2>
    <NewsList />
+    <React.Suspense fallback="Loading Slides">
+      <RemoteSlides />
+    </React.Suspense>
  </div>
);

export default App;
```

## 6.多个remote

### 6.1 all\webpack.config.js

```js
let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:3000/",
    },
    devServer: {
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"]
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js",
            name: "all",
            remotes: {
                remote: "remote@http://localhost:3000/remoteEntry.js",
                host: "host@http://localhost:8000/remoteEntry.js",
            },
            shared:{
                react: { singleton: true },
                "react-dom": { singleton: true }
              }
          })
    ]
}
```

### 6.2 remote\src\index.js

remote\src\index.js

```js
import("./bootstrap");
```

### 6.3 remote\src\bootstrap.js

remote\src\bootstrap.js

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(<App />, document.getElementById("root"));
```

### 6.4 remote\src\App.js

remote\src\App.js

```js
import React from "react";
const RemoteSlides = React.lazy(() => import("host/Slides"));
const RemoteNewsList = React.lazy(() => import("remote/NewsList"));
const App = () => (
  <div>
    <h2>远程组件Slides,远程组件NewsList</h2>
    <React.Suspense fallback="Loading Slides">
      <RemoteSlides />
    </React.Suspense>
    <React.Suspense fallback="Loading NewsList">
      <RemoteNewsList />
    </React.Suspense>
  </div>
);

export default App;
```