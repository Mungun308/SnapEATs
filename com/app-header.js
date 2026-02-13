class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav>
            <h1>Snap<span>EAT</span>s</h1>
            <form onsubmit="return false;">
                <section class="search">
                    <select id="category">
                        <option value="all">ТӨРӨЛ</option>
                        <option value="asian">АЗИ</option>
                        <option value="european">ЕВРОП</option>
                        <option value="mongolian">МОНГОЛ</option>
                    </select>
                    <input type="search" id="searchInput" placeholder="Хайх..."/>
                    <button type="button" id="searchButton"><img src="./img/searchButton.svg" alt="search"></button>
                </section>
            </form>
            <div class="icon">
                <button><img src="./img/notifButton.svg" alt="notifications"></button>
                <button id="userBtn"><img src="./img/userButton.svg" alt="user"></button>
            </div>
        </nav>`;
    this._bind();
  }

  _bind() {
    const searchInput = this.querySelector('#searchInput');
    const category = this.querySelector('#category');
    const searchBtn = this.querySelector('#searchButton');
    const userBtn = this.querySelector('#userBtn');

    const fireFilters = () => this.dispatchEvent(new CustomEvent('filters-changed', { bubbles: true }));

    if (searchInput) searchInput.addEventListener('input', fireFilters);
    if (category) category.addEventListener('change', fireFilters);
    if (searchBtn) searchBtn.addEventListener('click', fireFilters);

    if (userBtn) userBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('open-user-menu', { bubbles: true }));
      if (typeof window.navigate === 'function') window.navigate('/profile');
    });
  }
}

customElements.define('app-header', AppHeader);
export default AppHeader;
