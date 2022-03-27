import { Node, TaskGraph } from "./taskgraph";
import { UserInfo } from "./training-api";

export const TASK_MAX_SCORE = 100;
export const UNLOCK_SCORE = 50 / 200;
export const BRONZE_SCORE = 100 / 200;
export const SILVER_SCORE = 150 / 200;
export const GOLD_SCORE = 200 / 200;

export type Badge = "locked" | "none" | "bronze" | "silver" | "gold";

export type TaskScores = { [taskId: string]: number };

export type CategoryBadge = {
  node: Node;
  score: number;
  badge: Badge;
  tasks: TaskScores;
};

export type CategoryBadges = { [category: string]: CategoryBadge };

function computeBadge(score: number, numTasks: number): Badge {
  if (score >= TASK_MAX_SCORE * numTasks * GOLD_SCORE) return "gold";
  if (score >= TASK_MAX_SCORE * numTasks * SILVER_SCORE) return "silver";
  if (score >= TASK_MAX_SCORE * numTasks * BRONZE_SCORE) return "bronze";
  return "none";
}

export function computeCategoryBadges(
  taskGraph: TaskGraph,
  userInfo: UserInfo
): CategoryBadges {
  const categoryBadges: CategoryBadges = {};
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
  for (const node of taskGraph.nodes) {
    let locked = false;
    for (const dep of node.prerequisites) {
      const numTasks = categoryBadges[dep].node.tasks.length;
      const unlockScore = numTasks * TASK_MAX_SCORE * UNLOCK_SCORE;
      if (categoryBadges[dep].score < unlockScore) {
        locked = true;
      }
    }
    if (locked) {
      categoryBadges[node.id].badge = "locked";
    }
  }
  return categoryBadges;
}
