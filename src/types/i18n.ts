import "i18next";
import { defaultNS } from "src/i18";
import { resources } from "src/i18/resources.i18";
declare module "i18next" {
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: typeof defaultNS;
    // custom resources type
    resources: (typeof resources)["en"];
    // other
  }
}
