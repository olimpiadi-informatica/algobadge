import {
  CategoryBadge,
  CategoryBadges,
  DEFAULT_MAX_SCORE,
  UNLOCK_SCORE,
} from "lib/badges";
import styles from "./Category.module.scss";
import ReactMarkdown from "react-markdown";
import React from "react";
import { Progress } from "./Progress";
import { Task } from "lib/taskgraph";

function TaskList({ category }: { category: CategoryBadge }) {
  const Task = ({
    task,
    score,
    url,
  }: {
    task: Task;
    score: number;
    url: string;
  }) => {
    return (
      <li>
        <a href={url} rel="noreferrer" target="_blank">
          {task.name}
        </a>{" "}
        ({score} / {task.maxScore ?? DEFAULT_MAX_SCORE})
      </li>
    );
  };

  return (
    <ul>
      {category.node.tasks.map((task) => (
        <Task
          task={task}
          score={category.tasks[task.name]}
          url={category.taskURLs[task.name]}
          key={task.name}
        />
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
  const unlockScore = badge.node.prerequisites.map((p) =>
    badges[p].node.tasks.reduce(
      (acc, task) => acc + (task.maxScore ?? DEFAULT_MAX_SCORE),
      0
    )
  );
  const maxScore = badge.node.tasks.reduce(
    (acc, task) => acc + (task.maxScore ?? DEFAULT_MAX_SCORE),
    0
  );
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
            maxScore={maxScore}
            nextCategories={nextCategories}
          />
          <div className={styles.taskList}>
            <TaskList category={badge} />
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
