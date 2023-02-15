import { ElkPoint } from "elkjs";
import { EdgeProps } from "reactflow";

export interface ElkEdgeData {
  points: ElkPoint[]
}

export default function({ data }: EdgeProps<ElkEdgeData>) {
  const points = [
    ...data.points,
  ].map(pt => `${pt.x},${pt.y}`).join(" ")

  return (
    <g>
      <polyline
        fill="none"
        stroke="#222"
        points={points}
      />
    </g>
  )
}