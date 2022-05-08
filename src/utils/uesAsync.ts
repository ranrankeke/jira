
import { useState, useCallback, useReducer } from 'react'
import { useMountedRef } from 'utils';
//传递给参数的类型
interface State<D> {
  error: Error | null; 
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  //不能忘记return
  return useCallback((...args: T[])=>(
    mountedRef.current ? dispatch(...args) : void 0
  ),[])
}

export const useAsync = <D>(initialState?:State<D>,initialConfig?:typeof defaultConfig) =>{
  const config = { ...defaultConfig, ...initialConfig }

  const [ state, dispatch ] = useReducer((state: State<D>,action: Partial<State<D>>)=>({...state,...action}),{
    ...defaultInitialState,
    ...initialState
  })
  const safeDispatch = useSafeDispatch(dispatch)

  const [retry, setRetry ] = useState(( ()=> () => {

  }))

  const setData = useCallback((data: D) => {
    safeDispatch({
      data,
      stat: 'success',
      error: null
    })
  },[safeDispatch])

  const setError =useCallback( (error:Error) => safeDispatch({
    data: null,
    stat: 'error',
    error
  }),[])

  // run 用来触发异步请求
  const run = useCallback( (promise: Promise<D>,runConfig?:{retry: () => Promise<D>}) => {
    if(!promise || !promise.then) {
      throw new Error ('请传入promise 类型数据')
    }

    setRetry(()=>()=> {
      if(runConfig?.retry){
        run(runConfig?.retry(),runConfig)
      }
    })

    // dispatch({...state, stat: 'loading'});
    safeDispatch({stat: 'loading'});

    return promise
    .then(data => {
      //如果为true 就返回数据 否则不返回  阻止在已卸载组件上赋值
      // if(mountedRef.current) 
      setData(data)
      return data
    })
    .catch(error => {
      //catch会消化异常，如果不主动抛出，外面是接收不到异常的
      setError(error)
      if(config?.throwOnError) {return Promise.reject(error)}
      return error
    })

  },[config?.throwOnError, setData,setError,safeDispatch])
  
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state
  }

}