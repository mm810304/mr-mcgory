export const renderLoader = (parentEl) => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="./../../images/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parentEl.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}

