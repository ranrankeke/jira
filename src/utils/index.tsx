import React, { useEffect, useState } from "react";
export const ifFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    if (ifFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
//自定义hooks
export const useDebounce = (value: unknown, delay: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //每次在上一个useEffect处理完之后在运行  清理任务   在下一次 useEffect 执行前执行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
