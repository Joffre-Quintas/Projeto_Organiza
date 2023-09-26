export default function Header() {
    return (
        <>
            <header className="fixed w-full h-16 top-0 left-0 grid grid-cols-3 px-8 py-4 bg-neutral-900 z-10">
                <div></div>
                <div className="flex justify-center items-center">LOGO</div>
                <div className="flex justify-end items-center">
                    login <span className="text-lime-500 text-2xl">/</span> register
                </div>
            </header>
            <div className="w-full h-16"></div>
        </>
    )
}