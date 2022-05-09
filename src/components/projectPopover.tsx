import { Popover, Typography,List, Divider,Button } from 'antd'
import { useProjects } from 'utils/project'
import styled from '@emotion/styled'
import { useProjectModal } from 'screens/project-list/util'

export const ProjectPopover = () => {
  const {open} = useProjectModal()
  const { data: projects} = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)

  const content = <ContentContainer>
    <Typography.Text type='secondary'>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item key={project.id}>
        <List.Item.Meta title={project.name} />
        </List.Item>)
      }
    </List>
    <Divider />
    <Button style={{padding: 0}} type='link' onClick={open} >
      创建项目
    </Button>
    
  </ContentContainer>
  return <Popover placement='bottom' content={content}>
   <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`