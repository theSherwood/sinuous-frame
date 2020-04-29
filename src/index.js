import { api } from 'sinuous';

export function ingot(item, idx) {
  if (arguments.length > 2 || (idx && typeof idx !== 'number')) {
    let fragment = document.createDocumentFragment();
    Array.from(arguments).forEach((content, i) =>
      fragment.append(ingot(content, i))
    );
    return fragment;
  }
  if (Array.isArray(item)) {
    return api.h(...item.map((content, i) => ingot(content, i)));
  } else {
    return item;
  }
}
