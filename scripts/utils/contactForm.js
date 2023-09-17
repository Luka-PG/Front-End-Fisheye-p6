/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// fonction qui affiche le modal de contact et empêche la navigation au clavier des éléments cachés lorsque le modal est actif
function displayModal() {
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const modal = document.querySelector(".contact-modal");
    const buttonsMain = main.querySelectorAll("button");
    const a = document.querySelector("a");
    const mediaButtons = document.querySelectorAll(".media-btn");
  
    modal.style.display = "block";
    body.classList.add("no-scroll");
    main.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    header.setAttribute("aria-hidden", "true");
    a.setAttribute("tabindex", "-1");
    footer.setAttribute("aria-hidden", "true");

    buttonsMain.forEach(function(button) {
        button.setAttribute("tabindex", "-1");
      });

      mediaButtons.forEach(function(button) {
        button.setAttribute("tabindex", "-1");
    });
}

// ferme le modal de contact et réactive la navigation au clavier sur le éléments précédemment cachés
function closeModal() {
    const modal = document.querySelector(".contact-modal");
    const buttonsMain = main.querySelectorAll("button");
    const a = document.querySelector("a");
    const mediaButtons = document.querySelectorAll(".media-btn");
  
    modal.style.display = "none";
    body.classList.remove("no-scroll");
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    a.setAttribute("tabindex", "0");
  
    buttonsMain.forEach(function(button) {
        button.setAttribute("tabindex", "0");
    });

    mediaButtons.forEach(function(button) {
          button.setAttribute("tabindex", "0");
    });

}

//fonction pour fermer le modal en appuyant sur la touche "échap" du clavier
function closeModalOnEsc() {
    const modal = document.querySelector(".contact-modal");

    document.addEventListener('keydown', event => {
        const code = event.code;
        if (modal.getAttribute('aria-hidden') == 'false' && code === "Escape") {
            closeModal();
        }
    });
}

//fonction pour envoyer les informations rentrés dans la console lors du "submit" du form
function submitContactForm() {
    const form = document.querySelector(".form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const firstName = document.getElementById("prenom");
        const lastName = document.getElementById("nom");
        const email = document.getElementById("e-mail");
        const message = document.getElementById("message");

        console.log({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            message: message.value
        });
        form.reset();
        closeModal();
    });
}


function initFormUtils() {
    closeModalOnEsc();
    submitContactForm();
}

initFormUtils();