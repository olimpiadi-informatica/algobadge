import styles from "./ProfilePicture.module.scss";

export function ProfilePicture({ url }: { url: string }) {
  const src = url.startsWith("https://") ? url : `https:${url}`;
  return <img className={styles.profilePicture} src={src} alt="" />;
}
