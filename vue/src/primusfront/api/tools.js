export const attrsToSuffix = function (attrs = [], hasLastSlash = true) {
  // attrs [['suffix1', value], ['suffix2', value], ['1']] => suffix1/value/suffix2/value/1
  let suffix = attrs.flat().filter(i => i).join('/')
  if (hasLastSlash) {
    suffix += '/'
  }
  return suffix
}
