
$('.slider-feedback').slick();

lightGallery(document.getElementById('lightgallery'));

$(function () {
	$(".team-img").jqZoom({
		selectorWidth: 10,
		selectorHeight: 10,
		viewerWidth: 400,
		viewerHeight: 400
	});
})

$('.slider-banner').slick();
$('.slider-feedback').slick();

$(document).ready(function () {
	$(".header__burger").click(function (event) {
		$(".header__burger, .header__menu").toggleClass("active");
		$("body").toggleClass("lock");
	});
});

