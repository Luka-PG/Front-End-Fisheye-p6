
function galleryTemplate(sortedMedia) {

    const { title, image, video ,price, likes, photographerId} = sortedMedia;

    const photographPath = `assets/photographers/${photographerId}/${image}`
    const videoPath = `assets/photographers/${photographerId}/${video}`
    const heartButton = `assets/icons/empty-heart.svg`

    console.log(photographerId)

  function galleryCard() {
    
      const gallery = document.querySelector('.media-section');
      // const sorting = document.createElement('div')
      
        const card = document.createElement('div');
        card.setAttribute("class", 'mediaCard');

        let photograph

        if ( video != null ){
            photograph = document.createElement('video');
            photograph.setAttribute("src", videoPath);
            photograph.setAttribute("alt", title);
        } else {
                photograph = document.createElement('img');
                photograph.setAttribute("src", photographPath);
                photograph.setAttribute("alt", title);
            //  photograph.setAttribute(""onclick", function(lightbox) )
        }
        const cardInfo = document.createElement ('div');
        cardInfo.setAttribute("class", 'cardInfo');

            const titles = document.createElement('p');
            titles.textContent = title;

        const likeSection = document.createElement('div');
        likeSection.setAttribute("class", 'likeSection');

                const likeCounter = document.createElement('span');
                likeCounter.textContent = likes;
            
            const likeButton = document.createElement('span');
        //  likeButton.setAttribute("onclick", function() );
            likeButton.setAttribute("class", 'likeButton');
            likeButton.setAttribute("arial-label", "bouton J'aime");
            
                const likeIcon = document.createElement('img');
                likeIcon.setAttribute("src", heartButton );
                likeIcon.setAttribute("class", 'likeIcon');

        gallery.appendChild(card)
          card.appendChild(photograph);
          card.appendChild(cardInfo);
            cardInfo.appendChild(titles);
            cardInfo.appendChild(likeSection)
                likeSection.appendChild(likeCounter);
                likeSection.appendChild(likeButton);
                likeButton.appendChild(likeIcon);

    }
    return  galleryCard()
}