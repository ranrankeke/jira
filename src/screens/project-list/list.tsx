import React from 'react'
import { User } from './searchPanel'
import { Table, Spin, Typography, Dropdown, Button, Menu } from 'antd'
import dayjs from 'dayjs'
import { TableProps } from 'antd/es/table'
import styled from '@emotion/styled'
import { DevTools } from 'jira-dev-tool'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'


export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
  
}
//ListProps 包含 TableProps里面的属性 TableProps里面包含table组件的属性
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void
  setProjectModalOpen:(isOpen:boolean) => void
}

export const List = ( { users,...props }: ListProps) => {
  // ...props 相当于 父组件给传过来的属性和值
  const { mutate } = useEditProject()
  //函数柯里化
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
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
            return <Dropdown overlay={<Menu>
              <Menu.Item key='edit'>
                <Button type = 'link' onClick={() => props.setProjectModalOpen(true)}>编辑</Button>
              </Menu.Item>
            </Menu>}>
              <Button type='link'>...</Button>
            </Dropdown>
          }
        }
      ]}

        //里面包含父组件传来的 dataSource loading
        {...props}
        pagination={false}
        //给每一行家key值
        rowKey={project => project.id } 
    />

    // <table>
    //   <thead>
    //     <tr>
    //       <th>名称</th>
    //       <th>负责人</th>
    //     </tr>
    //   </thead>
    //  <tbody>
    //  {list.map((item)=>
    //       <tr key={item.id}>
    //         <th>{item.name}</th>
    //         <th>
    //           {
    //             users.find(users => users.id === item.personId)?.name || '未知'
    //           }
    //         </th>
    //       </tr>
    //   )}
    //  </tbody>
    // </table>
  )
}
//跟踪无限循环的组件
List.whyDidYouRender = true
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => {
  return <FullPage>
    <Spin size='large' />
  </FullPage>

}

export const FullPageErrorFallback = ({error}: {error:Error | null}) => <FullPage>
  <DevTools/>
  <Typography.Text type='danger' >{error?.message}</Typography.Text>
</FullPage>