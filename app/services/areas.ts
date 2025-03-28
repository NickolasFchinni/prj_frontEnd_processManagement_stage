export const checkIfAreaHasProcesses = async (id: string) => {
  const response = await fetch(
    `http://localhost:5000/api/areas/${id}/areaProcesses`
  )
  const data = await response.json()
  return data.length > 0
}