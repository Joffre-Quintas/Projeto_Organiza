import Link from "next/link"
import Image from "next/image"
import financasImg from '../../public/images/financasHome.jpeg' 

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-36">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">Bem-Vindo ao <span className="text-lime-500 text">Organiza</span>!</h1>
        <h2 className="text-2xl">O Seu Controle Financeiro Pessoal.</h2>
        <p><span className="text-lime-500 hover:text-lime-300"><Link href='./register'>Registre-se gratuitamente</Link></span> e comece a transformar sua vida financeira!</p>
      </div>
      <Image src={financasImg} alt="finance" className="rounded-3xl"/>
    </div>
  )
}