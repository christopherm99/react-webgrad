import { useState, useEffect, useMemo } from "react";
import ReactFlow, { Controls } from 'reactflow';
import { convert } from "../index";
import { engine } from "webgrad";
import 'reactflow/dist/style.css';
import './index.css';
import ValueNode from "./ValueNode";
import ElkEdge from "./ElkEdge";

interface Props {
  root: engine.Value;
}

export default function({ root }: Props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    convert(root).then(([nodes, edges]) => {
      setNodes(nodes);
      setEdges(edges);
    });
  }, [root])

  const nodeTypes = useMemo(() => ({ value: ValueNode }), []);
  const edgeTypes = useMemo(() => ({ elk: ElkEdge }), []);
  
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes}>
        <Controls />
      </ReactFlow>
    </div>
  )
}
