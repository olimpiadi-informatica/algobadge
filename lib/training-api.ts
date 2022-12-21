import { Task, TaskGraph } from "./taskgraph";

export type TaskScore = {
  score: number;
  name: string;
  title: string;
};

export type UserInfo = {
  username: string;
  mail_hash: string;
  first_name: string;
  last_name: string;
  success: number;
  scores: TaskScore[];
};

export async function getUserInfo(
  username: string,
  taskGraph: TaskGraph
): Promise<UserInfo | null> {
  const tasks = taskGraph.nodes
    .flatMap((node) => node.tasks)
    .reduce((acc, task) => {
      acc[task.name] = task;
      return acc;
    }, {} as Record<string, Task>);

  try {
    const body = { action: "get", username };
    const req = await fetch("https://training.olinfo.it/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    // If there is no training account, there is also no territoriali account.
    if (req.status !== 200) return null;
    const data = await req.json();
    if (data.success !== 1) return null;
    const reqTerr = await fetch(
      `https://territoriali.olinfo.it/api/user/${username}/scores`,
      {
        method: "GET",
      }
    );
    // Remove tasks that are from terry.
    data.scores = data.scores.filter(
      (score: TaskScore) => !(tasks[score.name]?.terry ?? false)
    );

    // Only send use data from training if there is no account on territoriali.
    if (reqTerr.status != 200) return data;
    const terrData = await reqTerr.json();
    for (const terrTask of terrData) {
      // Remove tasks that are not from terry.
      if (!(tasks[terrTask.name]?.terry ?? false)) continue;
      terrTask["score"] = (terrTask["score"] * 50) / terrTask["max_score"];
      data.scores.push(terrTask);
    }
    return data;
  } catch {
    return null;
  }
}
