const componentMap = [['my-card', 'MyCard']];

export function convertToEmberMarkup(str, map = componentMap) {
  if (!str) {
    return '';
  }

  const res = map.reduce((acc, [tiptapTagName, emberTagName]) => {
    return acc.replaceAll(tiptapTagName, emberTagName);
  }, str);

  return res;
}

export function convertToTiptapMarkup(str, map = componentMap) {
  if (!str) {
    return '';
  }

  return map.reduce((acc, [tiptapTagName, emberTagName]) => {
    return acc.replaceAll(emberTagName, tiptapTagName);
  }, str);
}
