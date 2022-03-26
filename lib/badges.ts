import { Node, TaskGraph } from "./taskgraph";
import { UserInfo } from "./training-api";

export const UNLOCK_SCORE = 50;
export const BRONZE_SCORE = 10;
export const SILVER_SCORE = 150;
export const GOLD_SCORE = 200;

export type Badge = "none" | "bronze" | "silver" | "gold";

export type CategoryBadge = {
  node: Node;
  score: number;
  badge: Badge;
};

function computeBadge(score: number): Badge {
  if (score >= GOLD_SCORE) return "gold";
  if (score >= SILVER_SCORE) return "silver";
  if (score >= BRONZE_SCORE) return "bronze";
  return "none";
}

export function computeCategoryBadges(
  taskGraph: TaskGraph,
  userInfo: UserInfo
): { [category: string]: CategoryBadge } {
  const categoryBadges: { [category: string]: CategoryBadge } = {};
  const taskScores = Object.fromEntries(
    userInfo.scores.map((task) => [task.name, task.score])
  );
  for (const node of taskGraph.nodes) {
    let score = 0;
    for (const task of node.tasks) {
      score += taskScores[task.name] ?? 0;
    }
    categoryBadges[node.id] = {
      node,
      score,
      badge: computeBadge(score),
    };
  }
  return categoryBadges;
}
