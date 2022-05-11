import { useUrlQueryParam } from 'utils/url'
import { useMemo } from 'react'
import { useProject, useProjects } from 'utils/project'

export const useProjectSearchParams = () => {
  //从url里面直接得到的数据都是string 需要处理
  const [param, setParam] = useUrlQueryParam(['name','personId']) 
  return [
    //为什么使用useMemo  
    // { ...param,personId: Number(param.personId) || undefined} 是一个对象，每次当页面刷新的时 都会重新创建一个对象，
    //就会导致param 一直更新，table也会也会更新，出现了无限循环 
    useMemo(()=>(
      //后面的personId类型 覆盖前面的string
      { ...param,personId: Number(param.personId) || undefined}
    ),[param]),
    setParam
  ] as const
}

export const useProjectsQueryKey = () => {
  const params = useProjectSearchParams()
  return ['project', params]
}


//用url创建模态框的状态 
export const useProjectModal = () => {
   
const [{projectCreate},setProjectCreate] = useUrlQueryParam([
  'projectCreate'
])
const [{editingProjectId},setEditingProjectId] = useUrlQueryParam([
  'editingProjectId'
])

const {data: editingProject, isLoading} = useProject(Number(editingProjectId))
// console.log('data',editingProject)
// const  a = getUrlParams(['projectCreate','name'])

const open = () => setProjectCreate({projectCreate: true})
const close = () => {
  setProjectCreate({projectCreate: undefined})
  setEditingProjectId({editingProjectId: undefined})
}

const startEdit = (id: number) => setEditingProjectId({editingProjectId:id})
return {
  projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
  open,
  close,
  startEdit,
  editingProject,
  isLoading
  }
}