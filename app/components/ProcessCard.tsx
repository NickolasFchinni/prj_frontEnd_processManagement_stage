import Image from "next/image"
import PrioridadeIcon from "@/public/prioridade_icon.svg"
import UserIcon from "@/public/user_icon.svg"
import ToolsIcon from "@/public/tools_icon.svg"
import DocumentIcon from "@/public/documentacao_icon.svg"

interface Process {
  id: string
  name: string
  description: string
  areaId: string
  status: "Ativo" | "Inativo"
  priority: "Baixa" | "Média" | "Alta"
  responsible: string
  tools: string
  documentation: string
}

interface Area {
  id: string
  name: string
}

interface ProcessCardProps {
  process: Process
  area: Area | undefined
  onClick: () => void
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  process,
  area,
  onClick,
}) => {
  return (
    <div
      className="bg-[#fff] p-4 rounded-lg shadow-lg cursor-pointer flex flex-col justify-between"
      onClick={onClick}
    >
      <div>
        <h3 className="font-bold pb-2 truncate">{process.name}</h3>
        <p className="text-sm text-[#605D62] line-clamp-2 h-10">
          {process.description}
        </p>
      </div>
      <div className="">
        <div className="flex items-center gap-1 mt-4">
          <Image
            src={PrioridadeIcon}
            alt="ícone de prioridade"
            className="w-4"
          />
          <p
            className={`text-sm ${
              process.priority === "Alta"
                ? "text-red-500"
                : process.priority === "Média"
                ? "text-orange-500"
                : "text-green-500"
            }`}
          >
            <span className="text-[#605D62]">-</span> {process.priority}
          </p>
        </div>
        <div className="flex items-start gap-1">
          <Image src={UserIcon} alt="ícone de responsável" className="w-4" />
          <p className="text-sm text-[#605D62]">- {process.responsible}</p>
        </div>


      </div>
      <div className="flex justify-between mt-4">
        <p className="text-xs font-semibold">{area ? area.name : "Carregando área..."}</p>
        <p
          className={`text-xs font-semibold ${
            process.status === "Ativo" ? "text-green-500" : "text-red-500"
          }`}
        >
          {process.status}
        </p>
      </div>
    </div>
  )
}

export default ProcessCard
