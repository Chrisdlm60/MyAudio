let compteur = 0;

let selectedDoctor = "";

function toggleDisplay(elementId, buttonId) {
    let element = document.getElementById(elementId);
    let button = document.getElementById(buttonId);
    
    if(elementId == 'contact') {
        if (element.style.display === "none") {
            element.style.display = "block";
            button.textContent = "Cacher le numéro";
            compteur++;
            console.log(compteur)
        } else {
            element.style.display = "none";
            button.textContent = "Afficher le numéro";
        }
    } else {
        if (element.style.display === "none") {
            element.style.display = "flex";
            button.textContent = "Voir moins";
        } else {
            element.style.display = "none";
            button.textContent = "Voir plus";
        }
    }
}

function doctorInfo() {
    const drName = this.getAttribute('data-name');

    selectedDoctor = drName;
}

document.getElementById("show_num").addEventListener("click",function() {
    toggleDisplay('contact', 'show_num')
} );

document.getElementById('see_more').addEventListener('click', function(){
    toggleDisplay('comment_hidden', 'see_more')
})
document.getElementById('voir_plus').addEventListener('click', function(){
    toggleDisplay('more_dr','voir_plus')
})
document.getElementById('faq_more').addEventListener('click', function(){
    toggleDisplay('faq_hidden','faq_more')
})

document.addEventListener("DOMContentLoaded", function() {
    let cardLinks = document.querySelectorAll('.card-link');
    let drInfo = document.getElementById('dr_info');
    let drName = drInfo.querySelector('h3');
    let drSpeciality = drInfo.querySelectorAll('p')[1]; 
    let drImage = document.getElementById('img_profil');

    let showDiv = document.getElementById('info-dr');

    cardLinks.forEach(function(cardLink) {
        cardLink.addEventListener('click', function(event) {
            event.preventDefault();

            cardLinks.forEach(function(link) {
                link.classList.remove('active');
            });

            this.classList.add('active');

            document.querySelectorAll('.focused').forEach(function(card) {
                card.classList.remove('focused');
            });

            var card = this.closest('.card-link').querySelector('.card');
            if (card) {
                card.classList.add('focused');
            } else {
                console.log("Aucun élément '.card' trouvé à l'intérieur de '.card-link'");
            }

            drName.textContent = this.getAttribute('data-name');
            drSpeciality.textContent = this.getAttribute('data-speciality');
            drImage.src = this.querySelector('img').src;

            showDiv.style.display = "grid";
        });
    });
});
