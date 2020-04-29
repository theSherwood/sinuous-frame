import { ingot } from '../src/index';
import test from 'tape';

test('one element without props or content', (t) => {
  let view = ingot(['p']);
  t.equal(view.outerHTML, '<p></p>');

  t.end();
});

test('one element without props with string content', (t) => {
  let view = ingot(['p', 'here is a string']);
  t.equal(view.outerHTML, '<p>here is a string</p>');

  let view2 = ingot(['p', 'here is a string', ' continued']);
  t.equal(view2.outerHTML, '<p>here is a string continued</p>');

  t.end();
});

test('one element with props with string content', (t) => {
  let view = ingot([
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
  let view = ingot(['p', ['span', 'text content']]);
  t.equal(view.outerHTML, '<p><span>text content</span></p>');

  let view2 = ingot(['p', ['span', ['mark', 'text content']]]);
  t.equal(view2.outerHTML, '<p><span><mark>text content</mark></span></p>');

  t.end();
});

test('nesting elements with multiple children', (t) => {
  let view = ingot(['p', ['span', 'text content'], ['div', 'other content']]);
  t.equal(
    view.outerHTML,
    '<p><span>text content</span><div>other content</div></p>'
  );

  let view2 = ingot([
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
  let view = ingot(
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
  let view = ingot(
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

test('components : top-level', (t) => {
  let component = () => {
    return ingot([
      'div',
      ['p', 'contents,', ' contents!'],
      ['p', 'and more contents'],
    ]);
  };

  let view = ingot(
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

  let view2 = ingot([component]);
  t.equal(
    view2.outerHTML,
    '<div><p>contents, contents!</p><p>and more contents</p></div>'
  );

  t.end();
});

test('components : nested', (t) => {
  let component = () => {
    return ingot([
      'div',
      ['p', 'contents,', ' contents!'],
      ['p', 'and more contents'],
    ]);
  };

  let view = ingot(['main', 'some content', [component]]);
  t.equal(
    view.outerHTML,
    '<main>some content<div><p>contents, contents!</p><p>and more contents</p></div></main>'
  );

  t.end();
});

test('components : without props, with children', (t) => {
  let component = (_, ...children) => {
    return ingot([
      'div',
      ['p', 'contents,', ' contents!'],
      ['p', 'and more contents'],
      ...children,
    ]);
  };

  let view = ingot([
    'main',
    'some content',
    [component, ['p', 'child 1'], 'text child', ['p', 'child 2']],
  ]);
  t.equal(
    view.outerHTML,
    '<main>some content<div><p>contents, contents!</p><p>and more contents</p><p>child 1</p>text child<p>child 2</p></div></main>'
  );

  let view2 = ingot([
    'main',
    'some content',
    [
      component,
      { foo: 'bar' },
      ['p', 'child 1'],
      'text child',
      ['p', 'child 2'],
    ],
  ]);
  t.equal(
    view2.outerHTML,
    '<main>some content<div><p>contents, contents!</p><p>and more contents</p><p>child 1</p>text child<p>child 2</p></div></main>'
  );

  t.end();
});
