import { CategoryBadge } from "lib/badges";
import styles from "./Category.module.scss";
import ReactMarkdown from "react-markdown";

export function Category({ badge }: { badge: CategoryBadge }) {
  return (
    <div className={styles.category}>
      <h2 className={styles.title}>{badge.node.title}</h2>
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
  );
}
