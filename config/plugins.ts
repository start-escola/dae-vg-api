export default ({ env }) => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["cpf", "fullname"],
      },
    },
  },
  email: {
    config: {
      provider: "strapi-provider-email-brevo",
      providerOptions: {
        apiKey: env("BREVO_API_KEY"),
      },
      settings: {
        // defaultSenderEmail: "noreply@daevg.com.br",
        defaultReplyTo: "no-reply@varzeagrande.mt.gov.br",
      },
    },
  },
  'i18n': {
    enabled: true,
  },
});
