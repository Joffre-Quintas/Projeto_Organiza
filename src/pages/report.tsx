import { ChangeEvent, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { MdOutlineCleaningServices } from 'react-icons/md'

export default function Report() {

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const years = [2020,2021,2022,2023]

    const [filterReport, setFilterReport] = useState({})

    function handleSetFilterReport(e:ChangeEvent<HTMLSelectElement>) {
        const {name, value} = e.target
        setFilterReport(current => {
            return {
                ...current,
                [name]:value
            }
        })
    }

    function handleRequestFilter() {
        console.log(filterReport)
    }

    function handleCleanFields() {
        setFilterReport({});  
    }

    return(
        <div className="flex flex-col items-center">

            <h1 className="text-4xl mt-8 mb-4">Relatório</h1>
            <div className="flex gap-4">
            <select 
                name="mes" 
                className="text-black text-sm px-2 py-1 outline-none"
                onChange={e => handleSetFilterReport(e)}
                value={filterReport.mes || ''} // Define o valor selecionado usando a propriedade `value`
            >
                <option value="">-</option> {/* Use `value` em vez de `selected` */}
                {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>

            <select 
                name="ano" 
                className="text-black text-sm px-2 py-1 outline-none"
                onChange={e => handleSetFilterReport(e)}
                value={filterReport.ano || ''}
            >
                <option value="">-</option> 
                {years.map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                ))}
            </select>

                <button 
                    className="flex justify-center items-center gap-2 bg-lime-500 px-4 py-1 hover:opacity-90 rounded-sm shadow-md shadow-gray-600 text-sm"
                    onClick={() => handleRequestFilter()}
                >
                    Filtrar 
                    <span className='scale-125'><BsFilter/></span>
                </button>
                <button 
                    className="flex justify-center items-center gap-2 bg-lime-500 px-4 py-1 hover:opacity-90 rounded-sm shadow-md shadow-gray-600 text-sm"
                    onClick={() => handleCleanFields()}
                >
                    Limpar Filtros 
                    <span className='scale-125'><MdOutlineCleaningServices/></span>
                </button>
            </div>
        </div>
    )
}