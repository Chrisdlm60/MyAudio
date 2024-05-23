
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
