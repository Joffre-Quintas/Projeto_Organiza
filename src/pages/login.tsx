import { UserContext } from "@/context/UserContext"
import { urlBaseAPI } from "@/data/urlapi";
import router from "next/router";
import { ChangeEvent, FormEvent, useContext, useState } from "react"

export default function Login(){
    const [loginData, setLoginData] = useState({email: null!, senha: null!})
    const { handleLogin } = useContext(UserContext)

    function handleLoginData(e:ChangeEvent<HTMLInputElement>) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setLoginData(current => {
            return {
                ...current,
                [fieldName]: fieldValue
            }
        })
    }

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(Object.values(loginData).some((value:string) => value.trim() === null)) {
            alert('Preencha todos os campos!')
        } else {
            try {
                const data = await fetch(`${urlBaseAPI}/login`, {
                method: 'POST',
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(loginData)
            })
                if(data.ok && data !== null) {
                    handleLogin?.('login', await data.json())
                    router.push('/')
                } else {
                    throw new Error('Usuário não encontrado!')
                }
            }
            catch(err) {
                alert(err)
            }
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl mt-8 mb-4">Login</h1>
            <form 
                className="flex flex-col gap-4 w-1/2 max-w-[400px] min-w-[250px] border-2 border-lime-500 rounded-md p-4"
                onSubmit={e => handleSubmit(e)}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">E-mail</label> 
                    <input 
                        type="email" 
                        name="email" 
                        className="outline-none px-2 text-black rounded-sm py-2" 
                        onChange={e => handleLoginData(e)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="senha">Senha</label> 
                    <input 
                        type="password" 
                        name="senha" 
                        className="outline-none px-2 text-black rounded-sm py-2" 
                        onChange={e => handleLoginData(e)}
                    />
                </div>
                <button type="submit" className=" bg-lime-500 px-4 py-2 hover:opacity-90 rounded-sm shadow-md shadow-gray-600">Entrar</button>
            </form>
        </div>
    )
}
