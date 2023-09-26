import NavbarItem from "./NavbarItem";
import menuItens from "@/data/navigation";
import loginLogout from "@/data/loginLogout";

export default function Navbar() {
    return(
        <>
            <nav className="fixed w-fit h-full top-0 flex flex-col justify-between bg-neutral-800">
                <ul className="flex flex-col mt-16">
                    {menuItens.map(item => <NavbarItem item={item}/>)}
                </ul>
                <NavbarItem item={loginLogout[0]}/>
            </nav>
            <div className="w-32"></div>
        </>
    )
}