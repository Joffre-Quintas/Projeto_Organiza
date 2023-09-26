import { createContext, useState } from 'react';

interface IStateMenuContext {
    isOpen?: boolean,
    toggleState?: () => void
}
export const MenuContext = createContext<IStateMenuContext>({});

export default function MenuProvider(props:any) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleState() {
        setIsOpen(!isOpen)
    }
    return(
        <MenuContext.Provider value={{isOpen,toggleState}}>
            {props.children}
        </MenuContext.Provider>
    )
}
