/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DomNodeCollection = __webpack_require__ (1);
	
	const funcs = [];
	let documentReady = false;
	
	const handleReady = (func) => {
	  if (!documentReady) {
	    funcs.push(func);
	  } else {
	    func();
	  }
	};
	
	function $d(selector) {
	  if (typeof selector === "string") {
	    const selectorNodeList = document.querySelectorAll(selector);
	    const selectorArray = Array.prototype.slice.call(selectorNodeList);
	    return new DomNodeCollection(selectorArray);
	  } else if (selector instanceof HTMLElement) {
	    return new DomNodeCollection([selector]);
	  } else if (typeof selector === "function") {
	    handleReady(selector);
	  }
	}
	
	$d.extend = (target, ...args) => {
	  return Object.assign(target, ...args);
	}
	
	const xhrLoad = (xhr, object, resolve, reject) => {
	  xhr.onload = () => {
	    if (xhr.status >= 200 && xhr.status < 300) {
	      if (object.dataType === 'jsonp'){
	        resolve(JSON.parse(xhr.response));
	      } else {
	        resolve(xhr.response);
	      }
	    } else {
	      reject(xhr.response);
	    }
	  }
	};
	
	$d.ajax = (object) => {
	  const defaults = {
	    success: () => {},
	    error: () => {},
	    url: "",
	    method: "GET",
	    data: {},
	    dataType: 'jsonp',
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
	  };
	  object = $d.extend(defaults, object);
	  object.method = object.method.toUpperCase();
	
	  const promise = new Promise((resolve, reject) => {
	    const xhr = new XMLHttpRequest();
	    xhr.open(object.method, object.url);
	    xhrLoad(xhr, object, resolve, reject);
	    xhr.onerror = () => reject(xhr.response);
	    xhr.send(JSON.stringify(object.data));
	  });
	
	  return promise.then(response => {
	    return object.success(response);
	  }, object.error);
	}
	
	document.addEventListener('DOMContentLoaded', () => {
	  documentReady = true;
	  funcs.forEach(func => func());
	});
	
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
	
	  appendCollection(argument) {
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
	
	  append(argument) {
	    if (typeof argument === "string") {
	      this.HTMLElements.forEach(el => el.innerHTML += argument);
	    } else if (argument instanceof HTMLElement) {
	      this.HTMLElements.forEach(el => {
	        el.innerHTML += argument.outerHTML;
	      });
	    } else if (argument instanceof DomNodeCollection) {
	      this.appendCollection(argument);
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
	    this.HTMLElements.forEach((element) => element.classList.add(className));
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
	  }
	
	  on(action, eventHandler) {
	    this.HTMLElements.forEach(element => {
	      if (element[`dom-${action}`] === undefined) {
	        element[`dom-${action}`] = [eventHandler];
	      } else {
	        element[`dom-${action}`].push(eventHandler);
	      }
	
	      element.addEventListener(action, eventHandler);
	    });
	  }
	
	  off(action) {
	    this.HTMLElements.forEach(element => {
	      if (element[`dom-${action}`]) {
	        element[`dom-${action}`].forEach(eventHandler => {
	          element.removeEventListener(action, eventHandler);
	        });
	      }
	      element[`dom-${action}`] = [];
	    });
	  }
	
	}
	
	module.exports = DomNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=domdomdom.js.map