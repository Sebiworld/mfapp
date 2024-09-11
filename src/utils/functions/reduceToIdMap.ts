export const reduceToIdMap = <T extends { id: number }>(valueArray: T[]): {[key: number]: T}=> {
  if(typeof valueArray !== 'object' || !Array.isArray(valueArray)){
    return {};
  }
  return valueArray.reduce((acc, curr) => ({...acc, [curr.id]: curr}), {});
}