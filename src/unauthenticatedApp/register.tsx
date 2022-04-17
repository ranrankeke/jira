import React, { FormEvent } from 'react'

import { useAuth } from 'context/authContext';

export const RegisterScreen = () => {

  const { user, register } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //阻止默认提交
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    register({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
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