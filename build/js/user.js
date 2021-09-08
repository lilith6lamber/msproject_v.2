/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/orders.js":
/*!**********************************!*\
  !*** ./src/js/modules/orders.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkStatus\": () => (/* binding */ checkStatus)\n/* harmony export */ });\nfunction checkStatus() {\r\n    const orderPayment = document.querySelectorAll('.orderPayment'),\r\n        orderStatus = document.querySelectorAll('.orderStatus');\r\n\r\n    const stage01 = '#0060ff',\r\n        stage02 = '#f5c002',\r\n        stage03 = '#358521';\r\n\r\n    if (orderPayment && orderStatus) {\r\n        orderPayment.forEach(el => {\r\n            switch (el.innerText) {\r\n                case 'n/r':\r\n                    el.style.color = stage01;\r\n                    break;\r\n                case 'processing':\r\n                    el.style.color = stage02;\r\n                    break;\r\n                case 'received':\r\n                    el.style.color = stage03;\r\n                    break;\r\n                default:\r\n                    el.style.color = '#262626';\r\n            }\r\n        });\r\n\r\n        orderStatus.forEach(el => {\r\n            switch (el.innerText) {\r\n                case 'new':\r\n                    el.style.color = stage01;\r\n                    break;\r\n                case 'processing':\r\n                    el.style.color = stage02;\r\n                    break;\r\n                case 'complete':\r\n                    el.style.color = stage03;\r\n                    break;\r\n                default:\r\n                    el.style.color = '#262626';\r\n            }\r\n        });\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://msproject/./src/js/modules/orders.js?");

/***/ }),

/***/ "./src/js/user.js":
/*!************************!*\
  !*** ./src/js/user.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_orders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/orders */ \"./src/js/modules/orders.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    (0,_modules_orders__WEBPACK_IMPORTED_MODULE_0__.checkStatus)();\r\n})\n\n//# sourceURL=webpack://msproject/./src/js/user.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/user.js");
/******/ 	
/******/ })()
;