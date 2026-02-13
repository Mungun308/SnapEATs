class SeBtnFilter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="se-btn-filter-wrap">
          <button class="se-btn-filter active" data-category="all" type="button">Бүгд</button>
          <button class="se-btn-filter" data-category="asian" type="button">Ази</button>
          <button class="se-btn-filter" data-category="european" type="button">Европ</button>
          <button class="se-btn-filter" data-category="mongolian" type="button">Монгол</button>
        </div>
      `;
  
      this.querySelectorAll(".se-btn-filter").forEach(btn => {
        btn.addEventListener("click", () => {
          // 1) active class update
          this.querySelectorAll(".se-btn-filter").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
  
          // 2) header-ын select (#category) -г update
          const cat = btn.dataset.category;
          const categorySelect = document.getElementById("category");
          if (categorySelect) categorySelect.value = cat;
  
          // 3) filter дахин ажиллуулах event
          this.dispatchEvent(new CustomEvent("filters-changed", { bubbles: true }));
        });
      });
    }
  }
  
  customElements.define("se-btn-filter", SeBtnFilter);
  export default SeBtnFilter;