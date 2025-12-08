const FilterManager = () => {
    console.log('Фильтерүүд идэвхжлээ...');
    //hyzgaarlalt
    document.querySelectorAll('input[name="foodLimit"]').forEach(box => {
        box.onchange = () => {
            console.log("Хязгаарлалт:", box.value);
        };
    });
    //portion
    document.querySelectorAll('input[name="portion"]').forEach(port => {
        port.onchange = () => {
            console.log("Порц:", port.value);
        };
    });
    //zai
    const slider = document.querySelector('#distance');
    if (slider) {
        slider.oninput = () => {
            console.log("Зай (км):", slider.value);
        };
    }
};
document.addEventListener('DOMContentLoaded', FilterManager);