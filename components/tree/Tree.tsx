import { CategoryBadge, CategoryBadges } from "lib/badges";
import { useCallback, useEffect, useRef, useState } from "react";
import { Line } from "./Line";
import styles from "./Tree.module.scss";

function TreeNode({ node }: { node: CategoryBadge }) {
  const style = {
    "--row": node.node.position[1],
    "--column": node.node.position[0],
  } as React.CSSProperties;
  return (
    <div className={styles.node} style={style}>
      <div data-node-id={node.node.id} className={styles.badge}>
        {node.node.id}
      </div>
    </div>
  );
}

export default function Tree({ badges }: { badges: CategoryBadges }) {
  const treeRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<{
    [id: string]: HTMLElement;
  } | null>(null);
  const [links, setLinks] = useState<
    { id: string; start: HTMLElement; end: HTMLElement }[]
  >([]);

  useEffect(() => {
    if (treeRef.current === null) return;
    const tree = treeRef.current;
    const nodes = tree.querySelectorAll(`.${styles.badge}`);
    const grouped = Object.fromEntries(
      Array.from(nodes.values()).map((node) => [
        node.getAttribute("data-node-id"),
        node,
      ])
    );
    setElements(grouped);
  }, []);

  const rebuildLinks = useCallback(() => {
    if (!elements) return;
    const newLinks = [];
    for (const node of Object.values(badges)) {
      for (const dep of node.node.prerequisites) {
        const start = elements[node.node.id];
        const end = elements[dep];
        newLinks.push({ id: `${node.node.id}-${dep}`, start, end });
      }
    }
    setLinks(newLinks);
  }, [badges, elements]);

  useEffect(() => {
    rebuildLinks();
  }, [badges, rebuildLinks]);

  useEffect(() => {
    window.addEventListener("resize", rebuildLinks);
    return () => window.removeEventListener("resize", rebuildLinks);
  }, [rebuildLinks]);

  const badgesList = Object.values(badges);
  return (
    <div className={styles.tree} ref={treeRef}>
      {badgesList.map((badge) => (
        <TreeNode node={badge} key={badge.node.id} />
      ))}
      {links.map((link) => (
        <Line key={link.id} start={link.start} end={link.end} />
      ))}
    </div>
  );
}
