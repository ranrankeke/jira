import React, { FormEvent } from 'react'

import { useAuth } from 'context/authContext';

export const LoginScreen = () => {

  // const apiUrl = process.env.REACT_APP_API_URL;
  // const login = (param: { username: string, password: string }) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(param)
  //   }).then(
  //     async (response: Response) => {
  //       if (response.ok) {

  //       }
  //     }
  //   )
  // }
  const { login, user, register } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //阻止默认提交
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({ username, password })
    // register({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      {
        user ? <div>
          登录成功，用户名：{user?.name}token:{user?.token}
        </div> : null
      }
      <div>
        <label htmlFor='usename'>用户名</label>
        <input type="text" id={'usename'} />
      </div>
      <div>
        <label htmlFor='password'>密码</label>
        <input type="password" id={'password'} />
      </div>
      {/* <button type={"submit"}>注册</button> */}
      <button type='submit'>注册</button>
    </form>
  )
}