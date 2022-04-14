import React from 'react'
export const List = (props) => {
  const { list, users } = props;

  return <table style={{ border: "1" }}>
    <thead>
      <tr>
        <th>项目</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {
        list.map((project) =>
          <tr key={project.id}>
            <th>{project.name}</th>
            <th>{users.find(item => item.id === project.personId)?.name || '未知'}</th>
          </tr>
        )
      }
    </tbody>
  </table>
}