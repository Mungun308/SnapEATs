

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
        <img class="profile" src="./img/alfie.jpeg" alt="${restaurant.rest_name}">
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
