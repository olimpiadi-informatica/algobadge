import {
  BRONZE_SCORE,
  CategoryBadge,
  GOLD_SCORE,
  SILVER_SCORE,
  TaskScores,
  UNLOCK_SCORE,
} from "lib/badges";
import styles from "./Category.module.scss";
import ReactMarkdown from "react-markdown";
import { ProgressBar } from "react-bootstrap";

function Progress({ score }: { score: number }) {
  if (score === 200) {
    // FIXME: make this depend on the number of tasks
    return (
      <ProgressBar>
        <ProgressBar className={styles.progressGold} animated now={100} />
      </ProgressBar>
    );
  }
  const pieces = [];
  const scaleFactor = 100 / 200; // FIXME: make this depend on the number of tasks
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
  for (const cutoff of cutoffs) {
    if (score >= cutoff.from) {
      const width = Math.min(score - cutoff.from, cutoff.to - cutoff.from);
      pieces.push(
        <ProgressBar
          className={cutoff.className}
          animated
          now={scaleFactor * width}
          key={cutoff.from}
        />
      );
    }
  }

  return <ProgressBar>{pieces}</ProgressBar>;
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
        ({score} / 100)
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

export function Category({ badge }: { badge: CategoryBadge }) {
  return (
    <div className={styles.category}>
      <h2 className={styles.title}>{badge.node.title}</h2>
      {badge.badge !== "locked" ? (
        <>
          <Progress score={badge.score} />
          <div className={styles.taskList}>
            <TaskList tasks={badge.tasks} />
          </div>
        </>
      ) : (
        <p>
          Questa categoria è bloccata! Totalizza almeno {UNLOCK_SCORE} punti in{" "}
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
