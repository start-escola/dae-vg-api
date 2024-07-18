/**
 * `admin-redirect` middleware
 */

import { Strapi } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Strapi }) => {
  const redirects = ["/", "/index.html"].map((path) => ({
    method: "GET",
    path,
    handler: (ctx) => ctx.redirect("/cms/admin"),
    config: { auth: false },
  }));

  // @ts-ignore
  strapi.server.routes(redirects);
  return async (ctx, next) => {
    strapi.log.info("In admin-redirect middleware.");
    await next();
  };
};
