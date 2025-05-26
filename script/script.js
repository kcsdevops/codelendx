// ANIMAÇÕES
const animarOnScroll = () => {
    const elementos = document.querySelectorAll('[data-animar]');
    elementos.forEach(el => {
        const posicao = el.getBoundingClientRect().top;
        const alturaTela = window.innerHeight * 0.85;
        if (posicao < alturaTela && posicao > -el.offsetHeight) {
            el.classList.add('ativo');
        } else {
            el.classList.remove('ativo');
        }
    });
};

window.addEventListener('scroll', animarOnScroll);
window.addEventListener('load', animarOnScroll);

// MENU HAMBÚRGUER
const btnHamburguer = document.querySelector('.hamburguer');
const menu = document.querySelector('.menu');

btnHamburguer.addEventListener('click', () => {
    btnHamburguer.classList.toggle('ativo');
    menu.classList.toggle('ativo');

    const isExpanded = btnHamburguer.getAttribute('aria-expanded') === 'true';
    btnHamburguer.setAttribute('aria-expanded', !isExpanded);
});

const linksMenu = document.querySelectorAll('.menu a');

linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        btnHamburguer.classList.remove('ativo');
        menu.classList.remove('ativo');
        btnHamburguer.setAttribute('aria-expanded', 'false');
    });
});

//LOADING
const botaoVerMais = document.querySelector('.botao-vermais');

botaoVerMais.addEventListener('click', (e) => {
    e.preventDefault();
    const url = botaoVerMais.href;

    const textoOriginal = botaoVerMais.textContent;

    botaoVerMais.textContent = '';
    const spinner = document.createElement('span');
    spinner.classList.add('spinner');
    botaoVerMais.appendChild(spinner);

    botaoVerMais.style.pointerEvents = 'none';
    botaoVerMais.style.opacity = '0.7';

    setTimeout(() => {
        window.open(url, '_blank');
        botaoVerMais.textContent = textoOriginal;
        botaoVerMais.style.pointerEvents = 'auto';
        botaoVerMais.style.opacity = '1';
    }, 1500);
});

//CARROSSEL
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const btnPrev = document.querySelector('.carousel-btn.prev');
    const btnNext = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    const moveToSlide = (index) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${slideWidth * index}px)`;
        currentIndex = index;
    };

    btnPrev.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(newIndex);
    });

    btnNext.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % slides.length;
        moveToSlide(newIndex);
    });

    moveToSlide(0);

    window.addEventListener('resize', () => {
        moveToSlide(currentIndex);
    });
});

