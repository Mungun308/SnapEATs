function FilterManager() {
    //Hoolnii turul
    const foodBoxes = document.querySelectorAll('input[name="foodCategory"]');
    foodBoxes.forEach(box => {
        box.addEventListener('change', () => {
            console.log('🍔 Хоол сонголт:', box.value); 
        });
    });
    
    //Une
    const priceSlider = document.querySelector('input[type="range"]');
    if (priceSlider) {
        priceSlider.addEventListener('input', () => {
            console.log('💰 Үнэ:', priceSlider.value);
        });
    }
    
    //Od
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            console.log('⭐ Од:', star.getAttribute('data-value'));
        });
    });
}

document.addEventListener('DOMContentLoaded', FilterManager);
