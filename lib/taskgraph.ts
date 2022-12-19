import fs from "fs";
import yaml from "js-yaml";

export type Task = {
  name: string;
  terry?: boolean;
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
  const nodes = fs
    .readdirSync("./lib/graph/")
    .map((path) => `./lib/graph/${path}`)
    .map((path) => parseTask(path));
  return { nodes };
}

function parseTask(path: string): Node {
  const file = fs.readFileSync(path).toString();
  const [_, metadata, resources] = file.split("---");
  const node = yaml.load(metadata) as Node;
  node.resources_md = resources;
  return node;
}
