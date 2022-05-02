import React from 'react'
import { useAuth } from 'context/authContext'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticatedApp'
import { useAsync } from 'utils/uesAsync'

// const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen = ({onError}:{onError:(error:Error)=>void}) => {
 const { login } = useAuth()
 const { run, isLoading } = useAsync(undefined,{throwOnError: true})


  // const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
  //   //阻止表单提交的默认行为
  //     event.preventDefault()
  //     //获取表单
  //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  //     login({username,password})
  // }
  const handleSubmit = async (values: {username: string, password: string}) => {

    try{
      //因为login 是promise 函数，login 函数刚执行，当错误抛出的时候，login 还没有执行完 所以需要用async await
     await run(login(values));
    }catch(e:any){
      onError(e)
    }
  }

  return (
    <div>
            <Form onFinish={handleSubmit}>
                <Form.Item name='username' rules={[{required: true, message: '请输入用户名'}]} > 
                  <Input placeholder='用户名' type="text" id="text" />
                </Form.Item>
                <Form.Item name='password' rules = {[{required: true, message:'请输入密码'}]}>
                  <Input placeholder='密码' type="password" id="password" />
                </Form.Item>
                <Form.Item>
                  <LongButton loading={isLoading} type='primary' htmlType="submit">登录</LongButton>
                </Form.Item>
            </Form>
    </div>
  ) 
}