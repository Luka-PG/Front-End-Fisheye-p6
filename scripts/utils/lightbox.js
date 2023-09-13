const body = document.querySelector("body");
const main = document.querySelector("main");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const lightboxModal = document.querySelector(".lightbox-Modal");
const mainButtons = main.querySelectorAll("button");
const a = document.querySelector("a");

// la fonction va venir afficher la lightbox en passant son aria-hidden à false et celui du reste de la page en aria-hidden true pour que ça ne soit pas pris en compte par les lecteurs d'écran, on passe aussitous les élements extérieurs à la modale en tabindex = -1 afin de ne pas pouvoir naviguer dessus à l'aide du clavier lorsque la modale est active
function renderLightboxModal() {
  main.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "true");
  footer.setAttribute("aria-hidden", "true");
  a.setAttribute("aria-hidden", "true");
  a.setAttribute("tabindex", "-1");

  const mediaButtons = document.querySelectorAll(".media-btn");
    mediaButtons.forEach(function(button) {
      button.setAttribute("tabindex", "-1");
    });

  const formButton = document.querySelector(".contact-button");
    formButton.setAttribute("tabindex", "-1")
    mainButtons.forEach(function(button) {
      button.setAttribute("tabindex", "-1");
    });

  lightboxModal.setAttribute("aria-hidden", "false");
    lightboxModal.style.display = "flex";
    body.classList.add("no-scroll");
  const close = document.querySelector(".lightbox-close");
  close.focus();
}

// fonction inverse à la précédente, on repasse toute la page en aria-hidden false pour pouvoir lire avec des lecteurs audio, et on la repasse en tabindex = 0 pour qu'on puisse de nouveau naviguer au clavier 
function closeLightboxModal() {
  main.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "false");
  footer.setAttribute("aria-hidden", "false");
  a.setAttribute("aria-hidden", "false");
  a.setAttribute("tabindex", "0");

  const mediaButtons = document.querySelectorAll(".media-btn");
    mediaButtons.forEach(function(button) {
      button.setAttribute("tabindex", "0");
    });
  const formButton = document.querySelector(".contact-button");
    formButton.setAttribute("tabindex", "0")
    mainButtons.forEach(function(button) {
      button.setAttribute("tabindex", "0");
    });

    body.classList.remove("no-scroll");
    lightboxModal.setAttribute("aria-hidden", "true");
    lightboxModal.style.display = "none";
}

// appel de la fonction closeLightboxModal() au click sur le bouton de fermeture, et on en profite pour vider le contenu de la lightbox pour ne pas avoir plusieurs images d'affichés à la prochaine ouverture de lightbox
function closeLightboxOnClick() {
  const closeBtn = document.querySelector(".lightbox-close");
  closeBtn.addEventListener("click", function() {
    const lightboxFigure = document.querySelector(".lightbox-figure");
    if (lightboxFigure) {lightboxFigure.remove()}
      closeLightboxModal();
    })
}

//possibilité de fermer le modal de lightbox avec le bouton "échap" du clavier
function closeLightboxWithEsc() {
  document.addEventListener('keydown', event => {
      const code = event.code
      if (lightboxModal.getAttribute('aria-hidden') == 'false' && code === "Escape") {
        const lightboxFigure = document.querySelector(".lightbox-figure");
        if (lightboxFigure) {lightboxFigure.remove()}
        closeLightboxModal()
      }
  })
}

//cette fonction va venir désactiver les boutons "suivant" et "précedent" lorsque l'on arrive au début du tableau de médias ou à la fin
function disableLightboxButtons(index, mediasLength) {
  const previous = document.querySelector(".lightbox-previous-media");
  const next = document.querySelector(".lightbox-next-media");
  if (index === 0) {
    previous.style.display = "none";
    next.style.display = "block";
  } else if (index === mediasLength -1) {
    next.style.display = "none";
    previous.style.display = "block";
  } else {
    next.style.display = "block";
    previous.style.display = "block";
  }
}

function initLightbox(){
  disableLightboxButtons()
  renderLightboxModal();
  closeLightboxOnClick();
  closeLightboxWithEsc();
}


