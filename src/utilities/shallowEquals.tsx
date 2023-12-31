export default function shallowEqual(object1: any, object2: any, skip: string[] = []) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let key of keys1) {
    if (!skip.includes(key) && object1[key] !== object2[key]) {
      return false
    }
  }

  return true
}
