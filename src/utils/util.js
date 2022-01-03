const modules = import.meta.url;

export const getImgUrl = (name, path) => {
  return new URL(`${path}/assets/${name}.png`, modules).href;
};
