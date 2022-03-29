import { LoggedUser } from "lib/auth";
import { ProfilePicture } from "./ProfilePicture";
import styles from "./Header.module.scss";

export function Header({ user }: { user: LoggedUser }) {
  return (
    <div className={styles.header}>
      Ciao <ProfilePicture url={user.picture} />
      <strong>
        {user.firstName} {user.lastName}
      </strong>
      !{" "}
      <em>
        (Login effettuato tramite{" "}
        <a href="https://training.olinfo.it">training.olinfo.it</a>)
      </em>
    </div>
  );
}
