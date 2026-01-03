document.addEventListener('DOMContentLoaded', function() {
    console.log('Sidebar Filter System loading...');
    
    setTimeout(() => {
        initializeSidebarFilter();
        console.log('Sidebar Filter System initialized');
    }, 100);
});
const restaurants = [
    {rest_name:"Yuna Korean BBQ",distance:"1.2 км",schedule:"Өнөөдөр: 10:00–22:00",address:"БГД, 3-р хороо, Энхтайваны өргөн чөлөө 45",rank:4.8,amount_of_people_ranked:235,isNew:false,hasPromotion:true,isFeatured:true,category:"korean",price_range:35000,delivery_fee:3000,min_order:15000,estimated_time:"25-35 мин"},
    {rest_name:"The Bull Hotpot",distance:"850 м",schedule:"Өнөөдөр: 11:00–23:30",address:"СБД, 1-р хороо, Тэди төвийн зүүн талд",rank:4.6,amount_of_people_ranked:410,isNew:true,hasPromotion:false,isFeatured:false,category:"chinese",price_range:28000,delivery_fee:2500,min_order:12000,estimated_time:"30-40 мин"},
    {rest_name:"Burger & Fries",distance:"2.3 км",schedule:"Өнөөдөр: 09:00–21:00",address:"ЧД, 5-р хороо, Барилгачдын гудамж 12",rank:4.4,amount_of_people_ranked:189,isNew:true,hasPromotion:true,isFeatured:false,category:"fastfood",price_range:15000,delivery_fee:2000,min_order:8000,estimated_time:"20-30 мин"},
    {rest_name:"Tokyo House Sushi",distance:"1.7 км",schedule:"Өнөөдөр: 10:30–22:00",address:"БЗД, 15-р хороо, Нархан хотхон 102",rank:4.9,amount_of_people_ranked:527,isNew:false,hasPromotion:false,isFeatured:true,category:"japanese",price_range:45000,delivery_fee:3500,min_order:20000,estimated_time:"35-45 мин"},
    {rest_name:"Nomads Mongolian Cuisine",distance:"3.0 км",schedule:"Өнөөдөр: 12:00–23:00",address:"СБД, 11-р хороо, Чингисийн өргөн чөлөө 17",rank:4.7,amount_of_people_ranked:314,isNew:false,hasPromotion:true,isFeatured:true,category:"mongolian",price_range:22000,delivery_fee:3000,min_order:10000,estimated_time:"25-35 мин"},
    {rest_name:"Seoul Garden",distance:"1.1 км",schedule:"Өнөөдөр: 10:00–22:00",address:"СБД, 7-р хороо, Сөүлийн гудамж 14",rank:4.5,amount_of_people_ranked:268,isNew:true,hasPromotion:false,isFeatured:false,category:"korean",price_range:32000,delivery_fee:2500,min_order:15000,estimated_time:"30-40 мин"},
    {rest_name:"Mexican Taco Bar",distance:"2.8 км",schedule:"Өнөөдөр: 11:00–23:00",address:"БЗД, 13-р хороо, Жуковын гудамж 22",rank:4.3,amount_of_people_ranked:142,isNew:false,hasPromotion:true,isFeatured:false,category:"mexican",price_range:18000,delivery_fee:3000,min_order:10000,estimated_time:"25-35 мин"},
    {rest_name:"Viet Pho 88",distance:"900 м",schedule:"Өнөөдөр: 09:00–21:30",address:"ЧД, 4-р хороо, Жуулчны гудамж 38",rank:4.7,amount_of_people_ranked:381,isNew:true,hasPromotion:false,isFeatured:true,category:"vietnamese",price_range:25000,delivery_fee:2000,min_order:12000,estimated_time:"20-30 мин"},
    {rest_name:"Tokyo Ramen Hub",distance:"1.9 км",schedule:"Өнөөдөр: 11:00–22:00",address:"СБД, 1-р хороо, Төв номын сангийн хойд талд",rank:4.6,amount_of_people_ranked:244,isNew:false,hasPromotion:true,isFeatured:false,category:"japanese",price_range:28000,delivery_fee:2500,min_order:15000,estimated_time:"30-40 мин"},
    {rest_name:"Italiano Pasta & Pizza",distance:"3.4 км",schedule:"Өнөөдөр: 10:00–23:00",address:"ХУД, 11-р хороо, Зайсангийн гудамж 18",rank:4.8,amount_of_people_ranked:512,isNew:true,hasPromotion:false,isFeatured:true,category:"italian",price_range:32000,delivery_fee:3500,min_order:18000,estimated_time:"35-45 мин"},
    {rest_name:"Urban Coffee Roasters",distance:"650 м",schedule:"Өнөөдөр: 08:00–20:00",address:"СБД, 6-р хороо, Сэнтрал Тауэр 1 давхар",rank:4.4,amount_of_people_ranked:198,isNew:false,hasPromotion:true,isFeatured:false,category:"cafe",price_range:12000,delivery_fee:1500,min_order:5000,estimated_time:"15-25 мин"},
    {rest_name:"Hotpot Palace",distance:"2.1 км",schedule:"Өнөөдөр: 12:00–23:30",address:"БГД, 10-р хороо, 3-р хороолол, 23-р байр",rank:4.7,amount_of_people_ranked:337,isNew:true,hasPromotion:false,isFeatured:false,category:"chinese",price_range:35000,delivery_fee:3000,min_order:20000,estimated_time:"40-50 мин"},
    {rest_name:"BBQ SmokeHouse",distance:"4.0 км",schedule:"Өнөөдөр: 11:30–22:00",address:"ХУД, 15-р хороо, Ривер Гарден 302",rank:4.5,amount_of_people_ranked:156,isNew:false,hasPromotion:true,isFeatured:true,category:"american",price_range:25000,delivery_fee:4000,min_order:15000,estimated_time:"45-55 мин"},
    {rest_name:"Mediterranean Olive",distance:"2.6 км",schedule:"Өнөөдөр: 10:00–22:00",address:"СБД, 8-р хороо, Олимп плаза 3 давхар",rank:4.6,amount_of_people_ranked:221,isNew:true,hasPromotion:false,isFeatured:false,category:"mediterranean",price_range:38000,delivery_fee:3000,min_order:20000,estimated_time:"35-45 мин"},
    {rest_name:"Korean Street Food House",distance:"1.3 км",schedule:"Өнөөдөр: 09:00–21:00",address:"БЗД, 4-р хороо, Их тойруу 55",rank:4.2,amount_of_people_ranked:119,isNew:false,hasPromotion:true,isFeatured:false,category:"korean",price_range:18000,delivery_fee:2000,min_order:10000,estimated_time:"20-30 мин"}
];

let isFilterActive = false;
let currentSortBy = 'rating';
let visibleResults = 12;

function initializeSidebarFilter() {
    console.log('Setting up sidebar filter...');
    
    const filterButton = document.querySelector('.filter .search-btn');
    if (!filterButton) {
        console.error('Filter button not found!');
        return;
    }
    
    const newButton = filterButton.cloneNode(true);
    filterButton.parentNode.replaceChild(newButton, filterButton);
    
    newButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('ШҮҮХ button clicked');
        applySidebarFilters();
    });
    
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('Enter pressed in search');
                applySidebarFilters();
            }
        });
    }
    
    setupSidebarControls();
    addSidebarFilterStyles();
}

function setupSidebarControls() {
    const priceSlider = document.getElementById('slider');
    if (priceSlider) {
        updatePriceDisplay(priceSlider.value);
        priceSlider.addEventListener('input', function() {
            updatePriceDisplay(this.value);
        });
    }
    
    const distanceSlider = document.getElementById('distance');
    if (distanceSlider) {
        updateDistanceDisplay(distanceSlider.value);
        distanceSlider.addEventListener('input', function() {
            updateDistanceDisplay(this.value);
        });
    }
    
    document.querySelectorAll('.star[data-value]').forEach(star => {
        star.addEventListener('click', function() {
            const ratingValue = parseInt(this.getAttribute('data-value'));
            console.log(`Star rating clicked: ${ratingValue}`);
            updateStarDisplay(ratingValue);
        });
    });
    
    document.querySelectorAll('input[name="foodCategory"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Checkbox changed: ${this.value} = ${this.checked}`);
            if (isFilterActive) {
                updateFilterResults();
            }
        });
    });
    
    document.querySelectorAll('input[name="foodLimit"], input[name="portion"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (isFilterActive) {
                updateFilterResults();
            }
        });
    });
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
    
    if (isFilterActive) {
        updateFilterResults();
    }
}

function applySidebarFilters() {
    console.log('=== APPLYING SIDEBAR FILTERS ===');
    
    if (isFilterActive) {
        updateFilterResults();
        return;
    }
    
    enterFilterMode();
}

function enterFilterMode() {
    console.log('Entering filter mode...');
    isFilterActive = true;
    
    hideMapAndCategoryTabs();
    
    const filters = getSidebarFilterValues();
    console.log('Active filters:', filters);
    
    let filteredRestaurants = filterAllRestaurants(filters);
    console.log(`Found ${filteredRestaurants.length} restaurants after filtering`);
    
    if (filteredRestaurants.length === 0) {
        console.log('No restaurants found. Checking filter logic...');
        console.log('All restaurants:', restaurants.map(r => ({
            name: r.rest_name,
            category: r.category,
            rank: r.rank,
            price_range: r.price_range
        })));
    }
    
    filteredRestaurants = sortRestaurants(filteredRestaurants, currentSortBy);
    
    createFilterResultsDisplay(filteredRestaurants, filters);
    
    updateFilterButtonState(true);
}

function hideMapAndCategoryTabs() {
    console.log('Hiding map and category tabs (keeping sidebar visible)...');
    
    const elementsToHide = [
        '.map',
        '.category', 
        'se-btn-filter',
        '.relevantlist'
    ];
    
    elementsToHide.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.hasAttribute('data-original-display')) {
                const originalDisplay = window.getComputedStyle(el).display;
                el.setAttribute('data-original-display', originalDisplay);
            }
            el.style.display = 'none';
        });
    });
    
    const filterSection = document.querySelector('.filter');
    if (filterSection) {
        filterSection.style.display = 'block';
    }
}

function showAllSections() {
    console.log('Showing all sections...');
    
    const elementsToShow = [
        '.map',
        '.category', 
        'se-btn-filter',
        '.relevantlist'
    ];
    
    elementsToShow.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            const originalDisplay = el.getAttribute('data-original-display');
            if (originalDisplay) {
                el.style.display = originalDisplay;
                el.removeAttribute('data-original-display');
            } else {
                el.style.display = 'block';
            }
        });
    });
    
    const filterResults = document.querySelector('.sidebar-filter-results');
    if (filterResults) {
        filterResults.remove();
    }
    
    updateFilterButtonState(false);
    
    isFilterActive = false;
}

function updateFilterButtonState(isActive) {
    const filterButton = document.querySelector('.filter .search-btn');
    if (filterButton) {
        if (isActive) {
            filterButton.textContent = 'ШҮҮЛТ ШИНЭЧЛЭХ';
            filterButton.style.backgroundColor = '#FF6B35';
            filterButton.style.color = 'white';
        } else {
            filterButton.textContent = 'ШҮҮХ';
            filterButton.style.backgroundColor = '';
            filterButton.style.color = '';
        }
    }
}

function getSidebarFilterValues() {
    const filters = {
        foodCategories: [],
        priceRange: 100000,
        minRating: 0,
        restrictions: [],
        portions: [],
        maxDistance: 5,
        searchTerm: '',
        selectedCategory: 'all'
    };
    
    document.querySelectorAll('input[name="foodCategory"]:checked').forEach(cb => {
        filters.foodCategories.push(cb.value);
    });
    
    const priceSlider = document.getElementById('slider');
    if (priceSlider) {
        filters.priceRange = parseInt(priceSlider.value);
    }
    
    let maxRating = 0;
    document.querySelectorAll('.star[data-value]').forEach((star, index) => {
        const img = star.querySelector('img');
        if (img && img.src.includes('star.svg') && !img.src.includes('greystar')) {
            maxRating = Math.max(maxRating, index + 1);
        }
    });
    filters.minRating = maxRating;
    
    document.querySelectorAll('input[name="foodLimit"]:checked').forEach(cb => {
        filters.restrictions.push(cb.value);
    });
    
    document.querySelectorAll('input[name="portion"]:checked').forEach(cb => {
        filters.portions.push(cb.value);
    });
    
    const distanceSlider = document.getElementById('distance');
    if (distanceSlider) {
        filters.maxDistance = parseFloat(distanceSlider.value);
    }
    
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        filters.searchTerm = searchInput.value.trim().toLowerCase();
    }
    
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        filters.selectedCategory = categorySelect.value;
    }
    
    console.log('Filter values collected:', filters);
    return filters;
}

function filterAllRestaurants(filters) {
    console.log('Filtering restaurants with:', filters);
    
    const hasActiveFilters = 
        filters.foodCategories.length > 0 ||
        filters.priceRange < 100000 ||
        filters.minRating > 0 ||
        filters.restrictions.length > 0 ||
        filters.portions.length > 0 ||
        filters.maxDistance < 5 ||
        filters.searchTerm ||
        filters.selectedCategory !== 'all';
    
    if (!hasActiveFilters) {
        console.log('No active filters, returning all restaurants');
        return restaurants;
    }
    
    return restaurants.filter(restaurant => {
        console.log(`Checking restaurant: ${restaurant.rest_name}`);
        let passesAllFilters = true;
        
        if (filters.foodCategories.length > 0) {
            const categoryMapping = {
                'fastfood': ['fastfood', 'american', 'mexican'],
                'mongolian': ['mongolian'],
                'korean': ['korean'],
                'italian': ['italian'],
                'chinese': ['chinese'],
                'japanese': ['japanese'],
                'snack': ['cafe', 'mediterranean'],
                'drinks': ['cafe'],
                'bakery': ['cafe']
            };
            
            let categoryMatch = false;
            filters.foodCategories.forEach(cat => {
                if (categoryMapping[cat] && categoryMapping[cat].includes(restaurant.category)) {
                    categoryMatch = true;
                }
                if (cat === restaurant.category) {
                    categoryMatch = true;
                }
            });
            
            console.log(`  Category check: ${restaurant.category} in ${filters.foodCategories} => ${categoryMatch}`);
            if (!categoryMatch) {
                passesAllFilters = false;
            }
        }
        
        if (passesAllFilters && filters.priceRange < 100000) {
            if (restaurant.price_range) {
                const priceMatch = restaurant.price_range <= filters.priceRange;
                console.log(`  Price check: ${restaurant.price_range} <= ${filters.priceRange} => ${priceMatch}`);
                if (!priceMatch) {
                    passesAllFilters = false;
                }
            } else {
                console.log(`  No price_range for ${restaurant.rest_name}, skipping price filter`);
            }
        }
        
        if (passesAllFilters && filters.minRating > 0) {
            const ratingMatch = restaurant.rank >= filters.minRating;
            console.log(`  Rating check: ${restaurant.rank} >= ${filters.minRating} => ${ratingMatch}`);
            if (!ratingMatch) {
                passesAllFilters = false;
            }
        }
        
        if (passesAllFilters && filters.maxDistance < 5) {
            const distanceStr = restaurant.distance || '';
            let distanceKm = 0;
            
            if (distanceStr.includes('км')) {
                distanceKm = parseFloat(distanceStr.replace(' км', ''));
            } else if (distanceStr.includes('м')) {
                distanceKm = parseFloat(distanceStr.replace(' м', '')) / 1000;
            } else {
                distanceKm = parseFloat(distanceStr) || 0;
            }
            
            const distanceMatch = distanceKm <= filters.maxDistance;
            console.log(`  Distance check: ${distanceKm}km <= ${filters.maxDistance}km => ${distanceMatch}`);
            if (!distanceMatch) {
                passesAllFilters = false;
            }
        }
        
        if (passesAllFilters && filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            const nameMatch = restaurant.rest_name && 
                restaurant.rest_name.toLowerCase().includes(searchLower);
            const addressMatch = restaurant.address && 
                restaurant.address.toLowerCase().includes(searchLower);
            
            const searchMatch = nameMatch || addressMatch;
            console.log(`  Search check: "${searchLower}" in name/address => ${searchMatch}`);
            if (!searchMatch) {
                passesAllFilters = false;
            }
        }
        
        if (passesAllFilters && filters.selectedCategory !== 'all') {
            const categoryMap = {
                'asian': ['korean', 'japanese', 'chinese', 'vietnamese'],
                'european': ['italian', 'mediterranean'],
                'mongolian': ['mongolian']
            };
            
            if (categoryMap[filters.selectedCategory]) {
                const dropdownMatch = restaurant.category && 
                                     categoryMap[filters.selectedCategory].includes(restaurant.category);
                console.log(`  Category dropdown check: ${restaurant.category} in ${categoryMap[filters.selectedCategory]} => ${dropdownMatch}`);
                if (!dropdownMatch) {
                    passesAllFilters = false;
                }
            }
        }
        
        if (passesAllFilters && filters.restrictions.length > 0) {
            console.log(`  Restrictions selected but no data, skipping`);
        }
        
        if (passesAllFilters && filters.portions.length > 0) {
            console.log(`  Portions selected but no data, skipping`);
        }
        
        console.log(`  ${restaurant.rest_name} passes all filters: ${passesAllFilters}`);
        return passesAllFilters;
    });
}

function sortRestaurants(restaurants, sortBy) {
    const sorted = [...restaurants];
    
    switch (sortBy) {
        case 'rating':
            sorted.sort((a, b) => b.rank - a.rank);
            break;
        case 'distance':
            sorted.sort((a, b) => {
                const distA = parseDistance(a.distance);
                const distB = parseDistance(b.distance);
                return distA - distB;
            });
            break;
        case 'price':
            sorted.sort((a, b) => (a.price_range || 0) - (b.price_range || 0));
            break;
        case 'name':
            sorted.sort((a, b) => a.rest_name.localeCompare(b.rest_name));
            break;
    }
    
    return sorted;
}

function parseDistance(distanceStr) {
    if (!distanceStr) return 999;
    
    if (distanceStr.includes('км')) {
        return parseFloat(distanceStr.replace(' км', ''));
    } else if (distanceStr.includes('м')) {
        return parseFloat(distanceStr.replace(' м', '')) / 1000;
    }
    return parseFloat(distanceStr) || 0;
}

function createFilterResultsDisplay(filteredRestaurants, filters) {
    console.log('Creating filter results display...');
    
    const existingResults = document.querySelector('.sidebar-filter-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    const activeFilterCount = countActiveFilters(filters);
    
    const relevantList = document.querySelector('.relevantlist');
    const parentElement = relevantList ? relevantList.parentElement : document.querySelector('main');
    
    const resultsSection = document.createElement('div');
    resultsSection.className = 'sidebar-filter-results';
    resultsSection.innerHTML = `
        <div class="filter-results-container">
            <div class="filter-results-header">
                <div class="filter-header-left">
                    <h2>ШҮҮЛТИЙН ҮР ДҮН</h2>
                    <div class="filter-results-info">
                        <span class="filter-results-count">${filteredRestaurants.length} ресторан олдлоо</span>
                        ${activeFilterCount > 0 ? `<span class="filter-active-count">${activeFilterCount} шүүлтүүр идэвхтэй</span>` : ''}
                    </div>
                </div>
                <div class="filter-header-right">
                    <button class="filter-exit-btn" onclick="exitFilterMode()">
                        <img src="./img/arrow-left.svg" alt="back" width="16" height="16">
                        Буцах
                    </button>
                </div>
            </div>
            
            ${activeFilterCount > 0 ? `
                <div class="filter-active-bar">
                    <span class="filter-active-label">Идэвхтэй шүүлтүүр:</span>
                    <div class="filter-chips-container" id="filterChipsContainer"></div>
                </div>
            ` : ''}
            
            <div class="filter-sort-container">
                
                <button class="filter-clear-all" onclick="clearAllSidebarFilters()">
                    <img src="./img/close.svg" alt="clear" width="14" height="14">
                    Бүгдийг цэвэрлэх
                </button>
            </div>
            
            ${filteredRestaurants.length === 0 ? `
                <div class="filter-no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>Илэрц олдсонгүй</h3>
                    <p>Шүүлтүүрээ дахин тохируулж үзнэ үү</p>
                    <p class="no-results-tip">Зөвлөгөө: Шүүлтүүрийг аажмаар нэмж үзээрэй</p>
                    <button class="no-results-btn" onclick="clearAllSidebarFilters()">Бүх шүүлтүүр цэвэрлэх</button>
                </div>
            ` : `
                <div class="filter-results-grid" id="filterResultsGrid"></div>
                
                ${filteredRestaurants.length > visibleResults ? `
                    <div class="filter-load-more">
                        <button class="load-more-btn" onclick="loadMoreFilterResults()">
                            Дараагийн ${Math.min(12, filteredRestaurants.length - visibleResults)} ресторан үзэх
                            <span class="load-more-count">(${filteredRestaurants.length - visibleResults} үлдсэн)</span>
                        </button>
                    </div>
                ` : ''}
            `}
        </div>
    `;
    
    if (relevantList && relevantList.parentNode) {
        relevantList.parentNode.insertBefore(resultsSection, relevantList.nextSibling);
    } else if (parentElement) {
        parentElement.appendChild(resultsSection);
    } else {
        document.body.appendChild(resultsSection);
    }
    
    displayFilterChips(filters);
    
    if (filteredRestaurants.length > 0) {
        displayFilterRestaurantCards(filteredRestaurants.slice(0, visibleResults));
    }
    
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function displayFilterChips(filters) {
    const container = document.getElementById('filterChipsContainer');
    if (!container) return;
    
    const chips = [];
    
    filters.foodCategories.forEach(cat => {
        const displayNames = {
            'fastfood': 'Түргэн хоол',
            'mongolian': 'Монгол',
            'korean': 'Солонгос',
            'italian': 'Итали',
            'chinese': 'Хятад',
            'japanese': 'Япон',
            'snack': 'Снэк',
            'drinks': 'Уух зүйлс',
            'bakery': 'Бэйкери'
        };
        chips.push(`
            <span class="filter-chip">
                ${displayNames[cat] || cat}
                <button class="chip-remove" onclick="removeFilterChip('foodCategory', '${cat}')">×</button>
            </span>
        `);
    });
    
    if (filters.priceRange < 100000) {
        chips.push(`
            <span class="filter-chip">
                Хүртэл: ${(filters.priceRange/1000).toFixed(0)}к ₮
                <button class="chip-remove" onclick="removeFilterChip('priceRange', '')">×</button>
            </span>
        `);
    }
    
    if (filters.minRating > 0) {
        chips.push(`
            <span class="filter-chip">
                ${filters.minRating}+ ★
                <button class="chip-remove" onclick="removeFilterChip('minRating', '')">×</button>
            </span>
        `);
    }
    
    if (filters.maxDistance < 5) {
        chips.push(`
            <span class="filter-chip">
                ${filters.maxDistance}км дотор
                <button class="chip-remove" onclick="removeFilterChip('maxDistance', '')">×</button>
            </span>
        `);
    }
    
    if (filters.searchTerm) {
        chips.push(`
            <span class="filter-chip">
                "${filters.searchTerm}"
                <button class="chip-remove" onclick="removeFilterChip('searchTerm', '')">×</button>
            </span>
        `);
    }
    
    if (filters.selectedCategory !== 'all') {
        const categoryNames = {
            'asian': 'Ази',
            'european': 'Европ',
            'mongolian': 'Монгол'
        };
        chips.push(`
            <span class="filter-chip">
                ${categoryNames[filters.selectedCategory] || filters.selectedCategory}
                <button class="chip-remove" onclick="removeFilterChip('selectedCategory', '')">×</button>
            </span>
        `);
    }
    
    container.innerHTML = chips.join('');
}

function displayFilterRestaurantCards(restaurants) {
    const grid = document.getElementById('filterResultsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    restaurants.forEach((restaurant, index) => {
        const card = createFilterRestaurantCard(restaurant, index + 1);
        grid.insertAdjacentHTML('beforeend', card);
    });
    
    makeFilterCardsClickable();
}

function createFilterRestaurantCard(restaurant, rank) {
    const reviews = restaurant.amount_of_people_ranked >= 1000 ? 
        (restaurant.amount_of_people_ranked / 1000).toFixed(1) + 'k' : 
        restaurant.amount_of_people_ranked.toString();
    
    const priceRange = restaurant.price_range ? 
        (restaurant.price_range / 1000).toFixed(0) + 'k ₮' : 
        '₮10-40k';
    
    const categoryNames = {
        'korean': 'Солонгос',
        'japanese': 'Япон',
        'chinese': 'Хятад',
        'italian': 'Итали',
        'mongolian': 'Монгол',
        'fastfood': 'Түргэн хоол',
        'american': 'Америк',
        'mexican': 'Мексик',
        'vietnamese': 'Вьетнам',
        'cafe': 'Кафе',
        'mediterranean': 'Газар дундын тэнгисийн',
        'drinks': 'Уух зүйлс'
    };
    
    const fullStars = Math.floor(restaurant.rank);
    const hasHalfStar = restaurant.rank % 1 >= 0.5;
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<span class="filter-star-full">★</span>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<span class="filter-star-half">½</span>';
        } else {
            starsHTML += '<span class="filter-star-empty">☆</span>';
        }
    }
    
    const badges = [];
    if (restaurant.isNew) badges.push('<span class="filter-badge new">ШИНЭ</span>');
    if (restaurant.hasPromotion) badges.push('<span class="filter-badge promo">УРАМШУУЛАЛТАЙ</span>');
    if (restaurant.isFeatured) badges.push('<span class="filter-badge featured">ОНЦЛОХ</span>');
    
    const restaurantIds = {
        'Yuna Korean BBQ': 1, 'The Bull Hotpot': 2, 'Burger & Fries': 3,
        'Tokyo House Sushi': 4, 'Nomads Mongolian Cuisine': 5, 'Seoul Garden': 6,
        'Mexican Taco Bar': 7, 'Viet Pho 88': 8, 'Tokyo Ramen Hub': 9,
        'Italiano Pasta & Pizza': 10, 'Urban Coffee Roasters': 11, 'Hotpot Palace': 12,
        'BBQ SmokeHouse': 13, 'Mediterranean Olive': 14, 'Korean Street Food House': 15
    };
    
    const restaurantId = restaurantIds[restaurant.rest_name] || rank;
    return `
        <div class="filter-restaurant-card" data-id="${restaurantId}">
            <div class="filter-card-rank">#${rank}</div>
            <div class="filter-card-image">
                <img src="./img/rest${restaurantId}.jpg" alt="${restaurant.rest_name}" 
                     onerror="this.src='./img/rest-placeholder.jpg'">
                ${badges.length > 0 ? `<div class="filter-card-badges">${badges.join('')}</div>` : ''}
            </div>
            <div class="filter-card-content">
                <div class="filter-card-header">
                    <h3 class="filter-card-title">${restaurant.rest_name}</h3>
                    <span class="filter-card-category">${categoryNames[restaurant.category] || restaurant.category}</span>
                </div>
                
                <div class="filter-card-rating">
                    <div class="filter-stars">${starsHTML}</div>
                    <span class="filter-rating-value">${restaurant.rank}</span>
                    <span class="filter-review-count">(${reviews})</span>
                </div>
                
                <div class="filter-card-details">
                    <div class="filter-detail">
                        <img src="./img/location.png" alt="location" width="14" height="14">
                        <span>${restaurant.distance}</span>
                    </div>
                    <div class="filter-detail">
                        <img src="./img/tsag.png" alt="time" width="14" height="14">
                        <span>${restaurant.estimated_time || '25-35 мин'}</span>
                    </div>
                    <div class="filter-detail">
                        <img src="./img/mungu.png" alt="price" width="14" height="14">
                        <span>${priceRange}</span>
                    </div>
                </div>
                
                <div class="filter-card-footer">
                    <div class="filter-card-address">${restaurant.address.split(',')[0]}</div>
                    <button class="filter-view-btn" onclick="viewRestaurant(${restaurantId})">Харах</button>
                </div>
            </div>
        </div>
    `;
}

function makeFilterCardsClickable() {
    document.querySelectorAll('.filter-restaurant-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            if (e.target.closest('.filter-view-btn')) return;
            const restaurantId = this.getAttribute('data-id');
            window.location.href = `restaurant-profile.html?id=${restaurantId}`;
        });

    });
}
function countActiveFilters(filters) {
    let count = 0;
    if (filters.foodCategories.length > 0) count++;
    if (filters.priceRange < 100000) count++;
    if (filters.minRating > 0) count++;
    if (filters.maxDistance < 5) count++;
    if (filters.searchTerm) count++;
    if (filters.selectedCategory !== 'all') count++;
    return count;

}
function updateFilterResults() {
    console.log('Updating filter results...');
    
    const filters = getSidebarFilterValues();
    
    let filteredRestaurants = filterAllRestaurants(filters);
    console.log(`After filtering: ${filteredRestaurants.length} restaurants found`);
    
    filteredRestaurants = sortRestaurants(filteredRestaurants, currentSortBy);
    
    const resultsSection = document.querySelector('.sidebar-filter-results');
    if (!resultsSection) return;
    
    const resultsCount = resultsSection.querySelector('.filter-results-count');
    if (resultsCount) {
        resultsCount.textContent = `${filteredRestaurants.length} ресторан олдлоо`;
    }
    
    const activeCount = resultsSection.querySelector('.filter-active-count');
    const activeFilterCount = countActiveFilters(filters);
    if (activeCount) {
        if (activeFilterCount > 0) {
            activeCount.textContent = `${activeFilterCount} шүүлтүүр идэвхтэй`;
            activeCount.style.display = 'inline';
        } else {
            activeCount.style.display = 'none';
        }
    }
    
    displayFilterChips(filters);
    
    if (filteredRestaurants.length > 0) {
        const resultsGrid = resultsSection.querySelector('.filter-results-grid');
        if (resultsGrid) {
            resultsGrid.style.display = 'grid';
        }
        const noResults = resultsSection.querySelector('.filter-no-results');
        if (noResults) {
            noResults.style.display = 'none';
        }
        displayFilterRestaurantCards(filteredRestaurants.slice(0, visibleResults));
    } else {
        const resultsGrid = resultsSection.querySelector('.filter-results-grid');
        if (resultsGrid) {
            resultsGrid.style.display = 'none';
        }
        const noResults = resultsSection.querySelector('.filter-no-results');
        if (noResults) {
            noResults.style.display = 'block';
        }
    }
    
    const loadMoreSection = resultsSection.querySelector('.filter-load-more');
    if (loadMoreSection) {
        if (filteredRestaurants.length > visibleResults) {
            loadMoreSection.innerHTML = `
                <button class="load-more-btn" onclick="loadMoreFilterResults()">
                    Дараагийн ${Math.min(12, filteredRestaurants.length - visibleResults)} ресторан үзэх
                    <span class="load-more-count">(${filteredRestaurants.length - visibleResults} үлдсэн)</span>
                </button>
            `;
            loadMoreSection.style.display = 'block';
        } else {
            loadMoreSection.style.display = 'none';
        }
    }
}

function exitFilterMode() {
    console.log('Exiting filter mode...');
    isFilterActive = false;
    visibleResults = 12;
    
    showAllSections();
}

function clearAllSidebarFilters() {
    console.log('Clearing all sidebar filters...');
    
    document.querySelectorAll('input[name="foodCategory"]:checked').forEach(cb => {
        cb.checked = false;
    });
    
    const priceSlider = document.getElementById('slider');
    if (priceSlider) {
        priceSlider.value = 100000;
        updatePriceDisplay(100000);
    }
    
    updateStarDisplay(0);
    
    document.querySelectorAll('input[name="foodLimit"]:checked').forEach(cb => {
        cb.checked = false;
    });
    
    document.querySelectorAll('input[name="portion"]:checked').forEach(cb => {
        cb.checked = false;
    });
    
    const distanceSlider = document.getElementById('distance');
    if (distanceSlider) {
        distanceSlider.value = 5;
        updateDistanceDisplay(5);
    }
    
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.value = '';
    }
    
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        categorySelect.value = 'all';
    }
    updateFilterResults();
    showNotification('Бүх шүүлтүүр цэвэрлэгдлээ');
}
function updateFilterSorting(sortBy) {
    console.log(`Updating sort to: ${sortBy}`);
    currentSortBy = sortBy;
    updateFilterResults();
}

function loadMoreFilterResults() {
    visibleResults += 12;
    updateFilterResults();
}

function removeFilterChip(filterType, value) {
    console.log(`Removing filter: ${filterType} = ${value}`);

    switch (filterType) {
        case 'foodCategory':
            const checkbox = document.querySelector(`input[name="foodCategory"][value="${value}"]`);
            if (checkbox) checkbox.checked = false;
            break;
        case 'priceRange':
            const priceSlider = document.getElementById('slider');
            if (priceSlider) {
                priceSlider.value = 100000;
                updatePriceDisplay(100000);
            }
            break;
        case 'minRating':
            updateStarDisplay(0);
            break;
        case 'maxDistance':
            const distanceSlider = document.getElementById('distance');
            if (distanceSlider) {
                distanceSlider.value = 5;
                updateDistanceDisplay(5);
            }
            break;
        case 'searchTerm':
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.value = '';
            }
            break;
        case 'selectedCategory':
            const categorySelect = document.getElementById('category');
            if (categorySelect) {
                categorySelect.value = 'all';
            }
            break;
    }
    updateFilterResults();
}
function viewRestaurant(restaurantId) {
    window.location.href = `restaurant-profile.html?id=${restaurantId}`;
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'filter-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
window.exitFilterMode = exitFilterMode;
window.clearAllSidebarFilters = clearAllSidebarFilters;
window.updateFilterSorting = updateFilterSorting;
window.loadMoreFilterResults = loadMoreFilterResults;
window.removeFilterChip = removeFilterChip;
window.viewRestaurant = viewRestaurant;
console.log('Sidebar Filter System loaded');
