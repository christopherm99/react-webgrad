import ELK from "elkjs";

const elk = new ELK();
export default function(nodes, edges) {
  const nodesForElk = nodes.map((node) => ({
    id: node.id,
    width: 208,
    height: 112,
    priority: node.data.priority
  }));
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "org.eclipse.elk.layered",
    },

    children: nodesForElk,
    edges: edges
  };
  return elk.layout(graph);
};
