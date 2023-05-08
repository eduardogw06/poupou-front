module.exports = [
  {
    source: "/cadastro",
    destination: "/register",
  },

  {
    source: "/perfil",
    destination: "/user-profile",
  },

  {
    source: "/alterar-senha",
    destination: "/update-password",
  },

  {
    source: "/meus-aportes",
    destination: "/my-transactions",
  },

  {
    source: "/meus-objetivos",
    destination: "/my-targets",
  },

  {
    source: "/meus-objetivos/:uuid",
    destination: "/my-targets/:uuid",
  },

  {
    source: "/aportes-automaticos",
    destination: "/automatic-transactions",
  },
  {
    source: "/categorias",
    destination: "/categories",
  },

  {
    source: "/emails/:uuid",
    destination: "/emails/:uuid",
  },
];
