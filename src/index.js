import { api } from 'sinuous';

/**
 *
 * @example <caption>Single top-level element.</caption>
 * let view = html(
 *    ['p', {class: 'class-1'},
 *      ['span', 'content'],
 *      ' more content',
 *      ['span', ' and more content']
 *    ]
 * );
 *
 * @example <caption>Multiple top-level elements.</caption>
 * let view = html(
 *    ['p', {class: 'class-1'}, 'foo'],
 *    ['p', {class: 'class-2'}, 'bar']
 * );
 *
 * @example <caption>Components with children.</caption>
 * let component = (props, ...children) => html(
 *    ['p', 'some text'],
 *    ...children
 * );
 * let view = html(
 *    ['div', {class: 'container'},
 *      [component,
 *        ['span', 'some more text'],
 *        ['span', 'and more text']
 *      ],
 *      ['p', 'more content']
 *    ]
 * );
 *
 * @param {...(Array|String|Function)} node
 * @returns {(Node|DocumentFragment)} A DOM node or fragment for injecting into the document.
 */
export function html(node) {
  if (arguments.length > 1) {
    // Handle multiple top-level elements
    let fragment = new DocumentFragment();
    Array.from(arguments).forEach((content) => fragment.append(html(content)));
    return fragment;
  }
  if (Array.isArray(node)) {
    if (is_type(node[0], 'function')) {
      // Handle component
      let [props, children] = normalize_arguments(node);
      return api.h(node[0], props, ...children);
    }
    if (is_type(node[0], 'string')) {
      // Handle css identifier shorthand
      let [props, children] = normalize_arguments(node);
      let [tagAndId, ...classes] = node[0].split('.');
      let [tag, id] = tagAndId.split('#');
      id && (props.id = id);
      classes.length && (props.class = classes.join(' '));
      return api.h(tag, props, ...children);
    }

    return api.h(...node.map((content) => html(content)));
  }

  return node;
}

function normalize_arguments(node) {
  // Clarify which elements of the node array are
  // children and which is the prop object
  let children_start_idx =
    node[1] && is_type(node[1], 'object') && !Array.isArray(node[1]) ? 2 : 1;
  let props = children_start_idx == 2 ? node[1] : {};
  let children = node.slice(children_start_idx).map((child) => html(child));
  return [props, children];
}

let is_type = (item, string) => typeof item == string;
