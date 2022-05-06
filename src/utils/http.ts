import * as qs from 'qs'
import * as auth from '../authProvider'
import { useAuth } from 'context/authContext'; 
import { useCallback } from 'react';

const apiUrl = process.env.REACT_APP_API_URL
//RequestInit 是fetch api里面定义的第二个参数的类型
interface Config extends RequestInit {
  data?: object;
  token?: string
}
//参数里面 可以加默认值 就会 变成可选参数  ={}
export const http = (endpoint: string, {data, token, headers, ...customConfig}:Config={}) => {
  const config = {
    method: 'GET',
    headers: {
      //固定写法
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  //get方法的请求数据是在url地址 post方法的请求数据在body
  if (config.method.toUpperCase() === 'GET'){
    endpoint += `?${qs.stringify(data)}`
  }else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${endpoint}`,config)
  .then( async response => {
    //如果token 失效
    if(response.status === 401) {
      await auth.logout()
      //页面重新刷新
      window.location.reload()
      return Promise.reject({message:'请重新登录'})
    }
    
    const data = await response.json()
    if(response.ok){
      return data
    }else{
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => { 
  const {user} = useAuth()
  //todo 讲解ts操作符
  return useCallback((...[endpoint, config]:Parameters<typeof http>) => {
    return http(endpoint,{...config,token:user?.token})
  },[user?.token])
}