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
    ['p', 'some content'],
    ['span', 'other content'],
    'other text node',
    ['p', { id: 'p-id' }, 'more content']
  );
  console.log(view);
  t.equal(view.childNodes[0].textContent, 'text node');
  t.equal(view.childNodes[1].textContent, 'text again');
  t.equal(view.childNodes[2].outerHTML, '<p>some content</p>');
  t.equal(view.childNodes[3].outerHTML, '<span>other content</span>');
  t.equal(view.childNodes[4].textContent, 'other text node');
  t.equal(view.childNodes[5].outerHTML, '<p id="p-id">more content</p>');

  t.end();
});
