// working-filter.js - Filter system that works but keeps original cards
document.addEventListener('DOMContentLoaded', function() {
    console.log('Working filter system loaded');
    
    // Store original restaurant cards
    const originalCards = Array.from(document.querySelectorAll('.rest-profile'));
    const restListContainer = document.querySelector('.rest-list');
    
    // Make original cards clickable
    makeCardsClickable();
    
    // Setup all filter event listeners
    setupFilters();
    
    function setupFilters() {
        // Food category checkboxes
        document.querySelectorAll('input[name="foodCategory"]').forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
        
        // Price slider
        const priceSlider = document.getElementById('slider');
        if (priceSlider) {
            priceSlider.addEventListener('input', function() {
                const valueSpan = this.parentElement.querySelector('.range-value');
                if (valueSpan) {
                    valueSpan.textContent = formatPrice(this.value) + '₮';
                }
                applyFilters();
            });
        }
        
        // Rating stars
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-value');
                
                // Update star display
                document.querySelectorAll('.star').forEach((s, i) => {
                    const img = s.querySelector('img');
                    img.src = i < rating ? './img/star.svg' : './img/greystar.svg';
                });
                
                applyFilters();
            });
        });
        
        // Search button
        document.querySelector('.search-btn').addEventListener('click', function(e) {
            e.preventDefault();
            applyFilters();
        });
    }
    
    function applyFilters() {
        console.log('Applying filters...');
        
        // Get filter values
        const selectedCategories = Array.from(document.querySelectorAll('input[name="foodCategory"]:checked'))
            .map(cb => cb.value);
        
        const priceValue = document.getElementById('slider')?.value || 100000;
        const maxPrice = parseInt(priceValue);
        
        // Get selected rating
        let selectedRating = 0;
        document.querySelectorAll('.star').forEach((star, i) => {
            const img = star.querySelector('img');
            if (img.src.includes('star.svg') && !img.src.includes('greystar')) {
                selectedRating = i + 1;
            }
        });
        
        // Filter logic based on restaurant names
        const filteredCards = originalCards.filter(card => {
            const restaurantName = card.querySelector('.rest-title').textContent;
            const ratingText = card.querySelector('.rating').textContent;
            const rating = parseFloat(ratingText);
            
            // Check rating filter
            if (selectedRating > 0 && rating < selectedRating) {
                return false;
            }
            
            // Check food category filter
            if (selectedCategories.length > 0) {
                const nameLower = restaurantName.toLowerCase();
                
                // Map categories to restaurant names
                const categoryMap = {
                    'mongolian': ['gobi', 'mongol', 'ulaanbaatar', 'tengeriin', 'khinkali', 'nomads'],
                    'korean': ['korean', 'seoul', 'kimchi', 'tteokbokki', 'dosirak', 'bibimbap'],
                    'italian': ['fiore', 'fontana', 'italiano', 'pasta', 'pizza'],
                    'chinese': ['wok', 'dim sum', 'dragon'],
                    'japanese': ['tokyo', 'sushi', 'ramen', 'bento', 'yakiniku'],
                    'fastfood': ['burger', 'fries', 'chicken', 'mom\'s touch'],
                    'snack': ['waffle', 'bubble', 'tea', 'coffee'],
                    'drinks': ['coffee', 'tea', 'juice', 'bar'],
                    'bakery': ['bakery', 'bread', 'cake']
                };
                
                let matchesCategory = false;
                for (const category of selectedCategories) {
                    if (categoryMap[category]) {
                        for (const keyword of categoryMap[category]) {
                            if (nameLower.includes(keyword)) {
                                matchesCategory = true;
                                break;
                            }
                        }
                    }
                    if (matchesCategory) break;
                }
                
                if (!matchesCategory) return false;
            }
            
            // Check price filter (simulated)
            // Since we don't have actual price data, we'll use rating as proxy
            const priceThreshold = (maxPrice / 100000) * 5; // Convert 0-100000 to 0-5
            if (rating < priceThreshold) {
                return false;
            }
            
            return true;
        });
        
        // Show filtered results
        showFilteredResults(filteredCards);
    }
    
    function showFilteredResults(filteredCards) {
        // Hide all original cards
        originalCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show only filtered cards
        filteredCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // If no filters selected, show all cards
        const anyFilterActive = 
            document.querySelectorAll('input[name="foodCategory"]:checked').length > 0 ||
            document.querySelectorAll('.star img[src*="star.svg"]:not([src*="greystar"])').length > 0 ||
            (document.getElementById('slider') && document.getElementById('slider').value < 100000);
        
        if (!anyFilterActive) {
            originalCards.forEach(card => {
                card.style.display = 'block';
            });
        }
        
        console.log(`Showing ${filteredCards.length} of ${originalCards.length} restaurants`);
    }
    
    function makeCardsClickable() {
        document.querySelectorAll('.rest-profile').forEach(card => {
            card.style.cursor = 'pointer';
            card.onclick = function() {
                const name = this.querySelector('.rest-title').textContent;
                const ids = {
                    'IL FIORE': 1,
                    'ALFIE RESTAURANT': 2,
                    'MOM\'S TOUCH': 3,
                    'LA FONTANA': 4
                };
                window.location.href = `restaurant-profile.html?id=${ids[name] || 1}`;
            };
        });
    }
    
    function formatPrice(price) {
        const num = parseInt(price);
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'k';
        }
        return num.toString();
    }
    
    console.log('Filter system ready');
});