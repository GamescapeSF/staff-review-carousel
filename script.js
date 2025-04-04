$(document).ready(function () {
	const $slider = $('.slider');
	const data = [
		{ title: "Card One", image: "https://via.placeholder.com/200", link: "#" },
		{ title: "Card Two", image: "https://via.placeholder.com/200", link: "#" },
		{ title: "Card Three", image: "https://via.placeholder.com/200", link: "#" },
		{ title: "Card Four", image: "https://via.placeholder.com/200", link: "#" },
	];

	function createSkeletonSlide() {
		return `
			<div class="slide">
				<div class="card">
					<div class="card-image skeleton-box"></div>
					<div class="card-title skeleton-text"></div>
				</div>
			</div>
		`;
	}

	function loadSkeletons(count = data.length) {
		for (let i = 0; i < count; i++) {
			$slider.append(createSkeletonSlide());
		}
	}

	// STEP 1: Add skeletons immediately
	loadSkeletons(data.length);

	// STEP 2: Init Slick AFTER skeletons are in
	$('.slider').slick({
		infinite: true,
		speed: 600,
		autoplay: true,
		autoplaySpeed: 8000,
		centerMode: true,
		centerPadding: '0px', // REMOVE extra spacing here
		arrows: true,
		dots: true,
		mobileFirst: true,
		slidesToShow: 1,
		responsive: [
		  { breakpoint: 640, settings: { slidesToShow: 2 } },
		  { breakpoint: 768, settings: { slidesToShow: 3 } }
		],
		prevArrow: `
		<button type="button" class="slick-prev custom-arrow">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
				<path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
			</svg>
		</button>
	`,
	nextArrow: `
		<button type="button" class="slick-next custom-arrow">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
				<path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/>
			</svg>
		</button>
	`
	});

	// STEP 3: Replace skeletons with real content after timeout
	setTimeout(() => {
		$slider.slick('slickRemove', null, null, true); // Clear all skeletons

		data.forEach(item => {
			const slideHTML = `
				<div class="slide">
					<a href="${item.link}" class="card">
						<div class="card-image">
						<img src="${item.image}" alt="${item.title}" />
						</div>
						<div class="card-title">${item.title}</div>
					</a>
				</div>
			`;
			$slider.slick('slickAdd', slideHTML);
		});
	}, 3000); // Wait 3 seconds
});
