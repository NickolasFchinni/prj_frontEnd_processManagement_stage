"use client";
import React, { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

interface Area {
  id: string;
  name: string;
  description: string;
}

interface Process {
  id: string;
  name: string;
  description: string;
  areaId: string;
  parentProcessId: string | null;
  status: "Ativo" | "Inativo";
  priority: "Baixa" | "Média" | "Alta";
}

const Dashboard = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areasRes, processesRes] = await Promise.all([
          fetch("http://localhost:5000/api/areas"),
          fetch("http://localhost:5000/api/processes"),
        ]);

        const areasData = await areasRes.json();
        const processesData = await processesRes.json();

        setAreas(areasData);
        setProcesses(processesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (areas.length > 0 && processes.length > 0) {
      createFlowElements();
    }
  }, [areas, processes]);

  const createFlowElements = () => {
    const newNodes: any[] = [];
    const newEdges: any[] = [];

    areas.forEach((area, index) => {
      newNodes.push({
        id: `area-${area.id}`,
        type: "input",
        data: { 
          label: (
            <div className="p-2 bg-blue-100 rounded-lg border-2 border-blue-300">
              <div className="font-bold text-blue-800">{area.name}</div>
              <div className="text-xs text-blue-600">{area.description || "Sem descrição"}</div>
            </div>
          ) 
        },
        position: { x: 100, y: 100 + index * 150 },
        style: {
          background: "transparent",
          border: "none",
          width: 200,
        },
      });
    });

    processes.forEach((process, index) => {
      const areaNode = areas.find(a => a.id === process.areaId);
      const parentProcess = process.parentProcessId 
        ? processes.find(p => p.id === process.parentProcessId)
        : null;

      const statusColor = process.status === "Ativo" ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300";
      const priorityColor = 
        process.priority === "Alta" ? "text-red-500" : 
        process.priority === "Média" ? "text-yellow-500" : "text-green-500";

      newNodes.push({
        id: `process-${process.id}`,
        data: { 
          label: (
            <div className={`p-2 ${statusColor} rounded-lg border-2`}>
              <div className="font-bold">{process.name}</div>
              <div className="text-xs">
                <span className={priorityColor}>{process.priority}</span> | {process.status}
              </div>
              {areaNode && (
                <div className="text-xs text-gray-500 mt-1">
                  Área: {areaNode.name}
                </div>
              )}
            </div>
          ) 
        },
        position: { 
          x: 350 + (parentProcess ? 250 : 0), 
          y: 100 + index * 120 
        },
        style: {
          background: "transparent",
          border: "none",
          width: 250,
        },
      });

      if (areaNode) {
        newEdges.push({
          id: `edge-area-${areaNode.id}-process-${process.id}`,
          source: `area-${areaNode.id}`,
          target: `process-${process.id}`,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          style: {
            stroke: "#3b82f6",
            strokeWidth: 2,
          },
        });
      }

      if (parentProcess) {
        newEdges.push({
          id: `edge-process-${parentProcess.id}-process-${process.id}`,
          source: `process-${parentProcess.id}`,
          target: `process-${process.id}`,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          style: {
            stroke: "#10b981",
            strokeWidth: 2,
          },
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-11/12">
      <div className="bg-white p-4 shadow">
        <h1 className="text-2xl font-bold text-[#21005E]">Dashboard de Processos</h1>
        <p className="text-gray-600">
          Visualização interativa dos processos e suas relações com áreas e subprocessos
        </p>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <div className="bg-white p-4 border-t">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>Áreas</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>Processos Ativos</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span>Processos Inativos</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-300 rounded-full mr-2"></div>
            <span>Relação Área-Processo</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-300 rounded-full mr-2"></div>
            <span>Relação Processo-Subprocesso</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;