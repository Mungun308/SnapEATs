// componentsehnii3.js - БҮХ КОМПОНЕНТ ХОЛБОСОН
console.log('🎯 Фильтер систем ачаалагдаж байна...');

let restaurantData = [];

// 1. Өгөгдөл ачаалах
fetch('restaurants.json')
    .then(r => r.json())
    .then(data => {
        restaurantData = data;
        console.log(`✅ ${data.length} ресторан ачаалагдлаа`);
        setupFilters();
    })
    .catch(err => {
        console.log('❌ Өгөгдөл ачааллахад алдаа:', err);
        // Тест өгөгдөл
        restaurantData = [
            { rest_name: "IL FIORE", rank: 4.8, distance: "1.2 км" },
            { rest_name: "MOM'S TOUCH", rank: 4.7, distance: "850 м" }
        ];
        setupFilters();
    });

// 2. Бүх шүүлтүүрүүдийг холбох
function setupFilters() {
    console.log('🔧 Шүүлтүүрүүдийг холбож байна...');
    
    // A. Хоолны төрөл
    const foodBoxes = document.querySelectorAll('input[name="foodCategory"]');
    foodBoxes.forEach(box => {
        box.addEventListener('change', function() {
            console.log(`🥘 ${this.value}: ${this.checked ? 'сонгогдлоо' : 'устгагдлаа'}`);
        });
    });
    
    // B. Үнийн шүүлтүүр
    const priceSlider = document.getElementById('slider');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            const valueDisplay = this.parentElement.querySelector('.range-value');
            if (valueDisplay) {
                valueDisplay.textContent = this.value + '₮';
            }
            console.log(`💰 Үнэ: ${this.value}₮`);
        });
    }
    
    // C. Одны үнэлгээ
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-value');
            
            // Бүх оддын зургийг солих
            stars.forEach((s, i) => {
                const starImg = s.querySelector('img');
                starImg.src = (i < rating) ? './img/star.svg' : './img/greystar.svg';
            });
            
            console.log(`⭐ ${rating} од сонгогдлоо`);
        });
    });
    
    // D. se-btn-filter компонентууд
    const customButtons = document.querySelectorAll('se-btn-filter');
    customButtons.forEach(btn => {
        btn.addEventListener('filterChange', function(e) {
            const detail = e.detail;
            console.log(`🔘 ${detail.title}: ${detail.active ? 'идэвхжлээ' : 'идэвхгүй боллоо'}`);
            
            // Шүүлтүүр хийх логик
            if (detail.active) {
                filterByCategory(detail.category);
            }
        });
    });
    
    // E. Хайх товч
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    console.log('✅ Бүх шүүлтүүр холбогдлоо');
}

// 3. se-btn-filter дээр шүүлтүүр хийх
function filterByCategory(category) {
    console.log(`🔍 ${category} категориар шүүж байна...`);
    
    let filtered = [];
    
    switch(category) {
        case 'highranked':
            filtered = restaurantData.filter(r => r.rank >= 4.5);
            break;
        case 'new':
            filtered = restaurantData.filter(r => r.amount_of_people_ranked < 200);
            break;
        case 'gift':
        case 'featured':
            filtered = restaurantData.filter(r => r.rank >= 4.0);
            break;
        default:
            filtered = restaurantData;
    }
    
    console.log(`📊 ${filtered.length} ресторан олдлоо`);
    showResults(filtered);
}

// 4. Хайлт хийх
function performSearch() {
    console.log('🔎 Хайлт эхэллээ...');
    
    // Сонгогдсон төрлүүд
    const selectedCategories = [];
    document.querySelectorAll('input[name="foodCategory"]:checked').forEach(box => {
        selectedCategories.push(box.value);
    });
    
    // Үнийн утга
    const price = document.querySelector('#slider')?.value || 0;
    
    // Үнэлгээ
    let rating = 0;
    document.querySelectorAll('.star').forEach((star, i) => {
        const img = star.querySelector('img');
        if (img.src.includes('star.svg')) {
            rating = i + 1;
        }
    });
    
    console.log('📋 Шүүлтүүр:');
    console.log('- Төрөл:', selectedCategories);
    console.log('- Үнэ:', price);
    console.log('- Од:', rating);
    
    // Шүүлтүүр хийх
    let results = restaurantData;
    
    if (rating > 0) {
        results = results.filter(r => r.rank >= rating);
    }
    
    if (selectedCategories.length > 0) {
        // Энд өөрийн шүүлтүүр логик оруулна
        results = results.slice(0, 5); // ТЕСТ
    }
    
    console.log(`🎯 ${results.length} үр дүн олдлоо`);
    showResults(results);
}

// 5. Үр дүнг харуулах
function showResults(results) {
    // Хуучин үр дүнг устгах
    const oldResults = document.querySelector('.results-container');
    if (oldResults) oldResults.remove();
    
    // Шинэ контейнер үүсгэх
    const container = document.createElement('div');
    container.className = 'results-container';
    container.style.cssText = `
        position: fixed;
        top: 150px;
        right: 20px;
        width: 300px;
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        z-index: 1000;
        max-height: 400px;
        overflow-y: auto;
    `;
    
    // Гарчиг
    container.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #2A2C41;">🔍 Үр дүн (${results.length})</h3>
    `;
    
    // Үр дүн нэмэх
    results.forEach((rest, i) => {
        const item = document.createElement('div');
        item.style.cssText = `
            padding: 10px;
            border-bottom: 1px solid #eee;
            font-size: 12px;
        `;
        item.innerHTML = `
            <strong>${i+1}. ${rest.rest_name}</strong><br>
            ⭐ ${rest.rank} • 📏 ${rest.distance}<br>
            <small>${rest.address}</small>
        `;
        container.appendChild(item);
    });
    
    // Хаах товч
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ Хаах';
    closeBtn.style.cssText = `
        margin-top: 10px;
        background: #FFA500;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
    `;
    closeBtn.onclick = () => container.remove();
    container.appendChild(closeBtn);
    
    document.body.appendChild(container);
}

// 6. DOM бэлэн болоход дуудах
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✅ DOM бэлэн боллоо');
    });
} else {
    console.log('✅ DOM аль хэдийн бэлэн байна');
}