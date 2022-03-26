import { Loading } from "components/loading/Loading";
import { Login } from "components/login/Login";
import Tree from "components/tree/Tree";
import { useLoggedUser } from "lib/auth";
import { getTaskGraph, TaskGraph } from "lib/taskgraph";
import { getUserInfo, UserInfo } from "lib/training-api";
import { useEffect, useState } from "react";

export default function Home({ taskGraph }: { taskGraph: TaskGraph }) {
  const user = useLoggedUser();
  const [userInfo, setUserInfo] = useState<UserInfo | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user) return;
    getUserInfo(user.username).then((info) => setUserInfo(info));
  }, [user]);

  if (user === undefined || userInfo === undefined) return <Loading />;
  if (user === null || userInfo === null) return <Login />;

  return (
    <div>
      <p>
        Ciao {user.firstName} {user.lastName}
      </p>
      <Tree taskGraph={taskGraph} userInfo={userInfo} />
    </div>
  );
}

export async function getStaticProps() {
  const taskGraph = getTaskGraph();

  return {
    props: {
      taskGraph,
    },
  };
}
