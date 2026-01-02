console.log('Main filter system loaded');

const restaurants = [
    { rest_name: "Yuna Korean BBQ", distance: "1.2 км", schedule: "Өнөөдөр: 10:00–22:00", address: "БГД, 3-р хороо, Энхтайваны өргөн чөлөө 45", rank: 4.8, amount_of_people_ranked: 235, isNew: false, hasPromotion: true, isFeatured: true, category: "korean" },
    { rest_name: "The Bull Hotpot", distance: "850 м", schedule: "Өнөөдөр: 11:00–23:30", address: "СБД, 1-р хороо, Тэди төвийн зүүн талд", rank: 4.6, amount_of_people_ranked: 410, isNew: true, hasPromotion: false, isFeatured: false, category: "chinese" },
    { rest_name: "Burger & Fries", distance: "2.3 км", schedule: "Өнөөдөр: 09:00–21:00", address: "ЧД, 5-р хороо, Барилгачдын гудамж 12", rank: 4.4, amount_of_people_ranked: 189, isNew: true, hasPromotion: true, isFeatured: false, category: "fastfood" },
    { rest_name: "Tokyo House Sushi", distance: "1.7 км", schedule: "Өнөөдөр: 10:30–22:00", address: "БЗД, 15-р хороо, Нархан хотхон 102", rank: 4.9, amount_of_people_ranked: 527, isNew: false, hasPromotion: false, isFeatured: true, category: "japanese" },
    { rest_name: "Nomads Mongolian Cuisine", distance: "3.0 км", schedule: "Өнөөдөр: 12:00–23:00", address: "СБД, 11-р хороо, Чингисийн өргөн чөлөө 17", rank: 4.7, amount_of_people_ranked: 314, isNew: false, hasPromotion: true, isFeatured: true, category: "mongolian" },
    { rest_name: "Seoul Garden", distance: "1.1 км", schedule: "Өнөөдөр: 10:00–22:00", address: "СБД, 7-р хороо, Сөүлийн гудамж 14", rank: 4.5, amount_of_people_ranked: 268, isNew: true, hasPromotion: false, isFeatured: false, category: "korean" },
    { rest_name: "Mexican Taco Bar", distance: "2.8 км", schedule: "Өнөөдөр: 11:00–23:00", address: "БЗД, 13-р хороо, Жуковын гудамж 22", rank: 4.3, amount_of_people_ranked: 142, isNew: false, hasPromotion: true, isFeatured: false, category: "fastfood" },
    { rest_name: "Viet Pho 88", distance: "900 м", schedule: "Өнөөдөр: 09:00–21:30", address: "ЧД, 4-р хороо, Жуулчны гудамж 38", rank: 4.7, amount_of_people_ranked: 381, isNew: true, hasPromotion: false, isFeatured: true, category: "chinese" },
    { rest_name: "Tokyo Ramen Hub", distance: "1.9 км", schedule: "Өнөөдөр: 11:00–22:00", address: "СБД, 1-р хороо, Төв номын сангийн хойд талд", rank: 4.6, amount_of_people_ranked: 244, isNew: false, hasPromotion: true, isFeatured: false, category: "japanese" },
    { rest_name: "Italiano Pasta & Pizza", distance: "3.4 км", schedule: "Өнөөдөр: 10:00–23:00", address: "ХУД, 11-р хороо, Зайсангийн гудамж 18", rank: 4.8, amount_of_people_ranked: 512, isNew: true, hasPromotion: false, isFeatured: true, category: "italian" },
    { rest_name: "Urban Coffee Roasters", distance: "650 м", schedule: "Өнөөдөр: 08:00–20:00", address: "СБД, 6-р хороо, Сэнтрал Тауэр 1 давхар", rank: 4.4, amount_of_people_ranked: 198, isNew: false, hasPromotion: true, isFeatured: false, category: "drinks" },
    { rest_name: "Hotpot Palace", distance: "2.1 км", schedule: "Өнөөдөр: 12:00–23:30", address: "БГД, 10-р хороо, 3-р хороолол, 23-р байр", rank: 4.7, amount_of_people_ranked: 337, isNew: true, hasPromotion: false, isFeatured: false, category: "chinese" },
    { rest_name: "BBQ SmokeHouse", distance: "4.0 км", schedule: "Өнөөдөр: 11:30–22:00", address: "ХУД, 15-р хороо, Ривер Гарден 302", rank: 4.5, amount_of_people_ranked: 156, isNew: false, hasPromotion: true, isFeatured: true, category: "fastfood" },
    { rest_name: "Mediterranean Olive", distance: "2.6 км", schedule: "Өнөөдөр: 10:00–22:00", address: "СБД, 8-р хороо, Олимп плаза 3 давхар", rank: 4.6, amount_of_people_ranked: 221, isNew: true, hasPromotion: false, isFeatured: false, category: "italian" },
    { rest_name: "Korean Street Food House", distance: "1.3 км", schedule: "Өнөөдөр: 09:00–21:00", address: "БЗД, 4-р хороо, Их тойруу 55", rank: 4.2, amount_of_people_ranked: 119, isNew: false, hasPromotion: true, isFeatured: false, category: "korean" }
];

const categoryTitles = {
    highranked: "ӨНДӨР ҮНЭЛГЭЭТЭЙ",
    new: "ШИНЭ",
    gift: "УРАМШУУЛАЛТАЙ",
    featured: "ОНЦЛОХ"
};

let currentCategory = 'highranked';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing filter system...');
    
    initializeFilters();
    initializeCategoryButtons();
    initializeSearch();
    
    displayRestaurantsByCategory(currentCategory);
    
    console.log('Filter system initialized');
});

function initializeFilters() {
    console.log('Setting up filter controls...');
    
    // 1. Food Category Checkboxes
    document.querySelectorAll('input[name="foodCategory"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Food category changed: ${this.value} - ${this.checked}`);
            applyAllFilters();
        });
    });
    
    // 2. Price Slider
    const priceSlider = document.getElementById('slider');
    if (priceSlider) {
        // Set initial display
        updatePriceDisplay(priceSlider.value);
        
        priceSlider.addEventListener('input', function() {
            updatePriceDisplay(this.value);
            applyAllFilters();
        });
    }
    
    // 3. Star Ratings
    document.querySelectorAll('.star[data-value]').forEach(star => {
        star.addEventListener('click', function() {
            const ratingValue = parseInt(this.getAttribute('data-value'));
            console.log(`Star rating clicked: ${ratingValue}`);
            
            // Update star display
            updateStarDisplay(ratingValue);
            
            // Apply filters
            applyAllFilters();
        });
    });
    
    // 4. Food Restrictions
    document.querySelectorAll('input[name="foodLimit"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Food restriction: ${this.value} - ${this.checked}`);
            applyAllFilters();
        });
    });
    
    // 5. Portion Size
    document.querySelectorAll('input[name="portion"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Portion: ${this.value} - ${this.checked}`);
            applyAllFilters();
        });
    });
    
    // 6. Distance Slider
    const distanceSlider = document.getElementById('distance');
    if (distanceSlider) {
        // Set initial display
        updateDistanceDisplay(distanceSlider.value);
        
        distanceSlider.addEventListener('input', function() {
            updateDistanceDisplay(this.value);
            applyAllFilters();
        });
    }
    
    // 7. Search Button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Search button clicked');
            applyAllFilters();
        });
    }
}

function initializeCategoryButtons() {
    const categoryButtons = document.querySelectorAll('se-btn-filter');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-cat');
            console.log(`Category button clicked: ${category}`);
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category
            currentCategory = category;
            
            // Display restaurants for this category
            displayRestaurantsByCategory(category);
            
            // Update title
            const titleElement = document.querySelector('.relevantlist h3');
            if (titleElement) {
                titleElement.textContent = categoryTitles[category] || "РЕСТОРАНУУД";
            }
        });
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log(`Search input: ${this.value}`);
            applyAllFilters();
        });
    }
    
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            console.log(`Category select: ${this.value}`);
            applyAllFilters();
        });
    }
}

function updatePriceDisplay(value) {
    const priceValue = parseInt(value);
    const displayElement = document.querySelector('.range-value');
    if (displayElement) {
        if (priceValue >= 1000) {
            displayElement.textContent = (priceValue / 1000).toFixed(0) + 'k ₮';
        } else {
            displayElement.textContent = priceValue + ' ₮';
        }
    }
}

function updateDistanceDisplay(value) {
    const displayElement = document.getElementById('rangeText');
    if (displayElement) {
        displayElement.textContent = value + 'km';
    }
}

function updateStarDisplay(ratingValue) {
    document.querySelectorAll('.star[data-value]').forEach((star, index) => {
        const starValue = parseInt(star.getAttribute('data-value'));
        const img = star.querySelector('img');
        if (img) {
            if (starValue <= ratingValue) {
                img.src = './img/star.svg';
                img.alt = 'active star';
            } else {
                img.src = './img/greystar.svg';
                img.alt = 'inactive star';
            }
        }
    });
}

function applyAllFilters() {
    console.log('Applying all filters...');
    
    // Get all filter values
    const filters = getCurrentFilters();
    
    // Filter restaurants based on current category
    let filteredRestaurants = filterRestaurantsByCategory(currentCategory);
    
    // Apply additional filters
    filteredRestaurants = applyAdditionalFilters(filteredRestaurants, filters);
    
    // Display results
    displayRestaurants(filteredRestaurants);
    
    // Show filter status
    showFilterStatus(filters);
}

function getCurrentFilters() {
    // Food categories
    const selectedFoodCategories = Array.from(document.querySelectorAll('input[name="foodCategory"]:checked'))
        .map(cb => cb.value);
    
    // Price
    const priceSlider = document.getElementById('slider');
    const maxPrice = priceSlider ? parseInt(priceSlider.value) : 100000;
    
    // Rating
    let minRating = 0;
    document.querySelectorAll('.star[data-value]').forEach((star, index) => {
        const img = star.querySelector('img');
        if (img && img.src.includes('star.svg') && !img.src.includes('greystar')) {
            minRating = index + 1;
        }
    });
    
    // Food restrictions
    const selectedRestrictions = Array.from(document.querySelectorAll('input[name="foodLimit"]:checked'))
        .map(cb => cb.value);
    
    // Portion sizes
    const selectedPortions = Array.from(document.querySelectorAll('input[name="portion"]:checked'))
        .map(cb => cb.value);
    
    // Distance
    const distanceSlider = document.getElementById('distance');
    const maxDistance = distanceSlider ? parseFloat(distanceSlider.value) : 5;
    
    // Search term
    const searchTerm = document.querySelector('input[type="search"]')?.value.toLowerCase() || '';
    
    // Category select
    const selectedCategory = document.getElementById('category')?.value || 'all';
    
    return {
        foodCategories: selectedFoodCategories,
        maxPrice: maxPrice,
        minRating: minRating,
        restrictions: selectedRestrictions,
        portions: selectedPortions,
        maxDistance: maxDistance,
        searchTerm: searchTerm,
        selectedCategory: selectedCategory
    };
}

function filterRestaurantsByCategory(category) {
    let filtered;
    switch (category) {
        case "highranked":
            filtered = [...restaurants].sort((a, b) => b.rank - a.rank);
            break;
        case "new":
            filtered = restaurants.filter(r => r.isNew);
            break;
        case "gift":
            filtered = restaurants.filter(r => r.hasPromotion);
            break;
        case "featured":
            filtered = restaurants.filter(r => r.isFeatured);
            break;
        default:
            filtered = restaurants;
    }
    return filtered;
}

function applyAdditionalFilters(restaurantsList, filters) {
    return restaurantsList.filter(restaurant => {
        // 1. Search filter
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            const nameLower = restaurant.rest_name.toLowerCase();
            const addressLower = restaurant.address.toLowerCase();
            
            if (!nameLower.includes(searchLower) && !addressLower.includes(searchLower)) {
                return false;
            }
        }
        
        // 2. Food category filter
        if (filters.foodCategories.length > 0) {
            if (!filters.foodCategories.includes(restaurant.category)) {
                return false;
            }
        }
        
        // 3. Rating filter
        if (filters.minRating > 0 && restaurant.rank < filters.minRating) {
            return false;
        }
        
        // 4. Distance filter
        const distanceNum = parseFloat(restaurant.distance.replace(' км', '').replace(' м', '')) / 
            (restaurant.distance.includes('м') ? 1000 : 1);
        if (distanceNum > filters.maxDistance) {
            return false;
        }
        
        // 5. Category select filter (top navigation)
        if (filters.selectedCategory !== 'all') {
            // Map category select values to restaurant categories
            const categoryMap = {
                'asian': ['korean', 'japanese', 'chinese'],
                'european': ['italian'],
                'mongolian': ['mongolian']
            };
            
            if (categoryMap[filters.selectedCategory]) {
                if (!categoryMap[filters.selectedCategory].includes(restaurant.category)) {
                    return false;
                }
            }
        }
        
        return true;
    });
}

function displayRestaurantsByCategory(category) {
    const filtered = filterRestaurantsByCategory(category);
    displayRestaurants(filtered.slice(0, 10)); // Show top 10
}

function displayRestaurants(restaurantsToShow) {
    const listContainer = document.querySelector('.rest-list');
    if (!listContainer) {
        console.error('Restaurant list container not found!');
        return;
    }
    
    // Clear existing content except arrows
    const arrows = listContainer.querySelectorAll('.arrowbtn');
    listContainer.innerHTML = '';
    
    // Add left arrow
    if (arrows[0]) {
        listContainer.appendChild(arrows[0].cloneNode(true));
    }
    
    // Add restaurant cards
    restaurantsToShow.forEach((restaurant, index) => {
        const cardHTML = createRestaurantCard(restaurant, index);
        listContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
    
    // Add right arrow
    if (arrows[1]) {
        listContainer.appendChild(arrows[1].cloneNode(true));
    }
    
    // Make cards clickable
    makeCardsClickable();
    
    // Update restaurant count display
    updateRestaurantCount(restaurantsToShow.length);
}

function createRestaurantCard(restaurant, index) {
    const reviews = formatReviews(restaurant.amount_of_people_ranked);
    
    return `
        <article class="rest-profile" data-id="${index + 1}" data-category="${restaurant.category}">
            <div class="profile-wrapper">
                <img class="profile" src="./img/rest-placeholder.jpg" alt="${restaurant.rest_name}">
            </div>
            <p class="rest-title">${restaurant.rest_name}</p>
            <div class="star-and-rank">
                <div class="review-div">
                    <p class="rating">${restaurant.rank}</p>
                    <img class="star" src="./img/star.svg" alt="star">
                    <p class="review">${reviews}</p>
                </div>
                <div class="rank-div">
                    <p class="rank">${index + 1}</p>
                    <img class="badge" src="./img/badge.svg" alt="rank badge">
                </div>
            </div>

        </article>
    `;
}

function formatReviews(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
}

function makeCardsClickable() {
    document.querySelectorAll('.rest-profile').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const restaurantName = this.querySelector('.rest-title').textContent;
            console.log(`Clicked restaurant: ${restaurantName}`);
            
            // Map restaurant names to IDs
            const restaurantIds = {
                'Yuna Korean BBQ': 1,
                'The Bull Hotpot': 2,
                'Burger & Fries': 3,
                'Tokyo House Sushi': 4,
                'Nomads Mongolian Cuisine': 5,
                'Seoul Garden': 6,
                'Mexican Taco Bar': 7,
                'Viet Pho 88': 8,
                'Tokyo Ramen Hub': 9,
                'Italiano Pasta & Pizza': 10,
                'Urban Coffee Roasters': 11,
                'Hotpot Palace': 12,
                'BBQ SmokeHouse': 13,
                'Mediterranean Olive': 14,
                'Korean Street Food House': 15
            };
            
            const restaurantId = restaurantIds[restaurantName] || 1;
            window.location.href = `restaurant-profile.html?id=${restaurantId}`;
        });
    });
}

function updateRestaurantCount(count) {
    const titleElement = document.querySelector('.relevantlist h3');
    if (titleElement) {
        const baseTitle = categoryTitles[currentCategory] || "РЕСТОРАНУУД";
        titleElement.textContent = `${baseTitle} (${count} ресторан)`;
    }
}

function showFilterStatus(filters) {
    // Create or update filter status indicator
    let statusElement = document.querySelector('.filter-status');
    if (!statusElement) {
        statusElement = document.createElement('div');
        statusElement.className = 'filter-status';
        statusElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(statusElement);
    }
    
    // Count active filters
    let activeFilterCount = 0;
    if (filters.foodCategories.length > 0) activeFilterCount++;
    if (filters.minRating > 0) activeFilterCount++;
    if (filters.maxPrice < 100000) activeFilterCount++;
    if (filters.maxDistance < 5) activeFilterCount++;
    if (filters.searchTerm) activeFilterCount++;
    if (filters.selectedCategory !== 'all') activeFilterCount++;
    
    if (activeFilterCount > 0) {
        statusElement.textContent = `${activeFilterCount} шүүлтүүр идэвхтэй`;
        statusElement.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 3000);
    } else {
        statusElement.style.display = 'none';
    }
}

// Add CSS for filter status
const style = document.createElement('style');
style.textContent = `
    .filter-status {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .rest-profile {
        transition: all 0.3s ease;
    }
    
    .rest-profile:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    se-btn-filter.active {
        background-color: #ffa500 !important;
        color: white !important;
    }
`;
document.head.appendChild(style);