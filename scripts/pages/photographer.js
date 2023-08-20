   async function displayCurrentPhotographer() {

    const {photographer} = await getCurrentPhotographer()

    const photographerHeader =  photographerTemplate(photographer);
    const photographerHeaderCard = photographerHeader.headerCard ();

    return photographerHeaderCard
  }
  
  async function displayMedia (){
    const { media } = await getPhotographersData();
    const { currentPhotographerid } = await getCurrentPhotographer();

    const sortedMedia = media.filter(media => media.photographerId === currentPhotographerid)

        console.log(sortedMedia)

  }

function init () {
  displayCurrentPhotographer()
  displayMedia()
}

init();