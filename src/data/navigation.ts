import { BsGraphUpArrow, BsGear } from 'react-icons/bs'
import { AiOutlineDollarCircle, AiOutlineHome } from 'react-icons/ai'
import { TbReportMoney } from 'react-icons/tb'

const menuItens = [
    {
        "icon": AiOutlineHome,
        "name": "Início",
        "url": "./"
    },
    {
        "icon": AiOutlineDollarCircle,
        "name":"Receitas & Despesas",
        "url": './income_expenses'
    },
    {
        "icon": BsGraphUpArrow,
        "name": "Investimentos",
        "url": "./"
    },
    {
        "icon": TbReportMoney,
        "name": "Relatório",
        "url": "./report"
    },
    {
        "icon": BsGear,
        "name": "Configurações",
        "url": "./"
    }
]


export default menuItens;