export type TaskScore = {
  score: number;
  name: string;
  title: string;
};

export type UserInfo = {
  username: string;
  mail_hash: string;
  first_name: string;
  last_name: string;
  success: number;
  scores: TaskScore[];
};

export async function getUserInfo(username: string): Promise<UserInfo | null> {
  try {
    const body = { action: "get", username };
    const req = await fetch("https://training.olinfo.it/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
    // If there is no training account, there is also no territoriali account.
    if (req.status !== 200) return null;
    const data = await req.json();
    if (data.success !== 1) return null;
    const reqTerr = await fetch(`https://territoriali.olinfo.it/api/user/${username}/scores`, {
      method: "GET",
    });
    // Only send use data from training if there is no account on territoriali.
    if (reqTerr.status != 200) return data;
    const terrData = await reqTerr.json();
    for (const terrTask of terrData) {
      terrTask['score'] = terrTask['score'] * 50 / terrTask['max_score'];
      data.scores.push(terrTask);
    }
    return data;
  } catch {
    return null;
  }
}
