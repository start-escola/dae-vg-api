/**
 * internal-control controller
 */

import { factories } from "@strapi/strapi";
export default factories.createCoreController(
  "api::internal-control.internal-control",
  ({ strapi }) => ({
    async getFolder(ctx) {
      try {
        const { path } = ctx.query; // Pegamos o caminho passado por query params

        if (!path) {
          return ctx.badRequest("O parâmetro 'path' é obrigatório.");
        }

        const pathArray = path.split("/"); // Divide as pastas por "/"
        let parentId = null;
        let folder = null;

        for (const folderName of pathArray) {
          folder = await strapi.db.query("api::internal-control.internal-control").findOne({
            where: {
              slug: folderName,
              ...(parentId ? { parent: { id: parentId } } : { parent: { $null: true } }),
            },
            populate: {
              files: {
                select: ['id', 'name', 'url', 'ext']
              },
              subfolders: true
            },
          });

          if (!folder) {
            return ctx.notFound(`Pasta "${folderName}" não encontrada.`);
          }

          parentId = folder.id;
        }

        return ctx.send({ data: folder });
      } catch (error) {
        console.error("Erro ao buscar pasta:", error);
        return ctx.internalServerError("Erro ao buscar a pasta.");
      }
    },
  })
);

