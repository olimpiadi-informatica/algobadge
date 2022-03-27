import styles from "./Loading.module.scss";
import Image from "next/image";

export function Loading() {
  return (
    <div className={styles.loading}>
      <div>
        <Image src="/loading.gif" alt="Loading..." width={100} height={100} />
      </div>
      caricamento...
    </div>
  );
}
