import Form from "@/components/Form";
import { urlBaseAPI } from "@/data/urlapi";

export default function Register() {
    const endpoint = `${urlBaseAPI}/cadastrar`

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl mt-8 mb-4">Cadastro</h1>
            <Form endpoint={endpoint} method={'POST'}/>
        </div>
    )
}