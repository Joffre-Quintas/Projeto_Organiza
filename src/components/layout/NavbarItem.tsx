import Link from "next/link";
import { IconType } from "react-icons";

export default function NavbarItem({item}:{item:{icon: IconType, name: string, url: string}}) {
    return(
        <Link href={item.url}>
            <li className={`flex justify-start items-center gap-4 px-4 py-4 text-lime-500 transition ${item.name === 'Sair' ? 'hover:bg-red-400 hover:text-black' : 'hover:bg-lime-200 hover:text-black'}`}
                onClick={e => console.log(e.target)}
            >   
                <div className="text-2xl">
                    {<item.icon/>}  
                </div>
                <div>
                    {item.name}
                </div>
            </li>
        </Link>
    )
}