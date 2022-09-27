import { useState, useEffect } from "react";
import { pocketbaseClient } from "../lib/pocketbase";

export default function useAuthListener() {
  const [user, setUser] = useState(pocketbaseClient.authStore?.model || null);
  useEffect(() => {
    const listener = pocketbaseClient.authStore.onChange((newToken) => {
      console.log({ newToken });
      if (newToken) {
        setUser(pocketbaseClient.authStore.model);
      } else {
        setUser(null);
      }
    });
    return () => listener();
  }, []);

  return { user };
}
