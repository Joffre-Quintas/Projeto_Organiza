import { createContext, useEffect, useState } from "react";

interface IUser {
    token: string,
    usuario: {
        id:number,
        nome_complet: string,
        nome_social: string,
        email: string
    }
}
interface IUserContext {
    user?:IUser,
    handleLogin?: (type: 'login' | 'logout', user: IUser) => void
}
export const UserContext = createContext<IUserContext>(null!)

export default function UserProvider(props:any) {
    const[user, setUser] = useState<IUser>(null!)

    useEffect(() => {
        const dataUser = localStorage.getItem('userOrganiza')
        dataUser !== null && setUser(JSON.parse(dataUser))
    },[])

    function handleLogin(type: 'login' | 'logout', user:IUser) {
        if(type === 'login' && user) {
            setUser(user)
            localStorage.setItem('userOrganiza', JSON.stringify(user))
        } else {
            setUser(null!)
            localStorage.removeItem('userOrganiza')
        }
    }
    return (
        <UserContext.Provider value={{user, handleLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}
