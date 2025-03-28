import React, { useState } from "react"
import { toast } from "react-toastify"

interface CreateSubprocessModalProps {
  parentProcessId: string
  areaId: string
  areaName: string
  closeModal: () => void
  onSubprocessCreated?: () => void 
}

const CreateSubprocessModal: React.FC<CreateSubprocessModalProps> = ({
  parentProcessId,
  areaId,
  areaName,
  closeModal,
  onSubprocessCreated,
}) => {
  const [newSubprocess, setNewSubprocess] = useState({
    name: "",
    description: "",
    areaId: areaId,
    parentProcessId: parentProcessId,
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
    setNewSubprocess((prevSubprocess) => ({
      ...prevSubprocess,
      [name]: value,
    }))
  }

  const handleCreateSubprocess = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/processes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubprocess),
      })

      if (!response.ok) throw new Error("Erro ao criar o subprocesso")

      toast.success("Subprocesso criado com sucesso!")
      closeModal()
      onSubprocessCreated?.()
    } catch (error) {
      toast.error("Erro ao criar o subprocesso")
      console.error("Erro:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-xs">
      <div className="bg-[#101828] text-white p-6 rounded-lg shadow-lg absolute w-[900px]">
        <h3 className="text-2xl font-bold mb-4">Criar Subprocesso</h3>
        <form onSubmit={handleCreateSubprocess}>
          <div className="flex justify-between gap-12">
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block text-sm font-semibold">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={newSubprocess.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Descrição</label>
                <textarea
                  name="description"
                  value={newSubprocess.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Área</label>
                <input
                  type="text"
                  value={areaName}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Prioridade</label>
                <select
                  name="priority"
                  value={newSubprocess.priority}
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
                  value={newSubprocess.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  required
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            <div className="w-1/2">
              <div className="mb-4">
                <label className="block text-sm font-semibold">Responsáveis</label>
                <input
                  type="text"
                  name="responsible"
                  value={newSubprocess.responsible}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Ferramentas</label>
                <input
                  type="text"
                  name="tools"
                  value={newSubprocess.tools}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Documentação</label>
                <input
                  type="text"
                  name="documentation"
                  value={newSubprocess.documentation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg" type="submit">
              Criar
            </button>
            <button className="bg-[#28303E] text-white px-4 py-2 rounded-lg" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateSubprocessModal
