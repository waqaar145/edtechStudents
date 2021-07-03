export const prevNextFinder = (array, key, string) => {
  let prev = null;
  let next = null;
  if (array.length === 1) {
    return {
      prev,
      next,
    };
  }
  if (array.length !== 0) {
    let index = null;
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === string) {
        index = i;
        break;
      }
    }
    if (index === 0) {
      prev = null;
      next = array[index + 1];
    } else if (index === array.length - 1) {
      prev = array[index - 1];
      next = null;
    } else {
      prev = array[index - 1];
      next = array[index + 1];
    }

    return {
      prev,
      next,
    };
  } else {
    return {
      prev: null,
      next: null,
    };
  }
};
