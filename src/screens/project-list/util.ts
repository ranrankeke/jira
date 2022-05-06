import { useUrlQueryParam } from 'utils/url'
import { useMemo } from 'react'
export const useProjectSearchParams = () => {
  //从url里面直接得到的数据都是string 需要处理
  const [param, setParam] = useUrlQueryParam(['name','personId']) 
  return [
    //为什么使用useMemo  
    // { ...param,personId: Number(param.personId) || undefined} 是一个对象，每次当页面刷新的时 都会重新创建一个对象，
    //就会导致param 一直更新，table也会也会更新，出现了无限循环 
    useMemo(()=>(
      //后面的personId类型 覆盖前面的string
      { ...param,personId: Number(param.personId) || undefined}
    ),[param]),
    setParam
  ] as const
}