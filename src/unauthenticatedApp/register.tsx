import React from 'react'
import { useAuth } from 'context/authContext'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticatedApp'
import { useAsync } from 'utils/uesAsync'
// const apiUrl = process.env.REACT_APP_API_URL

export const RegisterScreen = ({onError}:{onError:(error: Error) => void}) => {
//{onError} 就是解构 相当于 const { error } = props
 const { register } = useAuth()
 const { run,isLoading } = useAsync(undefined,{throwOnError: true}) 

  // const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
  //   //阻止表单提交的默认行为
  //     event.preventDefault()
  //     //获取表单
  //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  //     register({username,password})
  // }
  //如果在解构的未知 ：a  那么就是给他起了一个别名 注意
  const handleSubmit = async ({confirmPassword, ...values}:{username: string,password: string,confirmPassword: string}) => {
    if(confirmPassword !== values.password){
      onError(new Error('请确认两次输入的密码相同'))
      return 
    }
    try{
    await run(register(values));
    }catch(e:any){
      onError(e)
    }
  }

  return <div>
            <Form onFinish={handleSubmit}>
              <Form.Item name='username' rules={[{required: true, message: '请输入用户名'}]}>
                <Input type="text" id="text" placeholder='用户名' />
              </Form.Item>
              <Form.Item name='password' rules={[{required: true, message: '请输入密码'}]}>
                <Input type="password" id="password" placeholder='密码' />
              </Form.Item>
              <Form.Item name='confirmPassword' rules={[{required: true, message: '请确认密码'}]}>
                <Input type="password" id="cpassword" placeholder='确认密码' />
              </Form.Item>
              <Form.Item>
                <LongButton loading= { isLoading } type='primary' htmlType='submit'>注册</LongButton>
              </Form.Item>
            </Form>
         </div>
}