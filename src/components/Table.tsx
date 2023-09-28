import { IBill } from "@/types/TypeBill";
import treatmentString from "./utils/treatmentString";

export default function Table({ header, content }:{header:string[], content:IBill[]}) {

    return(
        <table className={`w-3/4 min-w-[300px] text-sm bg-white text-black`}>
            <thead className="text-center">
                <tr className="bg-gray-300 text-gray-600">
                    {header.map((col,index) => <th key={index} className={`p-2 ${col === 'Data' ? 'hidden sm:block': ''}`}>{col}</th>)}
                </tr>
            </thead>
            <tbody className="h-1/2 overflow-y-scroll">
                {content.map((row:IBill) => {
                    return row.tipo !== 'Investimento' && 
                    <tr key={row.id} className='text-center'>
                        <td className="p-2 hidden sm:block">{row.data as any}</td>
                        <td className="p-2 overflow-x-hidden">{treatmentString(row.descricao as string)}</td>
                        <td className="p-2">{treatmentString(row.tipo as string)}</td>
                        <td className="p-2">{treatmentString(row.subtipo as string)}</td>
                        <td className={`p-2 text-right w-28 ${row.tipo === 'Receita'? 'text-green-500' : 'text-red-500' }`}>R$ {row.valor?.toFixed(2).replace('.',',')}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}