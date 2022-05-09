import { useAsync } from './uesAsync'
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useProjectSearchParams } from 'screens/project-list/util'

export const useProjects = (param?: Partial<Project>) => {
  
  const client = useHttp(); 

  return useQuery<Project[]>(['projects',param],() => client('projects',{data:param}))
  
  // const { run, ...result} = useAsync<Project[]>()
  //  // 封装后的写法
  //  const fetchProjects = useCallback(() => client('projects',{data: cleanObject(param || {})}),[client,param])
  //  useEffect(() => {
  //    run(fetchProjects(),{
  //      retry:fetchProjects
  //    })
  //  },[param, run, fetchProjects])
  // return result
}

export const useEditProject = () => {
  const client = useHttp(); 
  const queryClient = useQueryClient()
  const searchParams = useProjectSearchParams()
  
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`,{
    method: 'PATCH',
    data: params
  }),{
    //对缓存刷新
    onSuccess: () => queryClient.invalidateQueries('projects'),
    // async onMutate(target){
    //     const queryKey = ['project',searchParams]
    //     const previousItems = queryClient.getQueriesData(queryKey)

    // }
  })
} 

export const useAddProject = () => {
  const client = useHttp(); 
  const queryClient = useQueryClient()

  return useMutation((params: Partial<Project>) => client('projects',{
    data: params,
    method: 'POST'
  }),{
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
} 

export const useProject = (id?:number) => {
  const client = useHttp();
  
  return useQuery<Project>(
    ['project',{id}],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}