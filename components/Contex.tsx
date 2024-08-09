
import { useRouter,useSegments } from 'expo-router'
import * as React from 'react'
const AuthContext =React.createContext<any>(null)

export function useAuth(){
  return React.useContext(AuthContext)
} 

export function AuthProvider({children}:React.PropsWithChildren){
const [user, setUser] = React.useState("")
const router = useRouter()
// const rootSegment =useSegments()
React.useEffect(()=>{
if (user===''){
router.replace('login')

}
else{
  router.replace('/')
}
},[user])
  return(
    <AuthContext.Provider
    value={{
      user:user,
      signIn:()=>{
        setUser("notnull")
      },
      signout:()=>{
        setUser("")
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}