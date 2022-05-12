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
    return await req.json();
  } catch {
    return null;
  }
}
