// componentsehnii3.js - RESTAURANTS.JSON болон MENUS.JSON ХОЛБОСОН
console.log('🍽️ Ресторан болон цэсний систем ачаалагдаж байна...');

let restaurants = []; // restaurants.json өгөгдөл
let menus = []; // menus.json өгөгдөл

// 1. ХОЁР JSON ӨГӨГДЛИЙГ НЭГДГЭЭР АЧААЛАХ
Promise.all([
    fetch('restaurants.json').then(r => r.json()),
    fetch('menus.json').then(r => r.json())
])
.then(([restData, menuData]) => {
    restaurants = restData;
    menus = menuData;
    
    console.log(`✅ ${restaurants.length} ресторан ачаалагдлаа`);
    console.log(`✅ ${menus.length} рестораны цэс ачаалагдлаа`);
    
    // 2. ЭХЛЭЭД БҮХ РЕСТОРАНЫГ ХАРУУЛ
    showAllRestaurants();
    
    // 3. БҮХ ФИЛЬТЕР ХОЛБОХ
    connectAllFilters();
})
.catch(err => {
    console.log('❌ Өгөгдөл ачааллахад алдаа:', err);
    // Тест өгөгдөл
    restaurants = [
        { rest_name: "IL FIORE", rank: 4.8, distance: "1.2 км", address: "СБД, 3-р хороо" },
        { rest_name: "MOM'S TOUCH", rank: 4.7, distance: "850 м", address: "СБД, 1-р хороо" }
    ];
    menus = [{ rest_id: "test", food: [{ name: "Тест хоол", price: 10000 }] }];
    showAllRestaurants();
    connectAllFilters();
});

// 2. БҮХ РЕСТОРАНЫГ ХАРУУЛНА
function showAllRestaurants() {
    const container = document.querySelector('.rest-list') || document.querySelector('.relevantlist') || document.body;
    
    // Хуучин үр дүнг устгах
    const oldResults = container.querySelectorAll('.restaurant-card');
    oldResults.forEach(r => r.remove());
    
    // Бүх рестораныг харуулах
    restaurants.forEach((rest, index) => {
        const card = createRestaurantCard(rest, index);
        container.appendChild(card);
    });
    
    console.log(`📊 ${restaurants.length} ресторан харууллаа`);
}

// 3. РЕСТОРАНЫ КАРТ ҮҮСГЭХ
function createRestaurantCard(restaurant, index) {
    const div = document.createElement('div');
    div.className = 'restaurant-card';
    div.style.cssText = `
        background: white;
        padding: 15px;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        font-size: 13px;
        cursor: pointer;
        transition: transform 0.2s;
    `;
    
    div.onmouseover = () => div.style.transform = 'translateY(-3px)';
    div.onmouseout = () => div.style.transform = 'translateY(0)';
    
    // Рестораны мэдээлэл
    div.innerHTML = `
        <strong>${index + 1}. ${restaurant.rest_name}</strong><br>
        ⭐ ${restaurant.rank} (${restaurant.amount_of_people_ranked} хүн)<br>
        📏 ${restaurant.distance}<br>
        🕒 ${restaurant.schedule}<br>
        📍 ${restaurant.address}
        <div style="margin-top: 10px; color: #666; font-size: 11px;">
            👆 Дээр дарж цэсээ харах
        </div>
    `;
    
    // ДАРХАД ЦЭС ХАРУУЛАХ
    div.onclick = () => {
        showMenuForRestaurant(restaurant.rest_name);
    };
    
    return div;
}

// 4. РЕСТОРАНЫ ЦЭС ХАРУУЛАХ
function showMenuForRestaurant(restName) {
    console.log(`📋 ${restName} рестораны цэс хайж байна...`);
    
    // 1. Эхлээд рестораны ID-г олох
    let restId = "";
    
    // Жишээ: "IL FIORE" → "rest_001" гэх мэт холбох
    if (restName.includes("FIORE")) restId = "rest_001";
    else if (restName.includes("MOM")) restId = "rest_003";
    else if (restName.includes("ALFIE")) restId = "rest_002";
    else if (restName.includes("FONTANA")) restId = "rest_004";
    else if (restName.includes("Korean BBQ")) restId = "rest_001";
    else if (restName.includes("Hotpot")) restId = "rest_002";
    else if (restName.includes("Burger")) restId = "rest_003";
    else {
        // Санамсаргүй ID сонгох
        const randomIndex = Math.floor(Math.random() * menus.length);
        restId = menus[randomIndex].rest_id;
    }
    
    // 2. Цэсийг олох
    const menu = menus.find(m => m.rest_id === restId);
    
    if (!menu) {
        alert(`❌ ${restName}-н цэс олдсонгүй`);
        return;
    }
    
    // 3. Цэсийг харуулах цонж үүсгэх
    showMenuPopup(restName, menu);
}

// 5. ЦЭСИЙГ ПОПАП ЦОНЖООР ХАРУУЛАХ
function showMenuPopup(restName, menu) {
    // Хуучин цонжыг устгах
    const oldPopup = document.getElementById('menu-popup');
    if (oldPopup) oldPopup.remove();
    
    // Шинэ цонж үүсгэх
    const popup = document.createElement('div');
    popup.id = 'menu-popup';
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        max-height: 80vh;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 9999;
        padding: 20px;
        overflow-y: auto;
        font-family: Arial, sans-serif;
    `;
    
    // Цонжын агуулга
    let content = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #2A2C41;">${restName}</h2>
            <button onclick="document.getElementById('menu-popup').remove()" 
                    style="background: #F44336; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                ✕ Хаах
            </button>
        </div>
    `;
    
    // ХООЛНЫ ЦЭС
    content += `<h3 style="color: #FFA500; border-bottom: 2px solid #FFA500; padding-bottom: 5px;">🥘 ХООЛНЫ ЦЭС</h3>`;
    content += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">`;
    
    menu.food.forEach(item => {
        content += `
            <div style="background: #FFF8E1; padding: 10px; border-radius: 8px; border-left: 4px solid #FFA500;">
                <strong>${item.name}</strong><br>
                💰 ${item.price}₮<br>
                ⚖️ ${item.portion}<br>
                ⭐ ${item.rate}
            </div>
        `;
    });
    
    content += `</div>`;
    
    // УУХ ЗҮЙЛИЙН ЦЭС
    content += `<h3 style="color: #2196F3; border-bottom: 2px solid #2196F3; padding-bottom: 5px;">🥤 УУХ ЗҮЙЛИЙН ЦЭС</h3>`;
    content += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">`;
    
    menu.drinks.forEach(item => {
        content += `
            <div style="background: #E3F2FD; padding: 10px; border-radius: 8px; border-left: 4px solid #2196F3;">
                <strong>${item.name}</strong><br>
                💰 ${item.price}₮<br>
                ⚖️ ${item.portion}<br>
                ⭐ ${item.rate}
            </div>
        `;
    });
    
    content += `</div>`;
    
    // Нийт үнийн тооцоо
    const totalFood = menu.food.reduce((sum, item) => sum + item.price, 0);
    const totalDrinks = menu.drinks.reduce((sum, item) => sum + item.price, 0);
    
    content += `
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px; text-align: center;">
            <strong>💰 НИЙТ ҮНЭ:</strong><br>
            Хоол: ${totalFood}₮<br>
            Уух зүйлс: ${totalDrinks}₮<br>
            <h3 style="color: #4CAF50; margin: 10px 0 0 0;">Нийт: ${totalFood + totalDrinks}₮</h3>
        </div>
    `;
    
    popup.innerHTML = content;
    document.body.appendChild(popup);
    
    // Гадна тал дархад хаах
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 9998;
    `;
    overlay.onclick = () => {
        popup.remove();
        overlay.remove();
    };
    document.body.appendChild(overlay);
}

// 6. БҮХ ФИЛЬТЕР ХОЛБОХ (үнэ, од, хоолны төрөл)
function connectAllFilters() {
    console.log('🔌 Филтерүүдийг холбож байна...');
    
    // A. ХООЛНЫ ТӨРӨЛ ШҮҮЛТҮҮР
    document.querySelectorAll('input[name="foodCategory"]').forEach(box => {
        box.addEventListener('change', function() {
            const selected = this.value;
            const isChecked = this.checked;
            
            console.log(`🥘 ${selected}: ${isChecked ? 'сонгогдлоо' : 'устгагдлаа'}`);
            
            // ЖИШЭЭ ШҮҮЛТҮҮР:
            let filtered = restaurants;
            
            if (isChecked) {
                if (selected === "mongolian") {
                    filtered = filtered.filter(r => 
                        r.rest_name.includes("Mongol") || 
                        r.rest_name.includes("Гоби") ||
                        r.rest_name.includes("Хуушуур")
                    );
                }
                else if (selected === "korean") {
                    filtered = filtered.filter(r => 
                        r.rest_name.includes("Korean") || 
                        r.rest_name.includes("Seoul") ||
                        r.rest_name.includes("Кимчи")
                    );
                }
                else if (selected === "italian") {
                    filtered = filtered.filter(r => 
                        r.rest_name.includes("Pizza") || 
                        r.rest_name.includes("Pasta") ||
                        r.rest_name.includes("Italy")
                    );
                }
            }
            
            showFilteredResults(filtered, `${selected} хоолны ресторанууд`);
        });
    });
    
    // B. ҮНИЙН СЛАЙДЕР (цэсний үнээр шүүх)
    const priceSlider = document.querySelector('#slider');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            const maxPrice = parseInt(this.value);
            console.log(`💰 Үнийн дээд хязгаар: ${maxPrice}₮`);
            
            // Дэлгэц дээрх утгыг шинэчлэх
            const valueSpan = this.parentElement.querySelector('.range-value');
            if (valueSpan) {
                valueSpan.textContent = maxPrice + '₮';
            }
            
            // Цэсний дундаж үнээр шүүх
            let filtered = [];
            restaurants.forEach(rest => {
                // Рестораны ID-г олох
                let restId = "";
                if (rest.rest_name.includes("Korean BBQ")) restId = "rest_001";
                // ... бусад холболтууд
                
                const menu = menus.find(m => m.rest_id === restId);
                if (menu) {
                    // Хоолны дундаж үнийг тооцох
                    const avgFoodPrice = menu.food.reduce((sum, item) => sum + item.price, 0) / menu.food.length;
                    
                    if (avgFoodPrice <= maxPrice) {
                        filtered.push(rest);
                    }
                }
            });
            
            if (filtered.length === 0) {
                // Хэрэв цэс байхгүй бол рестораны нэрээр шүүх
                filtered = restaurants.filter(r => r.rank >= 4.0);
            }
            
            showFilteredResults(filtered, `${maxPrice}₮ хүртэлх үнэтэй`);
        });
    }
    
    // C. ОДНЫ ҮНЭЛГЭЭ
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-value'));
            console.log(`⭐ ${rating} од сонгогдлоо`);
            
            // Оддын зургийг солих
            document.querySelectorAll('.star').forEach((s, i) => {
                const img = s.querySelector('img');
                img.src = (i < rating) ? './img/star.svg' : './img/greystar.svg';
            });
            
            // Рестораны үнэлгээгээр шүүх
            const filtered = restaurants.filter(r => r.rank >= rating);
            showFilteredResults(filtered, `${rating}+ одтой ресторанууд`);
        });
    });
    
    // D. SE-BTN-FILTER КОМПОНЕНТУУД
    document.querySelectorAll('se-btn-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            const cat = this.getAttribute('data-cat');
            const title = this.getAttribute('ttl') || 'Товч';
            
            console.log(`🔘 ${title} дарагдлаа`);
            
            let filtered = [];
            switch(cat) {
                case 'highranked':
                    filtered = restaurants.filter(r => r.rank >= 4.5);
                    break;
                case 'new':
                    filtered = restaurants.slice(0, 5); // эхний 5
                    break;
                case 'gift':
                    filtered = restaurants.filter(r => r.amount_of_people_ranked > 300);
                    break;
                case 'featured':
                    filtered = restaurants.filter(r => r.rank >= 4.0 && r.amount_of_people_ranked > 200);
                    break;
                default:
                    filtered = restaurants;
            }
            
            showFilteredResults(filtered, title);
        });
    });
    
    // E. SEARCH ТОВЧ
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            console.log('🔎 Ерөнхий хайлт эхэллээ...');
            
            // Бүх шүүлтүүрийг хэрэгжүүлэх
            let results = restaurants;
            
            // Үнэлгээ
            let selectedRating = 0;
            document.querySelectorAll('.star').forEach((star, i) => {
                const img = star.querySelector('img');
                if (img.src.includes('star.svg')) {
                    selectedRating = i + 1;
                }
            });
            
            if (selectedRating > 0) {
                results = results.filter(r => r.rank >= selectedRating);
            }
            
            // Хоолны төрөл
            const selectedCategories = [];
            document.querySelectorAll('input[name="foodCategory"]:checked').forEach(box => {
                selectedCategories.push(box.value);
            });
            
            if (selectedCategories.length > 0) {
                // Цэсний хоолны төрлөөр шүүх
                results = results.filter(rest => {
                    // Рестораны ID-г олох
                    let restId = "";
                    if (rest.rest_name.includes("Korean")) restId = "rest_001";
                    // ... бусад холболтууд
                    
                    const menu = menus.find(m => m.rest_id === restId);
                    if (menu) {
                        // Хоолны нэрээр шүүх
                        const foodNames = menu.food.map(f => f.name.toLowerCase());
                        
                        if (selectedCategories.includes("korean") && 
                            (foodNames.some(name => name.includes("korean") || name.includes("kimchi") || name.includes("bibimbap")))) {
                            return true;
                        }
                        if (selectedCategories.includes("mongolian") && 
                            (foodNames.some(name => name.includes("mongol") || name.includes("hotpot") || name.includes("dumpling")))) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            
            showFilteredResults(results, 'Хайлтын үр дүн');
        });
    }
    
    console.log('✅ Бүх фильтер холбогдлоо');
}

// 7. ШҮҮСЭН ҮР ДҮНГ ХАРУУЛАХ
function showFilteredResults(filteredRestaurants, title) {
    const container = document.querySelector('.rest-list') || document.querySelector('.relevantlist') || document.body;
    
    // Хуучин үр дүнг устгах
    const oldCards = container.querySelectorAll('.restaurant-card');
    oldCards.forEach(card => card.remove());
    
    // Шинэ үр дүнг нэмэх
    if (filteredRestaurants.length === 0) {
        const noResults = document.createElement('div');
        noResults.style.cssText = `
            background: #FFF3CD;
            padding: 20px;
            margin: 20px;
            border-radius: 10px;
            text-align: center;
            color: #856404;
        `;
        noResults.innerHTML = `<h3>${title}</h3><p>Үр дүн олдсонгүй</p>`;
        container.appendChild(noResults);
    } else {
        filteredRestaurants.forEach((rest, index) => {
            const card = createRestaurantCard(rest, index);
            container.appendChild(card);
        });
        
        // Мэссэж харуулах
        showNotification(`${title}: ${filteredRestaurants.length} ресторан`);
    }
    
    console.log(`📊 ${title}: ${filteredRestaurants.length} ресторан`);
}

// 8. ЖИЖИГ МЭССЭЖ ХАРУУЛАХ
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    
    // CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    notification.innerHTML = `✅ ${message}`;
    document.body.appendChild(notification);
    
    // 3 секундын дараа автоматаар устана
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// 9. DOM БЭЛЭН БОЛОХООР ХҮЛЭЭХ
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✅ DOM бэлэн боллоо. Систем дуудагдах болно...');
    });
} else {
    console.log('✅ DOM аль хэдийн бэлэн байна');
}

// 10. ТЕСТ ХИЙХ ХЯЛБАР ФУНКЦ
window.testSystem = function() {
    console.log('🧪 Систем тест хийж байна...');
    
    // 1. Хоолны төрөл сонгох
    setTimeout(() => {
        document.querySelector('input[value="mongolian"]').click();
        console.log('🥘 Монгол хоол сонгогдлоо');
    }, 1000);
    
    // 2. Үнийн слайдер
    setTimeout(() => {
        const slider = document.querySelector('#slider');
        slider.value = 30000;
        slider.dispatchEvent(new Event('input'));
        console.log('💰 Үнэ 30,000₮ болголоо');
    }, 2000);
    
    // 3. Од сонгох
    setTimeout(() => {
        document.querySelector('.star[data-value="4"]').click();
        console.log('⭐ 4 од сонгогдлоо');
    }, 3000);
    
    // 4. Search товч
    setTimeout(() => {
        document.querySelector('.search-btn').click();
        console.log('🔎 Search товч дарлаа');
    }, 4000);
};

console.log('🚀 Ресторан+Цэс систем бэлэн боллоо!');    
// Add to your existing componentsehnii3.js or create a new script
function makeRestaurantCardsClickable() {
    document.querySelectorAll('.rest-profile').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const restaurantName = this.querySelector('.rest-title').textContent;
            // Map restaurant names to IDs
            const restaurantMap = {
                'IL FIORE': 1,
                'ALFIE RESTAURANT': 2,
                'MOM\'S TOUCH': 3,
                'LA FONTANA': 4
            };
            
            const restaurantId = restaurantMap[restaurantName] || 1;
            window.location.href = `restaurant-profile.html?id=${restaurantId}`;
        });
    });
}

// Call this after loading restaurants
document.addEventListener('DOMContentLoaded', makeRestaurantCardsClickable);
// restaurant-links.js - Make restaurant cards clickable
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up restaurant links...');
    
    // Function to make restaurant cards clickable
    function setupRestaurantLinks() {
        // Get all restaurant profile cards
        const restaurantCards = document.querySelectorAll('.rest-profile');
        
        console.log(`Found ${restaurantCards.length} restaurant cards`);
        
        restaurantCards.forEach(card => {
            // Remove any existing click listeners
            card.removeEventListener('click', handleRestaurantClick);
            
            // Add new click listener
            card.addEventListener('click', handleRestaurantClick);
            
            // Add pointer cursor
            card.style.cursor = 'pointer';
            
            // Add hover effect
            card.style.transition = 'transform 0.3s, box-shadow 0.3s';
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Handle restaurant card click
    function handleRestaurantClick(event) {
        event.preventDefault();
        
        // Get restaurant name from the card
        const restaurantName = this.querySelector('.rest-title').textContent;
        console.log('Clicked restaurant:', restaurantName);
        
        // Map restaurant names to IDs
        const restaurantMap = {
            'IL FIORE': 1,
            'ALFIE RESTAURANT': 2,
            'MOM\'S TOUCH': 3,
            'LA FONTANA': 4
        };
        
        const restaurantId = restaurantMap[restaurantName] || 1;
        
        // Navigate to restaurant profile
        window.location.href = `restaurant-profile.html?id=${restaurantId}`;
    }
    
    // Set up links initially
    setupRestaurantLinks();
    
    // Re-setup links when filters change (important!)
    // This ensures new cards created by filters are clickable
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                // Check if restaurant cards were added
                const addedCards = Array.from(mutation.addedNodes).filter(node => 
                    node.classList && node.classList.contains('rest-profile')
                );
                if (addedCards.length > 0) {
                    console.log('New restaurant cards detected, setting up links...');
                    setTimeout(setupRestaurantLinks, 100);
                }
            }
        });
    });
    
    // Start observing the restaurant list container
    const restListContainer = document.querySelector('.rest-list');
    if (restListContainer) {
        observer.observe(restListContainer, {
            childList: true,
            subtree: true
        });
    }
    
    // Also observe the relevantlist section
    const relevantList = document.querySelector('.relevantlist');
    if (relevantList) {
        observer.observe(relevantList, {
            childList: true,
            subtree: true
        });
    }
    
    // Alternative: Re-setup links on filter clicks
    document.querySelectorAll('.filter-section input, .search-btn').forEach(element => {
        element.addEventListener('change', function() {
            setTimeout(setupRestaurantLinks, 500);
        });
    });
    
    console.log('Restaurant links setup complete');
});