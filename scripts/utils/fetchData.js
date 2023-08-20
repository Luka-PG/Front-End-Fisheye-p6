
  async function getPhotographersData() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data;
  }
 
  async function getCurrentPhotographer() {

    const { photographers } = await getPhotographersData();
    const params = (new URL(document.location).searchParams);
    const currentPhotographerid = parseInt(params.get("id"));

    const photographer = photographers.find(photographers => photographers.id === currentPhotographerid);

    return {photographer, currentPhotographerid }
  }


