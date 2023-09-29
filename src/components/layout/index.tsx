import { useContext, useEffect, useState } from "react"
import Header from "./Header"
import Navbar from "./Navbar"
import { MenuContext } from "@/context/MenuContext"

export default function Layout(props: any) {
    const {isOpen, close} = useContext(MenuContext)
    const [windowSize, setwindowSize] = useState<number>(1024)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setwindowSize(window.innerWidth)
        })
        windowSize <= 768 && close()
    },[windowSize])


    return (
        <div>
            <Header/>
            <Navbar/>
            <div className={/*`${!isOpen ? 'ml-16': 'ml-56'}*/ 'ml-16 mt-16' /*`*/}>
                {props.children}  
            </div>
        </div>
    )
}