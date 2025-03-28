import React, { useState, useEffect } from 'react';

interface Process {
  id: string;
  name: string;
  description: string;
  areaId: string;
  status: string;
  priority: string;
  tools: string;
  documentation: string;
  responsible: string
}

interface Area {
  id: string;
  name: string;
}

interface EditProcessModalProps {
  areas: Area[];
  processToEdit: Process;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleUpdate: (e: React.FormEvent) => void;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProcessModal: React.FC<EditProcessModalProps> = ({
  areas,
  processToEdit,
  handleEditChange,
  handleUpdate,
  setShowEditModal
}) => {

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur-xs z-50">
      <div className="bg-[#101828] text-white p-6 rounded-lg w-1/3 transform transition-all duration-500 ease-out">
        <h3 className="text-xl font-semibold mb-4">Editar Processo</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              name="name"
              value={processToEdit.name}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              name="description"
              value={processToEdit.description}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Área</label>
            <select
              name="areaId"
              value={processToEdit.areaId}
              onChange={handleEditChange}
              className="w-full p-2 border border-[#333A48] bg-[#1C2433] rounded-lg"
            >
              <option value="">Escolha uma das opções</option>
              {Object.values(areas).map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Responsáveis</label>
            <input
              type="text"
              name="responsible"
              value={processToEdit.responsible}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Status</label>
            <select
              name="status"
              value={processToEdit.status}
              onChange={handleEditChange}
              className="w-full p-2 border border-[#333A48] bg-[#1C2433] rounded-lg"
            >
              <option value="">Escolha uma das opções</option>
                <option value="Ativo">
                  Ativo
                </option>
                <option value="Inativo">
                  Inativo
                </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Prioridade</label>
            <select
              name="priority"
              value={processToEdit.priority}
              onChange={handleEditChange}
              className="w-full p-2 border border-[#333A48] bg-[#1C2433] rounded-lg"
            >
              <option value="">Escolha uma das opções</option>
                <option value="Baixa">
                  Baixa
                </option>
                <option value="Média">
                  Média
                </option>
                <option value="Alta">
                  Alta
                </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ferramentas</label>
            <input
              type="text"
              name="tools"
              value={processToEdit.tools}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border-2 border-[#333A48] bg-[#1C2433] rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Documentação</label>
            <input
              type="text"
              name="documentation"
              value={processToEdit.documentation}
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
  );
};

export default EditProcessModal;