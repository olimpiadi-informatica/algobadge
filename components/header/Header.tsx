import { ProfilePicture } from "./ProfilePicture";
import styles from "./Header.module.scss";
import { Badge, badgeColor } from "lib/badges";
import { Title } from "components/title/Title";
import { MedalIcon } from "components/category/Progress";
import { UserInfo } from "lib/training-api";

export function Header({
  user,
  badge,
  impersonated,
}: {
  user: UserInfo;
  badge: Badge;
  impersonated?: boolean;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title badge={badge} /> <MedalIcon color={badgeColor(badge)} />
      </div>
      Ciao{" "}
      <ProfilePicture
        url={`//gravatar.com/avatar/${user.mail_hash}?d=identicon`}
      />
      <strong>
        {user.first_name} {user.last_name}
      </strong>
      !{" "}
      {impersonated ? (
        <em>(impersonato)</em>
      ) : (
        <em>
          (Login effettuato tramite{" "}
          <a href="https://training.olinfo.it">training.olinfo.it</a>)
        </em>
      )}
    </div>
  );
}
