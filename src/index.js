import { api } from 'sinuous';

export function ingot(item, idx) {
  if (arguments.length > 2 || (idx && typeof idx !== 'number')) {
    let fragment = document.createDocumentFragment();
    Array.from(arguments).forEach((content) => fragment.append(ingot(content)));
    return fragment;
  }
  if (Array.isArray(item)) {
    if (typeof item[0] === 'function') {
      let children_start_idx =
        item[1] && typeof item[1] === 'object' && !Array.isArray(item) ? 2 : 1;
      let props = children_start_idx == 2 ? item[1] : {};
      return api.h(
        item[0],
        props,
        ...item.slice(children_start_idx).map((child) => ingot(child))
      );
    }

    return api.h(...item.map((content, i) => ingot(content, i)));
  }

  return item;
}
