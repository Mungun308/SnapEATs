// filterSystem.js
let allRestaurants = [];

const restListContainer = document.querySelector('.rest-list');

// Restaurant card үүсгэх template
function createRestaurantCard(rest) {
    return `
        <article class="rest-profile" data-id="${rest.rest_id}">
            <div class="profile-wrapper">
                <img class="profile" src="./img/rest-placeholder.jpg" alt="${rest.rest_name}">
            </div>
            <p class="rest-title">${rest.rest_name}</p>
            <div class="star-and-rank">
                <div class="review-div">
                    <p class="rating">${rest.rank}</p>
                    <img class="star" src="./img/star.svg">
                    <p class="review">${rest.amount_of_people_ranked}</p>
                </div>
            </div>
        </article>
    `;
}

// Бүх рестораныг дэлгэцэнд гаргах
function renderRestaurants(restaurants) {
    // arrow товчлуудыг хадгалах
    const leftArrow = restListContainer.querySelector('.arrowbtn:first-child') || '';
    const rightArrow = restListContainer.querySelector('.arrowbtn:last-child') || '';

    restListContainer.innerHTML = `
        ${leftArrow.outerHTML || '<button class="arrowbtn"><img src="./img/leftArrow.svg"></button>'}
        ${restaurants.map(createRestaurantCard).join('')}
        ${rightArrow.outerHTML || '<button class="arrowbtn"><img src="./img/rightArrow.svg"></button>'}
    `;

    // Card дээр дарахад дэлгэрэнгүй хуудас руу шилжих
    document.querySelectorAll('.rest-profile').forEach(card => {
        card.addEventListener('click', () => {
            // Та энд restaurant-ийн ID ашиглаж URL үүсгэж болно
            window.location.href = `RestaurantProfile1.html?id=${card.dataset.id}`;
        });
    });
}

// Filter логикийн гол функц
function applyFilters() {
    let filtered = [...allRestaurants];

    // 1. Хоолны төрөл (checkbox)
    const selectedCategories = Array.from(document.querySelectorAll('input[name="foodCategory"]:checked'))
        .map(cb => cb.value);
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(rest => selectedCategories.includes(rest.category));
    }

    // 2. Үнэ (та одоогоор үнийн талбар JSON-д байхгүй тул жишээ болгож алгасав)
    // Хэрвээ дараа нь price талбар нэмбэл энд шүүж болно

    // 3. Одны үнэлгээ
    const minRating = parseFloat(document.getElementById('ratingValue').value) || 0;
    if (minRating > 0) {
        filtered = filtered.filter(rest => rest.rank >= minRating);
    }

    // 4. Зай (distance) - одоогоор текст тул жишээ шүүлт
    const distanceSlider = document.querySelector('#slider[max="5"]'); // зайны slider
    if (distanceSlider) {
        const maxDistanceKm = parseFloat(distanceSlider.value);
        if (maxDistanceKm < 5) {
            filtered = filtered.filter(rest => {
                const distNum = parseFloat(rest.distance.replace(' км', '').replace(' м', '')) / (rest.distance.includes('м') ? 1000 : 1);
                return distNum <= maxDistanceKm;
            });
        }
    }

    // 5. Хязгаарлалт (Vegan, Gluten-free гэх мэт) - одоогоор бүрэн биш тул жишээ
    // Дараа нь restriction талбарыг ашиглаж болно

    // Эрэмбэ (Жишээ: highranked товч дарахад өндөр үнэлгээтэйгээр эрэмбэлнэ)
    const activeCatButton = document.querySelector('se-btn-filter.active');
    if (activeCatButton) {
        const cat = activeCatButton.dataset.cat;
        if (cat === 'highranked') {
            filtered.sort((a, b) => b.rank - a.rank);
        }
        // Бусад товчлуудыг (new, gift, featured) хэрэгжүүлэх бол энд нэмнэ
    }

    renderRestaurants(filtered);
}

// Датаг ачаалах
async function loadRestaurants() {
    try {
        const res = await fetch('./restaurants.json');
        allRestaurants = await res.json();
        renderRestaurants(allRestaurants);
    } catch (err) {
        console.error('Ресторан ачааллахад алдаа гарлаа:', err);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurants();

    // Хоолны төрөл checkbox
    document.querySelectorAll('input[name="foodCategory"]').forEach(cb => {
        cb.addEventListener('change', applyFilters);
    });

    // Одны үнэлгээ
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            const value = star.dataset.value;
            document.getElementById('ratingValue').value = value;

            document.querySelectorAll('.star').forEach((s, i) => {
                if (i < value) {
                    s.innerHTML = '<img src="./img/star.svg">';
                } else {
                    s.innerHTML = '<img src="./img/greystar.svg">';
                }
            });
            applyFilters();
        });
    });

    // Зайны slider
    const distanceSlider = document.querySelector('#slider[max="5"]');
    if (distanceSlider) {
        distanceSlider.addEventListener('input', () => {
            const val = distanceSlider.value;
            distanceSlider.closest('.range-container').querySelector('.range-value').textContent = val + 'km';
            applyFilters();
        });
    }

    // Category товчлууд (Үнэлгээ өндөр, Шинэ гэх мэт)
    document.querySelectorAll('se-btn-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('se-btn-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });

    // Хайлтын товч (доод талын search button)
    document.querySelector('.search-btn').addEventListener('click', applyFilters);
});     