export const getImgUrl = (name, path) => {
  return new URL(`${path}/assets/${name}.png`, import.meta.url).href;
};
