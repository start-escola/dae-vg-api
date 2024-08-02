export default () => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["cpf", "fullname"],
      },
    },
  },
  ckeditor: {
    enabled: true,
    resolve: "./src/plugins/strapi-plugin-ckeditor",
  },
});
