import Header from "./Header"
import Navbar from "./Navbar"

export default function Layout(props: any) {
    return (
        <div>
            <Header/>
            <Navbar/>
            {props.children}
        </div>
    )
}