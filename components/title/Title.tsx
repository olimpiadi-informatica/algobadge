import classNames from "classnames";
import { Badge } from "lib/badges";
import styles from "./Title.module.scss";

export function Title({ badge }: { badge: Badge }) {
  const hasDiamond = badge === "diamond";
  const hasGold = hasDiamond || badge === "gold";
  const hasSilver = hasGold || badge === "silver";
  const hasBronze = hasSilver || badge === "bronze";

  return (
    <span className={styles.title}>
      <span
        className={classNames(styles.initial, {
          [styles.hasSilver]: hasSilver,
        })}
      >
        A
      </span>
      LG
      <span className={classNames({ [styles.hasGold]: hasGold })}>O</span>
      <span
        className={classNames(styles.initial, {
          [styles.hasBronze]: hasBronze,
        })}
      >
        B
      </span>
      A
      <span className={classNames({ [styles.hasDiamond]: hasDiamond })}>D</span>
      GE
    </span>
  );
}
