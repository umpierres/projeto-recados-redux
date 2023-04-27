// Rotas para visitantes
const visitorRoutes = [
  { label: 'Home', url: '/' },
  { label: 'Entrar', url: '/signin' },
  { label: 'Cadastrar', url: '/signup' },
];

const loggedInRoutes = [

  { label: 'Todos Recados', url: '/all-task' },
  { label: 'Favoritos', url: '/favorites' },
];

export { visitorRoutes, loggedInRoutes };
