import { MenuContext } from '@/context/MenuContext';
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';
import { useContext} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaRegCircleUser } from 'react-icons/fa6';


export default function Header() {
    const { toggleState } = useContext(MenuContext)
    const { user } = useContext(UserContext)

    return (
        <>
            <header className="fixed w-full h-16 top-0 left-0 grid grid-cols-2 px-8 py-4 bg-neutral-900 z-10 cursor-pointer md:grid-cols-3">
                <div className='hidden justify-start items-center text-xl text-lime-500 transition hover:opacity-90 md:flex'>
                    <AiOutlineMenu onClick={toggleState}/>
                </div>
                <div className="flex justify-start items-center md:ml-16 md:justify-center" >LOGO</div>
                {!user ?
                    <div className="flex justify-end gap-2 items-center">    
                        <Link href='/login' className='transition hover:scale-110 hover:text-lime-500'>Login</Link>
                        <span className="text-lime-500 text-2xl">/</span>
                        <Link href='/cadastro' className='transition hover:scale-110 hover:text-lime-500'>Cadastre-se</Link>
                    </div>
                    :
                    <div className="flex justify-end gap-2 items-center text-sm cursor-pointer">
                        {<p>{user.usuario.nome_social}</p>}
                        <div className='text-xl'>
                            <FaRegCircleUser/>
                        </div>
                    </div>
                }
            </header>
        </>
    )
}