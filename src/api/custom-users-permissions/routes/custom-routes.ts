export default {
  routes: [
    {
      method: "POST",
      path: "/auth",
      handler: "custom-users-permissions.callback", // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        auth: false,
      },
    },
  ],
};
