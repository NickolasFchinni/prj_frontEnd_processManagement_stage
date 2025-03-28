"use client"
import "react-toastify/dist/ReactToastify.css"
import ProcessCard from "../components/ProcessCard"
import ProcessModal from "../components/ModalShowProcess"
import EditProcessModal from "../components/ModalEditProcess"
import CreateProcessModal from "../components/ModalCreateProcess"
import { useProcesses } from "../hooks/userProcesses"
import { handleDeleteSubprocess } from "../services/processes"

const Processes = () => {
  const {
    processes,
    areas,
    totalAreas,
    subprocesses,
    showCreateModal,
    showEditModal,
    setShowEditModal,
    processToEdit,
    setProcessToEdit,
    selectedProcess,
    filters,
    setFilters,
    fetchSubprocesses,
    fetchAreaById,
    handleProcessClick,
    handleCreateProcessClick,
    closeModal,
    closeCreateModal,
    handleUpdate,
    handleDelete,
    handleEditChange,
  } = useProcesses()

  const filteredProcesses = processes.filter((process) => {
    const matchesSearch = process.name
      .toLowerCase()
      .includes(filters.search.toLowerCase())

    const matchesStatus =
      filters.statuses.length === 0 || filters.statuses.includes(process.status)

    const matchesArea =
      filters.areas.length === 0 || filters.areas.includes(process.areaId)

    const matchesPriority =
      filters.priorities.length === 0 ||
      filters.priorities.includes(process.priority)

    const isMainProcess = process.parentProcessId === null

    return (
      matchesSearch &&
      matchesStatus &&
      matchesArea &&
      matchesPriority &&
      isMainProcess
    )
  })

  return (
    <div className="p-4">
      {/* Header de Processos */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-[#21005E]">
          Processos da empresa por área
        </h2>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
          onClick={handleCreateProcessClick}
        >
          Criar Novo Processo
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Filtrar Processos</h3>

        {/* Campo de busca */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Pesquisar por nome
          </label>
          <input
            type="text"
            placeholder="Digite o nome do processo..."
            className="w-full p-2 border rounded"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <div className="space-y-2">
              {["Ativo", "Inativo"].map((status) => (
                <div key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`status-${status}`}
                    checked={filters.statuses.includes(
                      status as "Ativo" | "Inativo"
                    )}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        statuses: prev.statuses.includes(
                          status as "Ativo" | "Inativo"
                        )
                          ? prev.statuses.filter((s) => s !== status)
                          : [...prev.statuses, status as "Ativo" | "Inativo"],
                      }))
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`status-${status}`}>{status}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Filtro por Área */}
          <div>
            <label className="block text-sm font-medium mb-1">Área</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {totalAreas.map((area) => (
                <div key={area.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`area-${area.id}`}
                    checked={filters.areas.includes(area.id)}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        areas: prev.areas.includes(area.id)
                          ? prev.areas.filter((a) => a !== area.id)
                          : [...prev.areas, area.id],
                      }))
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`area-${area.id}`}>{area.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Filtro por Prioridade */}
          <div>
            <label className="block text-sm font-medium mb-1">Prioridade</label>
            <div className="space-y-2">
              {["Baixa", "Média", "Alta"].map((priority) => (
                <div key={priority} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`priority-${priority}`}
                    checked={filters.priorities.includes(
                      priority as "Baixa" | "Média" | "Alta"
                    )}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        priorities: prev.priorities.includes(
                          priority as "Baixa" | "Média" | "Alta"
                        )
                          ? prev.priorities.filter((p) => p !== priority)
                          : [
                              ...prev.priorities,
                              priority as "Baixa" | "Média" | "Alta",
                            ],
                      }))
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`priority-${priority}`}>{priority}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botão para limpar filtros */}
        <button
          onClick={() =>
            setFilters({
              search: "",
              statuses: [],
              areas: [],
              priorities: [],
            })
          }
          className="mt-4 text-sm text-purple-600 hover:underline"
        >
          Limpar todos os filtros
        </button>
      </div>

      {/* Área de exibição de Processos */}
      <div
        className={`${
          filteredProcesses.length !== 0 ? "grid grid-cols-4 gap-4" : null
        } pt-4`}
      >
        {filteredProcesses.length === 0 ? (
          <div className="flex items-center">N
            <p className="text-2xl font-bold text-[#605D62]">
              Nenhum processo encontrado com os filtros atuais.
            </p>
          </div>
        ) : (
          filteredProcesses.map((process) => (
            <ProcessCard
              key={process.id}
              process={process}
              area={areas[process.areaId]}
              onClick={() => {
                fetchAreaById(process.areaId)
                handleProcessClick(process)
              }}
            />
          ))
        )}
      </div>

      {/* Modal para criar novo processo */}
      {showCreateModal && (
        <CreateProcessModal
          areas={totalAreas}
          closeCreateModal={closeCreateModal}
        />
      )}

      {/* Modal para mostrar os detalhes do processo */}
      {selectedProcess && (
        <ProcessModal
          selectedProcess={selectedProcess}
          subprocesses={subprocesses}
          areas={areas}
          closeModal={closeModal}
          setProcessToEdit={setProcessToEdit}
          setShowEditModal={setShowEditModal}
          handleDelete={handleDelete}
          handleDeleteSubprocess={handleDeleteSubprocess}
          fetchSubprocesses={fetchSubprocesses}
        />
      )}

      {/* Modal para editar um processo */}
      {showEditModal && processToEdit && (
        <EditProcessModal
          areas={totalAreas}
          processToEdit={processToEdit}
          handleEditChange={handleEditChange}
          handleUpdate={handleUpdate}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  )
}

export default Processes
