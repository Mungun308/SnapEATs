class FiltersPanel extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<aside class="filter">
                    <section class="filter-section">
                        <p class="filter-title">ХООЛНЫ ТӨРӨЛ</p>
                        <div class="checkbox-list">
                            <label><input type="checkbox" name="foodCategory" value="fastfood">Түргэн хоол</label>
                            <label><input type="checkbox" name="foodCategory" value="mongolian">Монгол</label>
                            <label><input type="checkbox" name="foodCategory" value="korean">Солонгос</label>
                            <label><input type="checkbox" name="foodCategory" value="italian">Итали</label>
                            <label><input type="checkbox" name="foodCategory" value="chinese">Хятад</label>
                            <label><input type="checkbox" name="foodCategory" value="japanese">Япон</label>
                            <label><input type="checkbox" name="foodCategory" value="snack">Snack</label>
                            <label><input type="checkbox" name="foodCategory" value="drinks">Уух зүйлс</label>
                            <label><input type="checkbox" name="foodCategory" value="bakery">Bakery</label>
                        </div>
                    </section>
                    
                    <section class="filter-section">
                        <p class="filter-title">ҮНИЙН МУЖ</p>
                        <p class="sub">0-100.000</p>
                        <div class="range-container">
                            <span class="range-value">60k ₮</span>
                            <input type="range" id="slider" min="0" max="100000" value="60000">
                        </div>
                    </section>
                    
                    <section class="filter-section">
                        <p class="filter-title">ҮНЭЛГЭЭ</p>
                        <div class="star-rank">
                            <span class="star" data-value="1"><img src="./img/greystar.svg" alt="star"></span>
                            <span class="star" data-value="2"><img src="./img/greystar.svg" alt="star"></span>
                            <span class="star" data-value="3"><img src="./img/greystar.svg" alt="star"></span>
                            <span class="star" data-value="4"><img src="./img/greystar.svg" alt="star"></span>
                            <span class="star" data-value="5"><img src="./img/greystar.svg" alt="star"></span>
                        </div>
                        <input type="hidden" id="ratingValue" value="0">
                    </section>
                    
                    <section class="filter-section">
                        <p class="filter-title">ХЯЗГААРЛАЛТ</p>
                        <div class="checkbox-list">
                            <label><span>Vegan</span><input type="checkbox" name="foodLimit" value="Vegan"></label>
                            <label><span>Gluten-free</span><input type="checkbox" name="foodLimit" value="Gluten-free"></label>
                            <label><span>Keto diet</span><input type="checkbox" name="foodLimit" value="Keto diet"></label>
                            <label><span>Lactose-free</span><input type="checkbox" name="foodLimit" value="Lactose-free"></label>
                        </div>
                    </section>
                    
                    <section class="filter-section">
                        <p class="filter-title">ХЭМЖЭЭ</p>
                        <div class="checkbox-list-row">
                            <label><span>1</span><input type="checkbox" name="portion" value="1"></label>
                            <label><span>2</span><input type="checkbox" name="portion" value="2"></label>
                            <label><span>3</span><input type="checkbox" name="portion" value="3"></label>
                            <label><span>4+</span><input type="checkbox" name="portion" value="4+"></label>
                        </div>
                    </section>
                    
                    <section class="filter-section">
                        <p class="filter-title">ЗАЙ</p>
                        <p class="sub">100м-5км</p>
                        <div class="range-container">
                            <span class="range-value" id="rangeText">2km</span>
                            <input type="range" id="distance" min="0" max="5" value="2" step="0.1">
                        </div>
                    </section>
                    
                    <button class="search-btn" type="button"><img src="./img/searchButton.svg" alt="search"></button>
                </aside>`;
    this._bind();
  }

  _bind() {
    const fire = () => this.dispatchEvent(new CustomEvent('filters-changed', { bubbles: true }));

    this.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('change', fire);
      el.addEventListener('input', fire);
    });

    const btn = this.querySelector('.search-btn');
    if (btn) btn.addEventListener('click', fire);

    this.querySelectorAll('.star').forEach(star => star.addEventListener('click', fire));
  }
}
customElements.define('filters-panel', FiltersPanel);
export default FiltersPanel;
