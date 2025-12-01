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
