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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// UI Class: Handle UI information\nclass WX {\n    static getInfo() {\n        const city = document.querySelector('#location-search').value;\n        const temp = document.getElementById('temp');\n        const location =  document.getElementById('location');\n        const weather = document.getElementById('weather');\n        const feel = document.getElementById('feel');\n        const humidity =  document.getElementById('humidity')\n        const pressure = document.getElementById('pressure');\n        const high =  document.getElementById('high');\n        const low = document.getElementById('low');\n        \n        if (city !== '') {\n        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=fd750b4ded1cc447604504ec4b1324b7`, {mode: 'cors'})\n        .then(res => {\n            return res.json();\n        })\n        .then(res => {\n            temp.textContent = (((res.main.temp-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);\n            location.textContent = `${res.name}, ${res.sys.country}`\n            weather.textContent =  UI.capitalize(res.weather[0].description);\n            feel.textContent = (((res.main.feels_like-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);\n            humidity.textContent = res.main.humidity + '%'\n            pressure.textContent = res.main.pressure + 'mb'\n            high.textContent = (((res.main.temp_max-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);\n            low.textContent = (((res.main.temp_min-273.15)*1.8)+32).toFixed(1) + String.fromCharCode(176);\n        })\n        } else { \n        console.log(\"NOTHING ENTERED\")\n        }\n    } \n};\n\nclass UI {\n    static capitalize(desc) {\n        const weather = document.getElementById('weather');\n        if(desc.length > 15) {\n            weather.style.fontSize = '3rem';\n        } else {\n            weather.style.fontSize = '4rem';\n        }\n        return desc.charAt(0).toUpperCase() + desc.slice(1);\n    }\n}\n\ndocument.querySelector('.search-btn').addEventListener('click', WX.getInfo);\n\n\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;