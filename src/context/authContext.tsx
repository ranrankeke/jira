import { createContext, useState ,useContext,ReactNode} from 'react'
import * as auth from 'authProvider'
import { User } from '../screens/project-list/searchPanel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/uesAsync'
import { FullPageErrorFallback, FullPageLoading } from 'screens/project-list/list'

interface AuthForm {
  username: string,
  password: string
}
//去localStroge 里面找token
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if(token){
    //返回值包括user的信息
    const data = await http('me',{token})
    user = data.user
  }
  return user
}
 
//创建全局context
//必须加泛型定义 不然 它的类型声名是undefined  它的.Provider 也是undefined
export const AuthContext = createContext < {
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined > (undefined) 

AuthContext.displayName = 'AuthContext'
//最外层组件 AppProviders    AuthProvider 在App组件中嵌套
export const AuthProvider = ({children}:{children: ReactNode}) => {
  //用泛型定义复合类型
  //在usesState源码中定义了泛型，user的类型动态决定了setUser返回值的类型 所以当user为null的时候需要定义复合类型
  // const [user, setUser] = useState<User | null>(null)

  const { data: user, error, isLoading, isError, isIdle, run, setData:setUser } = useAsync<User | null>()

  const login = (form:AuthForm) => auth.login(form).then(setUser)
  const register = (form:AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(()=> setUser(null))

  //在页面加载的时候调用bootstrapUser()
  useMount(()=>{
    run(bootstrapUser())
   
  })
  
  if(isIdle || isLoading){
    return <FullPageLoading />
  }

  if(isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <AuthContext.Provider children={children} value = {{user, login, register, logout}} />
}
//是consumer 消费者 他是专门消费供应商(Provider 上面提到的)产生数据。Consumer需要嵌套在生产者下面。
//才能通过回调的方式拿到共享的数据源。当然也可以单独使用，那就只能消费到上文提到的defaultValue
//
export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}