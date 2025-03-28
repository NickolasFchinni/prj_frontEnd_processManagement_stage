import React from "react"

interface Area {
  id: string
  name: string
  description: string
}

interface EditAreaModalProps {
  areaToEdit: Area
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUpdate: (e: React.FormEvent) => void
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

const MocalEditArea: React.FC<EditAreaModalProps> = ({
  areaToEdit,
  handleEditChange,
  handleUpdate,
  setShowEditModal,
}) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur-xs">
        <div className="bg-[#101828] text-white p-6 rounded-lg w-1/3 transform transition-all duration-500 ease-out">
          <h3 className="text-xl font-semibold mb-4">Editar Área</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={areaToEdit.name}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Descrição
              </label>
              <input
                type="text"
                name="description"
                value={areaToEdit.description}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Atualizar
              </button>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="ml-2 px-4 py-2 bg-[#28303E] text-white rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MocalEditArea
