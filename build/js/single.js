/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/single.js":
/*!**************************!*\
  !*** ./src/js/single.js ***!
  \**************************/
/***/ (() => {

eval("function drawSingle() {\r\n    let DATA = JSON.parse(localStorage.getItem('data'));\r\n    let bg = `url(img/blog/${DATA.img}-lg.jpg)`, title = DATA.title, author = DATA.author, date = DATA.date;\r\n    let views = parseInt(Math.random() * 10000);\r\n\r\n    document.querySelector('.post_header').style.backgroundImage = bg;\r\n    document.querySelector('.post_info-title').innerText = title;\r\n    document.getElementById('views').innerText = views;\r\n    document.getElementById('author').innerText = author;\r\n    document.getElementById('date').innerText = date;\r\n\r\n}\r\n\r\ndrawSingle();\n\n//# sourceURL=webpack://msproject/./src/js/single.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/single.js"]();
/******/ 	
/******/ })()
;