/* eslint-disable prefer-destructuring */
import { locationType } from "@/assets/constants/locations"

const structuredLocationType = locationType.reduce((acc, item) => {
  const key = Object.keys(item)[0]
  acc[key] = item[key].reduce((innerAcc, typeInfo) => {
    innerAcc[typeInfo.name] = typeInfo

    return innerAcc
  }, {})

  return acc
}, {})

export function getInfosForType(structure, typeName, info) {
  const typeInfo =
    structuredLocationType[structure] &&
    structuredLocationType[structure][typeName]

  return typeInfo ? typeInfo[info] : null
}
