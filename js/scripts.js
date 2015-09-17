$(window).scroll(function() {

	var scrollPos = $(window).scrollTop();
	
	if ($(".section-menu").length) {
	
		if ($(window).height() > $(".section-menu").height() + 72) {
			if (scrollPos > $(".sidebar").offset().top - 50) {
			
				if (scrollPos - $(".sidebar").offset().top + $(".section-menu").height() < $(".inner-content").height() - 50) {
					mTop = 50
				} else {
					mTop = $(".inner-content").offset().top + $(".inner-content").height() - $(".section-menu").height() - scrollPos - 30
				}
				$(".section-menu").addClass("section-menu-floating").css({
					top: mTop
				});
			} else {
				$(".section-menu").removeClass("section-menu-floating");
			}
		} else {
			$(".section-menu").removeClass("section-menu-floating");
		}
		
	}
	
	if ($(".news-filter").length) {
		if (scrollPos > $(".news-filter").parent().offset().top - 60 && scrollPos < $(".inner-content").offset().top + $(".inner-content").height() - 200) {
			
			$(".news-filter").addClass("news-filter-fixed");
			
		} else {
			$(".news-filter").removeClass("news-filter-fixed");
		}
	}
	
	if (scrollPos > 200) {
		$(".header").addClass("header-fixed");
		$(".body").css({
			marginTop: 212
		});
	} else {
		$(".header").removeClass("header-fixed");
		$(".body").css({
			marginTop: 0
		})
	}
  
	if ($(".stats-slider").length) {
	
		if (scrollPos + $(window).height() > $(".stats-slider").offset().top + 300 && !$(".stats-slider").hasClass("anim-done")) {
			
			$(".stats-slider").addClass("anim-done");
			
			$(".stats-slider .slide").each(function() {

				var item = $(this);
			
				var t = setTimeout(function() {
					TweenMax.to(item,.25,
						{
							y: 0,
							opacity: 1
						}
					);
				},$(this).prevAll(".slide").length*260)
			})
			
		}
	
	}
	
	if ($(".calendar-slider").length) {
	
		if (scrollPos + $(window).height() > $(".calendar-slider").offset().top + 300 && !$(".calendar-slider").hasClass("anim-done")) {
			
			$(".calendar-slider").addClass("anim-done");
			
			$(".calendar-slider .slide").each(function() {

				var item = $(this);
			
				var t = setTimeout(function() {
					TweenMax.to(item,.25,
						{
							y: 0,
							opacity: 1
						}
					);
				},$(this).nextAll(".slide").length*260)
			})
			
		}
		
	}
	
});

$(window).resize(function() {
  pupMakeup();
})


$(window).load(function() {
	
	
});


$(document).ready(function() {
	
	if ($(".com-tabs").length) {
		
		var play = 1;
    
    $(".com-tabs").bind("mouseover",function () {
      play = 0;
    });
    
    $(".com-tabs").bind("mouseout",function () {
      play = 1;
    });
    
    if (play) {
      var t = setInterval(function () {
        if (play) {
					if ($(".com-tabs .tabs .act").next(".tab").length) {
						$(".com-tabs .tabs .act").next(".tab").trigger("click");
					} else {
						$(".com-tabs .tabs .tab").eq(0).trigger("click");
					}
        }
      },4000);
    }
		
	}
	
	$(".main-slider").css({
		opacity:0
	})
	

	$(".fancybox").fancybox();
	
	// Календарь
	
	$("body").on("click",".calendar-more-link",function() {
		$(".calendar-day-popup").hide();
		$(this).parents("td").find(".calendar-day-popup").fadeIn(100)
	})
	
	$("body").on("click",".calendar-day-popup .close",function() {
		$(this).parents(".calendar-day-popup").fadeOut(100)
	});
	
	$("body").on("click",".calendar-header a",function() {
		ajaxBlock($(this).attr("href"),$(".calendar-content"),function() {
			$(".calendar-content select").customSelect();
		});
		var stateObj = { foo: "bar" };
		history.pushState(stateObj, "", $(this).attr("href"));
		return false;
	})
	
	$("body").on("change",".calendar-header select",function() {
		ajaxBlock($(this).val(),$(".calendar-content"),function() {
			$(".calendar-content select").customSelect();
		});
		var stateObj = { foo: "bar" };
		history.pushState(stateObj, "", $(this).val());
		return false;
	})
	
	$("body").on("click",".modern-page-navigation a",function() {
		ajaxBlock($(this).attr("href"),$(this).parents(".modern-page-navigation").parent(),function() {
			
		});
		var stateObj = { foo: "bar" };
		history.pushState(stateObj, "", $(this).attr("href"));
		return false;
	})
	
	

	$(".news-filter a").on("click",function() {
		$(".news-filter a").removeClass("act");
		$(this).addClass("act");
		ajaxBlock($(this).attr("href"),$(".shifter"))
		var stateObj = { foo: "bar" };
		history.pushState(stateObj, "", $(this).attr("href"));
		return false;
	})
	
	$(".section-filter a").on("click",function() {
		$(".section-filter a").removeClass("act");
		$(this).addClass("act");
		ajaxBlock($(this).attr("href"),$(".section-content"))
		return false;
	})

	TweenMax.to($(".stats-slider .slide"),0,
		{
			y: -100,
			opacity: 0
		}
	);
	
	TweenMax.to($(".calendar-slider .slide"),0,
		{
			y: -100,
			opacity: 0
		}
	);

	// Верхний слайдер
	
	
	
	$('.main-slider').on('init', function(slick){
		$(".main-slider .slide.slick-active").prevAll(".slide").addClass("left-out").css("margin-top",-200000);
		$(".main-slider .slide.slick-active").nextAll(".slide").addClass("right-out").css("margin-top",-200000);
		$(".main-slider").css({
			opacity: 1
		})
	});
	
	$(".main-slider").waitForImages(function() {
		$(".main-slider").slick({
			dots:true,
			fade:true,
			speed:0,
			useCss:false,
			infinite:true,
			arrows:true
		});
	})
	
	
	
	$('.main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		
		$(".main-slider").addClass("moving")
		
		$(".main-slider .slide").css("margin-top",0);
		
		var direction = "";
		
		if (currentSlide < nextSlide) {
			direction = "left"
		} else {
			direction = "right"
		}
		
		if (direction == "left") {
			$(".main-slider .slide").eq(currentSlide).prevAll(".slide").removeClass("right-out").addClass("left-out");
			$(".main-slider .slide").eq(currentSlide).nextAll(".slide").removeClass("left-out").addClass("right-out");
			$(".main-slider .slide").eq(currentSlide).addClass("left-out");
			$(".main-slider .slide").eq(nextSlide).removeClass("left-out").removeClass("right-out");
			$(".main-slider .slide").eq(nextSlide).prevAll(".slide").addClass("left-out").removeClass("right-out");
			$(".main-slider .slide").eq(nextSlide).nextAll(".slide").addClass("right-out");
		}
		
		if (direction == "right") {
			$(".main-slider .slide").eq(currentSlide).prevAll(".slide").removeClass("right-out").addClass("left-out");
			$(".main-slider .slide").eq(currentSlide).nextAll(".slide").removeClass("left-out").addClass("right-out");
			$(".main-slider .slide").eq(currentSlide).addClass("right-out");
			$(".main-slider .slide").eq(nextSlide).removeClass("right-out").removeClass("left-out");
			$(".main-slider .slide").eq(nextSlide).prevAll(".slide").addClass("left-out");
			$(".main-slider .slide").eq(nextSlide).nextAll(".slide").addClass("right-out").removeClass("left-out");
		}
		
	});
	
	$('.main-slider').on('afterChange', function(event, slick, currentSlide){
		var t = setTimeout(function() {
			$(".main-slider").removeClass("moving");
		},1000)
	});
	
	// Верхний слайдер END
	
	// Видеоплеер во втором блоке
	
	$(".video-wrapper").click(function() {
		$(this).html($(this).data("video"));
	});
	
	// Слайдер Статистика
	
	$(".stats-slider").slick({
		dots:false,
		speed:1000,
		useCss:true,
		infinite:false,
		slidesToShow:4,
		slidesToScroll:1,
		initialSlide:1
	});
	
	
	
	// Аккордеон с проектами
	
	$(".projects-accordion-item").hover(function() {
		$(".projects-accordion-item").removeClass("act");
		$(this).addClass("act");
	},function() {
		
	});
	
	// Табы
	
	$(".tabbed-content").each(function() {
		$(this).tabbedContent();
	})
	
	// Табы END
	
	// Слайдер Календарь
	
	var calSliderSize = $(".calendar-slider .slide").length;
	
	$(".calendar-slider").slick({
		dots:false,
		speed:1000,
		useCss:true,
		infinite:false,
		slidesToShow:3,
		slidesToScroll:3,
		initialSlide: calSliderSize - 3
	});
	
	// Слайдер Партнеры
	
	$(".partners-slider").slick({
		dots:false,
		speed:1000,
		useCss:true,
		infinite:false,
		slidesToShow:3,
		slidesToScroll:3
	});
	
	// Слайдер Партнеры 2
	
	$(".partners-slider-2").slick({
		dots:false,
		speed:1000,
		useCss:true,
		infinite:false,
		slidesToShow:5,
		slidesToScroll:5
	});
	
	// Слайдер Члены
	
	$(".members-slider").slick({
		dots:false,
		speed:1000,
		useCss:true,
		infinite:false,
		slidesToShow:1,
		slidesToScroll:1
	});
	
	// Слайдер с фотографиями
	
	if ($(".photo-slider").length) {
		$(".photo-slider").bxSlider({
			mode: 'fade',
			pager: true,
			pagerType: 'short'
		})
	}
	
	// --------------------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------------------
	// --------------------------------------------------------------------------------------------------------
	
	// Формы
	
	if ($("input:checkbox").length) {
		$("input:checkbox").iCheck();
	}
	
	$("input:checkbox").on("ifChecked",function() {
		if ($(this).attr("required")) {
			$(this).removeClass("error");
			$(this).parents(".icheckbox").removeClass("icheckbox-error");
		}
	});

  $("input.phone").mask("+7 (999) 999-99-99");
  $("input.date").mask("99.99.9999");

	if ($("select").length) {
		$("select").customSelect();
	}
	
  validateForms();
  
   //AJAX отправка всех форм
	var options = {
		url : "?formRND="+Math.random(),
		type : "POST",
		beforeSubmit: 
			function() {
				$("form[name='call_request']").find("input[type='submit']").after("<div class='ajax-loader' />");
				$("form[name='call_request']").find("input[type='submit']").hide();
			},
		success:
			function(responseText) {
				$("form[name='call_request']").find(".ajax-loader").remove();
				$("form[name='call_request']").find("input[type='submit']").show();
				formSuccess($("form[name='call_request']"),"successPopup");
			}
		};
//	$("form[name='call_request']").ajaxForm(options);
	
	var options = {
		url : "?formRND="+Math.random(),
		type : "POST",
		beforeSubmit: 
			function() {
				$("form[name='membership_request_full']").find("input[type='submit']").after("<div class='ajax-loader' />");
				$("form[name='membership_request_full']").find("input[type='submit']").hide();
			},
		success:
			function(responseText) {
				$("form[name='membership_request_full']").find(".ajax-loader").remove();
				$("form[name='membership_request_full']").find("input[type='submit']").show();
				formSuccess($("form[name='membership_request_full']"),"successPopup");
			}
		};
//	$("form[name='membership_request_full']").ajaxForm(options);
	
	var options = {
		url : "?formRND="+Math.random(),
		type : "POST",
		beforeSubmit: 
			function() {
				$("form[name='membership_request']").find("input[type='submit']").after("<div class='ajax-loader' />");
				$("form[name='membership_request']").find("input[type='submit']").hide();
			},
		success:
			function(responseText) {
				$("form[name='membership_request']").find(".ajax-loader").remove();
				$("form[name='membership_request']").find("input[type='submit']").show();
				formSuccess($("form[name='membership_request']"),"successPopup");
			}
		};
//	$("form[name='membership_request']").ajaxForm(options);
	
});

(function( $ ) {
  $.fn.parallax = function(scrollPos) {
    
		var item = $(this);
		var origTop = parseInt(item.attr("data-origtop"));
		var pFactor = item.data("pfactor")*.5;
		var shift = item.data("shift");
		
		// item.stop().animate({
			// marginTop: (origTop - (scrollPos + window.innerHeight/2))*pFactor + shift
		// },500)
		
		mTop = (origTop - (scrollPos + window.innerHeight/2))*pFactor + shift;
		// item.css({
			// transform: "translateY("+mTop+"px)"
		// })
		
		item.stop().animate({ whyNotToUseANonExistingProperty: mTop }, {
			step: function(now,fx) {
				$(this).css('transform',"translate3d(0px, " + now + "px, 0px)");
			},
			duration:200
		});
		
    
  };
})( jQuery );

(function( jQuery ) {
  jQuery.fn.tabbedContent = function() {
		
		$(this).each(function() {
			var tabs = $(this).find(".tabs").find(".tab");
			var tabContents = $(this).find(".tabs-content").find(".tab-content");
			
			if (!tabs.hasClass("act")) {
				tabs.first().addClass("act");
			}
			
			tabContents.hide().removeClass("act");
			tabContents.filter("[rel='"+tabs.filter(".act").attr("rel")+"']").show().addClass("act");
			
			tabs.click(function() {
				tabs.removeClass("act");
				$(this).addClass("act");
				
				// window.location.hash = $(this).attr("rel");
				
				tabContents.hide().removeClass("act");
				
				tabContents.filter("[rel='"+$(this).attr("rel")+"']").fadeIn(500).addClass("act")
			})
			
		})
    
  }
})( jQuery );

function validateForms() {
  
  $("form").each(function() {
    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
        if (element[0].tagName == "SELECT") {
          element.parents(".form-item").find(".param-selector").addClass("param-sel-error")
        }
				if (element.attr("type") == "checkbox") {
          element.parents(".icheckbox").addClass("icheckbox-error")
        } else {
					error.insertAfter(element);
				}
        
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
				
        $(element).next(".error").remove();
        if ($(element)[0].tagName == "SELECT") {
          $(element).parents(".form-item").find(".param-selector").removeClass("selector-error")
        }
				if ($(element).attr("type") == "checkbox") {
          $(element).parents(".icheckbox").removeClass("icheckbox-error")
        }
      },
      invalidHandler: function(form, validatorcalc) {
				var errors = validatorcalc.numberOfInvalids();
				if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {                    
						validatorcalc.errorList[0].element.focus();
				}
      }
    });
    
    if ($(this).find(".form-date").length) {
      $(this).find(".form-date").rules('add', {
        messages: {
          required:  "Выберите дату"
        }
      });
    }
		
		if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
			$(this).find("input.password-repeat").rules('add', {
        equalTo: ".password"
      });
		}
    
  });  
    
}

jQuery.extend(jQuery.validator.messages, {
    required: "Пожалуйста, заполните это поле!",
    remote: "Please fix this field.",
    email: "Введите правильный e-mail",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function countPoints(cityId) {
  var count = 0;
	for (i in pointsOfSale) {
		if (pointsOfSale[i].cityId == cityId) {
			count++
		}
	}
	
	return count;
	
}

function officesList(cityId) {
	$(".offices-table tr").remove();
  for (i in pointsOfSale) {
		if (pointsOfSale[i].cityId == cityId) {
			$(".offices-table").append("<tr data-pointid='"+pointsOfSale[i].id+"'><td class='name'>"+pointsOfSale[i].name+"</td><td class='address'>"+pointsOfSale[i].address+"</td></tr>")
		}
	}
}

function officeDetails(pointId) {
  $(".office-details .popup-content").html("");
	$(".office-details").hide();
	for (i in pointsOfSale) {
		if (pointsOfSale[i].id == pointId) {
			
			
			$(".office-details .popup-content").append("<div class='button back-link'>Все офисы города</div>");
			$(".office-details .popup-content").append("<div class='office-name'>"+pointsOfSale[i].name+"</div>")
			$(".office-details .popup-content").append("<div class='office-address'>"+pointsOfSale[i].address+"</div>")
			
			$(".office-details .popup-content").append("<div class='office-info clearfix'></div>");
			
			if (pointsOfSale[i].phone) {
				$(".office-details .office-info").append("<div class='office-phone'><h4>Телефон</h4>"+pointsOfSale[i].phone+"</div>")
			}
			
			if (pointsOfSale[i].openingHours) {
				$(".office-details .office-info").append("<div class='office-timetable'><h4>Часы работы</h4>"+pointsOfSale[i].openingHours+"</div>")
			}
			
			var ticketsList ="";
			
			if (pointsOfSale[i].airlineTickets) {
				ticketsList += ", авиабилетов"
			}
			if (pointsOfSale[i].railwayTickets) {
				ticketsList += ", железнодорожных билетов"
			}
			if (pointsOfSale[i].busTickets) {
				ticketsList += ", билетов на междугородние автобусы"
			}
			if (pointsOfSale[i].ferryTickets) {
				ticketsList += ", билетов на паром"
			}
			
			ticketsList = ticketsList.replace(", ","")
			
			
			if (ticketsList != "" ) {
				$(".office-details .office-info").append("<div class='office-services'><h4>Услуги офиса обслуживания</h4><ul class='office-services-list'></ul></div>")
				$(".office-details .office-services-list").append("<li>Бронирование и продажа "+ticketsList+"</li>")
			}
			
			if (pointsOfSale[i].hotelReservations) {
				$(".office-details .office-services-list").append("<li>Бронирование отелей</li>")
			}
			
			if (pointsOfSale[i].tours) {
				$(".office-details .office-services-list").append("<li>Продажа туров</li>")
			}
			
			if (pointsOfSale[i].theatreTickets) {
				$(".office-details .office-services-list").append("<li>Билеты в театр и на концерты</li>")
			}
			
			if (pointsOfSale[i].insurances) {
				$(".office-details .office-services-list").append("<li>Страхование</li>")
			}
			
			if (pointsOfSale[i].airportVipLounges) {
				$(".office-details .office-services-list").append("<li>VIP-залы в аэропортах</li>")
			}
			
			if (pointsOfSale[i].corporate) {
				$(".office-details .office-services-list").append("<li>Корпоративное обслуживание</li>")
			}
			
			if (pointsOfSale[i].moneyTransfers) {
				$(".office-details .office-services-list").append("<li>Денежные переводы</li>")
			}
			
			if (pointsOfSale[i].payments) {
				$(".office-details .office-services-list").append("<li>Прием платежей</li>")
			}
			
			if (pointsOfSale[i].loanPayments) {
				$(".office-details .office-services-list").append("<li>Погашение кредитов</li>")
			}
			
			if (pointsOfSale[i].giftCard) {
				$(".office-details .office-services-list").append("<li>Подарочная карта</li>")
			}
			
			$(".office-details .office-info").append("<div class='office-payments'><h4>Способы оплаты</h4><ul class='office-payments-list'></ul></div>")
			
			$(".office-details .office-payments-list").append("<li>Наличный расчет</li>")
			
			if (pointsOfSale[i].acceptsCreditCards) {
				$(".office-details .office-payments-list").append("<li>Пластиковые карты</li>")
			}
			
			
			if ($(".office-details").height() > 680) {
				$(".offices-popup").css({
					"min-height":$(".office-details").height() + "px"
				})
			}
			
			$(".office-details").fadeIn(100)
		}
	}
}

function openPopup(pupId) {
  var popup = $("#"+pupId);
  $("body").append("<div class='tint' style='display:none;' />");
  popup.addClass("popup-act").fadeTo(500,1);
  
  $(".tint").fadeTo(300,1);
  pupMakeup();
  
  jQuery(document).keydown(function(e){
    if (e == null) { // ie
      keycode = event.keyCode;
    } else { // mozilla
      keycode = e.which;
    }
    
    if(keycode == 27){ // escape, close box
      closePopup()
    }
    
  });
  
  $(".tint").on("click", function () {
    closePopup()
  });
  
  $(".popup .close, .popup .cancel").on("click", function () {
    closePopup()
  });
	
}

function pupMakeup() {
  var popup = $(".popup-act");
  var pupTop = $(window).scrollTop() + ($(window).height() - popup.outerHeight(true))/2;
  if (pupTop < $(window).scrollTop() + 20) pupTop = $(window).scrollTop() + 20;  $(".tint").css("height",$(window).height()).css("width",$("body").width());
  if (!popup.hasClass("price-popup")) {
    popup.css("top",pupTop).css("left",($(window).width()-popup.outerWidth(true))/2);
  } else {
    popup.css("margin-top",$(window).scrollTop() - popup.parent().offset().top - popup.parent().outerHeight(true) + ($(window).height()-popup.outerHeight(true))/2);
  }
  
}

function closePopup() {
  $(".tint").fadeTo(500,0,function() {
    $(this).remove();
  });
  $(".popup-act").removeClass("popup-act").fadeTo(300,0,function() {
    $(this).hide();
  });
}

// Обработчик селектов

(function( $ ) {
  $.fn.customSelect = function() {
    var selects = $(this);
    selects.each(function () {
      var select = $(this);
      
      if (!$(this).next(".param-selector").length) {
        select.css("visibility","hidden").css("position","absolute").css("z-index","-1");
        select.before("<div class='param-selector' id='" + select.attr("id") + "-selector'>");
        var selector = select.prev(".param-selector");
        
        if (select.is(":disabled")) {
          selector.addClass("selector-disabled")
        }
        
        
        selector.append("<div class='param-sel' />").append("<div class='dropdown' />");
        var dropdown = selector.find(".dropdown");
        var paramSel = selector.find(".param-sel");
        paramSel.addClass("initial");
        paramSel.append("<div class='arr' />");
        paramSel.append("<div class='sel-value' />");
        
				if (select.val()) {
					paramSel.find(".sel-value").html(select.find("option[value='" + select.val() + "']").html());
				} else {
					paramSel.find(".sel-value").html(select.find("option:not(:disabled)").first().html());
				}
        
        select.find("option").each(function () {
          
          if (select.find("option").length <= 2) {
          
            if ($(this).val() != select.val()) {
              dropdown.append("<div class='option' val='" + $(this).attr("value") + "'>" + $(this).html() + "</div>");
            } else {
              dropdown.append("<div class='option' style='display:none' val='" + $(this).attr("value") + "'>" + $(this).html() + "</div>");
            }
            
          } else {
						if ($(this).val() != select.val()) {
							dropdown.append("<div class='option' val='" + $(this).attr("value") + "'>" + $(this).html() + "</div>");
            } else {
              dropdown.append("<div class='option' class='selected' val='" + $(this).attr("value") + "'>" + $(this).html() + "</div>");
            }
          }
          
        });
				
				
				//dropdown.jScrollPane({ autoReinitialise: true });
				
      
        paramSel.on("click",function() {
          $(this).parents(".common-form").find(".form-item").css("z-index",1);
          $(this).parents(".form-item").css("z-index",10);
          if (!select.is(":disabled")) {
            if (dropdown.css("display") != "block") {
              $(".dropdown").fadeOut(150);
              $(".param-open").removeClass("param-open");
              dropdown.fadeIn(150);
              selector.addClass("param-open");
              var maxWidth = 0;
              
              $(this).parents(".form-item").prevAll(".form-item").css("z-index","10");
              $(this).parents(".form-item").css("z-index","11");
              $(this).parents(".form-item").nextAll(".form-item").css("z-index","10");
              
              dropdown.find("div").each(function () {
                if ($(this).width() >= maxWidth) {
                  maxWidth = $(this).width();
                }
                if (paramSel.width() >= maxWidth) {
                  maxWidth = paramSel.width() + 1;
                }
              });
              
            } else {
              dropdown.fadeOut(150);
              selector.removeClass("param-open");
            }
          }
        });
        
        dropdown.on("click", "div.option", function() {
          selector.removeClass("param-sel-error");
          paramSel.removeClass("initial");
          var div = $(this);
          paramSel.find(".sel-value").html($(this).html());
          if ($(this).attr("flag")) {
            paramSel.find(".sel-value").attr("flag",$(this).attr("flag"));
          }
          select.val($(this).attr("val")).change();
          if (select.hasClass("hide-ttl")) {
            dropdown.find("div[val='']").remove();
          }
          dropdown.fadeOut(150, function () {
            dropdown.find("div").show().removeClass("selected").removeClass("hidden");
            if (select.find("option").length <= 2) {
              div.addClass("hidden")
            }
            div.addClass("selected");
            div.parents(".param-open").removeClass("param-open");
          });
        });
		
				$(document).mouseup(function (e) {
					var container1 = dropdown;

					if (!container1.is(e.target) // if the target of the click isn't the container...
							&& container1.has(e.target).length === 0) // ... nor a descendant of the container
					{
							dropdown.fadeOut(150)
					}
				});
      
      }
			
    });
    
  };
})( jQuery );

function ajaxBlock(url,element,successCallback) {
  if (!element.prev(".block-ajax-loader").length) {
		element.html("<div class='block-ajax-loader' />")
	}
	$.get( url, function(data) {
		dynamicHtml = data;
	}).done(function() {
		
		element.html(dynamicHtml).hide().waitForImages(function() {
			element.show();
			element.prev(".block-ajax-loader").remove();
			
			// element.find("select").customSelect();
			// element.find("input:checkbox").iCheck();
			
		});
		
		if (successCallback) {
			successCallback();
		}
	
	});
}

// Карта в контактах

function initContactsMap() {



  var myMap = new ymaps.Map("contactsMap", {
		center: [55.775869, 37.612057],
		zoom: 14
	});
	
	myMap.controls
        // Кнопка изменения масштаба.
        .add('zoomControl', { left: 5, top: 5 })
        // Список типов карты
        .add('typeSelector')
        // Стандартный набор кнопок
        .add('mapTools', { left: 35, top: 5 });
	
	myPlacemark = new ymaps.Placemark([55.775869, 37.612057], {
		// Свойства.
		
	}, {
		// Опции.
		// Своё изображение иконки метки.
		iconImageHref: 'images/map-pin.png',
		// Размеры метки.
		iconImageSize: [60, 66],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
		iconImageOffset: [-30, -66]
	});
	
	
  
	myMap.geoObjects.add(myPlacemark);
	
	
}

function formSuccess(obForm,successPopupId) {
  if(obForm.length){
	obForm.find("input[type=text]").each(function(){
		$(this).val("");
		$(this).siblings("label").show();
	});
  }
	if (obForm.parents(".popup").length) {
		closePopup(obForm.parents(".popup"));
	}
  openPopup(successPopupId);
  pupMakeup();
  
  var t = setTimeout(function() {
    closePopup(successPopupId);
  },70000)
   
}