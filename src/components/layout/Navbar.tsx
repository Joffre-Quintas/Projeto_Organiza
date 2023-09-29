import NavbarItem from "./NavbarItem";
import menuItens from "@/data/navigation";
import loginLogout from "@/data/loginLogout";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import router from "next/router";



export default function Navbar() {
    const { user ,handleLogin } = useContext(UserContext)
    return(
        <>
            <nav className="fixed w-fit h-full top-0 flex flex-col justify-between bg-neutral-800 shadow-md shadow-gray-800 z-10">
                {user ? 
                    <ul className="flex flex-col mt-16">
                        {menuItens.map((item,index) => <NavbarItem key={index} item={item}/>)}
                    </ul>
                    :
                    <div className="mt-16" onClick={() => router.push('./login')}>
                        <NavbarItem item={loginLogout[1]}/>
                    </div>
                }
                
                {user ?
                    <div onClick={() => handleLogin('logout')}>
                        <NavbarItem item={loginLogout[0]}/>
                    </div>
                    :
                    null
                }
            </nav>
            <div className="w-16 h-full bg-red-600"></div>
        </>
    )
}