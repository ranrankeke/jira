import { ReactNode } from 'react'
import { AuthProvider } from './authContext'
import {QueryClientProvider,QueryClient} from 'react-query'
// export const AppProviders = ({children}:{children: ReactNode}) => {

//   return <AuthProvider>
//     {children}
//   </AuthProvider>
// }

export const AppProviders = (props:{children: ReactNode}) => {
  const {children}=props;
  return(
    <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          {children}
        </AuthProvider>
    </QueryClientProvider>
   
  )
}