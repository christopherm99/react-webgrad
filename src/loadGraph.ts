import { engine } from "webgrad";
import { Edge, Node } from "reactflow";
import { uniqBy } from "lodash";
import layout from "./layout";
import { ValueNode } from "./Components/ValueNode";
import { ElkEdgeData } from "./Components/ElkEdge";

function convertNodes(expr: engine.Value, depth: number): ValueNode[] {
  return [
    {
      id: expr.getID(),
      position: { x: 0, y: 0 },
      data: {
        value: expr,
        priority: depth
      },
      type: "value",
    },
    ...Array.from(expr.getChildren()).map((c) => convertNodes(c, depth + 1)).flat()
  ]
}
function convertEdges(expr: engine.Value): Edge[] {
  return [
    ...Array.from(expr.getChildren()).map(child => ({
      id: `${expr.getID()}-${child.getID()}`,
      source: child.getID(),
      targetHandle: child.getID(),
      target: expr.getID(),
      type: "elk"
    })),
    ...Array.from(expr.getChildren()).map(convertEdges).flat()
  ]
}

export default async function(expr: engine.Value): Promise<[ValueNode[], Edge<ElkEdgeData>[]]> {
  let nodes = uniqBy(convertNodes(expr, 0), "id");
  let edges = uniqBy(convertEdges(expr), "id");

  // nodes[0].type = "output";

  let layouted = await layout(nodes, edges);

  console.log(layouted);

  return [
    [
      ...layouted.children.map((node) => ({
        ...nodes.find((n) => n.id === node.id),
        position: { x: node.x, y: node.y }
      }))
    ],
    [
      ...layouted.edges.map((edge) => ({
        ...edges.find((e) => e.id === edge.id),
        data: {
          points: edge.sections.map(section => [section.startPoint, ...(section.bendPoints || []), section.endPoint]).flat()
        }
      }))
    ]
  ]
};
