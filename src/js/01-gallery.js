// Add imports above this line
import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

galleryItems.forEach(image => {
  const galleryItemEl = document.createElement('li');
  galleryItemEl.classList.add('gallery__item');
  galleryItemEl.innerHTML = `<a class="gallery__link" href="${image.original}">
   <img
        class="gallery__image"
        src="${image.preview}"
        data-source="${image.original}"
        alt="${image.description}"
    />
    </a>`;
  galleryEl.appendChild(galleryItemEl);
});

const galleryDealer = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
galleryDealer.on('show.SimpleLightbox');
