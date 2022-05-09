import React, { useEffect } from 'react'
import { Drawer, Button, Spin, Form, Input} from 'antd'
import { useProjectModal } from './util'
import { UserSelect } from 'components/useSelect'
import { useAddProject, useEditProject } from 'utils/project'

import { ErrorBox } from 'components/lib'
import styled from '@emotion/styled'

export const ProjectModal = () => {
  const {projectModalOpen,close, editingProject, isLoading} = useProjectModal()
  const title = editingProject ? '编辑项目' : '创建项目'
  const useMutateProject = editingProject ? useEditProject : useAddProject

  const {mutateAsync, error ,isLoading:mutateLoading} = useMutateProject()
  const [form] = Form.useForm()
  const onFinish = (values:any) => {
    mutateAsync({...editingProject, ...values}).then(()=>{
      form.resetFields()
      close()
    })
  }
  
  useEffect(()=>{
    form.setFieldsValue(editingProject)
  },[editingProject,form])
  //或者用getContainer={false} 
  return <Drawer forceRender={true} onClose={close} visible = {projectModalOpen} width='100%'>
    <Container>
      {
        isLoading ? <Spin size='large'></Spin> : <>
        <h1>{title}</h1> 
        <ErrorBox  error={error} />
        <Form form ={form} layout='vertical' style={{width: '400px'}} onFinish={onFinish}>
          <Form.Item label='名称' name='name' rules={[{required: true,message:'名称'}]}>
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Form.Item label='部门' name='organization' rules={[{required: true,message:'部门'}]}>
            <Input placeholder='请输入部门' />
          </Form.Item>
          <Form.Item label='负责人' name='personId' >
            <UserSelect defaultOptionName='负责人' />
          </Form.Item>
          <Form.Item style={{textAlign: 'right'}}>
            <Button type='primary' htmlType='submit' loading={mutateLoading}>提交</Button>
          </Form.Item>
        </Form>
        </>
      }
      </Container>
    </Drawer>
} 

const Container = styled.div`
  height: 56rem;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center
`