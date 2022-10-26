import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    let cards = `<div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
  
      <div class="carousel__inner">
        
        ${this.slides.map((card) => `<div class="carousel__slide" data-id="${card.id}">
  <img src="/assets/images/carousel/${card.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">${this.getPrice(card.price)}</span>
    <div class="carousel__title">${card.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>`
        )}
      </div>
      </div>`;

    this.elem = createElement(cards);
    this.initCarousel();
    this.elem.addEventListener("click", this.clickDetail);

  }

  getPrice(price) {
    return `€${price.toFixed(2)}`;
  }

  initCarousel() {
    let elem = this.elem;
    let arrowRight = elem.querySelector(".carousel__arrow_right");
    let arrowLeft = elem.querySelector(".carousel__arrow_left");
    let window = elem.querySelector(".carousel__inner");
    let cardCount = elem.querySelectorAll(".carousel__slide").length;

    let index = 0;
    arrowLeft.style.display = "none";

    arrowRight.addEventListener("click", () => {
      while (index < cardCount - 1) {
        index++;
        window.style.transform = `translateX(${-index*window.offsetWidth}px)`;
        arrowLeft.style.display = "";
        index === cardCount - 1
          ? (arrowRight.style.display = "none")
          : (arrowRight.style.display = "");
        break;
      }
    });

    arrowLeft.addEventListener("click", () => {
      while (index > 0) {
        index--;
        window.style.transform = `translateX(${-index*window.offsetWidth}px)`;
        arrowRight.style.display = "";
        index === 0
          ? (arrowLeft.style.display = "none")
          : (arrowLeft.style.display = "");
        break;
      }
    });
  }

  clickDetail = (event) => {
    if (event.target.closest(".carousel__button")) {
      let newEvent = new CustomEvent("product-add", {
        detail: this.slides.map((elem) => elem.id),
        bubbles: true,
      });
      this.elem.dispatchEvent(newEvent);
    }
  };

}
document.body.addEventListener('product-add', (event) => console.log(event.detail));