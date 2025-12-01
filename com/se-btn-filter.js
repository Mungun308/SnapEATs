class SeBtnFilter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const ttl = this.getAttribute("ttl");
        const cat = this.getAttribute("data-cat");
        const icon = this.getAttribute("data-icon");


        this.innerHTML=`<article data-cat="highranked">
            <img src="${icon}" alt="icon">
            <p>${this.getAttribute("ttl")}</p>
        </article>
`;      

    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('se-btn-filter', SeBtnFilter);