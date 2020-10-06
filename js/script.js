import galleryItems from "./gallery-items.js";

const refs = {
  body: document.querySelector("body"),
  itemsGalleryEl: document.querySelector(".js-gallery"),
  lightboxEl: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  lightboxButtonEl: document.querySelector(".lightbox__button"),
  lightboxOverlayEl: document.querySelector(".lightbox__overlay"),
  parallaxBox: document.querySelector(".parallax-box"),
  scrollLeft: document.querySelector(".lightbox-button-left"),
  scrollRight: document.querySelector(".lightbox-button-right"),
};

// Функция создания галереи в памяти
function renderImagesToGallery(items) {
  return items
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"> 
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index + 1}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

// Отложенный вызов функции
function timeoutСreateGallery() {
  // Вставка галереи в HTML
  refs.itemsGalleryEl.insertAdjacentHTML(
    "beforeend",
    renderImagesToGallery(galleryItems)
  );
}

//! timeOut
// Что бы облачка летали*)

function timeoutParallax() {
  refs.body.classList.add("is-active");

  // Отложенный вызов функции
  window.setTimeout(timeoutСreateGallery, 1500);
}

window.setTimeout(timeoutParallax, 1000);

// Модальное окно, слайдер
refs.itemsGalleryEl.addEventListener("click", onGalleryEllClick);

function onGalleryEllClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const source = e.target.dataset.source;
  const alt = e.target.alt;
  const index = Number(e.target.dataset.index);

  onOpenModal(source, alt, index);
}

function onOpenModal(source, alt, index) {
  refs.lightboxEl.classList.add("is-open");
  refs.body.classList.add("is-modal-open");
  refs.body.classList.remove("is-modal-close");

  refs.lightboxImg.src = source;
  refs.lightboxImg.alt = alt;
  refs.lightboxImg.setAttribute("data-index", index);

  refs.lightboxEl.addEventListener("click", onClick);
  window.addEventListener("keydown", onKeydown);
}

function onCloseModal() {
  refs.lightboxEl.removeEventListener("click", onClick);
  window.removeEventListener("keydown", onKeydown);

  refs.lightboxEl.classList.remove("is-open");
  refs.parallaxBox.classList.remove("is-active");
  refs.body.classList.remove("is-modal-open");
  refs.body.classList.add("is-modal-close");

  refs.lightboxImg.src = "";
  refs.lightboxImg.alt = "";
  refs.lightboxImg.removeAttribute("data-index");
}

function onClick(e) {
  if (
    e.target === refs.lightboxButtonEl ||
    e.target === refs.lightboxOverlayEl
  ) {
    onCloseModal();
  }

  if (e.target === refs.scrollLeft) {
    onScrollGalleryLeft();
  }

  if (e.target === refs.scrollRight) {
    onScrollGalleryRight();
  }
}

function onKeydown(e) {
  if (e.code === "Escape") {
    onCloseModal();
  }

  if (e.code === "ArrowRight") {
    onScrollGalleryRight();
  }

  if (e.code === "ArrowLeft") {
    onScrollGalleryLeft();
  }
}

function onScrollGalleryRight() {
  let index = Number(refs.lightboxImg.getAttribute("data-index"));

  if (index + 1 === document.querySelectorAll(".gallery__item").length + 1) {
    index = 0;
  }

  let linkEl = document.querySelector(
    `.gallery__image[data-index="${index + 1}"]`
  );

  refs.lightboxImg.src = linkEl.dataset.source;
  refs.lightboxImg.alt = linkEl.alt;
  refs.lightboxImg.getAttribute(`data-index`);
  refs.lightboxImg.dataset.index = index + 1;
}

function onScrollGalleryLeft() {
  let index = Number(refs.lightboxImg.getAttribute("data-index"));

  if (index - 1 === 0) {
    index = 10;
  }

  let linkEl = document.querySelector(
    `.gallery__image[data-index="${index - 1}"]`
  );

  refs.lightboxImg.src = linkEl.dataset.source;
  refs.lightboxImg.alt = linkEl.alt;
  refs.lightboxImg.getAttribute(`data-index`);
  refs.lightboxImg.dataset.index = index - 1;
}

//! privale code

function parallax2() {
  const body = document.querySelector("body");

  if (body.classList.contains("is-active")) {
    const a = document.querySelector(".parallax-2");
    a.style.transitionDelay = "0ms";

    const b = document.querySelector(".gallery-box");
    b.style.transitionDelay = "0ms";
  }
}

function galleryBox() {
  const body = document.querySelector("body");

  if (body.classList.contains("is-active")) {
    const b = document.querySelector(".gallery-box");
    b.style.transitionDelay = "0ms";
  }
}

window.setTimeout(parallax2, 2000);

window.setTimeout(galleryBox, 2500);
