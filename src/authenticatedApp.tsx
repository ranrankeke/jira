import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/authContext'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
//加上路径 防止打包出错
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { Dropdown, Menu,Button } from 'antd'

export const AuthenticatedApp = () => {
  const { logout,user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap = {true}>
          <SoftwareLogo width='18rem' color='rgb(38,132,255)' />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={<Menu items={[{
            label:(
              <Button type='link' onClick={logout}>登出</Button>
            ),
            key : 'logout'
          }]}/>}>
            
          <Button type='link' onClick = { e => e.preventDefault()}>
           Hi,{user?.name}
          </Button>
       
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
`
const HeaderLeft = styled(Row)`
  
`
const HeaderRight = styled.div`
  
`

// const PageHeader = styled.header`
//   height: 6rem;
// `

const Main = styled.main`
  height: calc(100vh - 6rem)
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;