import { useAsync } from './uesAsync'
import { Project } from 'screens/project-list/list'
import { useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from './http'

export const useProjects = (param?: Partial<Project>) => {
  
  const client = useHttp(); 
  const { run, ...result} = useAsync<Project[]>()

   // 封装后的写法
   useEffect(() => {
    run(client('projects',{data:cleanObject(param || {})}))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[param])

  return result
}