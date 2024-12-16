var __webpack_modules__ = {
    './src/title.js': (module) => {
      module.exports = {
        title1: 'title1',
        title2: 'title2',
      };
    },
  };
  
  var __webpack_module_cache__ = {};
  
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
  
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
  
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  
    return module.exports;
  }
  //定义getter函数判断模块是否为ESModule模块，如果为真getter返回ESModule模块的默认导出，否则返回模块本身
  __webpack_require__.n = (module) => {
    var getter =
      module && module.__esModule ? () => module['default'] : () => module;
    console.log(getter);
    __webpack_require__.d(getter, { a: getter });
    console.log(getter);
    return getter;
  };
  
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (
        __webpack_require__.o(definition, key) &&
        !__webpack_require__.o(exports, key)
      ) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key],
        });
      }
    }
  };
  
  __webpack_require__.o = (obj, prop) =>
    Object.prototype.hasOwnProperty.call(obj, prop);
  
  __webpack_require__.r = (exports) => {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
  //本模块的导出模块
  var __webpack_exports__ = {};
  
  ('use strict');
  //1.将导出的模块定义为ESModule模块
  __webpack_require__.r(__webpack_exports__);
  //2.导入对应键值的模块
  var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/title.js');
  //3.使用模块的默认导出
  var _title__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
    _title__WEBPACK_IMPORTED_MODULE_0__,
  );
  
  console.log(_title__WEBPACK_IMPORTED_MODULE_0___default());
  console.log(_title__WEBPACK_IMPORTED_MODULE_0__.title1);
  