//nav
var nav = {
	gnbScrollTop: 0, // 스크롤의 이전 위치를 저장하는 변수를 0으로 초기화
	delta: 80, // 스크롤 간의 차이를 80으로 설정
    unMob: 960, // 모바일 뷰포트의 너비 기준을 960px로 설정

    //init
	init: function () {
        var windowWidth = window.innerWidth; // 현재 뷰포트의 너비를 windowWidth 변수에 저장
        nav.checkViewport();
		nav.headerChange(); // 다른 메서드를 호출하여 뷰포트를 체크하고 헤더를 변경
            
        $(document).on('click', '.btn.open-nav', function () { //문서의 .btn.open-nav 요소가 클릭되었을 때의 이벤트 리스너를 추가
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
		}); // 네비게이션을 닫는 .btn.close-nav 요소가 클릭되었을 때의 이벤트 리스너를 추가

        if (windowWidth > nav.unMob) { // 현재 뷰포트의 너비가 unMob 변수(960px)보다 큰지 확인
			
			$('body').removeClass('open-mo-nav'); // <body> 요소에서 open-mo-nav 클래스를 제거
			$('body').on('mouseenter focusin', '#nav .gnb-list > li > a', function (e) { // <body>에서 네비게이션의 리스트 아이템에 마우스를 올렸을 때 또는 포커스가 들어왔을 때의 이벤트 리스너를 추가
				$('#header').addClass('nav-hover'); // 헤더에 nav-hover 클래스를 추가
				
				if ($('#header').hasClass('nav-hover') == true) {
					var navH = $('.header-inner').innerHeight(); // .header-inner 요소의 내부 높이를 가져옴
					$('.nav-bg').css("height", navH); // .nav-bg 요소의 높이를 navH로 설정
				}
            });

            $('body').on('mouseleave', '#nav .nav-wrap', function (e) { // <body>에서 네비게이션의 .nav-wrap에 마우스를 벗어났을 때의 이벤트 리스너를 추가
				$('#header').removeClass('nav-hover'); // 헤더에서 nav-hover 클래스를 제거

				if ($('#header').hasClass('nav-hover') == false) {
					var navH = $('.header-inner').innerHeight(); // .header-inner 요소의 내부 높이를 가져옴
					$('.nav-bg').css("height", navH); // .nav-bg 요소의 높이를 navH로 설정
				}
			});
        } else { // 앞선 조건문이 false일 때 실행되는 부분
            //$('#header').removeClass('nav-hover'); // 헤더의 nav-hover 클래스를 제거

            $('body').on('mouseenter focusin', '#nav > ul.gnb-list', function (e) { // body 요소에 이벤트 리스너를 추가
                // mouseenter focusin: 마우스가 요소 위로 진입하거나 포커스가 들어왔을 때 이벤트를 처리, 
                $('#header').removeClass('nav-hover'); // #header의 nav-hover 클래스를 제거
            });

            $('body').on('click', '#nav a.has-depth', function (e) { //  body에 클릭 이벤트 리스너를 추가, 이 리스너는 #nav 내부의 a.has-depth 요소를 타겟
                e.stopImmediatePropagation(); // 이벤트 전파를 즉시 중지
                e.preventDefault(); // 기본 동작을 취소
            
                var moTarget = $(this).closest('li'),
                    realTarget = $(this).attr('href');
            
                if ($(moTarget).hasClass('active')) { // 선택한 li 요소가 active 클래스를 가지고 있는지 확인
                    location.href = realTarget; // 만약 이미 active 클래스를 가지고 있다면, realTarget URL로 이동
                } else {
                    $(moTarget).addClass('active');
                    $(moTarget).siblings('li').removeClass('active');
                }
            });
        }

		$(window).on("scroll", function (e) { // 윈도우의 스크롤 이벤트에 대한 리스너를 추가
			var st = $(this).scrollTop(); // 현재 윈도우의 스크롤 위치(scrollTop)를 변수 st에 저장

			//scroll Check // 스크롤 위치에 따라 body 요소의 클래스를 조작
			if (st == 0) {
				$('body').removeClass('scroll-has'); // 스크롤이 맨 위에 있을 때, scroll-has 클래스를 제거
			} else {
				$('body').addClass('scroll-has'); // 스크롤이 맨 위에 있지 않을 때, scroll-has 클래스를 추가

				if(st == $(document).height() - $(window).height()){
					$('body').addClass('scroll-end'); // 스크롤이 페이지 하단에 도달했을 때, scroll-end 클래스를 추가
				} else {
					$('body').removeClass('scroll-end'); // 스크롤이 페이지 하단에 도달하지 않았을 때, scroll-end 클래스를 제거
				}
			}

            if (Math.abs(nav.gnbScrollTop - st) <= nav.delta) return; // 스크롤 위치의 변동이 일정 값(delta) 이내일 경우 함수 실행을 중단

			//scroll up/down // 스크롤 방향에 따라 body 요소의 클래스를 조작
			if ((st > nav.gnbScrollTop) && (nav.gnbScrollTop > 0)) {
				$('body').addClass('scroll-down').removeClass('scroll-up'); // 스크롤이 아래로 이동했을 때, scroll-down 클래스를 추가하고 scroll-up 클래스를 제거
			} else {
				$('body').addClass('scroll-up').removeClass('scroll-down'); // 스크롤이 위로 이동했을 때, scroll-up 클래스를 추가하고 scroll-down 클래스를 제거
			}
			nav.gnbScrollTop = st; // 현재 스크롤 위치를 nav.gnbScrollTop 변수에 저장
		});
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
		nav.headerChange();
	},

	//current // 현재 메뉴 항목을 표시하기 위한 함수
	current: function (dep1, dep2) { 
		var gnb = $('#nav .gnb-list > li'), // 메뉴 항목과 그에 해당하는 하위 항목들을 jQuery 선택자를 사용하여 변수에 저장
			current1 = dep1 - 1, // dep1에서 1을 뺀 값을 current1 변수에 저장합니다. 배열의 인덱스는 0부터 시작하기 때문
			gnbDep = $(gnb).eq(current1).find('li'), // 메뉴 항목과 그에 해당하는 하위 항목들을 jQuery 선택자를 사용하여 변수에 저장
			current2 = dep2 - 1; // dep2에서 1을 뺀 값을 current2 변수에 저장

		//dep1 // 첫 번째 메뉴 항목에 대한 코드
		if (!dep1 == "") { // dep1이 비어 있지 않은 경우를 확인
			$(gnb).eq(current1).addClass('current'); // current1에 해당하는 메뉴 항목에 current 클래스를 추가
			$(gnb).eq(current1).siblings().removeClass('current'); // current1에 해당하지 않는 다른 메뉴 항목들의 current 클래스를 제거
		}

		//dep2 // 두 번째 메뉴 항목에 대한 코드
		if (!dep2 == "") { // dep2가 비어 있지 않은 경우를 확인
			$(gnbDep).eq(current2).addClass('current'); // current2에 해당하는 메뉴 항목의 하위 항목에 current 클래스를 추가
			$(gnbDep).eq(current2).siblings().removeClass('current'); // current2에 해당하지 않는 다른 하위 항목들의 current 클래스를 제거
		}
	},

	//headerChange // 헤더의 상태를 변경하기 위한 함수입니다.
	headerChange: function () {
        // 현재 스크롤 위치(st), 헤더 요소($header), 헤더의 높이(headerH)를 변수로 선언
		var st = $(window).scrollTop(), // 현재 윈도우의 스크롤 위치
			$header = $("#header"), // 헤더 요소를 jQuery 선택자를 사용하여 변수에 저장
			headerH = $header.outerHeight(); // 헤더 요소의 외부 높이(여백 포함)를 가져와 headerH 변수에 저장

		//header Fix // 헤더를 고정시키기 위한 코드
		if (st > headerH) { // 현재 스크롤 위치가 헤더의 높이보다 큰지 확인
			$header.addClass("fixed"); // 현재 스크롤 위치가 헤더의 높이보다 크면, 헤더에 fixed 클래스를 추가하여 고정
		} else { // 현재 스크롤 위치가 헤더의 높이보다 작을 경우
			$header.removeClass("fixed"); // 헤더에서 fixed 클래스를 제거하여 고정을 해제
		}
	}
}