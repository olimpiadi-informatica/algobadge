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

export function Bulk({ taskGraph }: { taskGraph: TaskGraph }) {
  const [usernames, setUsernames] = useState<string>("");
  const [results, setResults] = useState<Record<string, CategoryBadges>>({});
  const usernameList = usernames
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s !== "");
  // TODO: remove duplicates

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

  return (
    <div>
      <h1 className={styles.title}>Bulk</h1>
      <FormControl
        as="textarea"
        placeholder="Inserisci la lista di username, uno per riga"
        onChange={(e) => setUsernames(e.target.value)}
        className={styles.usernames}
      >
        {usernames}
      </FormControl>
      <Button onClick={() => load()}>Via!</Button>
      <hr />
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
        </tbody>
      </Table>
    </div>
  );
}
