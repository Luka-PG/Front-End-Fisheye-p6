
//on vient placer la template de portrait dans la section ou les photographes vont apparaître
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes et on display
    const { photographers } = await getPhotographersData();
    displayData(photographers);
}

init();

