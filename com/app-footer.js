class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer>
                <div class="footer-section">
                    <h4>БИДЭНТЭЙ ХОЛБОГДОХ</h4>
                    <ul>
                        <li>С.Жамъян Гүнгийн Гудамж Silk Road, SBD - 1 khoroo, Ulaanbaatar 14240</li>
                        <li>976-77110022</li>
                        <li>info@snapeats.com</li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>SNAPEATS</h4>
                    <ul>
                        <li>Бидний тухай</li>
                        <li>Баннер байршуулах</li>
                        <li>Карьер</li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>ХАРИЛЦАГЧ</h4>
                    <ul>
                        <li>Хамтын ажиллагаа</li>
                        <li>Санал хүсэлт</li>
                    </ul>
                </div>
            </footer>`;
  }
}
customElements.define('app-footer', AppFooter);
export default AppFooter;
