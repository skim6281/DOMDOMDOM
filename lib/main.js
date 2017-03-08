const DomNodeCollection = require ('./dom_node_collection');

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
      if (object.dataType === 'jsonp') {
        return resolve(JSON.parse(xhr.response));
      } else {
        return resolve(xhr.response);
      }
    } else {
      return reject(xhr.response);
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
    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
  };
  object = $d.extend(defaults, object);
  object.method = object.method.toUpperCase();

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(object.method, object.url);
    xhr.setRequestHeader('Content-Type', options.contentType);
    xhr.onload = () => {
      xhrLoad(xhr, object, resolve, reject);
    }
    xhr.onerror = () => reject(xhr.response);
    xhr.send(JSON.stringify(object.data));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  funcs.forEach(func => func());
});

window.$d = $d;
