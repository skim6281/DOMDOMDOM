var DomNodeCollection = require ('./dom_node_collection');

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

const testing = () => {
  const li = $d('li');
  console.log(li);;
}

$d(testing);

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  funcs.forEach(func => func());
});

window.$d = $d;
