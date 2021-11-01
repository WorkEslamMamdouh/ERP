/**
* Template Name: Selecao - v4.2.0
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
    "use strict";


    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener);
    };
    /**
     * Back to top button
     */
    let backtotop = $('.back-to-top');
    let sidebar = $('#sidebar');
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 10) {
                backtotop.classList.add('active');
            } else {
                backtotop.removeClass('active');
            }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

});