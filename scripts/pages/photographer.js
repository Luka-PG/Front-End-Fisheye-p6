  // va afficher le photographe sur lequel on à cliqué sur la page index
   async function displayCurrentPhotographer() {
    const {photographer} = await getCurrentPhotographer()

    const photographerHeader =  photographerTemplate(photographer);
    const photographerHeaderCard = photographerHeader.headerCard ();

    return photographerHeaderCard
  }
  
//fonction qui va afficher les médias en fonction de l'option de trie, initialiser la lightbox et le footer de like et le prix du photographe
  async function displayMedia (){
    const main = document.querySelector("main");

    const mediaSection = document.createElement("div");
    mediaSection.classList.add("media-section");

    main.appendChild(mediaSection);

        await sortedMediasCards();
        renderLightbox()
        renderLikeMedia();
  }

// va envoyer le tableau des médias triés en fonction du choix utilisateur à la fonction au dessus pour l'afficher
  async function displaySortedMedias() {
    const options = document.querySelectorAll(".sort-option");
    options.forEach(option => {
      option.addEventListener("click", async () => {
        document.querySelector(".media-section").remove();
        await displayMedia();
      })
    })
  }

//va venir afficher les likes en dessous de chaques card affichés
  async function renderLikeMedia() {
    const medias = document.querySelectorAll(".media-card");
    
    medias.forEach(media => {
      let likesNumber = parseInt(media.querySelector(".media-like-counter").innerText);
      const likeBtn = media.querySelector(".like-icon");
  
      likeBtn.addEventListener("click", () => {
        
        if (!likeBtn.hasAttribute("clicked")) {
          likeBtn.toggleAttribute("clicked");
          likeBtn.classList.toggle("fa-regular");
          likeBtn.classList.toggle("fa-solid");
          likesNumber += 1
          media.querySelector(".media-like-counter").innerText = likesNumber

        } else {

          likeBtn.toggleAttribute("clicked");
          likeBtn.classList.toggle("fa-regular");
          likeBtn.classList.toggle("fa-solid");
          likesNumber -= 1
          media.querySelector(".media-like-counter").innerText = likesNumber

        }
        updateLikes()
      })
    })
  }
  
  // fonction qui permet de mettre à jour le nombre total de like
  function updateLikes() {
    const likes = document.querySelectorAll(".media-like-counter");
    const totalLikes = document.querySelector(".likes");

    let total = 0

    likes.forEach(like => total += parseInt(like.textContent));
    totalLikes.textContent = total
  }

// affichage dans le footer des likes totales des médias du photographe et son prix
  async function renderLikesCounter() {
    const {photographer} = await getCurrentPhotographer();
    const sortedMedia = await getMediaCurrentPhotographer();

    let totalLikes = 0;
      sortedMedia.forEach(media => {
        totalLikes += media.likes
      });

    const likesNb = document.querySelector(".likes");
      likesNb.innerText = totalLikes;

    const price = document.querySelector(".price");
      price.innerText = `${photographer.price}€ / jour`

  }


//SECTION TRIAGE DES MEDIAS

//fonction qui permet de "toggle" le style et l'affichage du menu déroulant de tri des médias en fonction de son ouverture ou non
  function sortOptionsList() {
    const button = document.querySelector(".sort-button");
    const list = document.querySelector(".sort-options");
      button.addEventListener("click", function() {

    const sort = document.querySelector(".sort-select");
      sort.classList.toggle("sort-select-open");

      if (sort.classList.contains("sort-select-open")) {
        button.classList.add("opened");
        button.classList.remove("closed");
        sort.querySelector("span").classList.toggle("fa-caret-up");
        sort.querySelector("span").classList.remove("fa-caret-down");
        list.style.display = "block";
      } 
      else {
        button.classList.remove("opened");
        button.classList.add("closed");
        sort.querySelector("span").classList.toggle("fa-caret-down");
        sort.querySelector("span").classList.remove("fa-caret-up");
        list.style.display = "none";
      }
    })
  }

//gestion de l'affichage du menu lors de la fermeture de celui ci
  function sortOptionsClose() {
    const list = document.querySelector(".sort-options");
    const sort = document.querySelector(".sort-select");

      sort.querySelector("span").classList.add("fa-caret-down");
      sort.querySelector("span").classList.remove("fa-caret-up");
      sort.classList.toggle("sort-select-open");
      list.style.display = "none"
  }

  //gestion des options du menu lors de la fermeture du menu déroulant
  function closeOptionsList() {
    const button = document.querySelector(".sort-button");
    const list = document.querySelector(".sort-options");
    const sort = document.querySelector(".sort-select");

    button.setAttribute("aria-expanded", "false");
    sort.querySelector("span").classList.add("fa-caret-down");
    sort.querySelector("span").classList.remove("fa-caret-up");
    sort.classList.toggle("sort-select-open");
    button.classList.remove("opened");
    button.classList.add("closed");
    list.style.display = "none"
  }

//fonction pour gérer l'event de choix d'une option de tri
  function selectSortingOption() {
    const options = document.querySelectorAll(".sort-option");
    const orderBtn = document.querySelector(".sort-button");

    options.forEach(option => {
      option.classList.remove("sort-hide");
      option.display = "block";
      option.addEventListener("click", (event) => {
  
        orderBtn.innerText = event.target.innerText;
        const arrow = document.createElement("span");
        arrow.classList.add("sort-down", "fa-solid", "fa-caret-down");
        orderBtn.appendChild(arrow);
  
        options.forEach(option => {
          option.style.display = "block";
          option.setAttribute("tabindex", "0")
          option.setAttribute("aria-selected", "false");
        })

        option.classList.add("sort-hide");
        option.setAttribute("aria-selected", "true");
        option.setAttribute("tabindex", "-1")
        option.style.display = "none";
  
        closeOptionsList();
      })
    })
  }
  
  function initOptionsList() {
    sortOptionsList();
    sortOptionsClose();
    selectSortingOption();
  }


// SECTION LIGHTBOX


//fonction pour afficher la lightbox et le média choisi dans la lightbox
  async function renderMedia(mediaId) {
    const SortByUserMedias = await sortMediaCards();
    const lightbox = document.querySelector(".lightbox-Modal");
    const media = SortByUserMedias.find((media) => media.id == mediaId);
    const mediaIndex = SortByUserMedias.findIndex((media) => media.id == mediaId);
    const { title, image, video, photographerId } = media;
    
    mediaLightboxId = mediaId;

    if (media.image) {
      const figure = document.createElement("figure");
        figure.classList.add("lightbox-figure")
  
      const lightboxImg = document.createElement("img");
        lightboxImg.src = `./assets/photographers/${photographerId}/${image}`;
        lightboxImg.alt = `${title} - close-up view`;
        lightboxImg.classList.add("lightbox-photo");
  
      const caption = document.createElement("figcaption");
        caption.classList.add("lightbox-caption");
        caption.innerText = title;

      lightbox.prepend(figure);
        figure.appendChild(lightboxImg);
        figure.appendChild(caption);
          
    } else if (media.video) {
      const figure = document.createElement("figure");
        figure.classList.add("lightbox-figure")
  
      const lightboxVideo = document.createElement("video");
        lightboxVideo.controls = "true";
        lightboxVideo.classList.add("lightbox-video")
   
      const lightboxVideoPath = document.createElement("source");
        lightboxVideoPath.src = `./assets/photographers/${photographerId}/${video}`;
        lightboxVideoPath.type = "video/mp4";
      
      const caption = document.createElement("figcaption");
        caption.classList.add("lightbox-caption");
        caption.innerText = title;

        lightbox.prepend(figure);
          figure.appendChild(lightboxVideo);
          figure.appendChild(caption);
            lightboxVideo.appendChild(lightboxVideoPath);
          
          
    }
    disableLightboxButtons(mediaIndex, SortByUserMedias.length)
  }
  
    //fonction qui vient afficher le média suivant le média actuel et le retourne dans la lightbox
     async function findNextMedia() {
      const SortByUserMedias = await sortMediaCards();
      const currentMedia = SortByUserMedias.find((media) => media.id == mediaLightboxId);
      const currentMediaIndex = SortByUserMedias.indexOf(currentMedia);
    
      if (currentMediaIndex < SortByUserMedias.length - 1) {
        let nextIndex = currentMediaIndex + 1;
        const nextMediaId = SortByUserMedias[nextIndex].id;
        return nextMediaId
      }
    }
    
    // fonction qui retourne l'index précédent l'index du média actuel
    async function findPreviousMedia() {
      const SortByUserMedias = await sortMediaCards();
      const currentMedia = SortByUserMedias.find((media) => media.id == mediaLightboxId);
      const currentMediaIndex = SortByUserMedias.indexOf(currentMedia);
    
      if (currentMediaIndex > 0) {
        let previousIndex = currentMediaIndex - 1;
        const previousMediaId = SortByUserMedias[previousIndex].id;
        return previousMediaId
      }
    }
 
  
  // appel des différentes fonctions nécessaires au bon comportement et à l'affichage de la lightbox lorsque l'on clique sur un média
  async function renderLightbox() {
    const mediaColl = document.querySelectorAll(".media-card");
    const medias = Array.from(mediaColl);

      medias.forEach(media => {
        media.firstChild.addEventListener("click", async () => {
          const mediaId = media.id
          initLightbox();
          renderMedia(mediaId);
          nextMediaWithArrow();
          previousMediaWithArrow();
      })
    })

 // affichage du média suivant au click sur la flèche droite sur le clavier
 const next = document.querySelector(".lightbox-next-media");
 next.addEventListener("click", async () => {
   if (document.querySelector(".lightbox-figure")) {
      document.querySelector(".lightbox-figure").remove()
      const nextId = await findNextMedia()
        renderMedia(nextId);
   }
 })

 // affichage du média précedent au click sur la flèche gauche sur le clavier
 const previous = document.querySelector(".lightbox-previous-media");
 previous.addEventListener("click", async () => {
   if (document.querySelector(".lightbox-figure")) {
      document.querySelector(".lightbox-figure").remove()
      const previousId = await findPreviousMedia()
        renderMedia(previousId);
   }
 })
}

// fonction qui permet à l'utilisateur de passer au média suivant si il y à un média après celui séléctionné en appuyant sur la flèche droite sur le clavier
function nextMediaWithArrow() {
 const lightbox = document.querySelector(".lightbox-Modal");
 const next = document.querySelector(".lightbox-next-media");

 document.addEventListener("keydown", async (event) => {
    if (next.style.display === "block") {
      const code = event.code
      if (lightbox.getAttribute('aria-hidden') == 'false' && code === "ArrowRight") {
        if (document.querySelector(".lightbox-figure")) {
          document.querySelector(".lightbox-figure").remove()
          const nextId = await findNextMedia();
            renderMedia(nextId)
       }
     }
   }
 })
}

// fonction qui permet à l'utilisateur de passer au média précédent si il y à un média après celui séléctionné en appuyant sur la flèche gauche sur le clavier
  function previousMediaWithArrow() {
    const lightbox = document.querySelector(".lightbox-Modal");
    const previous = document.querySelector(".lightbox-previous-media");

    document.addEventListener("keydown", async (event) => {
      if (previous.style.display === "block") {
        const code = event.code
        if (lightbox.getAttribute('aria-hidden') == 'false' && code === "ArrowLeft") {
          if (document.querySelector(".lightbox-figure")) {
            document.querySelector(".lightbox-figure").remove()
            const previousId = await findPreviousMedia();
              renderMedia(previousId)
          }
        }
      }
    })
  }


function init () {
  initOptionsList();
  displayCurrentPhotographer();
  displayMedia();
  displaySortedMedias();
  renderLikesCounter();
}

init();