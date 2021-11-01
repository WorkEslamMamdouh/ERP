/*global $*/
$(document).ready(function () {
    "use strict";
    $('.mainbackground').height($(window).height());

    $(window).resize(function () {
        $('.mainbackground').height($(window).height());
    });

    $(".btn_info_user").click(function () {
        $(".Commissioners").slideToggle();
        $(".btn_info_user .fa-minus").fadeToggle(1);
        $(".btn_info_user .fa-plus").fadeToggle(1);
    });

    $(".btn_subscribe_child ").click(function () {
        $(".babys_info").slideToggle();
        $(".btn_subscribe_child .fa-minus").fadeToggle(1);
        $(".btn_subscribe_child .fa-plus").fadeToggle(1);
    });

    $(".btn_child ").click(function () {
        $(".newcustomer").slideToggle();
        $(".btn_child .fa-minus").fadeToggle(1);
        $(".btn_child .fa-plus").fadeToggle(1);
    });


    //$(".message1").click(function () {
    //   // $(".message1").children("#rdSms").prop("checked", true);
    // //  $("#AM").children("#rdSms").prop("checked", true);
    //   // $(this).children("#rdSms").prop("checked", true);
    //    $(this).children(".mess-on").toggle();
    //    $(this).children(".mess-off").toggle();

    //   //rdSms1
    //});
    $('.flat-toggle').on('click', function () {
        $(this).toggleClass('on');
    });

    $(".email1").click(function () {
        // $(this).children("#rdEmail").prop("checked", true);

        $(this).children(".email-on").toggle();
        $(this).children(".email-off").toggle();
    });

    $(".nothing").click(function () {
        //   $(this).children("#rdnon").prop("checked", true);
        //  $(this).children("#rdnon1").prop("checked", true);
        $(this).children(".no-on").toggle();
        $(this).children(".no-off").toggle();

    });

    $(".send_btn").click(function () {
        $(".yourdiv").css({ "opacity": "0.5" });
        $(".loading-pic").show();
    });

    $("#dir").click(function () {
        $("footer").animate({ "left": "0", "margin-left": "0px" });
        $("#dir").hide();

    });

    $("#dir_2").click(function () {
        $("footer").animate({ "left": "-85%", });
        $("#dir").fadeIn(3000);
    });

    $(".total .btn-danger").click(function () {
        $("#effects").css({ "background-color": "#f5bab9" });
        $("#effects").fadeIn(4000);
        $("#effects").toggleClass('animate');
    });
    $(".total .btn-primary").click(function () {
        $("#effects").css({ "background-color": "#bfdbf5" });
        $("#effects").fadeIn(4000);
        $("#effects").toggleClass('animate1');
    });

    $(".deleg-btn").click(function () {
        if ($("i.fa-angle-double-right").css('display') == 'none') {
            $("i.fa-angle-double-right").toggle();
            $("i.fa-angle-double-left").toggle();
        }
        else {
            $("i.fa-angle-double-left").toggle();
            $("i.fa-angle-double-right").toggle();
        }
    });
    $(".deleg-btn").click(function () {
        $(".delegation-slide").animate({ "width": "toggle", "left": "0" }, 1000);
    });
    $(".deleg-btn2").click(function () {
        if ($("i.fa-angle-double-right").css('display') == 'none') {
            $("i.fa-angle-double-right").toggle();
            $("i.fa-angle-double-left").toggle();
        }
        else {
            $("i.fa-angle-double-left").toggle();
            $("i.fa-angle-double-right").toggle();
        }
    });
    $(".deleg-btn2").click(function () {
        $(".delegation-slide1").animate({ "width": "toggle", "left": "0" }, 1000);
        $(".delegation-slide2").hide();
    });
    $(".deleg-btn3").click(function () {
        if ($("i.fa-angle-double-right").css('display') == 'none') {
            $("i.fa-angle-double-right").toggle();
            $("i.fa-angle-double-left").toggle();
        }
        else {
            $("i.fa-angle-double-left").toggle();
            $("i.fa-angle-double-right").toggle();
        }
    });
    $(".deleg-btn3").click(function () {
        $(".delegation-slide2").animate({ "width": "toggle", "left": "0" }, 1000);
        $(".delegation-slide1").hide();
    });
    $("#approve").click(function () {
        $(this).hide();
        $("#expired").show();
    });
    $("#expired").click(function () {
        $(this).hide();
        $("#approve").show();
    });

    $(".modal-open").click(function () {
        $('.modal').fadeOut();
    });

    $(".tooltip_icon").click(function () {
        $(".main_tooltip").slideToggle();

    });


    $(".main_tooltip, .yourdiv,#dir, footer, .favourite_icon, .color1 ").click(function () {
        $(".main_tooltip").slideUp();

    });
    $(".change_btn").click(function () {
        $(".user_1").slideUp();
        $(".user_2").slideDown();


    });
    $(".btn_back").click(function () {
        $(".user_1").slideDown();
        $(".user_2").slideUp();
    });

    $('.next').click(function (event) {
        $(".yourdiv")
            .animate({
                left: 25,
                opacity: .4,
            }, {
                duration: 'normal',
                easing: 'easeOutBounce'
            })
    });


    $('.next').click(function (event) {
        $(".yourdiv")
            .removeAttr("style")
            .animate({
                "left": "0",
                opacity: 1,
            })
    });



    $('.previous').click(function (event) {
        $(".yourdiv")
            .animate({
                right: 25,
                opacity: .4,
            }, {
                duration: 'normal',
                easing: 'easeOutBounce'

            })

    });

    $('.previous').click(function (event) {
        $(".yourdiv")
            .removeAttr("style")
            .animate({
                "right": "0",
                opacity: 1,
            })
    });


    $('.first').click(function () {
        $(".yourdiv").show("slide",
            { direction: "down" }, 700);
    });
    $('.last').click(function (event) {
        $(".yourdiv")
            .slideUp({
                duration: 'slow',
            })

    });
    $('.last').click(function () {
        $(".yourdiv")
            .slideDown({
                duration: 'slow',
            })
    });


    $(".first").click(function () {
        $(".yourdiv").hide("slide",
            { direction: "down" }, 700);
    });

    //e.stopPropagation();
    //return false;


    setTimeout(function () {
        $('.yourdiv').addClass('magictime slideUpRetourn');
    }, 0);

    setTimeout(function () {
        $('.yourdiv').removeClass('magictime slideUpRetourn');
    }, 800);

    setTimeout(function () {
        $('.header').show();
    }, 700);

    setTimeout(function () {
        $('.header').addClass('magictime foolishIn');
    }, 700);



    $(".daily_static_info .box_settings .fa-minus").click(function () {
        $(".daily_static .dily_content").slideUp(500);
        $(this).fadeOut(1);
        $(".daily_static_info .box_settings .fa-plus").fadeIn(1);
    });

    $(".daily_static_info .box_settings .fa-plus").click(function () {
        $(".daily_static .dily_content").slideDown(500);
        $(this).fadeOut(1);
        $(".daily_static_info .box_settings .fa-minus").fadeIn(1);
    });



    $(".monthly_static .box_settings .fa-minus").click(function () {
        $(".monthly_static .dily_content").slideUp(500);
        $(this).fadeOut(1);
        $(".monthly_static .box_settings .fa-plus").fadeIn(1);
    });

    $(".monthly_static .box_settings .fa-plus").click(function () {
        $(".monthly_static .dily_content").slideDown(500);
        $(this).fadeOut(1);
        $(".monthly_static .box_settings .fa-minus").fadeIn(1);
    });



    $(".yearly_income .box_settings .fa-minus").click(function () {
        $(".yearly_income .chart_content").slideUp(500);
        $(this).fadeOut(1);
        $(".yearly_income .box_settings .fa-plus").fadeIn(1);
    });

    $(".yearly_income .box_settings .fa-plus").click(function () {
        $(".yearly_income .chart_content").slideDown(500);
        $(this).fadeOut(1);
        $(".yearly_income .box_settings .fa-minus").fadeIn(1);
    });



    $(".member_yearly .box_settings .fa-minus").click(function () {
        $(".member_yearly .chart_content").slideUp(500);
        $(this).fadeOut(1);
        $(".member_yearly .box_settings .fa-plus").fadeIn(1);
    });

    $(".member_yearly .box_settings .fa-plus").click(function () {
        $(".member_yearly .chart_content").slideDown(500);
        $(this).fadeOut(1);
        $(".member_yearly .box_settings .fa-minus").fadeIn(1);
    });


});


$(".main_menu_user").click(function () {
    $(".user_info").slideToggle(1000);
    $(".notifcations").slideUp();

});





$(".notifcation").click(function () {
    $(".notifcations").slideToggle(1000);
    $(".user_info").slideUp();
});



//var typed2 = new Typed('#typed2', {
//    strings: ['Some &lt;i&gt;strings&lt;/i&gt; with', 'Some &lt;strong&gt;HTML&lt;/strong&gt;', 'Chars &amp;times; &amp;copy;'],
//    typeSpeed: 0,
//    backSpeed: 0,
//    fadeOut: true,
//    loop: true
//});



//var typed2 = new Typed('#typed2', {
//    strings: ['Some &lt;i&gt;strings&lt;/i&gt; with', 'Some &lt;strong&gt;HTML&lt;/strong&gt;', 'Chars &amp;times; &amp;copy;'],
//    typeSpeed: 0,
//    backSpeed: 0,
//    fadeOut: true,
//    loop: true
//});

//ragab

$(".1").slideToggle();
$(".2").slideToggle();
$(".3").slideToggle();
$(".4").slideToggle();
$(".5").slideToggle();
$(".6").slideToggle();
$(".7").slideToggle();
$(".8").slideToggle();
$(".9").slideToggle();
$(".10").slideToggle();

$(".btn_subscribe_child1").click(function () {
    $(".1").slideToggle();
    $(".btn_subscribe_child1 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child1 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child2 ").click(function () {
    $(".2").slideToggle();
    $(".btn_subscribe_child2 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child2 .fa-plus").fadeToggle(1);
});


$(".btn_subscribe_child3 ").click(function () {
    $(".3").slideToggle();
    $(".btn_subscribe_child3 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child3 .fa-plus").fadeToggle(1);
});


$(".btn_subscribe_child4 ").click(function () {
    $(".4").slideToggle();
    $(".btn_subscribe_child4 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child4 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child5 ").click(function () {
    $(".5").slideToggle();
    $(".btn_subscribe_child5 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child5 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child6 ").click(function () {
    $(".6").slideToggle();
    $(".btn_subscribe_child6 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child6 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child7 ").click(function () {
    $(".7").slideToggle();
    $(".btn_subscribe_child7 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child7 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child8 ").click(function () {
    $(".8").slideToggle();
    $(".btn_subscribe_child8 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child8 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child9 ").click(function () {
    $(".9").slideToggle();
    $(".btn_subscribe_child9 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child9 .fa-plus").fadeToggle(1);
});

$(".btn_subscribe_child10 ").click(function () {
    $(".10").slideToggle();
    $(".btn_subscribe_child10 .fa-minus").fadeToggle(1);
    $(".btn_subscribe_child10 .fa-plus").fadeToggle(1);
});