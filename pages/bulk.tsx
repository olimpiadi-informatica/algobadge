import { Bulk } from "components/bulk/Bulk";
import { getTaskGraph, TaskGraph } from "lib/taskgraph";

export default function BulkPage({ taskGraph }: { taskGraph: TaskGraph }) {
  return <Bulk taskGraph={taskGraph} />;
}

export async function getStaticProps() {
  const taskGraph = getTaskGraph();

  return {
    props: {
      taskGraph,
    },
  };
}
