import { ChangeEvent, FormEvent, useEffect, useState } from "react"

interface ITipo {
    id: number,
    tipo: string
}
interface IBill {
    data: Date | null,
    tipo: string | null,
    subtipo: string | null,
    valor: number | null,
    descricao: string | null
}
interface ISubtipo {
    id:number,
    subtipo: string,
    tipo: string
}
export default function Income_expenses() {

    const [categories, setCategories] = useState({tipo:[], subtipo:[]})
    const [bill, setBill] = useState<IBill>({
        data: null,
        tipo: null,
        subtipo: null,
        valor: null,
        descricao: null
    })

    useEffect(()=> {
        async function handleGetCategories() {
            const data = await fetch('https://defiant-seal-wetsuit.cyclic.app/listagemparametrostabela')
            const dataCategories = await data.json()
            setCategories(dataCategories)
        }   
        handleGetCategories()
    },[])

    function handleSetBill(e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target
        setBill(current => {
            return {
                ...current,
                [name]: typeof Number(value) === 'number' ? value.replace(',','.'): value
            }
        })
    }
    async function handleRegisterBill(e:FormEvent) {
        e.preventDefault()
        console.log(bill)

        if(Object.values(bill).some(value => value === null)){
            console.error('Preencha todos os campos!')
        } else {
            try {
                const { token } = JSON.parse(localStorage.getItem('userOrganiza') as string);
                const status = await fetch('https://defiant-seal-wetsuit.cyclic.app/cadastrofinanceiro', {
                    method: 'POST',
                    headers: {
                        "Content-type":"application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(bill)
                })
                if(status.ok) {
                    setBill({
                        data: null,
                        tipo: null,
                        subtipo: null,
                        valor: null,
                        descricao: null
                    })
                    // NOTIFICACAO
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    return(
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mt-8 mb-4 md:text-4xl">Receitas e Despesas</h1>
            <fieldset className="flex flex-col gap-4 border border-lime-600 p-4 rounded-md w-3/4 min-w-[300px] max-w-fit text-lime-500 text-sm lg:flex-row">
                <legend className="text-lime-600 italic">Cadastro de Entrada / Saída</legend>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="data">Data da Efetuação</label>    
                    <input 
                        type="date"    
                        name="data" 
                        className="px-4 py-2 rounded-md outline-none text-black text-center"
                        onChange={e => handleSetBill(e)}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full text">
                    <label htmlFor="descricao">Descrição</label> 
                        <input 
                            type="text" 
                            name="descricao" 
                            className="w-full px-4 py-2 rounded-md outline-none text-black text-center"
                            onChange={e => handleSetBill(e)}
                        />
                    </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="tipo">Tipo</label>    
                    <select 
                        name="tipo" 
                        className="px-4 py-2 rounded-md outline-none text-black text-center"
                        onChange={e => handleSetBill(e)}
                    >
                        <option value="-">-</option>
                        {categories && categories.tipo.map((tipo:ITipo) => {
                            return tipo.tipo !== 'Investimento' ? <option key={tipo.id}>{tipo.tipo}</option> : null
                        })}
                    </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="subtipo">Subtipo</label>    
                    <select 
                        name="subtipo" 
                        className="px-4 py-2 rounded-md outline-none text-black text-center"
                        onChange={e => handleSetBill(e)}    
                    >
                        <option value="-">-</option>
                        {bill && categories.subtipo.filter((sub:ISubtipo) => sub.tipo === bill.tipo).map((filtered:ISubtipo) => <option key={filtered.id}>{filtered.subtipo}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="valor">Valor (R$)</label>
                    <input 
                        type="text" 
                        name="valor" 
                        className="w-full px-4 py-2 rounded-md outline-none text-black text-center"
                        onChange={e => handleSetBill(e)}
                    />
                </div>
                <button className="w-full bg-lime-500 px-4 py-2 text-white rounded-md hover:opacity-90 cursor-pointer md:h-10 md:self-end" onClick={e => handleRegisterBill(e)}>Cadastrar</button>
            </fieldset>
        </div>
    )
}
