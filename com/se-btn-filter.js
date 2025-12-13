class SEBtnFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Атрибутуудыг унших
        const title = this.getAttribute('ttl') || 'ТОВЧ';
        const category = this.getAttribute('data-cat') || '';
        const icon = this.getAttribute('data-icon') || '';
        
        // CSS
        const style = document.createElement('style');
        style.textContent = `
            .filter-btn {
                width: 150px;
                height: 100px;
                background: white;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 8px;
                cursor: pointer;
                border: 2px solid #eee;
                transition: all 0.2s;
                user-select: none;
            }
            
            .filter-btn:hover {
                border-color: #FFA500;
                transform: translateY(-2px);
            }
            
            .filter-btn.active {
                background: #FFF8E1;
                border-color: #FFD700;
            }
            
            .icon {
                width: 30px;
                height: 30px;
            }
            
            .title {
                font-size: 11px;
                color: #2A2C41;
                text-align: center;
                font-weight: 600;
                max-width: 120px;
                line-height: 1.3;
            }
        `;
        
        // HTML
        const html = `
            <div class="filter-btn">
                ${icon ? `<img src="${icon}" class="icon">` : ''}
                <div class="title">${title}</div>
            </div>
        `;
        
        this.shadowRoot.appendChild(style);
        this.shadowRoot.innerHTML += html;
        
        // Дарах event
        const btn = this.shadowRoot.querySelector('.filter-btn');
        btn.addEventListener('click', () => {
            // Active/inactive төлөв өөрчлөх
            btn.classList.toggle('active');
            
            // Event явуулах
            this.dispatchEvent(new CustomEvent('filterChange', {
                detail: {
                    category: category,
                    title: title,
                    active: btn.classList.contains('active')
                },
                bubbles: true
            }));
            
            console.log(`[${category}] ${title} - ${btn.classList.contains('active') ? 'идэвхтэй' : 'идэвхгүй'}`);
        });
    }
}

// Компонентыг бүртгэх
customElements.define('se-btn-filter', SEBtnFilter);