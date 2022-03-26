import fs from "fs";

export type Task = {
  name: string;
};

export type Node = {
  id: string;
  title: string;
  prerequisites: string[];
  position: [number, number];
  tasks: Task[];
  resources_md: string;
};

export type TaskGraph = {
  nodes: Node[];
};

export function getTaskGraph(): TaskGraph {
  const file = fs.readFileSync("./lib/taskgraph.json");
  return JSON.parse(file.toString());
}
