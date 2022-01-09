import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

// @ts-ignore
import * as build from "../build";

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => context,
});
