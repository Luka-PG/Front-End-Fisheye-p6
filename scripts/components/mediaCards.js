/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

//template de carde pour afficher les medias
function galleryTemplate(sortedMedia) {

    const {id, title, image, video ,price, date, likes, photographerId} = sortedMedia;

    const photographPath = `assets/photographers/${photographerId}/${image}`;
    const videoPath = `assets/photographers/${photographerId}/${video}`;
    const iconeVideo = `assets/icons/Video.svg`;

  function galleryCard() {

    const gallery = document.querySelector('.media-section');
     
        const card = document.createElement('article');
        card.classList.add( 'media-card');
        card.id = id;
        let photograph;

        if ( video ){
            photograph = document.createElement('video');
                photograph.setAttribute("src", videoPath);
                photograph.setAttribute("alt", title);
                photograph.classList.add( 'media-video');

            videoIcon = document.createElement('img');

                videoIcon.setAttribute("src", iconeVideo);
                videoIcon.setAttribute("alt", 'ce média est une vidéo');
                videoIcon.classList.add( 'video-icon');

            const button = document.createElement("button");
                    button.classList.add("media-btn");
                    button.setAttribute("aria-label", `${title} - vue agrandie de la vidéo`);

            card.appendChild(button);
                button.appendChild(videoIcon);
                button.appendChild(photograph);
            
        } else if ( image ) {
            photograph = document.createElement('img');
                photograph.classList.add( 'media-img');
                photograph.setAttribute("src", photographPath);
                photograph.setAttribute("alt", title);

            const button = document.createElement("button");
                button.classList.add("media-btn");
                button.setAttribute("aria-label", `${title} - vue agrandie de la photo`);

            card.appendChild(button);
                button.appendChild(photograph);

        }
        const cardInfo = document.createElement ('div');
            cardInfo.classList.add( 'card-info');

            const titles = document.createElement('p');
                titles.textContent = title;

        const likeSection = document.createElement('div');
            likeSection.classList.add( 'like-section');

                const likeCounter = document.createElement('p');
                    likeCounter.classList.add( 'media-like-counter');
                    likeCounter.textContent = likes;
            
            const likeButton = document.createElement('div');
                likeButton.classList.add( 'like-button');
                likeButton.setAttribute("arial-label", `bouton J'aime de la photo ${title}`);
        
            
                const likeIcon = document.createElement('span');
                    likeIcon.classList.add('fa-regular', 'fa-heart', 'like-icon');
                    likeIcon.setAttribute("aria-label", "icône j'aime");


        gallery.appendChild(card);
          card.appendChild(cardInfo);
            cardInfo.appendChild(titles);
            cardInfo.appendChild(likeSection);
                likeSection.appendChild(likeCounter);
                likeSection.appendChild(likeButton);
                likeButton.appendChild(likeIcon);

    }
    return { title, likes, date, galleryCard };
}