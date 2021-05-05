import ReactHtmlParser from "react-html-parser";

export const sliceString = (str, size) => {
  if (str && size) {
    if (str.length <= size) {
      return str;
    }
    return str.slice(0, size) + '...';
  }
  return str;
}

export const formateName = (str) => {
  if (!str) return '';
  let strArray = str.split(' ');
  return strArray
          .map(s => s.slice(0, 1).toUpperCase())
          .join('')
}