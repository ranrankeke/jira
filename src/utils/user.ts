import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from './http'
import { useAsync } from './uesAsync';
import { User } from '../types/user'

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result} = useAsync<User[]>()

  useEffect(() => {
    run(client('users',{data: cleanObject(param || {})}))
  },[param,client,run])
  
  return result
}