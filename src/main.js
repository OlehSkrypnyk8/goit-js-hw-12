
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {createGallery, clearGallery, showLoader, hideLoader,loadMore, showBtn, hideBtn} from "./js/render-functions.js";

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const defaultPlaceholder = input.placeholder;
form.addEventListener('submit', handleSubmit);
loadMore.addEventListener('click', onLoadMore)

let page = 1;
let currentQuery = "";
const perPage = 15;
let totalPages = 0;


async function handleSubmit(event) {
    event.preventDefault();
    clearGallery();
    hideBtn();
    showLoader();
    const query = form.elements['search-text'].value.trim();
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: "Please enter a search query.",
            position: "topRight",
        });
        hideLoader();
        return;
    }
    currentQuery = query;
    page = 1;
    input.placeholder = "";
    try {
        const data = await getImagesByQuery(query, page);
        const images = data.hits;
        totalPages = Math.ceil(data.totalHits / perPage);
            if (!images || images.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight"
                });
                hideBtn();
                return;
                
            }
            createGallery(images);
            if (page < totalPages) {
                showBtn();
            } else {
                hideBtn();
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight",
                });
            }
        }
    catch (error) {
        iziToast.error({
            title: 'Error',
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight"
        });
        hideBtn();
    } finally {
            hideLoader();
            input.placeholder = defaultPlaceholder;
        }
}
async function onLoadMore() {
    page++
    loadMore.disabled = true;
    showLoader();
    try {
        const data = await getImagesByQuery(currentQuery, page);
        const images = data.hits;
        createGallery(images);
        if (page >= totalPages) {
            hideBtn();
            iziToast.info({
                    message: "You've reached the end of search results.",
                    position: "topRight",
                });
        }
        const card = document.querySelector(".gallery-item");
        if (card)
        {const { height } = card.getBoundingClientRect();
        window.scrollBy({
            left: 0,
            top: height * 2,
            behavior: "smooth"
        })}
        
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: error.message || "Something went wrong",
            position: "topRight"
        });
    } finally {
        hideLoader();
        loadMore.disabled = false;
    }
}










