import { useContext } from "react"
import Header from "./Header"
import Navbar from "./Navbar"
import { MenuContext } from "@/context/MenuContext"

export default function Layout(props: any) {
    const {isOpen} = useContext(MenuContext)
    return (
        <div>
            <Header/>
            <Navbar/>
            <div className={`${!isOpen ? 'ml-16': 'ml-56' } mt-16`}>
                {props.children}  
            </div>
        </div>
    )
}