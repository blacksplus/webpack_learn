'use strict';
var __webpack_modules__ = {
  './src/title.js': (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__,
  ) => {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      default: () => __WEBPACK_DEFAULT_EXPORT__,
      title1: () => title1,
    });
    const title = 'title';

    const __WEBPACK_DEFAULT_EXPORT__ = title;
    const title1 = 'title1';
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

var __webpack_exports__ = {};
//1. 提前就将要导出的模块打上esModule标记，这样webpack在打包的时候会自动将模块转化为es模块。
__webpack_require__.r(__webpack_exports__);
//2. 导出esmodule为对象形式
var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/title.js');

console.log(_title__WEBPACK_IMPORTED_MODULE_0__['default']);
console.log(_title__WEBPACK_IMPORTED_MODULE_0__.title1);
