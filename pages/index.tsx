import { Loading } from "components/loading/Loading";
import { Login } from "components/login/Login";
import { useLoggedUser } from "lib/auth";

export default function Home() {
  const user = useLoggedUser();
  if (user === undefined) return <Loading />;
  if (user === null) return <Login />;

  return (
    <p>
      Ciao {user.firstName} {user.lastName}
    </p>
  );
}
