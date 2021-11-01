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
$(".btn1").click(function () {
    $("#cont").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn2' type='button' style='margin-right:10px'>+</button>  ");
    $(".btn1").hide();
    $(".btn2").click(function () {
        $("#cont2").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss3' class='btn3' type='button' style='margin-right:10px'>+</button>  ");
        $(".btn2").hide();
        $(".btn3").click(function () {
            $("#cont3").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn4' type='button' style='margin-right:10px'>+</button>  ");
            $(".btn3").hide();
            $(".btn4").click(function () {
                $("#cont4").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn5' type='button' style='margin-right:10px'>+</button>  ");
                $(".btn4").hide();
                $(".btn5").click(function () {
                    $("#cont5").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn6' type='button' style='margin-right:10px'>+</button>  ");
                    $(".btn5").hide();
                    $(".btn6").click(function () {
                        $("#cont6").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn7' type='button' style='margin-right:10px'>+</button>  ");
                        $(".btn6").hide();
                        $(".btn7").click(function () {
                            $("#cont7").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn8' type='button' style='margin-right:10px'>+</button>  ");
                            $(".btn7").hide();
                            $(".btn8").click(function () {
                                $("#cont8").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn9' type='button' style='margin-right:10px'>+</button>  ");
                                $(".btn8").hide();
                                $(".btn9").click(function () {
                                    $("#cont9").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn10' type='button' style='margin-right:10px'>+</button>  ");
                                    $(".btn9").hide();
                                    $(".btn10").click(function () {
                                        $("#cont10").prepend(" <div class='col-lg- 12 col-md-12 col-sm-12 col-xs-12 form-group'><div class='form-horizontal'><div style='' class='col-xs-12 form-group'> <div class=' col-lg-3 col-md-4 col-sm-4 col-xs-5 form-group'><div class='col-lg-3 col-md-2 col-md-1 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-3 col-md-3 col-sm-2 col-xs-2'><select id='cars'><option value='volvo'>Volvo</option><option value='saab'>Saab</option><option value='mercedes'>Mercedes</option><option value='audi'>Audi</option></select></div></div><div class='col-lg-8 col-md-8 col-sm-8 col-xs-6 form-group'><div class='col-md-2 col-sm-2 col-xs-2'><label for='cars'></label></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2  '><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class=' col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div><div class='col-lg-2 col-md-3 col-sm-2 col-xs-2'><label for='cars'></label><input type='checkbox' class='reportcheck genralcheck' name='chec1' id='1'></div></div></div></div></div><button id='btnpluss2' class='btn11' type='button' style='margin-right:10px'>+</button>  ");
                                        $(".btn10").hide();

                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
     });
});



