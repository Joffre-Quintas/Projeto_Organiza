import Form from "@/components/Form";

export default function Register() {
    const endpoint = 'https://defiant-seal-wetsuit.cyclic.app/cadastrar'

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl mt-8 mb-4">Cadastro</h1>
            <Form endpoint={endpoint} method={'POST'}/>
        </div>
    )
}