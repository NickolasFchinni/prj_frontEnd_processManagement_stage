import Image from "next/image";
import { useState } from "react";
import CreateSubprocessModal from "./ModalCreateSubprocess";
import { useProcesses } from "../hooks/userProcesses";

interface SubprocessTreeNodeProps {
  subprocess: any;
  areas: Record<number, any>;
  setProcessToEdit: (process: any) => void;
  setShowEditModal: (show: boolean) => void;
  handleDeleteSubprocess: (id: string, parentId: string, fetchSubprocesses: any) => void;
  fetchSubprocesses: (processId: string) => void;
  depth?: number;
}

export const SubprocessTreeNode: React.FC<SubprocessTreeNodeProps> = ({
  subprocess,
  areas,
  setProcessToEdit,
  setShowEditModal,
  handleDeleteSubprocess,
  fetchSubprocesses,
  depth = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubprocessModalOpen, setSubprocessModalOpen] = useState(false);
  const [childSubprocesses, setChildSubprocesses] = useState<any[]>([]);

  const loadChildSubprocesses = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/processes/${subprocess.id}/subprocesses`
      );
      const data = await response.json();
      setChildSubprocesses(data);
    } catch (error) {
      console.error("Erro ao buscar subprocessos:", error);
    }
  };

  const toggleExpand = async () => {
    if (!isExpanded && childSubprocesses.length === 0) {
      await loadChildSubprocesses();
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span 
            className="mr-2 cursor-pointer"
            onClick={toggleExpand}
          >
            {childSubprocesses.length > 0 ? (isExpanded ? "▼" : "▶") : "•"}
          </span>
          <span className="text-sm text-gray-600">
            {subprocess.name}
          </span>
        </div>
        
        <div className="flex mb-1">
          <button
            className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs mr-2"
            onClick={() => setSubprocessModalOpen(true)}
          >
            + Sub
          </button>
          
          <Image
            onClick={() => {
              setProcessToEdit(subprocess);
              setShowEditModal(true);
            }}
            className="px-1 py-1 w-6 rounded-md hover:cursor-pointer hover:bg-gray-200 transition-all"
            src={"/edit_icon.svg"}
            alt="Editar"
            width={16}
            height={16}
          />
          
          <Image
            onClick={() => handleDeleteSubprocess(subprocess.id, subprocess.parentProcessId, fetchSubprocesses)}
            className="px-1 py-1 w-6 rounded-md hover:cursor-pointer hover:bg-gray-200 transition-all"
            src={"/delete_icon.svg"}
            alt="Deletar"
            width={16}
            height={16}
          />
        </div>
      </div>

      {isSubprocessModalOpen && (
        <CreateSubprocessModal
          parentProcessId={subprocess.id}
          areaId={subprocess.area.id}
          areaName={subprocess.area.name}
          closeModal={() => setSubprocessModalOpen(false)}
          onSubprocessCreated={() => {
            loadChildSubprocesses();
            fetchSubprocesses(subprocess.parentProcessId);
          }}
        />
      )}

      {isExpanded && childSubprocesses.length > 0 && (
        <div className="ml-4">
          {childSubprocesses.map((child) => (
            <SubprocessTreeNode
              key={child.id}
              subprocess={child}
              areas={areas}
              setProcessToEdit={setProcessToEdit}
              setShowEditModal={setShowEditModal}
              handleDeleteSubprocess={handleDeleteSubprocess}
              fetchSubprocesses={loadChildSubprocesses}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};