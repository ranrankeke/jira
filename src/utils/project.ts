import { useAsync } from './uesAsync'
import { Project } from 'screens/project-list/list'
import { useCallback, useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from './http'

export const useProjects = (param?: Partial<Project>) => {
  
  const client = useHttp(); 
  const { run, ...result} = useAsync<Project[]>()

   // 封装后的写法
   const fetchProjects = useCallback(() => client('projects',{data: cleanObject(param || {})}),[client,param])

   useEffect(() => {
     run(fetchProjects(),{
       retry:fetchProjects
     })
   },[param, run, fetchProjects])

  return result
}

export const useEditProject = () => {
  const client = useHttp(); 
  const { run,...asyncResult } = useAsync<Project[]>()
  //Partial 传部分类型
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`,{
      data: params,
      method: 'PATCH'
    }))
  }
  return {mutate, ...asyncResult}
} 

export const useAddProject = () => {
  const client = useHttp(); 
  const { run,...asyncResult } = useAsync()
  //Partial 传部分类型
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`,{
      data: params,
      method: 'POST'
    }))
  }
  

  return {mutate, ...asyncResult}
} 