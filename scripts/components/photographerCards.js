  //on vient nommer les valeurs que l'on va utiliser
function photographerTemplate(data) {
    const { name, portrait, city, country,tagline ,price, id} = data;
    console.log(data)
    // fetch du portrait en fonction du photographe
    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    //établissement de la template que l'on va utiliser pour chaque photographe
    function getUserCardDOM() {
      
        const article = document.createElement( 'article' );
        article.setAttribute( "href", id )

            const img = document.createElement( 'img' );
              img.setAttribute("src", picture)
              img.setAttribute("alt", name)

          const a = document.createElement('a')
            a.setAttribute('href', './photographer.html' + `?id=${id}`)
            a.setAttribute("aria-label", `lien vers le portfolio de ${name}`);

            const names = document.createElement( 'h2' );
              names.textContent = name;

            const cities = document.createElement( 'h3' )
              cities.textContent = city + ', ' + country;

            const taglines = document.createElement( 'h4' )
              taglines.textContent = tagline;

            const prices = document.createElement( 'p' )
              prices.textContent = price + '€/jour'

        article.appendChild(a)
          a.appendChild(img);
          a.appendChild(names);
            article.appendChild(cities);
            article.appendChild(taglines);
            article.appendChild(prices);

        return (article);
    }
    
    function headerCard () {
 
      const article = document.querySelector( '.photograph-header' );
     
        const description = document.createElement('div')
          description.setAttribute("class", 'description')

        const names = document.createElement( 'h1' );
          names.textContent = name
   
        const cities = document.createElement( 'h2' )
          cities.textContent = city + ', ' + country;
  
        const taglines = document.createElement( 'p' )
          taglines.textContent = tagline;
  
        const contactButton = document.createElement ( 'button' )
          contactButton.textContent = 'Contactez-moi';
          contactButton.setAttribute("aria-label", `Contacter ${name}`);
          contactButton.setAttribute("class", 'contact_button')
          contactButton.setAttribute ("onclick", "displayModal()")
  
        const img = document.createElement( 'img' );
          img.setAttribute("src", picture)
          img.setAttribute("alt", name)
      
      article.appendChild(description)
        description.appendChild(names)
        description.appendChild(cities)
        description.appendChild(taglines)
      article.appendChild(contactButton);
      article.appendChild(img)
  
    return (article);
  
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM, headerCard}
}


//const photographerHeader = `
//<div class="photographer__info" aria-label="Photographer informations" role="presentation">
//    <h2 class="photographer__name photographer__name--doubled">${name}</h2>
//        <p class="photographer__location photographer__location--doubled">${city}, ${country}</p>
 //       <p class="photographer__tagline photographer__tagline--doubled">${tagline}</p>
//</div>
//<button class="contact__button button" aria-label="contact ${name}">Contactez-moi</button>
//<img src="./ressources/assets/photographers/${portrait}.webp" alt="${name}" class="photographer__img" aria-label="picture of ${name}">
//`
//return photographerHeader