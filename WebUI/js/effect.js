// JavaScript Document

$(document).ready(function() {
    $('.last').click(function(event) {
        $(".CSSTableGenerator")
            .slideUp({
                    duration: 'slow',
                })
    });
});

$(document).ready(function() {
    $('.last').click(function() {
        $(".CSSTableGenerator")
  .slideDown({
                    duration: 'slow',
                })
    });
});


//...........................slide2................

$(document).ready(function() {
    $('.last').click(function(event) {
        $("#content_inf")
            .slideUp({
                    duration: 'slow',
                })
           
    });
});

$(document).ready(function() {
    $('.last').click(function() {
        $("#content_inf")
  .slideDown({
                    duration: 'slow',
                })
           

    });
	
});






   $(document).ready(function() {

      $(".first").click(function(){
         $("article").hide( "slide", 
                     { direction: "down"  }, 700 );
      });
});

$(document).ready(function() {
    $('.first').click(function() {
        $("article") .show( "slide", 
                     { direction: "down"  }, 700 );
    
           

    });
	
});
 
  <!--...................next & perview.................................-->
$(document).ready(function() {
    $('.next').click(function(event) {
        $("article")
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
        $("article")
        .removeAttr( "style" )    
		.animate({"left":"0",
		opacity:1,})
    });
});


$(document).ready(function() {
    $('.previous').click(function(event) {
        $("article")
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
        $("article")
        .removeAttr( "style" )    
		.animate({"right":"0",
		opacity:1,})
    });
});


<!-- ..........................refresh................. -->  
  //$(function() {
  //  // run the currently selected effect
  //  function runEffect() {
  //    // get effect type from
  //    var selectedEffect = $( "#effectTypes_shake" ).val();
 
  //    // most effect types need no options passed by default
  //    var options = {};
  //    // some effects have required parameters
  //    if ( selectedEffect === "scale" ) {
  //      options = { percent: 0 };
  //    } else if ( selectedEffect === "transfer" ) {
  //      options = { to: ".icon_refresh", className: "ui-effects-transfer" };
  //    } else if ( selectedEffect === "size" ) {
  //      options = { to: { width: 200, height: 60 } };
  //    }
 
  //    // run the effect
  //    $( ".yourdiv" ).effect( selectedEffect, options, 500, callback );
  //  };
 
  //  // callback function to bring a hidden box back
  //  function callback() {
  //    setTimeout(function() {
  //      $( ".yourdiv" ).removeAttr( "style" ).hide().fadeIn();
  //    }, 0 );
  //  };
 
  //  // set effect from select menu value
  //  $( ".refresh_ro" ).click(function() {
  //    runEffect();
  //    return false;
  //  });
  //});


/*.....................................redo..............................*/
$(document).ready(function(e) {
    $(".undo_ro").click(function(e){
		$(".yourdiv").css({"-webkit-animation-name": "wobble-top",
  "animation-name": "wobble-top",
  "-webkit-animation-duration": "1s",
  "animation-duration": "1s",
  "-webkit-animation-timing-function": "ease-in-out",
  "animation-timing-function" : "ease-in-out",
  "-webkit-animation-iteration-count": "1",
  "animation-iteration-count":" 1"
		});
	setTimeout( function() {
            $(".yourdiv").css({
				
	"-webkit-animation-name": "none",
  "animation-name": "none",
  "-webkit-animation-duration": "none",
  "animation-duration": "none",
  "-webkit-animation-timing-function": "none",
  "animation-timing-function" : "none",
  "-webkit-animation-iteration-count": "none",
  "animation-iteration-count":" none"
});
       }, 500);
	});
});





//.............................................edite........................

$(document).ready(function(e) {
    $(".edite_ro").click(function(e){
		$(".yourdiv").css({
  "-webkit-animation-name": "pulse-shrink",
  "animation-name": "pulse-shrink",
  "-webkit-animation-duration": "0.3s",
  "animation-duration" : "0.3s",
  "-webkit-animation-timing-function":" linear",
  "animation-timing-function": "linear",
  "-webkit-animation-iteration-count": "infinite",
  "animation-iteration-count": "infinite",
  "-webkit-animation-direction": "alternate",
  "animation-direction": "alternate"
        });


	setTimeout( function() {
            $(".yourdiv").css({
				
	"-webkit-animation-name": "none",
  "animation-name": "none",
  "-webkit-animation-duration": "none",
  "animation-duration": "none",
  "-webkit-animation-timing-function": "none",
  "animation-timing-function" : "none",
  "-webkit-animation-iteration-count": "none",
  "animation-iteration-count":" none"
});
       }, 1000);
    });
    
});






$(document).ready(function (e) {
    $(".new_ro").click(function (e) {
        $(".yourdiv").css({
            "-webkit-animation-name": "hover",
            "animation-name": "hover",
            "-webkit-animation-duration": "0.3s",
            "animation-duration": "0.3s",
            "-webkit-animation-timing-function": " linear",
            "animation-timing-function": "linear",
            "-webkit-animation-iteration-count": "infinite",
            "animation-iteration-count": "infinite",
            "-webkit-animation-direction": "alternate",
            "animation-direction": "alternate"
        });


        setTimeout(function () {
            $(".yourdiv").css({

                "-webkit-animation-name": "none",
                "animation-name": "none",
                "-webkit-animation-duration": "none",
                "animation-duration": "none",
                "-webkit-animation-timing-function": "none",
                "animation-timing-function": "none",
                "-webkit-animation-iteration-count": "none",
                "animation-iteration-count": " none"
            });
        }, 1000);
    });

    $(".save_ro").click(function (e) {
        $(".yourdiv").css({
            "-webkit-animation-name": "buzz",
            "animation-name": "buzz",
            "-webkit-animation-duration": "0.6s",
            "animation-duration": "0.6s",
            "-webkit-animation-timing-function": " linear",
            "animation-timing-function": "linear",
            "-webkit-animation-direction": "alternate",
            "animation-direction": "alternate"
        });


        setTimeout(function () {
            $(".yourdiv").css({

                "-webkit-animation-name": "none",
                "animation-name": "none",
                "-webkit-animation-duration": "none",
                "animation-duration": "none",
                "-webkit-animation-timing-function": "none",
                "animation-timing-function": "none",
                "-webkit-animation-iteration-count": "none",
                "animation-iteration-count": " none"
            });
        }, 1000);
    });



    $(".print_ro").click(function (e) {
        $(".yourdiv").css({
            "-webkit-animation-name": "buzz",
            "animation-name": "buzz",
            "-webkit-animation-duration": "0.3s",
            "animation-duration": "0.3s",
            "-webkit-animation-timing-function": " linear",
            "animation-timing-function": "linear",
            "-webkit-animation-iteration-count": "infinite",
            "animation-iteration-count": "infinite",
            "-webkit-animation-direction": "alternate",
            "animation-direction": "alternate"
        });


        setTimeout(function () {
            $(".yourdiv").css({

                "-webkit-animation-name": "none",
                "animation-name": "none",
                "-webkit-animation-duration": "none",
                "animation-duration": "none",
                "-webkit-animation-timing-function": "none",
                "animation-timing-function": "none",
                "-webkit-animation-iteration-count": "none",
                "animation-iteration-count": " none"
            });
        }, 1000);
    });




    $(".first").click(function (e) {
        $(".yourdiv").css({
            "-webkit-animation-name": "bounceInRight",
            "animation-name": "bounceInRight",
            "-webkit-animation-duration": "0.8s",
            "animation-duration": "0.8s",
            "-webkit-animation-timing-function": " linear",
            "animation-timing-function": "linear",
            "-webkit-animation-direction": "alternate",
            "animation-direction": "alternate"
        });


        setTimeout(function () {
            $(".yourdiv").css({

                "-webkit-animation-name": "none",
                "animation-name": "none",
                "-webkit-animation-duration": "none",
                "animation-duration": "none",
                "-webkit-animation-timing-function": "none",
                "animation-timing-function": "none",
                "-webkit-animation-iteration-count": "none",
                "animation-iteration-count": " none"
            });
        }, 1000);
    });



    $(".last").click(function (e) {
        $(".yourdiv").css({
            "-webkit-animation-name": "bounceInleft",
            "animation-name": "bounceInLeft",
            "-webkit-animation-duration": "0.8s",
            "animation-duration": "0.8s",
            "-webkit-animation-timing-function": " linear",
            "animation-timing-function": "linear",
            "-webkit-animation-direction": "alternate",
            "animation-direction": "alternate"
        });


        setTimeout(function () {
            $(".yourdiv").css({

                "-webkit-animation-name": "none",
                "animation-name": "none",
                "-webkit-animation-duration": "none",
                "animation-duration": "none",
                "-webkit-animation-timing-function": "none",
                "animation-timing-function": "none",
                "-webkit-animation-iteration-count": "none",
                "animation-iteration-count": " none"
            });
        }, 1000);
    });




    $(".next").click(function (e) {
        $(".yourdiv").css({
            "-webkit-animation-name": "buzz",
            "animation-name": "buzz",
            "-webkit-animation-duration": "0.8s",
            "animation-duration": "0.8s",
            "-webkit-animation-timing-function": " linear",
            "animation-timing-function": "linear",
            "-webkit-animation-direction": "alternate",
            "animation-direction": "alternate"
        });


        setTimeout(function () {
            $(".yourdiv").css({

                "-webkit-animation-name": "none",
                "animation-name": "none",
                "-webkit-animation-duration": "none",
                "animation-duration": "none",
                "-webkit-animation-timing-function": "none",
                "animation-timing-function": "none",
                "-webkit-animation-iteration-count": "none",
                "animation-iteration-count": " none"
            });
        }, 1000);
    });



    $(".previous").click(function (e) {
        $(".yourdiv").css({
            "-webkit-animation-name": "buzz",
            "animation-name": "buzz",
            "-webkit-animation-duration": "0.8s",
            "animation-duration": "0.8s",
            "-webkit-animation-timing-function": " linear",
            "animation-timing-function": "linear",
            "-webkit-animation-direction": "alternate",
            "animation-direction": "alternate"
        });


        setTimeout(function () {
            $(".yourdiv").css({

                "-webkit-animation-name": "none",
                "animation-name": "none",
                "-webkit-animation-duration": "none",
                "animation-duration": "none",
                "-webkit-animation-timing-function": "none",
                "animation-timing-function": "none",
                "-webkit-animation-iteration-count": "none",
                "animation-iteration-count": " none"
            });
        }, 1000);
    });



    $(".yourdiv").css({
        "-webkit-animation-name": "Bounce",
        "animation-name": "Bounce",
        "-webkit-animation-duration": "1.8s",
        "animation-duration": "1.8s",
        "-webkit-animation-timing-function": " linear",
        "animation-timing-function": "linear",
        "-webkit-animation-direction": "alternate",
        "animation-direction": "alternate"
    });


    setTimeout(function () {
        $(".yourdiv").css({

            "-webkit-animation-name": "none",
            "animation-name": "none",
            "-webkit-animation-duration": "none",
            "animation-duration": "none",
            "-webkit-animation-timing-function": "none",
            "animation-timing-function": "none",
            "-webkit-animation-iteration-count": "none",
            "animation-iteration-count": " none"
        });
    }, 1000);


    $(".refresh_ro").click(function (e) {
        $(".yourdiv").css({
            "-webkit-animation-name": "shake",
            "animation-name": "shake",
            "-webkit-animation-duration": "0.8s",
            "animation-duration": "0.8s",
            "-webkit-animation-timing-function": " linear",
            "animation-timing-function": "linear",
            "-webkit-animation-direction": "alternate",
            "animation-direction": "alternate"
        });


        setTimeout(function () {
            $(".yourdiv").css({

                "-webkit-animation-name": "none",
                "animation-name": "none",
                "-webkit-animation-duration": "none",
                "animation-duration": "none",
                "-webkit-animation-timing-function": "none",
                "animation-timing-function": "none",
                "-webkit-animation-iteration-count": "none",
                "animation-iteration-count": " none"
            });
        }, 1000);
    });

    
    
});




   


