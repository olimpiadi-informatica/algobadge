import { LoggedUser } from "lib/auth";
import { ProfilePicture } from "./ProfilePicture";
import styles from "./Header.module.scss";
import { Badge, badgeColor } from "lib/badges";
import { Title } from "components/title/Title";
import { MedalIcon } from "components/category/Progress";

export function Header({ user, badge }: { user: LoggedUser; badge: Badge }) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title badge={badge} /> <MedalIcon color={badgeColor(badge)} />
      </div>
      Ciao {user.picture && <ProfilePicture url={user.picture} />}
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
