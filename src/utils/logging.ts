import LogRocket from "logrocket";

if (process.env.NEXT_PUBLIC_LOGGING_ENABLED === "true" && typeof window !== "undefined") {
  LogRocket.init("ugzauv/cinephiled");
}
