$(function(){new Swiper(".swiper-container",{pagination:".swiper-pagination",nextButton:".swiper-button-next",prevButton:".swiper-button-prev",paginationClickable:!0,effect:"fade",spaceBetween:30,centeredSlides:!0,loop:!0,autoplay:3e3,autoplayDisableOnInteraction:!1,paginationBulletRender:function(e,n,t){return'<span class="'+t+'">'+(n+1)+"</span>"}})});