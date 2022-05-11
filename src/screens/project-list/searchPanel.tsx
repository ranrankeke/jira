
import React from 'react'
import { Input,Form } from 'antd'
import { Project } from '../../types/project';
import { UserSelect } from 'components/useSelect';
import { User } from '../../types/user'

interface SearchPanelProps {
  users: User[],
  //用 ts pick 拿取 name personId 的类型 Partial 拿取部分类型 优点：有很大的灵活性
  param: Partial<Pick<Project,'name' | 'personId'>>,
  // param:{
  //   name: string;
  //   personId: string;
  // },
  setParam:(param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({param,setParam,users}:SearchPanelProps) => {
  return (
    <Form layout='inline' style={{marginBottom:'2rem'}}>
      <Form.Item>
       <Input type="text" placeholder="项目名" value={param.name} onChange={e=>setParam({
         ...param,
         name:e.target.value
       })} />
       </Form.Item>
       <Form.Item>
          {/* 使用封装好的select */}
         <UserSelect 
            defaultOptionName='负责人'
            value={param.personId} 
            onChange={value => setParam({
              ...param,
              personId: value
       })}  
        />
{/* 
       <Select value={param.personId} onChange={value => setParam({
         ...param,
         personId: value
       })}>
         <Select.Option value="">负责人</Select.Option>
         {
           users.map((item)=>
             <Select.Option value={String(item.id)} key={item.id}>{item.name}</Select.Option>
           )
         }
       </Select> */}
       </Form.Item>
    </Form>
  )
}

