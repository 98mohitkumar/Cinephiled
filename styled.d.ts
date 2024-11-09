// import original module declarations
import "styled-components";
import theme from "src/theme/default";

type Theme = typeof theme;

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
