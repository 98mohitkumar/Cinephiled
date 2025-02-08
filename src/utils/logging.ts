import LogRocket from "logrocket";

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined") {
  LogRocket.init("ugzauv/cinephiled");
}
