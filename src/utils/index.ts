import { useState, useEffect } from "react";
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

// // 后面用泛型来规范类型
// export const useDebounce = <V>(value: V, delay?: number) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     // 每次在value变化以后，设置一个定时器
//     const timeout = setTimeout(() => setDebouncedValue(value), delay);
//     // 每次在上一个useEffect处理完以后再运行
//     return () => clearTimeout(timeout);
//   }, [value, delay]);

//   return debouncedValue;
// };

//自定义hooks  用泛型来规范类型     delay可以不传 默认值是0 需要在.ts 文件中，.tsx会报错
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<V>(value);

  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //每次在上一个useEffect处理完之后在运行  清理任务   在下一次 useEffect 执行前执行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

// export const useArray = <T>(initialArray: T[]) => {
//   const [value, setValue] = useState(initialArray)
//   return {
//     value,
//     setValue,
//     add: (item: T) => setValue([...value, item]),
//     clear: () => setValue([]),
//     removeIndex: (index: number) => {
//       const copy = [...value]
//       copy.splice(index, 1)
//       setValue(copy)
//     }
//   }
// }

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    add: (item: T) => setValue([...value, item]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    clear: () => {
      setValue([]);
    },
  };
};
