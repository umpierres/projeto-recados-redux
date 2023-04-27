// Rotas para visitantes
const visitorRoutes = [
  { label: 'Home', url: '/' },
  { label: 'Entrar', url: '/signin' },
  { label: 'Cadastrar', url: '/signup' },
];

const loggedInRoutes = [
  { label: 'Home', url: '/' },
  { label: 'Minha conta', url: '/my-account' },
  { label: 'Sair', url: '/logout' },
];

export { visitorRoutes, loggedInRoutes };
