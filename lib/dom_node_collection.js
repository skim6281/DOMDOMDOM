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
