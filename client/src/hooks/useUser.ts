import { useEffect, useState } from "react";

export interface UserInfo {
  username?: string;
  name: string;
  email: string;
  picture?: string;
}

export function useUser() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/user", {
      credentials: "include"
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser({
          username: data.username,
          name: data.name,
          email: data.email,
          picture: data.picture || undefined
        });
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}