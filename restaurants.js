// ui/restaurants.js
import { restaurants } from '../data/restaurants.js';

function displayRestaurantsInList(restaurantsToShow) {
    const listContainer = document.getElementById('restaurantList');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    //zuun tiish guilgeh sum
    listContainer.innerHTML += '<button class="arrowbtn" type="button" onclick="scrollRestaurants(-1)"><img src="./img/leftArrow.svg" alt="left"></button>';
    
    //restaurantuudiin cardiig nemeh
    restaurantsToShow.forEach(function(restaurant, index) {
        const cardHTML = createRestaurantCard(restaurant, index);
        listContainer.innerHTML += cardHTML;
    });
    
    //baruun tiish guilgeh sum 
    listContainer.innerHTML += '<button class="arrowbtn" type="button" onclick="scrollRestaurants(1)"><img src="./img/rightArrow.svg" alt="right"></button>';
    
    //kartiig darahad hariu uildel uzuulne
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

function showFilteredResults(filteredRestaurants) {
    const homeContent = document.querySelector('.main-content');
    const filteredSection = document.getElementById('filteredResults');
    const resultsList = document.getElementById('filteredRestaurantList');
    const resultsTitle = document.getElementById('resultsTitle');
    //undsen huudsiig nuuna
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

export {
  displayRestaurantsInList,
  createRestaurantCard,
  formatReviews,
  makeCardsClickable,
  scrollRestaurants,
  showFilteredResults,
  hideFilteredResults,
  getCategoryName,
  filterRestaurantsByCategory,
  displayRestaurantsByCategory
};
