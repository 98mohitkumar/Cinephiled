import LogRocket from "logrocket";

import { isProduction } from "data/global";

if (isProduction && typeof window !== "undefined") {
  LogRocket.init("ugzauv/cinephiled");
}
