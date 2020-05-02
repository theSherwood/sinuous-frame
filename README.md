# sinuous-frame

![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-frame/dist/min.js?v=1&compression=gzip&label=gzip&style=flat-square)

An alternative view syntax for [Sinuous](https://github.com/luwes/sinuous). Inspired by [Hiccup](https://github.com/weavejester/hiccup).

## Installation

There are two ways to consume sinuous-frame

### ESM

Run the following inside your project directory:

```
npm install sinuous-frame
```

### CDN

Put this into your HTML:

```html
<script src="https://unpkg.com/sinuous-frame/dist/min.js"></script>
```

Be sure you place it below your [Sinuous](https://github.com/luwes/sinuous) CDN, like this:

```html
<script src="https://unpkg.com/sinuous/dist/all.js"></script>
<script src="https://unpkg.com/sinuous-frame/dist/min.js"></script>
```

This places a `sinuousFrame` property on the `window` object.

## Examples

- [Sinuous Counters](https://codesandbox.io/s/sinuous-counters-lhqjk)
- [Sinuous Simple Todo](https://codesandbox.io/s/sinuous-simple-todo-qj0n3)

## Syntax

Every element is an array of the form `[ <tag>, <attributes>, <children> ]`.

`<tag>` is a string referring to the kind of dom element you want to create, such as `"div"`, and is required. `<attributes>` may be omitted, but if included should be a simple Javascript object of key-value pairs. There may be any number `<children>`, including 0, whether element arrays, strings, constants, observables, etc....

```js
['p', { class: 'counter' }, 1, ' is greater than ', 0, '.'];
```

The syntax for components is similar to element syntax except that the component identifier takes the place of `<tag>`.

```js
[
  Modal,
  { heading_text: 'Welcome' },
  ['p', 'Is this your first time visiting?'],
];
```

## API

###

- [html](#html) ⇒ <code>Node</code> \| <code>DocumentFragment</code>
- [svg](#svg) ⇒ <code>Node</code> \| <code>DocumentFragment</code>

<a name="html"></a>

### html ⇒ <code>Node</code> \| <code>DocumentFragment</code>

**Kind**: global constant  
**Returns**: <code>Node</code> \| <code>DocumentFragment</code> - A DOM node or fragment for injecting into the document.

| Param   | Type                                                               |
| ------- | ------------------------------------------------------------------ |
| ...node | <code>Array</code> \| <code>String</code> \| <code>function</code> |

**Example** _(Single top-level element.)_

```js
let view = html([
  'p',
  { class: 'class-1' },
  ['span', 'content'],
  ' more content',
  ['span', ' and more content'],
]);
```

**Example** _(Multiple top-level elements.)_

```js
let view = html(
  ['p', { class: 'class-1' }, 'foo'],
  ['p', { class: 'class-2' }, 'bar']
);
```

**Example** _(Components with children.)_

```js
let component = (props, ...children) => html(['p', 'some text'], ...children);
let view = html([
  'div',
  { class: 'container' },
  [component, ['span', 'some more text'], ['span', 'and more text']],
  ['p', 'more content'],
]);
```

---

<a name="svg"></a>

### svg ⇒ <code>Node</code> \| <code>DocumentFragment</code>

`svg` works in much the same way `html` does.

**Kind**: global constant  
**Returns**: <code>Node</code> \| <code>DocumentFragment</code> - An SVG DOM node or fragment for injecting into the document.

| Param   | Type                                                               |
| ------- | ------------------------------------------------------------------ |
| ...node | <code>Array</code> \| <code>String</code> \| <code>function</code> |

**Example**

```js
let view = svg(['svg', { class: 'class-1' }, ['circle'], ['rect']]);
```

---

## Contributing, Issues, and Bugs

Feel free to raise any issues or bugs!

## Acknowledgments and Thanks

[Wesley Luyten](https://github.com/luwes)

- Author of [Sinuous](https://github.com/luwes/sinuous)
