/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DomNodeCollection = __webpack_require__ (1);

	function $d(selector) {
	  const funcs = [];
	  if (typeof selector === "string") {
	    const selectorNodeList = document.querySelectorAll(selector);
	    const selectorArray = Array.prototype.slice.call(selectorNodeList);
	    return new DomNodeCollection(selectorArray);
	  } else if (selector instanceof HTMLElement) {
	    return new DomNodeCollection([selector]);
	  } else if (typeof selector === "function") {
	    if (document.readyState  === 'complete') {
	      selector();
	    }
	    let stateCheck = setInterval( () => {
	      if (document.readyState === 'complete') {
	        clearInterval(stateCheck);
	        funcs.forEach(func => func());
	      }
	      funcs.push(selector);
	    }, 100);
	  }
	}

	$d.extend = (target, ...args) => {
	  return Object.assign(target, ...args);
	}

	$d.ajax = (object) => {
	  // const default = {
	  //   success: "",
	  //   error: "",
	  //   url: "",
	  //   method: "",
	  //   data: null,
	  //   contentType: "",
	  // };
	}

	// $.ajax({
	//      type: 'GET',
	//      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
	//      success(data) {
	//        console.log("We have your weather!")
	//        console.log(data);
	//      },
	//      error() {
	//        console.error("An error occurred.");
	//      },
	//   });

	window.$d = $d;


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DomNodeCollection {
	  constructor(elements) {
	    this.HTMLElements = elements;
	  }

	  html(inner) {
	    if (typeof inner === "string") {
	      this.HTMLElements.forEach(element => {
	        element.innerHTML = inner;
	      });
	    } else {
	      return this.HTMLElements[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append(argument) {
	    if (typeof argument === "string") {
	      element.innerHTML += argument;
	    } else if (argument instanceof HTMLElement) {
	      this.HTMLElements.forEach(element => {
	        element.innerHTML += argument.outerHTML;
	      });
	    } else if (argument instanceof DomNodeCollection) {
	      argument.HTMLElements.forEach(argHTMLEl => {
	        this.HTMLElements.forEach((htmlEl, ind) => {
	          if (ind === 0) {
	            htmlEl.appendChild(argHTMLEl);
	          } else {
	            htmlEl.innerHTML += argHTMLEl.outerHTML;
	          }
	        });
	      });
	    }
	  }

	  attr(attribute, value) {
	    if (value) {
	      this.HTMLElements.forEach((element) => {
	        element.setAttribute(attribute, value);
	      });
	    } else {
	      return this.HTMLElements[0].getAttribute(attribute);
	    }
	  }

	  addClass(className) {
	    this.attr("class", className);
	  }

	  removeClass(className) {
	    this.HTMLElements.forEach(element => {
	      if (element.getAttribute("class") === className) {
	        element.removeAttribute("class");
	      }
	    });
	  }

	  children() {
	    let arrayofChildren = [];

	    this.HTMLElements.forEach(element => {
	      arrayofChildren = arrayofChildren.concat(Array.prototype.slice.call(element.children));
	    });

	    return new DomNodeCollection(arrayofChildren);
	  }

	  parent() {
	    let arrayofParents = [];

	    this.HTMLElements.forEach(element => {
	      arrayofParents.push(element.parentNode);
	    });

	    return new DomNodeCollection(arrayofParents);
	  }

	  find(selector) {
	    let arrayofElements = [];

	    this.HTMLElements.forEach(element => {
	      arrayofElements = arrayofElements.concat(Array.prototype.slice.call(element.querySelectorAll(selector)));
	    });

	    return new DomNodeCollection(arrayofElements);
	  }

	  remove() {
	    this.HTMLElements.forEach(element => {
	      element.remove();
	    });

	    return;
	  }

	  on(action, eventHandler) {
	    this.HTMLElements.forEach(element => {
	      if (element[`${action}`] === undefined) {
	        element[`${action}`] = [eventHandler];
	      } else {
	        element[`${action}`].push(eventHandler);
	      }

	      element.addEventListener(action, eventHandler);
	    });
	  }

	  off(action) {
	    this.HTMLElements.forEach(element => {
	      element[`${action}`].forEach(eventHandler => {
	        element.removeEventListener(action, eventHandler);
	      });
	    });
	  }

	}

	module.exports = DomNodeCollection;


/***/ }
/******/ ]);