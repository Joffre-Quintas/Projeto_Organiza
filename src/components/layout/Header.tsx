import { MenuContext } from '@/context/MenuContext';
import { useContext } from 'react';
import {AiOutlineMenu} from 'react-icons/ai';

export default function Header() {
    const { toggleState } = useContext(MenuContext)
    return (
        <>
            <header className="fixed w-full h-16 top-0 left-0 grid grid-cols-3 px-8 py-4 bg-neutral-900 z-10 cursor-pointer">
                <div className='flex justify-start items-center text-xl text-lime-500 transition hover:opacity-90'>
                    <AiOutlineMenu onClick={toggleState}/>
                </div>
                <div className="flex justify-center items-center">LOGO</div>
                <div className="flex justify-end items-center">
                    login <span className="text-lime-500 text-2xl">/</span> register
                </div>
            </header>
        </>
    )
}