import { createContext, useState } from 'react';

interface IStateMenuContext {
    isOpen?: boolean,
    toggleState?: () => void,
    close?: () => void
}
export const MenuContext = createContext<IStateMenuContext>({});

export default function MenuProvider(props:any) {
    const [isOpen, setIsOpen] = useState(false);

    function close() {
        setIsOpen(false)
    }

    function toggleState() {
        setIsOpen(!isOpen)
    }

    return(
        <MenuContext.Provider value={{isOpen,toggleState, close}}>
            {props.children}
        </MenuContext.Provider>
    )
}
