const restaurantData={
    high: [
        { title: "IL FIORE", rating: 4.8, reviews: "1.2k", img: "il-fiore.png", rank: 1 },
        { title: "LA FONTANA", rating: 4.6, reviews: "1.2k", img: "la-fontana.jpeg", rank: 4 }
    ],
    new: [
        { title: "MOM'S TOUCH", rating: 4.7, reviews: "1.2k", img: "moms-touch.jpg", rank: 3 }
    ],
    gift: [
        { title: "ALFIE RESTAURANT", rating: 4.8, reviews: "1.1k", img: "alfie.jpeg", rank: 2 }
    ]
}

function createRestaurantCard(item){
    return
        <article>
            <img class="profile" src="${item.img}"></img>
            <p class="rest-title" >"${item.title}"</p>
        </article>
}