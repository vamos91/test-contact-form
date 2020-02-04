const nav = document.querySelector('nav');


window.addEventListener('scroll', (event) => {
    if(window.scrollY > 50){
        nav.classList.add('nav-scroll');
    }else{
        nav.classList.remove('nav-scroll');
    }
});