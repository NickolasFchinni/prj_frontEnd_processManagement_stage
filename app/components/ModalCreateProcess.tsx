import React, { useState } from "react"
import { toast } from "react-toastify"

interface Area {
  id: string
  name: string
}

interface CreateProcessModalProps {
  areas: Area[]
  closeCreateModal: () => void
}

const CreateProcessModal: React.FC<CreateProcessModalProps> = ({
  areas,
  closeCreateModal,
}) => {
  const [newProcess, setNewProcess] = useState({
    name: "",
    description: "",
    areaId: "",
    priority: "Baixa",
    status: "Ativo",
    responsible: "",
    documentation: "",
    tools: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setNewProcess((prevProcess) => ({
      ...prevProcess,
      [name]: value,
    }))
  }

  const handleCreateProcess = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/processes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProcess),
      })
      if (!response.ok) throw new Error("Erro ao criar o processo")

      toast.success("Processo criado com sucesso!")
      closeCreateModal()
    } catch (error) {
      toast.error("Erro ao criar o processo")
      console.error("Erro:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-xs">
      <div className="bg-[#101828] text-white p-6 rounded-lg shadow-lg w-2/4 ">
        <h3 className="text-2xl font-bold mb-4">Criar Novo Processo</h3>
        <form onSubmit={handleCreateProcess}>
          <div className="flex justify-between gap-12">
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block text-sm font-semibold">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={newProcess.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Descrição</label>
                <textarea
                  name="description"
                  value={newProcess.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Área</label>
                <select
                  name="areaId"
                  value={newProcess.areaId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  required
                >
                  <option value="">Selecione a área</option>
                  {Object.values(areas).map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Prioridade
                </label>
                <select
                  name="priority"
                  value={newProcess.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  required
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Status</label>
                <select
                  name="status"
                  value={newProcess.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  required
                >
                  <option value="">Selecione um status</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Responsáveis
                </label>
                <input
                  type="text"
                  name="responsible"
                  value={newProcess.responsible}
                  onChange={(e) =>
                    setNewProcess({
                      ...newProcess,
                      responsible: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Ferramentas
                </label>
                <input
                  type="text"
                  name="tools"
                  value={newProcess.tools}
                  onChange={(e) =>
                    setNewProcess({
                      ...newProcess,
                      tools: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">
                  Documentação
                </label>
                <input
                  type="text"
                  name="documentation"
                  value={newProcess.documentation}
                  onChange={(e) =>
                    setNewProcess({
                      ...newProcess,
                      documentation: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                />
              </div>
            </div>
          </div>
          {/* Outros campos podem ser adicionados aqui */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              type="submit"
            >
              Criar
            </button>
            <button
              className="bg-[#28303E] text-white px-4 py-2 rounded-lg"
              onClick={closeCreateModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProcessModal
