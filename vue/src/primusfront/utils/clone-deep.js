import { isArray, isPlainObject } from './inspect'
import { keys, isObject } from './object'

export const cloneDeep = (obj, defaultValue = obj) => {
  if (isArray(obj)) {
    return obj.reduce((result, val) => [...result, cloneDeep(val, val)], [])
  }
  if (isPlainObject(obj)) {
    return keys(obj).reduce(
      (result, key) => ({ ...result, [key]: cloneDeep(obj[key], obj[key]) }),
      {}
    )
  }
  return defaultValue
}

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} })
          mergeDeep(target[key], source[key])
        } else {
          Object.assign(target, { [key]: source[key] })
        }
      }
    }
  }
  return mergeDeep(target, ...sources)
}

export default cloneDeep
