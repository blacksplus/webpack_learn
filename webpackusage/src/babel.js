// import '@babel/polyfill'

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// import Promise from 'babel-runtime/core-js/promise'; //避免全局污染的局部引入

var sum = (a, b) => a + b;
const promise = new Promise.resolve();
[1,2,3].find(item => item > 1);