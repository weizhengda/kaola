/**
 * Created by Administrator on 2017/4/5 0005.
 */

$(function () {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		paginationClickable: true,
		effect: 'fade',
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		autoplay: 3000,
		autoplayDisableOnInteraction: false,
		paginationBulletRender: function (swiper, index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		}
	});
});