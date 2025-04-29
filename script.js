import { getReviewsByMonthYear } from "./app.js";

$(document).ready(function () {
	const $slider = $('.slider');
	const now = new Date();
	const month = now.getMonth() + 1;
	const displayMonth = now.getMonth()
	const year = now.getFullYear();

	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	const formattedMonth = monthNames[displayMonth].toUpperCase();
	$('#month-title').text(`${formattedMonth}'S STAFF REVIEWS`);

	function getResponsiveSettings(cardCount) {
		const breakpoints = [
			{ breakpoint: 1024, slides: 3 },
			{ breakpoint: 768, slides: 2 },
			{ breakpoint: 640, slides: 1 }
		];
	
		return breakpoints
			.filter(bp => cardCount >= bp.slides)
			.map(bp => ({
				breakpoint: bp.breakpoint,
				settings: {
					slidesToShow: bp.slides
				}
			}));
	}

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

	function loadSkeletons(count) {
		for (let i = 0; i < count; i++) {
			$slider.append(createSkeletonSlide());
		}
	}

	// STEP 1: Load basic placeholders
	loadSkeletons(3); // just default 3 skeletons to begin

	// STEP 2: Init Slick with basic config — no need for `data.length` yet
	$slider.slick({
		infinite: true,
		speed: 600,
		autoplay: true,
		autoplaySpeed: 8000,
		centerMode: true,
		centerPadding: '0px',
		dots: true,
		mobileFirst: true,
		responsive: [
			{
			  breakpoint: 1440,
			  settings: {
				arrows: true,
				slidesToShow: 3,
				slidesToScroll: 3,
			  },
			},
			{
			  breakpoint: 1024,
			  settings: {
				arrows:true,
				slidesToShow: 2,
				slidesToScroll: 2,
			  },
			}
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

	// STEP 3: Fetch reviews and populate Slick
	setTimeout(() => {
		getReviewsByMonthYear(month, year).then((data) => {
			$slider.slick('slickRemove', null, null, true); // Clear all slides (skeletons)

			// Update responsive settings now that we know how many cards we have
			const responsiveSettings = getResponsiveSettings(data.length);
			$slider.slick('slickSetOption', 'responsive', responsiveSettings, true);

			data.forEach(item => {
				const slideHTML = `
					<div class="slide">
						<a href="https://${item.url}" target="_blank" rel="noopener noreferrer" class="card">
							<div class="card-image">
								<img src="${item.imageUrl}" alt="${item.title}" />
							</div>
							<div class="card-title">${item.title}</div>
						</a>
					</div>
				`;
				$slider.slick('slickAdd', slideHTML);
			});
		}).catch((error) => {
			console.error("Error loading reviews:", error);
		});
	}, 3000);
});
