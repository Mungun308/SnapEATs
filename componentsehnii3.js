const FilterManager = () => {
    console.log('🎮 Тоглоом эхэллээ!');
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
            const selectedRating = parseInt(star.getAttribute('data-value'));
            console.log('⭐ Та', selectedRating, 'од өгч байна!');
            document.querySelectorAll('.star').forEach((s, index) => {
                const starNumber = index + 1;
                if (starNumber <= selectedRating) {
                    s.innerHTML = '<img src="./img/star.svg" alt="active star">'; 
                } else {
                    s.innerHTML = '<img src="./img/greystar.svg" alt="inactive star">';
                }
            });
        };
    });
};
document.addEventListener('DOMContentLoaded', FilterManager);
