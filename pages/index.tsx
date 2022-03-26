import { Loading } from "components/loading/Loading";
import { Login } from "components/login/Login";
import { useLoggedUser } from "lib/auth";
import { getUserInfo, UserInfo } from "lib/training-api";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useLoggedUser();
  const [userInfo, setUserInfo] = useState<UserInfo | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user) return;
    console.log("> user", user);
    getUserInfo(user.username).then((info) => setUserInfo(info));
  }, [user]);

  if (user === undefined || userInfo === undefined) return <Loading />;
  if (user === null || userInfo === null) return <Login />;

  return (
    <div>
      <p>
        Ciao {user.firstName} {user.lastName}
      </p>
      {userInfo.scores.map((s) => (
        <p key={s.name}>
          {s.title} ({s.name}) -- {s.score}
        </p>
      ))}
    </div>
  );
}
