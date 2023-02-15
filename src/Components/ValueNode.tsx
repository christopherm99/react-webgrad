import { Node, Handle, Position, NodeProps } from "reactflow";
import { engine } from "webgrad";
import { MathComponent } from "mathjax-react";

interface ValueNodeData {
  value: engine.Value,
  priority: number
};

export type ValueNode = Node<ValueNodeData>;
export default function({ data }: NodeProps<ValueNodeData>) {

  function tex(op: string, val: engine.Value) {
    switch (op) {
      case "ReLU":
        return "\\textnormal{ReLU}(x)"
      case "Value":
        return `\\textnormal{Value}(${val.data})`
      case "*":
        return `x_1 \\cdot x_2`;
      default:
        return `x_1 ${op} x_2`;
    }
  }

  return (
    <div className="p-4 w-52 h-28 rounded border border-black">
      {
        Array.from(data.value.getChildren()).map((child) => <Handle type="target" id={child.getID()} position={Position.Left} hidden />)
      }
      <div className="grid grid-cols-2 grid-rows-2 place-items-center place-content-around w-full h-full gap-2">
        <div className="col-span-2 w-full">
          <MathComponent tex={ tex(data.value.getOp() || "Value", data.value) } display={false} />
          <hr className="mt-3 bg-black h-px border-0"/>
        </div>
        <div>
          Data: { data.value.data }
        </div>
        <div>
          Grad: { data.value.grad }
        </div>
      </div>
      {
        data.priority != 0 && <Handle type="source" position={Position.Right} hidden />
      }
    </div>
  )
};
