const Nasa = {
    app() {
        const resultsNav = document.getElementById('resultsNav');
        const favoritesNav = document.getElementById('favoritesNav');
        const imagesContainer = document.querySelector('.nasa__images-container');
        const saveConfirmed = document.querySelector('.nasa__save-confirmed');
        const loader = document.querySelector('.nasa__loader');

        const count = 10;
        const API_KEY = 'D0yF2LJ6lgNBX6gxEspKVLiqPAJEVlX3pUZhKJ9a';
        console.log(API_KEY);
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`;

        let resultsArray = [];
        let favorites = {};

        function showContent(page) {
            window.scrollTo({ top: 0, behavior: 'instant'});
            if (page === 'results') {
                resultsNav.classList.remove('hidden');
                favoritesNav.classList.add('hidden');
            } else if (page === 'favorites') {
                resultsNav.classList.add('hidden');
                favoritesNav.classList.remove('hidden');
            }
            loader.classList.add('hidden');
        }

        function createDOMNodes(page) {
            const currentArray = page === 'results' ? resultsArray : Object.values(favorites);

            currentArray.forEach((result) => {
                const card = document.createElement('div');
                card.classList.add('nasa__card');

                const link = document.createElement('a');
                link.href = result.hdurl;
                link.title = 'View Full Image';
                link.target = '_blank';

                const image = document.createElement('img');
                image.src = result.url;
                image.alt = 'NASA Picture of the Day';
                image.loading = 'lazy';
                image.classList.add('nasa__card-img-top');

                const cardBody = document.createElement('div');
                cardBody.classList.add('nasa__card-body');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('nasa__card-title');
                cardTitle.textContent = result.title;

                const saveText = document.createElement('p');
                saveText.classList.add('nasa__clickable');
                if (page === 'results'){
                    saveText.textContent = 'Add to Favorites';
                    saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
                } else {
                    saveText.textContent = 'Remove From Favorites';
                    saveText.setAttribute('onclick', `removeFavorite('${result.url}')`); 
                }

                const cardText = document.createElement('p');
                cardText.textContent = result.explanation;

                const footer = document.createElement('small');
                footer.classList.add('nasa__text-muted');
                
                const date = document.createElement('strong');
                date.textContent = result.date;

                const copyrightResult = result.copyright === undefined ? '' : result.copyright;
                const copyright = document.createElement('span');
                copyright.textContent = ` ${copyrightResult}`;

                footer.append(date, copyright);
                cardBody.append(cardTitle, saveText, cardText, footer);
                link.appendChild(image);
                card.append(link, cardBody);
                imagesContainer.appendChild(card);
            });
        }

        function updateDOM(page) {
            if (localStorage.getItem('nasaFavorites')) {
                favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
            }
            imagesContainer.textContent = '';
            createDOMNodes(page);
            showContent(page);
        };

        async function getNasaPictures() {
            loader.classList.remove('hidden');
            try {
                const response = await fetch(apiUrl);
                resultsArray = await response.json();
                updateDOM('results');
            } catch(error) {
            console.log(error);
            }
        };

        function saveFavorite(itemUrl) {
            resultsArray.forEach((item) => {
                if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
                    favorites[itemUrl] = item;
                    saveConfirmed.hidden = false;
                    setTimeout(() => {
                        saveConfirmed.hidden = true;
                    }, 3000);
                    localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
                }  
            });
        };

        function removeFavorite(itemUrl) {
            if (favorites[itemUrl]) {
                delete favorites[itemUrl];
                localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
                updateDOM('favorites');
            }
        };
        getNasaPictures();
    }
}

Nasa.id = 'nasa';
export default Nasa;