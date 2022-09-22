export const filterWords = (Words, filter: string) => {
  let exp = '';
  for (let i in filter as any) {
    exp += `(?=.*${filter[i]})`;
  }
  let regex = new RegExp('^' + exp + '.', 'g');
  return Words.filter((word) => word.match(regex));
};

export const inverseFilterWords = (Words, filter: string) => {
  let exp = '';
  let regex = new RegExp(`\\b\\w*[${filter}]\\w*\\b`, 'g');
  return Words.filter((word) => !word.match(regex));
};
