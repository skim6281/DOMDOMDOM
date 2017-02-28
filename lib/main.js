var DomNodeCollection = require ('./dom_node_collection');

const funcs = [];
let docReady = false;

function $d(selector) {
  if (typeof selector === "string") {
    const selectorNodeList = document.querySelectorAll(selector);
    const selectorArray = Array.prototype.slice.call(selectorNodeList);
    return new DomNodeCollection(selectorArray);
  } else if (selector instanceof HTMLElement) {
    return new DomNodeCollection([selector]);
  } else if (typeof selector === "function") {
    if (!docReady) {
      funcs.push(selector);
    } else {
      selector();
    }
  }
}

$d.extend = (target, ...args) => {
  return Object.assign(target, ...args);
}

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

  const xhr = new XMLHttpRequest();
  xhr.open(object.method, object.url);

  xhr.onload = () => {
    if (xhr.status === 200) {
      object.success(xhr.response);
    } else {
      object.error(xhr.response);
    }
  }

  xhr.send(object.data);
}

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  funcs.forEach(func => func());
});

window.$d = $d;
