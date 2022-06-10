import { MedalIcon } from "components/category/Progress";
import {
  badgeColor,
  CategoryBadges,
  computeCategoryBadges,
  getTotalBadge,
} from "lib/badges";
import { TaskGraph } from "lib/taskgraph";
import { getUserInfo } from "lib/training-api";
import { useState } from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import styles from "./Bulk.module.scss";

type Sum = { gold: number; silver: number; bronze: number; none: number };

function MedalSummary({ sum }: { sum: Sum }) {
  return (
    <>
      {(["gold", "silver", "bronze"] as const).map((medal) => (
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
    </>
  );
}

export function Bulk({ taskGraph }: { taskGraph: TaskGraph }) {
  const [usernames, setUsernames] = useState<string>("");
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
    for (const username of usernameList) {
      getUserInfo(username)
        .then((info) =>
          info ? computeCategoryBadges(taskGraph, info, false) : null
        )
        .then((badges) => {
          if (badges) {
            setResults((old) => ({ ...old, [username]: badges }));
          }
        });
    }
  };

  const badgeSum: Record<string, Sum> = {};
  const totalSum: Sum = { gold: 0, silver: 0, bronze: 0, none: 0 };
  for (const badges of Object.values(results)) {
    for (const [cat, badge] of Object.entries(badges)) {
      if (!(cat in badgeSum)) {
        badgeSum[cat] = { gold: 0, silver: 0, bronze: 0, none: 0 };
      }
      if (
        badge.badge === "gold" ||
        badge.badge === "silver" ||
        badge.badge === "bronze"
      ) {
        badgeSum[cat][badge.badge] += 1;
      } else {
        badgeSum[cat].none += 1;
      }
    }
    const totalBadge = getTotalBadge(badges);
    if (
      totalBadge === "gold" ||
      totalBadge === "silver" ||
      totalBadge === "bronze"
    ) {
      totalSum[totalBadge] += 1;
    } else {
      totalSum.none += 1;
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
            {usernameList.map((username) => (
              <tr key={username}>
                <td>
                  <a
                    href={`/?impersonate=${username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <code>{username}</code>
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
              <td className={styles.totalColumn}>
                <MedalSummary sum={totalSum} />
              </td>
              {taskGraph.nodes.map((node) => (
                <td key={node.id} className={styles.badgeColumn}>
                  <MedalSummary sum={badgeSum[node.id]} />
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}
