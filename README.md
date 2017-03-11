# DOMDOMDOM

Inspired by jQuery, DOMDOMDOM is a JavaScript library that uses native DOM to make HTML document traversal, manipulation, event handling, and Ajax easy to use.

[Demo](https://samuelkim.us/DOMDOMDOM)

## API
#### $d
  Return a `DomNodeCollection` of matching `HTML` elements.

  `$d` can accept a string containing a CSS selector which is used to match a set of elements.

  `$d` can also accept an `HTMLElement` which is wrapped in a `DomNodeCollection` object.

  `$d` also accepts a callback, which is executed when the DOM is ready.

#### $d.extend
  Merge contents of two or more objects together into the first object.
#### $d.ajax
  Perform an asynchronous HTTP request.


### DomNodeCollection API
##### `html`
  If no arguments are given, it gets the HTML contents of the first element in the set of matched elements.  If a string is given, it sets the HTML contents of every matched element to that string.
##### `empty`
  Remove child nodes of the set of matched elements.
##### `append`
  Insert content to the end of each element.
##### `attr`
  If one argument given, it gets the value of an attribute for the first element in the set of matched elements.  If two arguments given, it sets one or more attributes for every matched element.
##### `addClass`
  Adds the specified class to each matched element.
##### `removeClass`
  Removes specified class from each matched element.
##### `children`
  Get children of each matched element.
##### `parent`
  Get the parent of each matched element.
##### `find`
  Get descendants of each matched elements filtered by selector.
##### `remove`
  Remove the set of matched elements from the DOM.
##### `on`
  Add an event handler for one or more events to the selected elements.
##### `off`
  Remove an event handler.
