import { QueryKey, useQueryClient } from 'react-query'

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[])=> {
  const queryClient = useQueryClient()
  return {
      //对缓存刷新
      onSuccess: () => { 
        // console.log('onsuccess')
        return queryClient.invalidateQueries(queryKey)
        
      },
      async onMutate(target:any){
          const previousItems = queryClient.getQueriesData(queryKey)
          queryClient.setQueriesData(queryKey,(old?:any[])=> {
            // return old?.map(project => project.id ===target.id ? {...project,...target}:project) || [] 
            return callback(target, old) 
          })
          return {previousItems}
      },
      onError(error: any,newItem: any, context: any){
        // console.log('onerror')
        queryClient.setQueryData(queryKey, context.previousItems)
  }
}
}
export const useDeleteConfig = (queryKey: QueryKey) =>{
  return useConfig(
    queryKey,
    (target, old:any[] | undefined) => old?.filter(item => item.id !== target.id) || []
  )};
export const useEditConfig = (queryKey: QueryKey) =>{
  return useConfig(
    queryKey,
    (target, old:any[] | undefined) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  )};
export const useAddConfig = (queryKey: QueryKey) =>{
  return useConfig(queryKey, (target, old) => (old ? [...old, target] : []))};