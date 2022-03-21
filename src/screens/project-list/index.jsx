import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from './list'
import { useState, useEffect } from "react"
import qs from 'qs'
import { clearnObject } from "utils"
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  useEffect(() => {
    // todo
    fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(param))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}
