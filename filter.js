document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll("[data-cat]");
    const restaurantCards = document.querySelectorAll("#restaurantList article[data-category]");

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedCat = btn.getAttribute("data-cat");

            restaurantCards.forEach(card => {
                card.style.display =
                    card.getAttribute("data-category") === selectedCat
                        ? "flex"
                        : "none";
            });
        });
    });
});

let currentFilters = {
    foodCategory: 'all',
    maxPrice: 100000,
    minRating: 0
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    displayRestaurants(restaurants);
});

// Initialize filter controls
function initializeFilters() {
    // Food category filter
    document.querySelectorAll('input[name="foodCategory"]').forEach(box => {
        box.onchange = () => {
            currentFilters.foodCategory = box.value;
            console.log('Хоол:', box.value);
            filterRestaurants();
        };
    });
    
    // Price range filter
    const slider = document.querySelector('input[type="range"]');
    const priceDisplay = document.getElementById('priceDisplay');
    
    if (slider) {
        slider.oninput = () => {
            currentFilters.maxPrice = parseInt(slider.value);
            priceDisplay.textContent = `${slider.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮ хүртэл`;
            console.log('Үнэ:', slider.value);
            filterRestaurants();
        };
    }
    
    // Star rating filter
    document.querySelectorAll('.star').forEach(star => {
        star.onclick = () => {
            const selectedRating = parseInt(star.getAttribute('data-value'));
            currentFilters.minRating = selectedRating;
            console.log('Та', selectedRating);
            
            // Update star display
            document.querySelectorAll('.star').forEach((s, index) => {
                const starNumber = index + 1;
                if (starNumber <= selectedRating) {
                    s.style.color = '#f39c12';
                } else {
                    s.style.color = '#bdc3c7';
                }
            });
            
            // Update rating text
            const ratingText = document.getElementById('ratingText');
            if (selectedRating === 0) {
                ratingText.textContent = 'Бүгд';
            } else {
                ratingText.textContent = `${selectedRating} од ба түүнээс дээш`;
            }
            
            filterRestaurants();
        };
    });
}

// Filter restaurants based on current filters
function filterRestaurants() {
    let filtered = restaurants.filter(restaurant => {
        // Food category filter
        if (currentFilters.foodCategory !== 'all' && 
            restaurant.category !== currentFilters.foodCategory) {
            return false;
        }
        
        // Price filter
        if (restaurant.price_range > currentFilters.maxPrice) {
            return false;
        }
        
        // Rating filter
        if (restaurant.rank < currentFilters.minRating) {
            return false;
        }
        
        return true;
    });
    
    displayRestaurants(filtered);
}

// Display restaurants in the UI
function displayRestaurants(restaurantsToShow) {
    const restaurantList = document.getElementById('restaurantList');
    const resultsCount = document.getElementById('resultsCount');
    
    // Update results count
    resultsCount.textContent = `${restaurantsToShow.length} ресторан олдлоо`;
    
    // Clear current list
    restaurantList.innerHTML = '';
    
    // If no results, show message
    if (restaurantsToShow.length === 0) {
        restaurantList.innerHTML = '<div class="no-results">Таны хайлтад тохирох ресторан олдсонгүй</div>';
        return;
    }
    
    // Create restaurant cards
    restaurantsToShow.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        
        // Create star rating display
        let starsHtml = '';
        const fullStars = Math.floor(restaurant.rank);
        const hasHalfStar = restaurant.rank % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '★';
        }
        
        if (hasHalfStar) {
            starsHtml += '½';
        }
        
        card.innerHTML = `
            <div class="restaurant-name">${restaurant.rest_name}</div>
            <div class="restaurant-profile">${restaurant.img}</div>
            <div class="restaurant-info">
                <span>${restaurant.distance}</span>
            </div>
            <div class="restaurant-info">
                <span>${restaurant.schedule}</span>
            </div>
            <div class="restaurant-info">
                <span>${restaurant.address}</span>
            </div>
            <div class="restaurant-rank">
                <span>${starsHtml} ${restaurant.rank}</span>
                <span style="margin-left: 10px; color: #7f8c8d; font-weight: normal;">
                    (${restaurant.amount_of_people_ranked} үнэлгээ)
                </span>
            </div>
            
        `;
        
        restaurantList.appendChild(card);
    });
}