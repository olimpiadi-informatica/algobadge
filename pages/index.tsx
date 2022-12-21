import { Category } from "components/category/Category";
import { Header } from "components/header/Header";
import { Loading } from "components/loading/Loading";
import { Login } from "components/login/Login";
import Tree from "components/tree/Tree";
import { useLoggedUser } from "lib/auth";
import { computeCategoryBadges, getTotalBadge } from "lib/badges";
import { getTaskGraph, TaskGraph } from "lib/taskgraph";
import { getUserInfo, UserInfo } from "lib/training-api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ taskGraph }: { taskGraph: TaskGraph }) {
  const router = useRouter();
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
    getUserInfo(user.username, taskGraph).then((info) => setUserInfo(info));
  }, [user, taskGraph]);

  if (user === undefined || userInfo === undefined) return <Loading />;
  if (user === null || userInfo === null) return <Login />;
  const unlockEverything = router.query.unlock === "true";

  const badges = computeCategoryBadges(taskGraph, userInfo, unlockEverything);
  const totalBadge = getTotalBadge(badges);

  return (
    <div>
      <Header
        user={userInfo}
        badge={totalBadge}
        impersonated={user.impersonated}
      />
      <Tree badges={badges} setSelectedNode={setSelectedNode} />
      {selectedNode in badges && (
        <Category badge={badges[selectedNode]} badges={badges} />
      )}
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
