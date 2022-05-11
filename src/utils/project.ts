
import { Project } from 'types/project'
import { useHttp } from './http'
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
// import { useProjectSearchParams } from 'screens/project-list/util'
import { useAddConfig, useEditConfig,useDeleteConfig } from './useOptimisticOptions'

export const useProjects = (param?: Partial<Project>) => {
  console.log('param',param)
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

export const useEditProject = (queryKey:QueryKey) => {
  const client = useHttp(); 

  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`,{
    method: 'PATCH',
    data: params
  }),
  useEditConfig(queryKey)
  )
} 

export const useAddProject = (queryKey:QueryKey) => {
  const client = useHttp(); 
  
  return useMutation((params: Partial<Project>) => {
   return client('projects',{
      data: params,
      method: 'POST'
    })
  },
  useAddConfig(queryKey)
  )
} 

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

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