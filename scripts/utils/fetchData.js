//viens chercher les données de tout les photographes et médias
  async function getPhotographersData() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data;
  }
 
//viens trier les photographes obtenus ci-dessus en fonction de celui choisi
  async function getCurrentPhotographer() {
    const { photographers } = await getPhotographersData();
    const params = (new URL(document.location).searchParams);
    const currentPhotographerid = parseInt(params.get("id"));

    const photographer = photographers.find(photographers => photographers.id === currentPhotographerid);

    return {photographer, currentPhotographerid }
  }

//fonction de trie des médias en fonction du photographe choisi
  async function getMediaCurrentPhotographer() {
    const { media } = await getPhotographersData();
    const { currentPhotographerid } = await getCurrentPhotographer();

    const sortedMedia = media.filter(media => media.photographerId === currentPhotographerid)

    return sortedMedia
  }
