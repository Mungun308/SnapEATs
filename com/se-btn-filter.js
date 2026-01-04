class SEBtnFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        const title = this.getAttribute('ttl') || 'ТОВЧ';
        const category = this.getAttribute('data-cat') || '';
        const icon = this.getAttribute('data-icon') || '';
        
        const style = document.createElement('style');
        style.textContent = `
            .filter-btn {
                width: 200px;
                height: 100px;
                background: #F4F4F8;
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
                
                transform: translateY(-2px);
            }
            
            .filter-btn.active {
                background: #F4F4F8;
                border-radius:10px;
                                border:2px solid;

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
        
        const html = `
            <div class="filter-btn">
                ${icon ? `<img src="${icon}" class="icon">` : ''}
                <div class="title">${title}</div>
            </div>
        `;
        
        this.shadowRoot.appendChild(style);
        this.shadowRoot.innerHTML += html;
        
        const btn = this.shadowRoot.querySelector('.filter-btn');
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            
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

customElements.define('se-btn-filter', SEBtnFilter);