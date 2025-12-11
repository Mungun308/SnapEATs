const restaurants = [
  { rest_name: "Yuna Korean BBQ", distance: "1.2 км", schedule: "Өнөөдөр: 10:00–22:00", address: "БГД, 3-р хороо, Энхтайваны өргөн чөлөө 45", rank: 4.8, amount_of_people_ranked: 235, isNew: false, hasPromotion: true, isFeatured: true },
  { rest_name: "The Bull Hotpot", distance: "850 м", schedule: "Өнөөдөр: 11:00–23:30", address: "СБД, 1-р хороо, Тэди төвийн зүүн талд", rank: 4.6, amount_of_people_ranked: 410, isNew: true, hasPromotion: false, isFeatured: false },
  { rest_name: "Burger & Fries", distance: "2.3 км", schedule: "Өнөөдөр: 09:00–21:00", address: "ЧД, 5-р хороо, Барилгачдын гудамж 12", rank: 4.4, amount_of_people_ranked: 189, isNew: true, hasPromotion: true, isFeatured: false },
  { rest_name: "Tokyo House Sushi", distance: "1.7 км", schedule: "Өнөөдөр: 10:30–22:00", address: "БЗД, 15-р хороо, Нархан хотхон 102", rank: 4.9, amount_of_people_ranked: 527, isNew: false, hasPromotion: false, isFeatured: true },
  { rest_name: "Nomads Mongolian Cuisine", distance: "3.0 км", schedule: "Өнөөдөр: 12:00–23:00", address: "СБД, 11-р хороо, Чингисийн өргөн чөлөө 17", rank: 4.7, amount_of_people_ranked: 314, isNew: false, hasPromotion: true, isFeatured: true },
  { rest_name: "Seoul Garden", distance: "1.1 км", schedule: "Өнөөдөр: 10:00–22:00", address: "СБД, 7-р хороо, Сөүлийн гудамж 14", rank: 4.5, amount_of_people_ranked: 268, isNew: true, hasPromotion: false, isFeatured: false },
  { rest_name: "Mexican Taco Bar", distance: "2.8 км", schedule: "Өнөөдөр: 11:00–23:00", address: "БЗД, 13-р хороо, Жуковын гудамж 22", rank: 4.3, amount_of_people_ranked: 142, isNew: false, hasPromotion: true, isFeatured: false },
  { rest_name: "Viet Pho 88", distance: "900 м", schedule: "Өнөөдөр: 09:00–21:30", address: "ЧД, 4-р хороо, Жуулчны гудамж 38", rank: 4.7, amount_of_people_ranked: 381, isNew: true, hasPromotion: false, isFeatured: true },
  { rest_name: "Tokyo Ramen Hub", distance: "1.9 км", schedule: "Өнөөдөр: 11:00–22:00", address: "СБД, 1-р хороо, Төв номын сангийн хойд талд", rank: 4.6, amount_of_people_ranked: 244, isNew: false, hasPromotion: true, isFeatured: false },
  { rest_name: "Italiano Pasta & Pizza", distance: "3.4 км", schedule: "Өнөөдөр: 10:00–23:00", address: "ХУД, 11-р хороо, Зайсангийн гудамж 18", rank: 4.8, amount_of_people_ranked: 512, isNew: true, hasPromotion: false, isFeatured: true },
  { rest_name: "Urban Coffee Roasters", distance: "650 м", schedule: "Өнөөдөр: 08:00–20:00", address: "СБД, 6-р хороо, Сэнтрал Тауэр 1 давхар", rank: 4.4, amount_of_people_ranked: 198, isNew: false, hasPromotion: true, isFeatured: false },
  { rest_name: "Hotpot Palace", distance: "2.1 км", schedule: "Өнөөдөр: 12:00–23:30", address: "БГД, 10-р хороо, 3-р хороолол, 23-р байр", rank: 4.7, amount_of_people_ranked: 337, isNew: true, hasPromotion: false, isFeatured: false },
  { rest_name: "BBQ SmokeHouse", distance: "4.0 км", schedule: "Өнөөдөр: 11:30–22:00", address: "ХУД, 15-р хороо, Ривер Гарден 302", rank: 4.5, amount_of_people_ranked: 156, isNew: false, hasPromotion: true, isFeatured: true },
  { rest_name: "Mediterranean Olive", distance: "2.6 км", schedule: "Өнөөдөр: 10:00–22:00", address: "СБД, 8-р хороо, Олимп плаза 3 давхар", rank: 4.6, amount_of_people_ranked: 221, isNew: true, hasPromotion: false, isFeatured: false },
  { rest_name: "Korean Street Food House", distance: "1.3 км", schedule: "Өнөөдөр: 09:00–21:00", address: "БЗД, 4-р хороо, Их тойруу 55", rank: 4.2, amount_of_people_ranked: 119, isNew: false, hasPromotion: true, isFeatured: false }
];

const categoryTitles = {
  highranked: "ӨНДӨР ҮНЭЛГЭЭТЭЙ",
  new: "ШИНЭ",
  gift: "УРАМШУУЛАЛТАЙ",
  featured: "ОНЦЛОХ"
};

function filterRestaurants(category) {
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
  return filtered.slice(0, 10);
}

function formatReviews(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
}

function createRestaurantCard(restaurant, index) {
  return `
    <article class="rest-profile">
      <div class="profile-wrapper">
        <img class="profile" src="./img/placeholder.png" alt="${restaurant.rest_name}">
      </div>
      <p class="rest-title">${restaurant.rest_name}</p>
      <div class="star-and-rank">
        <div class="review-div">
          <p class="rating">${restaurant.rank}</p>
          <img class="star" src="./img/star.svg">
          <p class="review">${formatReviews(restaurant.amount_of_people_ranked)}</p>
        </div>
        <div class="rank-div">
          <p class="rank">${index+1}</p>
          <img class="badge" src="./img/badge.svg" alt="rank badge">
        </div>
      </div>
    </article>
  `;
}

function renderRestaurantList(category) {
  const filtered = filterRestaurants(category);
  const listContainer = document.querySelector(".relevantlist .rest-list");
  const titleElement = document.querySelector(".relevantlist h3");
  
  if (titleElement) {
    titleElement.textContent = categoryTitles[category] || "РЕСТОРАНЫ";
  }
  
  if (listContainer) {
    const leftArrow = listContainer.querySelector(".arrowbtn:first-child");
    const rightArrow = listContainer.querySelector(".arrowbtn:last-child");
    
    listContainer.innerHTML = "";
    
    if (leftArrow) listContainer.appendChild(leftArrow.cloneNode(true));
    
    filtered.forEach((restaurant, index) => {
      listContainer.insertAdjacentHTML("beforeend", createRestaurantCard(restaurant, index));
    });
    
    if (rightArrow) listContainer.appendChild(rightArrow.cloneNode(true));
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const categoryButtons = document.querySelectorAll("se-btn-filter");
  
  categoryButtons.forEach(button => {
    button.addEventListener("click", function() {
      const category = this.getAttribute("data-cat");
      
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      
      renderRestaurantList(category);
    });
  });
  
  renderRestaurantList("highranked");
});
