import LogRocket from "logrocket";

if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
  LogRocket.init("ugzauv/cinephiled");
}
