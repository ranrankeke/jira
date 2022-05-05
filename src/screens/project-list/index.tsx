import { SearchPanel } from './searchPanel'
import { List } from './list'
import { useState } from 'react'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () => {
  // const [,setParam] = useState({
  //   //输入框的内容
  //   name: '',
  //   //选择框的projects 数据中的personId
  //   personId: ''
  // })
  const [param, setParam] = useUrlQueryParam(['name','personId']) 
  
  const debouncedParam = useDebounce(param, 2000)
  const { isLoading, data:list} = useProjects(debouncedParam)
  const { data: users } = useUsers()
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  )
}
//跟踪无限循环的组件
ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem
`
