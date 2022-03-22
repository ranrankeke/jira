import React, { useEffect } from "react"
//!value 如果value有值 则取反为false  在加一个! 就是true

export const isFalsy = (value: any) => value === 0 ? false : !value
export const clearnObject = (object: object) => {
  //在函数中尽量不改变原是参数
  const result = { ...object }

  Object.keys(result).forEach(key => {
    //先忽略掉
    //@ts-ignore
    const value = result[key]
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key]
    }
  })
  return result
}
//void 表示这个函数不返回任何值
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}