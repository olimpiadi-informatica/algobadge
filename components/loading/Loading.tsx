import styles from "./Loading.module.scss";

export function Loading() {
  return (
    <div className={styles.loading}>
      <img src="/loading.gif" alt="Loading..." />
      caricamento...
    </div>
  );
}
