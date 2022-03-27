import React from "react";
import styles from "./Line.module.scss";

type Props = {
  start: HTMLElement;
  end: HTMLElement;
};

const getOffset = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  };
};

export function Line({ start, end }: Props) {
  const thickness = 2;
  const color = "black";

  const off1 = getOffset(start);
  const off2 = getOffset(end);

  const x1 = off1.left + off1.width / 2;
  const y1 = off1.top + off1.height / 2;

  const x2 = off2.left + off2.width / 2;
  const y2 = off2.top + off2.height / 2;

  const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

  const cx = (x1 + x2) / 2 - length / 2;
  const cy = (y1 + y2) / 2 - thickness / 2;

  const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

  const style = {
    "--color": color,
    "--thickness": `${thickness}px`,
    "--cx": `${cx}px`,
    "--cy": `${cy}px`,
    "--length": `${length}px`,
    "--angle": `${angle}deg`,
  } as React.CSSProperties;

  return <div className={styles.line} style={style}></div>;
}
