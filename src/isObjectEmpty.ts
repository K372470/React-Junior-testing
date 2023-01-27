export const isObjectEmpty: (obj: any) => boolean = obj => {
  return Object.keys(obj).length === 0;
};
