// SIMPLE-FILTER.js - FIXED VERSION
console.log('SIMPLE FILTER loaded - FIXED');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up filter system...');
    
    // Get all restaurant cards
    const restaurantCards = document.querySelectorAll('.rest-profile');
    console.log(`Found ${restaurantCards.length} restaurant cards`);
    
    // Make cards clickable
    makeCardsClickable();
    
    // Setup filter listeners
    setupFilterListeners();
    
    function makeCardsClickable() {
        restaurantCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.onclick = function() {
                const name = this.querySelector('.rest-title').textContent;
                console.log('Clicked restaurant:', name);
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
    
    function setupFilterListeners() {
        console.log('Setting up filter listeners...');
        
        // 1. FOOD CATEGORY CHECKBOXES
        document.querySelectorAll('input[name="foodCategory"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                console.log(`Checkbox ${this.value}: ${this.checked}`);
                applyFilters();
            });
        });
        
        // 2. PRICE SLIDER
        const priceSlider = document.getElementById('slider');
        if (priceSlider) {
            priceSlider.addEventListener('input', function() {
                console.log('Price slider:', this.value);
                // Update display
                const valueSpan = this.previousElementSibling;
                if (valueSpan && valueSpan.classList.contains('range-value')) {
                    valueSpan.textContent = Math.round(this.value/1000) + 'k';
                }
                applyFilters();
            });
        }
        
        // 3. STAR RATINGS - FIXED (no image errors)
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-value'));
                console.log(`Star ${rating} clicked`);
                
                // Update star display - SAFE VERSION
                document.querySelectorAll('.star').forEach((s, i) => {
                    const img = s.querySelector('img');
                    if (img) {
                        // Try to set image, fallback to text
                        try {
                            img.src = (i < rating) ? './img/star.svg' : './img/greystar.svg';
                        } catch (e) {
                            s.innerHTML = (i < rating) ? '★' : '☆';
                        }
                    } else {
                        s.innerHTML = (i < rating) ? '★' : '☆';
                    }
                });
                
                applyFilters();
            });
        });
        
        // 4. SEARCH BUTTON
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Search button clicked');
                applyFilters();
            });
        }
        
        console.log('Filter listeners ready');
    }
    
    function applyFilters() {
        console.log('=== APPLYING FILTERS ===');
        
        // Debug: Show all checkbox states
        document.querySelectorAll('input[name="foodCategory"]').forEach((cb, i) => {
            console.log(`Checkbox ${i}: "${cb.value}" = ${cb.checked}`);
        });
        
        // Reset all cards
        restaurantCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.filter = 'none';
            card.style.border = 'none';
            card.style.boxShadow = 'none';
        });
        
        // Get active filters
        const checkedBoxes = document.querySelectorAll('input[name="foodCategory"]:checked');
        
        // Get selected stars (count filled stars)
        let selectedStars = 0;
        document.querySelectorAll('.star').forEach((star, i) => {
            const img = star.querySelector('img');
            if (img && img.src.includes('star.svg') && !img.src.includes('greystar')) {
                selectedStars = i + 1;
            } else if (star.innerHTML.includes('★')) {
                selectedStars = i + 1;
            }
        });
        
        // Get price
        const priceSlider = document.getElementById('slider');
        const priceValue = priceSlider ? parseInt(priceSlider.value) : 100000;
        
        console.log(`Active: ${checkedBoxes.length} checkboxes, ${selectedStars} stars, price: ${priceValue}`);
        
        // If no filters, show all
        if (checkedBoxes.length === 0 && selectedStars === 0 && priceValue === 100000) {
            console.log('No filters active');
            return;
        }
        
        // Apply filters
        restaurantCards.forEach(card => {
            const cardName = card.querySelector('.rest-title').textContent;
            const cardNameLower = cardName.toLowerCase();
            const cardRating = parseFloat(card.querySelector('.rating').textContent);
            
            let shouldShow = true;
            
            // 1. CHECK FOOD CATEGORIES
            if (checkedBoxes.length > 0) {
                let matchesCategory = false;
                
                // Simple matching based on restaurant names
                checkedBoxes.forEach(checkbox => {
                    const category = checkbox.value;
                    
                    // Match IL FIORE and LA FONTANA with Italian
                    if (category === 'italian' && (cardNameLower.includes('fiore') || cardNameLower.includes('fontana'))) {
                        matchesCategory = true;
                    }
                    // Match MOM'S TOUCH with fastfood
                    else if (category === 'fastfood' && cardNameLower.includes('mom')) {
                        matchesCategory = true;
                    }
                    // Match ALFIE with snack
                    else if (category === 'snack' && cardNameLower.includes('alfie')) {
                        matchesCategory = true;
                    }
                    // Match ALFIE with korean (as example)
                    else if (category === 'korean' && cardNameLower.includes('alfie')) {
                        matchesCategory = true;
                    }
                    // No Mongolian restaurants in your list
                    else if (category === 'mongolian') {
                        // Will not match any
                    }
                });
                
                if (!matchesCategory) {
                    shouldShow = false;
                }
            }
            
            // 2. CHECK STAR RATING
            if (selectedStars > 0 && cardRating < selectedStars) {
                shouldShow = false;
            }
            
            // 3. CHECK PRICE (using rating as proxy)
            if (priceValue < 100000) {
                const priceThreshold = (priceValue / 100000) * 5;
                if (cardRating < priceThreshold) {
                    shouldShow = false;
                }
            }
            
            // Apply visual effects
            if (shouldShow) {
                // Highlight matching cards
                card.style.border = '3px solid #4CAF50';
                card.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
                card.style.transform = 'scale(1.05)';
            } else {
                // Dim non-matching cards
                card.style.opacity = '0.3';
                card.style.filter = 'grayscale(80%)';
                card.style.transform = 'scale(0.9)';
            }
        });
        
        // Show notification
        showFilterNotification(checkedBoxes.length, selectedStars);
    }
    
    // Auto-test after 1 second
    setTimeout(() => {
        console.log('AUTO-TEST: Clicking Italian checkbox...');
        const italianCheckbox = document.querySelector('input[value="italian"]');
        if (italianCheckbox) {
            italianCheckbox.click();
        }
    }, 1000);
    
    console.log('Filter system ready');
});

// Notification function
function showFilterNotification(categoryCount, starCount) {
    // Remove old notification
    const oldNotif = document.querySelector('.filter-notif');
    if (oldNotif) oldNotif.remove();
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'filter-notif';
    notification.innerHTML = `
        <strong>✅ Шүүлтүүр идэвхтэй!</strong><br>
        ${categoryCount} төрөл, ${starCount} од
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}