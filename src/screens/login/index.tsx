import React,{FormEvent} from 'react'
import { useAuth } from 'context/authContext'
// const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen = () => {
 const { login,user} = useAuth()

  // const login = (param: {username:string,password: string}) => {
  //   return fetch(`${apiUrl}/register`,{
  //     method: 'POST',
  //     headers: {
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify(param)
  //   }).then(
  //     async (response:Response) => {
  //       if(response.ok){
          
  //       }
  //     }
  //   )
  // }

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    //阻止表单提交的默认行为
      event.preventDefault()
      //获取表单
      const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
      const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
      login({username,password})
  }

  return <form onSubmit={handleSubmit}>
    {
      user ? <div>
        登录成功,用户名:{user?.name}
      </div> : null
    }
  
    <div>
      <label htmlFor='text'>用户名</label>
      <input type="text" id="text" />
    </div>
    <div>
      <label htmlFor='password'>密码</label>
      <input type="password" id="password" />
    </div>
    <button value="submit">登录</button>
  </form>
}