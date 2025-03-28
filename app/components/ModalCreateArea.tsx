interface Area {
  id: string
  name: string
  description: string
}

interface CreateAreaModalProps {
  newArea: Area
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const MocalCreateArea: React.FC<CreateAreaModalProps> = ({
  newArea,
  handleChange,
  handleSubmit,
  setShowModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur-xs">
      <div className="bg-[#101828] text-white p-6 rounded-lg w-1/3 transform transition-all duration-500 ease-out">
        <h3 className="text-xl font-semibold mb-4">Criar Nova Área</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={newArea.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <input
              type="text"
              name="description"
              value={newArea.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              Criar
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="ml-2 px-4 py-2 bg-[#28303E] text-white rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MocalCreateArea
