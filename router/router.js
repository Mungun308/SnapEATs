const routeHandlers = new Map();

export function registerRoute(path, handler) {
  routeHandlers.set(path, handler);
}

export function navigate(path) {
  const clean = String(path || '/home').startsWith('/') ? String(path) : '/' + String(path);
  const target = `#${clean}`;
  if (location.hash !== target) location.hash = target;
  else window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function getRoute() {
  const h = location.hash || '#/home';
  return h.replace(/^#/, '');
}

function normalizeDynamic(route) {
  if (route.startsWith('/restaurant/')) return '/restaurant/:id';
  return route;
}

export function startRouter() {
  const render = () => {
    const route = getRoute();
    const key = normalizeDynamic(route);
    const handler = routeHandlers.get(key) || routeHandlers.get('/home');
    if (handler) handler(route);
  };
  window.addEventListener('hashchange', render);
  render();
}
