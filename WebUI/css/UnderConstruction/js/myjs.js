//.....................slide_bottom..............
$(document).ready(function(){
new WOW().init();
});
$(document).ready(function(){
   $(".message1").click(function(){
       $(this).children(".mess-on").toggle();
       $(this).children(".mess-off").toggle();
    });
});
$(document).ready(function(){
   $(".email1").click(function(){
       $(this).children(".email-on").toggle();
       $(this).children(".email-off").toggle();
    });
});
$(document).ready(function(){
   $(".nothing").click(function(){
       $(this).children(".no-on").toggle();
       $(this).children(".no-off").toggle();
    });
});
$(document).ready(function(){
   $(".send_btn").click(function(){
        $(".yourdiv").css({"opacity":"0.5"});
        $(".loading-pic").show();
    });
});
	$(document).ready(function(e) {
$("#dir").click(function(){
$("footer").animate({"left":"0","margin-left":"0px"});
$("#dir").hide();

});
	});
	$(document).ready(function(e) {
$("#dir_2").click(function(){
$("footer").animate({"left":"-85%",});
$("#dir").fadeIn(3000);
});
	});
$(document).ready(function(){
   $(".total .btn-danger").click(function(){
        $("#effects").animate({"background-color": "#f5bab9"});
        $("#effects").fadeIn(4000);
        $("#effects").toggleClass('animate');
    });
    $(".total .btn-primary").click(function(){
        $("#effects").animate({"background-color": "#bfdbf5"});
        $("#effects").fadeIn(4000);
        $("#effects").toggleClass('animate1');
    });
});
//$(document).ready(function() {
//    $(".deleg-btn").click(function(){
//        $(".delegation-slide").slideToggle();
//    });
//});
// $(document).ready(function(){
//        $(".deleg-btn").click(function(){
//            if($("i.fa-angle-double-right").css('display') == 'none'){
//                 $(this).show();
//                 $("i.fa-angle-double-left").hide();
//            }
//            else if($("i.fa-angle-double-left").css('display') == 'none'){
//                 $(this).show();
//                 $("i.fa-angle-double-right").hide();
//            }
//        });
//    });
 $(document).ready(function(){
        $(".deleg-btn").click(function(){
            if($("i.fa-angle-double-right").css('display') == 'none'){
                 $("i.fa-angle-double-right").toggle();
                 $("i.fa-angle-double-left").toggle();
            }
            else {
                 $("i.fa-angle-double-left").toggle();
                 $("i.fa-angle-double-right").toggle();
            }
        });
});
// $(document).ready(function(){
//        $(".deleg-btn").click(function(){
//            if($("i.fa-angle-double-left").css('display') == 'none'){
//                 $(this).show();
//                 $("i.fa-angle-double-right").toggle();
//            }
//            else {
//                 $("i.fa-angle-double-right").show();
//                 $("i.fa-angle-double-left").toggle();
//            }
//        });
//});
$(document).ready(function() {
    $(".deleg-btn").click(function(){
        $(".delegation-slide").animate({"width": "toggle","left":"0"},1000);
    });
});
$(document).ready(function() {
    $("#approve").click(function(){
        $(this).hide();
        $("#expired").show();
    });
});
$(document).ready(function() {
    $("#expired").click(function(){
        $(this).hide();
        $("#approve").show();
    });
});
//$(document).ready(function(e){
//    e.stopPropagation();
//    return false;
//});
$(".modal-open").click(function(){
    $('.modal').fadeOut();
});

	$(document).ready(function(e) {
$(".tooltip_icon").click(function(){
$(".main_tooltip").slideToggle();

});
});
	$(document).ready(function(e) {
$(".main_tooltip, .yourdiv,#dir, footer, .favourite_icon, .color1 ").click(function(){
$(".main_tooltip").slideUp();

});
});


setTimeout(function(){
    $('.yourdiv').addClass('magictime slideUpRetourn');
}, 0);

setTimeout(function(){
    $('.yourdiv').removeClass('magictime slideUpRetourn');
}, 800);

setTimeout(function(){
    $('.header').show();
}, 700);

setTimeout(function(){
    $('.header').addClass('magictime foolishIn');
}, 700);



	$(document).ready(function(e) {
$(".change_btn").click(function(){
$(".user_1").slideUp();
$(".user_2").slideDown();


});
});

	$(document).ready(function(e) {
$(".btn_back").click(function(){
$(".user_1").slideDown();
$(".user_2").slideUp();


});
});



//...................approve................

// $(document).ready(function(){
//        $(".approve_btn").click(function(){
//            if($(this).prop("checked") == true){
//				                     $(".approve").css({"background-position": "left center" });
//
//                alert("Checkbox is checked.");
//            }
//            else if($(this).prop("checked") == false){
//				$(".approve").css({"background-position": "right center"});
//                alert("Checkbox is unchecked.");
//            }
//        });
//    });
// $(document).ready(function(){
//            if($(".approve_btn").prop("checked") == false){
//				                     $(".approve").css({"background-position": "right center" });
//
//            }
//       });
	   
	   
	   
	   
	   //...................approve................

// $(document).ready(function(){
//	 
//        $(".approve_btn2").change(function(){
//            if($(this).prop("checked") == true){
//				                     $(".approve2").css({"background-position": "left center" });
//
//                alert("Checkbox is checked.");
//            }
//            else if($(this).prop("checked") == false){
//				$(".approve2").css({"background-position": "right center"});
//                alert("Checkbox is unchecked.");
//            }
//        });
//    });
// $(document).ready(function(){
//            if($(".approve_btn2").prop("checked") == false){
//				                     $(".approve2").css({"background-position": "right center" });
//
//            }
//       });



	   //...................approve................

// $(document).ready(function(){
//        $(".approve_btn3").change(function(){
//            if($(this).prop("checked") == true){
//				                     $(".approve3").css({"background-position": "left center" });
//
//                alert("Checkbox is checked.");
//            }
//            else if($(this).prop("checked") == false){
//				$(".approve3").css({"background-position": "right center"});
//                alert("Checkbox is unchecked.");
//            }
//        });
//    });
// 
//$(document).ready(function(){
//    
//        $(".approve_btn3").change(function(){
//
//if ($('.approve_btn3').is(':checked')) {
//	 $(".approve3").css({"background-position": "left center" });
//	 alert("Checkbox is checked.");
//	
//	}
//	});
//	        $(".approve_btn3").change(function(){
//
//	if ($('.approve_btn3').not(':checked')) {
//	 $(".approve3").css({"background-position": "right center" });
//	
//	}
//	 });
//	  });
	 

	 
// $(document).ready(function(){
//            if($(".approve_btn3").prop(":checked") == false){
//				                     $(".approve3").css({"background-position": "right center" });
//
//            }
//       });
//
// $(document).ready(function(){
//            if($(".approve_btn3").prop(":checked") == true){
//				                     $(".approve3").css({"background-position": "left center" });
//
//            }
//       });



	   //...................approve................

// $(document).ready(function(){
//        $(".approve_btn4").click(function(){
//            if($(this).prop("checked") == true){
//				                     $(".approve4").css({"background-position": "left center" });
//
//                alert("Checkbox is checked.");
//            }
//            else if($(this).prop("checked") == false){
//				$(".approve4").css({"background-position": "right center"});
//                alert("Checkbox is unchecked.");
//            }
//        });
//    });
// $(document).ready(function(){
//            if($(".approve_btn4").prop("checked") == false){
//				                     $(".approve4").css({"background-position": "right center" });
//
//            }
//       });
	   


 //...................approve................

// $(document).ready(function(){
//        $(".approve_btn5").click(function(){
//            if($(this).prop("checked") == true){
//				                     $(".approve5").css({"background-position": "left center" });
//
//                alert("Checkbox is checked.");
//            }
//            else if($(this).prop("checked") == false){
//				$(".approve5").css({"background-position": "right center"});
//                alert("Checkbox is unchecked.");
//            }
//        });
//    });
// $(document).ready(function(){
//            if($(".approve_btn5").prop("checked") == false){
//				                     $(".approve5").css({"background-position": "right center" });
//
//            }
//       });	   

	   
	   
	   
	   
 //...................approve................

// $(document).ready(function(){
//        $(".approve_btn6").click(function(){
//            if($(this).prop("checked") == true){
//				                     $(".approve6").css({"background-position": "left center" });
//
//                alert("Checkbox is checked.");
//            }
//            else if($(this).prop("checked") == false){
//				$(".approve6").css({"background-position": "right center"});
//                alert("Checkbox is unchecked.");
//            }
//        });
//    });
// $(document).ready(function(){
//            if($(".approve_btn6").prop("checked") == false){
//				                     $(".approve6").css({"background-position": "right center" });
//
//            }
//       });	   

	   
	   
	   
	   
	     <!--...................next & perview.................................-->
$(document).ready(function() {
    $('.next').click(function(event) {
        $(".yourdiv")
            .animate({left:25,
			opacity:.4,
			}, {
                    duration: 'normal',
                    easing: 'easeOutBounce'
					
                })
           
    });
});

$(document).ready(function() {
    $('.next').click(function(event) {
        $(".yourdiv")
        .removeAttr( "style" )    
		.animate({"left":"0",
		opacity:1,})
    });
});


$(document).ready(function() {
    $('.previous').click(function(event) {
        $(".yourdiv")
            .animate({right:25,
			opacity:.4,
			}, {
                    duration: 'normal',
                    easing: 'easeOutBounce'
					
                })
           
    });
});

$(document).ready(function() {
    $('.previous').click(function(event) {
        $(".yourdiv")
        .removeAttr( "style" )    
		.animate({"right":"0",
		opacity:1,})
    });
});
   $(document).ready(function() {

      $(".first").click(function(){
         $(".yourdiv").hide( "slide", 
                     { direction: "down"  }, 700 );
      });
});

$(document).ready(function() {
    $('.first').click(function() {
        $(".yourdiv") .show( "slide", 
                     { direction: "down"  }, 700 );
    
           

    });
	
});



$(document).ready(function() {
    $('.last').click(function(event) {
        $(".yourdiv")
            .slideUp({
                    duration: 'slow',
                })
           
    });
});

$(document).ready(function() {
    $('.last').click(function() {
        $(".yourdiv")
  .slideDown({
                    duration: 'slow',
                })
           

    });
	
});

