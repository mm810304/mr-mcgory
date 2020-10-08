const Nasa = {
    app() {
        const resultsNav = document.getElementById('resultsNav');
        const favoritesNav = document.getElementById('favoritesNav');
        const imagesContainer = document.querySelector('.nasa__images-container');
        const saveConfirmed = document.querySelector('.nasa__save-confirmed');
        const loader = document.querySelector('.nasa__loader');
        const favoriteLink = document.getElementById('favorite-link');
        const getMoreImagesLink = document.getElementById('get-more-images-link');
        const getMoreImagesLinkTwo = document.getElementById('get-more-images-link-two');

        let resultsArray = [];
        let favorites = {};

        window.saveFavoriteNasa = saveFavoriteNasa;
        window.removeFavoriteNasa = removeFavoriteNasa;

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
                    saveText.setAttribute('onclick', `saveFavoriteNasa('${result.url}')`);
                } else {
                    saveText.textContent = 'Remove From Favorites';
                    saveText.setAttribute('onclick', `removeFavoriteNasa('${result.url}')`); 
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
          
            const rawData = await fetch(`https://mrmcgory.com/get-nasa-data`, {
                headers: {
                    Accept: 'application/json'
                }
            });

            console.log('Front end after getting raw data but not changing to json')

            const nasaData = await rawData.json();
            console.log('after changing to json')
            resultsArray = nasaData;
            console.log('after putting in results array')
            updateDOM('results');
            
        };

        function saveFavoriteNasa(itemUrl) {
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
    
        function removeFavoriteNasa(itemUrl) {
            if (favorites[itemUrl]) {
                delete favorites[itemUrl];
                localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
                updateDOM('favorites');
            }
        };

        getNasaPictures();

        favoriteLink.addEventListener('click', () => {
            console.log('clicked');
            updateDOM('favorites');
        });
        getMoreImagesLink.addEventListener('click', getNasaPictures);
        getMoreImagesLinkTwo.addEventListener('click', getNasaPictures);

    }
}

Nasa.id = 'nasa';
export default Nasa;