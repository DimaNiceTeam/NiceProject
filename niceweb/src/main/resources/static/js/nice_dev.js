jQuery(function(){
	gsap.registerPlugin(ScrollTrigger);
	let getAllAos = Array.prototype.slice.call(document.querySelectorAll('[data-aos]'))

	// scroller
	const bodyScroller = document.querySelector('.scroller');
	let bodyScrollBar = Scrollbar.init(bodyScroller, {
		speed: 10,
		damping: 0.1,
		mobile: {
			speed: 0.5
		}
	});
	bodyScrollBar.setPosition(0, 0);
	bodyScrollBar.track.xAxis.element.remove();
	ScrollTrigger.scrollerProxy(bodyScroller, {
		scrollTop(value) {
			if (arguments.length) {
				bodyScrollBar.scrollTop = value;
			}
			return bodyScrollBar.scrollTop;
		}
	});
	bodyScrollBar.addListener(ScrollTrigger.update);
	ScrollTrigger.defaults({
		scroller: bodyScroller
	});
	Scrollbar.initAll(); //smooth-scrollbar (모든 스크롤영역에 data-scrollbar 적용)

	AOS.init({
		easing: 'ease-out-quart',
		duration: 1200,
		once: true,
	});

	getAllAos.length > 0 && getAllAos.forEach((item) => {
		gsap.to(item, {
			scrollTrigger: {
				trigger: item,
				start: 'top center',
				end: 'bottom center',
				once: true,
				onEnter: (scroll) => {
					item.classList.add('aos-animate');
				}
			}
		})
	});

	// window scroll event
	bodyScrollBar.addListener(function (){
		var st = $(this).scrollTop();

		//scroll Check
		if (st == 0) {
			$("body").addClass("scroll-zero").removeClass("scroll-has");
		} else {
			$("body").addClass("scroll-has").removeClass("scroll-zero");

			if(st == $(document).height() - $(window).height()){
				$('body').addClass('scroll-end');
			} else {
				$('body').removeClass('scroll-end');
			}
		}

		if (Math.abs(nav.gnbScrollTop - st) <= nav.delta) return;

		//scroll up/down
		if ((st > nav.gnbScrollTop) && (nav.gnbScrollTop > 0)) {
			$('body').addClass('scroll-down').removeClass('scroll-up');
		} else {
			$('body').addClass('scroll-up').removeClass('scroll-down');
		}
		nav.gnbScrollTop = st;
	});

	nav.init();

	$(window).on("resize", function () {
		nav.resize();
	});

	$(window).on("scroll", function () {
		nav.resize();
	});

	$('.select-box').each(function () {
		var select = $(this).children('select');

		select.click(function(){
			$(this).parent('.select-box').toggleClass('active');
		});

		$(document).mouseup(function(e) {
			if($('.select-box').hasClass('active') == true){
				if(!$('.select-box').has(e.target).length) {
					$('.select-box').removeClass('active');
				}
			}
		});
	});

	AOS.init({
		easing: 'ease-out-quart',
		duration: 1200,
		once: true,
	});

});

//nav
var nav = {
	gnbScrollTop: 0,
	delta: 80,
	unMob: 960,

	//init
	init: function () {
		var windowWidth = window.innerWidth;

		nav.checkViewport();
		nav.headerChange();

		$(document).on('click', '.btn.open-nav', function () {
			if ($('body').hasClass('opened-nav')) {
				//nav.closeNav();
			} else {
				nav.openNav();
			}
		});

		$(document).on('click', '.btn.close-nav', function () {
			if ($('body').hasClass('opened-nav')) {
				nav.closeNav();
			}
		});

		$(document).on('click', '#header .language > .btn', function (e) {
			var langBtn = $(this).parent('.language'); 
			if (langBtn.hasClass('on') == true) {
				langBtn.removeClass('on');
			} else {
				langBtn.addClass('on');
			}
		});
	
		$(document).mouseup(function (e) {
			if ($('#header .language').hasClass('on') == true) {
				if (!$('#header .language').has(e.target).length) {
					$('#header .language').removeClass('on');
				}
			}
		});

		if (windowWidth > nav.unMob) {
			
			$('body').removeClass('open-mo-nav');
			$('body').on('mouseenter focusin', '#nav .gnb-list > li > a', function (e) {
				$('#header').addClass('nav-hover');
				
				if ($('#header').hasClass('nav-hover') == true) {
					var navH = $('.header-inner').innerHeight();
					$('.nav-bg').css("height", navH);
					if($('.gnb-list > li:hover > a').hasClass('has-depth') == true) {
						$('.nav-bg').addClass('active');	
						$('.nav-bg').css("height", navH * 2);
					} else {
						$('.nav-bg').removeClass('active');
						$('.nav-bg').css("height", navH);
					}
					
				}

				if ($('#header .language').hasClass('on') == true) {
					if (!$('#header .language').has(e.target).length) {
						$('#header .language').removeClass('on');
					}
				}
			});

			$('body').on('mouseleave', '#nav .nav-wrap', function (e) {
				$('#header').removeClass('nav-hover');

				if ($('#header').hasClass('nav-hover') == false) {
					var navH = $('.header-inner').innerHeight();
					$('.nav-bg').css("height", navH);
					if($('.gnb-list > li:hover > a').hasClass('has-depth') == true) {
						$('.nav-bg').addClass('active');	
						$('.nav-bg').css("height", navH * 2);
					} else {
						$('.nav-bg').removeClass('active');
						$('.nav-bg').css("height", navH);
					}
				}
			});

			$(document).on('click', '#header .language > .btn', function (e) {
				var langBtn = $(this).parent('.language'); 
				if (langBtn.hasClass('on') != true) {
					langBtn.removeClass('on');
				} else {
					langBtn.addClass('on');
				}
			});
		
			$(document).mouseup(function (e) {
				if ($('#header .language').hasClass('on') == true) {
					if (!$('#header .language').has(e.target).length) {
						$('#header .language').removeClass('on');
					}
				}
			});	
			

		} else {
			//$('#header').removeClass('nav-hover');

			$('body').on('mouseenter focusin', '#nav > ul.gnb-list', function (e) {
				$('#header').removeClass('nav-hover');
			});

			$('body').on('click', '#nav a.has-depth', function (e) {
				e.stopImmediatePropagation();
				e.preventDefault();

				var moTarget = $(this).closest('li'),
					realTarget = $(this).attr('href');

				if ($(moTarget).hasClass('active')) {
					location.href = realTarget;
				} else {
					$(moTarget).addClass('active');
					$(moTarget).siblings('li').removeClass('active');
				}
			});
		}

		$(window).on("scroll", function (e) {
			var st = $(this).scrollTop();

			//scroll Check
			if (st == 0) {
				$('body').removeClass('scroll-has');
			} else {
				$('body').addClass('scroll-has');

				if(st == $(document).height() - $(window).height()){
					$('body').addClass('scroll-end');
				} else {
					$('body').removeClass('scroll-end');
				}
			}

			if (Math.abs(nav.gnbScrollTop - st) <= nav.delta) return;

			//scroll up/down
			if ((st > nav.gnbScrollTop) && (nav.gnbScrollTop > 0)) {
				$('body').addClass('scroll-down').removeClass('scroll-up');
			} else {
				$('body').addClass('scroll-up').removeClass('scroll-down');
			}
			nav.gnbScrollTop = st;
		});
	},

	//checkViewport
	checkViewport: function () {
		var wWidth = window.innerWidth;

		if(wWidth > nav.unMob) {
			$('body').removeClass('is-mobile');
		} else {
			$('body').addClass('is-mobile');
		}

		//for ios vh
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	},

	//openNav
	openNav: function () {
		$('body').addClass("opened-nav");
	},

	//closeNav
	closeNav: function () {
		$('body').removeClass("opened-nav");
	},

	//resize
	resize: function () {
		nav.checkViewport();
		nav.headerChange();
	},

	//current
	current: function (dep1, dep2) {
		var gnb = $('#nav .gnb-list > li'),
			current1 = dep1 - 1,
			gnbDep = $(gnb).eq(current1).find('li'),
			current2 = dep2 - 1;

		//dep1
		if (!dep1 == "") {
			$(gnb).eq(current1).addClass('current');
			$(gnb).eq(current1).siblings().removeClass('current');
		}

		//dep2
		if (!dep2 == "") {
			$(gnbDep).eq(current2).addClass('current');
			$(gnbDep).eq(current2).siblings().removeClass('current');
		}
	},

	//headerChange
	headerChange: function () {
		var st = $(window).scrollTop(),
			$header = $("#header"),
			headerH = $header.outerHeight();

		//header Fix
		if (st > headerH) {
			$header.addClass("fixed");
		} else {
			$header.removeClass("fixed");
		}
	}
}

// modalOpen
function modalOpen(popId){
	$(popId).addClass("active");
	$('body').addClass("modal-opened");
}

// modalClose
function modalClose(popId){
	$(popId).removeClass("active");
	$('body').removeClass("modal-opened");
}

//tabLink
function tabLink() {
	$('.tabs > li a').each(function(){
		var tabTarget = $(this).attr('href'),
			linkTarget = $(this).attr('title');

		$(this).click(function(e){
			if (linkTarget != '페이지이동'){
				e.preventDefault();
			}

			$(this).parent('li').addClass('current');
			$(this).parent('li').siblings('li').removeClass('current');
			$(tabTarget).addClass('active').siblings('.tab-content').removeClass('active');
		});
	});
}

//numberMaxLength
function numberMaxLength(e){
	if(e.value.length > e.maxLength){
		e.value = e.value.slice(0, e.maxLength);
	}
}


// familySite (select)
function familySite() {
	$('.select.family').on('change', function (e) {
		var getValue = $(this).val();
		window.open(getValue, '_blank');
	});
}