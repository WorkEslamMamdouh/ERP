//Flag Updated To Handle Members Screen
$(document).ready(function () {






    $('#btnAdd').on('click', function () {
        $('#addmemper').toggleClass('showdiv');

    });

    $('#btnback').on('click', function () {
        $('#addmemper').addClass('showdiv');

    });
    $('#btnsave').on('click', function () {
        $('#addmemper').addClass('showdiv');

    });

     

    $('#lepfarest').on('click', function () {
        $('#scorolveiw').toggleClass('showdiv');
        $('#spanlepfarest').toggleClass('fa-caret-left');
        $('#spanlepfarest').toggleClass('fa-caret-down');

    });


    $('#lepfamele').on('click', function () {
        $('#informtionfamliy').toggleClass('showdiv');
        $('#spanlepfamele').toggleClass('fa-caret-left');
        $('#spanlepfamele').toggleClass('fa-caret-down');
    });

    $('#lepnotifications').on('click', function () {
        $('#divnotifications').toggleClass('showdiv');
        $('#spanlepnotifications').toggleClass('fa-caret-left');
        $('#spanlepnotifications').toggleClass('fa-caret-down');
    });

    $('#labinformtiondetal').on('click', function () {
        $('#divinformtiondetal').toggleClass('showdiv');
        $('#spanlabinformtiondetal').toggleClass('fa-caret-left');
        $('#spanlabinformtiondetal').toggleClass('fa-caret-down');
    });

    $('#lebAuthorized_receive').on('click', function () {
        $('#divAuthorized_receive').toggleClass('showdiv');
        $('#spanlebAuthorized_receive').toggleClass('fa-caret-left');
        $('#spanlebAuthorized_receive').toggleClass('fa-caret-down');
    });

    $('#lepServicesCurrent').on('click', function () {
        $('#divServicesCurrent').toggleClass('showdiv');
        $('#spanlepServicesCurrent').toggleClass('fa-caret-left');
        $('#spanlepServicesCurrent').toggleClass('fa-caret-down');
    });

    $('#lebdaterigester').on('click', function () {
        $('#divdaterigester').toggleClass('showdiv');
        $('#spanlebdaterigester').toggleClass('fa-caret-left');
        $('#spanlebdaterigester').toggleClass('fa-caret-down');
    });

    $('#lebPaymentrecord').on('click', function () {
        $('#divPaymentrecord').toggleClass('showdiv');
        $('#spanlebPaymentrecord').toggleClass('fa-caret-left');
        $('#spanlebPaymentrecord').toggleClass('fa-caret-down');
    });



    $('#lebOutgoingmessages').on('click', function () {
        $('#divOutgoingmessages').toggleClass('showdiv');
        $('#spanlebOutgoingmessages').toggleClass('fa-caret-left');
        $('#spanlebOutgoingmessages').toggleClass('fa-caret-down');
    });


    $('#lebIncomingmessages').on('click', function () {
        $('#divIncomingmessages').toggleClass('showdiv');
        $('#spanlebIncomingmessages').toggleClass('fa-caret-left');
        $('#spanlebIncomingmessages').toggleClass('fa-caret-down');
    });
   

    $('#lebAttendees').on('click', function () {
        $('#divAttendees').toggleClass('showdiv');
        $('#spanlebAttendees').toggleClass('fa-caret-left');
        $('#spanlebAttendees').toggleClass('fa-caret-down');
    });
    $('#lebbrothers_and_sisters').on('click', function () {
        $('#divbrothers_and_sisters').toggleClass('showdiv');
        $('#spanlebbrothers_and_sisters').toggleClass('fa-caret-left');
        $('#spanlebbrothers_and_sisters').toggleClass('fa-caret-down');
    });



    $('#btnviewmnmber').on('click', function () {
        $('#scorolveiw').removeClass('showdiv');
        //$('#lebOutgoingmessages').toggleClass('showdiv');
        //$('#informtionfamliy').toggleClass('showdiv');
        //$('#divnotifications').toggleClass('showdiv');
        //$('#divinformtiondetal').toggleClass('showdiv');
        //$('#divAuthorized_receive').toggleClass('showdiv');
        //$('#divbrothers_and_sisters').toggleClass('showdiv');
        //$('#divServicesCurrent').toggleClass('showdiv');
        //$('#divdaterigester').toggleClass('showdiv');
        //$('#divPaymentrecord').toggleClass('showdiv');
        //$('#divOutgoingmessages').toggleClass('showdiv');
        //$('#divAttendees').toggleClass('showdiv');
        //$('#divIncomingmessages').toggleClass('showdiv');
       


        //$('#spanlepfarest').toggleClass('fa-caret-left');
        //$('#spanlepfarest').toggleClass('fa-caret-down');
        //$('#spanlepfamele').toggleClass('fa-caret-left');
        //$('#spanlepfamele').toggleClass('fa-caret-down');
        //$('#spanlepnotifications').toggleClass('fa-caret-left');
        //$('#spanlepnotifications').toggleClass('fa-caret-down');
        //$('#spanlabinformtiondetal').toggleClass('fa-caret-left');
        //$('#spanlabinformtiondetal').toggleClass('fa-caret-down');
        //$('#spanlebAuthorized_receive').toggleClass('fa-caret-left');
        //$('#spanlebAuthorized_receive').toggleClass('fa-caret-down');
        //$('#spanlepServicesCurrent').toggleClass('fa-caret-left');
        //$('#spanlepServicesCurrent').toggleClass('fa-caret-down');
        //$('#spanlebdaterigester').toggleClass('fa-caret-left');
        //$('#spanlebdaterigester').toggleClass('fa-caret-down');
        //$('#spanlebPaymentrecord').toggleClass('fa-caret-left');
        //$('#spanlebPaymentrecord').toggleClass('fa-caret-down');
        //$('#spanlebOutgoingmessages').toggleClass('fa-caret-left');
        //$('#spanlebOutgoingmessages').toggleClass('fa-caret-down');
        //$('#spanlebIncomingmessages').toggleClass('fa-caret-left');
        //$('#spanlebIncomingmessages').toggleClass('fa-caret-down');
        //$('#spanlebbrothers_and_sisters').toggleClass('fa-caret-left');
        //$('#spanlebbrothers_and_sisters').toggleClass('fa-caret-down');
    });



    $('#btnicon').on('click', function () {

        $('#btnPrint_card').toggleClass("display_none");
        $('#btnPrint_dataform').toggleClass("display_none");
        $('#btnArchiving').toggleClass("display_none");


    });

    //.slideToggle("inline-block");
    //.slideToggle("inline-block");

    $('#btnedite1').on('click', function () {
        $('#btnsave1').toggleClass("display_none");
        $('#btnback1').toggleClass("display_none");


    });
    ////comment 20-9-2020
    $('#btnfamilyedit').on('click', function () {
     //   $('#btnsavefamliyData').toggleClass("display_none");
     //   $('#btnbackfamliyData').toggleClass("display_none");
     //   $("#informtionfamliy :input").removeAttr("disabled");
     //   $("#informtionfamliy :select").removeAttr("disabled");
     ////   $('#btnfamilyedit').attr("disabled", "true");
     //  // $("#informtionfamliy").removeClass("show");


        $('#btnsavefamliyData').toggleClass("display_none");
        $('#btnbackfamliyData').toggleClass("display_none");
        $("#informtionfamliy :input").removeAttr("disabled", "disabled");//////bery comment 16-9-2020
        $("#informtionfamliy :select").removeAttr("disabled", "disabled");//////bery comment 16-9-2020

    });
    $('#btnsavefamliyData').on('click', function () {
        $('#btnsavefamliyData').toggleClass("display_none");
        $('#btnbackfamliyData').toggleClass("display_none");

        $("#informtionfamliy :input").attr("disabled", "disabled");
        $('#btnfamilyedit').removeAttr("disabled", "disabled");
 
 
    });
    $('#btnbackfamliyData').on('click', function () {
        //$('#btnsavefamliyData').toggleClass("display_none");
        //$('#btnbackfamliyData').toggleClass("display_none");
        //$("#informtionfamliy :input").attr("disabled", "true");
       // $("#informtionfamliy :select").attr("disabled", "true");


        $('#btnsavefamliyData').toggleClass("display_none");
        $('#btnbackfamliyData').toggleClass("display_none");
        $("#informtionfamliy :input").attr("disabled", "disabled");
        $('#btnfamilyedit').removeAttr("disabled", "disabled");
         
    });    
     
    $('#btnediteNotifi').on('click', function () {
   
        $('#btnsaveNotifi').toggleClass("display_none");
        $('#btnbackNotifi').toggleClass("display_none");
        //$("#divnotifications :input").removeAttr("disabled", "disabled");//////bery comment 16-9-2020
       // $("#divnotifications :select").removeAttr("disabled", "disabled");//////bery comment 16-9-2020
        $('#btnsaveNotifi').removeAttr("disabled", "disabled");
        $('#btnbackNotifi').removeAttr("disabled", "disabled");
    });
    $('#btnsaveNotifi').on('click', function () {
        $('#btnsaveNotifi').toggleClass("display_none");
        $('#btnbackNotifi').toggleClass("display_none");
        $("#divnotifications :input").attr("disabled", "disabled");
        $('#btnediteNotifi').removeAttr("disabled", "disabled");
        
    });
    $('#btnbackNotifi').on('click', function () {
        $('#btnsaveNotifi').toggleClass("display_none");
        $('#btnbackNotifi').toggleClass("display_none");
       $("#divnotifications :input").attr("disabled", "disabled");
        $('#btnediteNotifi').removeAttr("disabled", "disabled");

     });




    $('#btnediteDetails').on('click', function () {
        $('#btnsaveDetails').toggleClass("display_none");
        $('#btnbackDetails').toggleClass("display_none");
        //$("#divinformtiondetal :input").removeAttr("disabled");
        //$("#divinformtiondetal :select").removeAttr("disabled");
        $("#divinformtiondetal :input").removeAttr("disabled", "disabled");
        $("#divinformtiondetal :select").removeAttr("disabled", "disabled");
    });
    $('#btnsaveDetails').on('click', function () {
        //$('#btnsaveDetails').toggleClass("display_none");
        //$('#btnbackDetails').toggleClass("display_none");
        //$("#divinformtiondetal :input").attr("disabled", "true");
        //$("#divinformtiondetal :select").attr("disabled", "true");
        //$('#btnediteDetails').attr("disabled", "false");



        $('#btnsaveDetails').toggleClass("display_none");
        $('#btnbackDetails').toggleClass("display_none");
        $("#divinformtiondetal :input").attr("disabled", "disabled");
        $('#btnediteDetails').removeAttr("disabled", "disabled");
    });
    $('#btnbackDetails').on('click', function () {
        //$('#btnsaveDetails').slideToggle("inline-block");
        //$('#btnbackDetails').slideToggle("inline-block");
        //$("#divinformtiondetal :input").attr("disabled", "true");
        //$("#divinformtiondetal :select").attr("disabled", "true");
        //$('#btnediteDetails').attr("disabled", "false");


        $('#btnsaveDetails').toggleClass("display_none");
        $('#btnbackDetails').toggleClass("display_none");
        $("#divinformtiondetal :input").attr("disabled", "disabled");
        $('#btnediteDetails').removeAttr("disabled", "disabled");
    });



    $('#btnedite_authorized').on('click', function () {
        //$('#btnsave_authorized').toggleClass("display_none");
        //$('#btnback_authorized').toggleClass("display_none");
        //$("#divAuthorized_receive :input").removeAttr("disabled");
        //$("#divAuthorized_receive :select").removeAttr("disabled");

        $("#btn_plus").removeClass("display_none");

        $('#btnsave_authorized').toggleClass("display_none");
        $('#btnback_authorized').toggleClass("display_none");
        $("#divAuthorized_receive :input").removeAttr("disabled", "disabled");
        $("#divAuthorized_receive :select").removeAttr("disabled", "disabled");
    });
    $('#btnsave_authorized').on('click', function () {
        //$('#btnsave_authorized').toggleClass("display_none");
        //$('#btnback_authorized').toggleClass("display_none");
        //$("#divAuthorized_receive :input").attr("disabled", "true");
        //$("#divAuthorized_receive :select").attr("disabled", "true");
        //$('#btnedite_authorized').attr("disabled", "false");


        $('#btnsave_authorized').toggleClass("display_none");
        $('#btnback_authorized').toggleClass("display_none");
        $("#divAuthorized_receive :input").attr("disabled", "disabled");
        $('#btnedite_authorized').removeAttr("disabled", "disabled");
       // $('#btn_plus').removeAttr("disabled", "disabled");
    });
    $('#btnback_authorized').on('click', function () {
        //$('#btnsave_authorized').toggleClass("display_none");
        //$('#btnback_authorized').toggleClass("display_none");
        //$("#divAuthorized_receive :input").attr("disabled", "true");
        //$("#divAuthorized_receive :select").attr("disabled", "true");
        //$('#btnedite_authorized').attr("disabled", "false");



        $('#btnsave_authorized').toggleClass("display_none");
        $('#btnback_authorized').toggleClass("display_none");
        $("#divAuthorized_receive :input").attr("disabled", "disabled");
        $('#btnedite_authorized').removeAttr("disabled", "disabled");
       // $('#btn_plus').removeAttr("disabled", "disabled");
    });




    //$('#btnedite_authorized').on('click', function () {
    //    $('#btnsave_authorized').slideToggle("inline-block");
    //    $('#btnback_authorized').slideToggle("inline-block");
    //    $("#divAuthorized_receive :input").removeAttr("disabled");
    //    $("#divAuthorized_receive :select").removeAttr("disabled");
    //});
    //$('#btnsave_authorized').on('click', function () {
    //    $('#btnsave_authorized').slideToggle("inline-block");
    //    $('#btnback_authorized').slideToggle("inline-block");
    //    $("#divAuthorized_receive :input").attr("disabled", "true");
    //    $("#divAuthorized_receive :select").attr("disabled", "true");
    //    $('#btnedite_authorized').attr("disabled", "false");
    //});
    //$('#btnback_authorized').on('click', function () {
    //    $('#btnsave_authorized').slideToggle("inline-block");
    //    $('#btnback_authorized').slideToggle("inline-block");
    //    $("#divAuthorized_receive :input").attr("disabled", "true");
    //    $("#divAuthorized_receive :select").attr("disabled", "true");
    //    $('#btnedite_authorized').attr("disabled", "false");
    //});

    $('#btnedite3').on('click', function () {
        $('#btnsave3').slideToggle("inline-block");
        $('#btnback3').slideToggle("inline-block");

    });
    $('#btnedite4').on('click', function () {
        $('#btnsave4').slideToggle("inline-block");
        $('#btnback4').slideToggle("inline-block");


    });


    //$('#btn_plus').on('click', function () {
    //    //$('#div_plus').append(' <div id="1" class="col-lg-12 margingred"><div class="col-lg-1" ><button><i class="fa fa-camera"></i></button></div><div class="col-lg-3"><div id="toolbar5"><select class="form-control"><option>نوع التفعيل</option><option value="all"></option></select></div></div><div class="col-lg-3"><input type="text" class="form-control" placeholder="رقم الهوية البطاقة" ></div><div class="col-lg-2"><input type="text" class="form-control" placeholder="الصفة"></div><div class="col-lg-3" > <input type="text" class="form-control" placeholder="  اسم المفوض الثاني " > </div><i id="btn_plus2" class="fa fa-plus-circle fontitm"></i> </div>');

    //    $('#div_plus').append(' <div id="1" class="col-lg-12 margingred pading_0"><div class="col-lg-3"><input id="txt31" disabled type="text" class="form-control text_Display" placeholder=" اسم المفوض الاول"></div><div class="col-lg-2"><input id="txt30" disabled type="text" class="form-control text_Display" placeholder="الصفة"></div><div class="col-lg-3"><input id="txt29" disabled type="text" class="form-control text_Display" placeholder="رقم الهوية البطاقة"></div><div class="col-lg-3"><select class="form-control text_Display"><option>نوع التفعيل </option><option value="all"></option><option value="selected"></option></select></div><div class="col-lg-1"><button><i class="fa fa-camera"></i></button></div></div><i id="btn_plus" class="fa fa-minus-circle fontitm"></i>');
    //    $('#btn_plus').removeClass("fa-plus-circle");
    //    $('#btn_plus').addClass("fa-minus-circle"); 

       
    //    $('#btn_plus2').on('click', function () {
                      
    //        $('#div_plus').append( '<div id= "2" class="col-lg-12 margingred pading_0" > <div class="col-lg-3"><input id="txt31" disabled type="text" class="form-control text_Display" placeholder=" اسم المفوض الاول"></div><div class="col-lg-2"><input id="txt30" disabled type="text" class="form-control text_Display" placeholder="الصفة"></div><div class="col-lg-3"><input id="txt29" disabled type="text" class="form-control text_Display" placeholder="رقم الهوية البطاقة"></div><div class="col-lg-3"><select class="form-control text_Display"><option>نوع التفعيل </option><option value="all"></option><option value="selected"></option></select></div><div class="col-lg-1"><button><i class="fa fa-camera"></i></button></div></div><i id="btn_plus" class="fa fa-plus-circle fontitm"></i>');
    //        $('#btn_plus2').removeClass("fa-plus-circle");
    //        $('#btn_plus2').addClass("fa-minus-circle"); 


    //        $('#btn_plus3').on('click', function () {
    //            $('#div_plus').append('<div id="3" class="col-lg-12 margingred pading_0"><div class="col-lg-3"><input id="txt31" disabled type="text" class="form-control text_Display" placeholder=" اسم المفوض الاول"></div><div class="col-lg-2"><input id="txt30" disabled type="text" class="form-control text_Display" placeholder="الصفة"></div><div class="col-lg-3"><input id="txt29" disabled type="text" class="form-control text_Display" placeholder="رقم الهوية البطاقة"></div><div class="col-lg-3"><select class="form-control text_Display"><option>نوع التفعيل </option><option value="all"></option><option value="selected"></option></select></div><div class="col-lg-1"><button><i class="fa fa-camera"></i></button></div></div><i id="btn_plus" class="fa fa-plus-circle fontitm"></i>');
    //            $('#btn_plus3').removeClass("fa-plus-circle");
    //            $('#btn_plus3').addClass("fa-minus-circle"); 


    //            $('#btn_plus4').on('click', function () {
    //                $('#div_plus').append('<div id="4" class="col-lg-12 margingred pading_0"><div class="col-lg-3"><input id="txt31" disabled type="text" class="form-control text_Display" placeholder=" اسم المفوض الاول"></div><div class="col-lg-2"><input id="txt30" disabled type="text" class="form-control text_Display" placeholder="الصفة"></div><div class="col-lg-3"><input id="txt29" disabled type="text" class="form-control text_Display" placeholder="رقم الهوية البطاقة"></div><div class="col-lg-3"><select class="form-control text_Display"><option>نوع التفعيل </option><option value="all"></option><option value="selected"></option></select></div><div class="col-lg-1"><button><i class="fa fa-camera"></i></button></div></div><i id="btn_plus" class="fa fa-plus-circle fontitm"></i>');
    //                $('#btn_plus4').removeClass("fa-plus-circle");
    //                $('#btn_plus4').addClass("fa-minus-circle"); 

    //                $('#btn_plus5').on('click', function () {
    //                    $('#div_plus').append('<div id="5" class="col-lg-12 margingred pading_0"><div class="col-lg-3"><input id="txt31" disabled type="text" class="form-control text_Display" placeholder=" اسم المفوض الاول"></div><div class="col-lg-2"><input id="txt30" disabled type="text" class="form-control text_Display" placeholder="الصفة"></div><div class="col-lg-3"><input id="txt29" disabled type="text" class="form-control text_Display" placeholder="رقم الهوية البطاقة"></div><div class="col-lg-3"><select class="form-control text_Display"><option>نوع التفعيل </option><option value="all"></option><option value="selected"></option></select></div><div class="col-lg-1"><button><i class="fa fa-camera"></i></button></div></div><i id="btn_plus" class="fa fa-plus-circle fontitm"></i>');
    //                    $('#btn_plus5').removeClass("fa-plus-circle");
    //                    $('#btn_plus5').addClass("fa-minus-circle");
                         
    //                });
    //            });
    //        });
    //    });
    //});
    $('#lep1').on('click', function () {
        $('#span1').toggleClass('fa-caret-left');
        $('#span1').toggleClass('fa-caret-down');

    });
});
