$(document).on('deviceready', function(){
	var viewHeight = $(window).height();
	var viewWidth = $(window).width();
	$('body').css('height', viewHeight);
	$('.swiper-container').css('width', viewWidth);

	var swiper = new Swiper('.swiper-container', {
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
		paginationClickable: false,
		spaceBetween: 30,
		on: {
			slideChangeTransitionEnd: function(){
				if( this.activeIndex == 2 ){
					$('.appTopButton').addClass('active');
				}else{
					$('.appTopButton').removeClass('active');
				}
			}
		}
	});

	var h_window = $(window).height();
	var h_button = $(".controllers").height();
	var h_margin = h_window - 400;
	if ( h_button + 10 >= h_margin ) {
		if ( h_window < 480 ) {
		   $(".swiper-pagination").css({"margin-top": "-41px"});
		   $(".controllers").css({"margin-top": "-11px", "z-index": 10,"position": "absolute", "width": "100%"});
		   $(".controllers button.appTopButton").css({"margin-top": "12px", "height": "40px"});
		   $(".controllers button.closeButton").css({"margin-top": "5px"});
		   $(".swiper-container .swiper-slide img").css({"margin-top": "-8px"});
		} else {
		   $(".swiper-pagination").css({"margin-top": "-28px"});
		   $(".controllers").css({"margin-top": "-12px", "z-index": 10,"position": "absolute", "width": "100%"});
		   $(".controllers button.appTopButton").css({"margin-top": "12px"});
		   $(".controllers button.closeButton").css({"margin-top": "5px"});
		}		
	}
	$(document).on('click touchend', ".appTopButton", function(e) {
		e.preventDefault();
		e.stopPropagation();
        window.location.href = '../../index.html';
    });
	
	$(document).on('click touchend', ".closeButton", function(e) {
		e.preventDefault();
		e.stopPropagation();
        if(history.length >= 2){
            history.go(-1);
        }else{
            window.location.href = '../../index.html';
        }
    });

});
