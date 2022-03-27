import {
  BRONZE_SCORE,
  CategoryBadge,
  CategoryBadges,
  GOLD_SCORE,
  SILVER_SCORE,
  TaskScores,
  TASK_MAX_SCORE,
  UNLOCK_SCORE,
} from "lib/badges";
import styles from "./Category.module.scss";
import ReactMarkdown from "react-markdown";
import { ProgressBar } from "react-bootstrap";
import React from "react";

function MedalIcon({ color }: { color: string }) {
  return (
    <svg fill={color} width={"35px"} height={"35px"} viewBox="0 0 1024 1024">
      <path d="M547 304.2h-451l108.2-207.8h481.4z M685.6 754.4c0 95.656-77.544 173.2-173.2 173.2s-173.2-77.544-173.2-173.2c0-95.656 77.544-173.2 173.2-173.2s173.2 77.544 173.2 173.2z M697.8 598.2l230.2-294-138.6-207.8-276.6 415.6c64.6 0 125.4 25.4 171 71 5 5 9.6 10 14 15.2z M411.6 533.2l-107-161.2h-207.8l180.2 323c10.4-42.4 32.2-81.2 64-112.8 20.8-20.6 44.6-37.2 70.6-49z" />
    </svg>
  );
}

function ProgressCheckpoints() {
  const checkpoints = [
    { position: BRONZE_SCORE, color: "#cd7f32" },
    { position: SILVER_SCORE, color: "#c0c0c0" },
    { position: GOLD_SCORE, color: "#ffdf00" },
  ];
  return (
    <>
      {checkpoints.map((checkpoint) => (
        <div
          className={styles.checkpoint}
          key={checkpoint.position}
          style={
            {
              "--position": `${checkpoint.position * 100}%`,
            } as React.CSSProperties
          }
        >
          <MedalIcon color={checkpoint.color} />
        </div>
      ))}
    </>
  );
}

function Progress({ score, numTasks }: { score: number; numTasks: number }) {
  if (score === numTasks * TASK_MAX_SCORE) {
    return (
      <ProgressBar>
        <ProgressBar className={styles.progressGold} animated now={100} />
        <ProgressCheckpoints />
      </ProgressBar>
    );
  }
  const pieces = [];
  const cutoffs = [
    {
      from: 0,
      to: BRONZE_SCORE,
      className: styles.progressNone,
    },
    {
      from: BRONZE_SCORE,
      to: SILVER_SCORE,
      className: styles.progressBronze,
    },
    {
      from: SILVER_SCORE,
      to: GOLD_SCORE,
      className: styles.progressSilver,
    },
  ];
  const scorePerc = score / numTasks / TASK_MAX_SCORE;
  for (const cutoff of cutoffs) {
    if (scorePerc >= cutoff.from) {
      const width = Math.min(scorePerc - cutoff.from, cutoff.to - cutoff.from);
      pieces.push(
        <ProgressBar
          className={cutoff.className}
          animated
          now={width * 100}
          key={cutoff.from}
        />
      );
    }
  }

  return (
    <ProgressBar>
      {pieces}
      <ProgressCheckpoints />
    </ProgressBar>
  );
}

function TaskList({ tasks }: { tasks: TaskScores }) {
  const Task = ({ task, score }: { task: string; score: number }) => {
    return (
      <li>
        <a
          href={`https://training.olinfo.it/#/task/${task}/statement`}
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
        <Task task={task} score={score} key={task} />
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

  return (
    <div className={styles.category}>
      <h2 className={styles.title}>{badge.node.title}</h2>
      {badge.badge !== "locked" ? (
        <>
          <div className={styles.progress}>
            <Progress score={badge.score} numTasks={numTasks} />
          </div>
          <div className={styles.taskList}>
            <TaskList tasks={badge.tasks} />
          </div>
        </>
      ) : (
        <p>
          Questa categoria è bloccata! Totalizza almeno{" "}
          {unlockScore[0] * UNLOCK_SCORE} punti in{" "}
          <code>{badge.node.prerequisites}</code> per sbloccarla.
        </p>
      )}
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
    </div>
  );
}
