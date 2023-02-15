import { Graph } from "../src/index";
import { engine } from "webgrad";
import 'reactflow/dist/style.css';

export default function() {
  const x = new engine.Value(-4);
  const z = x.mul(2).add(2).add(x);
  const q = z.relu().add(z.mul(x));
  const h = z.mul(z).relu();
  const root = h.add(q).add(q.mul(x));
  
  return (
    <div style={{ height: "100%" }}>
      <Graph root={root} />
    </div>
  )
}
