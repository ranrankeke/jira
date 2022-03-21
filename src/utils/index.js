import React from "react"
//!value 如果value有值 则取反为false  在加一个! 就是true
export const isFalsy = (value) => value === 0 ? false : !value
export const clearnObject = (object) => {
  //在函数中尽量不改变原是参数
  const result = { ...object }

  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}