const FilterManager = () => {
    console.log('Hailt ehellee');
    //hool
    document.querySelectorAll('input[name="foodCategory"]').forEach(box => {
        box.onchange = () => console.log('🍔 Хоол:', box.value);
    });
    //une
    const slider = document.querySelector('input[type="range"]');
    if (slider) {
        slider.oninput = () => console.log('💰 Үнэ:', slider.value);
    }
    //od
    document.querySelectorAll('.star').forEach(star => {
        star.onclick = () => {
            console.log('⭐ Од дарлаа:', star.getAttribute('data-value'));
            // Өнгө өөрчлөх
            star.style.color = 'gold';
            star.style.transform = 'scale(1.2)';
        };
    });
};
document.addEventListener('DOMContentLoaded', FilterManager);
