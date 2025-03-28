"use client"
import Image from "next/image"
import "react-toastify/dist/ReactToastify.css"
import Delete from "@/public/delete_icon.svg"
import Edit from "@/public/edit_icon.svg"
import MocalEditArea from "../components/MocalEditArea"
import MocalCreateArea from "../components/ModalCreateArea"
import { useAreas } from "../hooks/useAreas"

const Areas = () => {
  const {
    areas,
    showModal,
    setShowModal,
    showEditModal,
    setShowEditModal,
    newArea,
    areaToEdit,
    setAreaToEdit,
    handleChange,
    handleEditChange,
    handleSubmit,
    handleDelete,
    handleUpdate,
  } = useAreas()

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8 pb-4">
        <h2 className="text-3xl font-semibold text-[#21005E]">
          Áreas da Empresa
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Criar Nova Área
        </button>
      </div>

      {showModal && (
        <MocalCreateArea
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newArea={newArea}
          setShowModal={setShowModal}
        />
      )}
      {showEditModal && areaToEdit && (
        <MocalEditArea
          areaToEdit={areaToEdit}
          handleEditChange={handleEditChange}
          handleUpdate={handleUpdate}
          setShowEditModal={setShowEditModal}
        />
      )}

      <div className="bg-[#fff] p-4 rounded-lg shadow-lg	">
        <table className="min-w-full table-auto ">
          <thead>
            <tr className="text-black border-b-2 border-b-gray-300">
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Criado em</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody className="text-[#21005E] text-center">
            {areas.map((area) => (
              <tr key={area.id}>
                <td className="px-4 py-2">{area.name}</td>
                <td className="px-4 py-2">
                  {area.description.length < 1 ? "-" : area.description}
                </td>
                <td className="px-4 py-2">
                  {new Date(area.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <Image
                    onClick={() => {
                      setAreaToEdit(area)
                      setShowEditModal(true)
                    }}
                    className="px-2 py-1  w-10 rounded-md mr-2 hover:cursor-pointer"
                    src={Edit}
                    alt="edit área button"
                  />

                  <Image
                    onClick={() => handleDelete(area.id)}
                    className="px-2 py-1 w-10 text-white rounded-md hover:cursor-pointer"
                    src={Delete}
                    alt="delete área button"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Areas
