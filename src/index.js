import { api } from 'sinuous';

// export function ingot(array) {
//   return api.h(...array)
// }

export function ingot(item) {
  if (Array.isArray(item)) {
    return api.h(...item.map((content) => ingot(content)));
  } else {
    return item;
  }
}
