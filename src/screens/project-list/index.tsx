import { SearchPanel } from './searchPanel'
import { List } from './list'
import { useState } from 'react'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'

export const ProjectListScreen = () => {
  const [param,setParam] = useState({
    //输入框的内容
    name: '',
    //选择框的projects 数据中的personId
    personId: ''
  })
  //users的列表
  // const [users,setUsers] = useState([]);
  // const [list,setList] = useState([])

  const debouncedParam = useDebounce(param, 2000)
  //封装好的请求
  // const client = useHttp()

  const { isLoading, data:list} = useProjects(debouncedParam)
    //封装后的写法
  // useMount(()=>{
  //   client('users').then(setUsers)
  // })

  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem
`