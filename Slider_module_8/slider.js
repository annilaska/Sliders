let images = [{
  url: "https://i10.fotocdn.net/s110/691e7a9cb3da2a0d/public_pin_l/2435793496.jpg",
  title: "Главное чтобы лапки не украли!"
}, {
  url: "https://s1.1zoom.ru/big3/737/Rodents_Lagidium_480644.jpg",
  title: "Не люблю сидеть без дела. Пойду лягу."
}, {
  url: "https://im0-tub-ru.yandex.net/i?id=f8e17d7023f269efa34a34c7783a0a20-l&ref=rim&n=13&w=1080&h=1080",
  title: "-Но тебя там ждут неприятности. -Но они же ждут!"
}, {
  url: "https://i.artfile.ru/2560x1706_1541094_[www.ArtFile.ru].jpg",
  title: "Почему всё-таки треугольник? Угла ведь три а не тре. Какого чёрта?"
}, {
  url: "https://img.tourister.ru/files/2/3/8/9/6/5/5/1/original.jpg",
  title: "Беда пришла в твой дом, Надежда!"
}, {
  url: "https://million-wallpapers.ru/wallpapers/5/22/520845201612188/zhiraf-s-zabavnym-licom-na-fone-neba.jpg",
  title: "Голод пережили. Изобилие перетерпим."
}];



function initSlider(options) {
  if (!images || !images.length) return;

  options = options || {
  titles: false,
  dots: true,
  autoplay: false
  };

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");

  initImages();
  initArrows();

  if(options.dots) {
    initDots();
  }

  if(options.titles) {
    initTitles();
  }


  if(options.autoplay) {
    initAutoplay();
  }

  function initImages() {
      images.forEach ((image, index) => {
        let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index = "${index}"></div>`;
        sliderImages.innerHTML += imageDiv;
      });
  }

  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
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
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      });
    });
  }

  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += cropTitle(titleDiv, 100);
  }




  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if(options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }

  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    sliderTitle.innerText = cropTitle(images[num].title, 100);
  }

  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }

  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }

};


let sliderOptions = {
  titles: true,
  dots: true,
  autoplay: true,
  autoplayInterval: 6000
};


document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});


