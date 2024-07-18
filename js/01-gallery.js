import { galleryItems } from "./gallery-items.js";
// В файле gallery-items.js есть массив galleryItems, который содержит объекты с информацией о изображениях: маленькое (превью), оригинальное (большое) и описание. Мы уже подключили его к каждому из JS-файлов проекта.

// Задание 1 - галерея изображений
// Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. Посмотри демо видео работы галереи.
// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:
// 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// 2. Реализация делегирования на ul.gallery и получение url большого изображения.
// 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// 4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// 5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.
// Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox есть метод для программного закрытия модального окна.

const container = document.querySelector(".gallery");

function makeMarkup(arr) {
  return arr
    .map(
      ({ description, original, preview }) => `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    /></a></li>`
    )
    .join("");
}

container.insertAdjacentHTML("beforeend", makeMarkup(galleryItems));

container.addEventListener("click", onClick);

function onClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const item = event.target.alt;

  onOpenModal(item);
}

function onOpenModal(item) {
  const currentItem = galleryItems.find(
    ({ description }) => description === item
  );

  const instance = basicLightbox.create(
    `<img width="1400" height="900" src="${currentItem.original}">`,
    {
      onClose: () => {
        document.body.removeEventListener("keydown", onEscapePress);
      },
    }
  );
  instance.show();

  document.body.addEventListener("keydown", onEscapePress);

  function onEscapePress(evt) {
    const visible = basicLightbox.visible();
    if (evt.code === "Escape" && visible) {
      instance.close();
      console.log(evt.code);
    }
  }
}
