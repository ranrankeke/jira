
import React from 'react'
import { Input,Form,Select } from 'antd'

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;

}

interface SearchPanelProps {
  users: User[],
  param:{
    name: string;
    personId: string;
  },
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
       <Select value={param.personId} onChange={value => setParam({
         ...param,
         personId: value
       })}>
         <Select.Option value="">负责人</Select.Option>
         {
           users.map((item)=>
             <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
           )
         }
       </Select>
       </Form.Item>
    </Form>
  )
}

