import { CategoryBadge } from "lib/badges";
import styles from "./Category.module.scss";

export function Category({ badge }: { badge: CategoryBadge }) {
  return (
    <div className={styles.category}>
      <h2>{badge.node.title}</h2>
    </div>
  );
}
