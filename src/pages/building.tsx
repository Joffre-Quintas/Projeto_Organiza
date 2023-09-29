import Image from "next/image"
import buildingIcon from '../../public/building.svg'

export default function Building() {
  return(
    <div className="flex flex-col gap-2 text-lime-500 justify-center text-center my-48">
      <p className="text-4xl">OPA!</p>
      <p>Perdão pelo incoveniente, mas a página ainda esta em construção...</p>
      <div className="flex justify-center mt-16">
        <Image src={buildingIcon} width={300} alt="buildIcon"/>
      </div>

    </div>
    )
} 