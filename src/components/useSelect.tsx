import React from 'react'
import { IdSelect } from 'components/idSelect'
import { useUsers } from 'utils/user'
//项目列表搜索的参数
//props 包含作用IdSelect 属性  选择负责人那列请求数据
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  //调接口users
  const { data: users } = useUsers()
  return <IdSelect options = { users || []} {...props} />
  
}

