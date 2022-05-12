import styles from "./Progress.module.scss";
import {
  BRONZE_COLOR,
  BRONZE_SCORE,
  GOLD_COLOR,
  GOLD_SCORE,
  SILVER_COLOR,
  SILVER_SCORE,
  TASK_MAX_SCORE,
  UNLOCK_SCORE,
} from "lib/badges";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

export function MedalIcon({ color }: { color: string | null }) {
  if (!color) return null;
  return (
    <svg fill={color} width={"35px"} height={"35px"} viewBox="0 0 1024 1024">
      <path d="M547 304.2h-451l108.2-207.8h481.4z M685.6 754.4c0 95.656-77.544 173.2-173.2 173.2s-173.2-77.544-173.2-173.2c0-95.656 77.544-173.2 173.2-173.2s173.2 77.544 173.2 173.2z M697.8 598.2l230.2-294-138.6-207.8-276.6 415.6c64.6 0 125.4 25.4 171 71 5 5 9.6 10 14 15.2z M411.6 533.2l-107-161.2h-207.8l180.2 323c10.4-42.4 32.2-81.2 64-112.8 20.8-20.6 44.6-37.2 70.6-49z" />
    </svg>
  );
}

function LockIcon({ color }: { color: string }) {
  return (
    <svg width={"35px"} height={"35px"} viewBox="0 0 170 170">
      <g>
        <path
          style={{ fillRule: "evenodd", fill: color }}
          d="m112.5 4.1909c-20.072 0-36.231 16.159-36.231 36.231v40.256h10.064v-40.256c0-14.497 11.671-26.167 26.167-26.167 14.5 0 26.17 11.67 26.17 26.167v27.756h10.06v-27.756c0-20.072-16.16-36.231-36.23-36.231z"
        />
        <rect
          style={{ fillRule: "evenodd", fill: color }}
          rx="0.5"
          ry=".5"
          height="66.259"
          width="85.603"
          y="74.55"
          x="7.1987"
        />
      </g>
    </svg>
  );
}

function ProgressCheckpoints({ withUnlock }: { withUnlock: boolean }) {
  const checkpoints = [
    { position: BRONZE_SCORE, color: BRONZE_COLOR },
    { position: SILVER_SCORE, color: SILVER_COLOR },
    { position: GOLD_SCORE, color: GOLD_COLOR },
  ];
  return (
    <>
      {withUnlock && (
        <div
          className={styles.checkpoint}
          style={
            {
              "--position": `${UNLOCK_SCORE * 100}%`,
            } as React.CSSProperties
          }
        >
          <LockIcon color="black" />
        </div>
      )}
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

export function Progress({
  score,
  numTasks,
  nextCategories,
}: {
  score: number;
  numTasks: number;
  nextCategories: string[];
}) {
  if (score === numTasks * TASK_MAX_SCORE) {
    return (
      <div className={styles.progress}>
        <ProgressBar>
          <ProgressBar className={styles.progressGold} animated now={100} />
          <ProgressCheckpoints withUnlock={nextCategories.length > 0} />
        </ProgressBar>
      </div>
    );
  }
  const pieces = [];
  const cutoffs = [
    {
      from: SILVER_SCORE,
      to: GOLD_SCORE,
      className: styles.progressSilver,
    },
    {
      from: BRONZE_SCORE,
      to: SILVER_SCORE,
      className: styles.progressBronze,
    },
    {
      from: 0,
      to: BRONZE_SCORE,
      className: styles.progressNone,
    },
  ];
  const scorePerc = score / numTasks / TASK_MAX_SCORE;
  for (const cutoff of cutoffs) {
    if (scorePerc >= cutoff.from) {
      pieces.push(
        <ProgressBar
          className={cutoff.className}
          animated
          now={scorePerc * 100}
          key={cutoff.from}
        />
      );
      break;
    }
  }

  function Overlay(props: OverlayInjectedProps) {
    let message = "";
    if (scorePerc < UNLOCK_SCORE && nextCategories.length > 0) {
      message = `Ancora ${
        numTasks * TASK_MAX_SCORE * UNLOCK_SCORE - score
      } punti per sbloccare le prossime categorie`;
    } else if (scorePerc < BRONZE_SCORE) {
      message = `Ancora ${
        numTasks * TASK_MAX_SCORE * BRONZE_SCORE - score
      } punti per sbloccare il badge di bronzo!`;
    } else if (scorePerc < SILVER_SCORE) {
      message = `Ancora ${
        numTasks * TASK_MAX_SCORE * SILVER_SCORE - score
      } punti per sbloccare il badge di argento!`;
    } else if (scorePerc < GOLD_SCORE) {
      message = `Ancora ${
        numTasks * TASK_MAX_SCORE * GOLD_SCORE - score
      } punti per sbloccare il badge d'oro!`;
    } else {
      return null;
    }
    return (
      <Tooltip id="progress-overlay" {...props}>
        {message}
      </Tooltip>
    );
  }

  return (
    <OverlayTrigger placement="top" overlay={Overlay}>
      <div>
        <div className={styles.progress}>
          <ProgressBar>
            {pieces}
            <ProgressCheckpoints withUnlock={nextCategories.length > 0} />
          </ProgressBar>
        </div>
      </div>
    </OverlayTrigger>
  );
}
