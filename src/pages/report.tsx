import { urlBaseAPI } from '@/data/urlapi';
import { IBill } from '@/types/TypeBill';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Chart } from 'react-google-charts';
import { BsFilter } from 'react-icons/bs';
import { MdOutlineCleaningServices } from 'react-icons/md'

export default function Report() {
    const currentData = {
        mes:(new Date()).getMonth()+1,
        ano:(new Date()).getFullYear()
    }

    const [filteredList, setFilteredList] = useState()
    const [filterReport, setFilterReport] = useState(currentData)

    const incomesValue = useMemo(() => {
        if(filteredList) {
            return filteredList.filter((bill: IBill) => bill.tipo === 'Receita').reduce((acumulator: number, current: IBill) => acumulator += current.valor as number, 0)
        }
    },[filteredList])
    const expensesValue = useMemo(() => {
        if(filteredList) {
            return filteredList.filter((bill: IBill) => bill.tipo === 'Despesa').reduce((acumulator: number, current: IBill) => acumulator += current.valor as number, 0)
        }
    },[filteredList])

    const chartColumnDiff = useMemo(() => {
        return {
            old:[["Periodo","Depesas"],[`${filterReport.mes}/${filterReport.ano}`, expensesValue]],
            new:[["Periodo","Receitas"],[`${filterReport.mes}/${filterReport.ano}`, incomesValue]]
        }
    },[incomesValue, expensesValue])

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const years = [2020,2021,2022,2023]

    useEffect(() => {
        handleSetList()
    },[])

    function handleChangeFilterReport(e:ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilterReport(current => {
            return {
                ...current,
                [name]: value
            }
        })
    }

    const handleSetList = useCallback(async () => {
        try {
            const { token } = JSON.parse(localStorage.getItem('userOrganiza') as string)
            const data = await fetch(`${urlBaseAPI}/listafinancas` ,{
                method:'POST',
                headers: {
                    "Content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({mes: filterReport.mes, ano: filterReport.ano})
            })
            setFilteredList(await data.json())
        } catch (error) {
            console.log(error)
        }
    },[filterReport])

    function handleCleanFields() {
        setFilterReport({mes: currentData.mes, ano: currentData.ano});
        handleSetList() 
    }

    function handleUpdateList() {
        handleSetList()
    }

    const expenseDetails = useMemo(() => {
        if(filteredList) {
            const expenses = filteredList.filter( bill => bill.tipo === 'Despesa')
            console.log(expenses)
        }
    },[filteredList])

    expenseDetails

    const data = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
    ];

    return(
        <div className="flex flex-col items-center">

            <h1 className="text-4xl my-8">Relatório</h1>
            <div className="flex flex-col md:flex-row gap-4 text-center">
                <select 
                    name="mes" 
                    className="text-black text-sm px-2 py-1 outline-none"
                    onChange={e => handleChangeFilterReport(e)}
                    value={filterReport.mes || ''}
                >
                    <option value="">-</option>
                    {months.map((month, index) => (
                        <option key={index} value={index}>{month}</option>
                    ))}
                </select>

                <select 
                    name="ano" 
                    className="text-black text-sm px-2 py-1 outline-none"
                    onChange={e => handleChangeFilterReport(e)}
                    value={filterReport.ano || ''}
                >
                    <option value="">-</option> 
                    {years.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>

                <button 
                    className="flex justify-center items-center gap-2 bg-lime-500 px-4 py-1 hover:opacity-90 rounded-sm shadow-md shadow-gray-600 text-sm"
                    onClick={() => handleUpdateList()}
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
            {filteredList && 
                <div className='mt-16 w-3/4'>
                    <h2 className='mb-4 text-lg'>Receitas x Despesas</h2>
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
                        diffdata={chartColumnDiff}
                    />
                </div>
            }
            
            {filteredList && 
                <div className='mt-16 w-3/4'>
                    <h2 className='mb-4 text-lg'>Depesas Detalhadas</h2>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={{title: ''}}
                        width={"100%"}
                        height={"400px"}
                    />
                </div>
            }
        </div>
    )
}

