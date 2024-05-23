document.addEventListener('DOMContentLoaded', function() {

    let compteur = 0;
    
    function rotateDisplay(deg){
        let el = document.getElementById('faq_more_V');
        let degree = deg;
        el.style.transform = `rotate(${degree}deg)`;
    }

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
    
    function toggleDisplayWithRotate(elementId, buttonId) {
        let element = document.getElementById(elementId);
        let button = document.getElementById(buttonId);
    
            
        if(buttonId.id === 'faq_more'){
            if (element.style.display === "none") {
                element.style.display = "flex";
                button.textContent = "Voir moins";
                rotateDisplay(180)
            } else {
                element.style.display = "none";
                button.textContent = "Voir plus";
                rotateDisplay(360)
            }
        } else {
            let btn = document.getElementById('faq_more');
            if(element.style.display === 'none'){
                element.style.display = "flex";
                btn.textContent = "Voir moins";
                rotateDisplay(180)
            } else {
                element.style.display = "none";
                btn.textContent = "Voir plus";
                rotateDisplay(360)
            }
        }
    }
    
    document.getElementById('faq_more').addEventListener('click', function(){
        toggleDisplayWithRotate('faq_hidden', 'faq_more')
    })
    
    document.getElementById('faq_more_V').addEventListener('click', function(){
        toggleDisplayWithRotate('faq_hidden', 'faq_more_V')
    })

    document.getElementById("show_num").addEventListener("click",function() {
        toggleDisplay('contact', 'show_num')
    } );

    document.getElementById('see_more').addEventListener('click', function(){
        toggleDisplay('comment_hidden', 'see_more')
    })
    document.getElementById('voir_plus').addEventListener('click', function(){
        toggleDisplay('more_dr','voir_plus')
    })
});