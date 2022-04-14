import React, { useState, useEffect } from 'react'
import { SearchPanel } from './searchPanel'
import { List } from './list'
import { cleanObject, useMount, useDebounce } from 'utils';
import * as qs from 'qs'

import Test from './text';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const debouncedParam = useDebounce(param, 2000)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
      console.log('res', res)
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      console.log('res2', res)
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  })

  return <div style={{ width: '300px', margin: '0px auto' }}>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List list={list} setList={setList} users={users} />

    <div style={{ backgroundColor: '#fff', padding: '48px', marginBottom: '20px' }}>
      <Test maxLength={10} defaultValue={'hello'} />
    </div>
  </div>
}