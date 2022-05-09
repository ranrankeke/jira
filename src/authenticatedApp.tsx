
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/authContext'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
//加上路径 防止打包出错
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { Dropdown, Menu,Button } from 'antd'
import { restRoute } from 'utils'
import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { ProjectModal } from 'screens/project-list/projectModal'
import { ProjectPopover } from 'components/projectPopover'

export const AuthenticatedApp = () => {
  // const [ projectModalOpen, setProjectModalOpen ]  = useState(false)

  return (
    <Container>
      <Router>    
      <PageHeader />
      <Button>打开</Button>
      <Main>     
          <Routes>
            <Route path = {'/projects' } element = {<ProjectListScreen />} />
            <Route path = {'/projects/:personId/*'} element = {<ProjectScreen  />} />
            <Route path="/" element={<Navigate to="/projects" />} />
          </Routes>
          {/* 路由重定向 */}
          {/* <Navigate to={"/projects"} /> */}
      </Main>
      <ProjectModal />
      </Router>
    </Container>
  )
}

const PageHeader = () => {
  return <Header between={true}>
    <HeaderLeft gap = {true}>
      {/* 点击跳转到当前url */}
      <Button style={{padding: 0}} type={'link'} onClick={restRoute}>
       <SoftwareLogo width='18rem' color='rgb(38,132,255)' />
      </Button>
    <ProjectPopover />
  
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
    <User />
    </HeaderRight>
  </Header>
}

const User = () => {
  const { logout,user } = useAuth();
  return(
    <Dropdown overlay={<Menu items={[{
      label:(
        <Button type='link' onClick={logout}>登出</Button>
      ),
      key : 'logout'
    }]}/>}>
    <Button type='link' onClick = { e => e.preventDefault()}>
    Hi,{user?.name}
    </Button>
    </Dropdown>)
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