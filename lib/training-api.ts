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
    if (req.status !== 200) return null;
    var data = await req.json();
    if (data.success !== 1) return null;
    const req_terr = await fetch("https://territoriali.olinfo.it/api/user/" + username + "/scores", {
      method: "GET",
    });
    if (req_terr.status != 200) return null;
    const terr_data = await req_terr.json();
    for (var terr_task of terr_data) {
      terr_task['score'] = terr_task['score'] * 100 / terr_task['max_score'];
      data.scores.push(terr_task);
    }
    return data;
  } catch {
    return null;
  }
}
