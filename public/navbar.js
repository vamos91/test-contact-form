const nav = document.querySelector('nav');
const totop = document.querySelector('.totop');
const toBottom = document.querySelector('.header-button .contact');
const toBottom2 = document.querySelector('.contact');
const body = document.querySelector('body');
const card = document.querySelector('.wrapper-card');
const toFormation = document.querySelector('.header-button .b1');
const arrayOfLink = document.querySelectorAll('.dropdown-menu a');
const arrayOfCard = document.querySelectorAll('.card-body a');


window.addEventListener('scroll', (event) => {
    if(window.scrollY > 50){
        nav.classList.add('nav-scroll');
        totop.style.display = 'block';
    }else{
        nav.classList.remove('nav-scroll');
        totop.style.display = 'none';
    }
});

totop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});

toBottom.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
        top: body.scrollHeight,
        behavior: 'smooth'
    });
});

toBottom2.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
        top: body.scrollHeight,
        behavior: 'smooth'
    });
});

arrayOfLink.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        card.scrollIntoView({behavior: "smooth"});
    });
});

toFormation.addEventListener('click', (event) => {
    event.preventDefault();
    card.scrollIntoView({behavior: "smooth"});
});

arrayOfCard.forEach((card) => {
    card.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({
            top: body.scrollHeight,
            behavior: 'smooth'
        });
    });
});


//-------------------------------------------


