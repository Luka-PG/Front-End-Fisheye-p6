  //on vient nommer les valeurs que l'on va utiliser
function photographerTemplate(data) {
    const { name, portrait, city, country,tagline ,price, id} = data;

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
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}