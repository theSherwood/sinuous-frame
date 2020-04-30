# sinuous-frame

![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-frame/dist/min.js?v=1&compression=gzip&label=gzip&style=flat-square)

An alternative view syntax for [Sinuous](https://github.com/luwes/sinuous). Inspired by Hiccup.

## Installation

There are two ways to consume sinuous-frame

### ESM

Run the following inside your project directory:

```
npm install sinuous-frame
```

<!-- [Example CodeSandbox](https://codesandbox.io/s/sinuous-frame-esm-t3swm) -->

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

<!-- [Example CodeSandbox](https://codesandbox.io/s/sinuous-frame-cdn-lupwk) -->

## API

<a name="html"></a>

### html(...node) ⇒ <code>Node</code> \| <code>DocumentFragment</code>

**Kind**: global function  
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

## Contributing, Issues, and Bugs

Feel free to raise any issues or bugs!

## Acknowledgments and Thanks

[Wesley Luyten](https://github.com/luwes)

- Author of [Sinuous](https://github.com/luwes/sinuous)
