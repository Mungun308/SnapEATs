console.log('SnapEATs App Initialized');

const supabaseUrl = "https://dbyzmxukmmiufnbtgwqq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieXpteHVrbW1pdWZuYnRnd3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4OTI4MDEsImV4cCI6MjA1MTQ2ODgwMX0.example";

let supabaseClient = null;
try {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
    }
} catch (e) {
    console.log('Supabase not available, using localStorage only');
}


let currentUser = null;
let userLocation = null;
let cart = [];
let currentRestaurant = null;
let currentCategory = 'highranked';


const restaurants = [
    { id: 1, rest_name: "Yuna Korean BBQ", distance: "1.2 км", schedule: "Өнөөдөр: 10:00–22:00", address: "БГД, 3-р хороо, Энхтайваны өргөн чөлөө 45", rank: 4.8, amount_of_people_ranked: 235, isNew: false, hasPromotion: true, isFeatured: true, category: "korean", phone: "7711-0022", cover: "./img/restaurant-cover1.jpg", logo: "./img/il-fiore.png" },
    { id: 2, rest_name: "The Bull Hotpot", distance: "850 м", schedule: "Өнөөдөр: 11:00–23:30", address: "СБД, 1-р хороо, Тэди төвийн зүүн талд", rank: 4.6, amount_of_people_ranked: 410, isNew: true, hasPromotion: false, isFeatured: false, category: "chinese", phone: "7711-0033", cover: "./img/restaurant-cover2.jpg", logo: "./img/restaurant.jpg" },
    { id: 3, rest_name: "Burger & Fries", distance: "2.3 км", schedule: "Өнөөдөр: 09:00–21:00", address: "ЧД, 5-р хороо, Барилгачдын гудамж 12", rank: 4.4, amount_of_people_ranked: 189, isNew: true, hasPromotion: true, isFeatured: false, category: "fastfood", phone: "7711-0044", cover: "./img/restaurant-cover1.jpg", logo: "./img/il-fiore.png" },
    { id: 4, rest_name: "Tokyo House Sushi", distance: "1.7 км", schedule: "Өнөөдөр: 10:30–22:00", address: "БЗД, 15-р хороо, Нархан хотхон 102", rank: 4.9, amount_of_people_ranked: 527, isNew: false, hasPromotion: false, isFeatured: true, category: "japanese", phone: "7711-0055", cover: "./img/restaurant-cover2.jpg", logo: "./img/restaurant.jpg" },
    { id: 5, rest_name: "Nomads", distance: "3.0 км", schedule: "Өнөөдөр: 12:00–23:00", address: "СБД, 11-р хороо, Чингисийн өргөн чөлөө 17", rank: 4.7, amount_of_people_ranked: 314, isNew: false, hasPromotion: true, isFeatured: true, category: "mongolian", phone: "7711-0066", cover: "./img/restaurant-cover1.jpg", logo: "./img/il-fiore.png" },
    { id: 6, rest_name: "Seoul Garden", distance: "1.1 км", schedule: "Өнөөдөр: 10:00–22:00", address: "СБД, 7-р хороо, Сөүлийн гудамж 14", rank: 4.5, amount_of_people_ranked: 268, isNew: true, hasPromotion: false, isFeatured: false, category: "korean", phone: "7711-0077", cover: "./img/restaurant-cover2.jpg", logo: "./img/restaurant.jpg" },
    { id: 7, rest_name: "Mexican Taco Bar", distance: "2.8 км", schedule: "Өнөөдөр: 11:00–23:00", address: "БЗД, 13-р хороо, Жуковын гудамж 22", rank: 4.3, amount_of_people_ranked: 142, isNew: false, hasPromotion: true, isFeatured: false, category: "fastfood", phone: "7711-0088", cover: "./img/restaurant-cover1.jpg", logo: "./img/il-fiore.png" },
    { id: 8, rest_name: "Viet Pho 88", distance: "900 м", schedule: "Өнөөдөр: 09:00–21:30", address: "ЧД, 4-р хороо, Жуулчны гудамж 38", rank: 4.7, amount_of_people_ranked: 381, isNew: true, hasPromotion: false, isFeatured: true, category: "chinese", phone: "7711-0099", cover: "./img/restaurant-cover2.jpg", logo: "./img/restaurant.jpg" },
    { id: 9, rest_name: "Tokyo Ramen Hub", distance: "1.9 км", schedule: "Өнөөдөр: 11:00–22:00", address: "СБД, 1-р хороо, Төв номын сангийн хойд талд", rank: 4.6, amount_of_people_ranked: 244, isNew: false, hasPromotion: true, isFeatured: false, category: "japanese", phone: "7711-0100", cover: "./img/restaurant-cover1.jpg", logo: "./img/il-fiore.png" },
    { id: 10, rest_name: "Italiano Pasta & Pizza", distance: "3.4 км", schedule: "Өнөөдөр: 10:00–23:00", address: "ХУД, 11-р хороо, Зайсангийн гудамж 18", rank: 4.8, amount_of_people_ranked: 512, isNew: true, hasPromotion: false, isFeatured: true, category: "italian", phone: "7711-0111", cover: "./img/restaurant-cover2.jpg", logo: "./img/restaurant.jpg" },
    { id: 11, rest_name: "Urban Coffee Roasters", distance: "650 м", schedule: "Өнөөдөр: 08:00–20:00", address: "СБД, 6-р хороо, Сэнтрал Тауэр 1 давхар", rank: 4.4, amount_of_people_ranked: 198, isNew: false, hasPromotion: true, isFeatured: false, category: "drinks", phone: "7711-0122", cover: "./img/restaurant-cover1.jpg", logo: "./img/il-fiore.png" },
    { id: 12, rest_name: "Hotpot Palace", distance: "2.1 км", schedule: "Өнөөдөр: 12:00–23:30", address: "БГД, 10-р хороо, 3-р хороолол, 23-р байр", rank: 4.7, amount_of_people_ranked: 337, isNew: true, hasPromotion: false, isFeatured: false, category: "chinese", phone: "7711-0133", cover: "./img/restaurant-cover2.jpg", logo: "./img/restaurant.jpg" },
    { id: 13, rest_name: "BBQ SmokeHouse", distance: "4.0 км", schedule: "Өнөөдөр: 11:30–22:00", address: "ХУД, 15-р хороо, Ривер Гарден 302", rank: 4.5, amount_of_people_ranked: 156, isNew: false, hasPromotion: true, isFeatured: true, category: "fastfood", phone: "7711-0144", cover: "./img/restaurant-cover1.jpg", logo: "./img/il-fiore.png" },
    { id: 14, rest_name: "Mediterranean Olive", distance: "2.6 км", schedule: "Өнөөдөр: 10:00–22:00", address: "СБД, 8-р хороо, Олимп плаза 3 давхар", rank: 4.6, amount_of_people_ranked: 221, isNew: true, hasPromotion: false, isFeatured: false, category: "italian", phone: "7711-0155", cover: "./img/restaurant-cover2.jpg", logo: "./img/restaurant.jpg" },
    { id: 15, rest_name: "Korean Street Food House", distance: "1.3 км", schedule: "Өнөөдөр: 09:00–21:00", address: "БЗД, 4-р хороо, Их тойруу 55", rank: 4.2, amount_of_people_ranked: 119, isNew: false, hasPromotion: true, isFeatured: false, category: "korean", phone: "7711-0166", cover: "./img/restaurant-cover1.jpg", logo: "./img/il-fiore.png" }
];

// Sample menu for restaurants
const menuItems = {
    default: [
        { id: 1, name: "Signature Dish 1", description: "Тусгай хоол, шинэхэн орцтой", price: 24900, image: "./img/menu/pizza1.jpg", category: "Үндсэн" },
        { id: 2, name: "Signature Dish 2", description: "Амттан хоол, тусгай соустай", price: 18900, image: "./img/menu/naan.jpg", category: "Үндсэн" },
        { id: 3, name: "Appetizer", description: "Амт орохын өмнөх хоол", price: 12500, image: "./img/menu/salad.jpg", category: "Зууш" },
        { id: 4, name: "Drink", description: "Сэргээх ундаа", price: 4500, image: "./img/menu/spaghetti.jpg", category: "Ундаа" }
    ]
};

const categoryTitles = {
    highranked: "ӨНДӨР ҮНЭЛГЭЭТЭЙ",
    new: "ШИНЭ",
    gift: "УРАМШУУЛАЛТАЙ",
    featured: "ОНЦЛОХ"
};

//init
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    }
    
    // Load cart
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    
    // Initialize filters
    initializeFilters();
    initializeCategoryButtons();
    initializeTabButtons();
    
    // Set default booking date
    const bookingDate = document.getElementById('bookingDate');
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.value = today;
        bookingDate.min = today;
    }
    
    // Set default booking time
    const bookingTime = document.getElementById('bookingTime');
    if (bookingTime) {
        bookingTime.value = '19:00';
    }
});

//auth
function showLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('errorMsg').textContent = '';
}

function showSignup() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
    document.getElementById('errorMsg').textContent = '';
}

async function login() {
    const username = document.getElementById('loginInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    
    if (!username || !password) {
        document.getElementById('errorMsg').textContent = 'Бүх талбарыг бөглөнө үү!';
        return;
    }
    
    try {
        currentUser = {
            id: 'user_' + Date.now(),
            username: username,
            email: username.includes('@') ? username : username + '@snapeats.mn',
            name: username,
            loggedIn: true,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Save to Supabase 
        const {data,error}=await window.supabase
            .from('users')
            .insert([
                {
                    id:useImperativeHandle,
                    username:username,
                    email:email,
                    name:name,
                    created_at:new Date()
                }
            ]);

            if(error){
                console.error('Supabase insert error', error);
                document.getElementById('errorMsg').textContent='Signup error'
                error.message;
                localStorage.removeItem('currentUser');
                return;
            }
        
        showMainApp();
        showNotification('Амжилттай нэвтэрлээ!');
        
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('errorMsg').textContent = 'Нэвтрэхэд алдаа гарлаа';
    }
}

async function signup() {
    const name = document.getElementById('signupName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const password2 = document.getElementById('signupPassword2').value;
    
    if (!name || !username || !email || !password || !password2) {
        document.getElementById('errorMsg').textContent = 'Бүх талбарыг бөглөнө үү!';
        return;
    }
    
    if (password !== password2) {
        document.getElementById('errorMsg').textContent = 'Нууц үг таарахгүй байна!';
        return;
    }
    
    if (password.length < 6) {
        document.getElementById('errorMsg').textContent = 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой!';
        return;
    }
    
    try {
        currentUser = {
            id: 'user_' + Date.now() + Math.random().toString(36).substr(2, 9),
            username: username,
            email: email,
            name: name,
            loggedIn: true,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showMainApp();
        showNotification('Амжилттай бүртгүүллээ!');
        
    } catch (error) {
        console.error('Signup error:', error);
        document.getElementById('errorMsg').textContent = 'Бүртгүүлэхэд алдаа гарлаа';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    hideUserMenu();
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginRequiredModal').style.display = 'flex';
    showLogin();
}

function showMainApp() {
    document.getElementById('loginRequiredModal').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    
    if (currentUser) {
        document.getElementById('userDisplayName').textContent = currentUser.name || currentUser.username;
    }
    
    //herelgchiin location-g avch map init hiine
    getUserLocation();
    
    displayRestaurantsByCategory(currentCategory);
}

//location
function getUserLocation() {
    const mapDisplay = document.getElementById('mapDisplay');
    
    if (navigator.geolocation) {
        mapDisplay.innerHTML = '<p style="text-align: center; padding: 20px;">📍 Байршил тодорхойлж байна...</p>';
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                console.log('User location:', userLocation);
                
                // Display map with user location
                mapDisplay.innerHTML = `
                    <iframe 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.lng - 0.002}%2C${userLocation.lat - 0.002}%2C${userLocation.lng + 0.002}%2C${userLocation.lat + 0.002}&layer=mapnik&marker=${userLocation.lat}%2C${userLocation.lng}"
                        style="width: 100%; height: 100%; border: 0; border-radius: 10px;"
                        allowfullscreen>
                    </iframe>
                    <p style="position: absolute; bottom: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 5px; font-size: 12px;">
                        📍 Таны байршил
                    </p>
                `;
                
                showNotification('Байршил амжилттай тодорхойлогдлоо!');
            },
            function(error) {
                console.error('Geolocation error:', error);
                // Default to Ulaanbaatar
                userLocation = { lat: 47.9184, lng: 106.9177 };
                mapDisplay.innerHTML = `
                    <iframe 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=106.8977%2C47.8984%2C106.9377%2C47.9384&layer=mapnik&marker=47.9184%2C106.9177"
                        style="width: 100%; height: 100%; border: 0; border-radius: 10px;"
                        allowfullscreen>
                    </iframe>
                    <p style="position: absolute; bottom: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 5px; font-size: 12px;">
                        📍 Улаанбаатар 
                    </p>
                `;
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    } else {
        userLocation = { lat: 47.9184, lng: 106.9177 };
        mapDisplay.innerHTML = `
            <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.8977%2C47.8984%2C106.9377%2C47.9384&layer=mapnik"
                style="width: 100%; height: 100%; border: 0; border-radius: 10px;"
                allowfullscreen>
            </iframe>
        `;
    }
}

//filter
function initializeFilters() {
    // Food category checkboxes
    document.querySelectorAll('input[name="foodCategory"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            applyAllFilters();
        });
    });
    
    // Price slider
    const priceSlider = document.getElementById('slider');
    if (priceSlider) {
        priceSlider.addEventListener('input', function() {
            updatePriceDisplay(this.value);
            applyAllFilters();
        });
    }
    
    // Star ratings
    document.querySelectorAll('.star[data-value]').forEach(function(star) {
        star.addEventListener('click', function() {
            const ratingValue = parseInt(this.getAttribute('data-value'));
            updateStarDisplay(ratingValue);
            document.getElementById('ratingValue').value = ratingValue;
            applyAllFilters();
        });
    });
    
    // Distance slider
    const distanceSlider = document.getElementById('distance');
    if (distanceSlider) {
        distanceSlider.addEventListener('input', function() {
            document.getElementById('rangeText').textContent = this.value + 'km';
            applyAllFilters();
        });
    }
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyAllFilters();
        });
    }
    
    // Category select
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            applyAllFilters();
        });
    }
}

function updatePriceDisplay(value) {
    const priceValue = parseInt(value);
    const displayElements = document.querySelectorAll('.range-value');
    if (displayElements[0]) {
        if (priceValue >= 1000) {
            displayElements[0].textContent = (priceValue / 1000).toFixed(0) + 'k ₮';
        } else {
            displayElements[0].textContent = priceValue + ' ₮';
        }
    }
}

function updateStarDisplay(ratingValue) {
    document.querySelectorAll('.star[data-value]').forEach(function(star) {
        const starValue = parseInt(star.getAttribute('data-value'));
        const img = star.querySelector('img');
        if (img) {
            if (starValue <= ratingValue) {
                img.src = './img/star.svg';
            } else {
                img.src = './img/greystar.svg';
            }
        }
    });
}

function initializeCategoryButtons() {
    const categoryButtons = document.querySelectorAll('se-btn-filter');
    
    categoryButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-cat');
            
            categoryButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            currentCategory = category;
            displayRestaurantsByCategory(category);
            
            const titleElement = document.getElementById('categoryTitle');
            if (titleElement) {
                titleElement.textContent = categoryTitles[category] || "РЕСТОРАНУУД";
            }
            
            // Hide filtered results if showing
            hideFilteredResults();
        });
    });
}

function applyAllFilters() {
    const filters = getCurrentFilters();
    
    // Check if any filters are active
    const hasActiveFilters = filters.foodCategories.length > 0 || 
                            filters.minRating > 0 || 
                            filters.maxPrice < 100000 ||
                            filters.maxDistance < 5 ||
                            filters.searchTerm.length > 0 ||
                            filters.selectedCategory !== 'all';
    
    if (hasActiveFilters) {
        let filtered = [...restaurants];
        filtered = applyAdditionalFilters(filtered, filters);
        showFilteredResults(filtered);
    } else {
        hideFilteredResults();
        displayRestaurantsByCategory(currentCategory);
    }
}

function getCurrentFilters() {
    const selectedFoodCategories = Array.from(document.querySelectorAll('input[name="foodCategory"]:checked'))
        .map(function(cb) { return cb.value; });
    
    const priceSlider = document.getElementById('slider');
    const maxPrice = priceSlider ? parseInt(priceSlider.value) : 100000;
    
    const minRating = parseInt(document.getElementById('ratingValue').value) || 0;
    
    const distanceSlider = document.getElementById('distance');
    const maxDistance = distanceSlider ? parseFloat(distanceSlider.value) : 5;
    
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    const categorySelect = document.getElementById('category');
    const selectedCategory = categorySelect ? categorySelect.value : 'all';
    
    return {
        foodCategories: selectedFoodCategories,
        maxPrice: maxPrice,
        minRating: minRating,
        maxDistance: maxDistance,
        searchTerm: searchTerm,
        selectedCategory: selectedCategory
    };
}

function applyAdditionalFilters(restaurantsList, filters) {
    return restaurantsList.filter(function(restaurant) {
        // Search filter
        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            const nameLower = restaurant.rest_name.toLowerCase();
            const addressLower = restaurant.address.toLowerCase();
            
            if (!nameLower.includes(searchLower) && !addressLower.includes(searchLower)) {
                return false;
            }
        }
        
        // Food category filter
        if (filters.foodCategories.length > 0) {
            if (!filters.foodCategories.includes(restaurant.category)) {
                return false;
            }
        }
        
        // Rating filter
        if (filters.minRating > 0 && restaurant.rank < filters.minRating) {
            return false;
        }
        
        // Distance filter
        const distanceText = restaurant.distance;
        let distanceNum = parseFloat(distanceText.replace(' км', '').replace(' м', ''));
        if (distanceText.includes('м') && !distanceText.includes('км')) {
            distanceNum = distanceNum / 1000;
        }
        if (distanceNum > filters.maxDistance) {
            return false;
        }
        
        // Category select filter
        if (filters.selectedCategory !== 'all') {
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

//category
function filterRestaurantsByCategory(category) {
    let filtered;
    switch (category) {
        case "highranked":
            filtered = [...restaurants].sort(function(a, b) { return b.rank - a.rank; });
            break;
        case "new":
            filtered = restaurants.filter(function(r) { return r.isNew; });
            break;
        case "gift":
            filtered = restaurants.filter(function(r) { return r.hasPromotion; });
            break;
        case "featured":
            filtered = restaurants.filter(function(r) { return r.isFeatured; });
            break;
        default:
            filtered = restaurants;
    }
    return filtered;
}

function displayRestaurantsByCategory(category) {
    const filtered = filterRestaurantsByCategory(category);
    displayRestaurantsInList(filtered.slice(0, 10));
}

function displayRestaurantsInList(restaurantsToShow) {
    const listContainer = document.getElementById('restaurantList');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    //left arrow
    listContainer.innerHTML += '<button class="arrowbtn" type="button" onclick="scrollRestaurants(-1)"><img src="./img/leftArrow.svg" alt="left"></button>';
    
    //Add restaurant cards
    restaurantsToShow.forEach(function(restaurant, index) {
        const cardHTML = createRestaurantCard(restaurant, index);
        listContainer.innerHTML += cardHTML;
    });
    
    //right arrow
    listContainer.innerHTML += '<button class="arrowbtn" type="button" onclick="scrollRestaurants(1)"><img src="./img/rightArrow.svg" alt="right"></button>';
    
    makeCardsClickable();
}

function createRestaurantCard(restaurant, index) {
    const reviews = formatReviews(restaurant.amount_of_people_ranked);
    
    return `
        <article class="rest-profile" data-id="${restaurant.id}" data-category="${restaurant.category}">
            <div class="profile-wrapper">
                <img class="profile" src="${restaurant.logo}" alt="${restaurant.rest_name}">
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
    document.querySelectorAll('.rest-profile').forEach(function(card) {
        card.style.cursor = 'pointer';
        card.onclick = function() {
            const restaurantId = parseInt(this.getAttribute('data-id'));
            showRestaurantDetail(restaurantId);
        };
    });
}

function scrollRestaurants(direction) {
    const list = document.getElementById('restaurantList');
    if (list) {
        list.scrollLeft += direction * 300;
    }
}

// ===========================================
// FILTERED RESULTS FUNCTIONS
// ===========================================
function showFilteredResults(filteredRestaurants) {
    const homeContent = document.querySelector('.main-content');
    const filteredSection = document.getElementById('filteredResults');
    const resultsList = document.getElementById('filteredRestaurantList');
    const resultsTitle = document.getElementById('resultsTitle');
    
    if (homeContent) homeContent.style.display = 'none';
    if (filteredSection) filteredSection.style.display = 'block';
    
    if (resultsTitle) {
        resultsTitle.textContent = `Хайлтын үр дүн (${filteredRestaurants.length} ресторан)`;
    }
    
    if (resultsList) {
        resultsList.innerHTML = '';
        
        if (filteredRestaurants.length === 0) {
            resultsList.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Тохирох ресторан олдсонгүй</p>';
            return;
        }
        
        filteredRestaurants.forEach(function(restaurant) {
            const reviews = formatReviews(restaurant.amount_of_people_ranked);
            resultsList.innerHTML += `
                <div class="filtered-restaurant-item" onclick="showRestaurantDetail(${restaurant.id})">
                    <div class="filtered-restaurant-image">
                        <img src="${restaurant.logo}" alt="${restaurant.rest_name}">
                    </div>
                    <div class="filtered-restaurant-info">
                        <h4>${restaurant.rest_name}</h4>
                        <p class="restaurant-distance">${restaurant.distance}</p>
                        <p class="restaurant-address">${restaurant.address}</p>
                        <p class="restaurant-schedule">${restaurant.schedule}</p>
                        <div class="restaurant-rating">
                            <span class="rating-value">${restaurant.rank}</span>
                            <img src="./img/star.svg" alt="star" style="width: 14px; height: 14px;">
                            <span class="rating-count">(${reviews})</span>
                        </div>
                    </div>
                </div>
            `;
        });
    }
}

function hideFilteredResults() {
    const homeContent = document.querySelector('.main-content');
    const filteredSection = document.getElementById('filteredResults');
    
    if (homeContent) homeContent.style.display = 'block';
    if (filteredSection) filteredSection.style.display = 'none';
}

// ===========================================
// RESTAURANT DETAIL FUNCTIONS
// ===========================================
function showRestaurantDetail(restaurantId) {
    const restaurant = restaurants.find(function(r) { return r.id === restaurantId; });
    if (!restaurant) {
        showNotification('Ресторан олдсонгүй');
        return;
    }
    
    currentRestaurant = restaurant;
    
    // Hide home section
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('restaurantSection').style.display = 'block';
    
    // Update restaurant info
    document.getElementById('restaurantName').textContent = restaurant.rest_name;
    document.getElementById('restaurantCategory').textContent = getCategoryName(restaurant.category);
    document.getElementById('restaurantRating').innerHTML = '<span>' + restaurant.rank + '</span><span>★</span>';
    document.getElementById('reviewCount').textContent = formatReviews(restaurant.amount_of_people_ranked);
    document.getElementById('restaurantCover').src = restaurant.cover;
    document.getElementById('restaurantLogo').src = restaurant.logo;
    document.getElementById('restaurantAddress').textContent = restaurant.address;
    document.getElementById('restaurantPhone').textContent = restaurant.phone;
    
    // Load opening hours
    document.getElementById('openingHours').innerHTML = `
        <div class="info-item"><span>🕒</span><span>${restaurant.schedule}</span></div>
    `;
    
    // Load features
    document.getElementById('restaurantFeatures').innerHTML = `
        <div class="info-item"><span>✓</span><span>Байршилд хооллох</span></div>
        <div class="info-item"><span>✓</span><span>Ширээ захиалах</span></div>
        ${restaurant.hasPromotion ? '<div class="info-item"><span>🎁</span><span>Урамшуулалтай</span></div>' : ''}
    `;
    
    // Load menu
    loadMenu(restaurant);
    
    // Reset tab to menu
    showTab('menu');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function getCategoryName(category) {
    const names = {
        korean: 'Солонгос хоол',
        chinese: 'Хятад хоол',
        japanese: 'Япон хоол',
        italian: 'Итали хоол',
        mongolian: 'Монгол хоол',
        fastfood: 'Түргэн хоол',
        drinks: 'Ундаа',
        bakery: 'Бэйкери'
    };
    return names[category] || category;
}

function loadMenu(restaurant) {
    const menu = menuItems.default;
    const menuContainer = document.getElementById('menuItems');
    
    menuContainer.innerHTML = '';
    menu.forEach(function(item) {
        menuContainer.innerHTML += `
            <div class="menu-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="menu-item-image" onerror="this.src='./img/il-fiore.png'">
                <div class="menu-item-info">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-description">${item.description}</div>
                    <div class="menu-item-footer">
                        <div class="menu-item-price">₮${item.price.toLocaleString()}</div>
                        <button class="add-to-cart-btn" onclick="addToCart(${item.id})">+ Нэмэх</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function initializeTabButtons() {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
}

function showTab(tabId) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(function(b) {
        b.classList.remove('active');
    });
    document.querySelector('.tab-btn[data-tab="' + tabId + '"]').classList.add('active');
    
    // Show active tab content
    document.querySelectorAll('.tab-content').forEach(function(content) {
        content.classList.remove('active');
    });
    document.getElementById(tabId + 'Tab').classList.add('active');
}

function showHome() {
    document.getElementById('restaurantSection').style.display = 'none';
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'none';
    document.getElementById('homeSection').style.display = 'block';
    hideFilteredResults();
}

function goToHome() {
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    showHome();
}

// ===========================================
// CART FUNCTIONS
// ===========================================
function addToCart(itemId) {
    if (!currentRestaurant) {
        showNotification('Эхлээд ресторан сонгоно уу');
        return;
    }
    
    const menu = menuItems.default;
    const item = menu.find(function(m) { return m.id === itemId; });
    
    if (!item) return;
    
    // Check if item already in cart
    const existingItem = cart.find(function(cartItem) {
        return cartItem.itemId === itemId && cartItem.restaurantId === currentRestaurant.id;
    });
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            restaurantId: currentRestaurant.id,
            restaurantName: currentRestaurant.rest_name,
            itemId: itemId,
            itemName: item.name,
            price: item.price,
            quantity: 1,
            image: item.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(item.name + ' сагсанд нэмэгдлээ!');
}

function updateCartCount() {
    const totalItems = cart.reduce(function(sum, item) { return sum + item.quantity; }, 0);
    const cartCountEl = document.getElementById('cartCount');
    
    if (cartCountEl) {
        if (totalItems > 0) {
            cartCountEl.textContent = totalItems;
            cartCountEl.style.display = 'flex';
        } else {
            cartCountEl.style.display = 'none';
        }
    }
}

function showCart() {
    if (cart.length === 0) {
        showNotification('Таны сагс хоосон байна');
        return;
    }
    
    // Hide other sections
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('restaurantSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'none';
    document.getElementById('cartSection').style.display = 'block';
    
    renderCartItems();
}

function hideCart() {
    document.getElementById('cartSection').style.display = 'none';
    
    if (currentRestaurant) {
        document.getElementById('restaurantSection').style.display = 'block';
    } else {
        document.getElementById('homeSection').style.display = 'block';
    }
}

function renderCartItems() {
    const cartItemsEl = document.getElementById('cartItems');
    let total = 0;
    
    cartItemsEl.innerHTML = '';
    
    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItemsEl.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.itemName}</h4>
                    <p class="cart-item-restaurant">${item.restaurantName}</p>
                    <p class="cart-item-price">₮${item.price.toLocaleString()}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    ₮${itemTotal.toLocaleString()}
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
    });
    
    const deliveryFee = 2500;
    document.getElementById('cartTotal').textContent = '₮' + total.toLocaleString();
    document.getElementById('deliveryTotal').textContent = '₮' + deliveryFee.toLocaleString();
    document.getElementById('grandTotal').textContent = '₮' + (total + deliveryFee).toLocaleString();
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        if (cart.length === 0) {
            hideCart();
            showHome();
        } else {
            renderCartItems();
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    if (cart.length === 0) {
        hideCart();
        showHome();
    } else {
        renderCartItems();
    }
}

// ===========================================
// PAYMENT FUNCTIONS
// ===========================================
function proceedToPayment() {
    const bookingDate = document.getElementById('bookingDate').value;
    const bookingTime = document.getElementById('bookingTime').value;
    const guestCount = document.getElementById('guestCount').value;
    
    if (!bookingDate || !bookingTime) {
        showNotification('Огноо болон цаг сонгоно уу');
        return;
    }
    
    // Store booking info
    localStorage.setItem('bookingInfo', JSON.stringify({
        date: bookingDate,
        time: bookingTime,
        guests: guestCount
    }));
    
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'block';
    
    // Render payment summary
    renderPaymentSummary();
    
    window.scrollTo(0, 0);
}

function renderPaymentSummary() {
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
    const summaryEl = document.getElementById('paymentSummary');
    
    let total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);
    
    const deliveryFee = 2500;
    
    let itemsList = cart.map(function(item) {
        return `<li>${item.itemName} x${item.quantity} - ₮${(item.price * item.quantity).toLocaleString()}</li>`;
    }).join('');
    
    summaryEl.innerHTML = `
        <div class="summary-info">
            <h4>Захиалсан хоол:</h4>
            <ul>${itemsList}</ul>
            <p><strong>Ресторан:</strong> ${cart[0] ? cart[0].restaurantName : ''}</p>
            <p><strong>Огноо:</strong> ${bookingInfo.date}</p>
            <p><strong>Цаг:</strong> ${bookingInfo.time}</p>
            <p><strong>Хүний тоо:</strong> ${bookingInfo.guests}</p>
            <hr>
            <p><strong>Хоолны дүн:</strong> ₮${total.toLocaleString()}</p>
            <p><strong>Үйлчилгээний төлбөр:</strong> ₮${deliveryFee.toLocaleString()}</p>
            <p class="grand-total"><strong>Нийт төлөх:</strong> ₮${(total + deliveryFee).toLocaleString()}</p>
        </div>
    `;
}

function processPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value;
        
        if (!cardNumber || !cardExpiry || !cardCvv) {
            showNotification('Картын мэдээллийг бөглөнө үү');
            return;
        }
        
        if (cardNumber.replace(/\s/g, '').length < 16) {
            showNotification('Картын дугаар буруу байна');
            return;
        }
    }
    
    // Show loading
    showNotification('Төлбөр хүлээж байна...');
    
    // Simulate payment processing
    setTimeout(function() {
        showSuccess();
    }, 2000);
}

function showSuccess() {
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'block';
    
    // Generate unique check-in code
    const checkInCode = generateCheckInCode();
    document.getElementById('checkInCode').textContent = checkInCode;
    
    // Save order
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
    const order = {
        id: 'order_' + Date.now(),
        checkInCode: checkInCode,
        items: cart,
        bookingInfo: bookingInfo,
        restaurant: cart[0] ? cart[0].restaurantName : '',
        total: cart.reduce(function(sum, item) { return sum + (item.price * item.quantity); }, 0) + 2500,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    //Save local
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    //Save to Supabase
    async function createOrder() {
        const { data, error } = await supabase
          .from("orders")
          .insert([
            {
                id: 'order_' + Date.now(),
                checkInCode: checkInCode,
                items: cart,
                bookingInfo: bookingInfo,
                restaurant: cart[0] ? cart[0].restaurantName : '',
                total: total,
                status: 'confirmed',
                createdAt: new Date().toISOString()
            }
          ])
          .select();
      
        if (error) {
          console.error(error.message);
        } else {
          console.log("Order created:", data);
        }
      }
      
    
    // Display booking details
    document.getElementById('bookingDetails').innerHTML = `
        <div class="booking-info">
            <p><strong>Ресторан:</strong> ${order.restaurant}</p>
            <p><strong>Огноо:</strong> ${bookingInfo.date}</p>
            <p><strong>Цаг:</strong> ${bookingInfo.time}</p>
            <p><strong>Хүний тоо:</strong> ${bookingInfo.guests}</p>
            <p><strong>Нийт төлбөр:</strong> ₮${order.total.toLocaleString()}</p>
        </div>
    `;
    
    window.scrollTo(0, 0);
}

function displayMyOrder(){
    document.getElementById('bookingDetails').innerHTML=`
        <div class="booking-info">
            <p><strong>Ресторан:</strong> ${order.restaurant}</p>
            <p><strong>Огноо:</strong> ${bookingInfo.date}</p>
            <p><strong>Цаг:</strong> ${bookingInfo.time}</p>
            <p><strong>Хүний тоо:</strong> ${bookingInfo.guests}</p>
            <p><strong>Нийт төлбөр:</strong> ₮${order.total.toLocaleString()}</p>
            <p><strong>Checkin code:</strong> ${bookingInfo.checkInCode}</p>
            }
        </div>
    `;
    window.scrollTo(0,0);
}

function generateCheckInCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

//user menu
function showUserMenu() {
    document.getElementById('userMenuModal').style.display = 'flex';
}

function hideUserMenu() {
    document.getElementById('userMenuModal').style.display = 'none';
}

function viewOrders() {
    hideUserMenu();
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        showNotification('Захиалгын түүх хоосон байна');
        return;
    }
    
    let ordersList = orders.map(function(order) {
        return `
            <div style="background: #f4f4f8; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <p><strong>${order.restaurant}</strong></p>
                <p>Check-in код: <strong>${order.checkInCode}</strong></p>
                <p>Огноо: ${order.bookingInfo.date} ${order.bookingInfo.time}</p>
                <p>Нийт: ₮${order.total.toLocaleString()}</p>
            </div>
        `;
    }).join('');
    
    alert('Миний захиалгууд:\n\n' + orders.map(function(o) {
        return `
            <div class="show-order">

            `
    }).join('\n'));
}

function viewFavorites() {
    hideUserMenu();
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        showNotification('Дуртай жагсаалт хоосон байна');
        return;
    }
    
    alert('Дуртай ресторанууд:\n\n' + favorites.map(function(f) {
        return f.name + ' (★' + f.rating + ')';
    }).join('\n'));
}

function shareRestaurant() {
    if (currentRestaurant) {
        const shareText = currentRestaurant.rest_name + ' - SnapEATs';
        if (navigator.share) {
            navigator.share({
                title: shareText,
                text: 'Би энэ ресторанд хооллохоор төлөвлөж байна!',
                url: window.location.href
            });
        } else {
            showNotification('Холбоосыг хуулсан!');
        }
    }
}

function toggleFavorite() {
    if (!currentRestaurant) return;
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(function(fav) { return fav.id === currentRestaurant.id; });
    
    if (index === -1) {
        favorites.push({
            id: currentRestaurant.id,
            name: currentRestaurant.rest_name,
            logo: currentRestaurant.logo,
            rating: currentRestaurant.rank
        });
        showNotification('Дуртай жагсаалтад нэмэгдлээ!');
    } else {
        favorites.splice(index, 1);
        showNotification('Дуртай жагсаалтаас хасагдлаа!');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================
function showNotification(message) {
    // Remove existing notification
    const oldNotif = document.querySelector('.notification');
    if (oldNotif) oldNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Handle payment method change
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[name="paymentMethod"]').forEach(function(radio) {
        radio.addEventListener('change', function() {
            const cardDetails = document.getElementById('cardDetails');
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
});

// Card number formatting
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s/g, '').replace(/\D/g, '');
            let formatted = '';
            for (let i = 0; i < value.length && i < 16; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            this.value = formatted;
        });
    }
    
    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
});
