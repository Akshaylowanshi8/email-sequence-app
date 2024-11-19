import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Lead Source' }, position: { x: 250, y: 0 } },
];

const initialEdges = [];

function FlowChart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => [...eds, connection]),
    []
  );

  const addNode = (type) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: type },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Default position with fixed x and y values
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const removeNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const onNodeDoubleClick = (event, node) => {
    removeNode(node.id);
  };

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => addNode('Cold Email')}>Add Cold Email</button>
        <button onClick={() => addNode('Wait/Delay')}>Add Wait/Delay</button>
        <button onClick={() => addNode('Lead Source')}>Add Lead Source</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowChart;
