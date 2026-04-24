import { useEffect } from "react";

export const useOfflineSync = (data) => {
  useEffect(() => {
    const save = () => {
      localStorage.setItem("offline_data", JSON.stringify(data));
    };

    const sync = () => {
      const stored = localStorage.getItem("offline_data");
      if (stored) {
        console.log("🔄 Syncing offline data...");
        localStorage.removeItem("offline_data");
      }
    };

    window.addEventListener("offline", save);
    window.addEventListener("online", sync);

    return () => {
      window.removeEventListener("offline", save);
      window.removeEventListener("online", sync);
    };
  }, [data]);
};