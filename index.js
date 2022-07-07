import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'


const nestedSliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    direction: 'vertical'
}

const swiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
    },

    keyboard: true,
    centeredSlides: true,
    history: {
        enabled: true,
        root: "http://localhost:3000",
        key: "pagina"
    },
    on: {
        init: (swiper) => {
            swiper.activeIndex === 0 ? document.body.classList.add('inici') : document.body.classList.remove('inici');
        }
    }
})

swiper.on('slideChange', (swiper) => {
    swiper.activeIndex === 0 ? document.body.classList.add('inici') : document.body.classList.remove('inici');
})

document.querySelectorAll('.navlink').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        swiper.slideTo(link.dataset.slide);
    })
})

function isIOSDevice() {
    return !!navigator.userAgent && /iPad|iPhone|iPod/.test(navigator.userAgent);
}

window.docModal = document.querySelector('#docView');
window.docTitle = document.querySelector('#docTitle');
window.docFrame = document.querySelector('#docframe');
window.openPDF = "";

window.closeModal = () => {
    window.docModal.classList.remove('is-active');
}

document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button').forEach(($close) => {
    $close.addEventListener('click', () => {
        window.closeModal();
    })
});

window.openModal = (docName, docTitle) => {
    if (isIOSDevice()) {
        window.openPDF = docName;
        window.open(`${window.location.origin}/docs/${docName}.pdf`, '_blank');
    } else {
        window.docModal.classList.add('is-active');
        window.docTitle.innerHTML = docTitle;
        window.docFrame.src = `${window.location.origin}/docs/${docName}.pdf`;
    }
}