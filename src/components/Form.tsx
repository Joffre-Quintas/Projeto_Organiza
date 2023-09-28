import useForm from "@/hooks/useForm"
import { usePathname } from "next/navigation"

export default function Form({ endpoint, method }: {endpoint: string, method: string}) {
    
    const{ formData, handleSetFormData,handleSubmit } = useForm()
    const pathName = usePathname()

    return(
        <form 
            className="flex flex-col gap-4 w-1/2 max-w-[400px] min-w-[250px] border-2 border-lime-500 rounded-md p-4"
            onSubmit={(e) => handleSubmit({e, endpoint, method})}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="nome_completo">Nome Completo</label> 
                <input 
                    type="text" 
                    name="nome_completo" 
                    className="outline-none px-2 text-black rounded-sm py-2" 
                    onChange={e => handleSetFormData(e)}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="nome_social">Como deseja ser chamado?</label> 
                <input 
                    type="text" 
                    name="nome_social" 
                    className="outline-none px-2 text-black rounded-sm py-2" 
                    onChange={e => handleSetFormData(e)}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">E-mail</label> 
                <input 
                    type="email" 
                    name="email" 
                    className="outline-none px-2 text-black rounded-sm py-2" 
                    onChange={e => handleSetFormData(e)}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="senha">Senha</label> 
                <input 
                    type="password" 
                    name="senha" 
                    className="outline-none px-2 text-black rounded-sm py-2" 
                    onChange={e => handleSetFormData(e)}
                />
            </div>
            <button type="submit" className=" bg-lime-500 px-4 py-2 hover:opacity-90 rounded-sm shadow-md shadow-gray-600">{pathName === '/register' ? 'Cadastrar' : 'Atualizar'}</button>
        </form>
    )
}