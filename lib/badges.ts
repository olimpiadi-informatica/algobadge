import { Node, TaskGraph } from "./taskgraph";
import { UserInfo } from "./training-api";

export const TASK_MAX_SCORE = 100;
export const UNLOCK_SCORE = 50 / 200;
export const BRONZE_SCORE = 100 / 200;
export const SILVER_SCORE = 150 / 200;
export const GOLD_SCORE = 200 / 200;

export const BRONZE_COLOR = "#cd7f32";
export const SILVER_COLOR = "#c0c0c0";
export const GOLD_COLOR = "#ffdf00";

export type Badge = "locked" | "none" | "bronze" | "silver" | "gold";

export type TaskScores = { [taskId: string]: number };

export type CategoryBadge = {
  node: Node;
  score: number;
  badge: Badge;
  tasks: TaskScores;
};

export type CategoryBadges = { [category: string]: CategoryBadge };

function badgeValue(badge: Badge): number {
  switch (badge) {
    case "locked":
      return 0;
    case "none":
      return 1;
    case "bronze":
      return 2;
    case "silver":
      return 3;
    case "gold":
      return 4;
  }
}

export function badgeColor(badge: Badge): string | null {
  switch (badge) {
    case "locked":
      return null;
    case "none":
      return null;
    case "bronze":
      return BRONZE_COLOR;
    case "silver":
      return SILVER_COLOR;
    case "gold":
      return GOLD_COLOR;
  }
}

function computeBadge(score: number, numTasks: number): Badge {
  if (score >= TASK_MAX_SCORE * numTasks * GOLD_SCORE) return "gold";
  if (score >= TASK_MAX_SCORE * numTasks * SILVER_SCORE) return "silver";
  if (score >= TASK_MAX_SCORE * numTasks * BRONZE_SCORE) return "bronze";
  return "none";
}

export function computeCategoryBadges(
  taskGraph: TaskGraph,
  userInfo: UserInfo,
  unlockEverything: boolean
): CategoryBadges {
  const categoryBadges: CategoryBadges = {};
  console.log(userInfo.scores, userInfo);
  const taskScores = Object.fromEntries(
    userInfo.scores.map((task) => [task.name, task.score])
  );
  for (const node of taskGraph.nodes) {
    let score = 0;
    const categoryTasks: TaskScores = {};
    for (const task of node.tasks) {
      const taskScore = taskScores[task.name] ?? 0;
      categoryTasks[task.name] = taskScore;
      score += taskScore;
    }
    categoryBadges[node.id] = {
      node,
      score,
      badge: computeBadge(score, node.tasks.length),
      tasks: categoryTasks,
    };
  }

  const visited = new Set<string>();
  const dfs = (nodeId: string) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    const node = categoryBadges[nodeId];
    let locked = false;
    for (const pre of node.node.prerequisites) {
      dfs(pre);
      const preNode = categoryBadges[pre];
      const numTasks = preNode.node.tasks.length;
      const unlockScore = numTasks * TASK_MAX_SCORE * UNLOCK_SCORE;
      if (preNode.badge === "locked" || preNode.score < unlockScore) {
        locked = true;
      }
    }
    if (locked && !unlockEverything) {
      node.badge = "locked";
    }
  };

  for (const node of taskGraph.nodes) {
    dfs(node.id);
  }

  return categoryBadges;
}

export function getTotalBadge(categoryBadges: CategoryBadges): Badge {
  const badges = Object.values(categoryBadges).map((badge) => badge.badge);
  let lowest: Badge = "gold";
  for (const badge of badges) {
    if (badgeValue(badge) < badgeValue(lowest)) {
      lowest = badge;
    }
  }
  return lowest;
}
