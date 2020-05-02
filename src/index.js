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
export const html = create_node_builder(api.h);

/**
 * `svg` works in much the same way `html` does.
 * 
 * @example
 * let view = svg(
 *    ['svg', {class: 'class-1'},
 *      ['circle'],
 *      ['rect']
 *    ]
 * );
 *
 * @param {...(Array|String|Function)} node
 * @returns {(Node|DocumentFragment)} An SVG DOM node or fragment for injecting into the document.
 */
export const svg = create_node_builder(api.hs);

function create_node_builder(h) {
  return function build_nodes(node) {
    if (arguments.length > 1) {
      // Handle multiple top-level elements
      let fragment = new DocumentFragment();
      Array.from(arguments).forEach((content) =>
        fragment.append(build_nodes(content))
      );
      return fragment;
    }
    if (Array.isArray(node)) {
      if (is_type(node[0], 'function')) {
        // Handle component
        let [props, children] = normalize_arguments(node, build_nodes);
        return h(node[0], props, ...children);
      }
      if (is_type(node[0], 'string')) {
        // Handle css identifier shorthand
        let [props, children] = normalize_arguments(node, build_nodes);
        let [tagAndId, ...classes] = node[0].split('.');
        let [tag, id] = tagAndId.split('#');
        id && (props.id = id);
        classes.length && (props.class = classes.join(' '));
        return h(tag, props, ...children);
      }

      return h(...node.map((content) => build_nodes(content)));
    }

    return node;
  };
}

function normalize_arguments(node, node_builder) {
  // Clarify which elements of the node array are
  // children and which is the prop object
  let children_start_idx =
    node[1] && is_type(node[1], 'object') && !Array.isArray(node[1]) ? 2 : 1;
  let props = children_start_idx == 2 ? node[1] : {};
  let children = node
    .slice(children_start_idx)
    .map((child) => node_builder(child));
  return [props, children];
}

let is_type = (item, string) => typeof item == string;
