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

// goods

const more = document.querySelector('.more');
const navigationLinks = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async () => {
	const result = await fetch('db/db.json');
	if(!result){
		throw `Error ${result.status}`
	}
	return result.json();
}

getGoods().then(data => {
	console.log(data);
});

const createCard = ({id,img,name,label,description,price,category,gender}) => {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
	card.innerHTML = `
		<div class="goods-card">
			${label ? `<span class="label">${label}</span>`: ''}
			<img src="db/${img}" alt="image: ${name}" class="goods-image">
			<h3 class="goods-title">${name}</h3>
			<p class="goods-description">${description}</p>
			<button class="button goods-card-btn add-to-cart button-dark" data-id="${id}">
				<span class="button-price">$${price}</span>
			</button>
		</div>`;
	return card;
}

const renderCards = data => {
	longGoodsList.textContent = '';
	const cards = data.map(createCard);
	longGoodsList.append(...cards);
	document.body.classList.add('show-goods');
}


more.addEventListener('click', e => {
	e.preventDefault();
	getGoods().then(renderCards);
});


// filter
const filterCards = (field, value) => {
	getGoods()
	.then(data => data
		.filter(good => good[field] === value))
	.then(renderCards);

}

navigationLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();
		navigationLinks.forEach(link => link.classList.remove('current-link'));
		link.classList.add('current-link');
		if(link.textContent === 'All'){
			getGoods().then(renderCards);
		}else{
			const field = link.dataset.field;
			const value = link.textContent;
			filterCards(field, value);			
		}
	});
});