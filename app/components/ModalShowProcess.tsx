import Image from "next/image"
import CreateSubprocessModal from "./ModalCreateSubprocess"
import { useState } from "react"
import { SubprocessTreeNode } from "./SubprocessoArvore"

interface ProcessModalProps {
  selectedProcess: any
  subprocesses: Record<number, any[]>
  areas: Record<number, any>
  closeModal: () => void
  setProcessToEdit: (process: any) => void
  setShowEditModal: (show: boolean) => void
  handleDelete: (id: string) => void
  handleDeleteSubprocess: (id: string, idSubprocesso: string, fetchSubprocesses: any) => void
  fetchSubprocesses: (processId: string) => void
}

const ProcessModal: React.FC<ProcessModalProps> = ({
  selectedProcess,
  subprocesses,
  areas,
  closeModal,
  setProcessToEdit,
  setShowEditModal,
  handleDelete,
  handleDeleteSubprocess,
  fetchSubprocesses,
}) => {
  if (!selectedProcess) return null
  const [isSubprocessModalOpen, setSubprocessModalOpen] = useState(false)

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg transition-transform transform duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          {selectedProcess.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 text-center">
          {selectedProcess.description}
        </p>

        <div className="mb-2">
          <strong className="block text-sm font-medium text-gray-700">
            Subprocessos:
          </strong>
          <ul>
            {subprocesses[selectedProcess.id]?.length ? (
              subprocesses[selectedProcess.id].map((subprocess) => (
                <SubprocessTreeNode
                  key={subprocess.id}
                  subprocess={subprocess}
                  areas={areas}
                  setProcessToEdit={setProcessToEdit}
                  setShowEditModal={setShowEditModal}
                  handleDeleteSubprocess={handleDeleteSubprocess}
                  fetchSubprocesses={fetchSubprocesses}
                />
              ))
            ) : (
              <li className="text-sm text-gray-600">
                Não há subprocessos registrados.
              </li>
            )}
          </ul>
        </div>

        <div className="mb-2">
          <strong className="block text-sm font-medium text-gray-700">
            Área:
          </strong>
          <span className="text-sm text-gray-600">
            {areas[selectedProcess.areaId]?.name || "Carregando..."}
          </span>
        </div>

        <div className="mb-2">
          <strong className="block text-sm font-medium text-gray-700">
            Responsáveis:
          </strong>
          <p className="text-sm text-gray-600">
            - {selectedProcess.responsible}
          </p>
        </div>

        <div className="mb-2">
          <strong className="block text-sm font-medium text-gray-700">
            Ferramentas:
          </strong>
          <p className="text-sm text-gray-600">
            {" "}
            {selectedProcess.tools
              .split(",")
              .map((tool: string) => tool.trim())
              .map((tool: string, index: number) => (
                <span key={index}>
                  <span>. {tool}</span>
                  <br />
                </span>
              ))}
          </p>
        </div>

        <div className="mb-2">
          <strong className="block text-sm font-medium text-gray-700">
            Documentação:
          </strong>
          <p className="text-sm text-gray-600">
            {selectedProcess.documentation
              .split(",")
              .map((tool: string, index: number) => tool.trim())
              .map((tool: string, index: number) => (
                <span key={index}>
                  <span>. {tool}</span>
                  <br />
                </span>
              ))}
          </p>
        </div>

        <div className="mb-2">
          <strong className="block text-sm font-medium text-gray-700">
            Prioridade:
          </strong>
          <span className="text-sm text-gray-600">
            {selectedProcess.priority}
          </span>
        </div>

        <div className="mb-2">
          <strong className="block text-sm font-medium text-gray-700">
            Status:
          </strong>
          <span className="text-sm text-gray-600">
            {selectedProcess.status}
          </span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all"
            onClick={closeModal}
          >
            Fechar
          </button>

          <div className="flex items-center justify-center gap-3">
            <button
              className=" bg-purple-600 text-white px-4 py-2 rounded"
              onClick={() => setSubprocessModalOpen(true)}
            >
              Criar Subprocesso
            </button>

            {isSubprocessModalOpen && (
              <CreateSubprocessModal
                parentProcessId={selectedProcess.id}
                areaId={selectedProcess.area.id}
                areaName={selectedProcess.area.name}
                closeModal={() => setSubprocessModalOpen(false)}
                onSubprocessCreated={() =>
                  fetchSubprocesses && fetchSubprocesses(selectedProcess.id)
                }
              />
            )}
            <Image
              onClick={() => {
                setProcessToEdit(selectedProcess)
                setShowEditModal(true)
              }}
              className="px-2 py-1 w-10 rounded-md mr-2 hover:cursor-pointer hover:bg-gray-200 transition-all"
              src={"/edit_icon.svg"}
              alt="edit área button"
              width={24}
              height={24}
            />
            <Image
              onClick={() => handleDelete(selectedProcess.id)}
              className="px-2 py-1 w-10 rounded-md mr-2 hover:cursor-pointer hover:bg-gray-200 transition-all"
              src={"/delete_icon.svg"}
              alt="delete área button"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessModal
