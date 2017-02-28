var DomNodeCollection = require ('./dom_node_collection');

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
