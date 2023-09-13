//fonction qui trie les médias du photographe choisi en fonction du choix de l'utilisateur
async function sortMediaCards() {
  const sortMenu = document.querySelector(".sort-button").innerText;
  const sortedMedia = await getMediaCurrentPhotographer();

  let SortByUserMedias;
    switch (sortMenu) {
      case "Popularité":
        SortByUserMedias = sortedMedia.sort((a,b) => b.likes - a.likes);
        break;
      case "Date":
        SortByUserMedias = sortedMedia.sort((a,b) => b.date - a.date);
        break;
      case "Titre":
        SortByUserMedias = sortedMedia.sort(function(a,b) {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        });
        break;  
      default:
        break;
  }
  //retourne un tableau de médias trié
  return SortByUserMedias;
}

//fonction pour créer des cards en fonction du tableau de médias trié ci-dessus
async function sortedMediasCards() {
    const SortByUserMedias = await sortMediaCards();

    SortByUserMedias.forEach(media => {
      const sortedGallery = galleryTemplate(media);
      sortedGallery.galleryCard();
    });
  }