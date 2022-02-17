
$('.slider-feedback').slick();

lightGallery(document.getElementById('lightgallery'));

$(function () {
	$(".team-img").jqZoom({
		selectorWidth: 40,
		selectorHeight: 40,
		viewerWidth: 300,
		viewerHeight: 300
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

