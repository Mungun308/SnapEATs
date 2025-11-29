class SeBtnFilter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML=`<article data-cat="highranked">
            <img src="high-rank.svg" alt="icon">
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