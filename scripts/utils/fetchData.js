async function getPhotographersData() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    const { photographers, media} = data
    return { photographers, media };
  }






