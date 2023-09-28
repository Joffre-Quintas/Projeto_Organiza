import router from "next/router";
import { ChangeEvent, FormEvent, useContext, useState } from "react";

export default function useForm() {

    const [formData, setFormData] = useState({
        nome_completo: null!,
        nome_social: null!,
        email: null!,
        senha: null!
    })

    function handleSetFormData(e:ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;

        setFormData(current => {
            return {
                ...current,
                [name]:value
            }
        })
    }

    async function handleSubmit(props:{e: FormEvent,endpoint:string, method:string}) {
        const {e, endpoint, method} = props;
        e.preventDefault()
        if(Object.values(formData).some((value => value === null))) {
            console.log("Preencha todos os campos!")
        } else if(method === 'POST') {
            try {
                const status = await fetch(endpoint, {
                    method: method,
                    headers: {
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(formData)
                })
                if(status.ok) {
                    setFormData({
                        nome_completo: null!,
                        nome_social: null!,
                        email: null!,
                        senha: null!
                    })
                    router.push('./')
                }
            }
            catch(err) {
                console.error(err)
            }
        }
    }

    return {
        formData,
        handleSetFormData,
        handleSubmit
    }
}
