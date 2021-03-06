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
