import {
  CategoryBadge,
  CategoryBadges,
  TaskScores,
  TaskURLs,
  TASK_MAX_SCORE,
  UNLOCK_SCORE,
} from "lib/badges";
import styles from "./Category.module.scss";
import ReactMarkdown from "react-markdown";
import React from "react";
import { Progress } from "./Progress";

function TaskList({ tasks , taskURLs }: { tasks: TaskScores, taskURLs: TaskURLs }) {
  const Task = ({ task, score, url }: { task: string; score: number, url: string }) => {
    return (
      <li>
        <a
          href={url}
          rel="noreferrer"
          target="_blank"
        >
          {task}
        </a>{" "}
        ({score} / {TASK_MAX_SCORE})
      </li>
    );
  };

  return (
    <ul>
      {Object.entries(tasks).map(([task, score]) => (
        <Task task={task} score={score} url={taskURLs[task]} key={task} />
      ))}
    </ul>
  );
}

export function Category({
  badge,
  badges,
}: {
  badge: CategoryBadge;
  badges: CategoryBadges;
}) {
  const unlockScore = badge.node.prerequisites.map(
    (p) => Object.keys(badges[p].tasks).length * TASK_MAX_SCORE
  );
  const numTasks = badge.node.tasks.length;
  const nextCategories = Object.values(badges)
    .filter((b) => b.node.prerequisites.includes(badge.node.id))
    .map((b) => b.node.id);

  return (
    <div className={styles.category}>
      <h2 className={styles.title}>{badge.node.title}</h2>
      {badge.badge !== "locked" ? (
        <>
          <Progress
            score={badge.score}
            numTasks={numTasks}
            nextCategories={nextCategories}
          />
          <div className={styles.taskList}>
            <TaskList tasks={badge.tasks} taskURLs={badge.taskURLs} />
          </div>
          <div className={styles.resources}>
            <ReactMarkdown
              components={{
                h1: "h3",
                h2: "h4",
                h3: "h5",
                h4: "h6",
              }}
            >
              {badge.node.resources_md}
            </ReactMarkdown>
          </div>
        </>
      ) : (
        <p>
          Questa categoria è bloccata! Totalizza almeno{" "}
          {unlockScore[0] * UNLOCK_SCORE} punti in{" "}
          <code>{badge.node.prerequisites}</code> per sbloccarla.
        </p>
      )}
    </div>
  );
}
