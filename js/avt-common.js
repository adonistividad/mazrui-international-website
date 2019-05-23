$('#at-menu-icon').click(function(){
	 if ($(this).is('.open')) {
		$(this).removeClass('open');
		$(this).addClass('close');
	}else{
		$(this).removeClass('close');
		$(this).addClass('open');
	}
});
$('#at-menu-nav li').click(function(){
	$(this).children('a')[0].click();
});
$('#at-menu-nav a').click(function(){
	//$('#at-menu-nav').parent().hide();
	$('#at-menu-icon').removeClass('open');
});
$('.fn-scroll').click(function(){
	fnScroll($(($(this).attr('href'))));
	$('a.selected').removeClass('selected');
	$(this).addClass('selected');
	
});
$('.img-preview-icon').click(function(){
	alert('preview');
});

/*--- common functions ---*/
function fnScroll(el){
	$('html, body').stop().animate({scrollTop: el.offset().top}, 1000, 'swing', function() { 
		//alert("Finished animating");
	});
}	
 
/*--- check if element is in view port and activate animation ---*/
$.fn.isInViewport = function() {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};
var lastScrollTop = 0;
var isScrolling=false;
$(window).on('resize scroll', function(e) {
	var isScrollDown=false;
	var st = $(this).scrollTop();
	if (st > lastScrollTop){
		isScrollDown=true;
		//alert('downscroll code| isScrolling:'+isScrolling);
	} else {
		
		//alert('upscroll code');
	}
	lastScrollTop = st;

	var elScroll=null, elTop=null, elBottom=null;
	var activeSection = '';
	$('[animated]').each(function() {
		if ($(this).isInViewport()) {
			activeSection += $(this).attr('hid')+'>>isScrollDown:'+isScrollDown+' ';
			//$('#result').text('in viewport:'+activeSection);
			if(elTop==null){elTop=$(this);}
			else{elBottom=$(this);}
			//alert($(elBottom).attr('animated'));
			
			$(this).addClass('animated '+$(this).attr('animated'));
			
		} else {
			// The element is NOT visible, do something else
		}
	});
	if(isScrollDown){
		//elBottom.addClass('animated '+elBottom.attr('animated'));
	}
	//$('#result2').text('elTop: '+elTop.attr('animated')+' elBottom: '+elBottom.attr('animated'));

});


$(window).on('resize', function(e) {
	$('#at-menu-icon').removeClass('open');
});

if ( $( ".animate-header" ).length ) {
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();
		scrollHeader(scroll);
	});

	header=$('#header');
	scrollHeader(0);
	function scrollHeader(scroll){
		x=header.css('backgroundColor');
		hexColor=hexc(x);
		//alert(hexColor);
		
		//alert(header.height());
		
		opacity=1;
		paddingTop=0;
		$('#scroll-top').show();
		header.removeClass('is-top-page');
		if (scroll <= 10) { opacity=0;paddingTop=10;$('#scroll-top').hide();header.addClass('is-top-page');}

		//hexColor="#333333";
		rgbaCol = 'rgba(' + parseInt(hexColor.slice(-6,-4),16)
			+ ',' + parseInt(hexColor.slice(-4,-2),16)
			+ ',' + parseInt(hexColor.slice(-2),16)
			+','+ opacity +')';		
			
		header.css('background-color', rgbaCol);
		header.css('padding-top', paddingTop+'px');
		
	}
} 
function hexc(colorval) {
	var parts = colorval.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
	delete(parts[0]);
	for (var i = 1; i <= 3; ++i) {
		parts[i] = parseInt(parts[i]).toString(16);
		if (parts[i].length == 1) parts[i] = '0' + parts[i];
	}
	return '#' + parts.join('').substring(0, 6);
}

	
 

/*** srcset & sizes - for website image loading efficiency [start] ***/
class ResponsiveBackgroundImage {
	constructor(element) {
		this.element = element;
		this.img = element.querySelector('img');
		this.src = '';

		this.img.addEventListener('load', () => {
			this.update();
		});

		if (this.img.complete) {
			this.update();
		}
	}
	update() {
		let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
		if (this.src !== src) {
			this.src = src;
			this.element.style.backgroundImage = 'url("' + this.src + '")';

		}
	}
} 

let elements = document.querySelectorAll('[data-responsive-background-image]');  
for (let i=0; i<elements.length; i++) {  
	new ResponsiveBackgroundImage(elements[i]);
}
/*** srcset & sizes - for website image loading efficiency [end] ***/
