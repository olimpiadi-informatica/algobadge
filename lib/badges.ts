import { Node, TaskGraph } from "./taskgraph";
import { UserInfo } from "./training-api";

export const DEFAULT_MAX_SCORE = 100;
export const UNLOCK_SCORE = 50 / 250;
export const BRONZE_SCORE = 100 / 250;
export const SILVER_SCORE = 150 / 250;
export const GOLD_SCORE = 200 / 250;
export const DIAMOND_SCORE = 250 / 250;

export const BRONZE_COLOR = "#cd7f32";
export const SILVER_COLOR = "#c0c0c0";
export const GOLD_COLOR = "#ffdf00";
export const DIAMOND_COLOR = "#94ebff";

export type Badge =
  | "locked"
  | "none"
  | "bronze"
  | "silver"
  | "gold"
  | "diamond";

export type TaskScores = { [taskId: string]: number };
export type TaskURLs = { [taskId: string]: string };

export type CategoryBadge = {
  node: Node;
  score: number;
  badge: Badge;
  tasks: TaskScores;
  taskURLs: TaskURLs;
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
    case "diamond":
      return 5;
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
    case "diamond":
      return DIAMOND_COLOR;
  }
}

function computeBadge(score: number, maxScore: number): Badge {
  if (score >= maxScore * DIAMOND_SCORE) return "diamond";
  if (score >= maxScore * GOLD_SCORE) return "gold";
  if (score >= maxScore * SILVER_SCORE) return "silver";
  if (score >= maxScore * BRONZE_SCORE) return "bronze";
  return "none";
}

export function computeCategoryBadges(
  taskGraph: TaskGraph,
  userInfo: UserInfo,
  unlockEverything: boolean
): CategoryBadges {
  const categoryBadges: CategoryBadges = {};
  const taskScores = Object.fromEntries(
    userInfo.scores.map((task) => [task.name, task.score])
  );
  for (const node of taskGraph.nodes) {
    let score = 0;
    const categoryTasks: TaskScores = {};
    const categoryTaskURLs: TaskURLs = {};
    let maxScore = 0;
    for (const task of node.tasks) {
      const taskScore = taskScores[task.name] ?? 0;
      categoryTasks[task.name] = taskScore;
      let url;
      if (task.terry) {
        url = `https://territoriali.olinfo.it/task/${task.name}`;
      } else {
        url = `https://training.olinfo.it/#/task/${task.name}/statement`;
      }
      categoryTaskURLs[task.name] = url;
      score += taskScore;
      maxScore += task.maxScore ?? DEFAULT_MAX_SCORE;
    }
    categoryBadges[node.id] = {
      node,
      score,
      badge: computeBadge(score, maxScore),
      tasks: categoryTasks,
      taskURLs: categoryTaskURLs,
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
      const maxScore = preNode.node.tasks.reduce(
        (acc, task) => acc + (task.maxScore ?? DEFAULT_MAX_SCORE),
        0
      );
      const unlockScore = maxScore * UNLOCK_SCORE;
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
  let lowest: Badge = "diamond";
  for (const badge of badges) {
    if (badgeValue(badge) < badgeValue(lowest)) {
      lowest = badge;
    }
  }
  return lowest;
}
