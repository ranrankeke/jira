import { useHttp } from './http'
import { Task } from 'types/task'
import { useQuery } from 'react-query'

export const useTasks = (param?:Partial<Task>) => {
  const client = useHttp()

  return useQuery<Task[]>(['tasks',param], () => {
    return client('tasks',{data: param})
  })
}