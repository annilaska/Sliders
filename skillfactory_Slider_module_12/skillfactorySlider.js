
  
let images = [{
    url: "images/first.jpg",
    title: "Rostov-on-Don, Admiral",
    city: "Rostov-on-Don LCD admiral",
    apartment_area: "81 m2",
    repair_time: "3.5 months",
    repair_cost: "Upon request"
}, {
    url: "images/second.jpg",
    title: "Sochi Thieves",
    city: "Sochi Thieves",
    apartment_area: "105 m2",
    repair_time: "4 months",
    repair_cost: "Upon request"
}, {
    url: "images/third.jpg",
    title: "Rostov-on-Don Patriotic",
    city: "Rostov-on-Don Patriotic",
    apartment_area: "93 m2",
    repair_time: "3 months",
    repair_cost: "Upon request"
}];



function initSlider() {
    if(!images || !images.length) return;

   
    let sliderArrows = document.querySelector(".arrows_аnd_dots");
    let sliderDots = document.querySelector(".slider__Dots");
    let sliderTitles = document.querySelector(".slider__Titles");
    let sliderImages = document.querySelector(".slider__Images");

    initImage();
    initArrows();
    initDots();
    initTitles();
  

    function initImage() {
        images.forEach ((Image, index) => {
            let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        });
    }
    
    
  
    function initArrows() {
        sliderArrows.querySelectorAll(".slider__Arrow").forEach(arrow => {
            arrow.addEventListener("click", function() {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        });
    }
    
    
    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__Dots-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider__Dots-item").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            });
        });
    }


    function initTitles() {
        images.forEach((image, index) => {
            let titleDiv = `<div class="slider__Titles-item n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${image.title}</div>`;
            sliderTitles.innerHTML += titleDiv;
        });
        sliderTitles.querySelectorAll(".slider__Titles-item").forEach(titles => {
            titles.addEventListener("click", function() {
                moveSlider(this.dataset.index); 
            });
        });
    }

    function initInfo(arrayIndex) {
        const img = images[arrayIndex];
        if(img) {
            const cityNode = document.querySelector(".city__block");
            if (cityNode) cityNode.innerHTML = img.city;
            const areaNode = document.querySelector(".area__block");
            if (areaNode) areaNode.innerHTML = img.apartment_area;
            const timeNode = document.querySelector(".time__block");
            if (timeNode) timeNode.innerHTML = img.repair_time;
            const costNode = document.querySelector(".cost__block");
            if (costNode) costNode.innerHTML = img.repair_cost;
        }
    }


    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
        sliderTitles.querySelector(".active").classList.remove("active");
        sliderTitles.querySelector(".n" + num).classList.add("active");
        initInfo(num);
    }

}



document.addEventListener("DOMContentLoaded", initSlider)
