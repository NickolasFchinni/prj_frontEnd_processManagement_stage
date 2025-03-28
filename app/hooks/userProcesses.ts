import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface Area {
  id: string
  name: string
  description: string
  createdAt: string
}

interface Process {
  id: string
  name: string
  description: string
  areaId: string
  parentProcessId: string | null
  isSystem: boolean
  status: "Ativo" | "Inativo"
  priority: "Baixa" | "Média" | "Alta"
  tools: string
  createdAt: string
  updatedAt: string
  responsible: string
  documentation: string
  area: Area
  parentProcess?: Process | null
}

export const useProcesses = () => {
  const [processes, setProcesses] = useState<Process[]>([])
  const [areas, setAreas] = useState<{ [key: string]: Area }>({})
  const [totalAreas, setTotalAreas] = useState<Area[]>([])
  const [subprocesses, setSubprocesses] = useState<{
    [processId: string]: Process[]
  }>({})
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [processToEdit, setProcessToEdit] = useState<Process | null>(null)
  const [newProcess, setNewProcess] = useState({
    name: "",
    description: "",
    areaId: "",
    priority: "Baixa",
    status: "Ativo",
    tools: "",
    responsible: "",
    documentation: "",
  })
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null)
  const [filters, setFilters] = useState({
    search: "",
    statuses: [] as ("Ativo" | "Inativo")[],
    areas: [] as string[],
    priorities: [] as ("Baixa" | "Média" | "Alta")[],
  })

  const fetchAreaById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/areas/${id}`)
      if (!response.ok) throw new Error("Erro ao buscar a área")

      const data = await response.json()
      setAreas((prevAreas) => ({ ...prevAreas, [id]: data }))
    } catch (error) {
      console.error("Erro:", error)
    }
  }

  useEffect(() => {
    const fetchTotalAreas = async () => {
      const response = await fetch("http://localhost:5000/api/areas")
      const data = await response.json()
      setTotalAreas(data)
    }

    fetchTotalAreas()
  }, [])

  const fetchSubprocesses = async (processId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/processes/${processId}/subprocesses`
      )
      if (!response.ok) throw new Error("Erro ao buscar subprocessos")

      const data = await response.json()
      setSubprocesses((prevSubprocesses) => ({
        ...prevSubprocesses,
        [processId]: data,
      }))
    } catch (error) {
      console.error("Erro ao buscar subprocessos:", error)
    }
  }

  useEffect(() => {
    const fetchProcesses = async () => {
      const response = await fetch("http://localhost:5000/api/processes")
      const data = await response.json()
      setProcesses(data)
    }
    fetchProcesses()
  }, [])

  useEffect(() => {
    processes.forEach((process) => {
      if (process.parentProcessId === null && !subprocesses[process.id]) {
        fetchSubprocesses(process.id)
      }
    })
  }, [processes, subprocesses])

  useEffect(() => {
    processes.forEach((process) => {
      if (process.areaId && !areas[process.areaId]) {
        fetchAreaById(process.areaId)
      }
    })
  }, [processes, areas])

  const handleProcessClick = (process: Process) => {
    setSelectedProcess(process)
  }

  const handleCreateProcessClick = () => {
    setShowCreateModal(true)
  }

  const closeModal = () => {
    setSelectedProcess(null)
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setNewProcess({
      name: "",
      description: "",
      areaId: "",
      priority: "Baixa",
      status: "Ativo",
      tools: "",
      responsible: "",
      documentation: "",
    })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (processToEdit) {
      const response = await fetch(
        `http://localhost:5000/api/processes/${processToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(processToEdit),
        }
      )
      if (response.ok) {
        const updatedProcess = await response.json()
        setProcesses((prevProcesses) =>
          prevProcesses.map((process) =>
            process.id === updatedProcess.id ? updatedProcess : process
          )
        )

        processToEdit.parentProcessId == null
          ? (setSelectedProcess(null),
            toast.success("Processo editado com sucesso!"))
          : fetchSubprocesses(processToEdit.parentProcessId),
          toast.success("SubProcesso editado com sucesso!")

        setShowEditModal(false)
      } else {
        toast.error("Erro inesperado ao editar área.")
      }
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar este processo?"
    )

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/processes/${id}`,
          {
            method: "DELETE",
          }
        )

        if (response.ok) {
          setProcesses(processes.filter((process) => process.id !== id))
          closeModal()
          toast.success("Processo deletado com sucesso!")
        } else {
          const errorData = await response.json()
          toast.error(
            errorData.error || "Erro desconhecido ao tentar deletar o prcesso"
          )
        }
      } catch (error) {
        toast.error("Erro ao tentar deletar processo")
      }
    }
  }

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (processToEdit) {
      const { name, value } = e.target
      setProcessToEdit((prevArea) => ({ ...prevArea!, [name]: value }))
    }
  }

  return{
    processes,
    setProcesses,
    areas,
    setAreas,
    totalAreas,
    setTotalAreas,
    subprocesses,
    setSubprocesses,
    showCreateModal, 
    setShowCreateModal,
    showEditModal,
    setShowEditModal,
    processToEdit,
    setProcessToEdit,
    newProcess,
    setNewProcess,
    selectedProcess,
    setSelectedProcess,
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
  }

}