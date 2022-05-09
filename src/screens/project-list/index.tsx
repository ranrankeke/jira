import { SearchPanel } from './searchPanel'
import { List } from './list'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useDocumentTitle } from 'utils'
import { useProjectModal, useProjectSearchParams } from './util'
import { Button } from 'antd'
import { Row } from 'components/lib'
import { ErrorBox } from 'components/lib'


export const ProjectListScreen = () => {
  useDocumentTitle('项目列表',false)
  const { open } = useProjectModal()

  const[ param, setParam] = useProjectSearchParams()
  const { isLoading, data:list,error} = useProjects(useDebounce(param, 2000))
  const { data: users } = useUsers()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button type='link' onClick={open}>创建项目</Button>
      </Row>
      
      {/* <Button onClick={retry}>retry</Button> */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      {/* {
        error?(<Typography.Text type='danger'>{error.message}</Typography.Text>) : null
      } */}
      <List 
  
        dataSource={list || []} 
        users={users || []} 
        loading={isLoading} 
      />
    </Container>
  )
}
//跟踪无限循环的组件
// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem
`

