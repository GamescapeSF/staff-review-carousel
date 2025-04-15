import { getReviewsByMonthYear } from "./app.js";

$(document).ready(function () {
	const $slider = $('.slider');
	const now = new Date();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();

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
		arrows: false,
		dots: true,
		mobileFirst: true,
		slidesToShow: 1,
		// Use default responsive — will be overridden later if needed
		responsive: []
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
						<a href="${item.url}" class="card">
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
