var DomNodeCollection = require ('./dom_node_collection');

function $l(selector) {
  if (typeof selector === "string") {
    const selectorNodeList = document.querySelectorAll(selector);
    const selectorArray = Array.prototype.slice.call(selectorNodeList);
    return new DomNodeCollection(selectorArray);
  } else if (selector instanceof HTMLElement) {
    return new DomNodeCollection([selector]);
  }
}

window.$l = $l;
