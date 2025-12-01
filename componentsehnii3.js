const FilterManager = () => {
    console.log('🚀 Бүх шүүлтүүр бэлэн!');
    //hoolnii turluud
    document.querySelectorAll('input[name="foodCategory"]').forEach(box => 
        box.onchange = () => console.log(`🍔 ${box.value} сонгогдлоо`)
    );
    //une
    const slider = document.querySelector('input[type="range"]');
    slider?.oninput = () => console.log(`💰 Үнэ: ${slider.value}₮`);
    //od
    document.querySelectorAll('.star').forEach(star =>
        star.onclick = () => console.log(`⭐ ${star.dataset.value} од`)
    );
};
//ehluulne
addEventListener('DOMContentLoaded', FilterManager);
