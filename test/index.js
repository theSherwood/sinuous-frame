import { html, svg } from '../src/index';
import test from 'tape';

/* --------- HTML --------- */

test('one element without props or content', (t) => {
  let view = html(['p']);
  t.equal(view.outerHTML, '<p></p>');

  t.end();
});

test('one element without props with string content', (t) => {
  let view = html(['p', 'here is a string']);
  t.equal(view.outerHTML, '<p>here is a string</p>');

  let view2 = html(['p', 'here is a string', ' continued']);
  t.equal(view2.outerHTML, '<p>here is a string continued</p>');

  t.end();
});

test('one element with props with string content', (t) => {
  let view = html([
    'p',
    { class: 'a-class', id: 'some-id' },
    'here is a string',
    ' continued',
  ]);
  t.equal(
    view.outerHTML,
    '<p class="a-class" id="some-id">here is a string continued</p>'
  );

  t.end();
});

test('nesting elements', (t) => {
  let view = html(['p', ['span', 'text content']]);
  t.equal(view.outerHTML, '<p><span>text content</span></p>');

  let view2 = html(['p', ['span', ['mark', 'text content']]]);
  t.equal(view2.outerHTML, '<p><span><mark>text content</mark></span></p>');

  t.end();
});

test('nesting elements with multiple children', (t) => {
  let view = html(['p', ['span', 'text content'], ['div', 'other content']]);
  t.equal(
    view.outerHTML,
    '<p><span>text content</span><div>other content</div></p>'
  );

  let view2 = html([
    'p',
    { class: 'p-class' },
    ['span', { id: 'span-id' }, 'text content'],
    ['div', { class: 'div-class' }, 'other content'],
  ]);
  t.equal(
    view2.outerHTML,
    '<p class="p-class"><span id="span-id">text content</span><div class="div-class">other content</div></p>'
  );

  t.end();
});

test('multiple top-level elements', (t) => {
  let view = html(
    ['p', 'some content'],
    ['span', 'other content'],
    ['p', { id: 'p-id' }, 'more content']
  );
  t.equal(view.childNodes[0].outerHTML, '<p>some content</p>');
  t.equal(view.childNodes[1].outerHTML, '<span>other content</span>');
  t.equal(view.childNodes[2].outerHTML, '<p id="p-id">more content</p>');

  t.end();
});

test('multiple top-level elements with text nodes', (t) => {
  let view = html(
    'text node',
    'text again',
    ['p', ['span', 'some content']],
    ['span', 'other content'],
    'other text node',
    ['p', { id: 'p-id' }, 'more content']
  );

  t.equal(view.childNodes[0].textContent, 'text node');
  t.equal(view.childNodes[1].textContent, 'text again');
  t.equal(view.childNodes[2].outerHTML, '<p><span>some content</span></p>');
  t.equal(view.childNodes[3].outerHTML, '<span>other content</span>');
  t.equal(view.childNodes[4].textContent, 'other text node');
  t.equal(view.childNodes[5].outerHTML, '<p id="p-id">more content</p>');

  t.end();
});

test('identifier shorthand', (t) => {
  let view = html(['p#id.class-1.class-2']);
  t.equal(view.outerHTML, '<p id="id" class="class-1 class-2"></p>');

  let view2 = html(['p#id']);
  t.equal(view2.outerHTML, '<p id="id"></p>');

  let view3 = html(['p.class-1.class-2']);
  t.equal(view3.outerHTML, '<p class="class-1 class-2"></p>');

  t.end();
});

test('components : top-level', (t) => {
  let component = () => {
    return html([
      'div',
      ['p', 'contents,', ' contents!'],
      ['p', 'and more contents'],
    ]);
  };

  let view = html(
    ['p', 'some content'],
    [component],
    ['span', 'other content']
  );
  t.equal(view.childNodes[0].outerHTML, '<p>some content</p>');
  t.equal(
    view.childNodes[1].outerHTML,
    '<div><p>contents, contents!</p><p>and more contents</p></div>'
  );
  t.equal(view.childNodes[2].outerHTML, '<span>other content</span>');

  let view2 = html([component]);
  t.equal(
    view2.outerHTML,
    '<div><p>contents, contents!</p><p>and more contents</p></div>'
  );

  t.end();
});

test('components : nested', (t) => {
  // single top-level element
  let component = () => {
    return html([
      'div',
      ['p', 'contents,', ' contents!'],
      ['p', 'and more contents'],
    ]);
  };

  let view = html(['main', 'some content', [component]]);
  t.equal(
    view.outerHTML,
    '<main>some content<div><p>contents, contents!</p><p>and more contents</p></div></main>'
  );

  // multiple top-level elements
  let component2 = () => {
    return html(
      ['div', ['p', 'contents,', ' contents!'], ['p', 'and more contents']],
      ['p', 'second element']
    );
  };

  let view2 = html(['main', 'some content', [component2]]);
  t.equal(
    view2.outerHTML,
    '<main>some content<div><p>contents, contents!</p><p>and more contents</p></div><p>second element</p></main>'
  );

  t.end();
});

test('components : with arguments', (t) => {
  let component = (_, ...children) => {
    return html([
      'div',
      ['p', 'contents,', ' contents!'],
      ['p', 'and more contents'],
      ...children,
    ]);
  };

  let view = html([
    'main',
    'some content',
    [component, ['p', 'child 1'], 'text child', ['p', 'child 2']],
  ]);
  t.equal(
    view.outerHTML,
    '<main>some content<div><p>contents, contents!</p><p>and more contents</p><p>child 1</p>text child<p>child 2</p></div></main>'
  );

  let component2 = ({ foo }, ...children) => {
    return html([
      'div',
      ['p', 'contents,', ' contents! ', foo],
      ['p', 'and more contents'],
      ...children,
    ]);
  };

  let view2 = html([
    'main',
    'some content',
    [
      component2,
      { foo: 'bar' },
      ['p', 'child 1'],
      'text child',
      ['p', 'child 2'],
    ],
  ]);
  t.equal(
    view2.outerHTML,
    '<main>some content<div><p>contents, contents! bar</p><p>and more contents</p><p>child 1</p>text child<p>child 2</p></div></main>'
  );

  t.end();
});

/* --------- SVG --------- */

test('one svg without props or content', (t) => {
  let view = svg(['svg']);
  t.equal(view.outerHTML, '<svg></svg>');

  t.end();
});

test('nesting svg with multiple children', (t) => {
  let view = svg(['svg', ['circle'], ['ellipse']]);
  t.equal(view.outerHTML, '<svg><circle></circle><ellipse></ellipse></svg>');

  let view2 = svg([
    'svg',
    { class: 'svg-class' },
    ['circle', { id: 'circle-id' }],
    ['ellipse', { class: 'ellipse-class' }],
  ]);
  t.equal(
    view2.outerHTML,
    '<svg class="svg-class"><circle id="circle-id"></circle><ellipse class="ellipse-class"></ellipse></svg>'
  );

  t.end();
});

// TODO: add more svg tests
