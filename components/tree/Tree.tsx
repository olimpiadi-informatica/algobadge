import { TaskGraph } from "lib/taskgraph";

export default function Tree({ taskGraph }: { taskGraph: TaskGraph }) {
  return <pre>{JSON.stringify(taskGraph, undefined, 2)}</pre>;
}
