import { Category } from "components/category/Category";
import { Loading } from "components/loading/Loading";
import { Login } from "components/login/Login";
import Tree from "components/tree/Tree";
import { useLoggedUser } from "lib/auth";
import { computeCategoryBadges } from "lib/badges";
import { getTaskGraph, TaskGraph } from "lib/taskgraph";
import { getUserInfo, UserInfo } from "lib/training-api";
import { useEffect, useState } from "react";

export default function Home({ taskGraph }: { taskGraph: TaskGraph }) {
  const user = useLoggedUser();
  const [userInfo, setUserInfo] = useState<UserInfo | null | undefined>(
    undefined
  );
  const [selectedNode, setSelectedNode] = useState<string>(
    taskGraph.nodes.find((n) => n.prerequisites.length === 0)?.id ?? ""
  );

  useEffect(() => {
    if (user === null) {
      setUserInfo(null);
    }
    if (!user) return;
    getUserInfo(user.username).then((info) => setUserInfo(info));
  }, [user]);

  if (user === undefined || userInfo === undefined) return <Loading />;
  if (user === null || userInfo === null) return <Login />;

  const badges = computeCategoryBadges(taskGraph, userInfo);

  return (
    <div>
      <p>
        Ciao {user.firstName} {user.lastName}! (Login effettuato tramite{" "}
        <a href="https://training.olinfo.it">training.olinfo.it</a>)
      </p>
      <Tree badges={badges} setSelectedNode={setSelectedNode} />
      {selectedNode in badges && <Category badge={badges[selectedNode]} />}
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
