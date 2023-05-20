import { MedalIcon } from "components/category/Progress";
import {
  badgeColor,
  CategoryBadges,
  computeCategoryBadges,
  getTotalBadge,
} from "lib/badges";
import { TaskGraph } from "lib/taskgraph";
import { getUserInfo, UserInfo } from "lib/training-api";
import { useState } from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import styles from "./Bulk.module.scss";

type Sum = {
  diamond: number;
  gold: number;
  silver: number;
  bronze: number;
  none: number;
};

function MedalSummary({ sum, numStudents }: { sum: Sum; numStudents: number }) {
  const missing = numStudents - Object.values(sum).reduce((s, a) => s + a, 0);
  return (
    <>
      {(["diamond", "gold", "silver", "bronze"] as const).map((medal) => (
        <div key={medal} className={styles.medalSummary}>
          <MedalIcon color={badgeColor(medal)} size={20} />
          &nbsp;
          {sum[medal]}
        </div>
      ))}
      <div className={styles.medalSummary}>
        <MedalIcon color={"#555"} size={20} />
        &nbsp;
        {sum.none}
      </div>
      <div className={styles.medalSummary}>
        <MedalIcon color={"#eee"} size={20} />
        ?&nbsp;
        {missing}
      </div>
    </>
  );
}

export function Bulk({ taskGraph }: { taskGraph: TaskGraph }) {
  const [usernames, setUsernames] = useState<string>("");
  const [userInfo, setUserInfo] = useState<Record<string, UserInfo>>({});
  const [results, setResults] = useState<Record<string, CategoryBadges>>({});
  const usernameList = [
    ...new Set(
      usernames
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s !== "")
    ),
  ];

  const load = () => {
    setResults({});
    setUserInfo({});
    for (const username of usernameList) {
      getUserInfo(username, taskGraph)
        .then((info) => {
          if (info) setUserInfo((old) => ({ ...old, [info.username]: info }));
          return info ? computeCategoryBadges(taskGraph, info, false) : null;
        })
        .then((badges) => {
          if (badges) {
            setResults((old) => ({ ...old, [username]: badges }));
          }
        });
    }
  };

  const badgeSum: Record<string, Sum> = {};
  const totalSum: Sum = { diamond: 0, gold: 0, silver: 0, bronze: 0, none: 0 };
  let oneOff = 0;
  for (const badges of Object.values(results)) {
    let missingBadges = 0;
    for (const [cat, badge] of Object.entries(badges)) {
      if (!(cat in badgeSum)) {
        badgeSum[cat] = { diamond: 0, gold: 0, silver: 0, bronze: 0, none: 0 };
      }
      if (
        badge.badge === "diamond" ||
        badge.badge === "gold" ||
        badge.badge === "silver" ||
        badge.badge === "bronze"
      ) {
        badgeSum[cat][badge.badge] += 1;
      } else {
        badgeSum[cat].none += 1;
        missingBadges += 1;
      }
      if (
        badge.badge === "bronze" ||
        badge.badge === "none" ||
        badge.badge === "locked"
      ) missingBadges += 1;
    }
    const totalBadge = getTotalBadge(badges);
    if (
      totalBadge === "diamond" ||
      totalBadge === "gold" ||
      totalBadge === "silver" ||
      totalBadge === "bronze"
    ) {
      totalSum[totalBadge] += 1;
    } else {
      totalSum.none += 1;
    }
    if (missingBadges === 1) {
      oneOff += 1;
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Bulk</h1>
      <FormControl
        as="textarea"
        placeholder="Inserisci la lista di username, uno per riga"
        onChange={(e) => setUsernames(e.target.value)}
        value={usernames}
        className={styles.usernames}
      />
      <Button onClick={() => load()}>Via!</Button>
      <hr />
      {Object.entries(results).length > 0 && (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th />
              <th>Username</th>
              <th className={styles.totalColumn}>Total</th>
              {taskGraph.nodes.map((node) => (
                <th key={node.id} className={styles.badgeColumn}>
                  <code>{node.id}</code>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usernameList.map((username, index) => (
              <tr key={username}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`/?impersonate=${username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <code>{username}</code>{" "}
                    {username in userInfo && (
                      <em>
                        ({userInfo[username].first_name}{" "}
                        {userInfo[username].last_name})
                      </em>
                    )}
                  </a>
                </td>
                {username in results ? (
                  <>
                    <td className={styles.totalColumn}>
                      <MedalIcon
                        color={badgeColor(getTotalBadge(results[username]))}
                      />
                    </td>
                    {taskGraph.nodes.map((node) => (
                      <td key={node.id} className={styles.badgeColumn}>
                        <MedalIcon
                          color={badgeColor(results[username][node.id].badge)}
                        />
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                    <td className={styles.totalColumn}>?</td>
                    {taskGraph.nodes.map((node) => (
                      <td key={node.id} className={styles.badgeColumn}>
                        ?
                      </td>
                    ))}
                  </>
                )}
              </tr>
            ))}
            <tr>
              <td />
              <td />
              <td className={styles.totalColumn}>
                <MedalSummary
                  numStudents={usernameList.length}
                  sum={totalSum}
                />
                <hr />
                <div className={styles.medalSummary}>
                  <abbr title="At least silver">
                    &ge;
                    <MedalIcon color={badgeColor("silver")} size={20} />{" "}
                  </abbr>
                  {totalSum.diamond +
                    totalSum.gold +
                    totalSum.silver}
                </div>
                <div className={styles.medalSummary}>
                  <abbr title="At most one badge from silver">
                    ~
                    <MedalIcon color={badgeColor("silver")} size={20} />{" "}
                  </abbr>
                  {totalSum.diamond +
                    totalSum.gold +
                    totalSum.silver +
                    oneOff}
                </div>
              </td>
              {taskGraph.nodes.map((node) => (
                <td key={node.id} className={styles.badgeColumn}>
                  <MedalSummary
                    numStudents={usernameList.length}
                    sum={badgeSum[node.id]}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}
