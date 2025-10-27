
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const galleryContainer = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });


export function createGallery(images) {
    const markup = images.map(image => `
        <li class="gallery-item">
            <div>
                <a class="gallery-link" href="${image.largeImageURL}">
                <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width=450 height=300 />
                <div class="gallery-info">
                    <p class="gallery-text"> <span class ="span-text">Likes</span> ${image.likes}</p>
                    <p class="gallery-text"> <span class ="span-text">Views</span> ${image.views}</p>
                    <p class="gallery-text"> <span class ="span-text">Comments</span> ${image.comments}</p>
                    <p class="gallery-text"> <span class ="span-text">Downloads</span> ${image.downloads}</p>
                </div>
            </div>
        </li>
    `).join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryContainer.innerHTML = "";
}

export function showLoader() {
    loader.classList.remove('hidden');
}

export function hideLoader() {
    loader.classList.add('hidden');
}
