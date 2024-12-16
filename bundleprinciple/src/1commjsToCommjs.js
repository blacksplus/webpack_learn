// 每个模块都是一个对象，打包时会将所有的模块合并到一个对象中，引入地址作为键名，值为一个函数
var __webpack_modules__ = {
    './src/title.js': (__unused_webpack_module, exports) => {
      exports = 'Title';
    },
  };
  
  // 缓存模块, 避免重复加载
  var __webpack_module_cache__ = {};
  // 定义 require 函数, 用于加载模块 (就是runtime)
  function __webpack_require__(moduleId) {
    // 检查缓存, 如果缓存中有该模块, 则直接返回缓存中的模块
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // 如果没有，就在缓存模块中定义一个该键值对应的空模块
    var module = 
    (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    // 执行modules中键值对应的函数, 并传入三个参数: 模块对象, 模块的 exports 对象, require 函数，module.exports 就会被挂载对应的模块
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    // 返回模块的 exports 对象
    return module.exports;
  }
  
  var __webpack_exports__ = {};
  
  const Title = __webpack_require__('./src/title.js');
  console.log(Title);
  