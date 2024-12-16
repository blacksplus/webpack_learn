//相比commjstocommjs，这里引入es时，会在require函数中新加三个方法：__webpack_require__.d、__webpack_require__.o、__webpack_require__.r。
//__webpack_require__.d：用于定义模块的属性，如exports、__esModule等。
//__webpack_require__.o：用于判断对象是否具有某个属性。
//__webpack_require__.r：用于将导出对象标记为esModule。
//
var __webpack_modules__ = {
    './src/title.js': (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__,
    ) => {
      'use strict';
      //3.将传入的module.exports标记为esModule
      __webpack_require__.r(__webpack_exports__);
      //4.定义模块的属性
      __webpack_require__.d(__webpack_exports__, {
        default: () => __WEBPACK_DEFAULT_EXPORT__,
        title1: () => title1,
      });
      const title = 'title';
      //9.导出模块的默认属性为title
      const __WEBPACK_DEFAULT_EXPORT__ = title;
      const title1 = 'title1';
    },
  };
  
  var __webpack_module_cache__ = {};
  
  function __webpack_require__(moduleId) {
    //1.判断模块是否已经加载过
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
  
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    //2.调用键值对应的函数
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  
    return module.exports;
  }
  
  __webpack_require__.d = (exports, definition) => {
    //5.遍历传入的定义属性对象
    for (var key in definition) {
      //6.防止重复定义属性
      if (
        __webpack_require__.o(definition, key) &&
        !__webpack_require__.o(exports, key)
      ) {
        //7.将属性定义到exports对象上，并标记为enumerable，可枚举，并且只读
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
  
  const title = __webpack_require__('./src/title.js');
  const { title1 } = __webpack_require__('./src/title.js');
  console.log(title);
  console.log(title1);
  