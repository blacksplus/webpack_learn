
var __webpack_modules__ = {};

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

__webpack_require__.m = __webpack_modules__;

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

__webpack_require__.f = {};

__webpack_require__.e = (chunkId) => {
  return Promise.all(
    //__webpack_require__.f定义了一个j属性
    Object.keys(__webpack_require__.f).reduce((promises, key) => {
      //2.调用j函数，传入chunkId和promises数组
      __webpack_require__.f[key](chunkId, promises);
      return promises;
    }, []),
  );
};

__webpack_require__.u = (chunkId) => {
  return '' + chunkId + '.js';
};

__webpack_require__.g = (function () {
  if (typeof globalThis === 'object') return globalThis;
  try {
    return this || new Function('return this')();
  } catch (e) {
    if (typeof window === 'object') return window;
  }
})();

__webpack_require__.o = (obj, prop) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

var inProgress = {};
var dataWebpackPrefix = 'code:';

__webpack_require__.l = (url, done, key, chunkId) => {
  //防止重复加载
  if (inProgress[url]) {
    inProgress[url].push(done);
    return;
  }
  //10.通过jsonp方式加载chunk
  var script, needAttach;
  if (key !== undefined) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i];
      if (
        s.getAttribute('src') == url ||
        s.getAttribute('data-webpack') == dataWebpackPrefix + key
      ) {
        script = s;
        break;
      }
    }
  }
  if (!script) {
    needAttach = true;
    script = document.createElement('script');

    script.charset = 'utf-8';
    script.timeout = 120;
    if (__webpack_require__.nc) {
      script.setAttribute('nonce', __webpack_require__.nc);
    }
    script.setAttribute('data-webpack', dataWebpackPrefix + key);

    script.src = url;
  }
  inProgress[url] = [done];
  //11.设置超时时间和定义成功加载和失败加载调用的函数
  var onScriptComplete = (prev, event) => {
    script.onerror = script.onload = null;
    clearTimeout(timeout);
    var doneFns = inProgress[url];
    delete inProgress[url];
    script.parentNode && script.parentNode.removeChild(script);
    doneFns && doneFns.forEach((fn) => fn(event));
    if (prev) return prev(event);
  };
  var timeout = setTimeout(
    onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }),
    120000,
  );
  script.onerror = onScriptComplete.bind(null, script.onerror);
  script.onload = onScriptComplete.bind(null, script.onload);
  needAttach && document.head.appendChild(script);
};

__webpack_require__.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  }
  Object.defineProperty(exports, '__esModule', { value: true });
};

var scriptUrl;
if (__webpack_require__.g.importScripts)
  scriptUrl = __webpack_require__.g.location + '';
var document = __webpack_require__.g.document;
if (!scriptUrl && document) {
  if (
    document.currentScript &&
    document.currentScript.tagName.toUpperCase() === 'SCRIPT'
  )
    scriptUrl = document.currentScript.src;
  if (!scriptUrl) {
    var scripts = document.getElementsByTagName('script');
    if (scripts.length) {
      var i = scripts.length - 1;
      while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl)))
        scriptUrl = scripts[i--].src;
    }
  }
}

if (!scriptUrl)
  throw new Error('Automatic publicPath is not supported in this browser');
scriptUrl = scriptUrl
  .replace(/#.*$/, '')
  .replace(/\?.*$/, '')
  .replace(/\/[^\/]+$/, '/');
__webpack_require__.p = scriptUrl;
//用来存储加载或者加载中的模块
//当对应的键值被置为0时代表该chunk已经被加载，无需再次加载
//undefined代表该chunk未加载，null代表该chunk预加载
//[resolve, reject, promise]代表该chunk正在加载中
var installedChunks = {
  main: 0,
};
//
__webpack_require__.f.j = (chunkId, promises) => {
    //3.判断是否有该键值对应的chunk，如果有返回对应的键值的值，否则返回undefined
  var installedChunkData = __webpack_require__.o(installedChunks, chunkId)
    ? installedChunks[chunkId]
    : undefined;
  //4.如果不为0，代表该chunk还未加载完成
  if (installedChunkData !== 0) {
    //5.如果正在加载中，就将promise添加到promises数组中
    if (installedChunkData) {
      promises.push(installedChunkData[2]);
    } else {
      if (true) {
        //6.如果还没加载，就创建一个promise，并将其添加到installedChunks中代表该chunk正在加载中，并将promise本身也添加进去，同时也加入到promises数组中
        var promise = new Promise(
          (resolve, reject) =>
            (installedChunkData = installedChunks[chunkId] = [resolve, reject]),
        );
        promises.push((installedChunkData[2] = promise));
        //7.开始加载chunk
        //8.拼接src_title_js.js加载地址
        var url = __webpack_require__.p + __webpack_require__.u(chunkId);

        var error = new Error();
        //加载完成后的回调函数
        var loadingEnded = (event) => {
          if (__webpack_require__.o(installedChunks, chunkId)) {
            installedChunkData = installedChunks[chunkId];
            if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
            //加载失败调用reject函数
            if (installedChunkData) {
              var errorType =
                event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message =
                'Loading chunk ' +
                chunkId +
                ' failed.\n(' +
                errorType +
                ': ' +
                realSrc +
                ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              installedChunkData[1](error);
            }
          }
        };
        //9.调用l()方法加载chunk
        __webpack_require__.l(url, loadingEnded, 'chunk-' + chunkId, chunkId);
      }
    }
  }
};

var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
  var [chunkIds, moreModules, runtime] = data;

  var moduleId,
    chunkId,
    i = 0;
  //12.将jsonp加载好的chunk添加
  if (chunkIds.some((id) => installedChunks[id] !== 0)) {
    for (moduleId in moreModules) {
      if (__webpack_require__.o(moreModules, moduleId)) {
        __webpack_require__.m[moduleId] = moreModules[moduleId];
      }
    }
    if (runtime) var result = runtime(__webpack_require__);
  }
  //处理父级模块加载的回调：在动态加载模块（chunks）时，可能会有一个父级的加载函数（parentChunkLoadingFunction），它用于处理当前模块加载的后续操作。
  //确保模块依赖的处理：通过检查 parentChunkLoadingFunction，代码确保了在加载当前模块时，如果有父级的处理逻辑需要调用，那么就顺利进行。这种设计使得模块的加载和依赖管理更加灵活和健壮，有助于模块间的协作和依赖解析
  if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
  //13.执行promise的rosolve函数
  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i];
    if (
      __webpack_require__.o(installedChunks, chunkId) &&
      installedChunks[chunkId]
    ) {
      installedChunks[chunkId][0]();
    }
    //14.将chunkId对应的键值置为0，代表该chunk已经加载完成
    installedChunks[chunkId] = 0;
  }
};
//这段代码的主要功能是管理动态加载的模块（chunks）。它通过维护一个全局数组 webpackChunkcode 来记录已加载的和待加载的模块，并在数组中每次新增模块时，自动调用 webpackJsonpCallback 进行相应的处理。这个模块化管理机制确保了模块能够按需加载，并保持了代码的高效性与结构的清晰度。
//每次加载完jsonp后，chunk里有一个全局管理的push方法，因此会调用
var chunkLoadingGlobal = (self['webpackChunkcode'] =
  self['webpackChunkcode'] || []);
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
chunkLoadingGlobal.push = webpackJsonpCallback.bind(
  null,
  chunkLoadingGlobal.push.bind(chunkLoadingGlobal),
);

var __webpack_exports__ = {};

// 1.通过调用.e()方法，动态加载src/title.js文件
__webpack_require__
  .e('src_title_js')
  .then(__webpack_require__.bind(__webpack_require__, './src/title.js'))
  .then((module) => {
    console.log(module.default);
  });
