const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

// cart
const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');

const openModal = () => {
	modalCart.classList.add('show');
	document.body.classList.add('hidden');
}

const removeModal = () => {
	modalCart.classList.remove('show');
	document.body.classList.remove('hidden');
}

buttonCart.addEventListener('click', openModal);
modalClose.addEventListener('click', removeModal);

modalCart.addEventListener('click', (e) => {
	if(!e.target.closest('.modal')){
		removeModal();
	}
});

// scroll smooth
const scrollLink = document.querySelectorAll('a.scroll-link');

scrollLink.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const id = link.getAttribute('href');
		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
});