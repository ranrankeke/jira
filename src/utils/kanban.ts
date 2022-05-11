import { useHttp } from './http'
import { Kanban } from 'types/kanban'
import { useQuery } from 'react-query'

export const useKanbans = (param?:Partial<Kanban>) => {
  const client = useHttp()

  return useQuery<Kanban[]>(['kanbans',param], () => {
    return client('kanbans',{data: param})
  })
}