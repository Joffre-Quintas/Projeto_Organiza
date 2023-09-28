import { IBill } from "@/types/TypeBill";
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs'
import { Dispatch, SetStateAction } from "react";

import treatmentString from "./utils/treatmentString";

export default function Table({ header, content, setBillList}:{header:string[], content:IBill[], setBillList: Dispatch<SetStateAction<IBill[]>>}) {

    async function handleDeleteBill(id:number) {
        try {
            const { token } = JSON.parse(localStorage.getItem('userOrganiza') as string)
            const data = await fetch('https://defiant-seal-wetsuit.cyclic.app/excluirfinanceiro', {
                method:'DELETE',
                headers: {
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({id:id})
            })
            if(data.status === 200) {
                setBillList((current:IBill[]) => {
                    return current.filter( (obj:IBill) => obj.id != id)
                })
            }
        } catch (error) {
            console.log(error)
            //NOTIFICACAO
        }
    }

    return(
        <table className={`w-3/4 min-w-[300px] text-sm bg-white text-black`}>
            <thead className="text-center">
                <tr className="bg-gray-300 text-gray-600">
                    {header.map((col,index) => <th key={index} className={`p-2 ${col === 'Data' ? 'hidden sm:block': ''}`}>{col}</th>)}
                    <th className="w-20"></th>
                </tr>
            </thead>
            <tbody className="h-1/2 overflow-y-scroll">
                {content.map((row:IBill) => {
                    return row.tipo !== 'Investimento' && 
                    <tr key={row.id} className='text-center' data-id={row.id}>
                        <td className="p-2 hidden sm:block">{row.data}</td>
                        <td className="p-2 overflow-x-hidden">{treatmentString(row.descricao as string)}</td>
                        <td className="p-2">{treatmentString(row.tipo as string)}</td>
                        <td className="p-2">{treatmentString(row.subtipo as string)}</td>
                        <td className={`p-2 text-right w-28 ${row.tipo === 'Receita'? 'text-green-500' : 'text-red-500' }`}>R$ {Number(row.valor).toFixed(2).replace('.',',')}</td>
                        <td className="flex justify-around w-20">
                            <div className="pointer text-blue-800 hover:scale-125" onClick={() => console.log('editar')}><BsFillPencilFill/></div>
                            <div className="pointer text-red-600 hover:scale-125" onClick={() => handleDeleteBill(row.id as number)}><BsFillTrash3Fill/></div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}