/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/images/test.png?sizes[]=300,sizes[]=600,sizes[]=1024":
/*!******************************************************************!*\
  !*** ./src/images/test.png?sizes[]=300,sizes[]=600,sizes[]=1024 ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = {
        srcSet: __webpack_require__.p + "bc1117d339215266-300.png"+" 300w"+","+__webpack_require__.p + "b2eb7aba9915b911-600.png"+" 600w"+","+__webpack_require__.p + "d1bfac0f48a8f63e-1024.png"+" 1024w",
        images: [{path: __webpack_require__.p + "bc1117d339215266-300.png",width: 300,height: 175},{path: __webpack_require__.p + "b2eb7aba9915b911-600.png",width: 600,height: 350},{path: __webpack_require__.p + "d1bfac0f48a8f63e-1024.png",width: 1024,height: 598}],
        src: __webpack_require__.p + "d1bfac0f48a8f63e-1024.png",
        toString: function(){return __webpack_require__.p + "d1bfac0f48a8f63e-1024.png"},
        
        width: 1024,
        height: 598
      }

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";
/*!********************!*\
  !*** ./src/img.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _images_test_png_sizes_300_sizes_600_sizes_1024__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/test.png?sizes[]=300,sizes[]=600,sizes[]=1024 */ "./src/images/test.png?sizes[]=300,sizes[]=600,sizes[]=1024");
/* harmony import */ var _images_test_png_sizes_300_sizes_600_sizes_1024__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_test_png_sizes_300_sizes_600_sizes_1024__WEBPACK_IMPORTED_MODULE_0__);
// import test from './images/test.png'
// console.log(test)
// const img = new Image()
// img.src = test
// document.body.appendChild(img)

//使用响应式图片

console.log((_images_test_png_sizes_300_sizes_600_sizes_1024__WEBPACK_IMPORTED_MODULE_0___default()));
var img = new Image();
img.srcset = (_images_test_png_sizes_300_sizes_600_sizes_1024__WEBPACK_IMPORTED_MODULE_0___default().srcSet);
img.sizes = '(min-width: 1024px) 1024px, 100vw'; //视口宽度大于或等于 1024 像素时，浏览器将会使用宽度为 1024 像素的图像 小于 1024 像素时，图像将会使用 100% 的视口宽度（即全屏宽度）进行显示。
document.body.appendChild(img);
}();
/******/ })()
;