import { computeCategoryBadges } from "lib/badges";
import { TaskGraph } from "lib/taskgraph";
import { UserInfo } from "lib/training-api";

type Props = {
  taskGraph: TaskGraph;
  userInfo: UserInfo;
};

export default function Tree({ taskGraph, userInfo }: Props) {
  const badges = computeCategoryBadges(taskGraph, userInfo);
  return <pre>{JSON.stringify(badges, undefined, 2)}</pre>;
}
