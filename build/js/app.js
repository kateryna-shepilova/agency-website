// $(document).ready(function () {
// 	// $('body').hide()
// })
$('.slider-feedback').slick();
$('.slider-banner').slick();

$(document).ready(function () {
	$(".header__burger").click(function (event) {
		$(".header__burger,.header__menu").toggleClass("active");
		$("body").toggleClass("lock");
	});
});

