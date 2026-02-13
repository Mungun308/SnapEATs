import './components/app-header.js';
import './components/app-footer.js';
import './components/filters-panel.js';

import './app-core.js';

import { registerRoute, startRouter, navigate } from './router/router.js';

window.navigate = navigate;

function showOnly(sectionId) {
  const ids = [
    'homeSection','restaurantSection','cartSection','paymentSection','successSection',
    'loginSection','signupSection','profileSection','aboutSection'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = (id === sectionId) ? 'block' : 'none';
  });
}

registerRoute('/home', () => {
  if (typeof window.showHome === 'function') window.showHome();
  else showOnly('homeSection');
});

registerRoute('/cart', () => {
  if (typeof window.showCart === 'function') window.showCart();
  else showOnly('cartSection');
});

registerRoute('/payment', () => {
  if (typeof window.proceedToPayment === 'function') window.proceedToPayment();
  else showOnly('paymentSection');
});

registerRoute('/success', () => showOnly('successSection'));
registerRoute('/login', () => showOnly('loginSection'));
registerRoute('/signup', () => showOnly('signupSection'));

registerRoute('/profile', () => showOnly('profileSection'));
registerRoute('/about', () => showOnly('aboutSection'));

registerRoute('/restaurant/:id', (route) => {
  const idStr = route.split('/')[2];
  const id = parseInt(idStr, 10);
  if (id && typeof window.showRestaurantDetail === 'function') window.showRestaurantDetail(id);
  else showOnly('restaurantSection');
});

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('filters-changed', () => {
    if (typeof window.applyAllFilters === 'function') window.applyAllFilters();
  });

  document.addEventListener('open-user-menu', () => {
    if (typeof window.showUserMenu === 'function') window.showUserMenu();
  });

  const wrap = (fnName, path) => {
    const orig = window[fnName];
    if (typeof orig !== 'function') return;
    window[fnName] = (...args) => {
      if (path) navigate(path);
      return orig(...args);
    };
  };

  wrap('showHome', '/home');
  wrap('showCart', '/cart');
  wrap('proceedToPayment', '/payment');
  wrap('showLogin', '/login');
  wrap('showSignup', '/signup');

  startRouter();

  if (!location.hash) navigate('/home');
});

document.addEventListener("filters-changed", () => {
  const listEl = document.getElementById("restaurantList");
  if (!listEl) return; 
  applyAllFilters(restaurants, { listEl });
});
