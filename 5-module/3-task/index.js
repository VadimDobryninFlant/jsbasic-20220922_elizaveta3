function initCarousel() {
  let container = document.querySelector(".container");
  let carousel = container.querySelector(".carousel");
  let arrowRight = container.querySelector(".carousel__arrow_right");
  let arrowLeft = container.querySelector(".carousel__arrow_left");
  let window = container.querySelector(".carousel__inner");
  let cardWidth = container.querySelector(".carousel__slide").offsetWidth;
  let cardCount = container.querySelectorAll(".carousel__slide").length;
  let finalWidth = cardWidth * cardCount;

  let index = 0;

  arrowLeft.style.display = "none";

  arrowRight.addEventListener('click', () =>  {
    while (index < cardCount - 1) {
      index++;
      window.style.transform = `translateX(${-index*cardWidth}px)`;
      arrowLeft.style.display = "";
      (index === cardCount - 1) ? arrowRight.style.display = "none" : arrowRight.style.display = "";
      break;
    }

  });

  arrowLeft.addEventListener('click', () =>  {
    while (index > 0) {
      index--;
      window.style.transform = `translateX(${-index*cardWidth}px)`;
      arrowRight.style.display = "";
      (index === 0) ? arrowLeft.style.display = "none" : arrowLeft.style.display = "";
      break;
    }

  });
};
