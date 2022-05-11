import React from 'react'
import { User } from '../../types/user'
import { Table, Dropdown, Button, Menu ,Modal} from 'antd'
import dayjs from 'dayjs'
import { TableProps } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from 'utils/project'
import { useProjectModal, useProjectsQueryKey } from './util'
import { Project } from '../../types/project'

//ListProps 包含 TableProps里面的属性 TableProps里面包含table组件的属性
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ( { users,...props }: ListProps) => {
  // ...props 相当于 父组件给传过来的属性和值
  const { mutate } = useEditProject(useProjectsQueryKey())

 
  //函数柯里化
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})
  return (
    <Table
    columns={[
        {
          title: <Pin checked = { true } disabled = { true } />,
          render(project){
            //编辑的时候 想服务器端发送编辑请求s
            return <Pin checked={project.pin} onCheckChange={pinProject(project.id)} />
          }
        },
        {
          title: '项目名称',
          sorter: (a,b) => a.name.localeCompare(b.name),
          render(project){
            return <Link to={String(project.id)}>{project.name}</Link>
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render(project){
            return <span>
               {
                  users.find(users => users.id === project.personId)?.name || '未知'
                }
            </span>
          }
        },
        {
          title: '创建时间',
          render(project){
            return <span>
              {
                // 将时间戳转换为制定格式的时间
                project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'
              }
            </span>
          }
        },
        {
          render(value,project){
            return <More project={project}/>
          }
        }
      ]}

        //里面包含父组件传来的 dataSource loading
        {...props}
        pagination={false}
        //给每一行家key值
        rowKey={project => project.id } 
    />
  )
}
//跟踪无限循环的组件
// List.whyDidYouRender = true

const More = ({project}:{project: Project}) => {
  const {startEdit} = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject} = useDeleteProject (useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    return Modal.confirm({
      title: '确认删除这个项目吗',
      content: '点击确认删除',
      okText: '确定',
      onOk(){
        // console.log('id',{id})
        deleteProject({id})
      }
    })
  }

  return <Dropdown overlay={
    <Menu items={[{
      label:'编辑',
      key : 'edit',
      onClick: editProject(project.id)
    },{
      label:'删除',
      key: 'delete',
      onClick: () => confirmDeleteProject(project.id)
    }]}/>
}>
    <Button type='link'>...</Button>
  </Dropdown>
}