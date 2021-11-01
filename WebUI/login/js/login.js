// JavaScript Document

//.............................back...................	

$(document).ready(function(e) {
$(".intro").click(function() {
$(".intro").css({
	"top":"-160%",
"transition":".5s",
});
setTimeout( function() {
            $(".intro").css({
	"top":"0",

});
       }, 50000);
});
	});
	
$(document).ready(function(e) {
$(".intro").click(function() {
$("#login").css({
	"opacity":"0",
		"transition":".0s",

});
setTimeout( function() {
            $("#login").css({
	"transition":".5s",

	"opacity":"1",


});
       }, 500);
});
	});
	
//	$(document).ready(function(e) {
//$(".intro").click(function() {
//$("#logo_co").css({
//	"opacity":"0",
//		"transition":".0s",
//
//});
//setTimeout( function() {
//            $("#logo_co").css({
//	"transition":".5s",
//
//	"opacity":"1",
//
//
//});
//       }, 500);
//});
//	});
//	
$(document).ready(function(e) {
$(".intro").click(function() {
$(".container_login").addClass("animation");
setTimeout( function() {
$(".container_login").removeClass("animation")       }, 2000);
});
	});


