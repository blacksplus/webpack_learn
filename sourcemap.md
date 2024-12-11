## 1. sourcemap

### 1.1 什么是sourceMap

- sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术
- webpack通过配置可以自动给我们`source maps`文件，`map`文件是一种对应编译文件和源文件的方法
- [source-map](https://github.com/mozilla/source-map)

![source-map](./$%7Bfupload%7D/source-map.jpg)

| sourcemap 类型                 | 适用场景                                 | 优缺点                                                     |
| :----------------------------- | :--------------------------------------- | :--------------------------------------------------------- |
| `source-map`                   | 原始代码，需要最好的 sourcemap 质量      | 最高的质量和最低的性能                                     |
| `eval-source-map`              | 原始代码，需要高质量的 sourcemap         | 高质量和低性能，sourcemap 可能会很慢                       |
| `cheap-module-eval-source-map` | 原始代码，需要高质量和低性能的 sourcemap | 高质量和更低的性能，只有每行的映射                         |
| `cheap-eval-source-map`        | 转换代码，需要行内 sourcemap             | 更高的质量和更低的性能，每个模块被 eval 执行               |
| `eval`                         | 生成代码，需要带 eval 的构建模式         | 最低的质量和更低的性能，但可以缓存 sourcemap               |
| `cheap-source-map`             | 转换代码，需要行内 sourcemap             | 没有列映射，从 loaders 生成的 sourcemap 没有被使用         |
| `cheap-module-source-map`      | 原始代码，需要只有行内的 sourcemap       | 没有列映射，但包括从 loaders 中生成的 sourcemap 的每行映射 |
| `hidden-source-map`            | 需要隐藏 sourcemap                       | 能够隐藏 sourcemap                                         |
| `nosources-source-map`         | 需要正确提示报错位置，但不暴露源码       | 能够正确提示报错位置，但不会暴露源码                       |

### 1.2 配置项

- 配置项其实只是五个关键字eval、source-map、cheap、module和inline的组合

| sourcemap 类型 | 描述                                            |
| :------------- | :---------------------------------------------- |
| `source-map`   | 生成 .map 文件                                  |
| `eval`         | 使用 eval 包裹模块代码                          |
| `cheap`        | 不包含列信息，也不包含 loader 的 sourcemap      |
| `module`       | 包含 loader 的 sourcemap，否则无法定义源文件    |
| `inline`       | 将 .map 作为 DataURI 嵌入，不单独生成 .map 文件 |

#### 1.2.1 source-map

src\index.js

```js
let a=1;
let b=2;
let c=3;
```

dist\main.js

```js
   ({
     "./src/index.js":
       (function (module, exports) {
         let a = 1;
         let b = 2;
         let c = 3;
       })
   });
//# sourceMappingURL=main.js.map
```

#### 1.2.2 eval

- 用`eval`执行代码
- [whyeval](https://github.com/webpack/docs/wiki/build-performance#sourcemaps)

```js
  ({
    "./src/index.js":
      (function (module, exports) {
        eval("let a=1;\r\nlet b=2;\r\nlet c=3;\n\n//# sourceURL=webpack:///./src/index.js?");
      })
  });
```

- `eval-source-map`就会带上源码的sourceMap
- 加了eval的配置生成的sourceMap会作为DataURI嵌入，不单独生成`.map`文件
- 官方比较推荐开发场景下使用eval的构建模式，因为它能`cache sourceMap`,从而rebuild的速度会比较快

```js
  ({
    "./src/index.js":
      (function (module, exports) {
        eval("let a=1;\r\nlet b=2;\r\nlet c=3;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,In0=\n//# sourceURL=webpack-internal:///./src/index.js\n");
      })
  });
```

> devtool: "eval-source-map" is really as good as devtool: "source-map", but can cache SourceMaps for modules. It’s much faster for rebuilds.

#### 1.2.3 inline

- `inline`就是将map作为DataURI嵌入，不单独生成.map文件
- `inline-source-map`

```js
({
    "./src/index.js":
      (function (module, exports) {
        let a = 1;
        let b = 2;
        let c = 3;
      })
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIj
```

#### 1.2.4 cheap(低开销)

- `cheap(低开销)`的sourcemap，因为它没有生成列映射(column mapping),只是映射行数
- 开发时我们有行映射也够用了,开发时可以使用cheap
- `cheap-source-map`

#### 1.2.5 module

- Webpack会利用loader将所有非js模块转化为webpack可处理的js模块,而增加上面的cheap配置后也不会有loader模块之间对应的sourceMap
- 什么是模块之间的sourceMap呢？比如jsx文件会经历loader处理成js文件再混淆压缩， 如果没有loader之间的sourceMap，那么在debug的时候定义到上图中的压缩前的js处，而不能追踪到jsx中
- 所以为了映射到loader处理前的代码，我们一般也会加上module配置
- `cheap-module-source-map`

### 1.3 演示

![img](https://static.zhufengpeixun.com/modulesourcemap1_1678269585579.png)

```js
let source = 1;
let map1 = source+=1;
let map2 = source+=2;
source-=2;
source-=1;
```

#### 1.3.1 安装

```js
npm i webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env style-loader css-loader less-loader less file-loader url-loader -D
```

#### 1.3.2 webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode:'development',
  devtool:'cheap-module-source-map',
  entry:'./src/index.js',
  module: {
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader:'babel-loader',
            options:{
              presets:["@babel/preset-env"]
            }
          }]
        } 
      ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ]
}
```

#### 1.3.3 src\index.js

```js
import './sum';
sum(1,2);
//console.log(window.a.b);
```

#### 1.3.4 src\sum.js

src\sum.js

```js
let sum = (a,b)=>a+b;
export {sum}
```

### 1.4 最佳实践

#### 1.4.1 开发环境

- 我们在开发环境对sourceMap的要求是：快（eval），信息全（module），
- 且由于此时代码未压缩，我们并不那么在意代码列信息(cheap),
- 所以开发环境比较推荐配置：`devtool: cheap-module-eval-source-map`

#### 1.4.2 生产环境

- 一般情况下，我们并不希望任何人都可以在浏览器直接看到我们未编译的源码，
- 所以我们不应该直接提供sourceMap给浏览器。但我们又需要sourceMap来定位我们的错误信息，
- 这时我们可以设置`hidden-source-map`
- 一方面webpack会生成sourcemap文件以提供给错误收集工具比如sentry，另一方面又不会为 bundle 添加引用注释，以避免浏览器使用。

## 2.调试代码

### 2.1 测试环境调试

- `filemanager-webpack-plugin` 是一个用于 Webpack 的插件，可以在 Webpack 构建结束后执行一些文件管理操作，比如拷贝文件、删除文件、归档文件等等。它可以让我们在构建结束后自动执行这些文件管理操作，减少手动操作，提高构建效率

- ```
  webpack.SourceMapDevToolPlugin
  ```

   

  是 webpack 提供的用于生成

   

  ```
  source map
  ```

   

  的插件之一。它可以为开发环境下的代码生成

   

  ```
  source map
  ```

  ，方便调试和定位问题,该插件的主要作用就是在打包的代码中生成对应的

   

  ```
  source map
  ```

   

  文件

  - ```
    filename
    ```

    : 指定生成的 source map 文件名，一般为 [file].map 或者 [file].[contenthash].map

    - `append`: 是否将 source map 添加到已有的 source map 中，如果为 false，则生成的 source map 会覆盖已有的 source map

![enablesourcemap](./$%7Bfupload%7D/enablesourcemap.png)

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'production',
    devtool: false,
    entry: './src/index.js',
    resolveLoader: {
        modules: ['node_modules', 'loaders']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }]
            },
            {
                test: /\.(jpg|png|gif|bmp)$/,
                type: 'asset'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.SourceMapDevToolPlugin({
            append: '\n//# sourceMappingURL=http://127.0.0.1:8081/[url]',
            filename: '[file].map[query]',
        }),
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: './dist/*.map',
                            destination: 'D:/aprepare/webpacksource/sourcemap',
                        },
                    ],
                    delete: ['./dist/*.map'],
                    archive: [
                        {
                            source: './dist',
                            destination: './dist/dist.zip',
                        }
                    ]
                }
            }
        })
    ]
}
```

### 2.2 生产环境调试

- 在生产环境调试sourcemap需要注意保护源代码的安全性，避免源代码泄露。一种常用的方式是将sourcemap文件单独生成并存储在服务器端，然后通过HTTP服务器提供访问
- webpack打包仍然生成sourceMap，但是将map文件挑出放到本地服务器，将不含有map文件的部署到服务器，借助第三方软件（例如fiddler），将浏览器对map文件的请求拦截到本地服务器，就可以实现本地sourceMap调试

```js
// webpack.config.js
module.exports = {
  // ...
  devtool: 'hidden-source-map',
  // ...
}
```

- 打开混淆代码
- 右键 -> 选择[Add source map]
- 输入本地 `sourceMap` 的地址（此处需要启用一个静态资源服务，可以使用 `http-server` 或者通过浏览器打开对应混淆代码的`.map`文件 ），完成。本地代码执行构建命令，注意需要打开 `sourceMap` 配置，编译产生出构建后的代码，此时构建后的结果会包含 `sourceMap` 文件。关联上 `sourceMap` 后，我们就可以看到 `sources -> page` 面板上的变化了

```js
regex:(?inx)http:\/\/localhost:8080\/(?<name>.+)$
*redir:http://127.0.0.1:8081/${name}
```

![fiddleproxy](./$%7Bfupload%7D/fiddleproxy.png)

## 3. sourcemap

- [compiler官方下载](https://developers.google.com/closure/compiler)
- [compiler珠峰镜像](http://img.zhufengpeixun.cn/compiler.jar)
- [base64vlq在线转换](http://murzwin.com/base64vlq.html)

### 3.1 生成sourcemap

script.js

```js
let a=1;
let b=2;
let c=3;
java -jar compiler.jar --js script.js --create_source_map ./script-min.js.map --source_map_format=V3 --js_output_file script-min.js
```

script-min.js

```js
var a=1,b=2,c=3;
```

script-min.js.map

```js
{
  "version": 3,// Sourcemap 版本号，目前最新的版本为 3。
  "file": "script-min.js",// 编译后的 JavaScript 代码文件名。
  "lineCount": 1,// 编译后的 JavaScript 代码的总行数。
  "mappings": "AAAA,IAAIA,EAAI,CAAR,CACIC,EAAI,CADR,CAEIC,EAAI;",// 包含将编译后的 JavaScript 代码映射回原始源代码所需的信息。
  "sources": ["script.js"],// 包含所有原始源代码文件名的数组。
  "names": ["a", "b", "c"]// 包含所有原始代码中出现过的标识符的数组。
}
```

### 3.2 mappings属性

- 关键就是map文件的mappings属性。这是一个很长的字符串，它分成三层

| 对应             | 含义                                                         |
| :--------------- | :----------------------------------------------------------- |
| 第一层是行对应   | 以分号（;）表示，每个分号对应转换后源码的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推。 |
| 第二层是位置对应 | 以逗号（,）表示，每个逗号对应转换后源码的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。 |
| 第三层是位置转换 | 以VLQ编码表示，代表该位置对应的转换前的源码位置。            |

```js
"AAAA,IAAIA,EAAI,CAAR,CACIC,EAAI,CADR,CAEIC,EAAI;"
```

### 3.3 位置对应的原理

- 每个位置使用五位，表示五个字段

| 位置   | 含义                                      |
| :----- | :---------------------------------------- |
| 第一位 | 表示这个位置在（转换后的代码的）的第几列  |
| 第二位 | 表示这个位置属于sources属性中的哪一个文件 |
| 第三位 | 表示这个位置属于转换前代码的第几行        |
| 第四位 | 表示这个位置属于转换前代码的第几列        |
| 第五位 | 表示这个位置属于names属性中的哪一个变量   |

> 首先，所有的值都是以0作为基数的。其次，第五位不是必需的，如果该位置没有对应names属性中的变量，可以省略第五位,再次，每一位都采用VLQ编码表示；由于VLQ编码是变长的，所以每一位可以由多个字符构成

> 如果某个位置是AAAAA，由于A在VLQ编码中表示0，因此这个位置的五个位实际上都是0。它的意思是，该位置在转换后代码的第0列，对应sources属性中第0个文件，属于转换前代码的第0行第0列，对应names属性中的第0个变量。

![mappings1](./$%7Bfupload%7D/mappings1.jpg)

### 3.4 相对位置

- 对于输出后的位置来说，到后边会发现它的列号特别大，为了避免这个问题，采用相对位置进行描述
- 第一次记录的输入位置和输出位置是绝对的，往后的输入位置和输出位置都是相对上一次的位置移动了多少

![mappings2](https://static.zhufengpeixun.com/mappding_1678273793561.png)

```js
const origin = 'feel the force';
const target = 'the force feel';
const mapping = {
    mappings: [[10, 'a.js', 0, 0, 'feel'], [-10, 'a.js', 0, 5, 'the'], [4, 'a.js', 0, 4, 'force']],
    sources: ['a.js'],//源代码的文件名
    names: ['feel', 'the', 'force']
}

/**
转换前的0行0列对应转换后的0行10列 feel
转换前的0行5列对应转换后的0行0列 the
转换前的0行9列对应转换后的0行4列 force
 */
```

### 3.5 VLQ编码

- VLQ是Variable-length quantity 的缩写，是一种通用的、使用任意位数的二进制来表示一个任意大的数字的一种编码方式
- 这种编码需要用最高位表示连续性，如果是1，代表这组字节后面的一组字节也属于同一个数；如果是0，表示该数值到这就结束了
- 如何对数值137进行VLQ编码
  - 1.将137改写成二进制形式 10001001
  - 2.从右向左七位一组做分组，不足的补在左侧补0
  - 3.最后一组开头补0，其余补1
  - 137的VLQ编码形式为10000001 00001001

```js
//1.将137改写成二进制形式 10001001
let binary = (137).toString(2);
console.log(binary);//10001001
//2.从右向左七位一组做分组，不足的补在左侧补0
const totalLength = Math.ceil((binary.length) / 7) * 7;
console.log(totalLength);//14
const padded = binary.padStart(totalLength, '0');
console.log(padded);//00000010001001
//3.最后一组开头补0，其余补1
const groups = padded.match(/(\d{7})/g);
const lastGroup = groups.pop();
const vlqCode = groups.map(group => '1' + group).join('') + '0' + lastGroup;
console.log(vlqCode);
//1000000100001001
```

### 3.6 Base64 VLQ

- 一个Base64字符只能表示6bit(2^6)的数据
- Base64 VLQ需要能够表示负数,于是用最后一位来作为符号标志位
- 由于只能用6位进行存储，而第一位表示是否连续的标志，最后一位表示正数/负数。中间只有4位，因此一个单元表示的范围为[-15,15]，如果超过了就要用连续标识位了
- 表示正负的方式
  - 如果这组数是某个数值的VLQ编码的第一组字节，那它的最后一位代表"符号"，0为正，1为负；
  - 如果不是，这个位没有特殊含义，被算作数值的一部分
- 在Base64 VLQ中，编码顺序是从低位到高位,而在VLQ中，编码顺序是从高位到低位

![img](https://static.zhufengpeixun.com/2bit_1678356252999.png)

![base64](./$%7Bfupload%7D/base64.png)

```js
var base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
/**
 * 1. 将137改写成二进制形式  10001001
 * 2. 127是正数，末位补0 100010010
 * 3. 五位一组做分组，不足的补0 01000 10010
 * 4. 将组倒序排序 10010 01000
 * 5. 最后一组开头补0，其余补1 110010 001000
 * 6. 转64进制 y和I
 */
function encode(num) {
    //1. 将137改写成二进制形式,如果是负数的话是绝对值转二进制
    let binary = (Math.abs(num)).toString(2);
    //2.正数最后边补0,负数最右边补1,127是正数,末位补0 100010010
    binary = num >= 0 ? binary + '0' : binary + '1';
    //3.五位一组做分组，不足的补0   01000 10010 
    let zero = 5 - (binary.length % 5);
    if (zero > 0) {
        binary = binary.padStart(Math.ceil(binary.length / 5) * 5, '0');
    }
    let parts = [];
    for (let i = 0; i < binary.length; i += 5) {
        parts.push(binary.slice(i, i + 5));
    }// 01000 10010
    //4. 将组倒序排序 10010 01000
    parts.reverse();// ['00000','00001']
    //5. 最后一组开头补0,其余补1 110010 001000
    for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
            parts[i] = '0' + parts[i];
        } else {
            parts[i] = '1' + parts[i];
        }
    }
    console.log(parts);//[ '110010', '001000' ]
    //6.转64进制 y和I
    let chars = [];
    for (let i = 0; i < parts.length; i++) {
        chars.push(base64[parseInt(parts[i], 2)]);
    }
    return chars.join('')
}
const result = encode(137);
console.log(result);//yI
const result4 = encode(4);
console.log(result4);
const result0 = encode(0);
console.log(result0);
//IAAIA
//[4,0,0,4,0]
//IAAIA
```

### 3.7 计算位移

```js
const base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function decode(str) {
    let parts = str.split('');
    let allNumbers = [];
    let numbers = [];
    for (let i = 0; i < parts.length; i++) {
        const index = base64.indexOf(parts[i]);
        const binary = index.toString(2).padStart(6, '0');
        numbers.push(binary.slice(1));
        let isLast = binary[0] === '0';
        if (isLast) {
            allNumbers.push(numbers);
            numbers = [];
        }
    }
    let result = [];
    for (let i = 0; i < allNumbers.length; i++) {
        const numbers = allNumbers[i];
        numbers.reverse();
        let sign;
        let binary = numbers.map((number, index) => {
            if (index === numbers.length - 1) {
                sign = number[number.length - 1] === '0' ? 1 : -1;
                return number.slice(0, 4);
            }
            return number;
        }).join('');
        result.push(parseInt(binary, 2) * sign);
    }
    return result;
}
function explain(lines) {
    return lines.split(',').map(decode);
}
let positions = explain('AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE');
//后列,哪个源文件,前行,前列,变量
console.log('positions', positions);
// [转换前行，转换前列，转换后行，转换后列]
let offsets = positions.map(item => [item[2], item[3], 0, item[0],]);
console.log('offsets', offsets);
let origin = { row: 0, col: 0 };
let target = { row: 0, col: 0 };
let mapping = [];
for (let i = 0; i < offsets.length; i++) {
    let [originRow, originCol, targetRow, targetCol] = offsets[i];
    //第一个是绝对位置,
    if (i === 0) {
        origin = { row: originRow, col: originCol };
        target = { row: targetRow, col: targetCol };
    } else {//后面的是相对位置
        origin.row += originRow;
        origin.col += originCol;
        target.row += targetRow;
        target.col += targetCol;
    }
    mapping.push(`[${origin.row},${origin.col}]=>[${target.row},${target.col}]`);
}
console.log('mapping', mapping);
positions [
  [ 0, 0, 0, 0 ],
  [ 4, 0, 0, 4, 0 ],
  [ 2, 0, 0, 2 ],
  [ 1, 0, 0, -6 ],
  [ 1, 0, 1, 4, 1 ],
  [ 2, 0, 0, 2 ],
  [ 1, 0, -1, -6 ],
  [ 1, 0, 2, 4, 1 ],
  [ 2, 0, 0, 2 ]
]
offsets [
  [ 0, 0, 0, 0 ],
  [ 0, 4, 0, 4 ],
  [ 0, 2, 0, 2 ],
  [ 0, -6, 0, 1 ],
  [ 1, 4, 0, 1 ],
  [ 0, 2, 0, 2 ],
  [ -1, -6, 0, 1 ],
  [ 2, 4, 0, 1 ],
  [ 0, 2, 0, 2 ]
]
mapping [
  '[0,0]=>[0,0]',
  '[0,4]=>[0,4]',
  '[0,6]=>[0,6]',
  '[0,0]=>[0,7]',
  '[1,4]=>[0,8]',
  '[1,6]=>[0,10]',
  '[0,0]=>[0,11]',
  '[2,4]=>[0,12]',
  '[2,6]=>[0,14]'
]
```

![sourcemapmove](./$%7Bfupload%7D/sourcemapmove.png)

## 4.参考

- [javascript_source_map算法](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
- [devtool](https://www.webpackjs.com/configuration/devtool/)

×

#### 请登录

姓名: 

密码: 