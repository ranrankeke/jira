import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from './list'
import { useState, useEffect } from "react"
import * as qs from 'qs'
import { clearnObject } from "utils"
import { useMount } from '../../utils'
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [list, setList] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000)
  const [users, setUsers] = useState([])
  useEffect(() => {
    // todo
    fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(debouncedParam))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  })
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}
//delay参数 要么不传 要么就传入一个number
export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    //每次在value变化后 设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    //每次在上一个useEffect处理完以后在运行
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue;
}
