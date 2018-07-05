export function slugify(text) {
  return text.toLowerCase().replace(' ', '-');
};

export function deslugify(slug) {
  let arr = slug.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr.join(' ');
}
