

  async function getPhotographersById() {

    const { photographers } = await getPhotographersData();
    const params = (new URL(document.location).searchParams);
    const id = parseInt(params.get("id"));
  
    const photographer = photographers.find(photographers => photographers.id === id);
    const headerSection = document.querySelector (".photograph-header");
    const photographerHeader =  photographerTemplate(photographer);
    const photographerHeaderCard = photographerHeader.headerCard ();

    headerSection.appendChild(photographerHeaderCard);

    return photographerHeaderCard
  }
  

  console.log (getPhotographersById())




