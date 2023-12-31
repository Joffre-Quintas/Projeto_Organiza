import { MenuContext } from "@/context/MenuContext";
import Link from "next/link";
import { useContext } from "react";
import { IconType } from "react-icons";

export default function NavbarItem({item}:{item:{icon: IconType, name: string, url: string}}) {
    const {isOpen} = useContext(MenuContext)
    return(
        <Link href={item.url}>
            <li className={`flex justify-start items-center gap-4 px-4 py-4 text-lime-500 transition ${item.name === 'Sair' ? 'hover:bg-red-400 hover:text-black' : 'hover:bg-lime-200 hover:text-black'}`}
            >   
                <div className="text-2xl">
                    {<item.icon/>}  
                </div>
                <div className={`${!isOpen && 'hidden'} text-sm`}>
                    {item.name}
                </div>
            </li>
        </Link>
    )
}