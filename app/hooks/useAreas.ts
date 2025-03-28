import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { checkIfAreaHasProcesses } from "../services/areas"

interface Area {
  id: string
  name: string
  description: string
  createdAt: string
}

export const useAreas = () => {
  const [areas, setAreas] = useState<Area[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [newArea, setNewArea] = useState<Area>({
    id: "",
    name: "",
    description: "",
    createdAt: "",
  })
  const [areaToEdit, setAreaToEdit] = useState<Area | null>(null)

  useEffect(() => {
    const fetchAreas = async () => {
      const response = await fetch("http://localhost:5000/api/areas")
      const data = await response.json()
      setAreas(data)
    }
    fetchAreas()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewArea((prevArea) => ({ ...prevArea, [name]: value }))
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (areaToEdit) {
      const { name, value } = e.target
      setAreaToEdit((prevArea) => ({ ...prevArea!, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/areas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArea),
    })
    if (response.ok) {
      const createdArea = await response.json()
      setAreas((prevAreas) => [...prevAreas, createdArea])
      setShowModal(false)
      toast.success("Nova área criada com sucesso!")
    } else {
      toast.error("Ocorreu um erro inesperado ao criar sua nova área.")
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar esta área?"
    )
    if (confirmDelete) {
      try {
        const hasProcesses = await checkIfAreaHasProcesses(id)
        if (hasProcesses) {
          toast.error("Não é possível deletar uma área com processos associados.")
          return
        }

        const response = await fetch(`http://localhost:5000/api/areas/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setAreas(areas.filter((area) => area.id !== id))
          toast.success("Área deletada com sucesso!")
        } else {
          toast.error("Erro desconhecido ao tentar deletar a área")
        }
      } catch {
        toast.error("Erro ao tentar deletar a área")
      }
    }
  }



  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (areaToEdit) {
      const response = await fetch(
        `http://localhost:5000/api/processes/${areaToEdit.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(areaToEdit),
        }
      )
      if (response.ok) {
        const updatedArea = await response.json()
        setAreas((prevAreas) =>
          prevAreas.map((area) =>
            area.id === updatedArea.id ? updatedArea : area
          )
        )
        setShowEditModal(false)
        toast.success("Área editada com sucesso!")
      } else {
        toast.error("Erro inesperado ao editar área.")
      }
    }
  }

  return {
    areas,
    setAreas,
    showModal,
    setShowModal,
    showEditModal,
    setShowEditModal,
    newArea,
    setNewArea,
    areaToEdit,
    setAreaToEdit,
    handleChange,
    handleEditChange,
    handleSubmit,
    handleDelete,
    handleUpdate,
  }
}
