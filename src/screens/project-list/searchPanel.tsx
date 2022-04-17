import React from 'react'

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string; // 部门
  token: string //权鉴
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string;
    personId: string;
  },
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = (props: SearchPanelProps) => {

  const { param, setParam, users } = props;

  return <form action="">
    <div>
      <input type="text" value={param.name} onChange={(e) => setParam({
        ...param,
        name: e.target.value
      })} />
      <select value={param.personId} onChange={e => setParam({
        ...param,
        personId: e.target.value
      })}>
        <option value={''}>负责人</option>
        {
          users.map((item, index) => {
            return <option value={item.id} key={item.id}>{item.name}</option>
          })
        }
      </select>
    </div>
  </form>
}