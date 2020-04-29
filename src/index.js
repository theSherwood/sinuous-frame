import { api } from 'sinuous';

export function ingot(item, idx) {
  if (arguments.length > 2 || (idx && !is_type(idx, 'number'))) {
    let fragment = document.createDocumentFragment();
    Array.from(arguments).forEach((content) => fragment.append(ingot(content)));
    return fragment;
  }
  if (Array.isArray(item)) {
    if (is_type(item[0], 'function')) {
      let [props, children] = normalize_arguments(item);
      return api.h(item[0], props, ...children);
    }
    if (is_type(item[0], 'string')) {
      let [props, children] = normalize_arguments(item);
      let [tagAndId, ...classes] = item[0].split('.');
      let [tag, id] = tagAndId.split('#');
      id && (props.id = id);
      classes.length && (props.class = classes.join(' '));
      return api.h(tag, props, ...children);
    }

    return api.h(...item.map((content, i) => ingot(content, i)));
  }

  return item;
}

function normalize_arguments(item) {
  let children_start_idx =
    item[1] && is_type(item[1], 'object') && !Array.isArray(item[1]) ? 2 : 1;
  let props = children_start_idx == 2 ? item[1] : {};
  let children = item.slice(children_start_idx).map((child) => ingot(child));
  return [props, children];
}

let is_type = (item, string) => typeof item == string;
