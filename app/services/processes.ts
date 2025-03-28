import { toast } from "react-toastify"

export const handleDeleteSubprocess = async (id: string, idSubprocesso: string, fetchSubprocesses: any) => {
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
        toast.success("Subprocesso deletado com sucesso!")
        fetchSubprocesses(idSubprocesso)
      } else {
        const errorData = await response.json()
        toast.error(
          errorData.error || "Erro desconhecido ao tentar deletar o subprocesso"
        )
      }
    } catch (error) {
      toast.error("Erro ao tentar deletar subprocesso")
    }
  }
}
