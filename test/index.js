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
  t.end();
});

test('one element without props with string contents', (t) => {
  let view = ingot(['p', 'here is a string', ' continued']);

  t.equal(view.outerHTML, '<p>here is a string continued</p>');
  t.end();
});

test('one element with class with string contents', (t) => {
  let view = ingot([
    'p',
    { class: 'a-class' },
    'here is a string',
    ' continued',
  ]);

  t.equal(view.outerHTML, '<p class="a-class">here is a string continued</p>');
  t.end();
});
