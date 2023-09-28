import Table from "@/components/Table"
import { IBill } from "@/types/TypeBill"
import { ISubtipo } from "@/types/TypeSubtipo"
import { ITipo } from "@/types/TypeTipo"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import { FaSadTear } from 'react-icons/fa'

export default function Income_expenses() {
    const header = ["Data","Descrição", "Tipo", "Subtipo", "Valor"]

    const [categories, setCategories] = useState({tipo:[], subtipo:[]})
    const [bill, setBill] = useState<IBill>({
        data: null,
        tipo: null,
        subtipo: null,
        valor: null,
        descricao: null
    })
    const [billList, setBillList] = useState<IBill[]>([]) 

    useEffect(() => {
        async function handleGetBillList() {
            try {
                const { token } = JSON.parse(localStorage.getItem('userOrganiza') as string);
                const listData = await fetch('https://defiant-seal-wetsuit.cyclic.app/listafinancas', {
                    method: 'GET',
                    headers: {
                        "Content-type":"application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                const lista = await listData.json()
                setBillList(lista)
            } catch (error) {
                console.log(error)
                //NOTIFICACAO
            }
        }
        handleGetBillList()
    },[])

    useEffect(()=> {
        async function handleGetCategories() {
            try {
                const data = await fetch('https://defiant-seal-wetsuit.cyclic.app/listagemparametrostabela')
            const dataCategories = await data.json()
            setCategories(dataCategories)
            } catch (error) {
                console.log(error)
            }
            
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
                if(status.status === 201) {
                    setBill({
                        data: null,
                        tipo: null,
                        subtipo: null,
                        valor: null,
                        descricao: null
                    })
                    setBillList(current => {
                        return [
                            ...current,
                            bill
                        ]
                    })
                }
            } catch (err) {
                console.log(err)
                // NOTIFICACAO
            }
        }
    }

    return(
        <div className="flex flex-col gap-8 items-center">
            <h1 className="text-2xl mt-8 mb-4 md:text-4xl">Receitas e Despesas</h1>
            <fieldset className="flex flex-col gap-4 border border-lime-600 p-4 rounded-md w-3/4 min-w-[300px] text-lime-500 text-sm lg:flex-row">
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
                <div className="flex flex-col gap-2 w-full lg:w-[100px] xl:w-fit">
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
                        className="w-full px-4 py-2 rounded-md outline-none text-black text-center min-w-[80px]"
                        onChange={e => handleSetBill(e)}
                    />
                </div>
                <button className="w-full bg-lime-500 px-4 py-2 text-white rounded-md hover:opacity-90 cursor-pointer md:h-10 md:self-end" onClick={e => handleRegisterBill(e)}>Cadastrar</button>
            </fieldset>
            <>
                {billList.length !== 0 ? <Table header={header} content={billList} setBillList={setBillList}/> : <div className="flex flex-col gap-8 mt-16 text-4xl items-center scale-150"><FaSadTear/><p>Não há finanças cadastras!</p></div>}
            </>
        </div>
    )
}
