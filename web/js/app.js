(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function( $ ){

  var PageSlider = function(options){

    this.container = options.container;
    this.beforeSlide = options.beforeSlide;
    this.afterSlide = options.afterSlide;
    this.currentPage = undefined;
    this.currentView = undefined;
    this.stateHistory = options.initialHistory || [];
    this.hasHistory = false;

  };

  PageSlider.prototype = {
    back : function(){
      if (this.stateHistory[this.stateHistory.length - 2] != null) {
        this.hasHistory = true;
        location.hash = this.stateHistory[this.stateHistory.length - 2];
      } else {
        this.hasHistory = false;
        location.hash = '#';
      } },
    home: function(){
      this.stateHistory = ["", ""];
      location.hash = '#';
    }, 
    removeHistoryByLength: function(length) { 
      for (var i = 0; i < length; i++){
        this.stateHistory.pop();
      }
    },
    backAndRestartHistory: function(){
      this.stateHistory =["", window.location.hash];
      this.back();
    },
    overWriteLastHistoryKeyDate: function(yyyymmdd) {
      var lastIndex, lastState;
      lastIndex = this.stateHistory.length - 1;
      lastState = this.stateHistory[lastIndex];
      return this.stateHistory[lastIndex] = lastState.replace(/\d{8}/, yyyymmdd);
    },
    overWriteLastHistory : function(locationHash) {
      var lastIndex;
      lastIndex = this.stateHistory.length - 1;
      this.stateHistory[lastIndex] = locationHash;
    },
    slidePage : function(renderedView, options) {

      var l, state;
      var _options = options || {};

      l = this.stateHistory.length;
      state = window.location.hash;
      if (l === 0) {
        this.stateHistory.push(state);
        this.slidePageFrom(renderedView);
        return;
      }
      if (state === this.stateHistory[l - 2]) {
        this.stateHistory.pop();
        return this.slidePageFrom(renderedView, "page-left");
      } else {
        this.stateHistory.push(state);
        return this.slidePageFrom(renderedView, "page-right");
      }
    },

    slidePageFrom : function(renderedView, from) {
      var page;
      if (this.beforeSlide) {
        this.beforeSlide();
      }
      page = renderedView.$el;
      this.container.append(page);
      if (!this.currentPage || !from) {
        page.attr("class", "page page-center");
        this.currentPage = page;
        this.currentView = renderedView;
        if (this.afterSlide) {
          this.afterSlide();
        }
        return;
      }
      page.attr("class", "page " + from);
      this.currentPage.one("webkitTransitionEnd", (function(_this) {
        return function(e) {
          $(e.target).remove();
          _this.currentView.destroy();
          _this.currentView = renderedView;
          _this.toTop();
          if (_this.afterSlide) {
            return _this.afterSlide();
          }
        };
      })(this));
      this.container[0].offsetWidth;
      page.attr("class", "page transition page-center");
      this.currentPage.attr("class", "page transition " + (from === "page-left" ? "page-right" : "page-left"));
      return this.currentPage = page;
    },

    toTop : function() {
      return setTimeout(function() {
        return window.scrollTo(0, 0);
      }, 100);
    },
    isBack : function(){
      if (this.hasHistory) {
        return true;
      } else {
        return false;
      }
    },


  };

  return PageSlider;

});




},{}],2:[function(require,module,exports){
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.7
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
window.$ = require('jquery');
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;if(b.$slider.children().children().length >0){b.$slides=b.$slider.children().children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide");}else{b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide");};b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.options.arrows===!0&&(c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove())),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var c=this,d=c.currentSlide;c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),c.asNavFor(e),void 0):(c.slideHandler(e),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?0!==i.slideCount%i.options.slidesToScroll?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?0!==i.slideCount%i.options.slidesToScroll?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)
})):i.postSlide(e),i.animateHeight(),void 0):(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.swipeLeft=b.options.vertical===!1?d+f*g:d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this,b=a.$slider.find("*").is(":focus");a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false",tabindex:"0"}).find("a, input, button, select").attr({tabindex:"0"}),b&&a.$slideTrack.find(".slick-active").focus()},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length,f=0;for(f;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
},{"jquery":"HlZQrA"}],3:[function(require,module,exports){
var jQuery = require('jquery');

(function ($) {
  'use strict';
  var _resString = "";
  var _resUrl = "";
  var _resRetry = false;
  var _lotId = "";
  var _loseString = "blank";

  function ScratchPad(el, options) {
    this.$el = $(el);
    this.options = options;

    this.init = false;
    this.enabled = true;

    this._generate();
  }

  ScratchPad.prototype = {
    _generate: function () {

      // Throw message if canvas is not supported.
      if (!$.support.canvas) {
        this.$el.append('Canvas is not supported in this browser.');
        return true;
      }

      // Setup canvas and context.
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      // Make sure it's at least relative.
      if (this.$el.css('position') === 'static') {
        this.$el.css('position', 'relative');
      }

      this.$img = $('<img src="" id="resImg"/>').attr('crossOrigin', '').css({position: 'absolute', width: '100%', height: '100%'});
      // Make sure we sett style width height here for elastic stretch
      // and better support for mobile if we are resizing the scratch pad.
      this.$scratchpad = $(this.canvas).css({position: 'absolute', width: '100%', height: '100%'});

      this.$scratchpad.bindMobileEvents();

      // Setup event handlers.
      this.$scratchpad
      .mousedown($.proxy(function (e) {

        // If disabled we just return true which menas
        // our our this.scratch will remain as false.
        if (!this.enabled) {
          return true;
        }

        this.canvasOffset = $(this.canvas).offset();

        this.scratch = true;
        this._scratchFunc(e, 'Down');
        this.canvas.style.zIndex++;
      }, this))
      .mousemove($.proxy(function (e) {
        if (this.scratch) {
          this._scratchFunc(e, 'Move');
          this.canvas.style.zIndex++;
        }
      }, this))
      .mouseup($.proxy(function (e) {
        if (this.scratch) {
          this.scratch = false;
          this._scratchFunc(e, 'Up');
        }
      }, this));

      // Run options
      this._setOptions();

      // Apepnd items
      this.$el.append(this.$img).append(this.$scratchpad);

      // Initialize and reset
      this.init = true;
      this.reset();
    },
    
    setResult: function(show) {
      var _this = this;
      // call complete
      $('#alt-link').hide();
      App.btApi.completeScratch({
        lotId: _lotId
      })
      .done(function(data) {
        if(data.errorCode === '0000') {
          if (show) {
            // $('#resImg').css('z-index', 100);
            $('#resImg').addClass('with-fadein');
            $("#win-msg").addClass('with-popup');
          }
          $('#resImg').attr('src', AppConf.scratchImg.url + AppConf.core.applicationId + "/" + _resString + '.png');
          _this.clear();
          if (_resString != _loseString) $("#win-msg").show();
          window.localStorage.removeItem(AppConf.core.applicationId + "-user_point_" + App.appModel.getAuthInfo().token);
          if (_resRetry) {
            var hWindow = $(window).height(),
                hPlayScratch = $('.play-scratch').height(),
                distance = hWindow - hPlayScratch;
            if ( show ) {
              $("#btnRetry").addClass('hide');
              $('.play-scratch').css({ top: distance/2 + 'px' });
            } else {
              $('.play-scratch').css({ top: distance/2 - 30 + 'px' });
              $("#btnRetry").removeClass('hide');
            }
          }
        } else {
          console.log('error: errorCode=' + data.errorCode);
          $('#resImg').parent('div').html(AppConf.scratch.scratchErrMsg['0001']).show();
        }
        App.util.hideProgressScreen();
      })
      .fail(function(err) {
        $('#resImg').parent('div').html(AppConf.scratch.scratchErrMsg['0001']).show();
        console.log('error: failed to post.');
        App.util.hideProgressScreen();
      });
    },

    getResult: function(show) {
      var _this = this;
      // Get scratch result
      var param;
      switch ( AppConf.scratch.type ) {
        case 1:
          param = {custId: this.options.custId};
          break;
        case 2:
          param = {shopId: this.options.shopId};
          break;
        default:
          param = {scratchId: this.options.scratchId};
          break;
      };

      App.btApi.drawScratch(param)
      .done(function(data) {
        if(data.errorCode === '0000') {
          _resString = data.resutlString;
          _resUrl = data.resultUrl;
          _lotId = data.lotId;
          if (show == true) {
            _this.setResult(show);
            $('canvas').remove();
          }
        } else {
          if (AppConf.scratch.type === 0) {
              $('#resImg').parent('div').html(AppConf.scratch.scratchErrMsg[data.errorCode] + "(" + data.errorCode + ")").show();
            } else {
              if (data.errorCode === '0001') {
                $('#resImg').parent('div').html(AppConf.scratch.scratchErrMsg['0013'] + "(" + data.errorCode + ")").show();
              } else {
                $('#resImg').parent('div').html(AppConf.scratch.scratchErrMsg[data.errorCode] + "(" + data.errorCode + ")").show();
              }
            }
            $('#alt-link').hide();
        }
        App.util.hideProgressScreen();
      })
      .fail(function(err) {
        $('#resImg').parent('div').html(AppConf.scratch.scratchErrMsg['0001']).show();
        console.log('error: failed to post.');
        App.util.hideProgressScreen();
        $('#alt-link').hide();
      });
    },

    reset: function () {
      if ( App.appModel.getAuthInfo().token === "" ) {
        location.hash = "login";
        return;
      }
      
      _resRetry = AppConf.scratch.retryFlg;
      
      $('#resImg').css('z-index', 0);
      
      var _this = this,
          width = Math.ceil(this.$el.innerWidth()),
          height = Math.ceil(this.$el.innerHeight()),
          devicePixelRatio = window.devicePixelRatio || 1;

      // Set number of pixels required for getting scratch percentage.
      this.pixels = width * height;

      // We'll do a hard reset for the height here in case
      // we need to run this at differnt sizes.
      this.$scratchpad.attr('width', width).attr('height', height);

      // Default to image hidden in case no bg or color is set.
      this.$img.hide();
      
      // Get scratch result
      this.getResult();
      
      // Set bg.
      if (AppConf.scratch.bg) {
          if (AppConf.scratch.bg.charAt(0) === '#') {
            this.$el.css('backgroundColor', AppConf.scratch.bg);
          }
          else {
            this.$el.css('backgroundColor', '');
            this.$img.attr('src', AppConf.scratch.bg);
          }
        }
      
      // Set fg.
      if (AppConf.scratch.fg) {
        if (AppConf.scratch.fg.charAt(0) === '#') {
          this.ctx.fillStyle = AppConf.scratch.fg;
          this.ctx.beginPath();
          this.ctx.rect(0, 0, width, height);
          this.ctx.fill();
          this.$img.show();
        }
        else {
          // Have to load image before we can use it.
          $(new Image())
          .attr('crossOrigin', '')
          .attr('src', AppConf.scratch.fg)
          .load(function () {
            _this.ctx.drawImage(this, 0, 0, width, height);
            _this.$img.show();
          });
        }
      }
    },

    clear: function () {
      this.canvas.style.zIndex = 0;
      $('#resImg').css('z-index', 100);
      this.ctx.clearRect(0, 0, Math.ceil(this.$el.innerWidth()), Math.ceil(this.$el.innerHeight()));
    },

    enable: function (enabled) {
      this.enabled = enabled === true ? true : false;
    },

    destroy: function () {
      this.$el.children().remove();
      $.removeData(this.$el, 'wScratchPad');
    },

    _setOptions: function () {
      var opt, func;

      for (opt in this.options) {
        this.options[opt] = this.$el.attr('data-' + opt) || this.options[opt];
        func = 'set' + opt.charAt(0).toUpperCase() + opt.substring(1);

        if (this[func]) {
          this[func](this.options[opt]);
        }
      }
    },

    setBg: function () {
      if (this.init) {
        this.reset();
      }
    },

    setFg: function () {
      this.setBg();
    },

    setCursor: function (cursor) {
      this.$el.css('cursor', cursor);
    },

    _scratchFunc: function (e, event) {
      e.pageX = Math.floor(e.pageX - this.canvasOffset.left);
      e.pageY = Math.floor(e.pageY - this.canvasOffset.top);

      this['_scratch' + event](e);

      if (this.options.realtime || event === 'Up') {
        if (this.options['scratch' + event]) {
          this.options['scratch' + event].apply(this, [e, this._scratchPercent()]);
        }
      }
    },

    _scratchPercent: function() {
      if ( Math.floor((Math.random()*100)) > 90 ) {
        var hits = 0,
            imageData = this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height);

        for (var i=0, ii=imageData.data.length; i<ii; i=i+4) {
          if (imageData.data[i] === 0 && imageData.data[i+1] === 0 && imageData.data[i+2] === 0 && imageData.data[i+3] === 0) {
            hits++;
          }
        }

        return (hits / this.pixels) * 100;
      } else {
        return false;
      } 
    },

    _scratchDown: function (e) {
      if ( applican.config.device_os === "ANDROID" ) {
        $(this.canvas).css('margin-right', $(this.canvas).css('margin-right') == "0px" ? "1px" : "0px");
      }
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineJoin = 'round';
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = this.options.color;
      this.ctx.lineWidth = this.options.size;

      //draw single dot in case of a click without a move
      this.ctx.beginPath();
      this.ctx.arc(e.pageX, e.pageY, this.options.size/2, 0, Math.PI*2, true);
      this.ctx.closePath();
      this.ctx.fill();

      //start the path for a drag
      this.ctx.beginPath();
      this.ctx.moveTo(e.pageX, e.pageY);
    },

    _scratchMove: function (e) {
      if ( applican.config.device_os === "ANDROID" ) {
        $(this.canvas).css('margin-right', $(this.canvas).css('margin-right') == "0px" ? "1px" : "0px");
      }
      this.ctx.lineTo(e.pageX, e.pageY);
      this.ctx.stroke();
    },

    _scratchUp: function () {
      if ( applican.config.device_os === "ANDROID" ) {
        $(this.canvas).css('margin-right', $(this.canvas).css('margin-right') == "0px" ? "1px" : "0px");
      }
      this.ctx.closePath();
    }
  };

  $.support.canvas = (document.createElement('canvas')).getContext;

  $.fn.wScratchPad = function (options, value) {
    function get() {
      var wScratchPad = $.data(this, 'wScratchPad');

      if (!wScratchPad) {
        wScratchPad = new ScratchPad(this, $.extend(true, {}, options));
        $.data(this, 'wScratchPad', wScratchPad);
      }

      return wScratchPad;
    }

    if (typeof options === 'string') {
      var wScratchPad,
          values = [],
          func = (value !== undefined ? 'set' : 'get') + options.charAt(0).toUpperCase() + options.substring(1),

          setOpt = function () {
            if (wScratchPad.options[options]) { wScratchPad.options[options] = value; }
            if (wScratchPad[func]) { wScratchPad[func].apply(wScratchPad, [value]); }
          },

          getOpt = function () {
            if (wScratchPad[func]) { return wScratchPad[func].apply(wScratchPad, [value]); }
            else if (wScratchPad.options[options]) { return wScratchPad.options[options]; }
            else { return undefined; }
          },

          runOpt = function () {
            wScratchPad = $.data(this, 'wScratchPad');

            if (wScratchPad) {
              if (wScratchPad[options]) { wScratchPad[options].apply(wScratchPad, [value]); }
              else if (value !== undefined) { setOpt(); }
              else {  values.push(getOpt()); }
            }
          };

      this.each(runOpt);

      return values.length ? (values.length === 1 ? values[0] : values) : this;
    }

    options = $.extend({}, $.fn.wScratchPad.defaults, options);

    return this.each(get);
  };

  $.fn.wScratchPad.defaults = {
    size        : 5,          // The size of the brush/scratch.
    bg          : '#cacaca',  // Background (image path or hex color).
    fg          : '#6699ff',  // Foreground (image path or hex color).
    realtime    : true,       // Calculates percentage in realitime
    scratchDown : null,       // Set scratchDown callback.
    scratchUp   : null,       // Set scratchUp callback.
    scratchMove : null,       // Set scratcMove callback.
    cursor      : 'crosshair' // Set cursor.
  };

  $.fn.bindMobileEvents = function () {
    $(this).on('touchstart touchmove touchend touchcancel', function (event) {
      var touches = (event.changedTouches || event.originalEvent.targetTouches),
          first = touches[0],
          type = '';
      if (typeof first === "undefined") {
        return;
      }

      switch (event.type) {
      case 'touchstart':
        type = 'mousedown';
        break;
      case 'touchmove':
        type = 'mousemove';
        event.preventDefault();
        break;
      case 'touchend':
        type = 'mouseup';
        break;
      default:
        return;
      }

      var simulatedEvent = document.createEvent('MouseEvent');

      simulatedEvent.initMouseEvent(
        type, true, true, window, 1,
        first.screenX, first.screenY, first.clientX, first.clientY,
        false, false, false, false, 0/*left*/, null
      );

      first.target.dispatchEvent(simulatedEvent);
    });
  };
})(jQuery);
},{"jquery":"HlZQrA"}],4:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length, unitSize) {
  if (unitSize) length -= length % unitSize;
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":5,"ieee754":6,"is-array":7}],5:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],6:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],7:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],8:[function(require,module,exports){
// application
require('./hinagata/main');

},{"./hinagata/main":173}],9:[function(require,module,exports){
// Libraries
// 
window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

// App Core
var Router = require('./router');
var AppModel = require('./models/app_model');
var MainLayout = require('./main_layout.js');
var HeaderModel = require('./header/header_model.js');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

// Features
var ConfigRouter = require( './features/config/config_router' );
var CouponRouter = require( './features/coupon/coupon_router' );
var StampRouter = require('./features/stamp/stamp_router');
var ShopRouter = require('./features/shop/shop_router');
var PointRouter = require('./features/point/point_router');
var HistoryRouter = require('./features/history/history_router');
var InformationRouter = require('./features/information/information_router');
var AutoLoginRouter = require('./features/autologin/autologin_router');
var SmartRouter = require('./features/smart/smart_router');
var MemberRouter = require('./features/member/member_router');
var RegisterRouter = require( './features/register/register_router' );
var OtherRouter = require('./features/other/other_router');
var PassTicketRouter = require( './features/passticket/pass_ticket_router.js' );
var WalletRouter = require( './features/wallet/wallet_router.js' );
var InfoSoundRouter = require( './features/infosound/infosound_router.js' );

//////////
// DEMO Features
var ScratchRouter = require( './features/scratch/scratch_router' );
var ChirashiRouter = require( './features/chirashi/chirashi_router' );

// UTILS
var TextUtil = require('./utils/text');
var StyleUtil = require('./utils/style.js');
var DebugUtil = require('./utils/debug.js');
var DateUtil = require('./utils/date.js');
var BadgeUtil = require('./utils/badge');
var BtApi = require('./utils/bt_api');
var StorageUtil = require('./utils/storage.js');
var CacheUtil = require('./utils/cache.js');
var CommonUtil = require('./utils/common.js');

/**
 * 雛形アプリのメインオブジェクト
 * グローバルにインスタンスを配置する想定
 * Backbone.Marionette.Application
 */
module.exports = (function () {
	var mainApp = new Backbone.Marionette.Application();

	// util メソッド定義
	mainApp.util = {};
	// Text 
	mainApp.util.text = TextUtil;
	// Style
	mainApp.util.style = StyleUtil;
	// Debug
	mainApp.util.debug = DebugUtil;
  	// Date
	mainApp.util.date = DateUtil;
	// Badge
	mainApp.util.badge = BadgeUtil;
	// BT API
	mainApp.btApi = new BtApi( {
		ApplicationId : AppConf.core.applicationId,
		rootUrl: AppConf.url.appRoot,
		ContentsVersion : AppConf.core.contentsVersion,
	});
	// Storage
	mainApp.util.storage = StorageUtil;
	// Cache
	mainApp.util.cache = CacheUtil;
	// Common
	mainApp.util.common = CommonUtil;

	// ヘッダの内容はAppで管理
	mainApp.headerModel = new HeaderModel();

	// Appスタート
	// onDeviceReadyにてapp.startされる
	mainApp.onStart = function(options){

		this.appModel = new AppModel(); 
		mainApp.listenTo( this.appModel, 'ready', function(model){

			// set token
			this.appModel.setAuthAndSave({token: options.token});
			
			// handle after login by Line
			if (location.href.indexOf('access_token') >= 0) {
				location.hash = '#';
			}

			if (AppConf.features.tracking) {
				if (AppConf.tracking.uuidonly) {
					mainApp.deviceLogin(null);
				} else {
					// 自動ログイン
					applican.tracking.getTrackingId(mainApp.deviceLogin, mainApp.trackingFalse);
				}
			} else {
				mainApp.showTutorial();
			}

		});

		this.appModel.safeFetch();

		this.mainLayout = new MainLayout( {el: $('#main-layout')} );
		this.mainLayout.render();
		Backbone.history.on('route', function() {
			// do something
			if (AppConf.features.passTicket) {
				mainApp.util.badge.showBadgePassticket();
			}
			// triggger on footer
			this.trigger("onRoute");
		}.bind(this));
		// don't move listener bellow to footer view because we can turn off footer by config setting flag
		// then the footer view won't run
		this.listenTo(this, "onRoute", function() {
			var routes = Backbone.history.getFragment().split(/(\?|\/)/)[0];
			(routes || (routes = 'home'));
			if (routes == 'home') {
				App.util.badge.showBadge();
			}

			if (AppConf.features.wallet || AppConf.features.passTicket) {
				changeHeaderPassTicket(routes);
			}
		}.bind(this));
		this.pageSlider = new PageSlider({
			container: $('#master-container'),
			initialHistory: [""]
		});

		// features
		var router = new Router();
		var configRouter = (AppConf.features.config)? new ConfigRouter() : void(0);
		var couponRouter = (AppConf.features.coupon)? new CouponRouter() : void(0);
		var stampRouter = (AppConf.features.stamp)? new StampRouter() : void(0);
		var shopRouter = (AppConf.features.shop)? new ShopRouter() : void(0);
		var pointRouter = (AppConf.features.point)? new PointRouter() : void(0);
		var historyRouter = (AppConf.features.history)? new HistoryRouter() : void(0);
		var informationRouter = (AppConf.features.information)? new InformationRouter() : void(0);
		var autologinRouter = (AppConf.features.autologin)? new AutoLoginRouter() : void(0);
		var chirashiRouter = (AppConf.features.chirashi)? new ChirashiRouter() : void(0);
		var scratchRouter = (AppConf.features.scratch)? new ScratchRouter() : void(0);
		var smartRouter = (AppConf.features.smart)? new SmartRouter() : void(0);
		var memberRouter = (AppConf.features.member)? new MemberRouter() : void(0);
		var registerRouter = (AppConf.features.register) ? new RegisterRouter() : void (0);
		var otherRouter = (AppConf.features.stop) ? new OtherRouter() : void(0);
		var passTicketRouter = (AppConf.features.passTicket) ? new PassTicketRouter() : void (0);
		var walletRouter = (AppConf.features.wallet) ? new WalletRouter() : void (0);
		var infoSoundRouter = (AppConf.features.infoSound) ? new InfoSoundRouter() : void (0);
		Backbone.history.start();



		$(window).on("scroll", function(e) {
			var bottomPos = 100;

			var scrollHeight = $(document).height();
			var scrollPosition = $(window).height() + $(window).scrollTop();

			//スクロールが下に行った時の処理
			if (scrollPosition > scrollHeight - bottomPos) {
				App.vent.trigger("reach:bottom");
				//TODO: debug
			}
		});

		// backwards compatible to launch_webview
		$(document).on('click', AppConf.urlModifier.targets.toString(), function (e) {
			e.preventDefault();
			var href = $(this).attr('href');
			if (href.indexOf('launch_webview=yes') > -1) {
				App.util.text.openWindow(href, false)
			} else if (href.indexOf('launch_browser=yes') > -1) {
				App.util.text.openWindow(href, true)
			} else {
				location.href = href;
			}
		});
	};

	function changeHeaderPassTicket(routes) {
		var imgInHome = "./image/top/icon_ticket_top.png";
		var imgInOther = "./image/top/icon_ticket.png";
		if (AppConf.features.wallet){
			imgInHome = "./image/top/icon_menu_right_white.png";
			imgInOther = "./image/top/icon_menu_right.png";
		}
		if (routes == 'home') {
			//set header color
			$('.HEADER-INNER-WRAPPER').css({ 'background-color': '#776c6a' });
			// change icon ticket default color at header
			$('.HEADER-RIGHT .ticket-icon img').attr('src', imgInHome);
		} else {
			//remove header color
			$('.HEADER-INNER-WRAPPER').css('background-color', '');
			// change icon ticket default color at header
			$('.HEADER-RIGHT .ticket-icon img').attr('src', imgInOther);
		}
	}

	mainApp.addAuthenticationHeaderToXHR = function(xhr){
		var auth = mainApp.getAuthInfo();
		xhr.setRequestHeader('Authorization', auth.token || "dummy" );
		mainApp.addApplicationHeaderToXHR(xhr);
	};
	mainApp.addApplicationHeaderToXHR = function(xhr){
		xhr.setRequestHeader('ApplicationId', AppConf.core.applicationId );
		mainApp.initializeXHR(xhr);
	};

	mainApp.initializeXHR = function(xhr){
		// default http header setting
		_.each(mainApp.btApi.getDefaultAjaxHeaders(), function(value, key, list){
			xhr.setRequestHeader(key, value);
		});

		// setup Ajax
		App.btApi.setupAjax(xhr);
	};

	mainApp.vent.on('app-login', function( data ){
		// do nothing for now
	});

	mainApp.getAuthInfo = function(){
		return mainApp.appModel ? mainApp.appModel.get("auth") : "";
	};

	mainApp.util.showProgressScreenExtend = function(el) {
		var $el = el ? el : 'body';
		if ($($el + ' > .progress-screen').length == 0) {
			$($el).append(mainApp.util.injectProgressScreenDom());
		}
		$($el + ' > .progress-screen').addClass('show').addClass('visible');
	};
	mainApp.util.hideProgressScreenExtend = function(el) {
		var $el = el ? el : 'body';
		$($el + ' > .progress-screen').remove();
	};

	// ローディング表示用のDOMをSTRINGで返す
	mainApp.util.injectProgressScreenDom = function(){
		return require('./progress_screen.html')();
	};

	// ローディングを表示する
	mainApp.util.showProgressScreen = function(){
		mainApp.mainLayout.$('.progress-screen').addClass('show').addClass('visible');
		mainApp.mainLayout.$('.progress-image').css({"margin-top" : (100 + window.scrollY) + "px"});
	};
	// ローディングを非表示にする
	mainApp.util.hideProgressScreen = function(){
		mainApp.mainLayout.$('.progress-screen').removeClass('visible');
		setTimeout(function(){
			mainApp.mainLayout.$('.progress-screen').removeClass('show');
		}, 220);
	};
	// リクエストの前にLoadingスクリーンを表示し、エラーまたは正常終了で消してくれる
	// 引数 : jqXHRオブジェクトを返す関数オブジェクト
	mainApp.util.execWithProgressScreen = function( reqFunction ){
		// Execution
		mainApp.util.showProgressScreen();
		return reqFunction()
		.done(function(){
			mainApp.util.hideProgressScreen();
		}).fail(function(){
			mainApp.util.hideProgressScreen();
		});
	};
	// model/collectionのリクエスト発行時にローディングスクリーンを表示し、
	// 正常、異常終了時に非表示にする
	mainApp.util.bindProgressScreen = function( view, modelOrCollection ){
		view.listenTo( modelOrCollection, 'request' , mainApp.util.showProgressScreen );
		view.listenTo( modelOrCollection, 'sync' , mainApp.util.hideProgressScreen );
		view.listenTo( modelOrCollection, 'error' , mainApp.util.hideProgressScreen );
	};

	// ajaxリクエストを返す処理に、デフォルトのエラーハンドリングを付与する
	// 引数 
	// jqXHR : jqXHRオブジェクト
	// options: ignoreStatuses - ex. [ 401, 402, 403 ]
	//          afterHandling - function which you wish to execute after common err handling
	mainApp.util.bindCommonErrorHandling =  function(jqXHR, options){
		var options = options || {};
		var ignoreStatuses = _.union(options.ignoreStatuses, [503]) || [503];
		var afterAlertCallback = options.afterAlertCallback || App.doNothing;

		return jqXHR.fail( function(err){
			// err.status が ignoreStatusesに含まれている場合は何もしない
			if( ignoreStatuses.indexOf(err.status) === -1){
				applican.notification.alert("エラーが発生しました。", afterAlertCallback, "", "OK");
			}
			if( options.afterHandling ){ options.afterHandling(); }
		});
	};

	mainApp.util.number = {
		roundEx: function( number, digitsAfterDecimalPoint ){
			var offset = Math.pow(10, digitsAfterDecimalPoint);
			return Math.round( number * offset  ) / offset
		},
	};

	mainApp.doNothing = function(){};
	
	mainApp.deviceLogin = function(trackingID) {
		if (trackingID != null && !_.isEmpty(trackingID)) {
			mainApp.btApi.TrackingID = trackingID;
		}

		var datenum = Number( new Date() );
		var deviceloginTime = App.appModel.getDeviceloginTime();
		App.appModel.set({ "deviceloginTime": datenum });
		App.appModel.save().done(function(){
			var pastSec = (parseInt(datenum) - parseInt(deviceloginTime));
			var registrationId = App.btApi.RegistrationId;
			var old = App.appModel.getPushTokenOld();
			if (registrationId == null || _.isEmpty(registrationId)) {
				registrationId = App.appModel.get("pushToken");
			}
			if((registrationId && registrationId !== App.appModel.get("pushToken")) || (isNaN(parseInt(deviceloginTime)) || (pastSec > AppConf.tracking.timing))){
				var uuid = applican.device.uuid;

				if (uuid != null && uuid != "") {
					// 自動ログインチェック
					App.btApi.tracking({
						"registrationId": registrationId,
					})
					.done(function(data){
						if( App.appModel.getAuthInfo().token == null || App.appModel.getAuthInfo().token === "" ){
//							console.log("btApi.tracking auto login done:");
							App.appModel.setAuthAndSave( { userid: "", password: "", token: data.accessToken } );
							App.appModel.setAutoLogin( true );
							App.appModel.set({ tutorialShown: true });
							App.appModel.save();
							App.pageSlider.backAndRestartHistory();
							applican.webView.reload();
						} else {
//							console.log("btApi.logined token:" + App.appModel.getAuthInfo().token);
							if (App.appModel.getAuthInfo().token === data.accessToken) {
								console.log("btApi.tracking auto login equal:");
							} else {
								console.log("btApi.tracking auto login no:");
							}
						}
					})
					.fail(function(err){
						if(err.status === 404){
							var res = err.responseJSON || {};
							var errorCode = res.errorCode;
							if (errorCode+"" === "5001") {
								App.appModel.setRegisterFormShown( false );
								App.appModel.saveAsLogout();
								App.pageSlider.backAndRestartHistory();
							}
						} else {
							if (err.status === 503) {
								if(err.responseJSON && err.responseJSON.url){
									location.href = err.responseJSON.url;
								} else {
									mainApp.util.text.alertMaintenance();
								}
							} else {
								applican.notification.alert(AppConf.message.trackingidUpdateFailure,function(){},AppConf.message.information,AppConf.message.yes);
							}
						}
					});
					App.showScreen();
				} else {
					App.showScreen();
				}
			} else {
				App.showScreen();
			}
		});
	};

	mainApp.showTutorial = function(){
		var neverShownTutorial = !App.appModel.get("tutorialShown");
		App.appModel.set({ tutorialShown: true });
		App.appModel.save().done(function(){
			if( neverShownTutorial ){
				setTimeout( function(){
					location.href = "./features/tutorial/tutorial.html";
				}, 2000);
			}
		});
	};

	mainApp.showAutoregist = function(){
		if( !App.getAuthInfo().token ){
			location.hash = '#autoregist';
		}
	};

	mainApp.showScreen = function(){
		if (AppConf.tracking.showAutoregist) {
			App.showAutoregist();
		} else {
			App.showTutorial();
		}
	};

	mainApp.trackingFalse = function(error) {
//        console.log("Could not get tracking id. Error: " + error);
		App.deviceLogin();
	};

	return mainApp;

})();

},{"../../../lib/components/pageslider/pageslider":1,"./features/autologin/autologin_router":12,"./features/chirashi/chirashi_router":19,"./features/config/config_router":20,"./features/coupon/coupon_router":43,"./features/history/history_router":56,"./features/information/information_router":69,"./features/infosound/infosound_router.js":70,"./features/member/member_router":76,"./features/other/other_router":79,"./features/passticket/pass_ticket_router.js":84,"./features/point/point_router":105,"./features/register/register_router":112,"./features/scratch/scratch_router":115,"./features/shop/shop_router":134,"./features/smart/smart_router":137,"./features/stamp/stamp_router":145,"./features/wallet/wallet_router.js":153,"./header/header_model.js":156,"./main_layout.js":175,"./models/app_model":202,"./progress_screen.html":224,"./router":225,"./utils/badge":231,"./utils/bt_api":232,"./utils/cache.js":233,"./utils/common.js":234,"./utils/date.js":235,"./utils/debug.js":236,"./utils/storage.js":237,"./utils/style.js":238,"./utils/text":239,"backbone":"5kFNoY","jquery":"HlZQrA","underscore":"ZKusGn"}],10:[function(require,module,exports){
var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
var PointModel = require('../../models/point_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var AutoLoginLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./autologin_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			this.token = options.id;
			var userid = '';
			var password = '';
			var smstel = '';
			
			if( AppConf.features.sms ){
				var auth = App.getAuthInfo();
				smstel = auth.smstel;
				password = auth.password;
			} else {
				userid = '';
				password = '';
			}

			this.userModel = new UserModel();
			App.util.bindProgressScreen(this, this.userModel );
			this.pointModel = new PointModel();

			_this = this;
			var loginRequest = function(){
//				console.log('loginRequest');
//				console.log(_this.token);
				return App.util.bindCommonErrorHandling(
					App.btApi.seamlessLogin( _this.token ),
					{ ignoreStatuses: [404] }
				);
			};

			// ログインリクエストを実行
			App.util.execWithProgressScreen( loginRequest )
			.done( function(data){
				_this.userModel.clearCache();
				_this.pointModel.clearCache();
				if( App.appModel.get("pushToken") ){
					App.util.storage.remove("notification_insert_" + App.appModel.get("pushToken"));
				}
				// ログインが成功したら、ID/PASSを永続化して以前の画面に戻る
				if( AppConf.features.sms ){
					App.appModel.setAuthAndSave( { smstel: smstel, password: "", token: data.accessToken } );
					App.vent.trigger( 'app-login' , { smstel: smstel, password: password, token: data.accessToken });
				} else {
					App.appModel.setAuthAndSave( { userid: userid, password: password, token: data.accessToken } );
					App.vent.trigger( 'app-login' , { userid: userid, password: password, token: data.accessToken });
				}
				applican.notification.alert("登録完了しました", function(){}, "", "OK");
				App.pageSlider.backAndRestartHistory();
				applican.webView.reload();
			}).fail(function(err){
				if(err.status === 404){
					applican.notification.alert("ログインできません", App.doNothing, "", "OK");
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		},
		headerConf: {
			title: "アプリログイン",
			showBackButton: true,

		},
		onRender: function(){
//			this.ui.seamlessValue.html(this.token);
			App.util.hideProgressScreen();
		},
	});

	return AutoLoginLayoutView;
})();

},{"../../models/point_model.js":218,"../../models/user_model.js":222,"./autologin_layout_template.html":11,"backbone":"5kFNoY"}],11:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="REGISTER-TOP" class="BACKBONE-PAGE">\r\n\r\n<div id="REGISTER-GUIDE">\r\n<div id="confirm_message"></div>\r\n\r\n<center><div id="seamless_value"></div><center>\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],12:[function(require,module,exports){
var Backbone = require('backbone');
var AutoLoginLayoutView = require('./autologin_layout.js');
var RegisterLayoutView = require('./register_layout.js');
var AutoLoginSmsLayoutView = require('./autologinsms_layout.js');

var querystring = require('querystring');
module.exports = (function () {

	var AutoLoginController = Backbone.Marionette.Controller.extend({
		showAutoLogin: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var autologinLayoutView = new AutoLoginLayoutView({
				id: id
			});
			autologinLayoutView.render();
			App.pageSlider.slidePage( autologinLayoutView );
			App.headerModel.applyViewHeaderConf( autologinLayoutView.headerConf );
		},
		showRegister: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var registerLayoutView = new RegisterLayoutView({
				id: id,
				ftype: queryObj.ftype
			});
			registerLayoutView.render();
			App.pageSlider.slidePage( registerLayoutView );
			App.headerModel.applyViewHeaderConf( registerLayoutView.headerConf );
		},
		showAutoLoginSms: function(id, query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var autologinsmsLayoutView = new AutoLoginSmsLayoutView({
				id: id
	});
			autologinsmsLayoutView.render();
			App.pageSlider.slidePage( autologinsmsLayoutView );
			App.headerModel.applyViewHeaderConf( autologinsmsLayoutView.headerConf );
		},
	});

	var autologinController = new AutoLoginController();

	var AutoLoginRouter = Backbone.Marionette.AppRouter.extend({
		controller: autologinController,
		appRoutes: {
			"autologin/:id(?:query)" : "showAutoLogin",
			"register/:id(?:query)" : "showRegister",
			"autologinsms/:id(?:query)" : "showAutoLoginSms",
		}
	});

	return AutoLoginRouter;

})();

},{"./autologin_layout.js":10,"./autologinsms_layout.js":13,"./register_layout.js":15,"backbone":"5kFNoY","querystring":"SZ5xis"}],13:[function(require,module,exports){
var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var AutoLoginLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./autologinsms_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			var userId = options.id;
			var auth = App.getAuthInfo();
			var smstel = auth.smstel;
			var password = auth.password;
			var tokentemp = auth.tokentemp;

			this.userModel = new UserModel();
			App.util.bindProgressScreen(this, this.userModel );

			if (tokentemp) {
				App.appModel.setAuthAndSave( { smstel: smstel, password: "", token: tokentemp } );
				App.pageSlider.backAndRestartHistory();
				App.vent.trigger( 'app-login' , { smstel: smstel, password: password, token: tokentemp });
				applican.notification.alert("登録完了しました", function(){}, "", "OK");
				applican.webView.reload();
			} else {
				applican.notification.alert("ログインできません", App.doNothing, "", "OK");
			}
		},
		headerConf: {
			title: "アプリログイン",
			showBackButton: true,

		},
		onRender: function(){
//			this.ui.seamlessValue.html(this.token);
			App.util.hideProgressScreen();
		},
	});

	return AutoLoginLayoutView;
})();

},{"../../models/user_model.js":222,"./autologinsms_layout_template.html":14,"backbone":"5kFNoY"}],14:[function(require,module,exports){
module.exports=require(11)
},{}],15:[function(require,module,exports){
var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
module.exports = (function () {
	window.hoge = new UserModel();


	var RegisterLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./register_layout_template.html'),
		regions: {
		},
		ui: {
			"seamlessValue" : "#seamless_value",
		},
		initialize: function(options){
			var sid = options.id;
			var ftype = options.ftype;

			var url = "";
			if (ftype != null && ftype != "") {
				url = AppConf.url.registerForms[ftype];
			} else {
				url = AppConf.url.registerForm;
			}
			console.log( "ftype:" + ftype );

			if (url != null && url != "") {
				url += '&SID=' + sid;
			location.href = url + '&launch_webview=yes';
			}
		},
		headerConf: {
			title: "会員登録",
			showBackButton: true,

		},
		onRender: function(){
			App.util.hideProgressScreen();
//			App.pageSlider.backAndRestartHistory();
		},
	});

	return RegisterLayoutView;
})();

},{"../../models/user_model.js":222,"./register_layout_template.html":16,"backbone":"5kFNoY"}],16:[function(require,module,exports){
module.exports=require(11)
},{}],17:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

	var ChirashiListLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./chirashi_list_layout_template.html'),
		regions: {
		},
		initialize: function(options){
		},
		headerConf: {
			title: "チラシ一覧",
			showBackButton: true,
		},
	});

	return ChirashiListLayout;
})();

},{"./chirashi_list_layout_template.html":18,"backbone":"5kFNoY"}],18:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CHIRASHI-LIST" class="BACKBONE-PAGE">\r\n<div id="chirashi-list-region">\r\n\t<ul>\r\n\t\t<li class="bdcolor1 bgcolor1">\r\n\t\t\t<a href="'+
((__t=( AppConf.demo.chirashi.viewer ))==null?'':__t)+
'?img='+
((__t=( AppConf.demo.chirashi.chirashi1.imageUrl ))==null?'':__t)+
'&launch_webview=yes">\r\n\t\t\t\t<div class="row">\r\n\t\t\t\t\t<div class="chirashiImg" >\r\n\t\t\t\t\t\t<img src="'+
((__t=( AppConf.demo.chirashi.chirashi1.thumbnailUrl ))==null?'':__t)+
'">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="chirashiText">'+
((__t=( AppConf.demo.chirashi.chirashi1.title ))==null?'':__t)+
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t</a>\r\n\t\t</li>\r\n\t\t<li class="bdcolor1 bgcolor1">\r\n\t\t\t<a href="'+
((__t=( AppConf.demo.chirashi.viewer ))==null?'':__t)+
'?img='+
((__t=( AppConf.demo.chirashi.chirashi2.imageUrl ))==null?'':__t)+
'&launch_webview=yes">\r\n\t\t\t\t<div class="row">\r\n\t\t\t\t\t<div class="chirashiImg" >\r\n\t\t\t\t\t\t<img src="'+
((__t=( AppConf.demo.chirashi.chirashi2.thumbnailUrl ))==null?'':__t)+
'">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="chirashiText">'+
((__t=( AppConf.demo.chirashi.chirashi2.title ))==null?'':__t)+
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t</a>\r\n\t\t</li>\r\n\t</ul>\r\n</div>\r\n</div>\r\n<!-- 実装時にはコメントアウトを解除 : ローディング画像表示のため '+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
' -->\r\n';
}
return __p;
};

},{}],19:[function(require,module,exports){
var Backbone = require('backbone');
var ChirashiListLayout = require("./chirashi_list_layout.js");
module.exports = (function () {

	var ChirashiController = Backbone.Marionette.Controller.extend({
		showChirashiList: function(){
			var chirashiLayout = new ChirashiListLayout();
			chirashiLayout.render();
			App.pageSlider.slidePage( chirashiLayout );
			App.headerModel.applyViewHeaderConf( chirashiLayout.headerConf );
		},
	});

	var chirashiController = new ChirashiController();

	var ChirashiRouter = Backbone.Marionette.AppRouter.extend({
		controller: chirashiController,
		appRoutes: {
			"chirashi" : "showChirashiList",
		}
	});

	return ChirashiRouter;

})();

},{"./chirashi_list_layout.js":17,"backbone":"5kFNoY"}],20:[function(require,module,exports){
var Backbone = require('backbone');
var ConfigTopLayoutView = require('./config_top_layout.js');
var QrCodeView = require('./qrcode_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var ConfigController = Backbone.Marionette.Controller.extend({
		showConfigTop: function(){
			var configTopLayoutView = new ConfigTopLayoutView();
			configTopLayoutView.render();
			App.pageSlider.slidePage( configTopLayoutView );
			App.headerModel.applyViewHeaderConf( configTopLayoutView.headerConf );
		},
		qrCode: function(){
			var qrCodeView = new QrCodeView();
			qrCodeView.render();
			App.pageSlider.slidePage( qrCodeView );
			App.headerModel.applyViewHeaderConf( qrCodeView.headerConf );
			qrCodeView.trigger("load:sync");
		}
	});

	var configController = new ConfigController();

	var ConfigRouter = Backbone.Marionette.AppRouter.extend({
		controller: configController,
		appRoutes: {
			"config" : "showConfigTop",
			"qrcode" : "qrCode",
		}
	});

	return ConfigRouter;

})();

},{"./config_top_layout.js":21,"./qrcode_layout.js":24,"backbone":"5kFNoY","querystring":"SZ5xis"}],21:[function(require,module,exports){
var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
var InformationCollection = require('../../models/information_collection');
module.exports = (function () {
	window.hoge = new UserModel();


	var ConfigTopLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./config_top_layout_template.html'),
		regions: {
		},
		ui: {
			"logoutBtn" : "#logout-btn",
			"updateUserBtn" : "#update-user-btn",
			"openWindowQrcode" : "#openWindowQrcode",
		},
		events: {
			"click @ui.logoutBtn" : "execLogout",
			"click @ui.updateUserBtn" : "openUpadateUserWindow",
			"click @ui.openWindowQrcode" : function(){ App.util.text.openWindow('https://sgpweb.betrend.com/app/line-mini//#qrcode', true) },
		},
		initialize: function(){
			if (AppConf.features.wallet){
				this.template = require('./config_top_layout_template.wallet.html')
			}
			this.userModel = new UserModel();
			this.informationCollection = new InformationCollection();
			App.util.bindProgressScreen(this, this.userModel );
		},
		headerConf: {
			title: "設定",
			showBackButton: true,
			showRightButton: false
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
		openUpadateUserWindow: function(){
			var _this = this;
			this.userModel.fetchWithAuthInfo().done(function(){
				
				var member = _this.userModel.get("member")[0]
				if( !member ){
					return applican.notification.alert("ユーザ情報の取得に失敗しました。一度ログアウトして、ログインし直してください。", function(){}, "", "OK");
				}
				var seamlessparam = member.seamlessparam;
				console.log( seamlessparam );

				//href="<%= AppConf.url.modifyUserInfo %>?launch_webview=yes"
				seamlessparam = encodeURIComponent(seamlessparam);
				var smsTel = _.findWhere(member.extras, {name : 'SMS_電話番号'});
				if (AppConf.features.sms && smsTel != null && smsTel.value !== null && smsTel.value !== "") {
					App.util.text.openWindow(App.util.text.addUrlParameters( AppConf.url.modifySmsUserInfo,['smid=' + seamlessparam] ));
				} else {
					App.util.text.openWindow(App.util.text.addUrlParameters( AppConf.url.modifyUserInfo,['smid=' + seamlessparam] ));
				}
			})

		},
		execLogout: function(){
			var _this = this; 
			var logoutRequest = function(){
				return App.util.bindCommonErrorHandling( App.btApi.logout(),{ ignoreStatuses: [401] } );
			};
			App.util.execWithProgressScreen( logoutRequest )
			.done( function(data){
				App.util.storage.removeMember();
				_this.informationCollection.clearCache();
				// #7050 対応
				applican.notification.alert("ログアウトしました", App.doNothing, "", "OK");
				App.appModel.saveAsLogout();
				App.pageSlider.backAndRestartHistory();
				applican.webView.reload();
			}).fail(function(err){
				if(err.status === 401){
					applican.notification.alert("ログアウトしました", App.doNothing, "", "OK");
	                App.appModel.saveAsLogout();
	                App.pageSlider.backAndRestartHistory();
	                applican.webView.reload();
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		}
	});

	return ConfigTopLayoutView;
})();

},{"../../models/information_collection":214,"../../models/user_model.js":222,"./config_top_layout_template.html":22,"./config_top_layout_template.wallet.html":23,"backbone":"5kFNoY"}],22:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CONFIG-TOP" class="BACKBONE-PAGE">\r\n\r\n<div class="bgcolor3 ftcolor1">\r\n\t<ul>\r\n\t\t<li class="bdcolor1" id="openWindowQrcode"><a>TEST QRcode</a></li>\r\n\t\t<!-- <li class="bdcolor1"><a href="#qrcode">QRcode</a></li> -->\r\n\t\t';
 if( App.appModel.getAuthInfo().token !== "" ){ 
__p+='\r\n\t\t\t<li class="bdcolor1" id="update-user-btn"><a >会員情報変更</a></li>\r\n\t\t';
 } 
__p+='\r\n\r\n\t\t<li class="bdcolor1"><a href="'+
((__t=( AppConf.url.term ))==null?'':__t)+
'">利用規約</a></li>\r\n\t\t<li class="bdcolor1"><a href="'+
((__t=( AppConf.url.privacyPolicy ))==null?'':__t)+
'">プライバシーポリシー</a></li>\r\n\t\t<li class="bdcolor1"><a href="./features/tutorial/tutorial.html">使い方を見る</a></li>\r\n\t\t';
 if( App.appModel.getAuthInfo().token !== "" ){ 
__p+='\r\n\t\t\t';
 if( AppConf.features.autoregist ){ 
__p+='\r\n\t\t\t\t<li class="bdcolor1"><a href="#login">別なアカウントでログイン</a></li>\r\n\t\t\t';
 }else{ 
__p+='\r\n\t\t\t\t<!-- <li class="bdcolor1"><span id="logout-btn">ログアウト</span></li> -->\r\n\t\t\t';
 } 
__p+='\r\n\t\t\t';
 if( AppConf.features.stop ){ 
__p+='\r\n\t\t\t\t<li class="bdcolor1"><a href="#other">その他</a></li>\r\n\t\t\t';
 } 
__p+='\r\n\t\t';
 }else{ 
__p+='\r\n\t\t\t<!-- <li class="bdcolor1"><a href="#login">ログイン</a></li> -->\r\n\t\t';
 } 
__p+='\r\n\t</ul>\r\n</div>\r\n\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],23:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CONFIG-TOP" class="BACKBONE-PAGE walet-template">\n    <div class="bgcolor3 ftcolor1">\n        <ul class="menu-config">\n            <li class="config-group-list bdcolor1">\n                <p class="thead">設定</p>\n                <ul class="sub-menu">\n                    ';
 if( App.appModel.getAuthInfo().token !== "" ){ 
__p+='\n                        <li class="bdcolor1" id="update-user-btn"><a >会員情報変更</a></li>\n                    ';
 } 
__p+='\n            \n                    <li class="bdcolor1"><a href="'+
((__t=( AppConf.url.term ))==null?'':__t)+
'">利用規約</a></li>\n                    <li class="bdcolor1"><a href="'+
((__t=( AppConf.url.privacyPolicy ))==null?'':__t)+
'">プライバシーポリシー</a></li>\n                    <li class="bdcolor1"><a href="./features/tutorial/tutorial.html">使い方を見る</a></li>\n                    ';
 if( App.appModel.getAuthInfo().token !== "" ){ 
__p+='\n                        ';
 if( AppConf.features.autoregist ){ 
__p+='\n                            <li class="bdcolor1"><a href="#login">別なアカウントでログイン</a></li>\n                        ';
 }else{ 
__p+='\n                            <li class="bdcolor1"><span id="logout-btn">ログアウト</span></li>\n                        ';
 } 
__p+='\n                        ';
 if( AppConf.features.stop ){ 
__p+='\n                            <li class="bdcolor1"><a href="#other">その他</a></li>\n                        ';
 } 
__p+='\n                    ';
 }else{ 
__p+='\n                        <li class="bdcolor1"><a href="#login">ログイン</a></li>\n                    ';
 } 
__p+='\n                </ul>\n            </li>\t\t\n            <li class="config-group-list bdcolor1">\n                <p class="thead">履歴</p>\n                <ul class="sub-menu">\n                    <li class="bdcolor1"><a href="#history">利用履歴</a></li>\n                </ul>\n            </li>\n        </ul>\n    </div>  \n</div>\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\n    ';
}
return __p;
};

},{}],24:[function(require,module,exports){
var Backbone = require('backbone');
var ModalAlertView = require('../../modals/alert/modal_alert_view');
var ModalQrCodeView = require('../../modals/qrcode/modal_qrcode_view');
module.exports = (function () {

	var QrcodeLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./qrcode_layout_template.html'),
		regions: {
		},
		ui: {
			"btnStartScan": ".js-btnStartScan",
		},
		events: {
			"click @ui.btnStartScan": "qrCodeScanner",
		},
		headerConf: {
			title: "QRcode",
			showBackButton: true,
		},
		initialize: function () {
			this.modalAlertView = new ModalAlertView();
			this.modalQrCodeView = new ModalQrCodeView();
		},
		onRender: function () {
			App.util.hideProgressScreen();
		},
		qrCodeScanner: function () {
			var _this = this;
			this.modalQrCodeView.show().then(function (qrParam) {
				// APIをコールして端末認証を行う
				App.btApi.getQRCode({ code: qrParam }).done(function (data) {
					App.util.hideProgressScreen();
					var msg = "来店ポイントを獲得しました";
					_this.modalAlertView.show({ title: '', text: msg }).then(function (res) {
						
					});
				}).fail(function (err) {
					App.util.hideProgressScreen();
					// NG
					var msg = "来店ポイントの獲得に失敗しました（ステータス:  " + err.status + "）";
					if (err.responseJSON) {
						switch (err.responseJSON.errorCode) {
							case "0002":
								msg = "不正なQRコードです。正しいQRコードを読み込んでください";
								break;
							case "0008":
								msg = "既に来店ポイントを獲得済みです";
								break;
							case "0007":
								msg = "本日分は取得済みです";
								break;
							default:
								msg = "来店ポイントの獲得に失敗しました（ステータス:  " + err.status + "、エラーコード:  " + err.responseJSON.errorCode + "）";
								break;
						}
					}
					_this.modalAlertView.show({ title: '', text: msg });
					return;
				});
			});
		},
		onDestroy: function () {
			this.modalAlertView.onDestroy();
			this.modalQrCodeView.onDestroy();
		}
	});

	return QrcodeLayoutView;
})();

},{"../../modals/alert/modal_alert_view":190,"../../modals/qrcode/modal_qrcode_view":199,"./qrcode_layout_template.html":25,"backbone":"5kFNoY"}],25:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="QRCODE" class="BACKBONE-PAGE">\r\n    <center><button class="js-btnStartScan btnStartScan" style="width: 100%; height: 40px; background-color: green;">Start Scan</button></center>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom() ))==null?'':__t)+
'';
}
return __p;
};

},{}],26:[function(require,module,exports){
var Backbone = require('backbone');
var CouponItemView = require('./coupon_item_view.js');
var BaseCollectionView = require('../../views/base_collection_view.js');
module.exports = (function () {
	var CouponCollectionView = BaseCollectionView.extend({
		childView: CouponItemView,
		tagName: 'ol',
		className: 'COUPONS',
		initialize: function(options) {},
	});
	return CouponCollectionView;
})();

},{"../../views/base_collection_view.js":240,"./coupon_item_view.js":38,"backbone":"5kFNoY"}],27:[function(require,module,exports){
var Backbone = require('backbone');
var CouponModel = require('../../models/coupon_model.js');
var CouponCollection = require('../../models/coupon_detail_collection.js');
var CouponListCollection = require('../../models/coupon_collection.js');
var CouponDetailMainView = require('./coupon_detail_main_view.js');
var CouponDetailMainViewv2 = require('./coupon_detail_main_view.v2.js');
var CouponDialogueItemView = require('./dialogue/coupon_dialogue_item_view.js');
module.exports = (function () {

	var CouponDetailLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./coupon_detail_layout_template.html'),
		regions: {
			"couponDetailRegion" : "#coupon-detail-region",
			"couponDialogueRegion": "#coupon-dialogue-region"
		},
		ui: {
			"cancelBtn": ".close-button",
		},
		events:{
			"click @ui.cancelBtn": function() {
				App.pageSlider.back();
			},
		},
		initialize: function(options){
			this.couponId = options.id;
			this.uCoupId  = options.uCoupId;
			this.typeParam = options.typeParam;

			this.couponModel = {};
			if ( this.uCoupId ) {
				this.couponCollection = new CouponCollection( { pagination: true } );
			} else {
				this.couponCollection = new CouponCollection({ couponId: this.couponId, pagination: true });
			}
			
			this.couponDialogueItemView = new CouponDialogueItemView();

			App.util.bindProgressScreen(this, this.couponCollection );
			this.listenTo( this.couponCollection, 'page-info-has-been-set', this.fetchCouponAll );
			this.listenTo( this, "load:sync", this.onLoad );
			// this.listenTo( this.couponCollection , 'sync', this.renderMainFromCollection);

			var _this = this;
			this._fetchCoupons(true);
		},
		headerConf: {
			title: "クーポン詳細",
			showBackButton: true,
			hideHeader: AppConf.UI.coupon.detail.version == "v2" ? true : false
		},
		renderMainFromCollection: function(){
			var coupon;
			$('.page').removeClass('page-center');
			this.couponDialogueRegion.show( this.couponDialogueItemView );
			if ( this.couponCollection.length > 0 ) {
				if ( this.uCoupId ) {
					coupon = this.couponCollection.where({ uCoupId :this.uCoupId });
				} else {
					this.couponCollection.orderByExpires();
					coupon = this.couponCollection.where({ id :parseInt(this.couponId) });
				}
				// var a = this.couponCollection.where({ uCoupId :this.uCoupId });
				this.couponModel = coupon[0];
				this.couponModel.set("typeParam", this.typeParam);
				var viewOption = { model: this.couponModel, uCoupId: this.couponModel.uCoupId };
				if(this.uCoupId){
					viewOption.uCoupId = this.uCoupId;
				}
				if (AppConf.UI.coupon.detail.version == "v2") {
					this.couponDetailMainView = new CouponDetailMainViewv2(viewOption);
				} else {
					this.couponDetailMainView = new CouponDetailMainView(viewOption);
				}
				this.couponDetailRegion.show(this.couponDetailMainView);
				//clear cache coupon collection if this coupon has been limit use
				if (!this.couponModel.canBeUsed()) {
					var couponList = new CouponListCollection();
					couponList.clearCache()
				}
			} else {
				this.couponDialogueItemView.showDialogue("#couponErr3_dialogue", "エラー", "クーポンが存在しないか、配布されていません。");
				this.fixPosition();
			}
		},
		_fetchCoupons: function(remove){
			// ログインエラーが出る場合は公開クーポンを採りにいく
			// this.couponCollection.fetchWithAuthInfo({
			// 	on401: (function(_this){
			// 		return function(){
			// 			_this.couponCollection.fetchOpenCoupons();
			// 		};
			// 	})(this)
			// });
			this.couponCollection.fetchCouponAll({ remove: remove });
		},
		fetchCouponAll: function() {
			if( this.couponCollection.isAtLastPage() ) {
				this.renderMainFromCollection();
			} else {
				this._fetchCoupons(false);
			}
		},
		onRender: function() {
			if (AppConf.UI.coupon.detail.version == "v2") {
				this.$el.css({ 'margin-top': '-44px', 'height': $(window).height()});
			}
		},
		onLoad:function(){
			$('.page').removeClass('page-center');
		},
		fixPosition: function() {
			var windowH = $(window).height();
			var dialogueH = ( windowH - $('#couponErr3_dialogue').height() ) / 2 ;
			$('#couponErr3_dialogue').css({'position':'fixed','top':dialogueH});
		}
	});

	return CouponDetailLayoutView;
})();

},{"../../models/coupon_collection.js":207,"../../models/coupon_detail_collection.js":208,"../../models/coupon_model.js":211,"./coupon_detail_layout_template.html":28,"./coupon_detail_main_view.js":31,"./coupon_detail_main_view.v2.js":32,"./dialogue/coupon_dialogue_item_view.js":45,"backbone":"5kFNoY"}],28:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="COUPON-DETAIL" class="BACKBONE-PAGE ';
 if( AppConf.UI.coupon.detail.version == "v2"){ 
__p+='v2';
 }else{ 
__p+='v1';
 } 
__p+='">\r\n    <div class="close-button">\r\n\t\t<img class="cancel-icon" src="./image/common/cancel.png">\r\n\t</div>\r\n    <div id="coupon-dialogue-region"></div>\r\n    <div id="coupon-detail-region" class="bgcolor1"></div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],29:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- '+
((__t=( useCondInterval ))==null?'':__t)+
'  -->\r\n\r\n<div id="coupon-padding" class="padding"></div>\r\n<div id="use-status-view" class="hlftcolor2 hlbgcolor2"></div>\r\n<div class="box_img_detail"><img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'"></div>\r\n<div class="coupon_title ftcolor1">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n<div class="coupon_detail ftcolor3">'+
((__t=( App.util.text.nl2br( detailText ) ))==null?'':__t)+
'\t</div>\r\n<dl>\r\n\t';
 if( usePeriodType + "" === "0" ){ 
__p+='\r\n\t\t<dt class="icon time ftcolor1">利用期間</dt>\r\n\t\t<dd class="ftcolor3">'+
((__t=( formatDate( usePeriodStartDate ) ))==null?'':__t)+
' ～ '+
((__t=( formatDate( usePeriodEndDate ) ))==null?'':__t)+
'</dd>\r\n\t';
 }else{ 
__p+='\r\n\t\t<dt class="icon time ftcolor1">有効期限</dt>\r\n\t\t<dd class="ftcolor3">'+
((__t=( formatDate( expires ) ))==null?'':__t)+
'</dd>\r\n\t';
 } 
__p+='\r\n\r\n\t';
 if( useCondLimit > 0 ){ 
__p+='\r\n\t\t<dt class="icon check ftcolor1">利用条件</dt>\r\n\t\t<dd class="ftcolor3">先着'+
((__t=( useCondLimit ))==null?'':__t)+
'名様までご利用可能</dd>\r\n\t';
 } 
__p+='\r\n\r\n\t';
 if( useCondNumber > 0 ){ 
__p+='\r\n\t\t<dt class="icon check ftcolor1">回数制限</dt>\r\n\t\t<dd class="ftcolor3">合計'+
((__t=( useCondNumber ))==null?'':__t)+
'回まで利用可能</dd>\r\n\t';
 } 
__p+='\r\n\r\n\t<dt class="icon attention ftcolor1">備考・注意事項</dt>\r\n\t<dd class="ftcolor3">'+
((__t=( note ))==null?'':__t)+
'</dd>\r\n</dl>\r\n<div class="btn_area">\r\n';
 if( isBeforeTerm ){ 
__p+='\r\n\t<button type="button" disabled id="use-btn" class="btbgcolor1 btftcolor1">期間外</button>\r\n';
 } else if( canBeUsed ){ 
__p+='\r\n\t<button type="button" id="use-btn" class="btbgcolor1 btftcolor1">このクーポンを使う</button>\r\n';
 }else{ 
__p+='\r\n\t<button type="button" disabled class="btbgcolor1 btftcolor1">'+
((__t=( limitConditionText() ))==null?'':__t)+
'</button>\r\n';
 } 
__p+='\r\n\t<button style="display:none;" type="button" id="share-btn" class="btbgcolor2 btbdcolor1 btftcolor2">このクーポン情報をシェア</button>\r\n</div>\r\n';
}
return __p;
};

},{}],30:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- '+
((__t=( useCondInterval ))==null?'':__t)+
'  -->\n<div class="box_img_detail"><img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'"></div>\n<div class="coupon_title ftcolor1">'+
((__t=( name ))==null?'':__t)+
'</div>\n\n<div class="guide-block guide-before-use hide">\n\t<div class="expdate">有効期限: '+
((__t=( formatDate( expires ) ))==null?'':__t)+
'</div>\n\t<div class="guide">「使用する」を右へスライドしてください。</div>\n</div>\n<div class="guide-block guide-after-use hide">\n\t<div class="msg used hide">'+
((__t=( limitConditionText() ))==null?'':__t)+
'</div>\n\t<div class="msg beforeused hide">利用期間外のクーポンです。</div>\n</div>\n<div id="use-status-view" class="hlftcolor2 hlbgcolor2"></div>\n<div class="switch-btn-region hide"></div>\n<div class="message-alert-area message-after-use hide">\n\t<div class="notice-message">※画面キャプチャではご利用いただけません。</div>\n</div>\n<dl class="condition">\n\t';
 if( detailText ){ 
__p+='\n\t<dt class="icon book ftcolor1">詳細</dt>\n\t<dd class="ftcolor3">'+
((__t=( App.util.text.nl2br( detailText ) ))==null?'':__t)+
'</dd>\n\t';
 } 
__p+='\n\n\t';
 if( usePeriodType + "" === "0" ){ 
__p+='\n\t<dt class="icon time ftcolor1">利用期間</dt>\n\t<dd class="ftcolor3">'+
((__t=( formatDate( usePeriodStartDate ) ))==null?'':__t)+
' ～ '+
((__t=( formatDate( usePeriodEndDate ) ))==null?'':__t)+
'</dd>\n\t';
 }else{ 
__p+='\n\t<dt class="icon time ftcolor1">有効期限</dt>\n\t<dd class="ftcolor3">'+
((__t=( formatDate( expires ) ))==null?'':__t)+
'</dd>\n\t';
 } 
__p+='\n\n\t';
 if( useCondLimit > 0 ){ 
__p+='\n\t<dt class="icon check ftcolor1">利用条件</dt>\n\t<dd class="ftcolor3">先着'+
((__t=( useCondLimit ))==null?'':__t)+
'名様までご利用可能</dd>\n\t';
 } 
__p+='\n\n\t';
 if( useCondNumber > 0 ){ 
__p+='\n\t<dt class="icon check ftcolor1">回数制限</dt>\n\t<dd class="ftcolor3">合計'+
((__t=( useCondNumber ))==null?'':__t)+
'回まで利用可能</dd>\n\t';
 } 
__p+='\n\n\t';
 if( note ){ 
__p+='\n\t<dt class="icon attention ftcolor1">備考・注意事項</dt>\n\t<dd class="ftcolor3">'+
((__t=( note ))==null?'':__t)+
'</dd>\n\t';
 } 
__p+='\n</dl>\n';
}
return __p;
};

},{}],31:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
var CouponCollection = require('../../models/coupon_collection.js');
var ModalHitapCouponView = require('../../modals/hitapModal/modal_hitap_coupon_view');
var ModalConfirmView = require('../../modals/confirm/modal_confirm_view');
var ModalShopListView = require('../../modals/shop_list/modal_shop_list_view');
var ModalAlertView = require('../../modals/alert/modal_alert_view');
module.exports = (function () {

	var CouponDetailMainView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_detail_main_template.html'),
		useStatusTemplate: require('./coupon_detail_use_template.html'),
		QRTemplate: require('./coupon_detail_qr_template.html'),
		ui:{
			"couponPadding" : "#coupon-padding",
		},
		events:{
			// "click #use-btn" : "use",
			"click #use-btn": "show_dialogue_confirm"
		},
		initialize: function(options){
			this.dialogueFlg;
			this.listenTo(this.model, 'change', this.render );
			this.couponCollection = new CouponCollection();
			this.modalHitapCouponView = new ModalHitapCouponView();
			this.modalConfirmView = new ModalConfirmView();
			this.modalShopListView = new ModalShopListView();
			this.modalAlertView = new ModalAlertView();
		},
		templateHelpers:{
			formatDate: function( dateTime ){
				if( !dateTime ) return "";
				return moment( dateTime ).format("YYYY/MM/DD HH:mm:ss");
			},
			limitConditionText: function(){
				var condition = this.limitCode;
				return {
					"1":"既に" + this.useCondLimit + "名様にご利用頂きました", /* 先着制限 */
					"2":"ご利用有り難うございました", /* 回数制限 */
					"3":"本日分は既にご利用済みです", /* 同日利用制限 */
				}[condition] || "利用済み";
			}
		},
		showHitap: function(model) {
			var _this = this;
			this.modalHitapCouponView.show(model).then(function(resHitap) {
				// hitap success
				if (resHitap.isDone) {
					var res = resHitap.resUseCoupon;
					var shopCount = res.shopCount;
					if (shopCount > 1) {
						_this.hitapCode = res.hitapCode;
						_this.modalShopListView.show(res).then(function(resShop) {
							if(resShop.isDone){
								_this.useCouponVerifyHitap({shopId: resShop.shopId});
							}
						})
					} else {
						var confirmDsp = res.confirmationDisp;
						if (confirmDsp == 1) {
							var title = '利用確認';
							var msg = '';
							_this.hitapCode = res.hitapCode;
							_this.listShop = res.listShop;
							var shopName = _this.listShop[0].shopName;
							var shopNameLength = shopName.length;
							var length1 = shopName.lastIndexOf("店");
							var length2 = shopName.lastIndexOf("店舗");
							if ( ( shopNameLength - 1 === length1 && length1 > 0 ) || ( shopNameLength - 2 === length2 && length2 > 0 ) ) {
								msg = "クーポンを" + shopName + "に利用します。確定するには、確認ボタンを押してください。";
							} else {
								msg = "クーポンを" + shopName + AppConf.coupon.shopExten + "に利用します。確定するには、確認ボタンを押してください。";
							}
							_this.modalConfirmView.show({ title: title, text: msg, okButton: '確認' }).then(function(res) {
								if (res === 1) {
									_this.useCouponVerifyHitap({shopId: _this.listShop[0].shopId});
								}
							});
						} else {
							_this.useCouponDone(res);
						}
					}
				}
			});
		},
		useCouponDone: function(res) {
			var _this = this;
			_this.model.use(); // レンダリングは change イベントに頼る
			_this._showUseStatus(_this._buildStatusOptionsFromUseResponse(res));
			$("#COUPON-DETAIL").scrollTop(0);
			_this.couponCollection.clearCache();
			_this.remove_dialogue_confirm();
		},
		useCouponVerifyHitap: function(options) {
			var _options = options || null;
			var _this = this;
			App.util.showProgressScreen();
			App.btApi.useCouponVerifiedHitap({
				"shopId": options.shopId,
				"hitapCode": _this.hitapCode,
				"uCoupId": _this.model.get("uCoupId"),
				"couponId": _this.model.get("id"),
				"securityCode": '',
				"useButtonFlg": 0
			}).done(function(res) {
				App.util.hideProgressScreen();
				_this.useCouponDone( res );
			}).fail(function(err) {
				var statusError = err.status;
				var errorMessage = "";
				var title = "";
				if (statusError !== 401) {
					if (statusError === 403) {
						if (typeof err.responseJSON === "undefined" || err.responseJSON === null || (err.responseJSON != null && err.responseJSON.errorCode === "0003")) {
							title = "申し訳ございません。";
							errorMessage = "来店スタンプは1日1回までのご利用となります。";
						} else {
							title = "スタンプ利用エラー";
							errorMessage = "スタンプ利用に失敗しました";
						}
					}
					else if (statusError === 404) {
						title = "";
						errorMessage = "スタンプなし";
					} else {
						title = "スタンプ利用エラー";
						errorMessage = "スタンプ利用に失敗しました";
					}
					_this.modalAlertView.show({ title: title, text: errorMessage });
				}
				App.util.hideProgressScreen();
			});
		},
		show_dialogue_confirm: function() {
			var _this = this;
			var confirmDsp = this.model.get("confirmationDisp");
			// dialog confirm only show when there is gps coupon or without hitap
			if ( confirmDsp === "1" && (AppConf.layout.coupon.type !== 'hitap' || this.model.needGEOLocationToUse())){
				_this.modalConfirmView.show({ title: '利用確認', text: 'クーポンを利用します。確定するには、確認ボタンを押してください。', okButton: '確認' }).then(function(res) {
					if (res === 1) {
						_this.use();
					}
				});
				// prevent scroll on IOS when show popup confirm
				$('.BACKBONE-PAGE')[0].style.setProperty('overflow-y', 'hidden', 'important');
			} else {
				this.use();
			}
		},
		remove_dialogue_confirm: function(){
			$("#showdialogue-coupon").removeClass("show");
			$('.BACKBONE-PAGE').css('overflow-y', '');
		},
		use: function(){
			if( this.model.needGEOLocationToUse() ){
				// 位置情報を取得した後にリクエストを投げる
				var options = {};
				var _this = this;

				var geolocationSuccess = function( rtn ){
					var longitude = rtn.coords.longitude;
					var latitude = rtn.coords.latitude;
					_this._postUseRequest({longitude: longitude, latitude: latitude } );
				};
				var errorCallback = function(error){
					// Geolocationがマストで無い場合はそのまま投げる
					if( _this.model.canBeUsedWithoutGEOLocation() ){
						_this._postUseRequest();
					} else {
						// applican.notification.alert("位置情報取得に失敗しました", App.util.hideProgressScreen,"","OK");
						_this.remove_dialogue_confirm();
						App.util.hideProgressScreen();
						$("#showdialogue-coupon, #couponErr1_dialogue").addClass("show");
					}
				}
				if (navigator.geolocation) {
					App.util.showProgressScreen();
					navigator.geolocation.getCurrentPosition(geolocationSuccess, errorCallback);
				} else {
					applican.notification.alert("位置情報の取得に失敗しました\nもう一度試すか、カテゴリ、キーワード検索をお試しください。", App.doNothing, "", "OK");
				}	
			} else {
				if (AppConf.layout.coupon.type === 'hitap') {
					// get date item for coupon detail
					this.showHitap(this.model);
					this.remove_dialogue_confirm();
				} else {
					this._postUseRequest();
				}
			}
		},
		_postUseRequest: function( options ){
			var _this = this;
			var _options = options || {};
			var requestAction = function(){ 
				return App.btApi.useCoupon({ 
					id: _this.model.get("id"),
					uCoupId: _this.model.get("uCoupId"),
					longitude: _options.longitude,
					latitude: _options.latitude
				}).done(function(res){
					_this.model.use(); // レンダリングは change イベントに頼る
					_this.remove_dialogue_confirm();
					_this._showUseStatus( _this._buildStatusOptionsFromUseResponse( res ) );
					$("#COUPON-DETAIL").scrollTop(0);
					_this.couponCollection.clearCache();
				}).fail(function(err){
					if(err.status === 403){
						// applican.notification.alert("最寄りの店舗が見つからないため、クーポンを利用できません。", App.doNothing, "", "OK");
						_this.remove_dialogue_confirm();
						var res = err.responseJSON || {};
						var errorCode = res.errorCode;
						console.log("errorCode:" + errorCode);
						if (errorCode+"" === "3001" || errorCode+"" === "3002") {
							_this.couponCollection.clearCache();
							// 利用制限でのエラー
							_this.modalAlertView.show({ title: '終了', text: '申し訳ありません。<br>このクーポンは、たった今上限枚数に達した為ご利用頂けません。' });
						} else if (errorCode+"" === "3003") {
							_this.couponCollection.clearCache();
							// 利用制限でのエラー
							_this.modalAlertView.show({ title: '同日制限', text: '本日は既に利用されています。' });
						} else {
							_this.dialogueFlg = "3";
							$("#showdialogue-coupon, #couponErr2_dialogue").addClass("show");
						}
					}
				});
			};
			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ),
				{ignoreStatuses: [404,403]}
			);
		},
		onRender: function(){
			this.stickit();
			if ( this.model.get("typeParam") && this.model.isMemberOnly() && !this.model.get("useTypeQrCode") ) {
				this._showUseStatus( this._buildStatusOptionsFromUseComplete() );

			}
		},
		_buildStatusOptionsFromUseResponse: function( res ){

			var useDateTime = Number( new Date() );
			var listShop = res.listShop;
			var shopName = "";
			if ( listShop ) {
				shopName = (listShop[0].shopName) ? listShop[0].shopName : "";
			} else {
				shopName = (res.shop)? res.shop.name : "";
			}
			var qr = res.qrData;
			var rtn =  {
				useDateTime: useDateTime,
				shopName: shopName,
				qr: qr
			};

			// TODO: この情報 + uCouopIDをローカルストレージに入れる事で、リロード対策を行いたい 
			// 30秒以内に同じ画面を開いた場合は消しコミ画面を表示する仕様を提案する
			// 問題はQRで、これはワンタイムとかそういうものではないか注意

			return rtn;

		},
		_buildStatusOptionsFromUseComplete: function(){
			var rtn =  {
				useDateTime: this.model.get("finalUseDate"),
				shopName: "",
				qr: ""
			};

			return rtn;

		},
		_showUseStatus: function( params ){

			var params = params || {};
			// QR
			if( params.qr ){
				var obj = {};
				obj.color = "000000";
				obj.qr = encodeURIComponent(params.qr);
				this.$el.append( this.QRTemplate( obj ) );
				// prevent scroll on IOS when show qrcode
				$('.BACKBONE-PAGE')[0].style.setProperty('overflow-y', 'hidden', 'important');
			}else{
				// それ以外
				var obj = {};
				obj.useDateTime = moment( params.useDateTime ).format("YYYY/MM/DD HH:mm:ss");
				obj.shopName = params.shopName || "-";
				obj.redisplayTime  = AppConf.couponList.redisplayTime / 60;
				obj.typeParam = "";
				if ( this.model.get("typeParam") ) {
					obj.typeParam = this.model.get("typeParam");
				}
				this.$('#use-status-view').append( this.useStatusTemplate( obj ));
				this.ui.couponPadding.removeClass('padding');
			}
		},
		onDestroy: function() {
			this.modalHitapCouponView.onDestroy();
			this.modalConfirmView.onDestroy();
			this.modalShopListView.onDestroy();
			this.modalAlertView.onDestroy();
		}
	});

	return CouponDetailMainView;

})();

},{"../../modals/alert/modal_alert_view":190,"../../modals/confirm/modal_confirm_view":193,"../../modals/hitapModal/modal_hitap_coupon_view":194,"../../modals/shop_list/modal_shop_list_view":201,"../../models/coupon_collection.js":207,"./coupon_detail_main_template.html":29,"./coupon_detail_qr_template.html":33,"./coupon_detail_use_template.html":34,"backbone":"5kFNoY","moment":"iROhDJ"}],32:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
var SwitchBtnLayout = require('../switchbutton/switch_btn_layout.js');
var ModalConfirmView = require('../../modals/confirm/modal_confirm_view');
var ModalAlertView = require('../../modals/alert/modal_alert_view.js');
var CouponCollection = require('../../models/coupon_collection.js');
var ModalHitapCouponView = require('../../modals/hitapModal/modal_hitap_coupon_view');
var ModalShopListView = require('../../modals/shop_list/modal_shop_list_view')
module.exports = (function() {

	var CouponDetailMainView = Backbone.Marionette.LayoutView.extend({
		template: require('./coupon_detail_main_template.v2.html'),
		useStatusTemplate: require('./coupon_detail_use_template.v2.html'),
		QRTemplate: require('./coupon_detail_qr_template.html'),
		ui: {
			'userGuideBeforeUse': '.guide-before-use',
			'userGuideAfterUse': '.guide-after-use',
			'switchButton': '.switch-btn-region',
			"usestatusview": "#use-status-view",
			"msgAlertAfterUse": ".message-after-use",
		},
		regions: {
			"switchBtnRegion": ".switch-btn-region",
		},
		initialize: function (options) {
			this.listenTo(this.model, 'change', this.render);
			var _this = this;
			this.couponCollection = new CouponCollection();
			this.modalConfirmView = new ModalConfirmView();
			this.switchBtnLayout = new SwitchBtnLayout();
			this.modalAlertView = new ModalAlertView();
			this.modalHitapCouponView = new ModalHitapCouponView();
			this.modalShopListView = new ModalShopListView();
			this.switchBtnLayout.then(function (res) {
				if (res == 1) {
					_this.showDialogue();
				}
			});
			this.listenTo(this, 'load:sync', this.onLoad);
		},
		templateHelpers: {
			formatDate: function (dateTime) {
				if (!dateTime) return "";
				return moment(dateTime).format("YYYY/MM/DD");
			},
			formatTime: function (dateTime) {
				if (!dateTime) return "";
				return moment(dateTime).format("HH:mm");
			},
			limitConditionText: function () {
				var condition = this.limitCode;
				return {
					"1": "先着人数に達した為、終了しました。", /* 先着制限 */
					"2": "ご利用有り難うございました", /* 回数制限 */
					"3": "本日分は利用済みです。", /* 同日利用制限 */
				}[condition] || "このクーポンは利用済みです。";
			},
			formatDate1: function (time) {
				var m = moment(time);
				return "<span class='small'> " + m.year() + "</span>" + App.util.text.padStart(m.month() + 1 + "", 2, '0') + "." + App.util.text.padStart(m.date() + "", 2, '0');
			},			
			remainDay: function (endDate) {
				var end = moment(endDate);
				var now = moment();
				return (end.diff(now, 'days'));
			},
		},
		showHitap: function(model) {
			var _this = this;
			this.modalHitapCouponView.show(model).then(function(resHitap) {
				// hitap success
				if (resHitap.isDone) {
					var res = resHitap.resUseCoupon;
					var shopCount = res.shopCount;
					if (shopCount > 1) {
						_this.hitapCode = res.hitapCode;
						_this.modalShopListView.show(res).then(function(resShop) {
							if (resShop.isDone) {
								_this.useCouponVerifyHitap({ shopId: resShop.shopId });
							}
						})
					} else {
						var confirmDsp = res.confirmationDisp;
						if (confirmDsp == 1) {
							var title = '利用確認';
							var msg = '';
							_this.hitapCode = res.hitapCode;
							_this.listShop = res.listShop;
							var shopName = _this.listShop[0].shopName;
							var shopNameLength = shopName.length;
							var length1 = shopName.lastIndexOf("店");
							var length2 = shopName.lastIndexOf("店舗");
							if ((shopNameLength - 1 === length1 && length1 > 0) || (shopNameLength - 2 === length2 && length2 > 0)) {
								msg = "クーポンを" + shopName + "に利用します。確定するには、確認ボタンを押してください。";
							} else {
								msg = "クーポンを" + shopName + AppConf.coupon.shopExten + "に利用します。確定するには、確認ボタンを押してください。";
							}
							_this.modalConfirmView.show({ title: title, text: msg, okButton: '確認' }).then(function(res) {
								if (res === 1) {
									_this.useCouponVerifyHitap({ shopId: _this.listShop[0].shopId });
								}
							});
						} else {
							_this.useCouponDone(res);
						}
					}
				}
			});
		},
		useCouponDone: function(res) {
			var _this = this;
			_this.model.use(); // レンダリングは change イベントに頼る
			_this.ui.switchButton.addClass('hide');
			_this.ui.userGuideAfterUse.removeClass('hide');
			_this.ui.msgAlertAfterUse.removeClass('hide');
			_this._showUseStatus(_this._buildStatusOptionsFromUseResponse(res));
			$("#COUPON-DETAIL").scrollTop(0);
			_this.couponCollection.clearCache();
		},
		useCouponVerifyHitap: function(options) {
			var _options = options || null;
			var _this = this;
			App.util.showProgressScreen();
			App.btApi.useCouponVerifiedHitap({
				"shopId": options.shopId,
				"hitapCode": _this.hitapCode,
				"uCoupId": _this.model.get("uCoupId"),
				"couponId": _this.model.get("id"),
				"securityCode": '',
				"useButtonFlg": 0
			}).done(function(res) {
				App.util.hideProgressScreen();
				_this.useCouponDone( res );
			}).fail(function(err) {
				var statusError = err.status;
				var errorMessage = "";
				var title = "";
				if (statusError !== 401) {
					if (statusError === 403) {
						console.log("errorCode:" + err.responseJSON.errorCode);
						if (typeof err.responseJSON === "undefined" || err.responseJSON === null || (err.responseJSON != null && err.responseJSON.errorCode === "0003")) {
							title = "申し訳ございません。";
							errorMessage = "来店スタンプは1日1回までのご利用となります。";
						} else if (err.responseJSON.errorCode+"" === "3001" || err.responseJSON.errorCode+"" === "3002") {
							_this.couponCollection.clearCache();
							// 利用制限でのエラー
							title = "終了";
							errorMessage = "申し訳ありません。<br>このクーポンは、たった今上限枚数に達した為ご利用頂けません。";
						} else if (err.responseJSON.errorCode+"" === "3003") {
							_this.couponCollection.clearCache();
							// 利用制限でのエラー
							title = "同日制限";
							errorMessage = "本日は既に利用されています。";
						} else {
							title = "スタンプ利用エラー";
							errorMessage = "スタンプ利用に失敗しました";
						}
					} else if (statusError === 404) {
						title = "";
						errorMessage = "スタンプなし";
					} else {
						title = "スタンプ利用エラー";
						errorMessage = "スタンプ利用に失敗しました";
					}
					_this.modalAlertView.show({ title: title, text: errorMessage });
				}
				App.util.hideProgressScreen();
			});
		},
		showDialogue: function() {
			var _this = this;
			var confirmDsp = this.model.get("confirmationDisp");
			// dialog confirm only show when there is gps coupon or without hitap
			if ( confirmDsp === "1" && (AppConf.layout.coupon.type !== 'hitap' || this.model.needGEOLocationToUse())){
				this.modalConfirmView.show({ title: '使用確認', text: 'クーポンを使用しますが、よろしいでしょうか？', okButton: '確認' }).then(function(res) {
					// cancel hitap
					_this.switchBtnLayout.switchOff();
					// hitap success
					if (res === 1) {
						_this.use();
					}
				});
			} else {
				this.use();
			}
		},
		use: function() {
			if (this.model.needGEOLocationToUse()) {
				// 位置情報を取得した後にリクエストを投げる
				var options = {};
				var _this = this;

				var geolocationSuccess = function( rtn ){
					var longitude = rtn.coords.longitude;
					var latitude = rtn.coords.latitude;
					_this._postUseRequest({ longitude: longitude, latitude: latitude });
				};
				var errorCallback = function(error){
					// Geolocationがマストで無い場合はそのまま投げる
					if (_this.model.canBeUsedWithoutGEOLocation()) {
						_this._postUseRequest();
					} else {
						_this.modalAlertView.show({ title: '店舗位置情報', text: '位置情報の取得に失敗しました。' });
						App.util.hideProgressScreen();
					}
					_this.switchBtnLayout.switchOff();
				}
				if (navigator.geolocation) {
					App.util.showProgressScreen();
					navigator.geolocation.getCurrentPosition(geolocationSuccess, errorCallback);
				} else {
					applican.notification.alert("位置情報の取得に失敗しました\nもう一度試すか、カテゴリ、キーワード検索をお試しください。", App.doNothing, "", "OK");
				}
					
			} else {
				if (AppConf.layout.coupon.type === 'hitap') {
					// get date item for coupon detail
					this.showHitap(this.model);
				} else {
					this._postUseRequest();
				}
			}
		},
		_postUseRequest: function(options) {
			var _this = this;
			var _options = options || {};
			var requestAction = function() {
				return App.btApi.useCoupon({
					id: _this.model.get("id"),
					uCoupId: _this.model.get("uCoupId"),
					longitude: _options.longitude,
					latitude: _options.latitude
				}).done(function(res) {
					_this.model.use(); // レンダリングは change イベントに頼る
					_this.ui.switchButton.addClass('hide');
					_this.ui.userGuideAfterUse.removeClass('hide');
					_this.ui.msgAlertAfterUse.removeClass('hide');
					_this._showUseStatus(_this._buildStatusOptionsFromUseResponse(res));
					$("#COUPON-DETAIL").scrollTop(0);
					_this.couponCollection.clearCache();
				}).fail(function(err) {
					if (err.status === 403) {
						var res = err.responseJSON || {};
						var errorCode = res.errorCode;
						var errorMessage = "";
						var title = "";
						console.log("errorCode:" + errorCode);
						if (errorCode+"" === "3001" || errorCode+"" === "3002") {
							_this.couponCollection.clearCache();
							// 利用制限でのエラー
							title = "終了";
							errorMessage = "申し訳ありません。<br>このクーポンは、たった今上限枚数に達した為ご利用頂けません。";
						} else if (errorCode+"" === "3003") {
							_this.couponCollection.clearCache();
							// 利用制限でのエラー
							title = "同日制限";
							errorMessage = "本日は既に利用されています。";
						} else {
							title = "最寄の店舗";
							errorMessage = "最寄りの店舗が見つからないため、クーポンを取得できません。";
							_this.switchBtnLayout.switchOff();
						}
						_this.modalAlertView.show({ title: title, text: errorMessage });
					}
				});
			};
			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen(requestAction),
				{ ignoreStatuses: [404, 403] }
			);
		},
		onRender: function() {
			this.stickit();
			if (this.model.get("typeParam") && this.model.isMemberOnly() && !this.model.get("useTypeQrCode")) {
				this._showUseStatus(this._buildStatusOptionsFromUseComplete());
			}

			// display msg after use coupon
			if (this.model.isBeforeTerm()) {
				this.ui.userGuideAfterUse.removeClass('hide').find('.beforeused').removeClass('hide');
				this.ui.switchButton.removeClass('hide');
				this.switchBtnRegion.show(this.switchBtnLayout);
				this.ui.switchButton.addClass('disabled');
			} else if (this.model.canBeUsed()) {
				this.ui.switchButton.removeClass('hide');
				this.switchBtnRegion.show(this.switchBtnLayout);
				this.ui.userGuideBeforeUse.removeClass('hide');
			} else {
				this.ui.userGuideAfterUse.removeClass('hide').find('.used').removeClass('hide');
				switch (this.model.get("limitCode")) {
					case 1:
					case 2:
					case 3:
						this.ui.usestatusview.addClass('disabled');
						break;
				}
			}
		},
		_buildStatusOptionsFromUseResponse: function(res) {

			var useDateTime = Number(new Date());
			var listShop = res.listShop;
			var shopName = "";
			if ( listShop ) {
				shopName = (listShop[0].shopName) ? listShop[0].shopName : "";
			} else {
				shopName = (res.shop)? res.shop.name : "";
			}
			var qr = res.qrData;
			var rtn = {
				useDateTime: useDateTime,
				shopName: shopName,
				qr: qr
			};

			// TODO: この情報 + uCouopIDをローカルストレージに入れる事で、リロード対策を行いたい 
			// 30秒以内に同じ画面を開いた場合は消しコミ画面を表示する仕様を提案する
			// 問題はQRで、これはワンタイムとかそういうものではないか注意

			return rtn;

		},
		_buildStatusOptionsFromUseComplete: function() {
			var rtn = {
				useDateTime: this.model.get("finalUseDate"),
				shopName: "",
				qr: ""
			};

			return rtn;

		},
		_showUseStatus: function(params) {

			var params = params || {};
			// QR
			if (params.qr) {
				var obj = {};
				obj.color = "000000";
				obj.qr = encodeURIComponent(params.qr);
				this.$el.append(this.QRTemplate(obj));
				$('.BACKBONE-PAGE')[0].style.setProperty('overflow-y', 'hidden', 'important');
			} else {
				// それ以外
				var obj = {};
				obj.useDateTime = moment(params.useDateTime).format("YYYY/MM/DD HH:mm:ss");
				obj.shopName = params.shopName || "-";
				obj.redisplayTime = AppConf.couponList.redisplayTime / 60;
				obj.typeParam = "";
				if (this.model.get("typeParam")) {
					obj.typeParam = this.model.get("typeParam");
				}
				this.$('#use-status-view').append(this.useStatusTemplate(obj));
			}
		},
		onDestroy: function() {
			// remove hitap DOM and modal confirm DOM
			this.modalAlertView.onDestroy();
			this.modalConfirmView.onDestroy();
			this.modalHitapCouponView.onDestroy();
			this.modalShopListView.onDestroy();
		},
	});

	return CouponDetailMainView;

})();

},{"../../modals/alert/modal_alert_view.js":190,"../../modals/confirm/modal_confirm_view":193,"../../modals/hitapModal/modal_hitap_coupon_view":194,"../../modals/shop_list/modal_shop_list_view":201,"../../models/coupon_collection.js":207,"../switchbutton/switch_btn_layout.js":149,"./coupon_detail_main_template.v2.html":30,"./coupon_detail_qr_template.html":33,"./coupon_detail_use_template.v2.html":35,"backbone":"5kFNoY","moment":"iROhDJ"}],33:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="qrOverlay">\r\n\t<div class="qrText">こちらの画像を提示してください</div>\r\n\t<img class="qrImage" src="https://chart.googleapis.com/chart?cht=qr&chs=157x157&chco='+
((__t=( color ))==null?'':__t)+
'&chl='+
((__t=( qr ))==null?'':__t)+
'">\r\n</div>\r\n';
}
return __p;
};

},{}],34:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="use_title hl2_bdcolor1">こちらの画面を提示してください</div>\r\n<div class="icon timeused">利用日時： '+
((__t=( useDateTime ))==null?'':__t)+
'</div>\r\n<div class="use_valid_time ';
 if ( typeParam ) { 
__p+='use_valid_time_complete';
}
__p+='">有効期限： 上記日時から';
 if ( redisplayTime == 0 ) { 
__p+='30';
} else {
__p+=''+
((__t=( redisplayTime ))==null?'':__t)+
'';
}
__p+='分間有効</div>\r\n';
 if ( !typeParam ) { 
__p+='\r\n\t<div class="icon shop">利用店舗： '+
((__t=( shopName ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
}
return __p;
};

},{}],35:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<dl class="usedstatus cf">\n\t<dt>利用日時</dt><dd>'+
((__t=( useDateTime ))==null?'':__t)+
'</dd>\n\t<dt>有効期限</dt><dd>上記日時から';
 if ( redisplayTime == 0 ) { 
__p+='30';
} else {
__p+=''+
((__t=( redisplayTime ))==null?'':__t)+
'';
}
__p+='分間有効</dd>\n</dl>\n';
}
return __p;
};

},{}],36:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if(!canBeUsed && !isBeforeTerm && isMemberOnly){ 
__p+='\r\n  <div class="';
 if (finalUseCoupon == true){ 
__p+='indisable';
}else{
__p+='disable';
}
__p+='">\r\n    <div class="inner">\r\n      <span id="triangle-topleft"></span>\r\n      ';
 if(!canBeUsed && finalUseDate){ 
__p+='\r\n      <p class="rotate ';
 if (applican.config.device_os === "ANDROID"){ 
__p+='android_rotate';
}
__p+='">利用済み</p>\r\n      ';
 } else if(!canBeUsed && !finalUseDate && limitCode === 1) { 
__p+='\r\n      <p class="rotate ';
 if (applican.config.device_os === "ANDROID"){ 
__p+='android_rotate';
}
__p+='">&nbsp;&nbsp;終了&nbsp;&nbsp;</p>\r\n      ';
 } 
__p+='\r\n    </div>    \r\n  </div>\r\n';
 } 
__p+='\r\n\r\n<div class="COUPON-ITEM-BOX ';
 if( isMemberOnly){ 
__p+='MEMBER-ONLY';
 } 
__p+='">\r\n';
 if(!canBeUsed && !isBeforeTerm && isMemberOnly){ 
__p+='\r\n\t<a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'&typeParam=complete" class="cf">\r\n';
 } else { 
__p+='\r\n  <a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'" class="cf">\r\n';
 } 
__p+='\r\n      <div class="box_images">\r\n    \t\t<img class="image-coupon" src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'">\r\n      </div> <!-- box_images -->\r\n\t\t\t<div class="coupon_info">\r\n    \t\t<div class="MEMBER-ONLY-MARK hlftcolor1 hlbgcolor1">会員限定クーポン</div>\r\n        ';
 if(isBeforeTerm){ 
__p+='\r\n        <div class="BEFORE-TERM-MARK hlftcolor2 hlbgcolor2">利用期間開始前</div>\r\n        ';
 } else if(!canBeUsed && !finalUseDate && (limitCode === 1 || limitCode === 2)) { 
__p+='\r\n        <div class="BEFORE-TERM-MARK hlftcolor2 hlbgcolor2">上限数に達しました</div>\r\n        ';
 } 
__p+='\r\n    \t\t<div class="coupon_name">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n    \t\t<div class="valid_time">有効期限:'+
((__t=( expiresFormat( expires ) ))==null?'':__t)+
'まで</div>\r\n\t\t\t</div> <!-- coupon_info -->\r\n\t</a>\r\n</div>\r\n';
}
return __p;
};

},{}],37:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if(!canBeUsed && !isBeforeTerm && isMemberOnly){ 
__p+='\n<div class="';
 if (finalUseCoupon == true){ 
__p+='indisable';
}else{
__p+='disable';
}
__p+='">\n\t<div class="inner">\n\t\t<span id="triangle-topleft"></span>\n\t\t';
 if(!canBeUsed && finalUseDate){ 
__p+='\n\t\t<p class="rotate ';
 if (applican.config.device_os === 'ANDROID'){ 
__p+='android_rotate';
}
__p+='">使用済み</p>\n\t\t';
 } else if(!canBeUsed && !finalUseDate && limitCode === 1) { 
__p+='\n\t\t\t<p class="rotate ';
 if (applican.config.device_os === "ANDROID"){ 
__p+='android_rotate';
}
__p+='">&nbsp;&nbsp;終了&nbsp;&nbsp;</p>\n\t\t';
 } 
__p+='\n\t</div>\n</div>\n';
 } 
__p+='\n\n<div class=" COUPON-ITEM-BOX ';
 if( isMemberOnly){ 
__p+='MEMBER-ONLY';
 } 
__p+='">\n\t';
 if(!canBeUsed && !isBeforeTerm && isMemberOnly){ 
__p+='\n\t<a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'&typeParam=complete" class="cf">\n\t';
 } else { 
__p+='\n\t<a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'" class="cf">\n\t';
 } 
__p+='\n\t\t<div class="MEMBER-ONLY-MARK hlftcolor1 hlbgcolor1">会員限定クーポン</div>\n\t\t';
 if(isBeforeTerm){ 
__p+='\n\t\t<div class="BEFORE-TERM-MARK hlftcolor2 hlbgcolor2">利用期間開始前</div>\n\t\t';
 } else if(!canBeUsed && !finalUseDate && (limitCode === 1 || limitCode === 2)) { 
__p+='\n\t\t<div class="BEFORE-TERM-MARK hlftcolor2 hlbgcolor2">上限数に達しました</div>\n\t\t';
 } 
__p+='\n\t\t<div class="coupone-name">'+
((__t=( name ))==null?'':__t)+
'</div>\n\t\t<div class="valid-time">有効期限:'+
((__t=( expiresFormat( expires ) ))==null?'':__t)+
'まで</div>\n\t\t<div class="coupon-image">\n\t\t\t<img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'">\n\t\t</div>\n\t\t<div class="coupon-button-block">\n\t\t\t<div class="coupon-button-detail btbgcolor1 btftcolor1">\n\t\t\t\t詳細を見る\n\t\t\t</div>\n\t\t</div>\n\t</a>\n</div>';
}
return __p;
};

},{}],38:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');
var moment = require('moment');
module.exports = (function () {
	var CouponItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: 'coupon-item-container bgcolor2',
		template: AppConf.UI.coupon.version == 'v1' ? require('./coupon_item_template.html') : require('./coupon_item_template.v2.html'),
		templateHelpers: {
			expiresFormat: function( date ){
				return moment(date).format("YYYY年MM月DD日");
			},
		},
	});

	return CouponItemView;

})();

},{"./coupon_item_template.html":36,"./coupon_item_template.v2.html":37,"backbone":"5kFNoY","jquery":"HlZQrA","moment":"iROhDJ"}],39:[function(require,module,exports){
var Backbone = require('backbone');
var Collection = require('../../models/coupon_collection.js');
var CouponCollectionView = require('./coupon_collection_view.js');
var SlideCardCollectionView = require('../../views/slidecard/slidecard_collection_view');
var UserModel = require('../../models/user_model.js');
var TicketCollectionView = require('../passticket/ticket/ticket_collection_view.js');
var TicketCollection = require('../passticket/ticket/ticket_collection.js');
var PassticketPurchaseCollection = require('../../models/passticket_purchase_collection');
module.exports = (function () {

	var CouponLayoutView = Backbone.Marionette.LayoutView.extend({
		template: AppConf.UI.coupon.version == 'v1' ? require('./coupon_layout_template.html') : require('./coupon_layout_template.v2.html'),
		regions: {
			'couponRegion' : '#couponsRegion',
			"ticketNormalListRegion": ".ticket-list-region"
		},
		ui:{
			"cardSlide": ".card-region",
			"moreButton": ".more-button",
		},
		events: {
			"click @ui.moreButton": function(){ this._fetchCoupons({ remove: false }); },
		},
		headerConf: {
			title: AppConf.features.wallet ? "ウォレット" : "クーポン",
			showBackButton: true,
			showWalletMenu: AppConf.features.wallet ? true : false,
			customeBackAction: function(){
				App.pageSlider.home();
			}
		},
		initialize: function(){
			this.userModel = new UserModel();
			if (AppConf.features.wallet){
				this.collection = new Collection();
				App.util.bindProgressScreen(this, this.collection );
				this.listenTo(this.collection, 'sync', this.renderAfterSyncCoupon);
				this.template = require('./coupon_layout_template.wallet.html');
				this.collectionView = new SlideCardCollectionView({
					collection: this.collection
				});
				this.passticketPurchaseCollection = new PassticketPurchaseCollection();
				App.util.bindProgressScreen(this, this.passticketPurchaseCollection);
				this.listenTo(this.passticketPurchaseCollection, 'sync', this.renderPassticketPurchaseCollection);
			} else {
				this.collection = new Collection();
				App.util.bindProgressScreen(this, this.collection );
				this.collection.reset(); //clear models
				this.collectionView = new CouponCollectionView({collection: this.collection});
				this.listenTo( this.collection, 'page-info-has-been-set', this._renderPageNation );		
			}
			this.listenTo(this, 'load:sync', this.onLoad);				
			this.ticketCollection = new TicketCollection({ pagination: true });
			this.ticketCollectionView = new TicketCollectionView({ collection: this.ticketCollection });
			App.util.bindProgressScreen(this, this.ticketCollection);
			this.listenTo(this.ticketCollection, 'sync', this.renderTicket);
		},
		_renderPageNation: function(){
			if( this.collection.isAtLastPage() ){
				this.ui.moreButton.addClass("hide");
			}else{
				this.ui.moreButton.removeClass("hide");
			}
		},
		_fetchCoupons: function( options ){
			var _this = this;
			// ログインエラーが出る場合は公開クーポンを採りにいく
			this.collection.fetchWithAuthInfo({
				remove: options.remove,
				on401: (function(_this){
					return function(){
						_this.collection.fetchOpenCoupons({ remove: options.remove});
					};
				})(this)
			});
		},
		renderAfterSyncCoupon: function(){
			if (this.collection.length > 0) {
				this.couponRegion.show(this.collectionView);				
				if ( AppConf.features.passTicket ){
					this.collectionView.initSlick();
				} else {
					$(".card-slide-container").removeClass("cS-hidden");
				}
			} else {
				this.ui.cardSlide.empty().append('<div class="empty-card"><span class="card-text">有効な定期券がありません</span></div>');
			}
		},
		onLoad: function(){
			this._fetchCoupons({remove: true});			
			if (AppConf.features.wallet && AppConf.features.passTicket ){
				this.passticketPurchaseCollection.fetchPassTicketPurchase();
			} else {
				this.couponRegion.show( this.collectionView );
			}
		},
		renderTicket: function() {
			this.ticketNormalListRegion.show(this.ticketCollectionView);
		},		
		renderPassticketPurchaseCollection: function() {
			var _this = this;
			this.userModel.fetchWithAuthInfo().done(function() {
				_this.ticketCollection.fetchTicket({ remove: true, rank: _this.userModel.get('userRank'), coupons: _this.passticketPurchaseCollection });
			})
		},
	});

	return CouponLayoutView;
})();

},{"../../models/coupon_collection.js":207,"../../models/passticket_purchase_collection":216,"../../models/user_model.js":222,"../../views/slidecard/slidecard_collection_view":244,"../passticket/ticket/ticket_collection.js":91,"../passticket/ticket/ticket_collection_view.js":92,"./coupon_collection_view.js":26,"./coupon_layout_template.html":40,"./coupon_layout_template.v2.html":41,"./coupon_layout_template.wallet.html":42,"backbone":"5kFNoY"}],40:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="COUPON-LIST" class="BACKBONE-PAGE bgcolor1 v1">\r\n\t<div style="display: none;" id="search" class="search serchbgcolor1">\r\n\t\t<div id="search_btn" class="search_btn">\r\n\t\t\t<button class="btbgcolor1 btftcolor1">検索</button>\r\n\t\t\t<button class="btbgcolor1 btftcolor1">近くのお店</button>\r\n\t\t\t<button class="btbgcolor1 btftcolor1">カテゴリ</button>\r\n\t\t</div>\r\n\t\t<input type="text" id="search_input" name="account_id" placeholder="フリーワード検索" value="">\r\n\t</div>\r\n\r\n\t<div id="couponsRegion" class="bgcolor1 ftcolor1">\r\n\t\t<ol class="COUPONS">\r\n\t\t\t<li>\r\n\t\t\t\t<div class="COUPON-ITEM-BOX MEMBER-ONLY">\r\n\t\t\t\t\t<a href="" class="cf">\r\n\t\t\t\t\t\t<div class="box_images">\r\n\t\t\t\t\t\t  <img src="">\r\n\t\t\t\t\t\t  </div> <!-- box_images -->\r\n\t\t\t\t\t\t  <div class="coupon_info">\r\n\t\t\t\t\t\t  <div class="MEMBER-ONLY-MARK hlbgcolor1 hide_this">会員限定クーポン</div>\r\n\t\t\t\t\t\t  <div class="coupon_name"></div>\r\n\t\t\t\t\t\t  <div class="valid_time">有効期限:</div>\r\n\t\t\t\t\t\t  </div> <!-- coupon_info -->\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t</ol>\r\n\t</div>\r\n\t<button class="more-button hide readMoreButton">更に読み込む</button>\r\n</div>\r\n\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],41:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="COUPON-LIST" class="BACKBONE-PAGE bgcolor1 v2">\n\t<div style="display: none;" id="search" class="search serchbgcolor1">\n\t\t<div id="search_btn" class="search_btn">\n\t\t\t<button class="btbgcolor1 btftcolor1">検索</button>\n\t\t\t<button class="btbgcolor1 btftcolor1">近くのお店</button>\n\t\t\t<button class="btbgcolor1 btftcolor1">カテゴリ</button>\n\t\t</div>\n\t\t<input type="text" id="search_input" name="account_id" placeholder="フリーワード検索" value="">\n\t</div>\n\n\t<div id="couponsRegion" class="bgcolor1 ftcolor1">\n\t\t<ol class="COUPONS">\n\t\t\t<li class="coupon-item-container bgcolor2">\n\t\t\t\t<div class="COUPON-ITEM-BOX MEMBER-ONLY">\n\t\t\t\t\t<a href="" class="cf">\n\t\t\t\t\t\t<div class="MEMBER-ONLY-MARK hlftcolor1 hlbgcolor1">会員限定クーポン</div>\n\t\t\t\t\t\t<div class="coupone-name"></div>\n\t\t\t\t\t\t<div class="valid-time">有効期限:</div>\n\t\t\t\t\t\t<div class="coupon-image">\n\t\t\t\t\t\t\t<img src="">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="coupon-image">\n\t\t\t\t\t\t\t<img src="">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ol>\n\t</div>\n\t<button class="more-button hide readMoreButton">更に読み込む</button>\n</div>\n\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\n';
}
return __p;
};

},{}],42:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="BACKBONE-PAGE">\n    <div class="coupon-card-wallet">\n        <div class="ticket-slider">\n\t\t\t<div id="couponsRegion" class="card-region ticket-card">\n\t\t\t\t<div class="empty-card">\n\t\t\t\t\t<span class="card-text">有効な定期券がありません</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="paging-region slick-slider"></div>\n        </div>\n    </div>\n    ';
 if( AppConf.features.passTicket ){ 
__p+='\n        <div id="PASS-TICKET" class="bgcolor1 touch">\n            <div class="pass-ticket-wrapper">\n                <div class="ticket-list-title">\n                    販売中の定期券\n                </div>\n                <div class="ticket-list-region">\n                    <div class="ticket-list-region">\n                    </div>\n                </div>\n            </div>\n        </div>\n    ';
 } 
__p+='\n    '+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\n</div>';
}
return __p;
};

},{}],43:[function(require,module,exports){
var Backbone = require('backbone');
var QouponLayoutView = require('./coupon_layout.js');
var QouponDetailLayoutView = require('./coupon_detail_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var CouponController = Backbone.Marionette.Controller.extend({
		showCouponIndex: function(){
			var couponLayoutView = new QouponLayoutView();
			couponLayoutView.render();
			App.pageSlider.slidePage( couponLayoutView );
			App.headerModel.applyViewHeaderConf( couponLayoutView.headerConf );
			couponLayoutView.trigger("load:sync");
		},
		showCouponDetail: function( id, query ){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			var couponDetailLayoutView = new QouponDetailLayoutView({
				id: id,
				uCoupId: queryObj.uCoupId,
				typeParam: queryObj.typeParam
			});
			couponDetailLayoutView.render();
			App.pageSlider.slidePage( couponDetailLayoutView );
			App.headerModel.applyViewHeaderConf( couponDetailLayoutView.headerConf );
			couponDetailLayoutView.trigger("load:sync");
		}
	});

	var couponController = new CouponController();

	var CouponRouter = Backbone.Marionette.AppRouter.extend({
		controller: couponController,
		appRoutes: {
			"coupon" : "showCouponIndex",
			"coupon/:id(?:query)" : "showCouponDetail",
		}
	});

	return CouponRouter;

})();

},{"./coupon_detail_layout.js":27,"./coupon_layout.js":39,"backbone":"5kFNoY","querystring":"SZ5xis"}],44:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="bg_opacity" id="showdialogue-coupon">\n\t<div class="dialogue" id="couponErr1_dialogue">\n\t\t<div class="content">\n\t\t\t<h1>店舗位置情報</h1>\n\t\t\t<p class="text">位置情報の使用に失敗しました。</p>\n\t\t\t<a class="btn close_dialogue" data-id="couponErr1_dialogue">OK</a>\n\t\t</div>\n\t</div>\n\t<div class="dialogue" id="couponErr2_dialogue">\n\t\t<div class="content">\n\t\t\t<h1>最寄の店舗</h1>\n\t\t\t<p class="text">最寄りの店舗が見つからないため、クーポンを使用できません。</p>\n\t\t\t<a class="btn close_dialogue" data-id="couponErr2_dialogue">OK</a>\n\t\t</div>\n\t</div>\n\t<div class="dialogue" id="couponErr3_dialogue">\n\t\t<div class="content">\n\t\t\t<h1 class="title">エラー</h1>\n\t\t\t<p class="text">クーポンが存在しないか、配布されていません。</p>\n\t\t\t<a class="btn close_dialogue" data-id="couponErr3_dialogue">OK</a>\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
};

},{}],45:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var CouponDialogueItemView = Backbone.Marionette.ItemView.extend({
		template: require('./coupon_dialogue_item_template.html'),
		events: {
			"click .close_dialogue": "close_dialogue"
		},
		close_dialogue: function(e){
			var _this = $(e.currentTarget);
			var data_id = _this.attr("data-id");
			$('#showdialogue-coupon').removeClass('show');
			$('#' + data_id).removeClass('show');
			switch ( data_id ){
				case "couponErr1_dialogue","couponErr2_dialogue" :
					App.doNothing();
					break;
				case "couponErr3_dialogue":
					location.hash = "coupon";
					App.pageSlider.overWriteLastHistory("");
					break;
			}
			$('.BACKBONE-PAGE').css('overflow-y', '');
		},
		showDialogue: function(element,title, msg) {
			$("#showdialogue-coupon, " + element).addClass("show");
			$("#couponErr3_dialogue .title").html(title);
			$("#couponErr3_dialogue .text").html(msg);
			// prevent scroll on IOS when show popup
			$('.BACKBONE-PAGE')[0].style.setProperty('overflow-y', 'hidden', 'important');
		}
	});

	return CouponDialogueItemView;

})();

},{"./coupon_dialogue_item_template.html":44,"backbone":"5kFNoY"}],46:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCompositeView = require('../../views/base_composite_view.js');
var HistoryItemView = require('./history_item_view.js');
module.exports = (function() {
	var HistoryCollectionView = BaseCompositeView.extend({
		childView: HistoryItemView,
		initialize: function(options) {
			this.mode = options.mode;
			this.passTicketHistoryMode = options.passTicketHistoryMode;
		},
		childViewContainer: "ol.history-list",
		template: require("./history_collection_view_template.html"),
		onRender: function() {
			this.$("." + this.mode + "-head").removeClass("hide");
			this.$("." + this.mode + "-head ." + this.passTicketHistoryMode).removeClass("hide");
		},
		buildChildView: function(child, ChildViewClass, childViewOptions) {
			// set mode for get template passticket history purchase
			if(this.mode === 'passTicket' && this.passTicketHistoryMode === 'passTicketPurchase'){
				child.set('mode', 'passTicketPurchase');
			}
			// build the final list of options for the childView class
			var options = _.extend({ model: child }, childViewOptions);
			// create the child view instance
			var view = new ChildViewClass(options);
			// return it
			return view;
		},
	});
	return HistoryCollectionView;
})();

},{"../../views/base_composite_view.js":241,"./history_collection_view_template.html":47,"./history_item_view.js":53,"backbone":"5kFNoY"}],47:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\r\n<ol>\r\n\t<li class="bgcolor4 ftcolor5 coupon-head hide">\r\n\t\t<div class="row">\r\n\t\t\t<div class="left_header col1">利用日時</div>\r\n\t\t\t<div class="mid_header bdcolor2 col2">利用クーポン名</div>\r\n\t\t\t<div class="right_header col3">利用店名</div>\r\n\t\t</div>\r\n\t</li>\r\n\t<li class="bgcolor4 ftcolor5 stamp-head hide">\r\n\t\t<div class="row">\r\n\t\t\t<div class="left_header col1">取得日時</div>\r\n\t\t\t<div class="mid_header bdcolor2 col4">取得店名</div>\r\n\t\t</div>\r\n\t</li>\r\n\t<li class="bgcolor4 ftcolor5 point-head hide">\r\n\t\t<div class="row">\r\n\t\t\t<div class="left_header col1">利用日時</div>\r\n\t\t\t<div class="mid_header bdcolor2 col2">収支</div>\r\n\t\t';
 if( AppConf.features.smart ){ 
__p+='\r\n\t\t\t<div class="right_header col3">取引種別</div>\r\n\t\t';
 } else { 
__p+='\r\n\t\t\t<div class="right_header col3">利用店名</div>\r\n\t\t';
 } 
__p+='\r\n\t\t</div>\r\n\t</li>\r\n\r\n\t<li class="passTicket-head hide">\r\n\t\t<div class="bgcolor4 ftcolor5 row ticket-history-header passTicketUse hide">\r\n\t\t\t<div class="left_header col1">日時</div>\r\n\t\t\t<div class="mid_header bdcolor2 col2">内容</div>\r\n\t\t\t<div class="right_header col3">利用店名</div>\r\n\t\t</div>\r\n\t\t<div class="bgcolor4 ftcolor5 row ticket-history-header passTicketPurchase hide">\r\n\t\t\t<div class="left_header col1">日時</div>\r\n\t\t\t<div class="mid_header bdcolor2 col4">内容</div>\r\n\t\t</div>\r\n\t</li>\r\n</ol>\r\n<ol class="history-list"></ol>\r\n';
}
return __p;
};

},{}],48:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row bgcolor1">\r\n<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate ) ))==null?'':__t)+
'<br><span class=time>'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\r\n<div class="use_coupon col2 bdcolor1">'+
((__t=( couponName ))==null?'':__t)+
'</div>\r\n<div class="use_shop col3 bdcolor1">'+
((__t=( shopName ))==null?'':__t)+
'</div>\r\n</div>\r\n\r\n';
}
return __p;
};

},{}],49:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row bgcolor1">\n\t<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( purchaseDate ) ))==null?'':__t)+
'<br><span\n\t\t\tclass=time>'+
((__t=( formatTime( purchaseDate ) ))==null?'':__t)+
'</span></div>\n\t<div class="use_coupon col4 bdcolor1">'+
((__t=( product.name ))==null?'':__t)+
'</div>\n</div>';
}
return __p;
};

},{}],50:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row bgcolor1">\n\t<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate ) ))==null?'':__t)+
'<br><span\n\t\t\tclass=time>'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\n\t<div class="use_coupon col2 bdcolor1">'+
((__t=( couponName ))==null?'':__t)+
'</div>\n\t<div class="use_shop col3 bdcolor1">'+
((__t=( shopName ))==null?'':__t)+
'</div>\n</div>';
}
return __p;
};

},{}],51:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row bgcolor1">\r\n';
 if( AppConf.features.smart ){ 
__p+='\r\n\t<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate ) ))==null?'':__t)+
'<br><span class="time">'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\r\n\t<div class="use_point col2 bdcolor1">'+
((__t=( priceOrPointSign( price, pointType ) ))==null?'':__t)+
''+
((__t=( priceOrPoint( price, point ) ))==null?'':__t)+
''+
((__t=( priceOrPointDelimiter( price ) ))==null?'':__t)+
'</div>\r\n\t<div class="use_shop col3 bdcolor1">'+
((__t=( getReqClassValue( reqClass )))==null?'':__t)+
'</div>\r\n';
 } else { 
__p+='\r\n\t<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate ) ))==null?'':__t)+
'<br><span class="time">'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\r\n\t<div class="use_point col2 bdcolor1">'+
((__t=( pointTypeSign( pointType ) ))==null?'':__t)+
''+
((__t=( point ))==null?'':__t)+
'</div>\r\n\t<div class="use_shop col3 bdcolor1">'+
((__t=( shopName ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n</div>\r\n';
}
return __p;
};

},{}],52:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row bgcolor1">\r\n\t<div class="use_time col1 bdcolor1">'+
((__t=( formatDate( procDate )))==null?'':__t)+
'<br><span class="time">'+
((__t=( formatTime( procDate ) ))==null?'':__t)+
'</span></div>\r\n\t<div class="use_shop col4 bdcolor1">'+
((__t=( shopName ))==null?'':__t)+
'</div>\r\n</div>\r\n\r\n';
}
return __p;
};

},{}],53:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var HistoryItemView = Backbone.Marionette.ItemView.extend({
		tagName: 'li',
		template: function(modelSerializedData){
			if( modelSerializedData.isCouponHistory ){ return require('./history_item_coupon_template.html')(modelSerializedData); }
			if( modelSerializedData.isStampHistory ){ return require('./history_item_stamp_template.html')(modelSerializedData); }
			if (modelSerializedData.isPointHistory) { return require('./history_item_point_template.html')(modelSerializedData); }
			if (modelSerializedData.isPassTicketUseHistory) { return require('./history_item_pass_ticket_use_template.html')(modelSerializedData); }
			// get template for passticket history purchase, because is not the same data with above
			if (modelSerializedData.mode === 'passTicketPurchase') { return require('./history_item_pass_ticket_purchase_template.html')(modelSerializedData); }
		},
		templateHelpers: {
			formatDate: function(dateTime){
				return moment(dateTime).format('YYYY/MM/DD');
			},
			formatTime: function(dateTime){
				return moment(dateTime).format('H:mm');
			},
			formatDatePurchase: function(dateTime){
				return moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD');
			},
			formatTimePurchase: function(dateTime){
				return moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('H:mm');
			},
			pointTypeSign: function( pointType ){
				return {
					0: "+",
					1: "-",
				}[pointType];
			},
			priceOrPoint: function(price, point){
				if (price == 0) {
					if (point < 0) {
						point = point * -1;
					}
					return point;
				} else {
					// price
					if (price < 0) {
						price = price * -1;
					}
					return price;
				}
			},
			getReqClassValue: function(reqClass){
				reqClassValue = AppConf.valuecard.reqClassValues[reqClass];
				if (reqClassValue == null) {
					reqClassValue = reqClass;
				}
				return reqClassValue;
			},
			priceOrPointSign: function(price, pointType){
				return "";
			},
			priceOrPointDelimiter: function(price){
				if (price == 0) {
					return "Ｐ";
				} else {
					return "円";
				}
			},
		},
	});
	return HistoryItemView;
})();

},{"./history_item_coupon_template.html":48,"./history_item_pass_ticket_purchase_template.html":49,"./history_item_pass_ticket_use_template.html":50,"./history_item_point_template.html":51,"./history_item_stamp_template.html":52,"backbone":"5kFNoY","moment":"iROhDJ"}],54:[function(require,module,exports){
var Backbone = require('backbone');
var HistoryCollection = require('../../models/history_collection.js');
var HistoryCollectionView = require('./history_collection_view.js');
var PaymentPurchaseHistoryCollection = require('../../models/payment_purchase_history_collection.js');
module.exports = (function() {

	var HistoryMode = {
		coupon: "coupon",
		stamp: "stamp",
		point: "point",
		passTicket: 'passTicket'
	};
	var PassTicketHistoryMode = {
		passTicketUse: 'passTicketUse',
		passTicketPurchase: 'passTicketPurchase',
	}

	var HistoryListLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./history_list_layout_template.html'),
		regions: {
			"historyListRegion": "#history-list-region",
			"pointHistoryRegion": "#point-history-region",
			"couponHistoryRegion": "#coupon-history-region",
			"stampHistoryRegion": "#stamp-history-region",
			"passTicketHistoryRegion": "#passTicket-history-region",
		},
		ui: {
			"modeSwitchBtn": ".mode-switch-btn",
			"ticketHistorySwitchBtn": ".button-group-item",
		},
		events: function() {
			var iosEvent = {
				"touchend @ui.ticketHistorySwitchBtn": "switchTicketHistory",
				"touchend @ui.modeSwitchBtn": "_onModeSwitchBtnClick",
			};
			var androidEvent = {
				"click @ui.ticketHistorySwitchBtn": "switchTicketHistory",
				"click @ui.modeSwitchBtn": "_onModeSwitchBtnClick",
			};
			return (applican.config.device_os === "IOS") ? iosEvent : androidEvent;
		},
		initialize: function(options) {
			this.mode = HistoryMode.coupon;
			this.passTicketHistoryMode = PassTicketHistoryMode.passTicketUse;
			if (options.type) {
				this.mode = options.type;
			}

			if( AppConf.features.wallet ){
				$('head').append('<link id="swiper-style" rel="stylesheet" type="text/css" href="css/swiper.css"></link>');
				$('head').append('<script id="swiper-js" type="text/javascript" charset="utf-8" src="js/swiper.jquery.min.js"></script>');
			}

			this.listenTo(this, 'collections:sync', this._renderHistoryList);
			this.listenTo(this, "load:sync", this.onLoad);
		},
		onRender: function() {
			this._fetchAll();
		},
		onLoad: function() {
			var _this = this;
			App.util.style.toActive($('[data-mode="' + this.mode + '"].mode-switch-btn'));
			$('.' + this.mode + 'BtnMode').removeClass('hide');// show passTicketBtnMode if mode is passTicket

			if( AppConf.features.wallet ){				
				var viewHeight = $("#master-container").height() - $(".btn_area").outerHeight() - 5 - $(".app-footer").outerHeight();
				$(".tab-pane").css('height', viewHeight);

				this.swiper = new Swiper('.tab-content', {
					effect: 'slide',
					setWrapperSize: true,
					spaceBetween: 0,
					initialSlide: $('[data-mode="' + this.mode + '"].mode-switch-btn').index(),
					on: {
						slideChange: function () {
							var el = $(".mode-switch-btn").eq(this.activeIndex);
							var mode = el.data('mode');
							_this.mode = mode;
							App.util.style.toInactive(_this.ui.modeSwitchBtn);
							App.util.style.toActive(el);
							_this._fetchAll();
						},
					},
				});
			}
		},
		_onModeSwitchBtnClick: function(e) {
			e.preventDefault();
			var $target = this.$(e.currentTarget);
			var mode = $target.data('mode');
			this.mode = mode;
			App.util.style.toInactive(this.ui.modeSwitchBtn);
			App.util.style.toActive($target);
			if( AppConf.features.wallet ){
				this.swiper.slideTo($(e.currentTarget).index(), 0);
			} else {
				$('.passTicketBtnMode').addClass('hide');// hide passTicketBtnMode
				$('.' + this.mode + 'BtnMode').removeClass('hide');// show passTicketBtnMode if mode is passTicket
			}
			this._fetchAll();
		},
		_fetchAll: function(mode) {
			if( AppConf.features.wallet ){
				switch (this.mode) {
					case HistoryMode.coupon:
							this.historyCouponCollection = new HistoryCollection();
							App.util.bindProgressScreen(this, this.historyCouponCollection);
							this.couponHistoryRegion.show(new HistoryCollectionView({
								collection: this.historyCouponCollection ,
								mode: this.mode,
								passTicketHistoryMode: this.passTicketHistoryMode
							}));
							this.historyCouponCollection.fetchCouponHistory();
						break;
					case HistoryMode.stamp:
							this.historyStampCollection = new HistoryCollection();
							App.util.bindProgressScreen(this, this.historyStampCollection);
							this.stampHistoryRegion.show(new HistoryCollectionView({
								collection: this.historyStampCollection ,
								mode: this.mode,
								passTicketHistoryMode: this.passTicketHistoryMode
							}));
							this.historyStampCollection.fetchStampHistory();
						break;
					case HistoryMode.point:
							this.historyPointCollection = new HistoryCollection();
							App.util.bindProgressScreen(this, this.historyPointCollection);
							this.pointHistoryRegion.show(new HistoryCollectionView({
								collection: this.historyPointCollection ,
								mode: this.mode,
								passTicketHistoryMode: this.passTicketHistoryMode
							}));
							this.historyPointCollection.fetchPointHistory();
						break;
					case HistoryMode.passTicket:
						switch (this.passTicketHistoryMode) {
							case PassTicketHistoryMode.passTicketUse: {
								this.historyPassTicketUseCollection = new HistoryCollection();
								App.util.bindProgressScreen(this, this.historyPassTicketUseCollection);
								this.passTicketHistoryRegion.show(new HistoryCollectionView({
									collection: this.historyPassTicketUseCollection ,
									mode: this.mode,
									passTicketHistoryMode: this.passTicketHistoryMode
								}));
								this.historyPassTicketUseCollection.fetchPassTicketUseHistory();
								break;
							}
							case PassTicketHistoryMode.passTicketPurchase: {
								this.historyPassTicketUseCollection = new PaymentPurchaseHistoryCollection();
								App.util.bindProgressScreen(this, this.historyPassTicketUseCollection);
								this.passTicketHistoryRegion.show(new HistoryCollectionView({
									collection: this.historyPassTicketUseCollection ,
									mode: this.mode,
									passTicketHistoryMode: this.passTicketHistoryMode
								}));
								this.historyPassTicketUseCollection.fetchPaymentPurchaseHistory();
								break;
							}
						}
						break;
				}
			} else {
				var fetchHistory;
				this.historyCollection = new HistoryCollection();
				switch (this.mode) {
					case HistoryMode.coupon:
						fetchHistory = _.bind(this.historyCollection.fetchCouponHistory, this.historyCollection);
						break;
					case HistoryMode.stamp:
						fetchHistory = _.bind(this.historyCollection.fetchStampHistory, this.historyCollection);
						break;
					case HistoryMode.point:
						fetchHistory = _.bind(this.historyCollection.fetchPointHistory, this.historyCollection);
						break;
					case HistoryMode.passTicket:
						switch (this.passTicketHistoryMode) {
							case PassTicketHistoryMode.passTicketUse: {
								fetchHistory = _.bind(this.historyCollection.fetchPassTicketUseHistory, this.historyCollection);
								break;
							}
							case PassTicketHistoryMode.passTicketPurchase: {
								this.historyCollection = new PaymentPurchaseHistoryCollection();
								fetchHistory = _.bind(this.historyCollection.fetchPaymentPurchaseHistory, this.historyCollection);
								break;
							}
						}
						break;
				}
				var _this = this;
				var requestAction = function() {
					return $.when(fetchHistory()).done(function() {
						_this.trigger('collections:sync');
					});
				};
				App.util.execWithProgressScreen(requestAction);
			}
		},
		headerConf: {
			title: "利用履歴",
			showBackButton: true,
		},
		_renderHistoryList: function() {
			this.historyListRegion.show(new HistoryCollectionView({
				collection: this.historyCollection,
				mode: this.mode,
				passTicketHistoryMode: this.passTicketHistoryMode
			}));
		},
		switchTicketHistory: function(e) {
			var $target = this.$(e.currentTarget);
			var mode = $target.attr('data-mode');
			this.passTicketHistoryMode = mode;
			this._fetchAll();
			App.util.style.toInactive(this.ui.ticketHistorySwitchBtn);
			App.util.style.toActive($target);
		},
		onDestroy: function(){
			$("#swiper-style, #swiper-js").remove();
		}
	});

	return HistoryListLayout;
})();

},{"../../models/history_collection.js":213,"../../models/payment_purchase_history_collection.js":217,"./history_collection_view.js":46,"./history_list_layout_template.html":55,"backbone":"5kFNoY"}],55:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="HISTORY-LIST" class="BACKBONE-PAGE ';
 if( AppConf.features.wallet ){ 
__p+='wallet-template';
 } 
__p+='">\r\n\t<div class="btn_area serchbgcolor1 col-'+
((__t=( App.util.common.countActiveFeature()))==null?'':_.escape(__t))+
'">\r\n\t\t';
 if( AppConf.features.point || AppConf.features.smart ){ 
__p+='\r\n\t\t<button type="button" data-mode="point" class="mode-switch-btn">ポイント</button>\r\n\t\t';
 } 
__p+='\r\n\t\t';
 if( AppConf.features.coupon ){ 
__p+='\r\n\t\t<button type="button" data-mode="coupon" class="mode-switch-btn">クーポン</button>\r\n\t\t';
 } 
__p+='\r\n\t\t';
 if( AppConf.features.stamp ){ 
__p+='\r\n\t\t<button type="button" data-mode="stamp" class="mode-switch-btn">スタンプ</button>\r\n\t\t';
 } 
__p+='\r\n\t\t';
 if( AppConf.features.passTicket ){ 
__p+='\r\n\t\t<button type="button" data-mode="passTicket" class="mode-switch-btn">定期券</button>\r\n\t\t';
 } 
__p+='\r\n\t\t';
 if( AppConf.features.ticket ){ 
__p+='\r\n\t\t<button type="button" data-mode="ticket" class="mode-switch-btn">チケット</button>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n\t';
 if( AppConf.features.wallet ){ 
__p+='\r\n\t\t<div class="tab-content">\r\n\t\t\t<div class="swiper-wrapper">\r\n\t\t\t\t';
 if( AppConf.features.point || AppConf.features.smart ){ 
__p+='\r\n\t\t\t\t<div data-mode="point" class="tab-pane swiper-slide">\r\n\t\t\t\t\t<div id="point-history-region"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 } 
__p+='\r\n\t\t\t\t';
 if( AppConf.features.coupon ){ 
__p+='\r\n\t\t\t\t<div data-mode="coupon" class="tab-pane swiper-slide">\r\n\t\t\t\t\t<div id="coupon-history-region"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 } 
__p+='\r\n\t\t\t\t';
 if( AppConf.features.stamp ){ 
__p+='\r\n\t\t\t\t<div data-mode="stamp" class="tab-pane swiper-slide">\r\n\t\t\t\t\t<div id="stamp-history-region"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 } 
__p+='\r\n\t\t\t\t';
 if( AppConf.features.passTicket ){ 
__p+='\r\n\t\t\t\t<div data-mode="passTicket" class="tab-pane swiper-slide">\r\n\t\t\t\t\t<div class="button-group passTicketBtnMode btbdcolor1">\r\n\t\t\t\t\t\t<div type="button" data-mode="passTicketUse" class="button-group-item active">利用履歴</div>\r\n\t\t\t\t\t\t<div type="button" data-mode="passTicketPurchase" class="button-group-item">購入履歴</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div id="passTicket-history-region"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 } 
__p+='\r\n\t\t\t\t';
 if( AppConf.features.ticket ){ 
__p+='\r\n\t\t\t\t<div data-mode="ticket" class="tab-pane swiper-slide">\r\n\t\t\t\t\t<div id="ticket-history-region"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 } 
__p+='\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t';
 } else {
__p+='\r\n\t\t<div class="button-group passTicketBtnMode btbdcolor1 hide">\r\n\t\t\t<div type="button" data-mode="passTicketUse" class="button-group-item active">利用履歴</div>\r\n\t\t\t<div type="button" data-mode="passTicketPurchase" class="button-group-item">購入履歴</div>\r\n\t\t</div>\r\n\t\t<div id="history-list-region"></div>\r\n\t';
 } 
__p+='\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'';
}
return __p;
};

},{}],56:[function(require,module,exports){
var Backbone = require('backbone');
var HistoryListLayout = require("./history_list_layout.js");
var querystring = require('querystring');
module.exports = (function () {

	var HistoryController = Backbone.Marionette.Controller.extend({
		showHistoryList: function(query) {
			var _query = query || {};
			var queryObj = querystring.parse(_query);
			var historyLayout = new HistoryListLayout({
				type: queryObj.type
			});
			historyLayout.render();
			App.pageSlider.slidePage( historyLayout );
			App.headerModel.applyViewHeaderConf(historyLayout.headerConf);
			historyLayout.trigger("load:sync");
		},
	});

	var historyController = new HistoryController();

	var HistoryRouter = Backbone.Marionette.AppRouter.extend({
		controller: historyController,
		appRoutes: {
			"history(?:query)" : "showHistoryList",
		}
	});

	return HistoryRouter;

})();

},{"./history_list_layout.js":54,"backbone":"5kFNoY","querystring":"SZ5xis"}],57:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollectionView = require('../../views/base_collection_view.js');
var InformationItemView = require('./information_item_view.js');
module.exports = (function () {
	var InformationCollectionView = BaseCollectionView.extend({
		childView: InformationItemView,
		tagName: 'ol',
		className: 'INFORMATION-LIST',
	});

	return InformationCollectionView;
})();

},{"../../views/base_collection_view.js":240,"./information_item_view.js":65,"backbone":"5kFNoY"}],58:[function(require,module,exports){
var Backbone = require('backbone');
var InformationModel = require('../../models/information_model.js');
var InformationDetailMainView = require('./information_detail_main_view.js');
module.exports = (function () {
	var InformationDetailLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./information_detail_layout_template.html'),
		regions: {
			"informationMainRegion" : "#information-main-region"
		},
		ui: {
            "cancelBtn": ".close-button",
        },
		events:{
			"click @ui.cancelBtn": function() {
				App.pageSlider.back();
			},
		},
		initialize: function(options){
			if(App.util.storage.getStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken()) === undefined) {
				App.btApi.popInformation({
					informationId: options.informationId,
					registrationId: App.appModel.getPushToken(),
				})
				.done(function(res){
					App.util.storage.setStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken(), res, AppConf.expire.information.pop);
				})
				.fail(function(err){
					if(err.status === 403){
						App.util.storage.setStorage("information_pop_" + options.informationId + "_" + App.appModel.getPushToken(), err, AppConf.expire.information.pop);
					}
				});
			}
			this.informationModel = new InformationModel( { informationId: options.informationId });
			this.listenTo( this.informationModel, 'sync', this._renderInformation );
			App.util.bindProgressScreen(this, this.informationModel);
		},
		headerConf: {
			title: "お知らせ詳細",
			showBackButton: true,
			hideHeader: AppConf.UI.information.detail.version == "v2" ? true : false
		},
		onRender: function(){
			this._fetchInformation();
			this._readInformation();
			if (AppConf.UI.information.detail.version == "v2") {
                this.$el.css({ 'margin-top': '-44px', 'height': $(window).height()});
            }
		},
		_renderInformation: function(){
			this.informationMainRegion.show( new InformationDetailMainView({
				model: this.informationModel
			}));
		},
		_readInformation: function(){
			var informationId = this.informationModel.get("informationId");
			if(App.util.storage.getStorage("information_read_" + informationId + "_" + App.appModel.getPushToken()) === undefined) {
				App.btApi.readInformation({
					informationId: informationId,
					registrationId: App.appModel.getPushToken(),
				})
				.done(function(res){
					App.util.badge.setBadgeAppIcon( res.unReadCounts );
					App.util.storage.setStorage("information_read_" + informationId + "_" + App.appModel.getPushToken(), res, AppConf.expire.information.read);
					App.util.badge.showBadge();
				})
				.fail(function(err){
					if(err.status === 403){
						App.util.storage.setStorage("information_read_" + informationId + "_" + App.appModel.getPushToken(), err, AppConf.expire.information.read);
						App.util.badge.showBadge();
					}
				});
			}
		},
		_fetchInformation: function(){
			var _this = this;
			var requestAction = function(){
				if( App.getAuthInfo().token ){
					return _this.informationModel.fetchSingleInformation();
				}else{
					return _this.informationModel.fetchSingleInformationWithoutToken( App.appModel.get("pushToken") );
				}
			};
			App.util.execWithProgressScreen( requestAction );
		}
	});

	return InformationDetailLayout;

})();

},{"../../models/information_model.js":215,"./information_detail_layout_template.html":59,"./information_detail_main_view.js":62,"backbone":"5kFNoY"}],59:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="INFORMATION-DETAIL" class="BACKBONE-PAGE ';
 if( AppConf.UI.information.detail.version == "v2"){ 
__p+='v2';
 }else{ 
__p+='v1';
 } 
__p+='">\r\n    <div class="close-button">\r\n\t\t<img class="cancel-icon" src="./image/common/cancel.png">\r\n\t</div>\r\n    <div id="information-main-region" class="bgcolor1"></div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],60:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="info_date ftcolor1">'+
((__t=( formatDate( openDate ) ))==null?'':__t)+
'</div>\r\n<div class="info_title ftcolor1 bdcolor1">'+
((__t=( title ))==null?'':__t)+
'</div>\r\n\r\n';
 if(extras.contentHeader){ 
__p+='\r\n<div class="info_words">'+
((__t=( App.util.text.nl2br( extras.contentHeader ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
 if(imageUrl){ 
__p+='\r\n<img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" alt="店舗">\r\n';
 } 
__p+='\r\n';
 if(extras.contentFooter){ 
__p+='\r\n<div class="info_words">'+
((__t=( App.util.text.nl2br( extras.contentFooter ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
}
return __p;
};

},{}],61:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="info_date ftcolor1">'+
((__t=( formatDate( openDate ) ))==null?'':__t)+
'</div>\n<div class="info_title ftcolor1 bdcolor1">'+
((__t=( title ))==null?'':__t)+
'</div>\n';
 if(imageUrl){ 
__p+='\n<img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" alt="店舗">\n';
 } 
__p+='\n';
 if(extras.contentHeader){ 
__p+='\n<div class="info_words">'+
((__t=( App.util.text.nl2br( extras.contentHeader ) ))==null?'':__t)+
'</div>\n';
 } 
__p+='\n';
 if(extras.contentFooter){ 
__p+='\n<div class="info_words">'+
((__t=( App.util.text.nl2br( extras.contentFooter ) ))==null?'':__t)+
'</div>\n';
 } 
__p+='\n';
}
return __p;
};

},{}],62:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var InformationDetailMainView = Backbone.Marionette.ItemView.extend({
		template: AppConf.UI.information.detail.version == 'v1' ? require('./information_detail_main_template.html') : require('./information_detail_main_template.v2.html'),
		templateHelpers: {
			formatDate: function(date){
				return date.split("-").join("/");
			}
		},
	});
	return InformationDetailMainView;
})();

},{"./information_detail_main_template.html":60,"./information_detail_main_template.v2.html":61,"backbone":"5kFNoY"}],63:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="INFORMATION-ITEM-BOX">\r\n\t<a href="#information/'+
((__t=( id ))==null?'':__t)+
'" class="cf">\r\n\t\t<div class="row cf">\r\n\t\t\t<div class="box_images">\r\n        ';
 if(imageUrl){ 
__p+='\r\n  \t\t\t <img src="'+
((__t=( imageUrl ))==null?'':__t)+
'">\r\n        ';
 }else{ 
__p+='\r\n  \t\t\t <img src="./image/common/noImage.png">\r\n        ';
 } 
__p+='\r\n      </div> <!-- box_images -->\r\n\t\t\t<div class="coupon_info">\r\n\t\t\t\t<div class="info_date ftcolor1">\r\n\t\t\t\t\t'+
((__t=( formatDate( openDate ) ))==null?'':__t)+
'\r\n\t\t\t\t\t';
 if( !isRead( readFlg, id) ){ 
__p+='\r\n\t\t\t\t\t\t<span class="NEWEST-MARK hlftcolor1 hlbgcolor1">NEW</span>\r\n\t\t\t\t\t';
 } 
__p+='\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="coupon_name">'+
((__t=( title ))==null?'':__t)+
'</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</a>\r\n</div>\r\n';
}
return __p;
};

},{}],64:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="#information/'+
((__t=( id ))==null?'':__t)+
'" class="information-item-wrapper">\n\t<div class="info_date ftcolor1">\n\t\t<div class="info-date-col"><span class="date">'+
((__t=( formatDate( openDate ) ))==null?'':__t)+
'</span></div>\n\t\t';
 if( !isRead( readFlg, id) ){ 
__p+='\n\t\t<div class="info-date-col"><span class="newest-mark">NEW</span></div>\n\t\t';
 } 
__p+='\n\t</div>\n\t<div class="infor-title">\n\t\t'+
((__t=( title ))==null?'':__t)+
'\n\t</div>\n\t<div class="info-image">\n\t\t';
 if(imageUrl){ 
__p+='\n\t\t<img src="'+
((__t=( imageUrl ))==null?'':__t)+
'">\n\t\t';
 } 
__p+='\n\t</div>\n\t<div class="info-button-block">\n\t\t<div class="infor-button-detail btbgcolor1 btftcolor1">\n\t\t\t詳細を見る\n\t\t</div>\n\t</div>\n</a>';
}
return __p;
};

},{}],65:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var InformationItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: 'information-item-container bgcolor2',
		template: AppConf.UI.version == 'v1' ? require('./information_item_template.html') : require('./information_item_template.v2.html'),
		templateHelpers: {
			formatDate: function(date){
				return date.split("-").join("/");
			},
			isRead: function(readFlag, id){
				return readFlag + "" === "1" || !!App.util.storage.getStorage("information_read_" + id + "_" + App.appModel.getPushToken()); 
			}
		}
	});
	return InformationItemView;
})();

},{"./information_item_template.html":63,"./information_item_template.v2.html":64,"backbone":"5kFNoY"}],66:[function(require,module,exports){
var Backbone = require('backbone');
var InformationCollection = require('../../models/information_collection.js');
var InformationCollectionView = require('./information_collection_view.js');
module.exports = (function () {
	var InformationListLayout = Backbone.Marionette.LayoutView.extend({
		template: AppConf.UI.version == 'v1' ? require('./information_list_layout_template.html') : require('./information_list_layout_template.v2.html') ,
		regions: {
			"informationListRegion" : "#information-list-region"
		},

		// TODO : behaviorに移せるのならば移す
		ui:{
			"moreButton": ".more-button",
			"informationListLayout": "#INFORMATION-LIST",
		},
		events: {
			"click @ui.moreButton": "getMore",
		},
		initialize: function(){
			this.informationCollection = new InformationCollection();
			this.listenTo( this.informationCollection, 'paging', this._renderPageNation );
			App.util.bindProgressScreen(this, this.informationCollection);
		},
		headerConf: {
			title: "お知らせ一覧",
			showBackButton: true,
		},
		onRender: function(){
			this.informationListRegion.show( new InformationCollectionView({
				collection: this.informationCollection
			}));
			if( App.getAuthInfo().token ){
				this.informationCollection.fetchWithAuthInfo();
			}else{
				this.informationCollection.fetchWithoutLogin( App.appModel.getPushToken() );
			};
		},
		_renderPageNation: function(){
			if( this.informationCollection.isAtLastPage() ){
				this.ui.moreButton.addClass("hide");
			}else{
				this.ui.moreButton.removeClass("hide");
			}
		},
		getMore: function(){
			this.informationCollection.getMore();
		},
	});

	return InformationListLayout;

})();

},{"../../models/information_collection.js":214,"./information_collection_view.js":57,"./information_list_layout_template.html":67,"./information_list_layout_template.v2.html":68,"backbone":"5kFNoY"}],67:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="INFORMATION-LIST" class="BACKBONE-PAGE bgcolor1 v1">\r\n\t<div id="information-list-region" class="ftcolor1">\r\n\t\t<ol class="INFORMATION-LIST">\r\n\t\t\t<li class="bdcolor1">\r\n\t\t\t\t<div class="INFORMATION-ITEM-BOX">\r\n\t\t\t\t\t<a href="" class="cf">\r\n\t\t\t\t\t\t\t<div class="box_images"><img src=""></div> <!-- box_images -->\r\n\t\t\t\t\t\t\t<div class="coupon_info">\r\n\t\t\t\t\t\t\t\t<div class="info_date ftcolor1">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;<span class="NEWEST-MARK hlftcolor1 hlbgcolor1 hide_this">NEW</span></div>\r\n\t\t\t\t\t\t\t\t<div class=""></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t\t<li class="bdcolor1">\r\n\t\t\t\t<div class="INFORMATION-ITEM-BOX">\r\n\t\t\t\t\t<a href="" class="cf">\r\n\t\t\t\t\t\t\t<div class="box_images"><img src=""></div> <!-- box_images -->\r\n\t\t\t\t\t\t\t<div class="coupon_info">\r\n\t\t\t\t\t\t\t\t<div class="info_date ftcolor1">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;<span class="NEWEST-MARK hlftcolor1 hlbgcolor1 hide_this">NEW</span></div>\r\n\t\t\t\t\t\t\t\t<div class=""></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t\t<li class="bdcolor1">\r\n\t\t\t\t<div class="INFORMATION-ITEM-BOX">\r\n\t\t\t\t\t<a href="" class="cf">\r\n\t\t\t\t\t\t\t<div class="box_images"><img src=""></div> <!-- box_images -->\r\n\t\t\t\t\t\t\t<div class="coupon_info">\r\n\t\t\t\t\t\t\t\t<div class="info_date ftcolor1">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;<span class="NEWEST-MARK hlftcolor1 hlbgcolor1 hide_this">NEW</span></div>\r\n\t\t\t\t\t\t\t\t<div class=""></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t</ol>\r\n\t</div>\r\n\t<button class="more-button hide readMoreButton">更に読み込む</button>\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],68:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="INFORMATION-LIST" class="BACKBONE-PAGE bgcolor1 v2">\n\t<div id="information-list-region" class="ftcolor1">\n\t\t<ol class="INFORMATION-LIST">\n\t\t\t<li class="information-item-container bgcolor1">\n\t\t\t\t<a href="#" class="information-item-wrapper">\n\t\t\t\t\t<div class="info_date ftcolor1">\n\t\t\t\t\t\t<div class="info-date-col"><span class="date">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;</span></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="infor-title">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="info-image">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="info-button-block">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t\t<li class="information-item-container bgcolor1">\n\t\t\t\t<a href="#" class="information-item-wrapper">\n\t\t\t\t\t<div class="info_date ftcolor1">\n\t\t\t\t\t\t<div class="info-date-col"><span class="date">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;</span></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="infor-title">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="info-image">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="info-button-block">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t\t<li class="information-item-container bgcolor1">\n\t\t\t\t<a href="#" class="information-item-wrapper">\n\t\t\t\t\t<div class="info_date ftcolor1">\n\t\t\t\t\t\t<div class="info-date-col"><span class="date">&ndash;&ndash;&ndash;&ndash;/&ndash;&ndash;/&ndash;&ndash;</span></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="infor-title">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="info-image">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="info-button-block">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</li>\n\t\t</ol>\n\t</div>\n\t<button class="more-button hide readMoreButton">更に読み込む</button>\n\n</div>\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\n';
}
return __p;
};

},{}],69:[function(require,module,exports){
var Backbone = require('backbone');
var InformationListLayout = require("./information_list_layout.js");
var InformationDetailLayout = require("./information_detail_layout.js");
module.exports = (function () {

	var InformationController = Backbone.Marionette.Controller.extend({
		showInformationList: function(){
			var informationLayout = new InformationListLayout();
			informationLayout.render();
			App.pageSlider.slidePage( informationLayout );
			App.headerModel.applyViewHeaderConf( informationLayout.headerConf );
			informationLayout.trigger("load:sync");
		},
		showInformationDetail: function( id ){
			var informationDetailLayout = new InformationDetailLayout({ informationId: id });
			informationDetailLayout.render();
			App.pageSlider.slidePage( informationDetailLayout );
			App.headerModel.applyViewHeaderConf( informationDetailLayout.headerConf );
		},
	});

	var informationController = new InformationController();

	var InformationRouter = Backbone.Marionette.AppRouter.extend({
		controller: informationController,
		appRoutes: {
			"information" : "showInformationList",
			"information/:id" : "showInformationDetail",
		}
	});

	return InformationRouter;

})();

},{"./information_detail_layout.js":58,"./information_list_layout.js":66,"backbone":"5kFNoY"}],70:[function(require,module,exports){
var Backbone = require('backbone');
var InfosoundTopLayoutView = require('./infosound_top_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var InfosoundController = Backbone.Marionette.Controller.extend({
		showInfosoundTop: function(point){
			var infosoundTopLayoutView = new InfosoundTopLayoutView({ point: point });
			infosoundTopLayoutView.render();
			App.pageSlider.slidePage( infosoundTopLayoutView );
			App.headerModel.applyViewHeaderConf( infosoundTopLayoutView.headerConf );
		}
	});

	var infosoundController = new InfosoundController();

	var InfosoundRouter = Backbone.Marionette.AppRouter.extend({
		controller: infosoundController,
		appRoutes: {
			"infosound" : "showInfosoundTop",
			"infosound/:point" : "showInfosoundTop",
		}
	});

	return InfosoundRouter;

})();

},{"./infosound_top_layout.js":71,"backbone":"5kFNoY","querystring":"SZ5xis"}],71:[function(require,module,exports){
var Backbone = require('backbone');
var PointModel = require('../../models/point_model.js');
var CouponCollection = require('../../models/coupon_collection.js');
var CouponMasterCollection = require('../../models/coupon_master_collection.js');
var AvailableCouponCollectionView = require('../point/available_coupon_collection_view.js');
var ModalAlertView = require('../../modals/alert/modal_alert_view.js');
module.exports = (function () {

	var InfosoundTopLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./infosound_top_layout_template.html'),
		regions: {
			'infosoundCardRegion': '#infosoundCardRegion',
			'infosoundInteractionRegion': '#infosound-interaction',
			'dialogueCommonRegion': '#dialogue_common_region',
			'availableCouponRegion': '#available-coupon-region',
		},
		ui: {
			"infosoundBtnDiv": "#infosound-btn-div",
			"getInfosoundButton": "#get-infosound-btn",
			"pointValue": ".point-text",
			"curtime": "#curtime",
			"getStampButton": "#get-stamp-btn",
			"readTermsBtn": ".read-terms",
		},
		events: {
			"click @ui.getInfosoundButton": "_getInfosound",
			// "click #cancelStamp": "closePopup",
			// "click #openScanQRCode": "openScanQRCode",
			"click @ui.readTermsBtn" : "showDialogue",
		},
		headerConf: {
			title: AppConf.features.wallet ? "ウォレット" : "来店ポイント獲得",
			showBackButton: true,
			showWalletMenu: AppConf.features.wallet ? true : false,
			customeBackAction: function(){
				App.pageSlider.home();
			}
		},
		initialize: function(options) {
			this.goToPoint = options.point;
			this.modalAlertView = new ModalAlertView();
						
			this.pointModel = new PointModel();
			App.util.bindProgressScreen(this, this.pointModel);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);

			this.couponCollection = new CouponCollection();
			this.couponMasterCollection = new CouponMasterCollection();
			App.util.bindProgressScreen(this, this.couponMasterCollection );
			this.listenTo(this.couponMasterCollection, 'sync', this._renderCoupons);

			this.modalAlertView = new ModalAlertView();
		},
		onRender: function() {
			if(AppConf.features.wallet){
				this.couponMasterCollection.fetchPointExchangeable();
				this.pointModel.fetchWithAuthInfo();				
			}
		},
		showDialogue: function() {
			var _this = this;
			this.modalAlertView.show({ 
				title: '', 
				text: '<img width="20px" src="./image/common/check.svg">  利用条件<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>',
				class: 'dialogue-content'
			});
		},
		renderAfterUse: function(e) {
			this.$(".action-area").addClass("disable");
			this.pointModel.fetchWithAuthInfo();
		},
		_getInfosound: function(e) {
			var _this = this;
			
			// infosound情報を取得
			App.util.execWithProgressScreen(function() {
				return _this._getPositionAndInfosound();
			}).done(function(data) {
				_this.renderAfterUse();
				_this.couponCollection.clearCache();
			}).fail(function(err) {
				_this.renderAfterUse();
				_this.modalAlertView.show({
					title: "来店ポイントの獲得に失敗しました",
					text: err

				});
				App.applican.stopInfosoundPromiss();
			});
		},
		// 位置情報とinfosoundを取得
		_getPositionAndInfosound: function() {
			var isPositionOK = false;
			var isInfosoundOK = false;
			var dfd = $.Deferred();
			var posData;
			var startms = +new Date;

			var interId = setInterval(function() {
				var pastSec = (+new Date - startms) / 1000;
				console.log('setInterval: fail ' + pastSec + 'ms');
				clearInterval(interId);

				// ------------------------追加
				App.applican.stopInfosoundPromiss();

				var isPositionOK = false;
				var isInfosoundOK = false;
				//				var dfd = $.Deferred();
				var posData;

				var interId2 = setInterval(function() {
					var pastSec = (+new Date - startms) / 1000;
					console.log('retry_setInterval: fail ' + pastSec + 'ms');
					clearInterval(interId2);
					dfd.reject("来店ポイントの獲得に失敗しました。\n来店ポイント獲得スポットに近付くか、アプリのマイク設定をONにして再度お試しください。");
				}, AppConf.infosounds.timeout);

				App.applican.startInfosoundPromiss().done(function(result) {
					var pastSec = (+new Date - startms) / 1000;
					console.log('retry_startInfosoundPromiss: done ' + pastSec + 'ms');

					clearInterval(interId2);
					isInfosoundOK = true;

					var location = {
						longitude: 0.0,
						latitude: 0.0
					};
					//					console.log('result: ' + result);

					// 対象のinfosound端末IDを置換
					console.log("result before:" + result);

					var code = '';
					var regex = /^([0-9]+)-/;

					// noserver対応
					var onkyouId = "";
					if (!result.match(regex)) {
						console.log('result not match: ' + result);
						onkyouId = result;
						result = AppConf.infosounds.oid[result.toUpperCase()];
					}
					console.log('result: ' + result);
					
					if (_.isNull(result) || _.isEmpty(result)) {
						console.log('result not_found: ' + result);
						dfd.reject("最寄りの店舗が見つからないため、ポイントを取得できません。\nエラーコード：" + onkyouId);
						return;
					}
					
					var matches = result.match(regex);
					var find = false;
					if (!_.isNull(matches)) {
						code = matches[1];
						location = AppConf.infosounds.locations[code];
						if (!_.isNull(location) && !_.isEmpty(location)) {
							//							console.log('location: ');
							find = true;
						}
					}

					if (!find) {
						//						console.log('not_found: ' + result);
						dfd.reject("最寄りの店舗が見つからないため、ポイントを取得できません。\nエラーコード：" + result);
						return;
					}

					App.btApi.getStamp(location).done(function(data) {
						posData = data;
						isPositionOK = true;
						if (isPositionOK === true && isInfosoundOK === true) {
							dfd.resolve(posData);
						}
					}).fail(function(err) {
						clearInterval(interId2);
						dfd.reject("最寄りの店舗が見つからないため、ポイントを取得できません。\nエラーコード：" + err.status);
					});

					if (isPositionOK === true && isInfosoundOK === true) {
						dfd.resolve(posData);
					}
				}).fail(function(err) {
					clearInterval(interId2);
					dfd.reject("来店ポイントの獲得に失敗しました。\nレジに近付くか、マイク設定をONにして再度お試しください。");
				});

				return dfd.promise();
				//				dfd.reject("来店ポイントの獲得に失敗しました。\nパネルに近付くか、マイク設定をONにして再度お試しください。");
			}, AppConf.infosounds.timeout);

			App.applican.startInfosoundPromiss().done(function(result) {
				var pastSec = (+new Date - startms) / 1000;
				console.log('startInfosoundPromiss: done ' + pastSec + 'ms');

				clearInterval(interId);
				isInfosoundOK = true;

				var location = {
					longitude: 0.0,
					latitude: 0.0
				};
				//				console.log('result: ' + result);

				// 暫定対応
				// 対象のinfosound端末IDを置換
				console.log("result before:" + result);

				var code = '';
				var regex = /^([0-9]+)-/;

				// noserver対応
				var onkyouId = "";
				if (!result.match(regex)) {
					console.log('result not match: ' + result);
					onkyouId = result;
					result = AppConf.infosounds.oid[result.toUpperCase()];
				}
				console.log('result: ' + result);

				if (_.isNull(result) || _.isEmpty(result)) {
					console.log('result not_found: ' + result);
					dfd.reject("最寄りの店舗が見つからないため、ポイントを取得できません。\nエラーコード：" + onkyouId);
					return;
				}

				var matches = result.match(regex);
				var find = false;
				if (!_.isNull(matches)) {
					code = matches[1];
					location = AppConf.infosounds.locations[code];
					if (!_.isNull(location) && !_.isEmpty(location)) {
						//						console.log('location: ');
						find = true;
					}
				}

				if (!find) {
					//					console.log('not_found: ' + result);
					dfd.reject("最寄りの店舗が見つからないため、ポイントを取得できません。\nエラーコード：" + result);
					return;
				}

				App.btApi.getStamp(location).done(function(data) {
					posData = data;
					isPositionOK = true;
					if (isPositionOK === true && isInfosoundOK === true) {
						dfd.resolve(posData);
					}
				}).fail(function(err) {
					clearInterval(interId);
					dfd.reject("最寄りの店舗が見つからないため、ポイントを取得できません。\nエラーコード：" + err.status);
				});

				if (isPositionOK === true && isInfosoundOK === true) {
					dfd.resolve(posData);
				}
			}).fail(function(err) {
				clearInterval(interId);
				dfd.reject("来店ポイントの獲得に失敗しました。\nレジに近付くか、マイク設定をONにして再度お試しください。");
			});

			return dfd.promise();
		},
		_renderCoupons: function(){
			this.availableCouponRegion.show( new AvailableCouponCollectionView({
				collection: this.couponMasterCollection
			}));
		},
		_renderPoint: function() {
			var _this = this;
			this.ui.pointValue.html(App.util.text.numberWithDelimiter(this.pointModel.get("point")));
			//auto scroll to point area and show floating button
			setTimeout(function(){
				if(_this.goToPoint){
					$("#INFO-SOUND").animate({
						scrollTop: $(".current_point").offset().top - $(".wallet-card-list").height() -44
					}, 500);
				}
			}, 500);
		},
	});

	return InfosoundTopLayoutView;
})();

},{"../../modals/alert/modal_alert_view.js":190,"../../models/coupon_collection.js":207,"../../models/coupon_master_collection.js":209,"../../models/point_model.js":218,"../point/available_coupon_collection_view.js":95,"./infosound_top_layout_template.html":72,"backbone":"5kFNoY"}],72:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="dialogue_common_region" class="noselect"></div>\n\t<div id="INFO-SOUND" class="BACKBONE-PAGE bgcolor1 walet-template">\n\t\t<div class="action-area infosound-area bgcolor2 ftcolor1 ">\n\t\t\t<img class="infosound-img" src="./image/top/infosound.png">\n\t\t\t<span id="get-infosound-btn" class="action-button">ポイント獲得</span>\n\t\t\t<span class="read-terms"><img src="./image/top/infomation-icon.svg"></span>\n\t\t</div>\n\t\t<div class="current_point">\n\t\t\t<span class="point-title">現在のポイント数</span>\n\t\t\t<span class="point-text">-</span>\n\t\t\t<span class="point-unit">pt</span>\n\t\t</div>\n\t\t<div class="point_status">\n\t\t\t<div class="condition">\n\t\t\t\t<div class="condition_title ftcolor1">利用条件</div>\n\t\t\t\t<div class="condition_words ftcolor3">特典内容は、予告なく変更される場合があります。\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id="available-coupon-region" class="bgcolor1 ftcolor1">\n\t\t</div>\n\t</div>\n</div>\n\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\n';
}
return __p;
};

},{}],73:[function(require,module,exports){
var CardModel = require('../../models/card_model.js');
var DataModel = require('../../models/data_model.js');
var PointModel = require('../../models/point_model.js');
var ValueModel = require('../../models/value_model.js');
var CouponCollection = require('../../models/coupon_master_collection.js');
var AvailableCouponCollectionView = require('../point/available_coupon_collection_view.js');
var Backbone = require('backbone');
module.exports = (function() {
	var MemberLayout = Backbone.Marionette.LayoutView.extend({
		tagName: "li",
		template: require('./member_item_view_template.html'),
		headerConf: {
			title: AppConf.features.wallet ? "ウォレット" : "モバイル会員証",
			showBackButton: true,
			customeBackAction: function() {
				AppConf.features.wallet ? App.pageSlider.home() : App.pageSlider.back()
			},
			showWalletMenu: AppConf.features.wallet ? true : false,
		},
		ui: {
			"boxbarcode": ".box-bar-code",
			"memberIdBarcode": "#member-id-barcode",
			"memberIdString": "#member-id-string",
			"main": "#POINT-MAIN"
		},
		regions: {
			"availableCouponRegion": "#available-coupon-region"
		},
		initialize: function(options) {
			this.goToPoint = options.point;
			if (AppConf.features.wallet) {
				this.template = require('./member_item_view_template.wallet.html');
			}

			this.cardModel = new CardModel();
			this.couponCollection = new CouponCollection();
			if (AppConf.features.smart) {
				this.pointModel = new ValueModel();
			} else {
				this.pointModel = new PointModel();
			}

			App.util.bindProgressScreen(this, this.cardModel);
			this.listenTo(this.cardModel, 'sync', this._renderUser);
			App.util.bindProgressScreen(this, this.couponCollection);
			this.listenTo(this.couponCollection, 'sync', this._renderCoupons);
			App.util.bindProgressScreen(this, this.pointModel);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);

			this.dataModel = new DataModel({ id: App.appModel.getAuthInfo().token });
			this.dataModel.safeFetch();
		},
		_renderUser: function() {
			var cardnum = this.cardModel.get('dataBarcode');
			var lengthUrl = AppConf.url.appRoot.indexOf('/btapi');
			var img = AppConf.url.appRoot.substr(0, lengthUrl) + '/cp/barcode/nw7.cgi?nt=1&height=80&id=A' + cardnum + 'B&.png';
			if (cardnum !== null) {
				this.dataModel.setUserId(cardnum);
				this.imgBase64(img, cardnum);
				this._scrollToPointArea();
			} else {
				this.ui.boxbarcode.hide();
			}

		},
		onRender: function() {
			var _this = this;
			this.cardModel.fetchWithAuthInfo({
				timeout: AppConf.timeout.member,
			}).fail(function(err) {
				if (err.status != 401) {
					if (_this.dataModel) {
						if (_this.dataModel.getImageUrl()) {
							_this.setUser(_this.dataModel.getImageUrl(), _this.dataModel.getUserId());
						} else {
							this.ui.boxbarcode.hide();
						}
					} else {
						this.ui.boxbarcode.hide();
					}
				}
			});
			if (AppConf.features.wallet) {
				this.couponCollection.fetchPointExchangeable();
				this.pointModel.fetchWithAuthInfo();
			}
		},
		imgBase64: function(src, cardnum) {
			var _this = this;
			var canvas = document.createElement("canvas");
			if (!canvas || !canvas.getContext || !canvas.getContext('2d')) {
				return;
			}
			var image = new Image();
			image.setAttribute('crossOrigin', 'anonymous');

			image.src = src;
			image.onload = function() {
				// 画像をbase64にするためにCanvasを利用するので、
				// クロスドメインの画像は無理かも。。
				var canvas = document.createElement("canvas");
				canvas.width = image.width;
				canvas.height = image.height;
				canvas.getContext('2d').drawImage(image, 0, 0);
				var base64 = canvas.toDataURL();
				var model = new DataModel({ id: App.appModel.getAuthInfo().token });
				model.safeFetch();
				model.setImageUrl(base64);
				_this.setUser(base64, cardnum);
			}
		},
		setUser: function(imgUrl, memberId) {
			this.ui.memberIdBarcode.attr('src', imgUrl);
			if (memberId) {
				this.ui.memberIdString.html(App.util.text.cardnumWithDelimiter(memberId));
			}
			$(".box-bar-code").show();
		},
		_scrollToPointArea: function() {
			if (AppConf.features.wallet) {
				var _this = this;
				//auto scroll to point area and show floating button
				setTimeout(function() {
					if (_this.goToPoint) {
						$("#MEMBER-DETAIL").animate({
							scrollTop: $("#anchorlink").offset().top - $(".wallet-card-list").height() - 44
						}, 500);
					}
				}, 500);
			}
		},
		_renderCoupons: function() {
			this.availableCouponRegion.show(new AvailableCouponCollectionView({
				collection: this.couponCollection
			}));
		},
		_renderPoint: function() {
			var point = App.util.text.numberWithDelimiter(this.pointModel.get("point"));
			this.$('.point-text').html(point);
		},
		onDestroy: function(){			
		}
	});

	return MemberLayout;

})();

},{"../../models/card_model.js":205,"../../models/coupon_master_collection.js":209,"../../models/data_model.js":212,"../../models/point_model.js":218,"../../models/value_model.js":223,"../point/available_coupon_collection_view.js":95,"./member_item_view_template.html":74,"./member_item_view_template.wallet.html":75,"backbone":"5kFNoY"}],74:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="MEMBER-DETAIL" class="BACKBONE-PAGE">\r\n<br>\r\n<div class="coupon_title ftcolor1">こちらのバーコードをスタッフに提示してください。</div>\r\n<br>\r\n<div class="box-bar-code">\r\n\t<div class="inner-bar-code">\r\n\t\t<center><div><img id="member-id-barcode" class="qr_member"></div></center>\r\n\t\t<center><div id="member-id-string"></div></center>\r\n\t</div>\r\n</div>\r\n<br>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],75:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="MEMBER-DETAIL" class="BACKBONE-PAGE bgcolor1 walet-template">\n    <div class="member-id bgcolor2">\n        <img class="logo-point" src="./image/top/logo-point.png">\n        <div class="box-bar-code">\n            <div class="inner-bar-code">\n                <img id="member-id-barcode" class="qr_member">\n                <div id="member-id-string"></div>\n            </div>\n        </div>\n    </div>\n    <div id="anchorlink" class="current_point">\n        <span class="point-title">現在のポイント</span>\n        <span class="point-text">0</span>\n        <span class="point-unit">pt</span>\n    </div>\n    <div class="point_status">\n        <div class="condition">\n            <div class="condition_title ftcolor1">利用条件</div>\n            <div class="condition_words ftcolor3">特典内容は、予告なく変更される場合があります。\n            </div>\n        </div>\n    </div>\n    <div id="available-coupon-region" class="bgcolor1 ftcolor1">\n    </div>\n</div>\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\n    ';
}
return __p;
};

},{}],76:[function(require,module,exports){
var Backbone = require('backbone');
var MemberItemView = require('./member_item_view.js');
module.exports = (function () {

	var MemberController = Backbone.Marionette.Controller.extend({

		showMember: function(point){
			var memberView = new MemberItemView({ point: point });
			memberView.render();
			App.pageSlider.slidePage( memberView );
			App.headerModel.applyViewHeaderConf( memberView.headerConf );
		}
	});

	var memberController = new MemberController();

	var MemberRouter = Backbone.Marionette.AppRouter.extend({
		controller: memberController,
		appRoutes: {
			"member" : "showMember",
			"member/:point" : "showMember",
		}
	});

	return MemberRouter;

})();

},{"./member_item_view.js":73,"backbone":"5kFNoY"}],77:[function(require,module,exports){
 var Backbone = require('backbone');
 var UserModel = require('../../models/user_model.js');
 module.exports = (function () {
	 window.hoge = new UserModel();
	 
	 var DeleteTopLayoutView = Backbone.Marionette.LayoutView.extend({
		template: require('./delete_top_layout_template.html'),
	 	ui: {
	 		"inputPassword" : "[name=password]",
	 		"deleteUserBtn" : "#delete-user-btn",
	 	},
	 	events: {
	 		"click @ui.deleteUserBtn" : "confirmDeleteUser",
	 	},
	 	initialize: function() {
	 		this.userModel = new UserModel();
	 		App.util.bindProgressScreen(this, this.userModel);
	 		this.listenTo(this, "exec:delete", this.execDelete);
	 	},
	 	headerConf: {
	 		title : "退会",
	 		showBackButton: true,
	 	},
	 	onRender: function(){
	 		App.util.hideProgressScreen();
	 	},
	 	confirmDeleteUser: function(){
	 		var _this = this;
	 		var password = this.ui.inputPassword.val();
	 		if (_.isEmpty(password)) {
	 			applican.notification.alert("パスワードを入力してください", App.doNothing, "", "OK");
	 			return;
	 		}
	 		applican.notification.confirm("本当に退会しますか?", function(confirmedStatus){
	 			if (confirmedStatus == 1) {
	 				_this.trigger("exec:delete");
				}
 			}, "確認", "はい,いいえ");
	 	},
	 	execDelete: function() {
	 		var password = this.ui.inputPassword.val();
	 		var deleteUserRequest = function() {
	 			return App.util.bindCommonErrorHandling(App.btApi.deleteUser(password),
	 			{ignoreStatuses: [401,404]});
	 		};

	 		App.util.execWithProgressScreen(deleteUserRequest)
	 		.done(function() {
	 			applican.notification.alert("退会しました", App.doNothing, "", "OK");
	 			App.appModel.saveAsLogout();
	 			App.pageSlider.backAndRestartHistory();
	 			applican.webView.reload();
	 		}).fail(function(err) {
	 			console.log('err.status' + err.status);
	 			if (err.status === 401) {
	 				applican.notification.alert("退会に失敗しました。パスワードを確認してください。", App.doNothing, "", "OK");
	 			} else if (err.status === 404) {
	 				applican.notification.alert("退会に失敗しました。再度ログイン後退会を行ってください。", App.doNothing, "", "OK");
	 				App.appModel.saveAsLogout();
	 				App.pageSlider.backAndRestartHistory();
	 				applican.webView.reload();
 				}
 			});
	 	},
	 });

	 return DeleteTopLayoutView;
})();
},{"../../models/user_model.js":222,"./delete_top_layout_template.html":78,"backbone":"5kFNoY"}],78:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="DELETE-MAIN" class="BACKBONE-PAGE">\n\t<p class="instruction ftcolor2">\n\t\t一度退会すると、すべての会員情報が削除されます。<br>\n\t\tなお、退会後の復元はいたしかねます。<br><br>\n\t\tよろしければ、パスワードを入力後、退会ボタンを押してください。\n\t</p>\n\t<label for="password">パスワード</label>\n\t<input type="password" name="password" id="password">\n\n\t<button id="delete-user-btn" type="button" class="delete-btn btbgcolor1 btftcolor1">退会</button>\n\t<div class="bgcolor3 ftcolor1"></div>\n</div>\n'+
((__t=( App.util.injectProgressScreenDom() ))==null?'':__t)+
'';
}
return __p;
};

},{}],79:[function(require,module,exports){
var Backbone = require('backbone');
var OtherTopLayoutView = require('./other_top_layout.js');
var DeleteTopLayoutView = require('./delete_top_layout.js');
var querystinrg = ('querystring');
module.exports = (function () {
	var OtherController = Backbone.Marionette.Controller.extend({
		showOther: function(){
			var otherTopLayoutView = new OtherTopLayoutView();
			otherTopLayoutView.render();
			App.pageSlider.slidePage(otherTopLayoutView);
			App.headerModel.applyViewHeaderConf(otherTopLayoutView.headerConf);
		},
		showDeleteTop: function (){
			var deleteTopLayoutView = new DeleteTopLayoutView ();
			deleteTopLayoutView.render();
			App.pageSlider.slidePage(deleteTopLayoutView);
			App.headerModel.applyViewHeaderConf(deleteTopLayoutView.headerConf);
		}
	});

	var otherController = new OtherController();
	var OtherRouter = Backbone.Marionette.AppRouter.extend({
		controller: otherController,
		appRoutes: {
			"other" : "showOther",
			"delete" : "showDeleteTop",
		}
	});
	
	return OtherRouter;
})();
},{"./delete_top_layout.js":77,"./other_top_layout.js":80,"backbone":"5kFNoY"}],80:[function(require,module,exports){
 var Backbone = require('backbone');
 
 module.exports = (function () {
	 var OtherTopLayoutView = Backbone.Marionette.LayoutView.extend({
		 template: require('./other_top_layout_template.html'),
		 headerConf: {
			 title: "その他",
			 showBackButton: true,
		 },
		 onRender: function(){
			 App.util.hideProgressScreen();
		 }
	 });
	 
	 return OtherTopLayoutView;
})();
},{"./other_top_layout_template.html":81,"backbone":"5kFNoY"}],81:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CONFIG-TOP" class="BACKBONE-PAGE">\n\t<div class="bgcolor3 ftcolor1">\n\t\t<ul>\n\t\t\t<li class="bdcolor1"><a href="#delete">退会</a></li>\n\t\t</ul>\n\t</div>\n</div>\n'+
((__t=( App.util.injectProgressScreenDom() ))==null?'':__t)+
'';
}
return __p;
};

},{}],82:[function(require,module,exports){
var Backbone = require('backbone');
var SlideCardCollectionView = require('../../views/slidecard/slidecard_collection_view');
var PassticketPurchaseCollection = require('../../models/passticket_purchase_collection');
var TicketCollectionView = require('./ticket/ticket_collection_view.js');
var TicketCollection = require('./ticket/ticket_collection.js');
var UserModel = require('../../models/user_model.js');

module.exports = (function() {
	var PassTicketDetailLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./pass_ticket_layout_template.html'),
		headerConf: {
			title: AppConf.features.wallet ? "ウォレット" : "定期券",
			showWalletMenu: AppConf.features.wallet ? true : false,
			customeBackAction: function(){
				App.pageSlider.home();
			}
		},
		ui: {
			"cardSlide": ".card-region",
			"historyNavigate": '.history-block'
		},
		events: {
		},
		regions: {
			"cardRegion": ".card-region",
			"ticketNormalListRegion": ".ticket-list-region"
		},
		initialize: function() {
			var _this = this;
			this.userModel = new UserModel();
			this.ticketCollection = new TicketCollection({ pagination: true });
			this.ticketCollectionView = new TicketCollectionView({ collection: this.ticketCollection });
			App.util.bindProgressScreen(this, this.ticketCollection);
			this.listenTo(this.ticketCollection, 'sync', this.renderTicket);
			this.listenTo(this, 'load:sync', this.onLoad);
			this.slideCardCollection = new PassticketPurchaseCollection();
			App.util.bindProgressScreen(this, this.slideCardCollection);
			this.slideCardCollectionView = new SlideCardCollectionView({
				collection: this.slideCardCollection
			});
			this.listenTo(this.slideCardCollection, 'sync', this.renderAfterSyncCoupon);

		},
		loadingMoreProduct: function() {
			if (!this.ticketCollection.isAtLastPage()) {
				this.ticketCollection.fetchTicket({ remove: false, rank: this.userModel.get('userRank'), coupons: this.slideCardCollection });
			}
		},
		renderTicket: function() {
			this.ticketNormalListRegion.show(this.ticketCollectionView);
		},
		renderAfterSyncCoupon: function() {
			var _this = this;
			if (this.slideCardCollection.length > 0) {
				this.ui.historyNavigate.removeClass('hide');
				this.cardRegion.show(this.slideCardCollectionView);
				this.slideCardCollectionView.initSlick();
			} else {
				this.ui.cardSlide.empty().append('<div class="empty-card"><span class="card-text">有効な定期券がありません</span></div>');
			}
			this.userModel.fetchWithAuthInfo().done(function() {
				_this.ticketCollection.fetchTicket({ remove: true, rank: _this.userModel.get('userRank'), coupons: _this.slideCardCollection });
			})
		},
		onLoad: function() {
			var _this = this;
			this.slideCardCollection.fetchPassTicketPurchase();
			$('#PASS-TICKET').on('scroll', _.debounce(function() {
				var bottomPos = 100;
				var scrollHeight = $('.pass-ticket-wrapper').height();
				var scrollPosition = $(this).height() + $(this).scrollTop();
				if (scrollPosition > scrollHeight - bottomPos) {
					_this.loadingMoreProduct();
				}
			}, 250));
		},
	});

	return PassTicketDetailLayout;

})();

},{"../../models/passticket_purchase_collection":216,"../../models/user_model.js":222,"../../views/slidecard/slidecard_collection_view":244,"./pass_ticket_layout_template.html":83,"./ticket/ticket_collection.js":91,"./ticket/ticket_collection_view.js":92,"backbone":"5kFNoY"}],83:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="PASS-TICKET" class="BACKBONE-PAGE bgcolor1 touch">\n\t<div class="pass-ticket-wrapper">\n\t\t<div class="ticket-slider">\n\t\t\t<div class="card-region ticket-card">\n\t\t\t\t<div class="empty-card">\n\t\t\t\t\t<span class="card-text">有効な定期券がありません</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="paging-region slick-slider"></div>\n\t\t</div>\n\t\t';
 if( !AppConf.features.wallet ){ 
__p+='\n\t\t\t<div class="history-block hide">\n\t\t\t\t<a href="#history?type=passTicket" class="history">利用履歴を見る</a>\n\t\t\t</div>\n\t\t';
 } 
__p+='\n\t\t<div class="ticket-list-title">\n\t\t\t販売中の定期券\n\t\t</div>\n\t\t<div class="ticket-list-region">\n\t\t\t<div class="ticket-list-region">\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'';
}
return __p;
};

},{}],84:[function(require,module,exports){
var Backbone = require('backbone');
var PassTicketLayout = require('./pass_ticket_layout.js');
var PassTicketDetailLayout = require('./passticket_detail/pass_ticket_detail_layout.js');
var PaymentPassTicketLayout = require('./payment_pass_ticket/payment_pass_ticket_layout.js');
module.exports = (function() {

	var PassTicketController = Backbone.Marionette.Controller.extend({
		passTicket: function() {
			var passTicketLayout = new PassTicketLayout();
			passTicketLayout.render();
			App.pageSlider.slidePage(passTicketLayout);
			App.headerModel.applyViewHeaderConf(passTicketLayout.headerConf);
			passTicketLayout.trigger("load:sync");
		},
		passTicketDetail: function(id, type) {
			var passTicketDetailLayout = new PassTicketDetailLayout({ ticketId: id, type: type });
			passTicketDetailLayout.render();
			App.pageSlider.slidePage(passTicketDetailLayout);
			App.headerModel.applyViewHeaderConf(passTicketDetailLayout.headerConf);
			passTicketDetailLayout.trigger("load:sync");
		},
		paymentPassTicket: function(id) {
			var paymentPassTicketLayout = new PaymentPassTicketLayout({ ticketId: id });
			paymentPassTicketLayout.render();
			App.pageSlider.slidePage(paymentPassTicketLayout);
			App.headerModel.applyViewHeaderConf(paymentPassTicketLayout.headerConf);
			paymentPassTicketLayout.trigger("load:sync");
		},
	});

	var passTicketController = new PassTicketController();
	var PassTicketRouter = Backbone.Marionette.AppRouter.extend({
		controller: passTicketController,
		appRoutes: {
			"pass-ticket": "passTicket",
			"pass-ticket-detail/:id/:type": "passTicketDetail",
			"payment-pass-ticket/:id": "paymentPassTicket"
		}
	});

	return PassTicketRouter;

})();

},{"./pass_ticket_layout.js":82,"./passticket_detail/pass_ticket_detail_layout.js":87,"./payment_pass_ticket/payment_pass_ticket_layout.js":89,"backbone":"5kFNoY"}],85:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="card">\n\t<div class="card-type">\n\t\t';
 if(couponImageUrl){ 
__p+='\n\t\t\t';
 if(textColor && layerTransparency && layerColor){ 
__p+='\n\t\t\t<div class="card-detail-wrapper top-half-card" style="\n\t\t\t\tbackground: url(\''+
((__t=( couponImageUrl ))==null?'':_.escape(__t))+
'\'); \n\t\t\t\tbackground-size: cover;\n\t\t\t\tcolor: '+
((__t=( textColor ))==null?'':_.escape(__t))+
';">\n\t\t\t\t<div class="transparency" style="background: '+
((__t=( layerColor ))==null?'':_.escape(__t))+
'; opacity: '+
((__t=( layerTransparency ))==null?'':_.escape(__t))+
'"></div>\n\t\t\t\t<div class="card-detail">\n\t\t\t\t\t';
 if(isSpecialUser){ 
__p+='\n\t\t\t\t\t<p class=\'special-user\'>ゴールドメンバー</p>\n\t\t\t\t\t';
 } 
__p+='\n\t\t\t\t\t<p class=\'discount\'>\n\t\t\t\t\t\t<span>'+
((__t=( cardPageTitle ))==null?'':_.escape(__t))+
'</span>\n\t\t\t\t\t\t<span class="value">\n\t\t\t\t\t\t\t'+
((__t=( cardName ))==null?'':_.escape(__t))+
'\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-detail-wrapper bottom-half-card">\n\t\t\t\t<div class="card-detail">\n\t\t\t\t\t';
 if(type !== "1"){ 
__p+='\n\t\t\t\t\t<div class="expire-date">\n\t\t\t\t\t\t<span class="month-date">'+
((__t=( formatDate(expires) ))==null?'':__t)+
'</span>\n\t\t\t\t\t\t<p class="expire-date-title">\n\t\t\t\t\t\t\t<span class="time">'+
((__t=( formatTime(expires) ))==null?'':__t)+
'</span>\n\t\t\t\t\t\t\t<span class="title">まで有効</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p class="remain-day"><span>残'+
((__t=( remainDay(expires) ))==null?'':__t)+
'日</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t';
 } 
__p+='\n\t\t\t\t\t<p class="bottom">\n\t\t\t\t\t\t'+
((__t=( bottom ))==null?'':_.escape(__t))+
'\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t';
 } else { 
__p+='\n\t\t\t\t<div class="card-img">\n\t\t\t\t\t<img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'">\n\t\t\t\t</div>\n\t\t\t\t<div class="card-img-detail">\n\t\t\t\t\t\t<span class="month-date">'+
((__t=( formatDate(expires) ))==null?'':__t)+
'まで有効</span>\n\t\t\t\t\t\t<span class="remain-day">残'+
((__t=( remainDay(expires) ))==null?'':__t)+
'日</span>\n\t\t\t\t</div>\n\t\t\t';
 } 
__p+='\n\t\t';
 } else { 
__p+='\n\t\t\t<div class="card-detail-wrapper top-half-card" style="background: '+
((__t=( titleBackgroundColor ))==null?'':_.escape(__t))+
'; color: '+
((__t=( textColor ))==null?'':_.escape(__t))+
'">\n\t\t\t\t<div class="card-detail">\n\t\t\t\t\t';
 if(isSpecialUser){ 
__p+='\n\t\t\t\t\t<p class=\'special-user\'>ゴールドメンバー</p>\n\t\t\t\t\t';
 } 
__p+='\n\t\t\t\t\t<p class=\'discount\'>\n\t\t\t\t\t\t<span>'+
((__t=( cardPageTitle ))==null?'':_.escape(__t))+
'</span>\n\t\t\t\t\t\t<span class="value">\n\t\t\t\t\t\t\t'+
((__t=( cardName ))==null?'':_.escape(__t))+
'\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="card-detail-wrapper bottom-half-card">\n\t\t\t\t<div class="card-detail">\n\t\t\t\t\t';
 if(type !== "1"){ 
__p+='\n\t\t\t\t\t<div class="expire-date">\n\t\t\t\t\t\t<span class="month-date">'+
((__t=( formatDate(expires) ))==null?'':__t)+
'</span>\n\t\t\t\t\t\t<p class="expire-date-title">\n\t\t\t\t\t\t\t<span class="time">'+
((__t=( formatTime(expires) ))==null?'':__t)+
'</span>\n\t\t\t\t\t\t\t<span class="title">まで有効</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p class="remain-day"><span>残'+
((__t=( remainDay(expires) ))==null?'':__t)+
'日</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t';
 } 
__p+='\n\t\t\t\t\t<p class="bottom">\n\t\t\t\t\t\t'+
((__t=( bottom ))==null?'':_.escape(__t))+
'\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t';
 } 
__p+='\n\t\t';
 if(isDisableUse()){ 
__p+='\n\t\t<div class="card-disable"><span class="text">有効な定期券がありません</span></div>\n\t\t';
 } 
__p+='\n\t\t';
 if(hasUsed()){ 
__p+='\n\t\t<div class="card-disable"><span class="text">本日分は利用済みです。</span></div>\n\t\t';
 } 
__p+='\n\t</div>\n</div>\n';
 if(type === "1"){ 
__p+='\n<div class="ticket-price cf">\n\t<span class="title">価格</span>\n\t<span class="price">\n\t\t<span class="capacity">'+
((__t=( unitPrice ))==null?'':_.escape(__t))+
'</span>円\n\t</span>\n</div>\n';
 } 
__p+='';
}
return __p;
};

},{}],86:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function() {
	var CardDetailView = Backbone.Marionette.LayoutView.extend({
		template: require('./card_detail_template.html'),
		templateHelpers: function() {
			var _this = this;
			return {
				formatDate: function(time) {
					var m = moment(time);
					return "<span class='small'> " + m.year() + "</span>" + App.util.text.padStart(m.month() + 1 + "", 2, '0') + "." + App.util.text.padStart(m.date() + "", 2, '0');
				},
				formatTime: function(time) {
					return moment(time).format("HH:mm");
				},
				isDisableUse: function() {
					return !!_this.model.get('disableUse');
				},
				remainDay: function(endDate) {
					var end = moment(endDate);
					var now = moment();
					return (end.diff(now, 'days'));
				},
				hasUsed: function() {
					var flg = false;
					var item = _this.model;
					var isBeforeTerm = _this.isBeforeTerm(item);
					if (item.get('limitCode') != 0 && !isBeforeTerm && item.get('memberOnly') == 1 && item.get('finalUseDate')) {
						flg = true;
					}
					return flg;
				}
			};
		},
		isBeforeTerm: function(item) {
			if (!item.get('usePeriodStartDate')) return false; // 日付による期間指定ではない場合
			return Number(new Date()) < item.get('usePeriodStartDate');
		},
	});

	return CardDetailView;

})();
},{"./card_detail_template.html":85,"backbone":"5kFNoY","moment":"iROhDJ"}],87:[function(require,module,exports){
var Backbone = require('backbone');
var SwitchBtnLayout = require('../../switchbutton/switch_btn_layout');
var ModalHitapView = require('../../../modals/hitapModal/modal_hitap_passticket_view.js');
var ModalConfirmView = require('../../../modals/confirm/modal_confirm_view');
var CardDetailView = require('./card_detail/card_detail_view.js');
var PassticketPurchaseCollection = require('../../../models/passticket_purchase_collection');
var moment = require('moment');
module.exports = (function() {

	var PassTicketDetailLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./pass_ticket_detail_layout_template.html'),
		headerConf: {
			hideHeader: true,
		},
		ui: {
			"cancelBtn": ".close-button",
			"mainLayout": "#PASS-TICKET-DETAIL",
			"content": ".content",
			"footerButton": ".btn-group-footer",
			"notice": '.notice',
			'userGuideBeforeUse': '.guide-before-use',
			'userGuideAfterUse': '.guide-after-use',
			'userGuideHasUsed': '.guide-has-used',
			"msgAlertAfterUse": ".message-after-use",
			'switchButton': '.switch-btn-region',
			'confirmBuy': '.btn-confirm',
			'termCheckbox': '.term-checkbox-input',
			'ticketUseCondition': '.ticket-use-condition',
		},
		events: {
			"click @ui.cancelBtn": function() {
				App.pageSlider.back();
			},
			'click @ui.confirmBuy': 'goToPayment',
			'change @ui.termCheckbox': 'changeTerm'
		},
		regions: {
			"cardRegion": ".card-region",
			"switchBtnRegion": ".switch-btn-region",
			"hitabRegion": ".hitab-region",
		},
		initialize: function(options) {
			this.ticketId = options.ticketId;
			this.type = options.type; //1 is buy, 2 is use
			var _this = this;
			this.modalHitapView = new ModalHitapView();
			this.modalConfirmView = new ModalConfirmView();
			this.switchBtnLayout = new SwitchBtnLayout();
			this.switchBtnLayout.then(function(res) {
				if (res == 1) {
					_this.showDialogue();
				}
			});
			this.listenTo(this, 'load:sync', this.onLoad);
			this.passticketPurchaseCollection = new PassticketPurchaseCollection();
		},
		onRender: function() {
			App.util.hideProgressScreen();
			this.switchBtnRegion.show(this.switchBtnLayout);
			this.renderCardDetail();
		},
		renderFixedUI: function() {
			var contentHeight = $(window).height() - this.ui.footerButton.outerHeight();
			if (this.type == 2) {
				contentHeight += this.ui.footerButton.outerHeight();
			}
			this.ui.content.css({
				'height': contentHeight + 'px'
			});
		},
		renderBuyTicket: function(data) {
			this.ui.notice.removeClass('hide');
			this.ui.footerButton.removeClass('hide');
		},
		renderUseTicket: function(data) {
			this.ui.userGuideBeforeUse.removeClass('hide');
			this.ui.switchButton.removeClass('hide');
			this.ui.confirmBuy.addClass('hide');
			this.ui.notice.addClass('hide');
			this.ui.ticketUseCondition.addClass('noborder');
		},
		renderConditionDetail: function(data) {
			if (data.get('detailText')) {
				this.$('.detail-text-title').removeClass('hide');
				this.$('.detail-text').text(data.get('detailText'));
			}
			if (data.get('useCondInterval') == 1) {
				this.$('.cond-use-count-title').removeClass('hide');
				this.$('.cond-interval').removeClass('hide');
			}
			if (data.get('useCondNumber') > 0) {
				this.$('.cond-use-count-title').removeClass('hide');
				this.$('.cond-number').text('合計' + data.get('useCondNumber') + '回まで利用可能');
			}
			if (data.get('note')) {
				this.$('.use-cond-note-title').removeClass('hide');
				this.$('.cond-note').html(data.get('note'));
			}
			if (data.get('usePeriodType') == 1) {
				this.$('.expired-date').text('有効期限 購入日より' + data.get('usePeriodValue') + '日間　00:00まで');
			} else {
				this.$('.expired-date').text((moment(+data.get('usePeriodStartDate')).format("YYYY/MM/DD") + ' ～ ' + moment(+data.get('usePeriodStartDate')).format("YYYY/MM/DD")));
			}
		},
		renderCouponHasUsed: function(coupon) {
			if (coupon.collection.checkingHasUseCard(coupon)) {
				this.ui.userGuideHasUsed.removeClass('hide');
				this.ui.msgAlertAfterUse.removeClass('hide').find('.main-message').addClass('hide');
				this.ui.userGuideBeforeUse.addClass('hide');
				this.ui.switchButton.addClass('hide');
			}
		},
		renderAfterUse: function() {
			var _this = this;
			this.ui.userGuideAfterUse.removeClass('hide');
			this.ui.msgAlertAfterUse.removeClass('hide');
			var countDownDate = moment().add(AppConf.passTicket.countDownTime, 'minute').valueOf();
			this.showCountDown(countDownDate);
			this.timingAfterUse = setInterval(function() {
				var distance = _this.showCountDown(countDownDate);
				if (distance < 0) {
					clearInterval(this.timingAfterUse);
					_this.ui.msgAlertAfterUse.find('.time').text('使用済み');
				}
			}, 1000);
			this.ui.userGuideBeforeUse.addClass('hide');
			this.ui.switchButton.addClass('hide');
		},
		showCountDown: function(countDownDate) {
			// Get todays date and time
			var now = new Date().getTime();

			// Find the distance between now and the count down date
			var distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;
			this.ui.msgAlertAfterUse.find('.time').text(minutes + ':' + seconds);
			return distance;
		},
		renderViewForUseCoupon: function(data) {
			if (data.length > 0) {
				data = window.passTicketDetailModel = this.passticketPurchaseCollection.where({ id: +this.ticketId })[0];
			}
			if (data) {
				this.renderUseTicket(data);
				this.renderConditionDetail(data);
				this.renderCouponHasUsed(data);
				this.cardRegion.show(new CardDetailView({
					model: data
				}));
			}
		},
		renderCardDetail: function() {
			var data = window.passTicketDetailModel;
			switch (this.type) {
				case '1': {
					// buy ticket
					this.renderBuyTicket(data);
					var detail = data.get('detail');
					this.renderConditionDetail(new Backbone.Model(detail));
					data.set({
						type: "1", //1  is buy ticket
						disableUse: true, //todo
						isSpecialUser: false, //todo
						cardPageTitle: detail.pageTitle,
						cardName: detail.name,
						bottom: detail.usePeriodType == 1 ? (detail.usePeriodValue + "日定期券") : (moment(detail.usePeriodStartDate).format("YYYY/MM/DD") + ' ～ ' + moment(detail.usePeriodStartDate).format("YYYY/MM/DD")),
						expires: detail.expires,
						couponImageUrl: detail.couponImageUrl ? detail.couponImageUrl : '',
						titleBackgroundColor: detail.titleBackgroundColor ? detail.titleBackgroundColor : '',
						textColor: detail.textColor ? detail.textColor : '',
						layerColor: detail.layerColor ? detail.layerColor : '',
						layerTransparency: detail.layerTransparency ? detail.layerTransparency : '',
					});
					this.cardRegion.show(new CardDetailView({
						model: data
					}));
					break;
				}
				default: {
					// use ticket
					if (data && data.get('id') == this.ticketId) {
						this.renderViewForUseCoupon(data);
					} else {
						App.util.bindProgressScreen(this, this.passticketPurchaseCollection);
						this.listenTo(this.passticketPurchaseCollection, 'sync', this.renderViewForUseCoupon);
						this.passticketPurchaseCollection.fetchPassTicketPurchase();
					}
					break;
				}
			}
		},
		onLoad: function() {
			this.ui.mainLayout.css({
				'height': $(window).height() + 'px'
			});
			$(".progress-screen").css({
				"margin-top": "-44px"
			});
			this.renderFixedUI();
		},
		onDestroy: function() {
			// remove hitap DOM and modal confirm DOM
			this.modalHitapView.onDestroy();
			this.modalConfirmView.onDestroy();
			clearInterval(this.timingAfterUse);
		},
		showHitap: function() {
			var _this = this;
			this.modalHitapView.show().then(function(res) {
				// hitap success
				if (res === 1) {
					_this.renderAfterUse();
					_this.passticketPurchaseCollection.clearCache();
				}
			});
		},
		showDialogue: function() {
			var _this = this;
			this.modalConfirmView.show({ title: '使用確認', text: '定期券を使用しますが、<br>よろしいでしょうか？', okButton: '確認' }).then(function(res) {
				// cancel hitap
				_this.switchBtnLayout.switchOff();
				// hitap success
				if (res === 1) {
					_this.showHitap();
				}
			});
		},
		goToPayment: function() {
			location.hash = '#payment-pass-ticket/' + this.ticketId;
		},
		changeTerm: function() {
			if (this.ui.termCheckbox[0].checked) {
				this.ui.confirmBuy.removeAttr('disabled');
			} else {
				this.ui.confirmBuy.attr('disabled', 'true');
			}
		}
	});

	return PassTicketDetailLayout;

})();
},{"../../../modals/confirm/modal_confirm_view":193,"../../../modals/hitapModal/modal_hitap_passticket_view.js":195,"../../../models/passticket_purchase_collection":216,"../../switchbutton/switch_btn_layout":149,"./card_detail/card_detail_view.js":86,"./pass_ticket_detail_layout_template.html":88,"backbone":"5kFNoY","moment":"iROhDJ"}],88:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="PASS-TICKET-DETAIL" class="bgcolor1">\n\t<div class="content">\n\t\t<div class="card-region ticket-card">\n\t\t</div>\n\t\t<p class="notice hide">内容を確認して、購入画面へお進みください。</p>\n\t\t<div class="guide-block guide-before-use hide">\n\t\t\t<div class="guide">「使用する」を右へスライドしてください。</div>\n\t\t</div>\n\t\t<div class="guide-block guide-after-use hide">\n\t\t\t<div class="can-use">ご利用いただけます。</div>\n\t\t\t<div class="guide">画面をスタッフにお見せください</div>\n\t\t</div>\n\t\t<div class="guide-block guide-has-used hide">\n\t\t\t<div class="can-use has-used">本日分は利用済みです。</div>\n\t\t</div>\n\t\t<div class="switch-btn-region hide">\n\t\t</div>\n\t\t<div class="message-alert-area message-after-use hide">\n\t\t\t<div class="main-message">\n\t\t\t\t<div class="main-message-wrapper animation-fade"><span class="time"></span></div>\n\t\t\t</div>\n\t\t\t<div class="notice-message">\n\t\t\t\t<p>※ご利用の際には、現在時刻が動いている場合にのみご利用いただけます。</p>\n\t\t\t\t<p>※画面キャプチャではご利用いただけません。</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="ticket-use-condition">\n\t\t\t<dl>\n\t\t\t\t<dt class="detail-text-title hide">\n\t\t\t\t\t<i class="icon book"></i><span class="title">定期券詳細</span>\n\t\t\t\t</dt>\n\t\t\t\t<dd>\n\t\t\t\t\t<span class="detail-text">\n\t\t\t\t\t</span>\n\t\t\t\t</dd>\n\t\t\t\t<dt>\n\t\t\t\t\t<i class="icon clock"></i><span class="title">利用可能期間</span>\n\t\t\t\t</dt>\n\t\t\t\t<dd>\n\t\t\t\t\t<span class="expired-date"></span>\n\t\t\t\t</dd>\n\t\t\t\t<dt class="cond-use-count-title hide">\n\t\t\t\t\t<i class="icon checkbox"></i><span class="title">利用条件</span>\n\t\t\t\t</dt>\n\t\t\t\t<dd class="cond-interval hide">\n\t\t\t\t\t1日1回まで利用可能\n\t\t\t\t</dd>\n\t\t\t\t<dd class="cond-number">\n\t\t\t\t</dd>\n\t\t\t\t<dt class="use-cond-note-title hide">\n\t\t\t\t\t<i class="icon attention"></i><span class="title">備考・注意事項</span>\n\t\t\t\t</dt>\n\t\t\t\t<dd class="cond-note">\n\t\t\t\t</dd>\n\t\t\t</dl>\n\t\t</div>\n\t</div>\n\t<div class="close-button">\n\t\t<img class="cancel-icon" src="./image/common/cancel.png">\n\t</div>\n\t<div class="btn-group-footer bgcolor1 hide">\n\t\t<div class="footer-col term-checkbox">\n\t\t\t<label class="container-checkbox-custom">確認しました\n\t\t\t\t<input type="checkbox" class="term-checkbox-input">\n\t\t\t\t<span class="checkmark"></span>\n\t\t\t</label>\n\t\t</div>\n\t\t<div class="footer-col button-buy-ticket">\n\t\t\t<button disabled class="button btn-confirm btbgcolor1 btftcolor1">お支払い手続きへ</button>\n\t\t</div>\n\t</div>\n</div>\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'';
}
return __p;
};

},{}],89:[function(require,module,exports){
var Backbone = require('backbone');
var ModalConfirmView = require('../../../modals/confirm/modal_confirm_view');
var PaymentPurchaseHistoryCollection = require('../../../models/payment_purchase_history_collection.js');
var ModalAlertView = require('../../../modals/alert/modal_alert_view.js');
var PassticketPurchaseCollection = require('../../../models/passticket_purchase_collection.js');
module.exports = (function() {

	var PaymentPassTicketLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./payment_pass_ticket_layout_template.html'),
		headerConf: {
			hideHeader: true,
		},
		ui: {
			'confirmCreditCard': '#credit-confirm',
			'reuseConfirmCreditCard': '#reuse-credit-confirm',
			'mainContent': '.payment-content',
			'paymentMethod': '.payment-method',
			'paymentContentConfirm': '.payment-content-confirm',
			'paymentSuccess': '.payment-success',
			'cancelPayment': '#credit-cancel',
			'backToPaymentInfo': '#back-to-payment-content',
			'orderConfirm': '#order-confirm',
			'closePayment': '#close-payment',
			'reuseCreditCardRadio': '.reuse-credit-card-radio',
			'reuseCardNumber': '.reuse-card-number',
			'reuseCard': '.reuse-card',
			'newCard': '.new-card',
			'reuseCreditCardLb': '.reuse-credit-card-lb',
			'paymentBtnFooter': '.payment-credit-buttons',
			'paymentmultiStep': '.multi-steps-container',
			'ticketName': '.ticket-name',
			'ticketPrice': '.ticket-price',
			'ticketDay': '.ticket-day',
			'checkLengthInput': '.check-length-input',
		},
		events: function() {
			var iosEvent = {
				'touchend @ui.confirmCreditCard': 'showCreditContentConfirmed',
				'touchend @ui.reuseConfirmCreditCard': 'showCreditContentConfirmed',
				'touchend @ui.backToPaymentInfo': 'backToPaymentInfo',
				'touchend @ui.orderConfirm': 'handleOrderConfirm',
				'touchend @ui.closePayment': 'closePayment',
				'touchend @ui.cancelPayment': function() {
					if (this.ui.paymentSuccess.hasClass('show')) {
						this.closePayment();
					} else {
						this.showDialogue();
					}
				},
				'change @ui.reuseCreditCardRadio': 'swicthReuseCreditCard',
				'keypress @ui.checkLengthInput': 'checkLength',
				'keyup @ui.checkLengthInput': 'formatMasterCard',
				'paste @ui.checkLengthInput': 'pasteMaterCard',
			};
			var androidEvent = {
				'click @ui.confirmCreditCard': 'showCreditContentConfirmed',
				'click @ui.reuseConfirmCreditCard': 'showCreditContentConfirmed',
				'click @ui.backToPaymentInfo': 'backToPaymentInfo',
				'click @ui.orderConfirm': 'handleOrderConfirm',
				'click @ui.closePayment': 'closePayment',
				'click @ui.cancelPayment': function() {
					if (this.ui.paymentSuccess.hasClass('show')) {
						this.closePayment();
					} else {
						this.showDialogue();
					}
				},
				'change @ui.reuseCreditCardRadio': 'swicthReuseCreditCard',
				'keypress @ui.checkLengthInput': 'checkLength',
				'keyup @ui.checkLengthInput': 'formatMasterCard',
				'paste @ui.checkLengthInput': 'pasteMaterCard',
			};
			return (applican.config.device_os === "IOS") ? iosEvent : androidEvent;
		},
		initialize: function(options) {
			this.ticketModel = window.passTicketDetailModel;
			this.paymentPurchaseHistoryCollection = new PaymentPurchaseHistoryCollection();
			App.util.bindProgressScreen(this, this.paymentPurchaseHistoryCollection);
			this.listenTo(this.paymentPurchaseHistoryCollection, 'sync', this.renderMaterCardInfo);
			this.paymentPurchaseHistoryCollection.fetchPaymentPurchaseHistory({ hasPurchased: true });
			this.modalConfirmView = new ModalConfirmView();
			this.modalAlertView = new ModalAlertView();
			this.listenTo(this, 'load:sync', this.onLoad);
			// init pass ticket collection
			this.passticketPurchaseCollection = new PassticketPurchaseCollection();
		},
		onLoad: function() {
			$(".progress-screen").css({
				"margin-top": "-44px"
			});
			this.renderTicketInfo();
			this.renderExpringYear();
			this.ui.mainContent.css({
				'height': ($(window).height() - (this.ui.paymentBtnFooter.outerHeight() + this.ui.paymentmultiStep.outerHeight())) + 'px'
			});
		},
		renderTicketInfo: function() {
			this.ui.ticketName.text(this.ticketModel.get('name'));
			this.ui.ticketDay.text('30');
			this.ui.ticketPrice.text(this.ticketModel.get('unitPrice'));
		},
		renderMaterCardInfo: function() {
			// if reuse master card
			if (this.paymentPurchaseHistoryCollection.length > 0) {
				this.isRepurchase = true;
				this.data = {
					cardNumber: this.paymentPurchaseHistoryCollection.models[0].get('cardNumber')
				};
				this.$el.find('.card-number').text('＊＊＊＊-＊＊＊＊-＊＊＊＊-' + this.data.cardNumber.slice(- 4));
				this.ui.reuseCreditCardLb.addClass('show');
				this.ui.reuseCard.addClass('show');
				this.ui.paymentMethod.addClass('reuse-payment-method');
			} else {
				this.ui.newCard.addClass('show');
			}
		},
		checkLength: function(e) {
			var field = $(e.currentTarget);
			var length = +field.attr('length');
			if (field.val().length == length || !(event.charCode >= 48 && event.charCode <= 57)) {
				return false;
			}
		},
		pasteMaterCard: function(e) {
			var field = $(e.currentTarget);
			// always on paste event should set timeout to get value
			var tout = setTimeout(function() {
				field.val(App.util.text.formatInputText(field.val().substring(0, 16), ' '));
				clearTimeout(tout);
			});
		},
		formatMasterCard: function(e) {
			var field = $(e.currentTarget);
			field.val(App.util.text.formatInputText(field.val(), ' '));
		},
		renderExpringYear: function() {
			var expireYears = [];
			var yearNow = (new Date()).getFullYear();
			for (var i = 0; i < 25; i++) {
				expireYears.push('<option value="' + yearNow + '">' + yearNow + '</option>');
				yearNow++;
			}
			this.$('#expiry-year-input').append(expireYears);
		},
		checkValidateInputMaterCard: function() {
			var isValidated = true;
			if (!this.isRepurchase) {
				// validate form new card
				var cardNumber = this.$('#credit-card-number-input');
				var cardNumberVal = cardNumber.val();
				var secureCode = this.$('#secutity-code-input');
				var secureCodeVal = secureCode.val();
				if (!cardNumberVal || !secureCodeVal) {
					this.modalAlertView.show({ title: 'エラー', text: '入力に不備があります。入力内容をご確認ください。' });
					isValidated = false;
				} else if (cardNumberVal.length !== (+cardNumber.attr('length')) || secureCodeVal.length !== (+secureCode.attr('length'))) {
					this.modalAlertView.show({ title: 'エラー', text: '入力に不備があります。入力内容をご確認ください。' });
					isValidated = false;
				}
			} else {
				// validate form reuse card
				var secureCode = this.$('#reuse-secutity-code-input');
				var secureCodeVal = secureCode.val();
				if (!secureCodeVal) {
					this.modalAlertView.show({ title: 'エラー', text: '入力に不備があります。入力内容をご確認ください。' });
					isValidated = false;
				} else if (secureCodeVal.length !== (+secureCode.attr('length'))) {
					this.modalAlertView.show({ title: 'エラー', text: '入力に不備があります。入力内容をご確認ください。' });
					isValidated = false;
				}
			}
			return isValidated;
		},
		showCreditContentConfirmed: function() {
			var isValidated = this.checkValidateInputMaterCard();
			if (isValidated) {
				this.$('.multi-steps li').removeClass('is-active');
				this.$('.multi-steps li:nth-child(2)').addClass('is-active');
				window.scrollTo(0, 0);
				this.ui.paymentMethod.removeClass('show');
				this.ui.confirmCreditCard.removeClass('show');
				this.ui.paymentContentConfirm.addClass('show');
				this.ui.backToPaymentInfo.addClass('show');
				this.ui.orderConfirm.addClass('show');
				this.getCreditCardInfo();
			}
		},
		getCreditCardInfo: function() {
			if (this.isRepurchase) {
				var reuseSecurityCode = this.$('#reuse-secutity-code-input').val();
				this.data = {
					cardNumber: this.paymentPurchaseHistoryCollection.models[0].get('cardNumber')
				};
				_.extend(this.data, {
					securityCode: reuseSecurityCode,
				});
			} else {
				var cardNumber = this.$('#credit-card-number-input').val().replace(/ /g, '');
				var monthExpirydate = this.$('#expiry-month-input').val();
				var yearExpirydate = this.$('#expiry-year-input option:selected').text();
				var securityCode = this.$('#secutity-code-input').val();
				this.data = {
					cardNumber: cardNumber,
					monthExpirydate: monthExpirydate,
					yearExpirydate: yearExpirydate,
					securityCode: securityCode,
				};
			}
			this.$('.card-number').text('＊＊＊＊-＊＊＊＊-＊＊＊＊-' + this.data.cardNumber.slice(-4));
			this.$('.year-expiry-value').text(this.data.yearExpirydate);
			this.$('.month-expiry-value').text(this.data.monthExpirydate);
		},
		backToPaymentInfo: function() {
			this.$('.multi-steps li').removeClass('is-active');
			this.$('.multi-steps li:nth-child(1)').addClass('is-active');
			this.$('.card-number').text('＊＊＊＊-＊＊＊＊-＊＊＊＊-' + this.data.cardNumber.slice(- 4));
			this.ui.paymentMethod.addClass('show');
			this.ui.confirmCreditCard.addClass('show');
			this.ui.paymentContentConfirm.removeClass('show');
			this.ui.backToPaymentInfo.removeClass('show');
			this.ui.orderConfirm.removeClass('show');
		},
		swicthReuseCreditCard: function() {
			this.isRepurchase = this.$("input[name='reuse-credit-card']:checked").val() == 1;
			this.ui.reuseCardNumber.toggleClass('show');
			this.ui.reuseCard.toggleClass('show');
			this.ui.newCard.toggleClass('show');
		},
		handleOrderConfirm: function() {
			var _this = this;
			if (this.isRepurchase) {
				App.util.execWithProgressScreen(function() {
					return App.btApi.paymentRepurchase({
						securityCode: _this.data.securityCode,
						productCd: _this.ticketModel.get('code'),
						useRepurchase: _this.$("input[name='save-card']:checked").val() == 1,
					});
				}).done(function(res) {
					_this.purchaseSuccess();
					_this.passticketPurchaseCollection.clearCache();
				}).fail(function(err) {
					_this.modalAlertView.show({ title: 'エラー', text: '一時的にご利用いただけません。しばらく経ってから再度お試しください。' });
				});
			} else {
				App.util.execWithProgressScreen(function() {
					return App.btApi.getPayment4gToken({
						card_number: _this.data.cardNumber,
						card_expire: _this.data.monthExpirydate + '/' + _this.data.yearExpirydate.substring(2, 4),
						security_code: _this.data.securityCode
					});
				}).done(this.purchaseTicket.bind(this)).fail(this.handleGetPayment4gTokenFail.bind(this));
			}
		},
		handleGetPayment4gTokenFail: function(error) {
			this.modalAlertView.show({ title: 'エラー', text: 'カード情報をご確認ください。', text: error.responseJSON.message });
		},
		purchaseTicket: function(dataToken) {
			var _this = this;
			App.util.execWithProgressScreen(function() {
				return App.btApi.paymentPurchase({
					token: dataToken.token,
					tokenExpireDate: dataToken.token_expire_date,
					cardNumber: _this.data.cardNumber,
					productCd: _this.ticketModel.get('code'),
					useRepurchase: _this.$("input[name='save-card']:checked").val() == 1,
				});
			}).done(function(res) {
				_this.purchaseSuccess();
				_this.passticketPurchaseCollection.clearCache();
			}).fail(function(err) {
				_this.modalAlertView.show({ title: 'エラー', text: '一時的にご利用いただけません。しばらく経ってから再度お試しください。' });
			});
		},
		purchaseSuccess: function() {
			this.$('.multi-steps li').removeClass('is-active');
			this.$('.multi-steps li:nth-child(3)').addClass('is-active');
			this.ui.paymentContentConfirm.removeClass('show');
			this.ui.paymentSuccess.addClass('show');
			this.ui.closePayment.addClass('show');
			this.ui.backToPaymentInfo.removeClass('show');
			this.ui.orderConfirm.removeClass('show');
		},
		closePayment: function() {
			App.pageSlider.removeHistoryByLength(2); // remove out "pass-ticket-detail" and "payment-pass-ticket" from history
			location.hash = '#pass-ticket-detail/' + this.ticketModel.get('detail').id + '/2';
		},
		showDialogue: function() {
			this.modalConfirmView.show({ title: '確認画面', text: '画面を閉じてよろしいでしょうか？', okButton: '閉じる' }).then(function(res) {
				if (res === 1) {
					App.pageSlider.back();
				}
			});
		},
		onDestroy: function() {
			this.modalConfirmView.onDestroy();
			this.modalAlertView.onDestroy();
		},
	});

	return PaymentPassTicketLayout;
})();

},{"../../../modals/alert/modal_alert_view.js":190,"../../../modals/confirm/modal_confirm_view":193,"../../../models/passticket_purchase_collection.js":216,"../../../models/payment_purchase_history_collection.js":217,"./payment_pass_ticket_layout_template.html":90,"backbone":"5kFNoY"}],90:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="PAYMENT-PASS-TICKET" class="payment-pass-ticket bgcolor1">\n\t<div class="close-button" id="credit-cancel">\n\t\t<img class="cancel-icon" src="./image/common/cancel.png">\n\t</div>\n\t<div class="multi-steps-container">\n\t\t<ul class="multi-steps">\n\t\t\t<li class="is-active">お支払い方法</li>\n\t\t\t<li>ご確認</li>\n\t\t\t<li>お支払い完了</li>\n\t\t</ul>\n\t</div>\n\t<div class="touch payment-content">\n\t\t<div class="payment-info">\n\t\t\t<div class="payment-row-title">\n\t\t\t\t<div class="payment-col payment-type">\n\t\t\t\t\t商品名\n\t\t\t\t</div>\n\t\t\t\t<div class="payment-col payment-right">\n\t\t\t\t\t<span class="ticket-name"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="payment-row-title">\n\t\t\t\t<div class="payment-col payment-type">\n\t\t\t\t\tタイプ\n\t\t\t\t</div>\n\t\t\t\t<div class="payment-col payment-right">\n\t\t\t\t\t<span class="ticket-day">30</span>日定期券\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="payment-row-title payment-row-last">\n\t\t\t\t<div class="payment-col payment-type ">\n\t\t\t\t\tご請求額\n\t\t\t\t</div>\n\t\t\t\t<div class="payment-col payment-right">\n\t\t\t\t\t<span class="ticket-price">0</span>\n\t\t\t\t\t<span class="price-unit">円</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="payment-method payment-step show">\n\t\t\t<p class="payment-method-text">ご確認の上、お支払い情報を入力してください。</p>\n\t\t\t<div class="credit-card-info-header">お支払い方法</div>\n\t\t\t<div class="credit-card-info-body">\n\t\t\t\t<div class="credit-card-brand">\n\t\t\t\t\t<p class="text-info">■ ご利用可能なクレジットカード：VISA・マスターカード・Diners</p>\n\t\t\t\t\t<label class="container-radio-custom credit-card-lb">クレジットカード<input checked\n\t\t\t\t\t\t\tclass="credit-card-radio" type="radio" name="credit-card" value="1"><span\n\t\t\t\t\t\t\tclass="checkmark"></span></label>\n\t\t\t\t\t<div class="logos-card">\n\t\t\t\t\t\t<img src="./image/credit/visa.png" alt="">\n\t\t\t\t\t\t<img src="./image/credit/master.png" alt="">\n\t\t\t\t\t\t<img src="./image/credit/diners.png" alt="">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="credit-card-info-body-sub">\n\t\t\t\t\t<label class="container-radio-custom reuse-credit-card-lb">前回使用したカードを利用する<input checked\n\t\t\t\t\t\t\tclass="reuse-credit-card-radio" type="radio" name="reuse-credit-card" value="1"><span\n\t\t\t\t\t\t\tclass="checkmark"></span></label>\n\t\t\t\t\t<div class="reuse-card-number">\n\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t<div class="credit-card-title">カード番号</div>\n\t\t\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t\t\t<label class="card-number form-control-text"></label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="reuse-card">\n\t\t\t\t\t\t<form class="reuse-card-form">\n\t\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t\t<div class="credit-card-title">カード番号</div>\n\t\t\t\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t\t\t\t<label class="card-number form-control-text"></label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t\t<div class="credit-card-title">セキュリティコード</div>\n\t\t\t\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t\t\t\t<input required id="reuse-secutity-code-input"\n\t\t\t\t\t\t\t\t\t\tclass="form-control check-length-input" type="tel" length="3" max="999"\n\t\t\t\t\t\t\t\t\t\tvalue="">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<img class="secutity-code-img" src="./image/credit/secutity-code.png"\n\t\t\t\t\t\t\t\t\talt="secutity-code">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t\t<div class="credit-card-title">お支払い回数</div>\n\t\t\t\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t\t\t\t<label class="form-control-text">一括払い</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t\t<label class="container-radio-custom reuse-credit-card-lb">別のカードを利用する<input\n\t\t\t\t\t\t\tclass="reuse-credit-card-radio" type="radio" name="reuse-credit-card" value="0"><span\n\t\t\t\t\t\t\tclass="checkmark"></span></label>\n\n\t\t\t\t\t<div class="new-card">\n\t\t\t\t\t\t<form class="new-card-form">\n\t\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t\t<div class="credit-card-title">カード番号</div>\n\t\t\t\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t\t\t\t<input requried id="credit-card-number-input"\n\t\t\t\t\t\t\t\t\t\tclass="form-control check-length-input" type="tel" max="9999999999999999"\n\t\t\t\t\t\t\t\t\t\tlength="19" value="">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t\t<div class="credit-card-title">有効期限</div>\n\t\t\t\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t\t\t\t<div class="container-selectbox-custom">\n\t\t\t\t\t\t\t\t\t\t<select id="expiry-month-input" class="form-control month-expiry">\n\t\t\t\t\t\t\t\t\t\t\t<option value="01">01</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="02">02</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="03">03</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="04">04</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="05">05</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="06">06</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="07">07</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="08">08</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="09">09</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="10">10</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="11">11</option>\n\t\t\t\t\t\t\t\t\t\t\t<option value="12">12</option>\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t月\n\t\t\t\t\t\t\t\t\t<div class="container-selectbox-custom">\n\t\t\t\t\t\t\t\t\t\t<select id="expiry-year-input" class="form-control year-expiry">\n\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t年\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t\t<div class="credit-card-title">セキュリティコード</div>\n\t\t\t\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t\t\t\t<input required id="secutity-code-input" class="form-control check-length-input"\n\t\t\t\t\t\t\t\t\t\ttype="tel" max="999" length="3" value="">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<img class="secutity-code-img" src="./image/credit/secutity-code.png"\n\t\t\t\t\t\t\t\t\talt="secutity-code">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t\t<div class="credit-card-title">お支払い回数</div>\n\t\t\t\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t\t\t\t<label class="form-control-text">一括払い</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t\t\t<p class="text-note">\n\t\t\t\t\t\t\t\t\t※セキュリティコードが見つからない、または、ご不明な場合は、クレジットカード発行会社(カード裏面に印刷されている連絡先)にお問い合わせください。カード発行元会社によってはご利用頂けない場合もあります。\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t\t<label class="reuse-lb">次回もこのカードを利用する</label>\n\t\t\t\t\t\t<label class="container-radio-custom">利用する<input checked type="radio" name="save-card"\n\t\t\t\t\t\t\t\tvalue="1"><span class="checkmark"></span></label>\n\t\t\t\t\t\t<label class="container-radio-custom">利用しない<input type="radio" name="save-card" value="0"><span\n\t\t\t\t\t\t\t\tclass="checkmark"></span></label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="payment-content-confirm payment-step">\n\t\t\t<div class="credit-card-info-header">お支払い内容</div>\n\t\t\t<div class="credit-card-info-body">\n\t\t\t\t<div class="credit-card-brand">\n\t\t\t\t\t<label class="credit-card-lb">クレジットカード</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t<div class="credit-card-title">カード番号</div>\n\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t<label class="card-number form-control-text"></label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t<div class="credit-card-title">有効期限</div>\n\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t<label class="month-expiry-value form-control-text"></label> 月 <label\n\t\t\t\t\t\t\tclass="year-expiry-value form-control-text"></label> 年\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="credit-card-row">\n\t\t\t\t\t<div class="credit-card-title">お支払い回数</div>\n\t\t\t\t\t<div class="credit-card-input">\n\t\t\t\t\t\t<label class="form-control-text">一括払い</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<hr>\n\t\t\t\t<div class="credit-card-row">次回もこのカードを利用する</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="payment-success payment-step">\n\t\t\t<div class="credit-card-info-body">\n\t\t\t\t<p class="payment-success-text">お支払いが完了いたしました。</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="payment-credit-buttons">\n\t\t<button id="credit-confirm" class="payment-button credit-confirm show">確認画面へ</button>\n\t\t<button id="back-to-payment-content" class="payment-button back-to-payment-content">変更する</button>\n\t\t<button id="order-confirm" class="payment-button credit-confirm-first">支払う</button>\n\t\t<button id="close-payment" class="payment-button close-payment">画面を閉じる</button>\n\t</div>\n</div>\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'';
}
return __p;
};

},{}],91:[function(require,module,exports){
var BaseCollection = require('../../../models/base_collection.js');
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function() {
	var TicketModel = Backbone.Model.extend({
		idAttribute: "code",
	});
	var TicketCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/payments/products",
		model: TicketModel,
		initialize: function(options) {
			if (options) {
				this.pagination = options.pagination;
			}
		},
		parse: function(response) {
			return response.listProductMaster.map(this.parseModel.bind(this));
		},
		parseModel: function(item, index) {
			var salesEndAt = moment(item.salesEndAt, "YYYY-MM-DD").format("YYYY年MM月DD日");
			var hasBought = this.checkingTicketHasBought(item);
			return _.extend(item, {
				salesEndAt: salesEndAt,
				cardName: item.detail.name,
				cardPageTitle: item.detail.pageTitle,
				hasBought: hasBought,
			});
		},
		checkingTicketHasBought: function(item) {
			var hasBought = false;
			var ticketHasBought = this.coupons.findWhere({ id: item.detail.id });
			if (ticketHasBought && !item.dummy) {
				hasBought = true;
			}
			return hasBought;
		},
		fetchTicket: function(options) {
			this.coupons = options.coupons;
			var params = { perPage: 50 };
			if (options.rank) {
				params.rank = options.rank;
			}
			var _options = _.extend(options || {}, { getParams: params });
			return this.fetchWithAuthInfo(_options);
		},
	});
	return TicketCollection;
})();

},{"../../../models/base_collection.js":203,"backbone":"5kFNoY","moment":"iROhDJ"}],92:[function(require,module,exports){
var TicketItemView = require('./ticket_item_view.js');
var BaseCollectionView = require('../../../views/base_collection_view.js');
module.exports = (function() {
	var TicketCollectionView = BaseCollectionView.extend({
		childView: TicketItemView,
		tagName: 'div',
		className: 'ticket-list'
	});
	return TicketCollectionView;
})();

},{"../../../views/base_collection_view.js":240,"./ticket_item_view.js":94}],93:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a class="ticket-content" href="#pass-ticket-detail/'+
((__t=( code ))==null?'':_.escape(__t))+
'/1">\n\t';
 if(rank) { 
__p+='\n\t<div class="ticket-rank-title">\n\t\t<div class="ticket-rank-title-col limit">限定</div>\n\t\t<div class="ticket-rank-title-col rank-text">'+
((__t=( rank ))==null?'':_.escape(__t))+
'</div>\n\t</div>\n\t';
 } 
__p+='\n\t<div class="ticket-row-title">\n\t\t<div class="ticket-col ticket-type">\n\t\t\t'+
((__t=( name ))==null?'':_.escape(__t))+
'\n\t\t</div>\n\t\t<div class="ticket-col ticket-time">\n\t\t\t販売期間'+
((__t=( salesEndAt ))==null?'':_.escape(__t))+
'まで\n\t\t</div>\n\t</div>\n\t<div class="pass-ticket-detail-block">\n\t\t<div class="ticket-row-price">\n\t\t\t<div class="ticket-col ticket-discount">\n\t\t\t\t<span class="discount-title">\n\t\t\t\t\t'+
((__t=( cardPageTitle ))==null?'':_.escape(__t))+
'\n\t\t\t\t</span>\n\t\t\t\t<br />\n\t\t\t\t<span>\n\t\t\t\t\t'+
((__t=( cardName ))==null?'':_.escape(__t))+
'\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class="ticket-col ticket-price"> <span class="price-unit"><span class="price">\n\t\t\t\t\t\t'+
((__t=( unitPrice ))==null?'':_.escape(__t))+
'</span>円</span></div>\n\t\t</div>\n\t\t<div class="ticket-button-detail">\n\t\t\t<span class="button-detail">詳細を見る</span>\n\t\t</div>\n\t</div>\n</a>\n';
 if(hasBought) { 
__p+='\n<!-- todo -->\n<div class="ticket-overlay">\n\t<div class="ticket-overlay-bought-text">\n\t\t<span class="text">購入済み</span>\n\t</div>\n</div>\n';
 } 
__p+='';
}
return __p;
};

},{}],94:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {
	var TicketItemView = Backbone.Marionette.ItemView.extend({
		tagName: "div",
		className: 'ticket-item-wrapper',
		template: require('./ticket_item_template.html'),
		ui: {
			"ticketItem": '.ticket-content'
		},
		events: function() {
			var iosEvent = {
				'touchend @ui.ticketItem': 'selectTicket'
			};
			var androidEvent = {
				'click @ui.ticketItem': 'selectTicket'
			};
			return (applican.config.device_os === "IOS") ? iosEvent : androidEvent;
		},
		selectTicket: function() {
			// get date item for pass-ticket-detail
			window.passTicketDetailModel = this.model;
		}
	});

	return TicketItemView;

})();

},{"./ticket_item_template.html":93,"backbone":"5kFNoY"}],95:[function(require,module,exports){
var Backbone = require('backbone');
var AvailableCouponItemView = require('./available_coupon_item_view.js');
module.exports = (function () {
	var AvailableCouponCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: AvailableCouponItemView,
		tagName: 'ol',
		className: 'COUPONS'
	});
	return AvailableCouponCollectionView;
})();

},{"./available_coupon_item_view.js":97,"backbone":"5kFNoY"}],96:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="#point/exchange_coupon/'+
((__t=( id ))==null?'':__t)+
'">\r\n\t<div class="box_images">\r\n\t\t<img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'">\r\n  </div> <!-- box_images -->\r\n\t<div class="coupon_info">\r\n\t\t<div class="coupon_name">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n\t\t<div class="coupon_price hlftcolor3">'+
((__t=( exchangePoint ))==null?'':__t)+
'<span class="coupon_price_words ftcolor3"><span class="wallet-color">ポイントと</span>交換</span></div>\r\n\t</div>\r\n</a>\r\n\r\n';
}
return __p;
};

},{}],97:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var AvailableCouponItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./available_coupon_item_template.html'),
		templateHelpers: {
		},
	});

	return AvailableCouponItemView;

})();

},{"./available_coupon_item_template.html":96,"backbone":"5kFNoY"}],98:[function(require,module,exports){
var Backbone = require('backbone');
var CouponMasterModel = require('../../models/coupon_master_model.js');
var ExchangeCouponMainView = require('./exchange_coupon_main_view.js');
var PointModel = require('../../models/point_model.js');
var $ = require('jquery');
module.exports = (function () {

	var ExchangeCouponLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./exchange_coupon_layout_template.html'),
		regions: {
			'exchangeCouponRegion' : "#exchange-coupon-region",
			'exchangeStatusRegion' : "#exchange-status-region"
		},
		initialize: function( options ){
			var options = options || {};
			this.couponMasterModel = new CouponMasterModel({ id: options.id });
			this.pointModel = new PointModel();
			this.listenToOnce(this.couponMasterModel ,'sync-with-point',this._renderCoupon );
			this._fetchCoupon();
		},
		onRender: function(){
		},
		headerConf: {
			title: "ポイントクーポン詳細",
			showBackButton: true,
		},
		_fetchCoupon: function(){
			var _this = this;
			var requestAction = function(){
				return $.when( _this.couponMasterModel.fetchCoupon(), _this.pointModel.fetchWithAuthInfo())
				.done(function(data,data2){
					_this.couponMasterModel.setUserPoint( _this.pointModel.get("point") );
					_this.couponMasterModel.trigger('sync-with-point');
				});
			};
			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ));
		},
		_renderCoupon: function(){
			this.exchangeCouponRegion.show( new ExchangeCouponMainView({ model: this.couponMasterModel }) );
			var exchangePoint = this.couponMasterModel.get('exchangePoint') || 0;
			var point = this.pointModel.get('point') || 0;
			if(point < exchangePoint){
				this.$('#exchange-coupon-btn').attr('disabled', true);
			}
		},
	});

	return ExchangeCouponLayout;
})();

},{"../../models/coupon_master_model.js":210,"../../models/point_model.js":218,"./exchange_coupon_layout_template.html":99,"./exchange_coupon_main_view.js":101,"backbone":"5kFNoY","jquery":"HlZQrA"}],99:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="EXCHANGE-COUPON-MAIN" class="BACKBONE-PAGE">\r\n\r\n\t<div id="exchange-coupon-region" class="bgcolor1">\r\n\t</div>\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n\r\n';
}
return __p;
};

},{}],100:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!-- CouponMasterModel : with attribute "userPoint" -->\r\n<div id="exchange-padding" class="padding"></div>\r\n<div id="exchange-status" class="hlbgcolor2">\r\n</div>\r\n\r\n<div><!-- CouponMasterModel : with attribute "userPoint" -->\r\n\t<div class="box_img_detail"><img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'"></div>\r\n\t<div class="point_title ftcolor1">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n\t<div class="point_detail ftcolor3">'+
((__t=( App.util.text.nl2br( detailText ) ))==null?'':__t)+
'</div>\r\n\t<dl>\r\n\t\t<dt class="point_cost_title ftcolor1">交換に必要なポイント</dt>\r\n\t\t<dd class="point_price hlftcolor3">'+
((__t=( exchangePoint ))==null?'':__t)+
'<span class="point_price_words ftcolor3">ポイント（使用後：'+
((__t=( userPoint - exchangePoint ))==null?'':__t)+
'ポイント）</span></dd>\r\n';
 if( usePeriodType + "" === "0" ){ 
__p+='\r\n\t\t<dt class="point_time_title ftcolor1">利用期間</dt>\r\n\t\t<dd class="ftcolor3">'+
((__t=( formatDate( usePeriodStartDate ) ))==null?'':__t)+
' ～ '+
((__t=( formatDate( usePeriodEndDate ) ))==null?'':__t)+
'</dd>\r\n';
 }else{ 
__p+='\r\n\t\t<dt class="point_time_title ftcolor1">有効期限</dt>\r\n\t\t<dd class="ftcolor3">発行日より'+
((__t=(  usePeriodValue  ))==null?'':__t)+
'日</dd>\r\n';
 } 
__p+='\r\n\r\n\t\t<dt class="point_check_title ftcolor1">利用条件</dt>\r\n';
 if( useCondNumber  ){ 
__p+='\r\n\t\t<dd class="ftcolor3">回数制限:合計'+
((__t=( useCondNumber ))==null?'':__t)+
'回まで利用可能</dd>\r\n';
 } 
__p+='\r\n';
 if( useCondLimit  ){ 
__p+='\r\n\t<dd class="ftcolor3">先着'+
((__t=( useCondLimit ))==null?'':__t)+
'名まで利用可能</dd>\r\n';
 } 
__p+='\r\n\r\n\t\t<dt class="point_attention_title ftcolor1">備考・注意事項</dt>\r\n\t\t<dd class="ftcolor3">'+
((__t=( App.util.text.nl2br( note ) ))==null?'':__t)+
'</dd>\r\n\t</dl>\r\n\t<div class="btn_area">\r\n\t\t<button type="button" id="exchange-coupon-btn" class="btbgcolor1 btftcolor1">このクーポンと交換する</button>\r\n\t</div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n';
}
return __p;
};

},{}],101:[function(require,module,exports){
var Backbone = require('backbone');
var PointModel = require('../../models/point_model.js');
var CouponCollection = require('../../models/coupon_collection.js');
var moment = require('moment');
module.exports = (function () {

	var ExchangeCouponMainView = Backbone.Marionette.ItemView.extend({
		template: require('./exchange_coupon_main_template.html'),
		exchangeStatusTemplate: require('./exchange_coupon_status_template.html'),
		ui:{
			"exchangeCouponBtn" : "#exchange-coupon-btn",
			"useCouponBtn" : ".use-coupon-button",
			"exchangePadding" : "#exchange-padding",
		},
		events:{
			"click @ui.exchangeCouponBtn" : "_exchangeCoupon",
		},
		initialize: function(){
			this.pointModel = new PointModel();
			this.couponCollection = new CouponCollection();
			this.listenTo( this, 'exchange', this.onExchange);
			this.exchanged = false;
		},
		templateHelpers:{
			formatDate: function( dateTime ){
				if( !dateTime ) return "";
				return moment( dateTime ).format("YYYY/MM/DD HH:mm:ss");
			},
		},
		onRender: function(){
		},
		onExchange: function( data ){
			this.exchanged = true;
			this.ui.exchangeCouponBtn.addClass('DISABLE');
			this.ui.exchangeCouponBtn.html('交換済み');
			this._showExchangeStatus( data.coupon );
			this.ui.exchangePadding.removeClass('padding');
		},
		_exchangeCoupon: function( e ){
			e.preventDefault();
			if( this.exchanged ) return false;
			var _this = this;
			var requestAction = function(){
				return App.btApi.exchangeCoupon( _this.model.get("id") )
			};

			App.util.bindCommonErrorHandling(
				App.util.execWithProgressScreen( requestAction ),{ ignoreStatuses: [403] })
				.done(function(data){
					_this.pointModel.clearCache();
					_this.trigger('exchange', { coupon: data.coupon} );
					_this.couponCollection.clearCache();
				}).fail(function(err){
					if(err.status === 403){
						applican.notification.alert("ポイントを確認してください。", App.doNothing, "", "OK");
					}else{
						// その他のエラーは bindCommonErrorHandling でハンドル済み
					}
				});
		},
		_showExchangeStatus: function(coupon){
			this.$('#exchange-status').html( this.exchangeStatusTemplate({
				exchangeDate: moment().format("YYYY/MM/DD HH:mm"),
				couponId: coupon.id,
				uCoupId: coupon.uCoupId,
			}));
			$("#EXCHANGE-COUPON-MAIN").scrollTop(0);
		}

	});

	return ExchangeCouponMainView;

})();

},{"../../models/coupon_collection.js":207,"../../models/point_model.js":218,"./exchange_coupon_main_template.html":100,"./exchange_coupon_status_template.html":102,"backbone":"5kFNoY","moment":"iROhDJ"}],102:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="use-status-view" class="hlftcolor2">\r\n\t<div class="point_status">クーポンを取得しました！</div>\r\n\t<div class="point_time">取得日時: '+
((__t=(  exchangeDate  ))==null?'':__t)+
'</div>\r\n</div>\r\n<div class="btn_area_exchange">\r\n\t<div>\r\n\t\t<a href="#coupon/'+
((__t=( couponId ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'">\r\n\t\t\t<button type="button" class="hl2_btbgcolor1 hl2_btftcolor1 use-coupon-btn">このクーポンを使う</button>\r\n\t\t</a>\r\n\t</div>\r\n\t<div><a href="#coupon"><button type="button" id="coupon-list-btn" class="hl2_btbgcolor2 hl2_btftcolor2">クーポン一覧を見る</button></a></div>\r\n</div>\r\n';
}
return __p;
};

},{}],103:[function(require,module,exports){
var PointModel = require('../../models/point_model.js');
var CouponCollection = require('../../models/coupon_master_collection.js');
var AvailableCouponCollectionView = require('./available_coupon_collection_view.js');
var Backbone = require('backbone');
module.exports = (function () {

	var PointMainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./point_main_template.html'),
		regions: {
			"availableCouponRegion": "#available-coupon-region"
		},
		initialize: function(){
			this.couponCollection = new CouponCollection();
			this.pointModel = new PointModel();

			App.util.bindProgressScreen(this, this.couponCollection );
			this.listenTo(this.couponCollection, 'sync', this._renderCoupons);
			this.listenTo(this.pointModel, 'sync', this._renderPoint);
		},
		onRender: function(){
			this.couponCollection.fetchPointExchangeable();
			this.pointModel.fetchWithAuthInfo();
		},
		headerConf: {
			title: "ポイント",
			showBackButton: true,
		},
		_renderCoupons: function(){
			this.availableCouponRegion.show( new AvailableCouponCollectionView({
				collection: this.couponCollection
			}));
		},
		_renderPoint: function(){
			var point = App.util.text.numberWithDelimiter( this.pointModel.get("point") );
			this.$('.point-text').html( point );
		}
	});

	return PointMainLayout;
})();

},{"../../models/coupon_master_collection.js":209,"../../models/point_model.js":218,"./available_coupon_collection_view.js":95,"./point_main_template.html":104,"backbone":"5kFNoY"}],104:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="POINT-MAIN" class="BACKBONE-PAGE">\r\n\r\n\t<div class="current_point">\r\n\t\t<span class="point-title">現在のポイント数</span>\r\n\t\t<span class="point-text">0</span>\r\n\t\t<span class="point-unit">pt</span>\r\n\t</div>\r\n\t<div class="point_status">\r\n\t\t<div class="condition">\r\n\t\t\t<div class="condition_title ftcolor1">利用条件</div>\r\n\t\t\t<div class="condition_words ftcolor3">特典内容は、予告なく変更される場合があります。\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div id="available-coupon-region" class="bgcolor1 ftcolor1">\r\n\t</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],105:[function(require,module,exports){
var Backbone = require('backbone');
var PointMainLayout = require("./point_main_layout.js");
var ExchangeCouponLayout = require("./exchange_coupon_layout.js");
module.exports = (function () {

	var PointController = Backbone.Marionette.Controller.extend({
		showPointMainView: function(){
			var pointMainLayout = new PointMainLayout();
			pointMainLayout.render();
			App.pageSlider.slidePage( pointMainLayout );
			App.headerModel.applyViewHeaderConf( pointMainLayout.headerConf );
		},
		showExchangeCoupon: function(id){
			var options = { id: id };
			var exchangeCouponLayout = new ExchangeCouponLayout( options );
			exchangeCouponLayout.render();
			App.pageSlider.slidePage( exchangeCouponLayout );
			App.headerModel.applyViewHeaderConf( exchangeCouponLayout.headerConf );
		},
	});

	var pointController = new PointController();
	var PointRouter = Backbone.Marionette.AppRouter.extend({
		controller: pointController,
		appRoutes: {
			"point" : "showPointMainView",
			"point/exchange_coupon/:id" : "showExchangeCoupon",
		}
	});

	return PointRouter;

})();

},{"./exchange_coupon_layout.js":98,"./point_main_layout.js":103,"backbone":"5kFNoY"}],106:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function () {

	var RegisterLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./register_blankmail_layout_template.html'),
		regions: {
		},
		initialize: function(options){
			this.regtype = options.regtype;
			this.model = new Backbone.Model();
			
			this.model.set("regtype", this.regtype);
			if (AppConf.register[this.regtype]) {
				this.model.set("registerMail", AppConf.register[this.regtype].registerMail);
				this.model.set("registerDomain", AppConf.register[this.regtype].registerDomain);
				this.model.set("blankmailId", AppConf.register[this.regtype].blankmailId);
			} else {
				this.model.set("registerMail", "");
				this.model.set("registerDomain", "");
				this.model.set("blankmailId", "");
			}
			
			this.listenTo(this, "load:sync", this.onLoad);
		},
		headerConf: {
			title: "新規登録",
			showBackButton: true,
			showConfigIcon: false,
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
	});

	return RegisterLayoutView;
})();

},{"./register_blankmail_layout_template.html":107,"backbone":"5kFNoY"}],107:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="REGISTER-MAIN" class="BACKBONE-PAGE">\r\n\t<div class="info">会員(無料)にご登録いただくには、まず空メールを送信してください。</div>\r\n\t';
 if( registerMail ){ 
__p+='\r\n\t<a href="mailto:'+
((__t=( registerMail ))==null?'':__t)+
'?subject=このまま送信してください" class="singup btbgcolor1 btftcolor1 font-bold">空メール送信</a>\r\n\t';
 } 
__p+='\r\n\t';
 if( blankmailId ){ 
__p+='\r\n\t<div class="inpumaillink"><a href="#inputmail/'+
((__t=( regtype ))==null?'':__t)+
'">空メールが起動しない方はこちらをクリック</a></div>\r\n\t';
 } 
__p+='\r\n\t<div class="info">＜登録方法＞</div>\r\n\t<div class="info">１．「空メール送信ボタン」を押して空メールを送信してください。</div>\r\n\t<div class="info">２．受信した自動返信メールに記載のURLを押下すると、登録画面が表示されます。</div>\r\n\t<div class="info">３．必要な項目にご回答いただき、送信ボタンを押下してください。</div>\r\n\t<div class="info">４．以上で登録完了です。</div>\r\n\t<div class="info hlftcolor4">\r\n\t';
 if( registerDomain ){ 
__p+='\r\n\t※空メールが起動しない（端末でメールが送れない）方は「<span class="text-underline"><a href="#inputmail/'+
((__t=( regtype ))==null?'':__t)+
'">空メールが起動しない方はこちらをクリック</a></span>」をタップして、メールアドレスを入力して登録を行ってください。<br>\r\n\t※自動返信メールが受信できない場合は以下のアドレスからのメールが受信出来るようにドメイン指定受信許可設定を行って下さい｡<br>\r\n\tドメイン：<br>\r\n\t<input type="text" value="'+
((__t=( registerDomain ))==null?'':__t)+
'">\r\n\t';
 } 
__p+='\r\n\t</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],108:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function () {

	var RegisterInputmailLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./register_inputmail_layout_template.html'),
		regions: {
		},
		ui: {
			"inputId" : "[name=user-id]",
			"sendBtn" : "#send-btn",
			"mailinputDiv" : "#mailinputDiv",
			"mailsendDiv" : "#mailsendDiv",
		},
		events: {
			"click @ui.sendBtn" : "execSend",
		},
		initialize: function(options){
			this.regtype = options.regtype;
			this.model = new Backbone.Model();
			
			if (AppConf.register[this.regtype]) {
				this.model.set("registerDomain", AppConf.register[this.regtype].registerDomain);
				this.model.set("blankmailId", AppConf.register[this.regtype].blankmailId);
			} else {
				this.model.set("registerDomain", "");
				this.model.set("blankmailId", "");
			}

			this.listenTo(this, "load:sync", this.onLoad);
		},
		headerConf: {
			title: "新規登録",
			showBackButton: true,
			showConfigIcon: false,
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
		execSend: function(){
			var userid = this.ui.inputId.val();
			var _this = this;
			if(userid === '') {
				var errorMsg = "メールアドレスを入力して下さい";
				applican.notification.alert(errorMsg, App.doNothing, "", "OK");
				return false;
			}

			var loginRequest = function(){
				return App.util.bindCommonErrorHandling(
					App.btApi.sendBlankmail(AppConf.register[_this.regtype].blankmailId, userid),
					{ ignoreStatuses: [500] }
				);
			};

			applican.notification.confirm("下記にメールを送信いたします。よろしいですか？\n" + userid, confirmCallback, "メール送信", "はい,いいえ");
			function confirmCallback(buttonIndex){
				if (buttonIndex === 1) {
					// ログインリクエストを実行
					App.util.execWithProgressScreen( loginRequest )
					.done( function(data){
						var errorCode = data.errorCode;
						var fromAddress = data.fromAddress;
						if (errorCode === "0000") {
							// 正常
							_this.ui.mailinputDiv.addClass("HIDE");
							_this.ui.mailsendDiv.removeClass("HIDE");
						} else if (errorCode === "0010") {
							applican.notification.alert("正しいメールアドレスを入力してください。" + "errorCode:" + errorCode, App.doNothing, "", "OK");
						} else if (errorCode === "0020") {
							applican.notification.alert("正しいメールアドレスを入力してください。" + "errorCode:" + errorCode, App.doNothing, "", "OK");
						} else {
							applican.notification.alert("メール送信に失敗しました。しばらくたってから再度送信してください。" + "errorCode:" + errorCode, App.doNothing, "", "OK");
						}
					}).fail(function(err){
						if(err.status === 500){
							applican.notification.alert("メール送信に失敗しました。しばらくたってから再度送信してください。" + "errorCode:" + err.status, App.doNothing, "", "OK");
						}else{
							// その他のエラーは bindCommonErrorHandling でハンドル済み
						}
					});
				}
			}

		},
	});

	return RegisterInputmailLayoutView;
})();

},{"./register_inputmail_layout_template.html":109,"backbone":"5kFNoY"}],109:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="REGISTER-MAIN" class="BACKBONE-PAGE">\r\n\t<div id="mailinputDiv">\r\n\t<div class="info">会員登録方法が記載されたメールを送信いたします。メールアドレスを入力して「メールを送信」ボタンを押してください。</div>\r\n\t<input type="text" name="user-id" id="user-id">\r\n\t';
 if( blankmailId ){ 
__p+='\r\n\t<button type="button" id="send-btn" class="login-btn btbgcolor1 btftcolor1">メールを送信</button>\r\n\t';
 } 
__p+='\r\n\t<div class="info">１．「メールを送信」を押して空メールを送信してください。</div>\r\n\t<div class="info">２．受信した自動返信メールに記載のURLを押下すると、登録画面が表示されます。</div>\r\n\t<div class="info">３．必要な項目にご回答いただき、送信ボタンを押下してください。</div>\r\n\t<div class="info">４．以上で登録完了です。</div>\r\n\t<div class="info hlftcolor4">\r\n\t';
 if( registerDomain ){ 
__p+='\r\n\t※自動返信メールが受信できない場合は以下のアドレスからのメールが受信出来るようにドメイン指定受信許可設定を行って下さい｡<br>\r\n\tドメイン：<br>\r\n\t<input type="text" value="'+
((__t=( registerDomain ))==null?'':__t)+
'">\r\n\t';
 } 
__p+='\r\n\t</div>\r\n\t</div>\r\n\t<div id="mailsendDiv" class="HIDE">\r\n\t<div class="info">会員登録方法が記載されたメールを送信いたしました。</div>\r\n\t</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],110:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function () {

	var RegisterLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./register_layout_template.html'),
		regions: {
		},
		ui: {
			"cancelBtn" : ".cancel-btn",
		},
		events: {
			"click @ui.cancelBtn" : "execCancel",
		},
		initialize: function(){
			this.listenTo(this, "load:sync", this.onLoad);
		},
		headerConf: {
			title: "新規登録",
			showBackButton: true,
			showConfigIcon: false,
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
		execCancel: function(){
			App.pageSlider.backAndRestartHistory();
		},
	});

	return RegisterLayoutView;
})();

},{"./register_layout_template.html":111,"backbone":"5kFNoY"}],111:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="REGISTER-MAIN" class="BACKBONE-PAGE">\r\n\t';
 if( AppConf.register.webview ){ 
__p+='\r\n\t<a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.registerUser, ['launch_webview=yes']) ))==null?'':__t)+
'" class="singup btbdcolor1 btftcolor2">メールアドレスで登録希望の方</a>\r\n\t';
 }else{ 
__p+='\r\n\t<a href="#blankmail/mail1" class="singup btbdcolor1 btftcolor2">メールアドレスで登録希望の方</a>\r\n<!-- \t<a href="#blankmail/mail2" class="singup btbdcolor1 btftcolor2">メールアドレスで登録希望の方</a> -->\r\n<!-- \t<a href="#blankmail/mail3" class="singup btbdcolor1 btftcolor2">メールアドレスで登録希望の方</a> -->\r\n\t';
 } 
__p+='\r\n    ';
 if( AppConf.features.sms ){ 
__p+='\r\n\t<a href="#loginSms" class="singup btbdcolor1 btftcolor2">電話番号で登録希望の方</a>\r\n    ';
 } 
__p+='\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],112:[function(require,module,exports){
var Backbone = require('backbone');
var RegisterLayoutView = require('./register_layout.js');
var RegisterBlankmailLayoutView = require('./register_blankmail_layout.js');
var RegisterInputmailLayoutView = require('./register_inputmail_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var RegisterController = Backbone.Marionette.Controller.extend({
		showRegister: function(){
			var registerLayoutView = new RegisterLayoutView();
			registerLayoutView.render();
			App.pageSlider.slidePage( registerLayoutView );
			App.headerModel.applyViewHeaderConf( registerLayoutView.headerConf );
			registerLayoutView.trigger("load:sync");
		},
		showBlankmail: function(regtype){
			var registerBlankmailLayoutView = new RegisterBlankmailLayoutView({
				regtype: regtype,
			});
			registerBlankmailLayoutView.render();
			App.pageSlider.slidePage( registerBlankmailLayoutView );
			App.headerModel.applyViewHeaderConf( registerBlankmailLayoutView.headerConf );
			registerBlankmailLayoutView.trigger("load:sync");
		},
		showInputmail: function(regtype){
			var registerInputmailLayoutView = new RegisterInputmailLayoutView({
				regtype: regtype,
			});
			registerInputmailLayoutView.render();
			App.pageSlider.slidePage( registerInputmailLayoutView );
			App.headerModel.applyViewHeaderConf( registerInputmailLayoutView.headerConf );
			registerInputmailLayoutView.trigger("load:sync");
		},
	});

	var registerController = new RegisterController();

	var RegisterRouter = Backbone.Marionette.AppRouter.extend({
		controller: registerController,
		appRoutes: {
			"register" : "showRegister",
			"blankmail/:regtype" : "showBlankmail",
			"inputmail/:regtype" : "showInputmail",
		}
	});

	return RegisterRouter;

})();

},{"./register_blankmail_layout.js":106,"./register_inputmail_layout.js":108,"./register_layout.js":110,"backbone":"5kFNoY","querystring":"SZ5xis"}],113:[function(require,module,exports){
var Backbone = require('backbone');
var UserModel = require('../../models/user_model.js');
var CouponCollection = require('../../models/coupon_collection.js');
var ModalConfirmView = require('../../modals/confirm/modal_confirm_view');
require('../../../../../lib/components/wscratchPad/wScratchPad.js');
window.isQuickScratch = false;

module.exports = (function () {

	var ScratchMainLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./scratch_main_layout_template.html'),
		regions: {
		},
		events: {
			'click .btn-start' : 'startScratch',
			'click .btn-return' : 'goToHome',
			'click .btn-retry' : 'fn_Reload',
			'click #alt-link' : 'fn_getResult'
		},
		headerConf: {
			title: "スクラッチ",
			hideHeader: true,
			showBackButton: false
		},
		initialize: function(options) {
			this.animeFlag = false;
			this.userModel = new UserModel();
			this.modalConfirmView = new ModalConfirmView();
			this.listenTo(this, 'load:sync', this.onLoad);
			this.couponCollection = new CouponCollection();
		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
		onLoad: function() {
			var hWindow = $(window).height();
			$('.inner-scratch-page').css({ height: hWindow + 'px' });
			$('.index-content').css({ height: hWindow + 'px' });
			this.setPostion();
			$(".progress-screen").css({"margin-top": "-44px"});
			if (!AppConf.scratch.showGuide) {
				this.startScratch();
			}
		},
		setPostion: function() {
			var hWindow = $(window).height(),
                hPlayScratch = $('.play-scratch').height(),
                distance = hWindow - hPlayScratch;
            $('.play-scratch').css({ top: distance/2 + 'px' });
		},
		startScratch: function(e) {
			if (e) {
				e.preventDefault();
			}
			App.util.showProgressScreen();
			var _this = this;
			if ( AppConf.scratch.type === 2 ) {
				this.hideContent();
				this.userModel.fetchWithAuthInfo().done(function(data){
					var member = data.member[0];
      				var extras = member.extras;
      				var shopId = "";
      				if ( extras ) {
      					shopId = App.util.text.setValue(_.findWhere(extras, {name : '店舗ID'}));
      					_this.showPlayScratch({shopId: shopId});
      				} else {
      					$('#resImg').parent('div').html('エラーが発生しました。<br>ページを再読み込みして下さい。').show();
      					App.util.hideProgressScreen();
      				}
				})
				.fail(function(err) {
					if ( err.status != 401 ) {
						$('#resImg').parent('div').html('エラーが発生しました。<br>ページを再読み込みして下さい。').show();
					}
				});
			} else {
				this.hideContent();
				this.showPlayScratch({shopId: ""});
			}
		},
		goToHome: function(e) {
			App.pageSlider.backAndRestartHistory();
		},
		showPlayScratch: function(options) {
			var shopId = options.shopId || "";
			var _this = this;
			$('#play-scratch').wScratchPad({
				size : AppConf.scratch.size,
				scratchId: AppConf.scratch.scratchId,
				custId: AppConf.scratch.custId,
				shopId: shopId,
				scratchMove : function (e, percent) {
					if (percent > 60 && !_this.animeFlag ) {
						App.util.showProgressScreen();
						_this.animeFlag = true;
						this.setResult();
						_this.couponCollection.clearCache();
					}
				}
			});
			$("#alt-link").show();
		},
		fn_Reload: function() {
			this.hideContent();
			this.setPostion();
			this.animeFlag = false;
			$('#play-scratch').wScratchPad('reset');
			$('#alt-link').show();
		},
		fn_getResult: function(e) {
			this.modalConfirmView.show(
				{ 
					title: '確認', 
					text: 'スクラッチを使用しますがよろしいでしょうか？', 
					okButton: '確認' 
				}
			).then(function(res) {
				if (res === 1) {
					window.isQuickScratch = true;
					var _this = $(e.currentTarget);
					$('#play-scratch').wScratchPad('getResult', true);
					$(_this).hide();
				}
			});
			
		},
		hideContent: function() {
			$('.guide-content').addClass('hide');
			$('.index-content').removeClass('hide');
			$('.btn-scratch').addClass('hide');
			$('.btn-return').removeClass('hide');
			$("#win-msg").hide();
			$('#alt-link').hide();
		},
		onDestroy: function() {
			this.modalConfirmView.onDestroy();
			window.isQuickScratch = false;
		},
	});

	return ScratchMainLayout;
})();

},{"../../../../../lib/components/wscratchPad/wScratchPad.js":3,"../../modals/confirm/modal_confirm_view":193,"../../models/coupon_collection.js":207,"../../models/user_model.js":222,"./scratch_main_layout_template.html":114,"backbone":"5kFNoY"}],114:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="scratch-page">\r\n\t<div class="inner-scratch-page">\r\n\t\t<div class="guide-content">\r\n\t\t\t<div class="top-banner">\r\n\t\t\t\t<img src="./image/scratch/guide_main.png" alt="">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- /.guide-content -->\r\n\t\t<div class="index-content hide">\r\n\t\t\t<div class="box-scratch-card">\r\n\t\t\t\t<div id="play-scratch" class="play-scratch">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id="btnContainer">\r\n\t\t\t\t\t<input type="button" value="Reset" onclick="$(\'#play-scratch\').wScratchPad(\'reset\');"/>\r\n\t\t\t\t\t<input type="button" value="Clear" onclick="$(\'#play-scratch\').wScratchPad(\'clear\');"/>\r\n\t\t\t\t\t<input type="button" value="Enable" onclick="$(\'#play-scratch\').wScratchPad(\'enable\', true);"/>\r\n\t\t\t\t\t<input type="button" value="Disable" onclick="$(\'#play-scratch\').wScratchPad(\'enable\', false);"/>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- /.index-content -->\r\n\t\t<div class="group-btn-control">\r\n\t\t\t<p id="win-msg" style="display:none;">クーポン一覧に引換えクーポンを入れさせて<br>いただきました。店頭でお引換ください。</p>\r\n\t\t\t<button type="button" id="btnRetry" class="btn-retry btn-scratch hide">もう一度チャレンジ！</button>\r\n\t\t\t<button type="button" class="btn-start btn-scratch">スクラッチをする</button>\r\n\t\t\t<button type="button" class="btn-return btn-scratch">トップに戻る</button>\r\n\t\t\t<br><a id="alt-link">スクラッチが削れない方はこちら</a>\r\n\t\t</div>\r\n\t</div>\r\n\t<!-- /.inner-scratch-page -->\r\n</div>\r\n<!-- /#scratch-page -->\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'';
}
return __p;
};

},{}],115:[function(require,module,exports){
var Backbone = require('backbone');
var ScratchMainLayout = require("./scratch_main_layout.js");
module.exports = (function () {

	var ScratchController = Backbone.Marionette.Controller.extend({
		showScratchMain: function(){
			var scratchMainLayout = new ScratchMainLayout();
			scratchMainLayout.render();
			App.pageSlider.slidePage( scratchMainLayout );
			App.headerModel.applyViewHeaderConf( scratchMainLayout.headerConf );
			scratchMainLayout.trigger('load:sync');
		},
	});

	var scratchController = new ScratchController();

	var ScratchRouter = Backbone.Marionette.AppRouter.extend({
		controller: scratchController,
		appRoutes: {
			"scratch" : "showScratchMain",
		}
	});

	return ScratchRouter;

})();

},{"./scratch_main_layout.js":113,"backbone":"5kFNoY"}],116:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollectionView = require('../../../views/base_collection_view.js');
var CategoryItemView = require('./category_item_view.js');
module.exports = (function () {
	var CategoryCollectionView = BaseCollectionView.extend({
		childView: CategoryItemView,
		tagName: 'ol',
		className: 'CATEGORIES',
		initialize: function( options ){
			this.conditionModel = options.conditionModel; // SearchConditionModel
		},
		childEvents: {
			"select:category" : function( childView, model ){
				this.conditionModel.pushParentObject({ id: model.get("id"), name: model.get("name") });
			},
		},

	});
	return CategoryCollectionView;
})();

},{"../../../views/base_collection_view.js":240,"./category_item_view.js":118,"backbone":"5kFNoY"}],117:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="row ftcolor1">\r\n\t<div class="shopName">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n</div>\r\n';
}
return __p;
};

},{}],118:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var CategoryItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor1",
		template: require('./category_item_template.html'),
		events: {
			"click" : "onSelect"
		},
		templateHelpers: {
		},
		onSelect: function(e){
			e.preventDefault();
			if( this.model.isShop() ){
				location.hash = "shop/" + this.model.get("id");
			}else{
				this.trigger('select:category', this.model);
			}
		},
	});

	return CategoryItemView;

})();

},{"./category_item_template.html":117,"backbone":"5kFNoY"}],119:[function(require,module,exports){
var Backbone = require('backbone');
var CategoryCollectionView = require('./category_collection_view.js');
var CategoryCollection = require('../../../models/category_collection.js');

module.exports = (function () {

	var CategoryListMain = Backbone.Marionette.LayoutView.extend({

		template: require('./category_list_main_template.html'),
		regions: {
			"listRegion" : ".list",
			"selectedCategoriesRegion" : "#selected-categories",
		},
		initialize: function(options){
			this.conditionModel = options.conditionModel;
			this.listenTo( this.conditionModel, 'change:categories', this._renderCategories );
		},
		onRender: function(){
			this._renderSelectedCategories();
			this._renderCategories();
		},
		_renderCategories: function(){
			var parent = this.conditionModel.getParentObject();
			this.listRegion.show( new CategoryCollectionView({
				collection: new CategoryCollection( this.collection.where({ "parentId": parent.id }) ),
				conditionModel: this.conditionModel
			}));
		},
		_renderSelectedCategories: function(){
			this.selectedCategoriesRegion.show( new SelectedCategoryCollectionView( { conditionModel: this.conditionModel} ) );
		},
	});

	var SelectedCategoryItemView = Backbone.Marionette.ItemView.extend({
		initialize: function(options){
			this.level = options.level; 
		},
		tagName: "li",
		ui: {
			"offset" : ".offset"
		},
		events: {
			"click": "onSelect"
		}, 
		onRender: function(){
			this.ui.offset.css("width", (this.level - 1) * 20 + "px");

		},
		template: require('./selected_categories_template.html'),
		onSelect: function(e){
			e.preventDefault();
			this.trigger("select:breadcrumbs", this.level);
		}
	});

	var SelectedCategoryCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: SelectedCategoryItemView,
		tagName: "ol",
		className: "SELECTED-CATEGORIES bdcolor1",
		initialize: function( options ){
			this.conditionModel = options.conditionModel;
			console.log(this.conditionModel.attributes);
			this.collection = this._buildCategoryCollection();
			this.listenTo( this.conditionModel, 'change:categories', this._onCategoryChange);
		},
		childViewOptions: function(model, index){
			return {
				level: index + 1 
			};
		},
		childEvents: {
			"select:breadcrumbs" : function( itemView, level ){
				this.conditionModel.spliceCategory( level );
			}
		},
		_buildCategoryCollection: function(){
			return new Backbone.Collection( this.conditionModel.get("categories") );
		},
		_onCategoryChange: function(){
			this.collection = this._buildCategoryCollection();
			this.render();
		}
	});

	return CategoryListMain;
})();

},{"../../../models/category_collection.js":206,"./category_collection_view.js":116,"./category_list_main_template.html":120,"./selected_categories_template.html":121,"backbone":"5kFNoY"}],120:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="selected-categories" class="selectedCategories serchbgcolor1"></div>\r\n<div class="list"></div>\r\n';
}
return __p;
};

},{}],121:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="selectedCategory"><span class="offset"></span>'+
((__t=( name ))==null?'':__t)+
'</div>\r\n';
}
return __p;
};

},{}],122:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

	var rootCategory = {
		id: "root",
		name: "トップ",
	};

	var SearchConditionModel = Backbone.Model.extend({
		defaults: {
			mode: "category",
			text: "",
			categories: [ rootCategory ],
		},
		initialize: function(){
			this.listenTo(this,'change:mode', this._onChangeMode);
		},
		changeMode: function(mode){
			this.set({
				mode: mode,
			});
		},
		setText: function( text ){
			this.set("text", text);
		},
		getParentObject: function(){
			var categories = this.get("categories");
			return categories[categories.length - 1];
		},
		pushParentObject: function( parentObj ){
			if( !parentObj || !parentObj.id || !parentObj.name ) { throw "不正なカテゴリオブジェクトを登録しようとしました" }
			var newCategories = this.get("categories");
			newCategories.push(parentObj);
			this.set({"categories": newCategories}); //change eventを出したい
			this.trigger("change:categories"); //arrayなので変わったと認識されない
			this.trigger("change"); //arrayなので変わったと認識されない
		},
		setCategoriesByCategoryCollection: function( categoryCollection ,query ){
			var categoryIds = query["category[]"] || [];
			var categories = categoryCollection.filter(function(v){
				return categoryIds.indexOf( v.id ) != -1;
			}).map( function(v){ return { id: v.get("id"), name: v.get("name")  }; } );

			if( !categories ){ return }
			console.log( categories );
			var newCategories = [ rootCategory ];
			this.set("categories", newCategories.concat(categories));
		},
		spliceCategory: function( level ){
			var newCategories = this.get("categories");
			newCategories.splice( level ); //
			this.trigger("change:categories"); //arrayなので変わったと認識されない
		},
		_onChangeMode: function(){
			this.set({
				categories: [ rootCategory ]
			});
			this.trigger("change:categories");
		}
	},{
	});
	return SearchConditionModel;
})();

},{"backbone":"5kFNoY"}],123:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="search" class="search serchbgcolor1">\r\n\t<div id="search_btn" class="search_btn">\r\n\t\t<button data-mode="freeword" class="free-word-tab">検索</button>\r\n\t\t<button data-mode="geolocation" class="geo-tab">近くのお店</button>\r\n\t\t<button data-mode="category" class="category-tab">カテゴリ</button>\r\n\t</div>\r\n\t<div class="freewordTextBlock freeword-text-block">\r\n\t\t<div class="textBoxWrap">\r\n\t\t\t<input type="text" id="search_input" name="free-word" placeholder="フリーワード検索" value="'+
((__t=( text ))==null?'':__t)+
'">\r\n\t\t</div>\r\n\t\t<button id="free-word-search-btn" type="button" class="searchBtn btbgcolor2 btbdcolor1 btftcolor2" >検索</button>\r\n\t</div>\r\n</div>\r\n\r\n';
}
return __p;
};

},{}],124:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var ShopSearchConditionView = Backbone.Marionette.ItemView.extend({
		template: require('./search_condition_template.html'),
		ui: {
			"freeWordTab" : ".free-word-tab",
			"geoTab" : ".geo-tab",
			"categoryTab" : ".category-tab",
			"tabBtn" : ".tab-btn",
			"freewordSearchBtn" : "#free-word-search-btn",
			"freewordTextInput" : "[name=free-word]",
			"freewordTextBlock" : ".freeword-text-block",
		},
		events: {
			"click @ui.freeWordTab" : "onTabClick",
			"click @ui.geoTab" : "onTabClick",
			"click @ui.categoryTab" : "onTabClick",
			"click @ui.freewordSearchBtn" : "onFreeWordBtnClick",
		},
		initialize: function(){
			this.listenTo( this.model ,'change', this.render );
		},
		onRender: function(){
			var $target;
			App.util.style.toInactive( this.ui.tabBtn );
			this.ui.freewordTextBlock.addClass("HIDE");
			switch (this.model.get("mode")){
				case "category":
					$target = this.ui.categoryTab;
				break;
				case "geolocation":
					$target = this.ui.geoTab;
				break;
				case "freeword":
					$target = this.ui.freeWordTab;
				this.ui.freewordTextBlock.removeClass("HIDE");
				break;
			}
			App.util.style.toActive( $target );
		},
		onTabClick: function(e){
			e.preventDefault();
			var mode = this.$(e.target).attr("data-mode");
			this.model.changeMode(mode);
		},
		onFreeWordBtnClick: function(e){
			e.preventDefault();
			this.model.setText( this.ui.freewordTextInput.val() );
			this.model.trigger('change:mode');
		}
	});
	return ShopSearchConditionView;

})();

},{"./search_condition_template.html":123,"backbone":"5kFNoY"}],125:[function(require,module,exports){
var Backbone = require('backbone');
var ShopModel = require('../../models/shop_model.js');
var ShopDetailMainView = require('./shop_detail_main_view.js');
module.exports = (function () {

	var ShopDetailLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./shop_detail_layout_template.html'),
		regions: {
			"shopDetailRegion" : "#shop-detail-region"
		},
		ui: {
		},
		events: {
		},
		initialize: function( options ){
			this.shopModel = new ShopModel( {id: options.shopId } );
			App.util.bindProgressScreen(this, this.shopModel);
			this.listenTo(this.shopModel, 'sync', this._renderShop);
		},
		onRender: function(){
			this.shopModel.fetchShop();
		},
		_renderShop: function(){
			this.shopDetailRegion.show( new ShopDetailMainView({ model: this.shopModel}) );
		},
		headerConf: {
			title: "お店詳細",
			showBackButton: true,
		},
	});

	return ShopDetailLayout;
})();

},{"../../models/shop_model.js":220,"./shop_detail_layout_template.html":126,"./shop_detail_main_view.js":128,"backbone":"5kFNoY"}],126:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="SHOP-DETAIL" class="BACKBONE-PAGE bgcolor1">\r\n\t<div id="shop-detail-region">\r\n\t</div>\r\n</div>\r\n\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],127:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\t\t<div class="title ftcolor1">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n\t\t<div class="aim ftcolor3">'+
((__t=( App.util.text.nl2br( informationText ) ))==null?'':__t)+
'</div>\r\n<!--\r\n\t\t<a href="#coupon?shop_id='+
((__t=( id ))==null?'':__t)+
'"><button type="button" class="coupon_btn btbgcolor1 btftcolor1">このお店で使えるクーポンはこちら！</button></a>\r\n-->\r\n\t\t<img class="map" src="https://bemss.jp/osm-map/static?appid=t0nKLeGxg6471KWgS6f4cfCSKfhaRXrBPTKTfW1Ktk.ISmDMy_LxmgiY2SE.3kdt&amp;lat='+
((__t=( latitude ))==null?'':__t)+
'&amp;lon='+
((__t=( longitude ))==null?'':__t)+
'&amp;pin='+
((__t=( latitude ))==null?'':__t)+
','+
((__t=( longitude ))==null?'':__t)+
'&amp;width=500&amp;height=500&amp;z=16">\r\n\t\t<div class="address ftcolor3">'+
((__t=( address1 ))==null?'':__t)+
''+
((__t=( address2 ))==null?'':__t)+
'</div>\r\n\t\t<button type="button" class="map-btn btbdcolor1 btftcolor2">地図アプリを起動</button>\r\n\t\t<div class="route ftcolor3">'+
((__t=( App.util.text.nl2br( routeInfoText ) ))==null?'':__t)+
'</div>\r\n\t\t<button type="button" class="route-btn btbdcolor1 btftcolor2">ルート案内を開始</button>\r\n\r\n\r\n';
 if(tel) {
__p+='\r\n\t<div class="telephone ftcolor3">'+
((__t=( tel ))==null?'':__t)+
'</div>\r\n\t<a href="tel:'+
((__t=( tel ))==null?'':__t)+
'"><button type="button" class="call-btn btbdcolor1 btftcolor2">'+
((__t=( tel ))==null?'':__t)+
'に電話</button></a>\r\n';
 } 
__p+='\r\n\r\n';
 if(holiday) {
__p+='\r\n\t<div class="holiday">定休日:'+
((__t=( App.util.text.nl2br( holiday ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
 if(openCloseTimeText) {
__p+='\r\n\t<div class="worktime">'+
((__t=( App.util.text.nl2br( openCloseTimeText ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n\r\n';
 if(mobileText) {
__p+='\r\n\t\t<div class="reception">'+
((__t=( App.util.text.nl2br( mobileText ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
 if(parkText) {
__p+='\r\n<div class="parking">'+
((__t=( App.util.text.nl2br( parkText ) ))==null?'':__t)+
'</div>\r\n';
 } 
__p+='\r\n';
}
return __p;
};

},{}],128:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

	var ShopDetailMainView = Backbone.Marionette.ItemView.extend({
		template: require('./shop_detail_main_template.html'),
		ui: {
			"routeBtn" : ".route-btn",
			"mapBtn" : ".map-btn",
		},
		events:{
			"click @ui.routeBtn" : "_showGoogleRouteWindow",
			"click @ui.mapBtn" : "_openMapApplication"
		},
		initialize: function(){
		},
		onRender: function(){
		},
		_showGoogleRouteWindow: function(){

			var _this = this;
			var geolocationSuccess = function( geoRes ){
				App.util.hideProgressScreen();
				var href = "https://www.google.com/maps/dir/";
				href += geoRes.coords.latitude + ",";
				href += geoRes.coords.longitude + "/";
				href += _this.model.get( "latitude" ) + ",";
				href += _this.model.get( "longitude" ) + "/";
				App.util.text.openWindow(href);
			};
			var errorCallback = function(error){
				applican.notification.alert("位置情報取得に失敗しました", App.util.hideProgressScreen, "", "OK");
			}
			if (navigator.geolocation) {
				App.util.showProgressScreen();
				navigator.geolocation.getCurrentPosition(geolocationSuccess, errorCallback);
			} else {
				applican.notification.alert("位置情報の取得に失敗しました\nもう一度試すか、カテゴリ、キーワード検索をお試しください。", App.doNothing, "", "OK");
			}
				
		},
		_openMapApplication: function(){
			if ( applican.config.device_os === "IOS" ) {
				App.util.text.openWindow("maps:q=" + this.model.get("latitude") + "," + this.model.get("longitude"), true);
			} else {
				App.util.text.openWindow("http://maps.google.com/maps?q=" + this.model.get("latitude") + "," + this.model.get("longitude"), true);
			}
		},
	});

	return ShopDetailMainView;

})();

},{"./shop_detail_main_template.html":127,"backbone":"5kFNoY"}],129:[function(require,module,exports){
var Backbone = require('backbone');
var ShopListItemView = require('./shop_list_item_view.js');
var BaseCollectionView = require('../../views/base_collection_view.js');
module.exports = (function () {
	var ShopListCollectionView = BaseCollectionView.extend({
		childView: ShopListItemView,
		tagName: 'ol',
		className: 'SHOPS'
	});
	return ShopListCollectionView;
})();

},{"../../views/base_collection_view.js":240,"./shop_list_item_view.js":131,"backbone":"5kFNoY"}],130:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="#shop/'+
((__t=( id ))==null?'':__t)+
'">\r\n<div class="row ftcolor1">\r\n\t<div class="shopName">'+
((__t=( name ))==null?'':__t)+
'</div>\r\n';
 if( _.isNumber( distance ) ){ 
__p+='\r\n\t<div class="shopDistance">現在位置から'+
((__t=( App.util.number.roundEx( distance, 2 ) ))==null?'':__t)+
'km</div>\r\n';
 } 
__p+='\r\n</div>\r\n</a>\r\n';
}
return __p;
};

},{}],131:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var ShopListItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor1",
		template: require('./shop_list_item_template.html'),
		templateHelpers: {
		},
	});

	return ShopListItemView;

})();

},{"./shop_list_item_template.html":130,"backbone":"5kFNoY"}],132:[function(require,module,exports){
var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var ShopCollection = require('../../models/shop_collection.js');
var SearchConditionModel = require('./search_box/search_condition_model.js');
var ShopSearchConditionView = require('./search_box/search_condition_view.js');
var ShopListCollectionView = require('./shop_list_collection_view.js');
var CategoryCollection = require('../../models/category_collection.js');
var CategoryListMain = require('./category_view/category_list_main.js');

module.exports = (function () {

	var ShopListLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./shop_list_layout_template.html'),
		regions: {
			"searchControllerRegion" : "#shop-search-controller-region",
			"shopListRegion" : "#shop-list-region"
		},
		ui: {
		},
		events: {
		},
		initialize: function(options){
			var options = options || {};
			this.initialQuery = options.initialQuery;
			this.listenTo( this, 'condition:ready', this._onConditionReady );
			this.listenTo(this, "load:sync", this.onLoad);
		},
		onRender: function(){
			this.shopCollection = new ShopCollection({pagination: true});
			this.categoryCollection = new CategoryCollection();
			App.util.bindProgressScreen( this, this.categoryCollection );
			App.util.bindProgressScreen( this, this.shopCollection );

			this.searchConditionModel = new SearchConditionModel();
			this._buildConditionModelFromQuery( this.initialQuery );
		},
		_bindEvents: function(){
			this.listenTo(this.categoryCollection, 'sync', this._renderCategories );
			this.listenTo(this.shopCollection, 'sync', this._renderShops );
			this.listenTo(this.searchConditionModel, 'change:mode', this._onModeChange );
			this.listenTo(this.searchConditionModel, 'change', this._onConditionChange );
		},
		_onConditionChange: function(){
			// 検索条件をpageSliderのhistoryに格納する事で、遷移先から「戻る」
			// で戻ってきた場合に検索条件を復元できるようにしておく
			var o = {};
			o.mode = this.searchConditionModel.get("mode");
			o.text = encodeURI( this.searchConditionModel.get("text"));
			o.category = this.searchConditionModel.get("categories").map(function(v){ return v.id });
			App.pageSlider.overWriteLastHistory( "#shop?" + $.param(o) );
		},
		_onConditionReady: function(){
			this._bindEvents();
			this._renderSearchBox();
			this._onModeChange(); //別のメソッドを用意すること
		},
		_buildConditionModelFromQuery: function( query ){
			if( !query.mode ){
				this.trigger('condition:ready');
				return;
			}
			this.searchConditionModel.changeMode( query.mode );

			var _this = this;
			if( this.searchConditionModel.get("mode") === "category" ){
				this.categoryCollection.fetchWithAuthInfo().done(function(){
					_this.searchConditionModel.setCategoriesByCategoryCollection( _this.categoryCollection, query );
					_this.trigger('condition:ready');
				});
			}else{
				console.log(query.text);
				this.searchConditionModel.set("text", decodeURI( query.text ) );
				this.trigger('condition:ready');
			}
		}, 
		headerConf: {
			title: "お店一覧",
			showBackButton: true,
		},
		_renderSearchBox: function(){
			this.searchControllerRegion.show( new ShopSearchConditionView({
				model: this.searchConditionModel
			}));
		},
		_renderShops: function(){
			this.shopListRegion.show( new ShopListCollectionView({
				collection: this.shopCollection
			}));
		},
		_renderCategories: function(){
			this.shopListRegion.show( new CategoryListMain({
				collection: this.categoryCollection,
				conditionModel: this.searchConditionModel
			}));
		},
		_fetchShops: function(options){
			App.util.showProgressScreen();
			switch( this.searchConditionModel.get("mode") ){
				case "category":
					this.categoryCollection.fetchWithAuthInfo();
				break;
				case "geolocation":
					this._searchWithGeoLocation(options);
				break;
				case "freeword":
					this._searchWithFreeword(options);
				break;
			}
		},
		_onModeChange: function(){
			this._fetchShops();
		},
		_searchWithFreeword: function(options){
			this.shopCollection.fetchWithFreeword( this.searchConditionModel.get("text"), options );
		},
		_searchWithGeoLocation: function(options){
			var _this = this;
			var geolocationSuccess = function( res ){
				App.util.hideProgressScreen();
				var coords = res.coords;
				_this.shopCollection.fetchWithGeoLocationInfo( coords.longitude , coords.latitude, options);
			};
			var errorCallback = function(error){
				App.util.hideProgressScreen();
				_this.shopCollection.set([]);
				_this._renderShops();
				applican.notification.alert("位置情報の取得に失敗しました\nもう一度試すか、カテゴリ、キーワード検索をお試しください。", App.util.hideProgressScreen,"","OK");
			}
			if (navigator.geolocation) {
				App.util.showProgressScreen();
				navigator.geolocation.getCurrentPosition(geolocationSuccess, errorCallback);
			} else {
				applican.notification.alert("位置情報の取得に失敗しました\nもう一度試すか、カテゴリ、キーワード検索をお試しください。", App.util.hideProgressScreen,"","OK");
			}	
		},		
		onLoad: function() {
			var _this = this;
			$('#SHOP-LIST').on('scroll', _.debounce(function() {
				var bottomPos = 100;
				var scrollHeight = $('#shop-list-region').height();
				var scrollPosition = $(this).height() + $(this).scrollTop();
				if (scrollPosition > scrollHeight - bottomPos) {
					_this.loadingMoreProduct();
				}
			}, 250));
		},		
		loadingMoreProduct: function() {
			if (!this.shopCollection.isAtLastPage()) {
				this._fetchShops({remove: false});
			}
		},
	});

	return ShopListLayoutView;
})();

},{"../../models/category_collection.js":206,"../../models/shop_collection.js":219,"./category_view/category_list_main.js":119,"./search_box/search_condition_model.js":122,"./search_box/search_condition_view.js":124,"./shop_list_collection_view.js":129,"./shop_list_layout_template.html":133,"backbone":"5kFNoY","jquery":"HlZQrA","underscore":"ZKusGn"}],133:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="SHOP-LIST" class="BACKBONE-PAGE">\r\n\r\n<div id="shop-search-controller-region">\r\n</div>\r\n\r\n<div id="shop-list-region">\r\n</div>\r\n\r\n\r\n\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],134:[function(require,module,exports){
var Backbone = require('backbone');
//var querystring = require('querystring');
var ShopListLayoutView = require('./shop_list_layout.js');
var ShopDetailLayout = require('./shop_detail_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var ShopController = Backbone.Marionette.Controller.extend({

		showShopList: function( query ){
			var queryObj = querystring.parse(query || {});
			var shopListLayoutView = new ShopListLayoutView({ initialQuery: queryObj });
			shopListLayoutView.render();
			App.pageSlider.slidePage( shopListLayoutView );
			App.headerModel.applyViewHeaderConf( shopListLayoutView.headerConf );
			shopListLayoutView.trigger("load:sync");
		},
		showShopDetail: function( id ){
			var shopDetailLayout = new ShopDetailLayout( {shopId: id} );
			shopDetailLayout.render();
			App.pageSlider.slidePage( shopDetailLayout );
			App.headerModel.applyViewHeaderConf( shopDetailLayout.headerConf );
		},

	});

	var shopController = new ShopController();

	var ShopRouter = Backbone.Marionette.AppRouter.extend({
		controller: shopController,
		appRoutes: {
			"shop(?:query)" : "showShopList",
			"shop/:id" : "showShopDetail",
		}
	});

	return ShopRouter;

})();

},{"./shop_detail_layout.js":125,"./shop_list_layout.js":132,"backbone":"5kFNoY","querystring":"SZ5xis"}],135:[function(require,module,exports){
var CardModel = require('../../models/card_model.js');
var ValueModel = require('../../models/value_model.js');
var Backbone = require('backbone');
module.exports = (function () {

	var SmartMainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./smart_main_template.html'),
		regions: {
			"smartMainRegion": "#smart-main-region"
		},
		initialize: function(){
			this.cardModel = new CardModel();

			App.util.bindProgressScreen(this, this.cardModel );
			this.listenTo(this.cardModel, 'sync', this._renderSmart);

			this.valueModel = new ValueModel();
			this.listenTo(this.valueModel, 'sync', this._renderValue);
		},
		onRender: function(){
			this.cardModel.fetchWithAuthInfo();
			this.valueModel.fetchWithAuthInfo({
				on401: function(){
					;
				}
			});
		},
		headerConf: {
			title: "スマラボマネー 確認",
			showBackButton: true,
		},
		ui: {
			"cardnumText" : ".cardnum-text",
			"pinnumText" : ".pinnum-text",
			"cardnumImage" : "#cardnum-image",
			"smartText" : ".smart-text",
			"smartMoneyText" : ".smartmoney-text",
			"chargeValue" : "#charge-value",
			"chargeLimit" : "#charge-limit",
			"bonusValue" : "#bonus-value",
			"bonusLimit" : "#bonus-limit",
			"couponValue" : "#coupon-value",
			"couponLimit" : "#coupon-limit",
			"pinnum" : "#pinnum",
			"smartPointText" : ".smartpoint-text",
			"pointValue" : "#point-value",
			"pointLimit" : "#point-limit",
		},
		_renderSmart: function(){
			var cardnum = this.cardModel.get('cardnum');
			if (cardnum != null) {
				var barcodeUrl = 'http://advs.jp/cp/barcode/code128.cgi?nt=1&height=80&c=' + cardnum;

				this.ui.cardnumImage.attr('src', barcodeUrl);
			} else {
				this.ui.cardnumImage.addClass('HIDE');
			}
			this.ui.cardnumText.html(App.util.text.cardnumWithDelimiter(cardnum));
			var pinnum = this.cardModel.get('pinnum');
			if (pinnum != null && pinnum != "") {
				this.ui.pinnumText.html(pinnum);
			} else {
				this.ui.pinnum.addClass('HIDE');
			}
		},
		_renderValue: function(){
			var total = this.valueModel.get('total');
			var basic = this.valueModel.get('basic');
			var bonus = this.valueModel.get('bonus');
			var coupon = this.valueModel.get('coupon');
			var expireDateBasic = this.valueModel.get('expireDateBasic');
			var expireDateBonus = this.valueModel.get('expireDateBonus');
			var expireDateCoupon = this.valueModel.get('expireDateCoupon');
			var point = this.valueModel.get('point');
			var expireDatePoint = this.valueModel.get('expireDatePoint');

			this.ui.smartMoneyText.html(App.util.text.numberWithDelimiter(total) + '円');

			this.ui.chargeValue.html(App.util.text.numberWithDelimiter(basic) + '円');
			this.ui.chargeLimit.html(App.util.text.formatExpireDate(basic, expireDateBasic));

			this.ui.bonusValue.html(App.util.text.numberWithDelimiter(bonus) + '円');
			this.ui.bonusLimit.html(App.util.text.formatExpireDate(bonus, expireDateBonus));
			
			this.ui.couponValue.html(App.util.text.numberWithDelimiter(coupon) + '円');
			this.ui.couponLimit.html(App.util.text.formatExpireDate(coupon, expireDateCoupon));

			this.ui.smartPointText.html(App.util.text.numberWithDelimiter(point) + 'Ｐ');

			this.ui.pointValue.html(App.util.text.numberWithDelimiter(point) + 'Ｐ');
			this.ui.pointLimit.html(App.util.text.formatExpireDate(point, expireDatePoint));
		}
	});

	return SmartMainLayout;
})();

},{"../../models/card_model.js":205,"../../models/value_model.js":223,"./smart_main_template.html":136,"backbone":"5kFNoY"}],136:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="SMART-MAIN" class="BACKBONE-PAGE bgcolor1">\r\n\r\n<div id="card_info">\r\n\t<div class="card-text">カード番号</div>\r\n\t<div class="cardnum-text"></div>\r\n<!-- \t<div class="card-text">カード番号&nbsp;:&nbsp;<span class="cardnum-text"></span></div> -->\r\n\t<div id="pinnum">\r\n\t<div class="card-text">PIN番号</div>\r\n\t<div class="pinnum-text"></div>\r\n<!-- \t<div class="card-text">PIN番号&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<span class="pinnum-text"></span></div> -->\r\n\t</div>\r\n</div>\r\n\r\n<div id="smart-status-region" class="smart_status">\r\n\t<div class="pointBarcode">\r\n    \t<img id="cardnum-image" src="./image/top/img_barcode.gif" height="80" width="269" alt=""> <br>\r\n  \t</div>\r\n\t<div class="current_smart">合計<span class="smartmoney-text hlftcolor3">0 円</span></div>\r\n\t<div class="current_smart">ポイント<span class="smartpoint-text hlftcolor3">0 Ｐ</span></div>\r\n\r\n\t<hr style="border-bottom: 1px dotted;">\r\n\r\n\t<div class="current_smart ftcolor1">ご利用可能額内訳：</div>\r\n\t<div class="ftcolor1">\r\n\t\t<div class="value-div1 ftcolor1">チャージ分</div>\r\n\t\t<div class="value-div2">\r\n\t\t\t<span id="charge-value" class="charge-text hlftcolor3">0 円</span><br>\r\n\t\t\t<span id="charge-limit" class="charge-limit hlftcolor3"></span>\r\n\t\t</div>\r\n\t</div><br>\r\n\r\n\t<div class="ftcolor1">\r\n\t\t<div class="value-div1 ftcolor1">ボーナス分</div>\r\n\t\t<div class="value-div2">\r\n\t\t\t<span id="bonus-value" class="charge-text hlftcolor3">0 円</span><br>\r\n\t\t\t<span id="bonus-limit" class="charge-limit hlftcolor3"></span>\r\n\t\t</div>\r\n\t</div><br>\r\n\r\n\t<div class="ftcolor1">\r\n\t\t<div class="value-div1 ftcolor1">クーポン分</div>\r\n\t\t<div class="value-div2">\r\n\t\t\t<span id="coupon-value" class="charge-text hlftcolor3">0 円</span><br>\r\n\t\t\t<span id="coupon-limit" class="charge-limit hlftcolor3"></span>\r\n\t\t</div>\r\n\t</div><br>\r\n\r\n\t<div class="ftcolor1">\r\n\t\t<div class="value-div1 ftcolor1">ポイント分</div>\r\n\t\t<div class="value-div2">\r\n\t\t\t<span id="point-value" class="charge-text hlftcolor3">0 円</span><br>\r\n\t\t\t<span id="point-limit" class="charge-limit hlftcolor3"></span>\r\n\t\t</div>\r\n\t</div><br>\r\n</div>\r\n\r\n\r\n<div id="button-region">\r\n\t<a href="#history"><button type="button" class="history_btn btbgcolor1 btftcolor1">利用履歴を確認</button></a>\r\n</div>\r\n\r\n<div id="available-coupon-region" class="bgcolor1 ftcolor1">\r\n</div>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],137:[function(require,module,exports){
var Backbone = require('backbone');
var SmartMainLayout = require("./smart_main_layout.js");
module.exports = (function () {

	var SmartController = Backbone.Marionette.Controller.extend({
		showSmartMainView: function(){
			var smartMainLayout = new SmartMainLayout();
			smartMainLayout.render();
			App.pageSlider.slidePage( smartMainLayout );
			App.headerModel.applyViewHeaderConf( smartMainLayout.headerConf );
		},
	});

	var smartController = new SmartController();
	var SmartRouter = Backbone.Marionette.AppRouter.extend({
		controller: smartController,
		appRoutes: {
			"smart" : "showSmartMainView",
		}
	});

	return SmartRouter;

})();

},{"./smart_main_layout.js":135,"backbone":"5kFNoY"}],138:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="overlay OPACITY-TRANSITION bgcolor4">\r\n\t\t<div class="contents bgcolor3">\r\n\r\n\r\n';
 if( type === "stamp" ){ 
__p+='\r\n\t\t<div class="msg ftcolor1 bdcolor1">スタンプをGET！</div>\r\n';
 } 
__p+='\r\n';
 if( type === "point" ){ 
__p+='\r\n<div class="msg ftcolor1 bdcolor1">'+
((__t=( point ))==null?'':__t)+
'ポイント<br>獲得しました!!</div>\r\n';
 } 
__p+='\r\n';
 if( type === "coupon" ){ 
__p+='\r\n\t\t<div class="msg ftcolor1 bdcolor1">スペシャルクーポンを<br>獲得しました!!</div>\r\n';
 } 
__p+='\r\n\r\n\t\t<div class="get_date ftcolor1">取得日時：'+
((__t=( timestamp ))==null?'':__t)+
'</div>\r\n';
 if( type === "coupon" ){ 
__p+='\r\n\t\t<div><a href="#coupon/'+
((__t=( couponId ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'"><button class="btn use-coupon-btn btbgcolor1 btftcolor1" type="button">このクーポンを使う</button></a></div>\r\n';
 } 
__p+='\r\n';
 if( type === "point" ){ 
__p+='\r\n\t\t<div><a href="#point"><button class="btn btbgcolor1 btbdcolor1 btftcolor1" type="button">ポイントを使う</button></a></div>\r\n';
 } 
__p+='\r\n\t\t<div><button class="btn show-coupon-btn btbgcolor2 btbdcolor1 btftcolor2" type="button">クーポン一覧を見る</button></div>\r\n\t\t<div><button class="btn ok-btn close-btn btbgcolor2 btbdcolor1 btftcolor2" type="button">閉じる</button></div>\r\n\t\t</div>\r\n</div>\r\n\r\n';
}
return __p;
};

},{}],139:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var GetStampIncentiveView = Backbone.Marionette.ItemView.extend({
		template: require('./get_stamp_incentive_template.html'),
		ui: {
			"overlay" : ".overlay", 
			"closeBtn" : ".close-btn", 
			"showCouponButton" : ".show-coupon-btn"
		},
		events: {
			"click @ui.closeBtn" : "onCloseClick",
			"click @ui.showCouponButton" : "onShowCouponClick"
		},
		initialize: function(incentiveInfo){

			this.incentiveInfo = incentiveInfo;
			this.model = new Backbone.Model();
			this._setModelFromIncentiveInfo();
			// ポイントゲットの場合
			// クーポンゲットの場合
			// スタンプゲットの場合

			this.model.set("timestamp", moment().format('YYYY/MM/DD HH:mm:ss') );

		},
		onRender: function(){
			this.ui.overlay.removeClass('HIDE');
			var _this = this;
			setTimeout( function(){
				_this.ui.overlay.removeClass('INVISIBLE');
			}, 100);
		},
		_setModelFromIncentiveInfo: function(){
			switch (this.incentiveInfo.incentiveType + "" ){
				case "0" :
					this.model.set("type", "stamp");
				break;
				case "1" :
					this.model.set("type", "coupon");
				this.model.set("couponId", this.incentiveInfo.coupon.id );
				this.model.set("uCoupId", this.incentiveInfo.coupon.uCoupId );
				break;
				case "2" :
					this.model.set("type", "point");
				this.model.set("point", this.incentiveInfo.point );
				break;
			}
		},
		onCloseClick: function(e){
			e.preventDefault();
			this.ui.overlay.addClass('INVISIBLE');
			var _this = this;
			setTimeout( function(){
				_this.destroy();
			}, 400);
		},
		onShowCouponClick: function(){
			location.hash = "#coupon";
		},
	});
	return GetStampIncentiveView;
})();

},{"./get_stamp_incentive_template.html":138,"backbone":"5kFNoY","moment":"iROhDJ"}],140:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="STAMP-TOP" class="BACKBONE-PAGE noselect raitentemplate">\n\t<div class="stamp_area">\n\t\t<ul class="stamp_notice ftcolor1">\n\t\t\t<li>ご来店1回につきスタンプ1回押印！</li>\n\t\t\t<!-- <li class="memid">\n\t\t\t\t<span class="label">会員証番号</span>\n\t\t\t\t<span class="txtmem" id="user-id"></span>\n\t\t\t</li> -->\n\t\t</ul>\n\t\t<div style="height: 20px;"></div>\n\t\t<button id="get-stamp-btn" type="button" class="btnCommon btbgcolor1">来店スタンプを押す</button>\n\t\t<div class="use_cond ftcolor1">利用条件</div>\n\t\t<ul class="otherinf ftcolor1">\n\t\t\t<li>・一部ご利用できない店舗がございます。</li>\n\t\t\t<li>・ご来店1日1回まで<span class="rank_point">'+
((__t=( AppConf.layout.stamp.initialStampCount))==null?'':__t)+
'</span>ポイント付与となります。</li>\n\t\t\t<li>・1日複数回のご来店でも1回まで<span class="rank_point">'+
((__t=( AppConf.layout.stamp.initialStampCount))==null?'':__t)+
'</span>ポイントの進呈となります。</li>\n\t\t\t<li>・有効期限は最終押印より12ヶ月とします。</li>\n\t\t\t<li>・電子スタンプの性質上、画面割れなど接触不良の場合は付与することができません。</li>\n\t\t</ul>\n\t</div>\n\t<div id="stamp-interaction"></div>\n</div>\n\n\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\n';
}
return __p;
};

},{}],141:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {

	var StampCardModel = Backbone.Model.extend({
	});

	var StampCardCollection = Backbone.Collection.extend({
		model: StampCardModel,
	});

	StampCardCollection.generate = function( count, imageUrl, maxCount ){
		console.log(maxCount);
		console.log(count);
		var arr = [];
		for( var i = 0; i < maxCount ; i++ ){
			if( i < count ){
				arr.push({ id: i, image: imageUrl });
			}else{
				arr.push({ id: i, image: "" });
			}
		}
		return new StampCardCollection( arr );
	};

	return StampCardCollection;

})();

},{"backbone":"5kFNoY"}],142:[function(require,module,exports){
var Backbone = require('backbone');
var StampCardItemView = require('./stamp_card_item_view');
module.exports = (function () {
	var StampCardCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: StampCardItemView,
		tagName: 'ol',
		className: 'STAMPCARD'
	});
	return StampCardCollectionView;
})();

},{"./stamp_card_item_view":144,"backbone":"5kFNoY"}],143:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if( image ){ 
__p+='\r\n\t<img src="'+
((__t=( image ))==null?'':__t)+
'">\r\n';
 } 
__p+='\r\n\r\n';
}
return __p;
};

},{}],144:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function () {
	var StampCardItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		className: "bgcolor3 ftcolor2", 
		attributes: function(){
			return { "data-index": this.model.get("id") + 1};
		},
		template: require('./stamp_card_item_template.html'),
	});

	return StampCardItemView;

})();

},{"./stamp_card_item_template.html":143,"backbone":"5kFNoY","moment":"iROhDJ"}],145:[function(require,module,exports){
var Backbone = require('backbone');
var StampTopLayoutView = require('./stamp_top_layout.js');
var querystring = require('querystring');
module.exports = (function () {

	var StampController = Backbone.Marionette.Controller.extend({
		showStampTop: function(point){
			var stampTopLayoutView = new StampTopLayoutView({ point: point });
			stampTopLayoutView.render();
			App.pageSlider.slidePage( stampTopLayoutView );
			App.headerModel.applyViewHeaderConf( stampTopLayoutView.headerConf );
		}
	});

	var stampController = new StampController();

	var StampRouter = Backbone.Marionette.AppRouter.extend({
		controller: stampController,
		appRoutes: {
			"stamp" : "showStampTop",
			"stamp/:point" : "showStampTop",
		}
	});

	return StampRouter;

})();

},{"./stamp_top_layout.js":146,"backbone":"5kFNoY","querystring":"SZ5xis"}],146:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
var StampViewModel = require('../../models/stamp_view_model');
var StampCardCollectionView = require('./stamp_card/stamp_card_collection_view.js');
var StampCardCollection = require('./stamp_card/stamp_card_collection.js');
var GetStampIncentiveView = require('./interactions/get_stamp_incentive_view.js');

var PointModel = require('../../models/point_model.js');
var CouponCollection = require('../../models/coupon_collection.js');
var CouponMasterCollection = require('../../models/coupon_master_collection.js');
var AvailableCouponCollectionView = require('../point/available_coupon_collection_view.js');
var ModalAlertView = require('../../modals/alert/modal_alert_view.js');
var ModalHitapStampView = require('../../modals/hitapModal/modal_hitap_stamp_view.js');
var ModalShopListView = require('../../modals/shop_list/modal_shop_list_view')
module.exports = (function () {

	var StampTopLayoutView = Backbone.Marionette.LayoutView.extend({

		template: function() {
			return (AppConf.layout.stamp.style === 'raiten') ? require('./raiten_top_layout_template.html') : require('./stamp_top_layout_template.html');
		},
		regions: {
			'stampCardRegion' : '#stampCardRegion',
			'stampInteractionRegion' : '#stamp-interaction',
			"availableCouponRegion": "#available-coupon-region"
		},
		ui: {
			"getStampButton" : "#get-stamp-btn",
			"readTermsBtn": ".read-terms",
			"userId": "#user-id",
		},
		events: {
			"click @ui.getStampButton" : "_getStamp",
			"click @ui.readTermsBtn" : "readTermsBtn",
		},
		initialize: function(options){
			this.goToPoint = options.point;
			var _this = this;
			this.stampCardCollection = {};
			this.stampViewModel = new StampViewModel();
			App.util.bindProgressScreen( this, this.stampViewModel);
			this.listenTo( this.stampViewModel, 'sync', this._setUpStampCard );
			this.listenTo( this.stampViewModel, 'sync', this._renderStampInfo );
			this.couponCollection = new CouponCollection();


			if (AppConf.features.wallet){
				this.template = require('./stamp_top_layout_template.wallet.html');
				this.couponMasterCollection = new CouponMasterCollection();
				App.util.bindProgressScreen(this, this.couponMasterCollection );
				this.listenTo(this.couponMasterCollection, 'sync', this._renderCoupons);
				
				this.pointModel = new PointModel();
				this.listenTo(this.pointModel, 'sync', this._renderPoint);		
			}
			this.modalAlertView = new ModalAlertView();
			this.modalStampAlertView = new ModalAlertView();
			this.modalHitapStampView = new ModalHitapStampView();
			this.modalShopListView = new ModalShopListView();
		},
		onRender: function(){
			if(AppConf.features.wallet){
				this.pointModel.fetchWithAuthInfo();
				this.couponMasterCollection.fetchPointExchangeable();
			} else {
				this.stampViewModel.fetchWithAuthInfo();
			}

		},
		headerConf: {
			title: AppConf.features.wallet ? "ウォレット" : "スタンプ",
			showBackButton: true,
			showWalletMenu: AppConf.features.wallet ? true : false,
			customeBackAction: function(){
				App.pageSlider.home();
			}
		},
		_setUpStampCard: function(){


			// 画面上部のテキスト処理
			var benefitText = ( this.stampViewModel.isExchangeableForCoupon() )? "スペシャルクーポン" : "ポイント"; 
			this.$('.stampRank1TypeText').text( benefitText );
			this.$('.stampRank1MaxText').text( this.stampViewModel.get("stampRank1Max") );
			this.$('#stamp-note').html( this.stampViewModel.get("note") );

			// スタンプを押すボタンの表示/非表示
			if( this.stampViewModel.isCouponOnly() ){
				this.ui.getStampButton.addClass("hide");
			}

			if(AppConf.layout.stamp.style === 'stamp'){
				// スタンプカードの描写
				this.stampCardCollection = StampCardCollection.generate(
					this.stampViewModel.get("useCounts"),
					this.stampViewModel.get("stampRank1ImageUrl"),
					this.stampViewModel.get("stampRank1Max")
				);
				this._renderStampCard();
				this.listenTo( this.stampCardCollection, 'add', this._renderStampCard );
			}
		},
		_renderStampInfo: function(){
			var limited = this.stampViewModel.get("useCondInterval");
			this.$(".use-cond-interval").html( ( limited )? "あり" : "なし");
			// 当日制限あり/かつ最終利用日が当日の場合は事前にスタンプボタンを非表示とする
			if( limited && App.util.date.isToday( new Date( this.stampViewModel.get("finalUseDate")))){
				this.ui.getStampButton.text("取得済み");
				this.ui.getStampButton.addClass("disabledButton");
				this.ui.getStampButton.prop("disabled", "true");
			}
		},
		_renderStampCard: function(){
			this.stampCardRegion.show( new StampCardCollectionView({collection: this.stampCardCollection}));
		},
		_getStamp: function(e){
			if(AppConf.layout.stamp.style === 'raiten' || (AppConf.layout.stamp.style === 'stamp' && AppConf.layout.stamp.type === 'hitap') || AppConf.features.wallet){
				this.showHitap();
			} else {
				var _this = this;
				// 位置情報を取得
				var geolocationSuccess = function( result ){
					// 成功したらスタンプ取得リクエストを投げる
					var location = {
						longitude: result.coords.longitude,
						latitude: result.coords.latitude
					};
					App.util.execWithProgressScreen( function (){
						return App.btApi.getStamp(location); 
					}).done(function(data){
						_this.useStampDone(data);
					}).fail(function(){
						applican.notification.alert("最寄りの店舗が見つからないため、スタンプを取得できません。", App.doNothing, "", "OK");
					});
				};
				var errorCallback = function(error){
					applican.notification.alert("位置情報の取得に失敗しました。", App.util.hideProgressScreen, "", "OK");
				};
				if (navigator.geolocation) {
					App.util.showProgressScreen();
					navigator.geolocation.getCurrentPosition(geolocationSuccess, errorCallback);
				} else {
					applican.notification.alert("位置情報の取得に失敗しました\nもう一度試すか、カテゴリ、キーワード検索をお試しください。", App.doNothing, "", "OK");
				}
			}
		},
		useStampDone: function(data) {
			var _this = this;
			_this._showStampInteraction( data );
			var newCount = data.stamp.useCounts;
			if( newCount === 0 ){
				_this.stampViewModel.fetchWithAuthInfo();
			}else{
				_this.stampCardCollection.findWhere({ id: newCount - 1 } ).set("image", _this.stampViewModel.get("stampRank1ImageUrl"))
				_this._renderStampCard();
				_this.ui.getStampButton.addClass('HIDE');
			}
			_this.couponCollection.clearCache();
		},
		_showStampInteraction: function( incentiveInfo ){
			if (AppConf.features.wallet){
				var getStampIncentiveView = new GetStampIncentiveView( incentiveInfo );
				getStampIncentiveView.render();
				var title = getStampIncentiveView.$el.find(".msg")[0].innerHTML;
				getStampIncentiveView.$el.find(".msg")[0].remove();
				var html = getStampIncentiveView.el;
				this.modalStampAlertView.show({
					title: title,
					text: html
				});
			} else {
				this.stampInteractionRegion.show( new GetStampIncentiveView( incentiveInfo ) );
			}
		},
		_renderCoupons: function(){
			this.availableCouponRegion.show( new AvailableCouponCollectionView({
				collection: this.couponMasterCollection
			}));
		},
		_renderPoint: function(){
			var _this = this;
			var point = App.util.text.numberWithDelimiter( this.pointModel.get("point") );
			this.$('.point-text').html( point );			
			//auto scroll to point area and show floating button
			setTimeout(function(){
				if(_this.goToPoint){
					$("#STAMP-TOP").animate({
						scrollTop: $(".current_point").offset().top - $(".wallet-card-list").height() -44
					}, 500);
				}
			}, 500);
		},
		readTermsBtn: function(){
			this.modalAlertView.show({ 
				title: '',
				text: '<img width="20px" src="./image/common/check.svg">  利用条件<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxx<br>xxxxxxxxxxxxxxxxxxxxxx<br>', 
				class: "dialogue-content"
			});
		},
		showHitap: function() {
			var _this = this;
			this.modalHitapStampView.show().then(function(res) {
				// hitap success
				if (res.isDone) {
					var res = res.resultUseStamp;
					var shopCount = res.shopCount;
					if ( shopCount > 1 ) {
						_this.hitapCode = res.hitapCode;
						_this.uCoupId = res.uCoupId;
						_this.modalShopListView.show(res).then(function(resShop) {
							if(resShop.isDone){
								_this.useStampHitapApi({ shopId: resShop.shopId, uCoupId: _this.uCoupId, hitapCode: _this.hitapCode });
							}
						})
					} else {
						_this.renderAfterUse(res.stampUseResult);
						_this.couponCollection.clearCache();
					}
				}
			});
		},
		useStampHitapApi: function(options) {
			var _options = options || null;
			var _this = this;
			App.util.showProgressScreen();
			App.btApi.useStampHitap({
				"shopId": _options.shopId,
				"uCoupId": _options.uCoupId,
				"hitapCode": _options.hitapCode,
				"securityCode": _options.securityCode
			}).done(function(res) {
				_this.renderAfterUse(res.stampUseResult);
				_this.couponCollection.clearCache();
			}).fail(function(err) {
				var statusError = err.status;
				var errorMessage = "";
				var title = "";
				if (statusError === 403) {
					if (typeof err.responseBody === "undefined" || err.responseBody === null || (err.responseBody != null && err.responseBody.errorCode === "0003")) {
						title = "";
						errorMessage = "本日は既にスタンプを獲得済みです";
					} else {
						title = "スタンプ利用エラー";
						errorMessage = "スタンプ利用に失敗しました";
					}
				} else {
					title = "スタンプ利用エラー";
					errorMessage = "スタンプ利用に失敗しました";
				}
				_this.modalAlertView.show({ title: title, text: errorMessage });
			});
		},
		renderAfterUse: function(resultUseStamp) {
			if(AppConf.features.wallet){
				this.$(".action-area").addClass("disable");
				this.pointModel.fetchWithAuthInfo();
				this.pointModel.clearCache();
			} else {
				this.useStampDone(resultUseStamp);
			}
		},
		onDestroy: function() {
			this.modalAlertView.onDestroy();
			this.modalStampAlertView.onDestroy();
			this.modalHitapStampView.onDestroy();
			this.modalShopListView.onDestroy();
		},
	});

	return StampTopLayoutView;
})();

},{"../../modals/alert/modal_alert_view.js":190,"../../modals/hitapModal/modal_hitap_stamp_view.js":196,"../../modals/shop_list/modal_shop_list_view":201,"../../models/coupon_collection.js":207,"../../models/coupon_master_collection.js":209,"../../models/point_model.js":218,"../../models/stamp_view_model":221,"../point/available_coupon_collection_view.js":95,"./interactions/get_stamp_incentive_view.js":139,"./raiten_top_layout_template.html":140,"./stamp_card/stamp_card_collection.js":141,"./stamp_card/stamp_card_collection_view.js":142,"./stamp_top_layout_template.html":147,"./stamp_top_layout_template.wallet.html":148,"backbone":"5kFNoY","moment":"iROhDJ"}],147:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="STAMP-TOP" class="BACKBONE-PAGE stamptemplate">\r\n\t<div class="stamp_area bgcolor2">\r\n\t\t<div class="memo ftcolor2">スタンプを<span class="stampRank1MaxText"></span>個集めると<br><span\r\n\t\t\t\tclass="stampRank1TypeText"></span>をプレゼント</div>\r\n\t\t<div id="stampCardRegion">\r\n\t\t\t<ol class="STAMPCARD">\r\n\t\t\t\t';
 for( var index = 0 ; index < AppConf.layout.stamp.initialStampCount; index++){ 
__p+='<li\r\n\t\t\t\t\tdata-index="'+
((__t=( index ))==null?'':__t)+
'" class="bgcolor3 ftcolor2"></li>';
 } 
__p+='\r\n\t\t\t</ol>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="btn_area bgcolor1">\r\n\t\t<button id="get-stamp-btn" type="button" class="btbgcolor1 btftcolor1">スタンプを押す</button>\r\n\t\t<div class="use_cond ftcolor1">利用条件</div>\r\n\t\t<div class="ftcolor3">同日利用制限：<span class="use-cond-interval"></span></div>\r\n\t\t<br>\r\n\t\t<div class="ftcolor3" id="stamp-note"></div>\r\n\t</div>\r\n\t<div id="stamp-interaction"></div>\r\n</div>\r\n\r\n\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],148:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="STAMP-TOP" class="BACKBONE-PAGE bgcolor1 walet-template">\n    <div class="action-area stamp-area bgcolor2 ftcolor1 ">\n        <div class="mask-disable">\n            <span>本日のxxxxxxxxxxxxxxxxx</span>\n        </div>\n        ';
 if( AppConf.layout.stamp.type === 'hitap' ){ 
__p+='\n            <p class="action-note">\n                ご来店１回につき、<br>スタンプ１回（３０ポイント）\n            </p>\n        ';
 } else { 
__p+='\n            <p class="action-note">\n                スタンプを5個集めると<br>\n                プレミアムクーポンをプレゼント\n            </p>\n            <div id="stampCardRegion">\n                <ol class="STAMPCARD">\n                    ';
 for( var index = 1 ; index <= AppConf.layout.stamp.initialStampCount; index++){ 
__p+='\n                        <li data-index="'+
((__t=( index ))==null?'':__t)+
'" class="bgcolor3 ftcolor2"></li>\n                    ';
 } 
__p+='\n                </ol>\n            </div>\n        ';
 } 
__p+='\n        <span id="get-stamp-btn" class="action-button"><img src="./image/top/stamp-icon-white.svg">来店スタンプを押す</span>\n        <span class="read-terms"><img src="./image/top/infomation-icon.svg"></span>\n    </div>\n    ';
 if( AppConf.layout.stamp.type === 'hitap' ){ 
__p+='\n        <div class="current_point">\n            <span class="point-title">現在のポイント</span>\n            <span class="point-text">0</span>\n            <span class="point-unit">pt</span>\n        </div>\n        <div class="point_status">\n            <div class="condition">\n                <div class="condition_title ftcolor1">利用条件</div>\n                <div class="condition_words ftcolor3">特典内容は、予告なく変更される場合があります。\n                </div>\n            </div>\n        </div>\n        <div id="available-coupon-region" class="bgcolor1 ftcolor1">\n        </div>\n    ';
 } 
__p+='\n</div>\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\n    ';
}
return __p;
};

},{}],149:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {

	function slideElement(container, element, onDragEnd) {
		element.addEventListener("touchstart", dragStart.bind(null, container, element), false);
		element.addEventListener("touchend", dragEnd.bind(null, element, onDragEnd), false);
		element.addEventListener("touchmove", drag.bind(null, element, onDragEnd), false);
		element.addEventListener("mouseout", dragEnd.bind(null, element, onDragEnd), false);

		element.addEventListener("mousedown", dragStart.bind(null, container, element), false);
		element.addEventListener("mouseup", dragEnd.bind(null, element, onDragEnd), false);
		element.addEventListener("mousemove", drag.bind(null, element, onDragEnd), false);
		element.addEventListener("mouseout", dragEnd.bind(null, element, onDragEnd), false);
	}

	function stop(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function dragStart(container, element, e) {
		var pointTouch = {
			clientX: e.clientX,
			clientY: e.clientY
		};
		if (e.type == "touchstart") {
			pointTouch = {
				clientX: e.touches[0].clientX,
				clientY: e.touches[0].clientY
			};
		}
		var data = {
			active: 1,
			maxx: (container.offsetWidth / 2),
			"initx": pointTouch.clientX,
			"inity": pointTouch.clientY,
			"deltax": 0,
			"deltay": 0,
			"currentx": pointTouch.clientX,
			"currenty": pointTouch.clientY,
		}
		setData(element, data);
		document.addEventListener("scroll", stop, false);
	}

	function dragEnd(element, callback) {
		var currentLeft = element.offsetLeft - (+getData(element, "deltax"));
		if ((+getData(element, "initx") - (+getData(element, "currentx"))) > 0) {
			element.style.left = "0";
		} else {
			element.style.left = +getData(element, "maxx") + "px";
		}
		if (currentLeft <= (+getData(element, "maxx") / 2)) {
			element.style.left = "0";
			if (callback) {
				callback(0);
			}
		} else {
			element.style.left = +getData(element, "maxx") + "px";
			if (callback) {
				callback(1);
			}
		}
		setData(element, {
			active: 0
		})
		document.removeEventListener("scroll", stop);
	}

	function drag(element, callback, e) {
		if (+getData(element, "active")) {
			var pointTouch = {
				clientX: e.clientX,
				clientY: e.clientY
			};
			if (e.type == "touchmove") {
				pointTouch = {
					clientX: e.touches[0].clientX,
					clientY: e.touches[0].clientY
				};
			}
			var data = {
				"deltax": +getData(element, "currentx") - pointTouch.clientX,
				"deltay": +getData(element, "currenty") - pointTouch.clientY,
				"currentx": pointTouch.clientX,
				"currenty": pointTouch.clientY,
			}
			var currentLeft = element.offsetLeft - data["deltax"];
			if ((currentLeft <= 0) || (currentLeft >= +getData(element, "maxx"))) {
				dragEnd(element, callback);
			} else {
				element.style.left = currentLeft + "px";
			}
			setData(element, data);
		}
	}

	function getData(element, key) {
		return key ? element.dataset[key] : element.dataset
	}

	function setData(element, data) {
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				element.dataset[key] = data[key];
			}
		}
	}

	var SwitchButtonLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./switch_btn_template.html'),
		initialize: function() {
			this.switched = 0;
		},
		onRender: function() {
			var _this = this;
			var tout = setTimeout(function() {
				slideElement(document.getElementById("switch-btn"), document.getElementById("switch-btn-control"), _this.onSwitch.bind(_this));
				clearTimeout(tout);
			});
		},
		onSwitch: function(switched) {
			// checking has switched
			// 1 is switch to right, 0 is opposite
			if (switched !== this.switched) {
				this.switched = switched;
				this.successCallback(switched);
			}
		},
		switchOff: function() {
			this.switched = 0;
			document.getElementById("switch-btn-control").style.left = "0";
		},
		then: function(successCallback) {
			this.successCallback = successCallback;
		}
	});

	return SwitchButtonLayout;

})();
},{"./switch_btn_template.html":150,"backbone":"5kFNoY"}],150:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="switch-btn">\n\t<div id="switch-btn-control">\n\t\t使用する\n\t\t<img src="./image/top/icon_arrow_white.png" />\n\t</div>\n</div>';
}
return __p;
};

},{}],151:[function(require,module,exports){
var Backbone = require('backbone');
var SlideCardCollectionView = require('../../views/slidecard/slidecard_collection_view');
var PassticketPurchaseCollection = require('../../models/passticket_purchase_collection');
var TicketCollectionView = require('../passticket/ticket/ticket_collection_view.js');
var TicketCollection = require('../passticket/ticket/ticket_collection.js');
var UserModel = require('../../models/user_model.js');
var CouponCollection = require('../../models/coupon_collection.js');

module.exports = (function() {
	var PassTicketDetailLayout = Backbone.Marionette.LayoutView.extend({
		template: require('./wallet_layout_template.html'),
		headerConf: {
			title: AppConf.features.wallet ? "ウォレット" : "定期券",
			showWalletMenu: AppConf.features.wallet ? true : false,
			customeBackAction: function(){
				App.pageSlider.home();
			}
		},
		ui: {
			"cardSlide": ".card-region",
			"historyNavigate": '.history-block'
		},
		events: {
		},
		regions: {
			"cardRegion": ".card-region",
			"ticketNormalListRegion": ".ticket-list-region"
		},
		initialize: function() {
			var _this = this;
			this.userModel = new UserModel();
			this.ticketCollection = new TicketCollection({ pagination: true });
			this.couponCollection = new CouponCollection();
			this.ticketCollectionView = new TicketCollectionView({ collection: this.ticketCollection });
			App.util.bindProgressScreen(this, this.ticketCollection);
			this.listenTo(this.ticketCollection, 'sync', this.renderTicket);
			this.listenTo(this, 'load:sync', this.onLoad);
			this.slideCardCollection = new PassticketPurchaseCollection();
			this.slideCardCollectionView = new SlideCardCollectionView({
				collection: this.slideCardCollection
			});
		},
		loadingMoreProduct: function() {
			if (!this.ticketCollection.isAtLastPage()) {
				this.ticketCollection.fetchTicket({ remove: false, rank: this.userModel.get('userRank'), coupons: this.slideCardCollection });
			}
		},
		renderTicket: function() {
			this.ticketNormalListRegion.show(this.ticketCollectionView);
		},
		onLoad: function() {
			var _this = this;
			this.slideCardCollection.fetchPassTicketPurchase().done(function(){
				_this.couponCollection.fetchWithAuthInfo({ remove: false }).done(function(data){	
					_this.slideCardCollection.add(_this.couponCollection.models);				
					if (_this.slideCardCollection.length > 0) {
						_this.cardRegion.show(_this.slideCardCollectionView);
						_this.slideCardCollectionView.initSlick();
					} else {
						_this.ui.cardSlide.empty().append('<div class="empty-card"><span class="card-text">有効な定期券がありません</span></div>');
					}
					_this.userModel.fetchWithAuthInfo().done(function() {
						_this.ticketCollection.fetchTicket({ remove: true, rank: _this.userModel.get('userRank'), coupons: _this.slideCardCollection });
					});
				});
			});
			$('#PASS-TICKET').on('scroll', _.debounce(function() {
				var bottomPos = 100;
				var scrollHeight = $('.pass-ticket-wrapper').height();
				var scrollPosition = $(this).height() + $(this).scrollTop();
				if (scrollPosition > scrollHeight - bottomPos) {
					_this.loadingMoreProduct();
				}
			}, 250));
		},
	});

	return PassTicketDetailLayout;

})();

},{"../../models/coupon_collection.js":207,"../../models/passticket_purchase_collection":216,"../../models/user_model.js":222,"../../views/slidecard/slidecard_collection_view":244,"../passticket/ticket/ticket_collection.js":91,"../passticket/ticket/ticket_collection_view.js":92,"./wallet_layout_template.html":152,"backbone":"5kFNoY"}],152:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="PASS-TICKET" class="BACKBONE-PAGE bgcolor1 touch coupon-card-wallet">\n\t<div class="pass-ticket-wrapper">\n\t\t<div class="ticket-slider">\n\t\t\t<div class="card-region ticket-card">\n\t\t\t\t<div class="empty-card">\n\t\t\t\t\t<span class="card-text">有効な定期券がありません</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="paging-region slick-slider"></div>\n\t\t</div>\n\t\t<!-- <div class="history-block hide">\n\t\t\t<a href="#history?type=passTicket" class="history">利用履歴を見る</a>\n\t\t</div> -->\n\t\t<div class="ticket-list-title">\n\t\t\t販売中の定期券\n\t\t</div>\n\t\t<div class="ticket-list-region">\n\t\t\t<div class="ticket-list-region">\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'';
}
return __p;
};

},{}],153:[function(require,module,exports){
var Backbone = require('backbone');
var WalletLayout = require('./wallet_layout.js');
module.exports = (function() {

	var WalletController = Backbone.Marionette.Controller.extend({
		showWallet: function() {
			var walletLayout = new WalletLayout();
			walletLayout.render();
			App.pageSlider.slidePage(walletLayout);
			App.headerModel.applyViewHeaderConf(walletLayout.headerConf);
			walletLayout.trigger("load:sync");
		},
	});

	var walletController = new WalletController();
	var WalletRouter = Backbone.Marionette.AppRouter.extend({
		controller: walletController,
		appRoutes: {
			"wallet": "showWallet",
		}
	});

	return WalletRouter;

})();

},{"./wallet_layout.js":151,"backbone":"5kFNoY"}],154:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="list-item home">\n\t<a class="menu-item" href="#">\n\t\t<div class="svgContainer">\n\t\t\t';
 if( AppConf.features.wallet ){ 
__p+='\n\t\t\t\t<img src="./image/top/icon_home_active.png" width="40px" height="40px" alt="" />\n\t\t\t';
 }else{ 
__p+='\n\t\t\t\t<img src="./image/top/icon_home.png" width="40px" height="40px" alt="" />\n\t\t\t';
 } 
__p+='\t\n\t\t\t<img src="./image/top/icon_homeft.png" width="40px" height="40px" alt="" />\n\t\t</div>\n\t\t<p class="btnS label-menu">ホーム</p>\n\t</a>\n</div>\n<div class="list-item shop">\n\t<a class="menu-item" href="#shop">\n\t\t<div class="svgContainer">\n\t\t\t';
 if( AppConf.features.wallet ){ 
__p+='\n\t\t\t\t<img src="./image/top/icon_shop_active.png" width="40px" height="40px" alt="" />\n\t\t\t';
 }else{ 
__p+='\n\t\t\t\t<img src="./image/top/icon_shop.png" width="40px" height="40px" alt="" />\n\t\t\t';
 } 
__p+='\t\n\t\t\t<img src="./image/top/icon_shopft.png" width="40px" height="40px" alt="" />\n\t\t</div>\n\t\t<p class="btnS label-menu">店舗</p>\n\t</a>\n</div>\n<div class="list-item information">\n\t<a class="menu-item" href="#information">\n\t\t<div class="svgContainer">\n\t\t\t';
 if( AppConf.features.wallet ){ 
__p+='\n\t\t\t\t<img src="./image/top/icon_info_active.png" width="40px" height="40px" alt="" />\n\t\t\t';
 }else{ 
__p+='\n\t\t\t\t<img src="./image/top/icon_info.png" width="40px" height="40px" alt="" />\n\t\t\t';
 } 
__p+='\t\n\t\t\t<img src="./image/top/icon_infoft.png" width="40px" height="40px" alt="" />\n\t\t</div>\n\t\t<p class="btnS label-menu">お知らせ</p>\n\t\t<span class="badge-number"></span>\n\t</a>\n</div>\n';
 if( AppConf.features.wallet ){ 
__p+='\n\t';
 if( AppConf.features.scratch ){ 
__p+='\t\n\t\t<div class="list-item scratch">\n\t\t\t<a class="menu-item" href="#scratch">\n\t\t\t\t<div class="svgContainer">\n\t\t\t\t\t<img src="./image/top/icon_scratch_active.png" width="40px" height="40px" alt="" />\n\t\t\t\t\t<img src="./image/top/icon_scratchft.png" width="40px" height="40px" alt="" />\n\t\t\t\t</div>\n\t\t\t\t<p class="btnS label-menu">スクラッチ</p>\n\t\t\t</a>\n\t\t</div>\t\n\t';
 } 
__p+='\n\t<div class="list-item coupon member infosound stamp wallet pass-ticket ticket">\n\t';
 if( App.util.common.countActiveFeatureInWallet() < 2 ){ 
__p+='\n\t\t<a class="menu-item" href="#member">\t\t\n\t';
 } else { 
__p+='\t\n\t\t<a class="menu-item" href="#wallet">\t\n\t';
 } 
__p+='\t\n\t\t\t<div class="svgContainer">\n\t\t\t\t<img src="./image/top/icon_wallet_active.png" width="40px" height="40px" alt="" />\n\t\t\t\t<img src="./image/top/icon_walletft.png" width="40px" height="40px" alt="" />\n\t\t\t</div>\n\t\t\t<p class="btnS label-menu">ウォレット</p>\n\t\t</a>\n\t</div>\t\n';
 }else{ 
__p+='\n<div class="list-item coupon">\n\t<a class="menu-item" href="#coupon">\n\t\t<div class="svgContainer">\n\t\t\t<img src="./image/top/icon_coupon.png" width="40px" height="40px" alt="" />\n\t\t\t<img src="./image/top/icon_couponft.png" width="40px" height="40px" alt="" />\n\t\t</div>\n\t\t<p class="btnS label-menu">クーポン</p>\n\t</a>\n</div>\n';
 } 
__p+='\n';
 if( !AppConf.features.wallet ){ 
__p+='\n\t<div class="list-item config">\n\t\t<a class="menu-item" href="#config">\n\t\t\t<div class="svgContainer">\n\t\t\t\t<img src="./image/top/icon_config.png" width="40px" height="40px" alt="" />\n\t\t\t\t<img src="./image/top/icon_configft.png" width="40px" height="40px" alt="" />\n\t\t\t</div>\n\t\t\t<p class="btnS label-menu">設定</p>\n\t\t</a>\n\t</div>\n';
 } 
__p+='';
}
return __p;
};

},{}],155:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {
	var FooterView = Backbone.Marionette.ItemView.extend({
		template: require('./footer_view.html'),
		tagName: "div",
		className: "bottom_menu",
		initialize: function() {
			this.listenTo(App, "onRoute", this.onRoute);
		},
		onRoute: function() {
			var routes = Backbone.history.getFragment().split(/(\?|\/)/)[0];
			(routes || (routes = 'home'))
			var checkRoute = ['home', 'shop', 'infosound', 'stamp', 'information', 'scratch', 'coupon', 'pass-ticket', 'ticket', 'member', 'wallet', 'config'].indexOf(routes) > -1; // array is the links of each item in footer
			// check active item footer
			if (checkRoute) {
				$('.APP-FOOTER .list-item').removeClass('active');
				$('.APP-FOOTER .list-item.' + routes).addClass('active');
			} else {
				$('.APP-FOOTER .list-item').removeClass('active');
			}

			if ((AppConf.menu.footer.hideFooter[routes])) {
				this.onHideFooter();
			} else {
				this.onShowFooter();
			}
		},

		onHideFooter: function() {
			$('.APP-FOOTER').hide();
			$('.BACKBONE-PAGE').removeClass('hasFixedFooterMenu');
		},
		onShowFooter: function() {
			$('.APP-FOOTER').show();
			if (location.hash !== 'home') {
				$('.BACKBONE-PAGE').addClass('hasFixedFooterMenu');
			}
		}
	});
	return FooterView;
})();

},{"./footer_view.html":154,"backbone":"5kFNoY"}],156:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function() {
	var HeaderModel = Backbone.Model.extend({
		defaults: {
			title: "Header Title",
			showBackButton: true,
			customeBackAction: null,
			hideHeader: false,
			showRightButton: false,
			showWalletMenu: false,
			showFloatingButton: true,
		},
		applyViewHeaderConf: function(headerConf) {
			if (!headerConf) return;
			// create copy config
			if (AppConf.features.wallet || AppConf.features.passTicket) {
				this.defaults.showRightButton = true;
			}
			var config = $.extend({}, this.defaults, headerConf);
			this.set(config);
		},
	});

	return HeaderModel;


})();

},{"backbone":"5kFNoY"}],157:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="RELATIVE-WRAPPER HEADER-INNER-WRAPPER">\r\n\t<div class="HEADER-LEFT">\r\n\t\t<span class="back-button BUTTON-WRAPPER">\r\n\t\t\t<button class="BACK-BUTTON bgcolor1">戻る</button>\r\n\t\t</span>\r\n\t</div>\r\n\t<div class="HEADER-RIGHT">\r\n\t\t';
 if( AppConf.features.wallet ){ 
__p+='\r\n\t\t\t<span class="ticket-icon BUTTON-WRAPPER">\r\n\t\t\t\t<img src="./image/top/icon_menu_right.png">\r\n\t\t\t</span>\r\n\t\t';
 } else if(AppConf.features.passTicket) { 
__p+='\r\n\t\t\t<span class="ticket-icon BUTTON-WRAPPER">\r\n\t\t\t\t<img src="./image/top/icon_ticket_top.png">\r\n\t\t\t\t<span class="ticket-badge hide"><span class="ticket-badge-text">NEW</span></span>\r\n\t\t\t</span>\r\n\t\t';
 } 
__p+='\r\n\t</div>\r\n\t<span class="title TITLE"></span>\r\n</div>\r\n';
 if( AppConf.features.wallet ){ 
__p+='\r\n<div class="wallet-menu">\r\n\t<ul class="wallet-card-list col-'+
((__t=( App.util.common.countActiveFeatureInWallet() + 2 ))==null?'':_.escape(__t))+
' ">\r\n\t\t';
 if( AppConf.wallet.use.type === "infosound"){ 
__p+='\r\n\t\t\t<li class="list-item infosound">\r\n\t\t\t\t<a href="#infosound">\r\n\t\t\t\t\t<span class="vallet-card-img">\r\n\t\t\t\t\t\t<img class="img-active"src="./image/top/infosound-icon.svg">\r\n\t\t\t\t\t\t<img class="img-blur"src="./image/top/infosound-icon-blur.svg">\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<p class="vallet-card-name">ポイント</p>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t';
 } else if( AppConf.wallet.use.type === "stamp"){ 
__p+='\r\n\t\t\t<li class="list-item stamp">\r\n\t\t\t\t<a href="#stamp">\r\n\t\t\t\t\t<span class="vallet-card-img">\r\n\t\t\t\t\t\t<img class="img-active"src="./image/top/stamp-icon.svg">\r\n\t\t\t\t\t\t<img class="img-blur"src="./image/top/stamp-icon-blur.svg">\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<p class="vallet-card-name">スタンプ</p>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t';
 } else { 
__p+='\r\n\t\t\t<li class="list-item member active">\r\n\t\t\t\t<a href="#member">\r\n\t\t\t\t\t<span class="vallet-card-img">\r\n\t\t\t\t\t\t<img class="img-active" src="./image/top/member-card-icon.svg">\r\n\t\t\t\t\t\t<img class="img-blur" src="./image/top/member-card-icon-blur.svg">\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<p class="vallet-card-name">会員証</p>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t';
 } 
__p+='\r\n\t\t';
 if( App.util.common.countActiveFeatureInWallet() >= 2 ){ 
__p+='\r\n\t\t\t<li class="list-item wallet">\r\n\t\t\t\t<a href="#wallet">\r\n\t\t\t\t\t<span class="vallet-card-img">\r\n\t\t\t\t\t\t<img class="img-active" src="./image/top/hamberger-icon.svg">\r\n\t\t\t\t\t\t<img class="img-blur" src="./image/top/hamberger-icon-blur.svg">\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<p class="vallet-card-name">全て</p>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t';
 } 
__p+='\r\n\t\t';
 if( AppConf.features.passTicket ){ 
__p+='\r\n\t\t\t<li class="list-item pass-ticket">\r\n\t\t\t\t<a href="#pass-ticket">\r\n\t\t\t\t\t<span class="vallet-card-img">\r\n\t\t\t\t\t\t<img class="img-active"src="./image/top/pass-ticket-icon.svg">\r\n\t\t\t\t\t\t<img class="img-blur" src="./image/top/pass-ticket-icon-blur.svg">\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<p class="vallet-card-name">定期券</p>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t';
 } 
__p+='\r\n\t\t';
 if( AppConf.features.ticket ){ 
__p+='\r\n\t\t\t<li class="list-item ticket">\r\n\t\t\t\t<a href="#ticket">\r\n\t\t\t\t\t<span class="vallet-card-img">\r\n\t\t\t\t\t\t<img class="img-active" src="./image/top/ticket-icon.svg">\r\n\t\t\t\t\t\t<img class="img-blur" src="./image/top/ticket-icon-blur.svg">\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<p class="vallet-card-name">チケット</p>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t';
 } 
__p+='\r\n\t\t';
 if( AppConf.features.coupon ){ 
__p+='\r\n\t\t\t<li class="list-item coupon">\r\n\t\t\t\t<a href="#coupon">\r\n\t\t\t\t\t<span class="vallet-card-img">\r\n\t\t\t\t\t\t<img class="img-active" src="./image/top/coupon-icon.svg">\r\n\t\t\t\t\t\t<img class="img-blur" src="./image/top/coupon-icon-blur.svg">\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<p class="vallet-card-name">クーポン</p>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t';
 } 
__p+='\r\n\t</ul>\r\n</div>\r\n<div id="floating-btn" class="scroll-top floating-btn hide"><span class="scroll-top-icon"></span></div>\r\n';
 } 
__p+='';
}
return __p;
};

},{}],158:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var HeaderView = Backbone.Marionette.ItemView.extend({
		template: require('./header_view.html'),
		ui: {
			"title" : ".title",
			"back": ".HEADER-LEFT",
			"rightButton": ".HEADER-RIGHT",
			"ticketBadge": ".ticket-badge",
			"walletMenu": ".wallet-menu",
			"floatingButton": "#floating-btn",
		},
		events: {
			"click @ui.back": "_doBack",
			"click @ui.rightButton": "doActionRightButton",
			"click @ui.floatingButton" : "scrollTop",
		},
		initialize: function( options ){
			this.headerModel = options.headerModel;
			this.listenTo( this.headerModel, 'change', this.refresh );
			if( AppConf.features.wallet ){
				this.listenTo(App, "onRoute", this.onRoute);
			}
		},
		onRoute: function() {
			var routes = Backbone.history.getFragment().split(/(\?|\/)/)[0];
			(routes || (routes = 'home'))
			var checkRoute = ['home', 'member', 'infosound', 'stamp', 'wallet', 'pass-ticket', 'ticket', 'coupon' ].indexOf(routes) > -1; // array is the links of each item in wallet menu and home
			// check active item wallet menu
			if (checkRoute) {
				$('.wallet-menu .list-item').removeClass('active');
				$('.wallet-menu .list-item.' + routes).addClass('active');
			} else {
				$('.wallet-menu .list-item').removeClass('active');
			}
			this.refresh();
		},
		onRender: function(){
		},
		refresh: function(){
			this.ui.title.html( this.headerModel.get("title") );

			// ヘッダの表示/非表示
			if( this.headerModel.get( 'hideHeader' ) ){
				this.$el.parent().addClass( 'HIDE' );
			}else{
				this.$el.parent().removeClass( 'HIDE' );
			}

			// 戻るボタン
			if( this.headerModel.get( 'showBackButton' ) ){
				this.ui.back.removeClass( 'hide' );
			}else{
				this.ui.back.addClass( 'hide' );
			}

			// ホームボタン
			if (this.headerModel.get('showRightButton')) {
				this.ui.rightButton.removeClass('hide');
			} else {
				this.ui.rightButton.addClass('hide');
			}

			// 財布ボタン
			if (this.headerModel.get('showWalletMenu')) {
				this.ui.walletMenu.removeClass('hide');
				$('.BACKBONE-PAGE').addClass('hasWalletMenu');
			} else {
				this.ui.walletMenu.addClass('hide');
				$('.BACKBONE-PAGE').removeClass('hasWalletMenu');
			}

			// 財布ボタン 
			this.ui.floatingButton.addClass('hide');
			if (this.headerModel.get('showFloatingButton')) {
				setTimeout(function(){
					$(".inner-top, .BACKBONE-PAGE").scroll(function() {
						if($(this).scrollTop() > 0){
							$("#floating-btn").removeClass('hide');
						} else {
							$("#floating-btn").addClass('hide');
						}
					});
				}, 500);
			} else {
				this.ui.floatingButton.addClass('hide');
			}

			

		},
		showBadgePassTicket: function() {
			this.ui.ticketBadge.removeClass('hide');
		},
		hideBadgePassTicket: function() {
			this.ui.ticketBadge.addClass('hide');
		},
		_doBack: function(e){
			e.preventDefault();

			if( this.headerModel.get("customeBackAction") ){
				this.headerModel.get("customeBackAction")();
			}else{
				App.pageSlider.back();
			}
		},
		doActionRightButton: function(e){
			e.preventDefault();
			if (this.headerModel.get("customeActionRightButton")) {
				this.headerModel.get("customeActionRightButton")();
			} else {
				App.pageSlider.home();
			}
		},
		scrollTop: function(){
			var routes = Backbone.history.getFragment().split(/(\?|\/)/)[0];
			(routes || (routes = 'home'))
			var contentScroll = routes ==="home" ? ".inner-top" : ".BACKBONE-PAGE";
			$(contentScroll).animate({scrollTop: 0}, 500);
		}

	});
	return HeaderView;
})();

},{"./header_view.html":157,"backbone":"5kFNoY"}],159:[function(require,module,exports){
var Backbone = require('backbone');
var LoginView = require('./login_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		initialize: function(){
		},
		onRender: function(){
			this._renderLoginMain();
			App.util.hideProgressScreen();
		},
		headerConf: {
			title: "ログイン",
			showBackButton: true,
			customeBackAction: function(){
				App.pageSlider.backAndRestartHistory();
			}
		},
		_renderLoginMain: function(){
			this.loginMainRegion.show( new LoginView() );
		}
	});

	return LoginLayout;
})();

},{"./login_layout_template.html":160,"./login_view.js":172,"backbone":"5kFNoY"}],160:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\r\n<div id="LOGIN-MAIN" class="BACKBONE-PAGE">\r\n\r\n<div id="login-main-region">\r\n</div>\r\n\r\n</div>\r\n';
}
return __p;
};

},{}],161:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var ConfigTopLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./login_sms_menu_layout_template.html'),
		regions: {
		},
		ui: {
			"registCardUserBtn" : "#regist-carduser-btn",
			"registUserBtn" : "#regist-user-btn"
		},
		events: {
			"click @ui.registCardUserBtn" : "openRegistCardUserWindow",
			"click @ui.registUserBtn" : "openRegistUserWindow"
		},
		initialize: function(options){
			this.userId = options.userId;

			var auth = App.getAuthInfo();
			this.smstel = auth.smstel;
			console.log("userId:" + this.userId );
			console.log("smstel:" + this.smstel );
		},
		headerConf: {
			title: "メニュー",
			showBackButton: true,

		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
		openRegistCardUserWindow: function(){
			var sid = this.userId + this.smstel.substr(-4);
			var url = AppConf.url.registerFormCard + '&SID=' + sid;
			console.log("sid:" + sid );

			location.href = url + '&launch_webview=yes';
//			location.href = url;
		},
		openRegistUserWindow: function(){
			var sid = this.userId + this.smstel.substr(-4);
			var url = AppConf.url.registerForm + '&SID=' + sid;
			console.log("sid:" + sid );

			location.href = url + '&launch_webview=yes';
//			location.href = url;
		}
	});

	return ConfigTopLayoutView;
})();

},{"./login_sms_menu_layout_template.html":162,"backbone":"5kFNoY"}],162:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="CONFIG-TOP" class="BACKBONE-PAGE">\r\n\r\n<div class="bgcolor3 ftcolor1">\r\n\t<ul>\r\n\t\t<li class="bdcolor1" id="regist-carduser-btn"><a >カードをお持ちの方はこちら</a></li>\r\n\t\t<li class="bdcolor1" id="regist-user-btn"><a >モバイル会員証のみでご利用の方はこちら</a></li>\r\n\t</ul>\r\n</div>\r\n\r\n\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],163:[function(require,module,exports){
var Backbone = require('backbone');
var LoginView = require('./login_sms_pass_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_sms_pass_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		initialize: function(options){
			this.smstel  = options.smstel;
			this.userId  = options.userId;
			console.log('initialize done userId:' + this.userId);
		},
		onRender: function(){
			this._renderLoginMain();
			App.util.hideProgressScreen();
		},
		headerConf: {
			title: "ログイン",
			showBackButton: true,
			customeBackAction: function(){
				App.pageSlider.backAndRestartHistory();
			}
		},
		_renderLoginMain: function(){
//			console.log('_renderLoginMain smstel:' + this.smstel);
			console.log('_renderLoginMain done userId:' + this.userId);
			this.loginMainRegion.show( new LoginView({smstel: this.smstel, userId: this.userId}) );
		}
	});

	return LoginLayout;
})();

},{"./login_sms_pass_layout_template.html":164,"./login_sms_pass_view.js":166,"backbone":"5kFNoY"}],164:[function(require,module,exports){
module.exports=require(160)
},{}],165:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="LOGIN">\r\n\t<span class="forget ftcolor2" style="border:none;">\r\n\t入力された電話番号宛にSMSを送信しました。<br>\r\n\tSMSに記載された会員登録フォームURLより<br>会員登録を行って下さい。\r\n\t</span>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],166:[function(require,module,exports){
var Backbone = require('backbone');
var InformationCollection = require('../models/information_collection');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_sms_pass_template.html'),
		events: {
			"click .login-btn" : "execLogin",
			"click @ui.cancelBtn" : "execCancel"
		},
		initialize: function(options){
			this.smstel = options.smstel;
			this.userId = options.userId;
			this.informationCollection = new InformationCollection();
		},
		ui: {
//			"inputId" : "[name=user-id]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
//			this.ui.inputId.val( auth.userid );
//			this.ui.inputPassword.val( auth.password );
		},
		execLogin: function(){
			console.log('execLogin smstel:' + this.smstel);
			var smstel = this.smstel;
			var userId = this.userId;
			console.log('execLogin done userId:' + userId);
			var _this = this;
			var password = this.ui.inputPassword.val();
			if (password == "") {
				applican.notification.alert("パスワードを入力してください。", App.doNothing, "", "OK");
			} else {
				var loginRequest = function(){
					return App.util.bindCommonErrorHandling(
						App.btApi.loginSms( smstel, password),
						{ ignoreStatuses: [401,404] }
					);
				};

				// ログインリクエストを実行
				App.util.execWithProgressScreen( loginRequest )
				.done( function(data){
					_this.informationCollection.clearCache();
					// ログインが成功したら、smstelのみ保存
					App.appModel.setAuthAndSave( { smstel: smstel, password: password, tokentemp: data.accessToken, token: "" } );
//					var sid = userId + smstel.substr(-4);
//					var url = AppConf.url.registerForm + '&SID=' + sid;
//					location.href = url;

					var url = '#loginSmsMenu?userId=' + userId;
//					location.hash = url + '&launch_webview=yes';
					location.hash = url;
				}).fail(function(err){
					if(err.status === 401){
						applican.notification.alert("認証に失敗しました。番号認証に戻ってやり直してください", App.doNothing, "", "OK");
					} else if (err.status === 404){
						applican.notification.alert("ユーザ名とパスワードの組み合わせが間違っています", App.doNothing, "", "OK");
					}else{
						// その他のエラーは bindCommonErrorHandling でハンドル済み
					}
				});
			}
		},
		execCancel: function(){
			App.pageSlider.backAndRestartHistory();
		},
	});

	return LoginView;

})();

},{"../models/information_collection":214,"./login_sms_pass_template.html":165,"backbone":"5kFNoY"}],167:[function(require,module,exports){
var Backbone = require('backbone');
var LoginView = require('./login_sms_tel_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_sms_tel_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		initialize: function(){
		},
		onRender: function(){
			this._renderLoginMain();
			App.util.hideProgressScreen();
		},
		headerConf: {
			title: "ログイン",
			showBackButton: true,
			customeBackAction: function(){
				App.pageSlider.backAndRestartHistory();
			}
		},
		_renderLoginMain: function(){
			this.loginMainRegion.show( new LoginView() );
		}
	});

	return LoginLayout;
})();

},{"./login_sms_tel_layout_template.html":168,"./login_sms_tel_view.js":170,"backbone":"5kFNoY"}],168:[function(require,module,exports){
module.exports=require(160)
},{}],169:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="LOGIN">\r\n\t<label for="user-id">携帯電話番号</label>\r\n\t<input type="tel" name="smstel" id="user-id">\r\n\t<button type="button" class="login-btn btbgcolor1 btftcolor1">規約に同意して番号認証</button>\r\n\t<span class="cancel-btn">認証をスキップ</span>\r\n\t<p class="instruction ftcolor2">※認証をスキップすると、クーポン・スタンプ・<br>\r\n\tポイント・スクラッチの機能が制限されます。</p>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],170:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_sms_tel_template.html'),
		events: {
			"click .login-btn" : "sendSms",
			"click @ui.cancelBtn" : "execCancel"
		},
		ui: {
			"inputSmstel" : "[name=smstel]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
			this.ui.inputSmstel.val( auth.smstel );
//			this.ui.inputPassword.val( auth.password );
		},
		sendSms: function(){
			var smstel = this.ui.inputSmstel.val();
			if (smstel == "") {
				applican.notification.alert("電話番号を入力してください。", App.doNothing, "", "OK");
			} else {
				var loginRequest = function(){
					return App.util.bindCommonErrorHandling(
						App.btApi.sendsms(smstel),
						{ ignoreStatuses: [400] }
					);
				};

				// ログインリクエストを実行
				App.util.execWithProgressScreen( loginRequest )
				.done( function(data){
					var userId = data.userId;
//					var passwordOne = data.passwordOne;
					console.log('sendsms done userId:' + userId);
//					console.log('sendsms done passwordOne:' + passwordOne);
					if (userId) {
//						console.log('sendsms done smstel:' + smstel);
						location.hash = '#loginSmsPass?userId=' + userId + '&smstel=' + smstel;
					}
				}).fail(function(err){
					if(err.status === 400){
						applican.notification.alert("電話番号を確認してください", App.doNothing, "", "OK");
					}else{
						// その他のエラーは bindCommonErrorHandling でハンドル済み
					}
				});
			}
		},
		execCancel: function(){
			App.pageSlider.backAndRestartHistory();
		},
	});

	return LoginView;

})();

},{"./login_sms_tel_template.html":169,"backbone":"5kFNoY"}],171:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="LOGIN">\r\n\t';
 if( AppConf.features.sms ){ 
__p+='\r\n\t\t<label for="user-id">メールアドレス／電話番号</label>\r\n\t';
 } else { 
__p+='\r\n\t\t<label for="user-id">メールアドレス</label>\r\n\t';
 } 
__p+='\r\n\t\t<input type="text" name="user-id" id="user-id">\r\n\t\t<label for="password">パスワード</label>\r\n\t\t<input type="password" name="password" id="password">\r\n\t\t<button type="button" class="login-btn btbgcolor1 btftcolor1">ログイン</button>\r\n\t\t<a href="'+
((__t=( App.util.text.addUrlParameters(AppConf.url.forgetPassword, ['launch_webview=yes']) ))==null?'':__t)+
'" class="forget ftcolor2">パスワードを忘れた方はコチラ</a>\t\t\r\n\t\t<a href="#register" class="singup btbdcolor1 btftcolor2">新規会員登録へ</a>\r\n\t';
 if( AppConf.features.sms ){ 
__p+='\r\n\t\t<a href="#loginSms" class="singup btbdcolor1 btftcolor2">電話番号で新規登録</a>\r\n\t';
 } 
__p+='\r\n\t<span class="cancel-btn">会員登録をスキップ</span>\r\n\t<p class="instruction ftcolor2">※会員登録をスキップすると、クーポン・スタンプ・<br>\r\n\tポイント・スクラッチの機能が制限されます。</p>\r\n</div>\r\n'+
((__t=( App.util.injectProgressScreenDom()  ))==null?'':__t)+
'\r\n';
}
return __p;
};

},{}],172:[function(require,module,exports){
var Backbone = require('backbone');
var InformationCollection = require('../models/information_collection');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_template.html'),
		events: {
			"click .login-btn" : "execLogin",
			"click @ui.cancelBtn" : "execCancel"
		},
		ui: {
			"inputId" : "[name=user-id]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
			this.ui.inputId.val( auth.userid );
			this.ui.inputPassword.val( auth.password );
			this.informationCollection = new InformationCollection();
		},
		execLogin: function(){
			var userid = this.ui.inputId.val();
			var password = this.ui.inputPassword.val();
			var loginRequest;
			var _this = this;
			if(userid === '') {
				var errorMsg = "メールアドレスを入力して下さい";
				if( AppConf.features.sms ){
					errorMsg = "メールアドレスまたは電話番号を入力して下さい";
				}
				applican.notification.alert(errorMsg, App.doNothing, "", "OK");
				return false;
			} else if (!AppConf.features.sms || userid.match(/[^0-9]+/)) {
				// login with mailaddress
				loginRequest = function(){
				return App.util.bindCommonErrorHandling(
					App.btApi.login( userid, password),
					{ ignoreStatuses: [404] }
				);
				};
			} else {
				// login with phone number
				loginRequest = function(){
					return App.util.bindCommonErrorHandling(
						App.btApi.loginSms( userid, password),
						{ ignoreStatuses: [404] }
					);
				};
			}

			// ログインリクエストを実行
			App.util.execWithProgressScreen( loginRequest )
			.done( function(data){
				_this.informationCollection.clearCache();
				// ログインが成功したら、ID/PASSを永続化して以前の画面に戻る
				App.appModel.setAuthAndSave( { userid: userid, password: password, token: data.accessToken } );
				App.pageSlider.back();
				App.vent.trigger( 'app-login' , { userid: userid, password: password, token: data.accessToken });
			}).fail(function(err){
				if(err.status === 404){
					applican.notification.alert("ユーザ名とパスワードの組み合わせが間違っています", App.doNothing, "", "OK");
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		},
		execCancel: function(){
			App.appModel.setAuthAndSave( { userid: '', password: '', token: '' } );
			App.pageSlider.backAndRestartHistory();
		},
	});

	return LoginView;

})();

},{"../models/information_collection":214,"./login_template.html":171,"backbone":"5kFNoY"}],173:[function(require,module,exports){
var ModalAlertView = require('./modals/alert/modal_alert_view');
var ModalConfirmView = require('./modals/confirm/modal_confirm_view');

window.App = {};
window.onload = initializeLiff;

function initializeLiff() {
	liff
		.init({
			liffId: AppConf.liff.id
		})
		.then(() => {
			startApp();
		})
		.catch((err) => {
			// Error happens during initialization
			console.log(err.code, err.message);
		});
}

function startApp() {
	// ############## liff API start #################
	liff.config = {
		device_os: (liff.getOS() && liff.getOS().toUpperCase()) || 'ANDROID',
	};
	liff.device = {
		package_name: "com.betrend.dev.dvep",
	};
	window.applican = liff;
	// ############## liff API end #################

	// start to use LIFF's api
	// if (!liff.isLoggedIn()) {
	// 	liff.login();
	// } else {
		if (!window.AppConf) {
			applican.notification.alert("アプリ設定が読み込まれていません", function () { return false; }, "title", "OK");
			return;
		}
		App = require('./app.js');
		var modalConfirmView = new ModalConfirmView();
		var modalAlertView = new ModalAlertView();
		window.applican.notification = {
			alert: function (message, alertCallback, title, buttonName) {
				var resultAlert = modalAlertView.show({ title: title, text: message, okButton: buttonName });
				if (alertCallback) {
					resultAlert.then(alertCallback)
				}
			},
			confirm: function (message, confirmCallback, title, buttonName, cancelCallback) {
				var buttons = [];
				if (buttonName) {
					buttons = buttonName.split(',');
				}
				modalConfirmView.show({ title: title, text: message, okButton: buttons[0], cancelButton: buttons[1] ? buttons[1] : null }).then(function (res) {
					if (res === 1) {
						confirmCallback && confirmCallback(1);
					} else {
						cancelCallback && cancelCallback();
					}
				});
			}
		};
		
		var idToken = liff.getIDToken();
		console.log(idToken);
		App.util.showProgressScreenExtend();
		// App.btApi.loginByLine(idToken).done(function(res) {
		App.btApi.login("test1@betrend.com", "1234").done(function(res) {
			App.util.hideProgressScreenExtend();
			if(res.accessToken){
				App.start({ token: res.accessToken });
			} else {
				applican.notification.alert("LINEでログインできません", function(){
					liff.closeWindow();
				}, "", "OK");
			}
		}).fail(function(err) {
			App.util.hideProgressScreenExtend();
			applican.notification.alert("LINEでログインできません", function(){
				liff.closeWindow();
			}, "", "OK");
		});
	// }
}

},{"./app.js":9,"./modals/alert/modal_alert_view":190,"./modals/confirm/modal_confirm_view":193}],174:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<header class="APP-HEADER app-header">\r\n</header>\r\n<div id="master-container-wrapper" class="bgcolor1">\r\n  <div id="master-container">\r\n  </div>\r\n</div>\r\n';
 if(AppConf.features.changeMenu && AppConf.menu.style == AppConf.menus.footer){ 
__p+='\r\n<footer class="APP-FOOTER app-footer ';
 if (AppConf.UI.version === "v2"){ 
__p+='v2';
}
__p+=' ';
 if (AppConf.features.wallet){ 
__p+='wallet-footer';
}
__p+='"></footer>\r\n';
}
__p+='\r\n';
}
return __p;
};

},{}],175:[function(require,module,exports){
var Backbone = require('backbone');
var HeaderView = require('./header/header_view');
var FooterView = require('./footer/footer_view');
module.exports = (function () {

	var MainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./main_layout.html'),
		regions: {
			"headerRegion" : ".app-header",
			"footerRegion" : ".app-footer",
		},
		ui: {
			"masterContainer" : "#master-container"
		},
		initialize: function(){
			App.headerView = this.headerView = new HeaderView({
				headerModel: App.headerModel
			});
		},
		onRender: function(){
			var appHeaderHeight = 44;
			this.ui.masterContainer.css({"min-height": window.innerHeight - appHeaderHeight + "px"});
			this.headerRegion.show(this.headerView);
			if(AppConf.features.changeMenu && AppConf.menu.style == AppConf.menus.footer){
				this.footerView = new FooterView();
				this.footerRegion.show( this.footerView );
			}
		}
	});

	return MainLayout;
})();

},{"./footer/footer_view":155,"./header/header_view":158,"./main_layout.html":174,"backbone":"5kFNoY"}],176:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="APP-TOP" class="BACKBONE-PAGE">\r\n  <div class="cf">\r\n    <div class="inner-top">\r\n      ';
 if( AppConf.features.wallet &&  App.appModel.getAuthInfo().token !== "" ){ 
__p+='\r\n        <div class="status-card-container">\r\n          <div class="status-card-area">\r\n            ';
 if(AppConf.wallet.use.type === "infosound"){ 
__p+='\r\n              <a href="#infosound/point" class="point-area align-center">\r\n                <div class="pass-ticket-point">\r\n                  <p class="curent-point"><span class="point-value">0</span><span class="unit"> pt</span></p>\r\n                  <p class="effective">有効期限: <span class="card-date-time"></span></p>\r\n                </div>\r\n                <div class="use-point">\r\n                  <span class="point-use-button">ポイント利用<img src="./image/top/icon-small-arrow-red.png"></span>\r\n                </div>\r\n              </a>\r\n            ';
 } else if(AppConf.wallet.use.type === "stamp"){ 
__p+='\r\n              ';
 if( AppConf.layout.stamp.type === 'hitap' ){ 
__p+='\r\n                <a href="#stamp/point" class="point-area align-center">\r\n                  <div class="pass-ticket-point">\r\n                    <p class="curent-point"><span class="point-value">0</span><span class="unit"> pt</span></p>\r\n                    <p class="effective">有効期限: <span class="card-date-time"></span></p>\r\n                  </div>\r\n                  <div class="use-point">\r\n                    <span class="point-use-button">ポイント利用<img src="./image/top/icon-small-arrow-red.png"></span>\r\n                  </div>\r\n                </a>\r\n              ';
 } 
__p+='\r\n            ';
 } else { 
__p+='\r\n              <a href="#member/point" class="point-area">\r\n                <div class="pass-ticket-img">\r\n                  <img src="./image/top/logo-point.png" >\r\n                </div>\r\n                <div class="pass-ticket-point">\r\n                  <p class="curent-point"><span class="point-value">0</span><span class="unit"> pt</span></p>\r\n                  <p class="effective">有効期限: <span class="card-date-time"></span></p>\r\n                </div>\r\n                <div class="use-point">\r\n                  <span class="point-use-button">ポイント利用<img src="./image/top/icon-small-arrow-red.png"></span>\r\n                </div>\r\n              </a>\r\n            ';
 } 
__p+='\r\n            <ul class="wallet-card-list col-'+
((__t=( App.util.common.countActiveFeatureInWallet() + 1 ))==null?'':_.escape(__t))+
' ';
 if(AppConf.wallet.use.type === 'stamp' && AppConf.layout.stamp.type != 'hitap'){ 
__p+='no-border';
 } 
__p+='">\r\n              ';
 if(AppConf.wallet.use.type === "stamp"){ 
__p+='\r\n                <li>\r\n                  <a class="stamp" href="#stamp">\r\n                    <div class="status-card-bg stamp-card">\r\n                      <img src="./image/top/stamp-icon.svg" alt="">\r\n                      <span>スタンプ</span>\r\n                    </div>\r\n                    <span class="status-card-button">獲得</span>\r\n                  </a>\r\n                </li>\r\n              ';
 } else if( AppConf.wallet.use.type === "infosound"){ 
__p+='\r\n                <li>\r\n                  <a href="#infosound">\r\n                    <div class="status-card-bg">\r\n                      <img src="./image/top/infosound-icon.svg" alt="">\r\n                      <span>ポイント</span>\r\n                    </div>\r\n                    <span class="status-card-button">獲得</span>\r\n                  </a>\r\n                </li>\r\n              ';
 } else { 
__p+='\r\n                <li>\r\n                  <a href="#member">\r\n                    <div class="status-card-bg">\r\n                      <img src="./image/top/member-card-icon.svg" alt="">\r\n                      <span>会員証</span>\r\n                    </div>\r\n                    <span class="status-card-button">表示</span>\r\n                  </a>\r\n                </li>\r\n              ';
 } 
__p+='\r\n              ';
 if( AppConf.features.passTicket){ 
__p+='\r\n              <li class="pass-ticket">\r\n                <a href="#pass-ticket">\r\n                  <div class="status-card-bg">\r\n                    <img src="./image/top/pass-ticket-icon.svg" alt="">\r\n                    <span>定期券</span>\r\n                  </div>\r\n                  <span class="status-card-button not-bg">\r\n                    <span id="coupon-count" class="status-count">0</span>枚\r\n                  </span>\r\n                </a>\r\n              </li>\r\n              ';
 } 
__p+='\r\n              ';
 if( AppConf.features.ticket){ 
__p+='\r\n                <li class="ticket">\r\n                  <a href="#ticket">\r\n                    <div class="status-card-bg">\r\n                      <img src="./image/top/ticket-icon.svg" alt="">\r\n                      <span>チケット</span>\r\n                    </div>\r\n                    <span class="status-card-button pink-bg">購入</span>\r\n                  </a>\r\n                </li>\r\n              ';
 } 
__p+='\r\n              ';
 if( AppConf.features.coupon){ 
__p+='\r\n                <li>\r\n                  <a href="#coupon">\r\n                    <div class="status-card-bg">\r\n                      <img src="./image/top/coupon-icon.svg" alt="">\r\n                      <span>クーポン</span>\r\n                    </div>\r\n                    <span class="status-card-button not-bg">\r\n                      <span id="coupon-count" class="status-count">0</span>枚\r\n                    </span>\r\n                  </a>\r\n                </li>\r\n              ';
 } 
__p+='\r\n            </ul>          \r\n          </div>\r\n        </div>\r\n      ';
 } 
__p+='\r\n      ';
 if( AppConf.features.slideshow ){ 
__p+='\r\n        <div class="sliderImages">\r\n          <div class="slickSlider"></div>\r\n        </div>\r\n      ';
 } 
__p+='\r\n      ';
 if( AppConf.features.tileBanner ) { 
__p+='\r\n        <div class="tile-banner-container"></div>\r\n      ';
 } 
__p+='\r\n    <div class="topBg"></div>\r\n    <!-- end .topBg -->\r\n    </div>\r\n    <div class="menuContainer ';
 if (applican.config.device_os === "IOS"){ 
__p+='ios';
}
__p+=' ';
 if(AppConf.features.changeMenu && AppConf.menu.style == AppConf.menus.footer){ 
__p+='hasFixedFooterMenu';
}
__p+=' ';
 if (AppConf.UI.version === "v2"){ 
__p+='v2';
}
__p+='">\r\n    ';
 if( (AppConf.features.point || AppConf.features.passTicket) && !AppConf.features.wallet){ 
__p+='\r\n      ';
 if( App.appModel.getAuthInfo().token !== "" ){ 
__p+='\r\n        ';
 if( AppConf.features.point){ 
__p+='\r\n        <a href="#point" class="pointArea point">\r\n          <div class="pointLeft">\r\n            <div class="bgnumpoint">\r\n              <p class="txtpoint">現在のポイント</p>\r\n              <p class="numpoint"><span class="point-value">0</span><span class="point-label">pt</span></p>\r\n            </div>\r\n          </div>\r\n          <div class="pointRight">\r\n            <div class="btnUsePoint">\r\n              <p>ポイントを使う</p>\r\n              <img src="./image/top/icon_arrow.png">\r\n            </div>\r\n          </div>\r\n        </a>\r\n        ';
 }else{ 
__p+='\r\n            <a href="#pass-ticket" class="pointArea pass-ticket-area">\r\n              <div class="pass-ticket-banner hide">\r\n                <img class="pass-ticket-image" src=\''+
((__t=( AppConf.passTicket.bannerImage ))==null?'':_.escape(__t))+
'\' alt=\'\'/>\r\n              </div>\r\n              <div class="pass-ticket-area-container hide">\r\n                <div class="pass-ticket-bg">\r\n                  <div class="ticket-bg-row ticket-bg-top"></div>\r\n                  <div class="ticket-bg-row ticket-bg-bottom"></div>\r\n                </div>\r\n                <div class="pass-ticket-content">\r\n                  <div class="pass-ticket-column pass-ticket-card-view">\r\n                    <div class="card-view-container">\r\n                      <div class="card-title">PASS</div>\r\n                      <div class="card-content">有効期限</div>\r\n                      <div class="card-date-time">18.12.31</div>\r\n                    </div>\r\n                  </div>\r\n                  <div class="pass-ticket-column pass-ticket-info-view">\r\n                    <div class="info-container">\r\n                        <div class="info-row start-ticket"><span class="start-ticket-text"></span></div>\r\n                        <div class="info-row pass-ticket-view-detail-button">\r\n                            <div class="detail-button">定期券を表示</div>\r\n                        </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </a>\r\n        ';
 } 
__p+='\r\n      ';
 }else{ 
__p+='\r\n        <div class="pointArea notlogin point">\r\n          <a class="btn" href="#login">ログイン</a>\r\n          <a class="btn" href="#register">新規登録</a>\r\n        </div>\r\n      ';
 } 
__p+='    \r\n    ';
 } else if( AppConf.features.wallet && App.appModel.getAuthInfo().token === "" ){ 
__p+='      \r\n      <div class="pointArea">\r\n        <a class="btn" href="#login">ログイン</a>\r\n        <a class="btn" href="#register">新規登録</a>\r\n      </div>\r\n    ';
 } else if( AppConf.features.smart ){ 
__p+='\r\n        <div class="pointBlock">\r\n          <a href="#smart">\r\n            <div class="inner-point">\r\n              <p class="box-point"> <span>合計</span> <span class="total-point">0</span> <span>円分</span><br><span>ご利用可能</span> </p>\r\n              <p class="box-link"><span>＜ タッチして利用 ＞</span></p>\r\n            </div>\r\n            <!-- /.inner-point -->\r\n          </a>\r\n        </div>\r\n    ';
 } 
__p+='\r\n    ';
 if(!(AppConf.features.changeMenu && AppConf.menu.style == AppConf.menus.footer)){ 
__p+='\r\n      <div class="menuTitle">\r\n        <div class="menuBody">\r\n          <div class="menuColumn3 bdcolor1 cf">\r\n            <a href="#stamp">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_stamp.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">来店スタンプ</p>\r\n              </div>\r\n            </a>\r\n            <a href="#coupon">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_coupon.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">クーポン一覧</p>\r\n              </div>\r\n            </a>\r\n            <a href="#information">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_info.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">お知らせ</p>\r\n                <span class="badge-number"></span>\r\n              </div>\r\n            </a>\r\n          </div>\r\n\r\n          <div class="menuColumn3 bdcolor1 cf">\r\n            <a href="#member">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_members.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">会員証</p>\r\n              </div>\r\n            </a>\r\n            <a href="#shop">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_shop.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">店舗検索</p>\r\n              </div>\r\n            </a>\r\n            <a href="#scratch">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_scratch.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">スクラッチ</p>\r\n              </div>\r\n            </a>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div class="menuFooter">\r\n          <div class="menuColumn2 bdcolor1">\r\n            <a href="#history">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_history.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnS ftcolor1 bdcolor1">利用履歴</p>\r\n              </div>\r\n            </a>\r\n            <a href="#config">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_config_small.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnS ftcolor1 bdcolor1">設定</p>\r\n              </div>\r\n            </a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      ';
}
__p+='\r\n    </div> <!-- /.menuContainer -->\r\n\r\n  </div>\r\n</div> <!-- /#APP-TOP -->';
}
return __p;
};

},{}],177:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="APP-TOP" class="BACKBONE-PAGE" style="margin-top: -44px; height: calc(100% + 44px);">\r\n<div class="cf">\r\n  <div class="inner-top">\r\n    ';
 if( AppConf.features.slideshow ){ 
__p+='\r\n      <div class="sliderImages">\r\n        <div class="slickSlider"></div>\r\n      </div>\r\n    ';
 } 
__p+='\r\n    ';
 if( AppConf.features.tileBanner ) { 
__p+='\r\n      <div class="tile-banner-container"></div>\r\n    ';
 } 
__p+='\r\n  </div>\r\n  ';
 if( !AppConf.features.slideshow && !AppConf.features.tileBanner ) { 
__p+='\r\n    <div class="topBg">\r\n      <img src="'+
((__t=( AppConf.slideshow.slideshowContentsList[0].imageUrl ))==null?'':__t)+
'">\r\n    </div>\r\n  <!-- /.topBg -->\r\n  ';
 } 
__p+='\r\n\r\n  <div class="menuContainer ';
 if(AppConf.features.changeMenu && AppConf.menu.style == AppConf.menus.footer){ 
__p+='hasFixedFooterMenu';
}
__p+='">\r\n    ';
 if(!(AppConf.features.changeMenu && AppConf.menu.style == AppConf.menus.footer)){ 
__p+='\r\n      <div class="menuTitle">\r\n        <div class="menuBody bdRight">\r\n\r\n          <div class="menuColumn2 cf">\r\n            <a href="#coupon">\r\n              <div class="menuBlock bdRight">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_coupon.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">クーポン一覧</p>\r\n              </div>\r\n            </a>\r\n            <a href="#information">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_information.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">お知らせ</p>\r\n              </div>\r\n            </a>\r\n          </div>\r\n\r\n          <div class="menuColumn2 bdcolor1 cf">\r\n            <a href="#stamp">\r\n              <div class="menuBlock bdRight">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_stamp.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">来店スタンプ</p>\r\n              </div>\r\n            </a>\r\n            <a href="#shop">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_shop.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnM ftcolor1 bdcolor1">店舗検索</p>\r\n              </div>\r\n            </a>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div class="menuFooter bdRight">\r\n\r\n          <div class="menuColumn2 bdcolor1 cf">\r\n            <a href="#history">\r\n              <div class="menuBlock bdRight">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_history.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnS ftcolor1 bdcolor1">利用履歴</p>\r\n              </div>\r\n            </a>\r\n            <a href="#config">\r\n              <div class="menuBlock">\r\n                <div class="svgContainer">\r\n                  <img src="./image/top/icon_config.png" width="50px" height="50px" alt=""/>\r\n                </div>\r\n                <p class="btnS ftcolor1 bdcolor1">設定</p>\r\n              </div>\r\n            </a>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    ';
}
__p+='\r\n</div>\r\n\r\n\r\n</div>\r\n</div>\r\n';
}
return __p;
};

},{}],178:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavModel = require('./main_nav_model.js');
module.exports = (function () {
	var MainNavCollection = Backbone.Collection.extend({
		model: MainNavModel
	});

	return MainNavCollection;

})();

},{"./main_nav_model.js":182,"backbone":"5kFNoY"}],179:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavItemView = require('./main_nav_item_view.js');
module.exports = (function () {
	var MainNavCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: MainNavItemView
	});

	return MainNavCollectionView;

})();

},{"./main_nav_item_view.js":181,"backbone":"5kFNoY"}],180:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="'+
((__t=( href ))==null?'':__t)+
'">\r\n<div class="LINKBOX">'+
((__t=( text ))==null?'':__t)+
'</div>\r\n</a>\r\n';
}
return __p;
};

},{}],181:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');
module.exports = (function () {
	var MainNavItemView = Backbone.Marionette.ItemView.extend({
		tagName: "li",
		template: require('./main_nav_item_view.html'),
	});

	return MainNavItemView;

})();

},{"./main_nav_item_view.html":180,"backbone":"5kFNoY","jquery":"HlZQrA"}],182:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('../models/base_model.js');
module.exports = (function () {
	var MainNavModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/information/list",
		parse: function(response) {
			return response;
		},
		fetchWithoutLogin: function( registrationId , options){
			var _options = _.extend( options || {}, { url: this.url + "?registrationId=" + registrationId } );
			return this.fetchWithoutAuthInfo( _options );
		}
	});

	return MainNavModel;
})();

},{"../models/base_model.js":204,"backbone":"5kFNoY"}],183:[function(require,module,exports){
var Backbone = require('backbone');
var MainNavCollectionView = require('./main_nav_collection_view.js');
var PointModel = require('../models/point_model.js');
var SlideShowModel = require('../slideshow/slideshow_model.js');
var SlideShowCollection = require('../slideshow/slideshow_collection.js');
var SlideShowCollectionView = require('../slideshow/slideshow_collection_view.js');
var ValueModel = require('../models/value_model.js');
var TileBannerCollectionView = require('./tileBanner/tileBanner_collection_view.js');
var TileBannerCollection = require('./tileBanner/tileBanner_collection.js');
var PassticketPurchaseCollection = require('../models/passticket_purchase_collection.js');
var CouponCollection = require('../models/coupon_collection.js');
var moment = require('moment');
module.exports = (function() {
	var MainNavView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return (AppConf.layout.navColumns === 2) ? require('./main_nav_2col.html') : require('./main_nav.html');
		},
		headerConf: {
			title: "Applican Sample",
			showBackButton: false,
			hideHeader: true,
		},
		ui: {
			"appTop": "#APP-TOP",
			"pointValue": ".point-value",
			"totalBalance": ".total-point",
			"badgeNumber": '.badge-number',
			"tileBanner": '.tile-banner-container',
			'menuContainer': '.menuContainer',
			"innerTop": '.inner-top',
			'passTicketBanner': '.pass-ticket-banner',
			'passTicketAreaContainer': '.pass-ticket-area-container',
			'walletCardList': '.wallet-card-list',
			'couponCount': '#coupon-count',
		},
		regions: {
			"navRegion": "#main-nav-region",
			"slideRegion": ".slickSlider",
			"tileBannerRegion": '.tile-banner-container'
		},
		initialize: function(options) {
			var _this = this;
			if (AppConf.features.tileBanner) {
				// init banner
				this.tileBannerCollection = new TileBannerCollection();
				this.tileBannerCollectionView = new TileBannerCollectionView({ collection: this.tileBannerCollection });
				this.listenTo(this.tileBannerCollection, 'sync', this.renderTileBanner);
				App.util.bindProgressScreen(this, this.tileBannerCollection);
			}
			
			if (AppConf.features.wallet || AppConf.features.passTicket) {
				var route = '#pass-ticket';
				if (AppConf.features.wallet) {
					route = '#config';
				}
				// setting header
				this.headerConf.customeActionRightButton = function() {
					location.hash = route;
				}
				this.headerConf.title = "<span><img src='./image/top/img_logo_header.png'/></span>";
				this.headerConf.hideHeader = false;
				// init pass ticket collection
				this.passticketPurchaseCollection = new PassticketPurchaseCollection();
				this.listenTo(this.passticketPurchaseCollection, 'sync', this.renderPassTicketBanner);
				App.util.bindProgressScreen(this, this.passticketPurchaseCollection);
				
				this.couponCollection = new CouponCollection({pagination: true});
				this.listenTo(this.couponCollection, 'sync', this.renderCouponTotalCount);

			}
			this.navCollection = options.navCollection;
			this.slideCollection = new SlideShowCollection();
			this.initCollectionSlide(this);
			this.slideModel = new SlideShowModel({ id: AppConf.core.localStorageKey });
			this.pointModel = new PointModel();
			if (AppConf.features.point && App.getAuthInfo().token) {
				App.util.bindProgressScreen(this, this.pointModel);
				this.listenTo(this.pointModel, 'sync', this._renderPoint);
			}
			App.util.bindProgressScreen(this, this.slideCollection);
			this.listenTo(this.slideCollection, 'sync', this._renderSlide);
			// valuecard
			if (AppConf.features.smart) {
				this.valueModel = new ValueModel();
				this.listenTo(this.valueModel, 'sync', this._renderValue);
			}
			$(window).on('resize', this.onResize.bind(this));
			this.listenTo(this, 'load:sync', this.onLoad);
		},
		onDestroy: function() {
			$(window).off('resize');
		},
		onRender: function() {
			var collectionView = new MainNavCollectionView({ collection: this.navCollection });

			if (AppConf.features.point && App.getAuthInfo().token) {
				this.pointModel.fetchWithAuthInfo({
					on401: function() { }
				});
			}

			if (AppConf.features.smart) {
				// valuecard
				this.valueModel.fetchWithAuthInfo({
					on401: function() { }
				});
			}

			if (AppConf.core.debug) {
				this.navRegion.show(collectionView);
			}

			if (App.getAuthInfo().token){
				if(AppConf.features.passTicket) {
					this.passticketPurchaseCollection.fetchPassTicketPurchase();
				}
				if(AppConf.features.wallet) {
					this.couponCollection.fetchWithAuthInfo();
				}
			}			
		},
		onLoad: function() {
			var _this = this;
			// if slideshow don't used, tilebanner area can't scroll on small device
			setTimeout(function() {
				_this.setHeightInnerTop();
			}, 500);
			if(AppConf.features.tileBanner){
				// load data title banner
				this.tileBannerCollection.fetchBanner().then(function(){
					if(!_this.tileBannerCollection || _this.tileBannerCollection.length == 0){
						_this.ui.tileBanner.remove();
					}else{
						_this.ui.tileBanner.addClass('show');
					}
				}).fail(function(){
					_this.ui.tileBanner.remove();
				});
			}
			App.util.badge.showBadge();
			if(this.headerConf.hideHeader){
				this.$el.css({"margin-top": "-44px"});
				this.$el.css({"height": " calc(100% + 44px)"});
			}
		},
		renderPassTicketBanner: function() {
			if(AppConf.features.wallet){
				if (this.passticketPurchaseCollection.checkingHasNewCard()) {
					var format = 'YYYY/MM/DD';
					var ticketItem = this.passticketPurchaseCollection.models[0];
					var countTicket = this.passticketPurchaseCollection.length;
					this.$('.card-date-time').text(moment(ticketItem.get('expires')).format(format));
					this.$('li.pass-ticket .status-card-button').removeClass('pink-bg').addClass('not-bg').html('<span class="status-count">' + countTicket + '</span>枚');
				} else {
					this.$('li.pass-ticket .status-card-button').addClass('pink-bg').removeClass('not-bg').text('購入');
				}
			} else {
				if (this.passticketPurchaseCollection.checkingHasNewCard()) {
					this.ui.passTicketBanner.addClass('hide');
					this.ui.passTicketAreaContainer.removeClass('hide');
					// TODO render ticket info
					var ticketItem = this.passticketPurchaseCollection.models[0];
					this.$('.card-date-time').text(moment(ticketItem.get('expires')).format('DD.MM.YYYY'));
					this.$('.start-ticket-text').text(ticketItem.get('cardPageTitle'));
				} else {
					this.ui.passTicketBanner.removeClass('hide');
					this.ui.passTicketAreaContainer.addClass('hide');
				}
			}
		},
		renderCouponTotalCount: function(){
			this.ui.couponCount.text(this.couponCollection.length);
		},
		renderTileBanner: function() {
			this.tileBannerRegion.show(this.tileBannerCollectionView);
		},
		setHeightInnerTop: function() {
			// get height title banner container
			var h_window = $(window).height();
			var h_menu = this.ui.menuContainer.outerHeight();
			var h_innerTop = h_window - h_menu;
			// checking header is show
			if (!this.headerConf.hideHeader) {
				this.$('.BACKBONE-PAGE').css('margin-top', '0');
				h_innerTop -= 44;
			}
			this.ui.appTop.attr('style', 'padding-bottom: ' + h_menu + 'px !important');
			this.ui.innerTop.css({ 'height': h_innerTop + 'px' });
		},
		_renderPoint: function() {
			this.ui.pointValue.html(App.util.text.numberWithDelimiter(this.pointModel.get("point")));
		},
		_renderSlide: function() {
			this.slideRegion.show(new SlideShowCollectionView({ collection: this.slideCollection }));
		},
		_renderValue: function() {
			var total = this.valueModel.get('total');
			this.ui.totalBalance.html(App.util.text.numberWithDelimiter(total));
		},
		initCollectionSlide: function(options) {
			if (AppConf.features.slideshow) {
				if (App.getAuthInfo().token) {
					this.slideCollection.fetchWithAuthInfo({
						on400: function() {
							options.setErrorSlideShow();
						}
					});
				} else {
					this.slideCollection.fetchWithoutAuthInfo({
						on400: function() {
							options.setErrorSlideShow();
						}
					});
				}
			}
			// }else {
			// 	this.slideCollection.add( AppConf.slideshow.slideshowContentsList );
			// }
		},
		setErrorSlideShow: function() {
			this.slideModel.safeFetch();
			if (this.slideModel.getSlideInfo()) {
				this.slideCollection.add(this.slideModel.getSlideInfo());
			} else {
				this.slideCollection.add(AppConf.slideshow.slideshowContentsList);
			}
			this._renderSlide();
			$(window).bind('load', this.slideCollection.onLoad());
		},
		onResize: function(e) {
			var h_slider, h_window, h_menuContainer;
			h_window = $(window).height();
			h_menuContainer = this.ui.menuContainer.height();
			h_slider = h_window - h_menuContainer - 30;

			this.ui.menuContainer.css({ 'top': '', 'position': '' });
			$('#master-container').css({ 'min-height': window.innerHeight - 44 + 'px' });
			$('.slickSlider').css({ 'height': h_window - 44 + 'px' });
			$('.slickSlider .slick-dots').css({ 'top': h_slider + 'px' });
			this.setHeightInnerTop();
		}
	});

	return MainNavView;

})();

},{"../models/coupon_collection.js":207,"../models/passticket_purchase_collection.js":216,"../models/point_model.js":218,"../models/value_model.js":223,"../slideshow/slideshow_collection.js":226,"../slideshow/slideshow_collection_view.js":227,"../slideshow/slideshow_model.js":228,"./main_nav.html":176,"./main_nav_2col.html":177,"./main_nav_collection_view.js":179,"./tileBanner/tileBanner_collection.js":184,"./tileBanner/tileBanner_collection_view.js":185,"backbone":"5kFNoY","moment":"iROhDJ"}],184:[function(require,module,exports){
var BaseCollection = require('../../models/base_collection.js');
var BaseModel = require('../../models/base_model');
module.exports = (function() {
	var TileBannerCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/slideshow/get?tileBanner=1",
		model: BaseModel,
		parse: function(response) {
			return response.slideshowContentsList;
		},
		fetchBanner: function(options) {
			var _options = _.extend(options || {}, { url: this.url });
			App.util.cache.responseCache(this, "tile_banner_list_" + App.getAuthInfo().token , AppConf.expire.tileBanner.list);
			return TileBannerCollection.__super__.fetchWithAuthInfo.call(this,  _options );
		},
	});
	return TileBannerCollection;
})();

},{"../../models/base_collection.js":203,"../../models/base_model":204}],185:[function(require,module,exports){
var Backbone = require('backbone');
var TileBannerItemView = require('./tileBanner_item_view.js');
var BaseCollectionView = require('../../views/base_collection_view.js');
module.exports = (function () {
	var CommonEmptyView = Backbone.Marionette.ItemView.extend({
		template: _.template('')
	});

	var TilebannerCollectionView = BaseCollectionView.extend({
		emptyView: CommonEmptyView,
		childView: TileBannerItemView,
		tagName: 'div',
		className: 'tile-banner-list'
	});
	return TilebannerCollectionView;
})();

},{"../../views/base_collection_view.js":240,"./tileBanner_item_view.js":187,"backbone":"5kFNoY"}],186:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a class="tile-banner-link">\n  <img class="tile-banner-image" src=\''+
((__t=( imageUrl ))==null?'':_.escape(__t))+
'\' alt=\'\' />\n</a>';
}
return __p;
};

},{}],187:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {
	var TilebannerItemView = Backbone.Marionette.ItemView.extend({
		tagName: "div",
		className: 'tile-banner-item',
		template: require('./tileBanner_item_template.html'),
		ui: {
			'imageLink': '.tile-banner-link'
		},
		events: {
			'click @ui.imageLink': 'openSlideLink'
		},
		openSlideLink: function() { 
			App.util.text.processOpenLink(this.model.get('linkUrl'), this.model.get('webviewFlag'));
		}
	});

	return TilebannerItemView;

})();

},{"./tileBanner_item_template.html":186,"backbone":"5kFNoY"}],188:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-container">\n\t<div class="modal-wrapper">\n\t\t<div class="modal-content modal-alert-v1">\n\t\t\t<div id="dialogue" class="modal-dialogue dialogue-alert-v1">\n\t\t\t\t<h4 class="title"></h4>\n\t\t\t\t<p class="text"></p>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<button class="btn ok-btn btbgcolor2 btftcolor3 bdcolor3">閉じる</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
};

},{}],189:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-container">\n\t<div class="modal-wrapper">\n\t\t<div class="modal-content">\n\t\t\t<div id="dialogue" class="modal-dialogue dialogue-alert-v2">\n\t\t\t\t<h4 class="title"></h4>\n\t\t\t\t<p class="text"></p>\n\t\t\t\t<div class="btn-group hide">\n\t\t\t\t\t<button class="btn ok-btn btbgcolor2 btftcolor3 bdcolor3">閉じる</button>\n\t\t\t\t</div>\n\t\t\t\t<div class="close-circle-btn">x</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
};

},{}],190:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {
	var ModalAlertView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return AppConf.UI.dialog.alert.version == 'v1' ? require('./modal_alert_v1.html') : require('./modal_alert_v2.html');
		},
		className: 'modal-alert',
		ui: {
			'modalContainer': '.modal-container',
			"OKBtn": ".ok-btn",
			"title": '.title',
			"text": '.text',
			"closeBtn": ".close-circle-btn",
			"dialogue": "#dialogue"
		},
		events: {
			"click @ui.OKBtn": "handleOKClick",
			"click @ui.closeBtn": "handleOKClick",
		},
		initialize: function() {
			$('body').append(this.render().el);
		},
		renderContent: function(options) {
			this.ui.dialogue.addClass(options.class || '');
			if(options.title){
				this.ui.title.show();
				this.ui.title.html(options.title || '');
			} else {
				this.ui.title.hide();
			}
			this.ui.text.html(options.text || '');
			options.okButton && this.ui.OKBtn.text(options.okButton);
		},
		show: function(options) {
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.renderContent(options);
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		handleOKClick: function() {
			this.successCallback && this.successCallback(1);
			this.hide();
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			this.$el.remove();
		}
	});

	return ModalAlertView;

})();

},{"./modal_alert_v1.html":188,"./modal_alert_v2.html":189,"backbone":"5kFNoY"}],191:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-container">\n\t<div class="modal-wrapper">\n\t\t<div class="modal-content modal-confirm-v1">\n\t\t\t<div id="dialogue" class="modal-dialogue dialogue-confirm-v1">\n\t\t\t\t<h4 class="title"> </h4>\n\t\t\t\t<p class="text"> </p>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<button class="btn ok-btn btbgcolor2 btftcolor3 bdcolor3">閉じる</button>\n\t\t\t\t\t<button class="btn cancel-btn btbgcolor2 btftcolor3 bdcolor3">キャンセル</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
};

},{}],192:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-container">\n\t<div class="modal-wrapper">\n\t\t<div class="modal-content">\n\t\t\t<div id="dialogue" class="modal-dialogue dialogue-confirm-v2">\n\t\t\t\t<h4 class="title"> </h4>\n\t\t\t\t<p class="text"> </p>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<button class="btn ok-btn btbgcolor2 btftcolor3 bdcolor3">閉じる</button>\n\t\t\t\t\t<button class="btn cancel-btn btbgcolor2 btftcolor3 bdcolor3">キャンセル</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
};

},{}],193:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {
	var ModalConfirmView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return AppConf.UI.dialog.confirm.version == 'v1' ? require('./modal_confirm_v1.html') : require('./modal_confirm_v2.html');
		},
		className: 'modal-confirm',
		ui: {
			'modalContainer': '.modal-container',
			"OKBtn": ".ok-btn",
			"cancelBtn": '.cancel-btn',
			"title": '.title',
			"text": '.text',
		},
		events: function() {
			return (applican.config.device_os === "IOS") ?
				{
					"touchend @ui.cancelBtn": "cancel",
					"touchend @ui.OKBtn": "confirmSuccess",
				} :
				{
					"click @ui.cancelBtn": "cancel",
					"click @ui.OKBtn": "confirmSuccess",
				}
		},
		initialize: function() {
			$('body').append(this.render().el);
		},
		renderContent: function(options) {
			if(options.title){
				this.ui.title.show();
				this.ui.title.text(options.title);
			} else {
				this.ui.title.hide();
			}
			this.ui.text.html(options.text);
			options.okButton && this.ui.OKBtn.text(options.okButton);
			options.cancelButton && this.ui.cancelBtn.text(options.cancelButton);
		},
		show: function(options) {
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.renderContent(options);
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		cancel: function() {
			this.successCallback(0);
			this.hide();
		},
		confirmSuccess: function() {
			this.successCallback(1);
			this.hide();
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			this.$el.remove();
		}
	});

	return ModalConfirmView;

})();

},{"./modal_confirm_v1.html":191,"./modal_confirm_v2.html":192,"backbone":"5kFNoY"}],194:[function(require,module,exports){
var Backbone = require('backbone');
var ModalAlertView = require('../alert/modal_alert_view.js');
var CouponCollection = require('../../models/coupon_collection.js');
module.exports = (function() {
	function debounce(fn, delay) {
		// maintain a timer
		var timer = null;
		// closure function that has access to timer
		return function() {
			// get the scope and parameters of the function 
			// via 'this' and 'arguments'
			var context = this;
			var args = arguments;
			// if event is called, clear the timer and start over
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		}
	}
	var ModalHitapCouponView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return require('./modal_hitap_template.html');
		},
		className: 'modal-hitap',
		ui: {
			'modalContainer': '.modal-container',
			"hitapArea": "#hitap-area",
			"successImage": ".get_image img",
			"stampLocation": ".stamp_location3",
			"cancelBtn": ".cancel-btn",
			"closeBtn": '.close-btn'
		},
		events: {
			"click @ui.cancelBtn": "cancel",
			"click @ui.closeBtn": "closeSuccess",
		},
		initialize: function() {
			this.couponCollection = new CouponCollection();
			this.modalAlertView = new ModalAlertView();
			$('body').append(this.render().el);
		},
		showLoading: function() {
			$('#js-modal-loading').addClass('show visible');
		},
		hideLoading: function() {
			$('#js-modal-loading').removeClass('show visible');
		},
		removeLoading: function (){
			$('#js-modal-loading').remove();
		},
		show: function(model) {
			if(!document.getElementById('modal-loading')){
				$('body').append('<div id="js-modal-loading" class="progress-screen "><img class="progress-image" src="./image/progress.gif"></div>');
			}
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			this.model = model;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			var handleTouch = this.handleTouch = function(e) {
				_this.touchPoint(e);
			};
			$(document).off('touchstart', "#dialogue.hitap-area", handleTouch);
			$(document).on('touchstart', "#dialogue.hitap-area", handleTouch);
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		cancel: function() {
			this.successCallback({ isDone: false });
			this.hide();
		},
		closeSuccess: function() {
			this.hide();
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			$(document).off('touchstart', "#dialogue.hitap-area", this.handleTouch);
			this.$el.remove();
			this.modalAlertView.onDestroy();
			this.removeLoading();
		},
		windowSize: function() {
			var w_window = $(window).width();
			var h_window = $(window).height();
			var ratio = h_window / w_window;
			var ratioNum = Math.round(ratio * 100) / 100;
			return ratioNum;
		},
		touchPoint: debounce(function(e) {
			var touches = e.originalEvent.targetTouches;
			var lengthTouches = touches.length;
			// lengthTouches = 5;//todo
			if (lengthTouches === AppConf.layout.coupon.touchPointLength) {
				var point = "[[";
				var index = 0;
				for (var i = 0; i < AppConf.layout.coupon.touchPointLength; i++) {
					var xPos = "";
					var yPos = "";
					var positionTmp = "";
					if (touches[i]) {
						xPos = touches[i].pageX;
						yPos = touches[i].pageY;
						positionTmp += "[" + Math.round(xPos) + "," + Math.round(yPos) + "]";
						if (i < AppConf.layout.coupon.touchPointLength - 1) {
							positionTmp += ",";
						}
						index++;
					} else {
						positionTmp += "[]";
						if (i < AppConf.layout.coupon.touchPointLength - 1) {
							positionTmp += ",";
						}
					}
					point += positionTmp;
					if (i === AppConf.layout.coupon.touchPointLength - 1) {
						point += "]]";
					}
				}
				// index = 5;//todo
				if (index === AppConf.layout.coupon.touchPointLength) {
					// point = "[[[318,417],[247,346],[134,216],[316,238]]]";
					// point = "[[[158,188],[222,244],[335,207],[111,368]]]";
					// point = "[[[158,188],[222,244],[335,207],[111,368],[316,238]]]";
					this.useCouponHitapApi({ point: point, device: applican.config.device_os, ratio: this.windowSize(), orientation: 0 });
				}
			}
		}, 250),
		useCouponHitapApi: function(options) {
			var _options = options || null;
			var _this = this;
			this.showLoading();
			App.btApi.useCouponHitap({
				"point": _options.point,
				"device": _options.device,
				"ratio": _options.ratio,
				"orientation": _options.orientation,
				"couponId": _this.model.get("id"),
				"uCoupId": _this.model.get("uCoupId")
			}).done(function(resUseCoupon) {
				var errorCode = resUseCoupon.errorCode;
				if (errorCode === "0000") {
					_this.useCouoonSuccess({ resUseCoupon: resUseCoupon, isDone: true });
				} else {
					_this.modalAlertView.show({ title: 'スタンプ利用エラー', text: AppConf.stampErrMsg[resUseCoupon.errorCode] });
				}
				_this.hideLoading();
			}).fail(function(err) {
				var statusError = err.status;
				var errorMessage = "";
				var title = "";
				if (statusError !== 401) {
					if (statusError === 403) {
						console.log("errorCode:" + err.responseJSON.errorCode);
						if (typeof err.responseJSON === "undefined" || err.responseJSON === null || (err.responseJSON != null && err.responseJSON.errorCode === "0003")) {
							title = "申し訳ございません。";
							errorMessage = "来店スタンプは1日1回までのご利用となります。";
						} else if (err.responseJSON.errorCode+"" === "3001" || err.responseJSON.errorCode+"" === "3002") {
							_this.couponCollection.clearCache();
							// 利用制限でのエラー
							title = "終了";
							errorMessage = "申し訳ありません。<br>このクーポンは、たった今上限枚数に達した為ご利用頂けません。";
						} else if (err.responseJSON.errorCode+"" === "3003") {
							_this.couponCollection.clearCache();
							// 利用制限でのエラー
							title = "同日制限";
							errorMessage = "本日は既に利用されています。";
						} else {
							title = "スタンプ利用エラー";
							errorMessage = "スタンプ利用に失敗しました";
						}
					} else if (statusError === 404) {
						title = "";
						errorMessage = "スタンプなし";
					} else {
						title = "スタンプ利用エラー";
						errorMessage = "スタンプ利用に失敗しました";
					}
					_this.modalAlertView.show({ title: title, text: errorMessage });
				}
				_this.hideLoading();
			});
		},
		useCouoonSuccess: function(res) {
			this.successCallback(res);
			this.hide();
		}
	});

	return ModalHitapCouponView;

})();

},{"../../models/coupon_collection.js":207,"../alert/modal_alert_view.js":190,"./modal_hitap_template.html":197,"backbone":"5kFNoY"}],195:[function(require,module,exports){
var Backbone = require('backbone');
var ModalAlertView = require('../alert/modal_alert_view.js');
module.exports = (function() {
	function debounce(fn, delay) {
		// maintain a timer
		var timer = null;
		// closure function that has access to timer
		return function() {
			// get the scope and parameters of the function 
			// via 'this' and 'arguments'
			var context = this;
			var args = arguments;
			// if event is called, clear the timer and start over
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		}
	}
	var ModalHitapView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return require('./modal_hitap_template.html');
		},
		className: 'modal-hitap',
		ui: {
			'modalContainer': '.modal-container',
			"hitapArea": "#hitap-area",
			"successImage": ".get_image img",
			"stampLocation": ".stamp_location3",
			"cancelBtn": ".cancel-btn",
			"closeBtn": '.close-btn'
		},
		events: {
			"click @ui.cancelBtn": "cancel",
			"click @ui.closeBtn": "closeSuccess",
		},
		initialize: function() {
			this.modalAlertView = new ModalAlertView();
			$('body').append(this.render().el);
		},
		showLoading: function() {
			$('#js-modal-loading').addClass('show visible');
		},
		hideLoading: function() {
			$('#js-modal-loading').removeClass('show visible');
		},
		removeLoading: function (){
			$('#js-modal-loading').remove();
		},
		show: function() {
			if(!document.getElementById('modal-loading')){
				$('body').append('<div id="js-modal-loading" class="progress-screen "><img class="progress-image" src="./image/progress.gif"></div>');
			}
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			var handleTouch = this.handleTouch = function(e) {
				_this.touchPoint(e);
			};
			$(document).off('touchstart', "#dialogue.hitap-area", handleTouch);
			$(document).on('touchstart', "#dialogue.hitap-area", handleTouch);
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		cancel: function() {
			this.successCallback(0);
			this.hide();
		},
		closeSuccess: function() {
			this.hide();
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			$(document).off('touchstart', "#dialogue.hitap-area", this.handleTouch);
			this.$el.remove();
			this.modalAlertView.onDestroy();
			this.removeLoading();
		},
		windowSize: function() {
			var w_window = $(window).width();
			var h_window = $(window).height();
			var ratio = h_window / w_window;
			var ratioNum = Math.round(ratio * 100) / 100;
			return ratioNum;
		},
		touchPoint: debounce(function(e) {
			var touches = e.originalEvent.targetTouches;
			var lengthTouches = touches.length;
			// lengthTouches = 4;//todo
			if (lengthTouches === AppConf.layout.passticket.touchPointLength) {
				var point = "[[";
				var index = 0;
				for (var i = 0; i < AppConf.layout.passticket.touchPointLength; i++) {
					var xPos = "";
					var yPos = "";
					var positionTmp = "";
					if (touches[i]) {
						xPos = touches[i].pageX;
						yPos = touches[i].pageY;
						positionTmp += "[" + Math.round(xPos) + "," + Math.round(yPos) + "]";
						if (i < AppConf.layout.passticket.touchPointLength - 1) {
							positionTmp += ",";
						}
						index++;
					} else {
						positionTmp += "[]";
						if (i < AppConf.layout.passticket.touchPointLength - 1) {
							positionTmp += ",";
						}
					}
					point += positionTmp;
					if (i === AppConf.layout.passticket.touchPointLength - 1) {
						point += "]]";
					}
				}
				// index = 4;//todo
				if (index === AppConf.layout.passticket.touchPointLength) {
					// point = "[[[318,417],[247,346],[134,216],[316,238]]]";
					// point = "[[[158,188],[222,244],[335,207],[111,368]]]";
					this.useCouponHitapApi({ point: point, device: applican.config.device_os, ratio: this.windowSize(), orientation: 0 });
				}
			}
		}, 250),
		useCouponHitapApi: function(options) {
			var _options = options || null;
			var _this = this;
			var ticketData = window.passTicketDetailModel;
			this.showLoading();
			App.btApi.useCouponHitap({
				"point": _options.point,
				"device": _options.device,
				"ratio": _options.ratio,
				"orientation": _options.orientation,
				"couponId": ticketData.get('id'),
				"uCoupId": ticketData.get('uCoupId')
			}).done(function(res) {
				var errorCode = res.errorCode;
				if (errorCode === "0000") {
					_this.stampSuccess();
				} else {
					_this.modalAlertView.show({ title: 'スタンプ利用エラー', text: AppConf.stampErrMsg[res.errorCode] });
				}
				_this.hideLoading();
			}).fail(function(err) {
				var statusError = err.status;
				var errorMessage = "";
				var title = "";
				if (statusError !== 401) {
					if (statusError === 403) {
						if (typeof err.responseJSON === "undefined" || err.responseJSON === null || (err.responseJSON != null && err.responseJSON.errorCode === "0003")) {
							title = "申し訳ございません。";
							errorMessage = "来店スタンプは1日1回までのご利用となります。";
						} else {
							title = "スタンプ利用エラー";
							errorMessage = "スタンプ利用に失敗しました";
						}
					}
					else if (statusError === 404) {
						title = "";
						errorMessage = "スタンプなし";
					} else {
						title = "スタンプ利用エラー";
						errorMessage = "スタンプ利用に失敗しました";
					}
					_this.modalAlertView.show({ title: title, text: errorMessage });
				}
				this.hideLoading();
			});
		},
		stampSuccess: function() {
			this.ui.hitapArea.addClass("hidden");
			this.ui.stampLocation.addClass("show");
			this.ui.successImage.attr("src", "./image/stamp/stamp_success.png");
			this.ui.cancelBtn.addClass('hide');
			this.ui.closeBtn.removeClass('hide');
			this.successCallback(1);
		}
	});

	return ModalHitapView;

})();

},{"../alert/modal_alert_view.js":190,"./modal_hitap_template.html":197,"backbone":"5kFNoY"}],196:[function(require,module,exports){
var Backbone = require('backbone');
var ModalAlertView = require('../alert/modal_alert_view.js');
module.exports = (function() {
	function debounce(fn, delay) {
		// maintain a timer
		var timer = null;
		// closure function that has access to timer
		return function() {
			// get the scope and parameters of the function 
			// via 'this' and 'arguments'
			var context = this;
			var args = arguments;
			// if event is called, clear the timer and start over
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		}
	}
	var ModalHitapView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return require('./modal_hitap_template.html');
		},
		className: 'modal-hitap',
		ui: {
			'modalContainer': '.modal-container',
			"hitapArea": "#hitap-area",
			"successImage": ".get_image img",
			"stampLocation": ".stamp_location3",
			"cancelBtn": ".cancel-btn",
			"closeBtn": '.close-btn'
		},
		events: {
			"click @ui.cancelBtn": "cancel",
			"click @ui.closeBtn": "closeSuccess",
		},
		initialize: function() {
			this.modalAlertView = new ModalAlertView();
			$('body').append(this.render().el);
			
		},
		showLoading: function() {
			$('#js-modal-loading').addClass('show visible');
		},
		hideLoading: function() {
			$('#js-modal-loading').removeClass('show visible');
		},
		removeLoading: function (){
			$('#js-modal-loading').remove();
		},
		show: function() {
			if(!document.getElementById('modal-loading')){
				$('body').append('<div id="js-modal-loading" class="progress-screen "><img class="progress-image" src="./image/progress.gif"></div>');
			}
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			var handleTouch = this.handleTouch = function(e) {
				_this.touchPoint(e);
			};
			$(document).off('touchstart', "#dialogue.hitap-area", handleTouch);
			$(document).on('touchstart', "#dialogue.hitap-area", handleTouch);
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		cancel: function() {
			this.successCallback(0);
			this.hide();
		},
		closeSuccess: function() {
			if(AppConf.layout.stamp.style === 'raiten'){
				this.ui.hitapArea.removeClass("hide");
				this.ui.stampLocation.removeClass("show");
				this.ui.successImage.removeAttr("src", "./image/stamp/stamp_success.png");
				this.ui.cancelBtn.removeClass('hide');
				this.ui.closeBtn.addClass('hide');
			}
			this.hide();
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			$(document).off('touchstart', "#dialogue.hitap-area", this.handleTouch);
			this.$el.remove();
			this.modalAlertView.onDestroy();
			this.removeLoading();
		},
		windowSize: function() {
			var w_window = $(window).width();
			var h_window = $(window).height();
			var ratio = h_window / w_window;
			var ratioNum = Math.round(ratio * 100) / 100;
			return ratioNum;
		},
		touchPoint: debounce(function(e) {
			var touches = e.originalEvent.targetTouches;
			var lengthTouches = touches.length;
			// lengthTouches = 5;//todo
			if (lengthTouches === AppConf.layout.stamp.touchPointLength) {
				var point = "[[";
				var index = 0;
				for (var i = 0; i < AppConf.layout.stamp.touchPointLength; i++) {
					var xPos = "";
					var yPos = "";
					var positionTmp = "";
					if (touches[i]) {
						xPos = touches[i].pageX;
						yPos = touches[i].pageY;
						positionTmp += "[" + Math.round(xPos) + "," + Math.round(yPos) + "]";
						if (i < AppConf.layout.stamp.touchPointLength - 1 ) {
							positionTmp += ",";
						}
						index++;
					} else {
						positionTmp += "[]";
						if (i < AppConf.layout.stamp.touchPointLength - 1) {
							positionTmp += ",";
						}
					}
					point += positionTmp;
					if (i === AppConf.layout.stamp.touchPointLength - 1) {
						point += "]]";
					}
				}
				// index = 5;//todo
				if (index === AppConf.layout.stamp.touchPointLength) {
					// point = "[[[318,417],[247,346],[134,216],[316,238]]]";
					// point = "[[[158,188],[222,244],[335,207],[111,368]]]";
					// point = "[[[158,188],[222,244],[335,207],[111,368],[316,238]]]";
					this.getStampHitapApi({ point: point, device: applican.config.device_os, ratio: this.windowSize(), orientation: 0 });
				}
			}
		}, 250),		
		getStampHitapApi: function(options) {
			var _options = options || null;
			var _this = this;
			this.hitapCode = "";
			this.stampId = "";
			this.showLoading();
			App.btApi.getStampHitap({
				"point": _options.point,
				"device": _options.device,
				"ratio": _options.ratio,
				"orientation": _options.orientation
			})
			.done(function(res) {
				var errorCode = res.errorCode;
				if ( errorCode === "0000" ) {
					_this.useStampSuccess({ resultUseStamp: res, isDone: true });
				} else {
					_this.modalAlertView.show({
						title: 'スタンプ利用エラー',
						text: AppConf.stampErrMsg[res.errorCode],
					});
				}
				_this.hideLoading();
			})
			.fail(function(err) {
				var statusError = err.status;
				var errorMessage = "";
				var title = "";
				if (statusError !== 401) {
					if (statusError === 403) {
						if (typeof err.responseJSON === "undefined" || err.responseJSON === null || (err.responseJSON != null && err.responseJSON.errorCode === "0003")) {
							title = "";
							errorMessage = "本日は既にスタンプを獲得済みです";
						} else {
							title = "スタンプ利用エラー";
							errorMessage = "スタンプ利用に失敗しました";
						}
					} else if (statusError === 404) {
						title = "";
						errorMessage = "スタンプなし";
					} else {
						title = "スタンプ利用エラー";
						errorMessage = "スタンプ利用に失敗しました";
					}
					_this.modalAlertView.show({
						title: title,
						text: errorMessage,
					});
				}
				_this.hideLoading();
			});
		},		
		useStampSuccess: function(res) {
			if ( res ) {
				if(AppConf.layout.stamp.style === 'raiten'){
					// to do
					this.ui.hitapArea.addClass("hide");
					this.ui.stampLocation.addClass("show");
					this.ui.successImage.attr("src", "./image/stamp/stamp_success.png");
					this.ui.cancelBtn.addClass('hide');
					this.ui.closeBtn.removeClass('hide');
				}else{
					// to do
					this.successCallback(res);
					this.closeSuccess();
				}	
			} else {
				this.modalAlertView.show({
					title: "システムエラー",
					text: "システムエラーが発生しました",
				});
			}
		},
	});

	return ModalHitapView;

})();

},{"../alert/modal_alert_view.js":190,"./modal_hitap_template.html":197,"backbone":"5kFNoY"}],197:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-container">\n\t<div class="modal-wrapper">\n\t\t<div class="modal-content">\n\t\t\t<div id="dialogue" class="hitap-area">\n\t\t\t\t<div id="stamp-location-region">\n\t\t\t\t\t<div class="stamp_location3">\n\t\t\t\t\t\t<span class="get_image">\n\t\t\t\t\t\t\t<img src="" alt="" />\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class="text">こちらにスタンプを押してください </span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<button class="button cancel-btn btbgcolor2 btftcolor3">キャンセル</button>\n\t\t\t<button class="button close-btn btbgcolor2 btftcolor3 hide">閉じる</button>\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
};

},{}],198:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-qrcode-content">\n    <div class="wrap-qrcode-reader">\n        <div id="qrcode-reader" width="300px"></div>\n    </div>\n    <button class="js-btnCancel btn-cancel">Cancel</button>\n</div>';
}
return __p;
};

},{}],199:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function () {
    var ModalQrCode = Backbone.Marionette.LayoutView.extend({
        template: function () {
            return require('./modal_qrcode.html')
        },
        className: 'modal-qrcode',
        ui: {
            "qrcodeReader": "#qrcode-reader",
            "btnCancel": ".js-btnCancel",
        },
        events: function () {
            return (applican.config.device_os === "IOS") ?
                {
                    "touchend @ui.btnCancel": "cancel",
                } :
                {
                    "click @ui.btnCancel": "cancel",
                }
        },
        initialize: function () {
            this.html5QrCode = null;
            $('body').append(this.render().el);
        },
        show: function () {
            var _this = this;
            this.$el.addClass('modal--show');
            this.html5QrCode = new Html5Qrcode("qrcode-reader");
            var config = { fps: 10, qrbox: 250 };
            var qrCodeSuccessCallback = function (res) {
                _this.success(res);
            }
            // If you want to prefer front camera
            this.html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback);

            var then = function (successCallback) {
                _this.successCallback = successCallback;
            }
            return {
                then: then
            };
        },
        success: function (res) {
            this.successCallback(res || "");
            this.cancel();
        },
        cancel: function () {
            this.successCallback = null;
            this.$el.removeClass('modal--show');
            liff.closeWindow();
            if (this.html5QrCode) {
                this.html5QrCode.stop().then(function (ignore) {
                    // QR Code scanning is stopped.
                }).catch(function (err) {
                    // Stop failed, handle it.
                });
            }
        },
        onDestroy: function () {
            // remove hitap DOM
            this.$el.remove();
        }
    });

    return ModalQrCode;

})();

},{"./modal_qrcode.html":198,"backbone":"5kFNoY"}],200:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal-container">\n\t<div class="modal-wrapper">\n\t\t<div class="modal-content">\n\t\t\t<div id="dialogue" class="modal-dialogue dialogue-confirm">\n\t\t\t\t<h4 class="title">スタンプ店舗一覧</h4>\n\t\t\t\t<div class="js-shop-list shop-list-wrapper"></div>\n\t\t\t\t<div class="btn-group">\n\t\t\t\t\t<button class="btn ok-btn btbgcolor2 btftcolor3 bdcolor3">クーポン利用</button>\n\t\t\t\t\t<button class="btn cancel-btn btbgcolor2 btftcolor3 bdcolor3">キャンセル</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>';
}
return __p;
};

},{}],201:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function() {
	var ModalShopListView = Backbone.Marionette.LayoutView.extend({
		template: function() {
			return require('./modal_shop_list.html');
		},
		className: 'modal-shop-list',
		ui: {
			'modalContainer': '.modal-container',
			"OKBtn": ".ok-btn",
			"cancelBtn": '.cancel-btn',
			"shopList": '.js-shop-list',
		},
		events: function() {
			return (applican.config.device_os === "IOS") ?
				{
					"touchend @ui.cancelBtn": "cancel",
					"touchend @ui.OKBtn": "confirmSuccess",
				} :
				{
					"click @ui.cancelBtn": "cancel",
					"click @ui.OKBtn": "confirmSuccess",
				}
		},
		initialize: function() {
			$('body').append(this.render().el);
		},
		renderContent: function(options) {
			var shopList = [];
			if(options.listShop){
				options.listShop.forEach((item, index) => {
					shopList.push('<label class="container-radio-custom shop-item">'+item.shopName+'<input class="shop-item-radio js-shop-item-radio" type="radio" name="shop" value="'+item.shopId+'"><span class="checkmark"></span></label>')
				});
			}
			this.ui.shopList.html(shopList.join());
			options.okButton && this.ui.OKBtn.text(options.okButton);
			options.cancelButton && this.ui.cancelBtn.text(options.cancelButton);
		},
		show: function(options) {
			// hide all other modals
			$('.modal-container').removeClass('modal--show');
			this.renderContent(options);
			this.ui.modalContainer.addClass('modal--show');
			var _this = this;
			var then = function(successCallback) {
				_this.successCallback = successCallback;
			}
			return {
				then: then
			};
		},
		hide: function() {
			this.ui.modalContainer.removeClass('modal--show');
			// reset all setting
			this.reset();
		},
		cancel: function() {
			this.hide();
		},
		confirmSuccess: function() {
			var shopId = $(".js-shop-item-radio:checked").val();
			if(shopId){
				this.successCallback({isDone: true, shopId:shopId});
				this.hide();
			}
		},
		reset: function() {
			this.successCallback = null;
		},
		onDestroy: function() {
			// remove hitap DOM
			this.$el.remove();
		}
	});

	return ModalShopListView;

})();

},{"./modal_shop_list.html":200,"backbone":"5kFNoY"}],202:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
/**
 * アプリケーションのグローバル情報を保持、管理する
 * 情報はLocalStoregaに保管
 */
module.exports = (function () {

	var initialAuth = {
		userid : "",
		smstel : "",
		password : "",
		token : "",
		tokentemp : "",
	};

	var AppModel = BaseModel.extend({
		localStorage: new Backbone.LocalStorage("AppBase"),
		idAttribute: "id",
		defaults: {
			id: AppConf.core.localStorageKey,
			auth: initialAuth,
			tutorialShown: false,
			pushToken: "", // PUSH SDK の registrationIdを保管
			brightBefore: 0, // 変更前の輝度
			registerFormShown: false, // 会員登録を行なった場合true
			autoLogin: false, // 自動ログインを行なった場合true
			pushTokenOld: "", // PUSH SDK の １個前のregistrationIdを保管
		},
		getAuthInfo: function(){
			return this.get("auth");
		},
		getPushToken: function(){
			return this.get("pushToken");
		},
		getDeviceloginTime: function(){
			return this.get("deviceloginTime");
		},
		setDeviceloginTime: function( deviceloginTime ){
			this.set("deviceloginTime", deviceloginTime);
			this.save();
		},
		getRegisterFormShown: function(){
			return this.get("registerFormShown");
		},
		setRegisterFormShown: function( registerFormShown ){
			this.set("registerFormShown", registerFormShown);
			this.save();
		},
		getAutoLogin: function(){
			return this.get("autoLogin");
		},
		setAutoLogin: function( autoLogin ){
			this.set("autoLogin", autoLogin);
			this.save();
		},
		getPushTokenOld: function(){
			return this.get("pushTokenOld");
		},
		setPushTokenOld: function( pushTokenOld ){
			this.set("pushTokenOld", pushTokenOld);
			this.save();
		},
		/**
		 * ログアウト状態としてデータを上書き保存する
		 * auth情報を初期化
		 */
		saveAsLogout: function(){
			this.get("auth").token = initialAuth.token;
			this.save();
		},
		/**
		 * authオブジェクトをmodel.attributes.auth に適用してsaveを実行する
		 * args: auth ::{ userid: xxx, password: token, new: xxx}
		 */
		setAuthAndSave: function( auth ){

			var authInfo = this.get("auth");
			authInfo.token = auth.token;
			authInfo.userid = auth.userid;
			authInfo.smstel = auth.smstel;
			authInfo.password = auth.password;
			authInfo.tokentemp = auth.tokentemp;

			this.set("auth", authInfo);
			this.save();
		},
		/**
		 * Backbone.Model#fetchのwrapper
		 * 処理完了(done/fail)時に「ready」イベントを発火させる
		 * NotFoundErrorもエラーと見なさない（初回起動時は見つからない想定)
		 */
		safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
				_this.trigger('ready', _this);
			})
			.fail(function(err){
				if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
					console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
				}
				_this.trigger('ready', _this);
			});
		}
	});

	return AppModel;
})();

},{"./base_model":204,"backbone":"5kFNoY"}],203:[function(require,module,exports){
var Backbone = require('backbone');
var querystring = require('querystring');
module.exports = (function () {

	/**
	 * APPの基底Backbone.Collectionクラス
	 * options
	 *  pagination: ページングするか否か
	 */
	var BaseCollection = Backbone.Collection.extend({
		initialize: function(options){
			var options = options || {};
			this.pagination = options.pagination || false;
			this.maxPage = 1;
			this.currentPage = 0;
		},
		/**
		 * Backbone.Collection#fetchのWrapper
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetch のオプション
		 *           getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		_fetch: function( options ){
			var options = options || {};
			if( options.remove !== false ){
				this._resetPaging();
			}
			var getParams  = _.extend(this._getOptionsForPagination(), options.getParams || {});

			if( options.url ){
				options.url = options.url +  "&" + querystring.encode( getParams );
			}else{
				options.url = this.url + "?" + querystring.encode( getParams );
			}

			var _this = this;
			return this.fetch(options)
			.done(function(data){
				_this.currentPage = data.page;
				_this.maxPage = data.maxPage;
				_this.trigger("page-info-has-been-set");
			});
		},
		/**
		 * ヘッダに認証情報を付与した後にajaxを発行(Backbone.Collection#fetch)
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetchのoptions
		 *        : on401 - トークンが無効の場合の動作(デフォルト: alert->ログイン画面へ遷移)
		 *          getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		fetchWithAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addAuthenticationHeaderToXHR }); 

			var on401 = _options.on401 || function(){
				/*
				var showLogin = function(){
					location.hash = "login";
				};
				applican.notification.alert('ログインしていません', showLogin, "","OK");
				*/
				// #7146 対応
				applican.notification.alert('ログインしていません', App.doNothing, "","OK");
				location.hash = "login";
			};

			return this._fetch(_options)
			.fail(function(res){
				if( res.status === 401 ){
					if(App.getAuthInfo().token){
						App.appModel.saveAsLogout();
					}
					on401();
				}
				if( res.status === 503 ){
					if(res.responseJSON && res.responseJSON.url){
						location.href = res.responseJSON.url;
					} else {
						App.util.text.alertMaintenance();
					}
				}
			});
		},
		/**
		 * ヘッダにApplicationIdを付与してajaxを発行(Backbone.Collection#fetch)
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetchのoptions
		 *          getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		fetchWithoutAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR }); 
			return this._fetch(_options);
		},
		/**
		 * returns boolean:ページングの最終ページまで読み込んだか否かを戻す
		 *                 ページングしていない場合は最後まで読み込んだと判定
		 */
		isAtLastPage: function(){
			return !this.pagination || this.maxPage <= this.currentPage;
		},
		/**
		 * ページ情報をリセットする
		 */
		_resetPaging: function(){
			this.maxPage = 0;
			this.currentPage = 0;
		},
		// 現在のページングに応じた、ページネーション用のURLパラメータ
		_getOptionsForPagination: function(){
			if( this.pagination ){
				return { page: (this.currentPage || 0) + 1, perPage: AppConf.core.defaultPerPage };
			}else{
				return {};
			}
		},
	});
	return BaseCollection;
})();

},{"backbone":"5kFNoY","querystring":"SZ5xis"}],204:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var BaseModel = Backbone.Model.extend({
		fetchWithAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addAuthenticationHeaderToXHR }); 

			var on401 = _options.on401 || function(){
				/*
				var showLogin = function(){
					location.hash = "login";
				};
				applican.notification.alert('ログインしていません', showLogin, "","OK");
				*/
				// #7146 対応
				applican.notification.alert('ログインしていません', App.doNothing, "","OK");
				location.hash = "login";
			};

			return this.fetch(_options)
			.fail(function(res){
				if( res.status === 401 ){
					if(App.getAuthInfo().token){
						App.appModel.saveAsLogout();
					}
					on401();
				}
				if( res.status === 503 ){
					if(res.responseJSON && res.responseJSON.url){
						location.href = res.responseJSON.url;
					} else {
						App.util.text.alertMaintenance();
					}
				}
			});
		},
		fetchWithoutAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR }); 
			return this.fetch(_options);
		},
	});
	return BaseModel;
})();

},{"backbone":"5kFNoY"}],205:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var CardModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/user/detail",
		parse: function(response) {
			this.extras = response.member[0].extras;
			this.issue = response.issue;
			this.barcode = response.barcode[0];

			var data = this.barcode.data;
			if ( type === 0 ) {
				this.set('dataBarcode',
					(!_.isUndefined(data)) ? data : null,
					{silent: true});
			} else {
				this.set('dataBarcode',
					(!_.isUndefined(data) && !_.isNumber(data)) ? data : null,
					{silent: true});	
			}
			
			var type = this.barcode.type;
			this.set('typeBarCode',
				(!_.isUndefined(type) && !_.isNumber(type)) ? type : null,
				{silent: true});

			var url = this.barcode.extras.account;
			this.set('urlBarCode',
				(!_.isUndefined(url)) ? url : null,
				{silent: true});

			var cardnum = _.findWhere(this.extras, {name : 'VALUE_CARDNO'});
			this.set('cardnum',
				(!_.isUndefined(cardnum) && !_.isNumber(cardnum.value)) ? cardnum.value : null,
				{silent: true});

			console.log("issue:" + this.issue);
			if (this.issue) {
				this.set('pinnum', this.issue.valuePinNo, {silent: true});
//				this.set('valueCardNo', this.issue.valueCardNo, {silent: true});
			}

			return response;
		},
		fetchWithAuthInfo: function(options){
			App.util.cache.responseCache(this, "user_detail_" + App.getAuthInfo().token, AppConf.expire.user.detail);
			return CardModel.__super__.fetchWithAuthInfo.call(this, options);
		}
	});
	return CardModel;
})();

},{"./base_model":204,"backbone":"5kFNoY"}],206:[function(require,module,exports){
var Backbone = require('backbone');
var CouponMasterModel = require('./coupon_master_model.js');
var BaseCollection = require('./base_collection.js');
var BaseModel = require('./base_model.js');
module.exports = (function () {

	var CategoryModel = BaseModel.extend({
		idAttribute: "id",
		isShop: function(){
			return this.get("type") === "shop";
		},
	});

	var CategoryCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/shop/category",
		model: CategoryModel,
		parse: function(response) {
			return response.category;
		},
	});
	return CategoryCollection;

})();

},{"./base_collection.js":203,"./base_model.js":204,"./coupon_master_model.js":210,"backbone":"5kFNoY"}],207:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var CouponModel = require('./coupon_model.js');
var moment = require('moment');
module.exports = (function () {
	var CouponCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/coupon/list",
		model: CouponModel,
		initialize: function(options){
			if ( options ) {
				this.couponId = options.couponId;
				this.pagination = options.pagination;
			}
		},
		comparator: function(model) {
			if ( this._order_by === "giveDate" ) {
				return -1 * model.get("giveDate"); // NOTE: the minus!
			} else {
				return model.get("expires");
			}
		},
		parse: function(response) {
			var _this = this;
			var nowTime = ( new Date() ).getTime();
			var newList = response.couponList
			.filter(function(item, index) {
				var flg = true;
				var isBeforeTerm = _this.isBeforeTerm(item);
				if(item.limitCode != 0 && !isBeforeTerm && item.memberOnly == 1 && item.finalUseDate){
					var isUsed = item.finalUseDate + AppConf.couponList.redisplayTime*1000 < nowTime;
					if(isUsed && !AppConf.couponList.showUsed){
						flg = false;
					}
				}
				return flg;
			});
			
			return newList.map(this.parseModel);
		},
		parseModel: function(item, index) {
			// TODO: hard data
			return _.extend(item, {
				type: item.type,// 2 is use ticket
				disableUse: false,// todo
				isSpecialUser: false,// todo
				cardPageTitle: item.pageTitle,
				cardName: item.name,
				bottom: "クーポン",
				titleBackgroundColor: item.titleBackgroundColor ? item.titleBackgroundColor : '',
				textColor: item.textColor ? item.textColor : '',
				layerColor: item.layerColor ? item.layerColor : '',
				layerTransparency: item.layerTransparency ? item.layerTransparency : '',
			});
		},
		fetchCouponAll: function(options) {			
			var _this = this;
			if ( this.couponId ) {
				return this.fetchWithAuthInfo({
					url: _this.url + "?coupId=" + _this.couponId,
					remove: options.remove,
					on401: function(){
						_this.fetchOpenCoupons();
					}
				});
			} else {
				return this.fetchWithAuthInfo({
					remove: options.remove,
					on401: function(){
						_this.fetchOpenCoupons();
					}
				});
			}			
		},
		fetchOpenCoupons: function(options){
			var _options = {};
			if ( this.couponId ) {
				_options = _.extend( options || {}, { url: this.url + "?type=0&coupId=" + this.couponId} );
			} else {
				_options = _.extend( options || {}, { url: this.url + "?type=0"} );
			}
			return this.fetchWithAuthInfo( _options );
		},
		orderByExpires: function() {
			this._order_by = "expires";
			this.sort();
		},
		isBeforeTerm: function(item){
			if (!item.usePeriodStartDate) return false; // 日付による期間指定ではない場合
			return Number( new Date() ) < item.usePeriodStartDate;
		},
		_order_by: "giveDate",
		fetchWithAuthInfo: function(options) {
			App.util.cache.responseCache(this, "coupon_list_" + App.getAuthInfo().token , AppConf.expire.coupon.list);
			return CouponCollection.__super__.fetchWithAuthInfo.call(this, options );
		},
		clearCache: function(){
			App.util.cache.clearCache("coupon_list_" + App.getAuthInfo().token);
		},
	});
	return CouponCollection;
})();

},{"./base_collection.js":203,"./coupon_model.js":211,"backbone":"5kFNoY","moment":"iROhDJ"}],208:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var CouponModel = require('./coupon_model.js');
var moment = require('moment');
module.exports = (function () {
	var CouponCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/coupon/list",
		model: CouponModel,
		initialize: function(options){
			if ( options ) {
				this.couponId = options.couponId;
				this.pagination = options.pagination;
			}
		},
		comparator: function(model) {
			if ( this._order_by === "giveDate" ) {
				return -1 * model.get("giveDate"); // NOTE: the minus!
			} else {
				return model.get("expires");
			}
		},
		parse: function(response) {
			var _this = this;
			var nowTime = ( new Date() ).getTime();
			var newList = response.couponList
			.filter(function(item, index) {
				var flg = true;
				var isBeforeTerm = _this.isBeforeTerm(item);
				if(item.limitCode != 0 && !isBeforeTerm && item.memberOnly == 1 && item.finalUseDate){
					var isUsed = item.finalUseDate + AppConf.couponList.redisplayTime*1000 < nowTime;
					if(isUsed && !AppConf.couponList.showUsed){
						flg = false;
					}
				}
				return flg;
			});
			
			return newList.map(this.parseModel);
		},
		parseModel: function(item, index) {
			// TODO: hard data
			return _.extend(item, {
				type: item.type,// 2 is use ticket
				disableUse: false,// todo
				isSpecialUser: false,// todo
				cardPageTitle: item.pageTitle,
				cardName: item.name,
				bottom: "クーポン",
				titleBackgroundColor: item.titleBackgroundColor ? item.titleBackgroundColor : '',
				textColor: item.textColor ? item.textColor : '',
				layerColor: item.layerColor ? item.layerColor : '',
				layerTransparency: item.layerTransparency ? item.layerTransparency : '',
			});
		},
		fetchCouponAll: function(options) {	
			var _this = this;
			if ( this.couponId ) {
				return this.fetchWithAuthInfo({
					url: _this.url + "?coupId=" + _this.couponId,
					remove: options.remove,
					on401: function(){
						_this.fetchOpenCoupons();
					}
				});
			} else {
				return this.fetchWithAuthInfo({
					remove: options.remove,
					on401: function(){
						_this.fetchOpenCoupons();
					}
				});
			}			
		},
		fetchOpenCoupons: function(options){
			var _options = {};
			if ( this.couponId ) {
				_options = _.extend( options || {}, { url: this.url + "?type=0&coupId=" + this.couponId} );
			} else {
				_options = _.extend( options || {}, { url: this.url + "?type=0"} );
			}
			return this.fetchWithAuthInfo( _options );
		},
		orderByExpires: function() {
			this._order_by = "expires";
			this.sort();
		},
		isBeforeTerm: function(item){
			if (!item.usePeriodStartDate) return false; // 日付による期間指定ではない場合
			return Number( new Date() ) < item.usePeriodStartDate;
		},
		_order_by: "giveDate",
	});
	return CouponCollection;
})();

},{"./base_collection.js":203,"./coupon_model.js":211,"backbone":"5kFNoY","moment":"iROhDJ"}],209:[function(require,module,exports){
var Backbone = require('backbone');
var CouponMasterModel = require('./coupon_master_model.js');
var BaseCollection = require('./base_collection.js');
module.exports = (function () {
	var CouponMasterCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/coupon/search",
		model: CouponMasterModel,
		comparator: function(model) {
			return -1 * model.get("id");
		},
		parse: function(response) {
			return response.couponList;
		},
		fetchPointExchangeable: function(options){
			var _options = _.extend( options || {}, { url: this.url + "?type=2"} );
			return this.fetchWithAuthInfo( _options );
		}
	});
	return CouponMasterCollection;

})();

},{"./base_collection.js":203,"./coupon_master_model.js":210,"backbone":"5kFNoY"}],210:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var CouponMasterModel = BaseModel.extend({
		idAttribute: "id",
		url: AppConf.url.appRoot + "/coupon/detail",
		mutators: {
			isExchangeable: function(){
				if( !this.get("userPoint" )) return false; // 外部からセットされて居ない場合はfalse
				return this.get("userPoint") >= this.get("exchangePoint");
			},
		},
		fetchCoupon: function(options){
			var options = _.extend( options || {}, { url: this.url + "?id=" + this.get("id") } );
			return this.fetchWithAuthInfo( options );
		},
		parse: function(res){
			return res.coupon || res;
		},
		setUserPoint: function( point ){
			this.set("userPoint", point );
		}
	});

	return CouponMasterModel;
})();

},{"./base_model.js":204,"backbone":"5kFNoY"}],211:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var CouponModel = Backbone.Model.extend({
		idAttribute: "uCoupId",
		mutators: { // https://github.com/asciidisco/Backbone.Mutators
			canBeUsed: {
				get: function(){ // http://stackoverflow.com/questions/21093280/how-to-access-backbone-model-methods-from-marionette-js-itemview-template
					return this.canBeUsed();
				}
			},
			isBeforeTerm: {
				get: function(){
					return this.isBeforeTerm();
				}
			},
			isMemberOnly: {
				get: function(){ // http://stackoverflow.com/questions/21093280/how-to-access-backbone-model-methods-from-marionette-js-itemview-template
					return this.isMemberOnly();
				}
			},
			finalUseCoupon: {
				get: function(){ // http://stackoverflow.com/questions/21093280/how-to-access-backbone-model-methods-from-marionette-js-itemview-template
					return this.finalUseCoupon();
				}
			},
		},
		use: function(){
			this.set({"finalUseDate": Number( new Date() ),"limitCode": "9"});
		},
		withinAvailableSpan: function( currentDate ){
			return currentDate - this.get("finalUseDate") <= 30000;
		},
		canBeUsed: function() {
			return this.get( "limitCode" ) + "" === "0";
		},
		isBeforeTerm: function(){
			if (this.get("usePeriodStartDate") === null) return false; // 日付による期間指定ではない場合
			return Number( new Date() ) < this.get("usePeriodStartDate");
		},
		isMemberOnly: function(){
			return this.get("memberOnly") + "" === "1";
		},
		needGEOLocationToUse: function(){
			var useType = this.get("useType");
			return useType + "" === "1" ||  useType + "" === "2";
		},
		canBeUsedWithoutGEOLocation: function(){
			var useType = this.get("useType");
			return useType + "" !== "2";
		},
		finalUseCoupon: function(){
			//console.log("finalUseDate : " + this.get("finalUseDate") );
			//console.log("limitCode : " + this.get("limitCode") );
			return this.get("finalUseDate") + AppConf.couponList.redisplayTime*1000 >= Number( new Date() );
		}

	});

	return CouponModel;
})();

},{"backbone":"5kFNoY"}],212:[function(require,module,exports){
var Backbone = require('backbone');
module.exports = (function () {
	var DataModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("data-temp"),
		idAttribute: "id",
		setUserId: function(memberId) {
			this.set("memberId", memberId);
			this.save();
		},
		setImageUrl: function(imageUrl) {
			this.set("imageUrl", imageUrl);
			this.save();
		},
		getUserId: function() {
			return this.get("memberId");
		},
		getImageUrl: function() {
			return this.get("imageUrl");
		},
	    safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
			_this.trigger('ready', _this);
			})
			.fail(function(err){
			if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
			console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
			}
			_this.trigger('ready', _this);
			});
	    }
	});

	return DataModel;

})();
},{"backbone":"5kFNoY"}],213:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
var BaseCollection = require('./base_collection.js');
module.exports = (function() {
	var historyType = null;
	var HistoryModel = BaseModel.extend({
		mutators: {
			isCouponHistory: {
				get: function() {
					return historyType === HistoryModel.type.coupon;
				}
			},
			isStampHistory: {
				get: function() {
					return historyType === HistoryModel.type.stamp;
				}
			},
			isPointHistory: {
				get: function() {
					return historyType === HistoryModel.type.point;
				}
			},
			isPassTicketUseHistory: {
				get: function() {
					return historyType === HistoryModel.type.passTicketUse;
				}
			}
		}
	});
	HistoryModel.type = {
		coupon: "0",
		stamp: "1",
		point: "2",
		passTicketUse: '32'
	};

	var HistoryCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/user/history",
		model: HistoryModel,
		parse: function(response) {
			return response.history;
		},
		fetchCouponHistory: function(options) {
			historyType = HistoryModel.type.coupon;
			var _options = _.extend(options || {}, { url: this.url + "?perPage=100&type=" + HistoryModel.type.coupon });
			return this.fetchWithAuthInfo(_options);
		},
		fetchStampHistory: function(options) {
			historyType = HistoryModel.type.stamp;
			var _options = _.extend(options || {}, { url: this.url + "?type=" + HistoryModel.type.stamp });
			return this.fetchWithAuthInfo(_options);
		},
		fetchPointHistory: function(options) {
			historyType = HistoryModel.type.point;
			var _options = _.extend(options || {}, { url: this.url + "?perPage=100&type=" + HistoryModel.type.point });
			return this.fetchWithAuthInfo(_options);
		},
		fetchPassTicketUseHistory: function(options) {
			historyType = HistoryModel.type.passTicketUse;
			var _options = _.extend(options || {}, { url: this.url + "?perPage=100&type=" + HistoryModel.type.passTicketUse });
			return this.fetchWithAuthInfo(_options);
		},
	});
	return HistoryCollection;

})();

},{"./base_collection.js":203,"./base_model.js":204,"backbone":"5kFNoY"}],214:[function(require,module,exports){
var BaseCollection = require('./base_collection.js');
var InformationModel = require('./information_model.js');
module.exports = (function () {
	var InformationCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/information/list",
		model: InformationModel,
		parse: function(response) {
			this.data = response.information;
			return response.information;
		},
		initialize: function(){
			this.listenTo( this, 'sync', this.paginate );
		},
		fetchWithoutLogin: function( registrationId , options){
			var options = _.extend( options || {}, { url: this.url + "?registrationId=" + registrationId } );
			App.util.cache.responseCache(this, "information_list_registrationId"  + registrationId, AppConf.expire.information.list);
			return InformationCollection.__super__.fetchWithoutAuthInfo.call(this,  options );
		},
		fetchWithAuthInfo: function( options){
			App.util.cache.responseCache(this, "information_list_" + App.getAuthInfo().token , AppConf.expire.information.list);
			return InformationCollection.__super__.fetchWithAuthInfo.call(this,  options );
		},
		getUnReadCounts: function() {
			var unReadNotifications = this.data.filter(function(notification){
				return notification.readFlg == 0 
			});
			var hadReadNotificationsAtLocal = unReadNotifications.filter(function(notification){
				return App.util.storage.getStorage("information_read_" + notification.id + "_" + App.appModel.getPushToken());
			});
			return unReadNotifications.length - hadReadNotificationsAtLocal.length;
		},
		paginate: function(){
			this.page =  AppConf.core.defaultPerPage;
			this.reset(this.data.slice(0, this.page));
			this.trigger("paging");
		},
		getMore: function(){
			this.page = (this.page || 0) +   AppConf.core.defaultPerPage;
			this.reset(this.data.slice(0, this.page));
			this.trigger("paging");
		},
		isAtLastPage: function(){
			return this.length == this.data.length ;
		},
		clearCache: function(){
			App.util.cache.clearCache("information_list_registrationId"  + App.appModel.getPushToken());
			App.util.cache.clearCache( "information_list_" + App.getAuthInfo().token);
		}
	});
	return InformationCollection;
})();

},{"./base_collection.js":203,"./information_model.js":215}],215:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var InformationModel = BaseModel.extend({
		idAttribute: "informationId",
		url: AppConf.url.appRoot + "/information/detail",
		mutators: {
		},
		parse: function(res){
			return res.information || res;
		},
		fetchSingleInformation: function( options ){
			App.util.cache.responseCache(this, "information_detail_" + this.get("informationId"), AppConf.expire.information.detail);
			var _options = _.extend( options || {}, { url: this.url + "?informationId=" + this.get("informationId") } );
			return this.fetchWithAuthInfo( _options );
		},
		fetchSingleInformationWithoutToken: function( registrationId, options ){
			App.util.cache.responseCache(this, "information_detail_" + this.get("informationId"), AppConf.expire.information.detail);
			var _options = _.extend( options || {}, {
				url: this.url + "?informationId=" + this.get("informationId") + "&registrationId=" + registrationId });
				return this.fetchWithoutAuthInfo( _options );
		},
	});

	return InformationModel;
})();

},{"./base_model.js":204,"backbone":"5kFNoY"}],216:[function(require,module,exports){
var BaseCollection = require('./base_collection.js');
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function() {
	var PassticketPurchaseModel = Backbone.Model.extend({
		idAttribute: "id",
	});
	var PassticketPurchaseCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/coupon/list",//type = 2 get all coupon has purchase passticket
		model: PassticketPurchaseModel,
		comparator: function(model) {
			if ( this._order_by === "giveDate" ) {
				return -1 * model.get("giveDate"); // NOTE: the minus!
			} else {
				return model.get("expires");
			}
		},
		parse: function(response) {
			return response.couponList.map(this.parseModel);
		},
		parseModel: function(item, index) {
			// TODO: hard data
			return _.extend(item, {
				type: item.type,// 2 is use ticket
				disableUse: false,// todo
				isSpecialUser: false,// todo
				cardPageTitle: item.pageTitle,
				cardName: item.name,
				bottom: item.usePeriodType == 1 ? (item.usePeriodValue + "日定期券") : (moment(item.usePeriodStartDate).format("YYYY/MM/DD") + ' ～ ' + moment(item.usePeriodStartDate).format("YYYY/MM/DD")),
				titleBackgroundColor: item.titleBackgroundColor ? item.titleBackgroundColor : '',
				textColor: item.textColor ? item.textColor : '',
				layerColor: item.layerColor ? item.layerColor : '',
				layerTransparency: item.layerTransparency ? item.layerTransparency : '',
			});
		},
		checkingHasNewCard: function() {
			var newList = this.models.filter(function(item) {
				return item.get('limitCode') === 0;
			});
			return newList.length > 0;
		},
		checkingHasUseCard: function(model) {
			var flg = false;
			var isBeforeTerm = this.isBeforeTerm(model);
			if (model.get('limitCode') != 0 && !isBeforeTerm && model.get('memberOnly') == 1 && model.get('finalUseDate')) {
				flg = true;
			}
			return flg;
		},
		isBeforeTerm: function(item) {
			if (!item.get('usePeriodStartDate')) return false; // 日付による期間指定ではない場合
			return Number(new Date()) < item.get('usePeriodStartDate');
		},
		fetchPassTicketPurchase: function(options) {
			var _options = _.extend(options || {}, { getParams: { type: 2 } });
			App.util.cache.responseCache(this, "pass_ticket_purchase_list_" + App.getAuthInfo().token, AppConf.expire.coupon.list);
			return PassticketPurchaseCollection.__super__.fetchWithAuthInfo.call(this, _options);
		},
		clearCache: function(){
			App.util.cache.clearCache("pass_ticket_purchase_list_" + App.getAuthInfo().token);
		},

	});
	return PassticketPurchaseCollection;
})();
},{"./base_collection.js":203,"backbone":"5kFNoY","moment":"iROhDJ"}],217:[function(require,module,exports){
var BaseCollection = require('./base_collection.js');
var Backbone = require('backbone');
module.exports = (function() {
	/* var PaymentPurchaseHistoryModel = Backbone.Model.extend({
		// idAttribute: "id",
	}); */
	var PaymentPurchaseHistoryCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/payments/purchase/history",
		// model: PaymentPurchaseHistoryModel,
		parse: function(response) {
			response.histories = response.histories ? response.histories : [];
			return response.histories;
		},
		fetchPaymentPurchaseHistory: function(options) {
			var _options = _.extend(options || {}, { getParams: { perPage: 100, hasPurchased: options && options.hasPurchased ? options.hasPurchased : false } });
			return this.fetchWithAuthInfo(_options);
		},
	});
	return PaymentPurchaseHistoryCollection;
})();
},{"./base_collection.js":203,"backbone":"5kFNoY"}],218:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var PointModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/user/point",
		fetchWithAuthInfo: function(options){
			App.util.cache.responseCache(this, "user_point_" + App.getAuthInfo().token, AppConf.expire.user.point);
			return PointModel.__super__.fetchWithAuthInfo.call(this, options);
		},
		clearCache: function(){
			App.util.cache.clearCache("user_point_" + App.getAuthInfo().token);
		},
	});
	return PointModel;
})();

},{"./base_model":204,"backbone":"5kFNoY"}],219:[function(require,module,exports){
var Backbone = require('backbone');
var BaseCollection = require('./base_collection.js');
var ShopModel = require('./shop_model.js');
module.exports = (function () {
	var ShopCollection = BaseCollection.extend({
		url: AppConf.url.appRoot + "/shop/search",
		model: ShopModel,
		parse: function(response) {
			return response.shopList;
		},
		/**
		 * 位置情報を元に店舗を検索
		 */
		fetchWithGeoLocationInfo: function( longitude, latitude, options ){
			var options = options || {}; 
			options.getParams = {
				longitude: longitude,
				latitude: latitude,
				searchType: 0
			};

			return this.fetchWithAuthInfo( options );
		},
		/**
		 * フリーワードを指定しての検索
		 * 何も無い場合は全件取得します
		 */
		fetchWithFreeword: function( text, options ){
			var options = options || {}; 
			if( text ){options.getParams = { searchType: 2, keyword: text }; }
			return this.fetchWithAuthInfo( options );
		},
	});
	return ShopCollection;
})();

},{"./base_collection.js":203,"./shop_model.js":220,"backbone":"5kFNoY"}],220:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var ShopModel = BaseModel.extend({
		url: AppConf.url.appRoot + '/shop/detail',
		fetchShop: function(options){
			var options = _.extend( options || {}, { url: this.url + "?id=" + this.get("id") } );
			return this.fetchWithAuthInfo( options );
		},
		parse: function(res){
			return res.shop || res;
		},
	});
	return ShopModel;
})();

},{"./base_model.js":204,"backbone":"5kFNoY"}],221:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model.js');
module.exports = (function () {
	var StampViewModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/stamp/detail",
		parse: function(res){
			return res.stamp;
		},
		isExchangeableForCoupon: function(){
			return this.get("stampRank1Type") + "" === "0";
		},
		isCouponOnly: function(){
			return this.get("checkType") + "" === "0";
		},
	});
	return StampViewModel;
})();

},{"./base_model.js":204,"backbone":"5kFNoY"}],222:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function() {
	var UserModel = BaseModel.extend({
		urlRoot: AppConf.url.appRoot + "/user/detail",
		parse: function(response) {
			this.extras = response.member[0].extras;
			if(AppConf.userRankColumn){
				var userRank = _.findWhere(this.extras, {name : AppConf.userRankColumn});
				this.set('userRank',
					(!_.isUndefined(userRank) && !_.isNumber(userRank.value)) ? userRank.value : null,
					{silent: true});
			}
			return response;
		},
		fetchWithAuthInfo: function(options) {
			App.util.cache.responseCache(this, "user_detail_" + App.getAuthInfo().token, AppConf.expire.user.detail);
			return UserModel.__super__.fetchWithAuthInfo.call(this, options);
		},
		clearCache: function() {
			App.util.cache.clearCache("user_detail_" + App.getAuthInfo().token);
		},
	});
	return UserModel;
})();

},{"./base_model":204,"backbone":"5kFNoY"}],223:[function(require,module,exports){
var Backbone = require('backbone');
var BaseModel = require('./base_model');
module.exports = (function () {
	var ValueModel = BaseModel.extend({
		// urlRoot: "http://bt11.betrend.com/value-api" + "/user/value/detail.php",
		urlRoot: AppConf.url.appRoot + "/user/value/detail",
		parse: function(response) {
			this.set('point', response.balancePoint, {silent: true});
			this.set('basic', response.balanceBasic, {silent: true});
			this.set('bonus', response.balanceBonus, {silent: true});
			this.set('coupon', response.balanceCoupon, {silent: true});
			this.set('total', response.balanceTotal, {silent: true});
			this.set('expireDateBasic', response.expireDateBasic, {silent: true});
			this.set('expireDateBonus', response.expireDateBonus, {silent: true});
			this.set('expireDateCoupon', response.expireDateCoupon, {silent: true});
			this.set('expireDatePoint', response.expireDatePoint, {silent: true});
			console.log('balancePoint:' + response.balancePoint + 'balanceBasic:' + response.balanceBasic + 'balanceBounus:' + response.balanceBounus + 'balanceCoupon:' + response.balanceCoupon);
			return response;
		},
		fetchWithAuthInfo: function(options){
			App.util.cache.responseCache(this, "user_value_detail_" + App.getAuthInfo().token, AppConf.expire.user.value.detail);
			return ValueModel.__super__.fetchWithAuthInfo.call(this, options);
		}
	});
	return ValueModel;
})();

},{"./base_model":204,"backbone":"5kFNoY"}],224:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="progress-screen show visible">\r\n  <img class="progress-image" src="./image/progress.gif">\r\n</div>\r\n';
}
return __p;
};

},{}],225:[function(require,module,exports){
var MainNavView = require('./main_nav/main_nav_view');
var LoginLayout = require('./login/login_layout');
var LoginSmsTelLayout = require('./login/login_sms_tel_layout');
var LoginSmsPassLayout = require('./login/login_sms_pass_layout');
var LoginSmsMenuLayout = require('./login/login_sms_menu_layout');
var MainNavCollection = require('./main_nav/main_nav_collection.js');
var Backbone = require('backbone');
var querystring = require('querystring');

module.exports = (function(){

	var Router = Backbone.Router.extend({

		routes:{
			"" : "showMenue",
			"login" : "showLogin",
			"loginSms" : "showLoginSms",
			"loginSmsPass(?:query)" : "showLoginSmsPass",
			"loginSmsMenu(?:query)" : "showLoginSmsMenu",
			"clear" : "clearLoacalStorage",
		},

		showLogin: function(){
			var loginLayout = new LoginLayout();
			loginLayout.render();
			App.pageSlider.slidePage( loginLayout);
			App.headerModel.applyViewHeaderConf( loginLayout.headerConf );
		},
		showLoginSms: function(){
			var loginLayout = new LoginSmsTelLayout();
			loginLayout.render();
			App.pageSlider.slidePage( loginLayout);
			App.headerModel.applyViewHeaderConf( loginLayout.headerConf );
		},
		showLoginSmsPass: function(query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			console.log('showLoginSmsPass smstel:' + queryObj.smstel);
			var loginPassLayout = new LoginSmsPassLayout(
				{smstel: queryObj.smstel, userId: queryObj.userId}
			);
			loginPassLayout.render();
			App.pageSlider.slidePage( loginPassLayout);
			App.headerModel.applyViewHeaderConf( loginPassLayout.headerConf );
		},
		showLoginSmsMenu: function(query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			console.log('showLoginSmsPass smstel:' + queryObj.smstel);
			var loginMenuLayout = new LoginSmsMenuLayout(
				{smstel: queryObj.smstel, userId: queryObj.userId}
			);
			loginMenuLayout.render();
			App.pageSlider.slidePage( loginMenuLayout);
			App.headerModel.applyViewHeaderConf( loginMenuLayout.headerConf );
		},

		showMenue: function(){
			var collection = new MainNavCollection([
				{ href: "#login", text: "ログイン"},
				{ href: "#clear", text: "クリアStorage"},
			]);
			var mainNavView = new MainNavView({ navCollection: collection });

			mainNavView.render();
			App.pageSlider.slidePage( mainNavView );
			App.headerModel.applyViewHeaderConf(mainNavView.headerConf);
			mainNavView.trigger("load:sync");
		},
		clearLoacalStorage: function(){
			localStorage.clear();
		}

	});

	return Router;


})();

},{"./login/login_layout":159,"./login/login_sms_menu_layout":161,"./login/login_sms_pass_layout":163,"./login/login_sms_tel_layout":167,"./main_nav/main_nav_collection.js":178,"./main_nav/main_nav_view":183,"backbone":"5kFNoY","querystring":"SZ5xis"}],226:[function(require,module,exports){
var Backbone = require('backbone');
var SlideShowModel = require('./slideshow_model.js');
require('../../../../lib/components/slickSlider/slick/slick.min.js');
module.exports = (function() {
	var SlideShowCollection = Backbone.Collection.extend({
		url: AppConf.url.appRoot + "/slideshow/get",
		model: SlideShowModel,
		initialize: function(options) {
			this.index = 0;
		},
		parse: function(response) {
			return response.slideshowContentsList;
		},
		fetchWithoutAuthInfo: function(options) {
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR });
			var _this = this;
			var model = new SlideShowModel({ id: AppConf.core.localStorageKey });
			model.safeFetch();

			var on400 = _options.on400 || function() {
			};

			return this.fetch(_options)
				.done(function(data) {
					_this.successSlideShow(data, model);
				})
				.fail(function(err) {
					on400();
				});
		},
		fetchWithAuthInfo: function(options) {
			var _options = _.extend(options || {}, { beforeSend: App.addAuthenticationHeaderToXHR });
			var _this = this;
			var model = new SlideShowModel({ id: AppConf.core.localStorageKey });
			model.safeFetch();

			var on400 = _options.on400 || function() {
			};

			return this.fetch(_options)
				.done(function(data) {
					_this.successSlideShow(data, model);
				})
				.fail(function(err) {
					on400();
				});
		},
		// imgBase64: function(src){
		// 	var _this = this;
		// 	var canvas = document.createElement("canvas");
		// 	var imgUrl;
		//         	if (!canvas || !canvas.getContext || !canvas.getContext('2d')) {
		//           	return;
		//         	}
		//         	var image = new Image();
		//         	image.setAttribute('crossOrigin', 'anonymous');


		//         	image.src = src;
		//         	image.onload = function() {

		//           	// 画像をbase64にするためにCanvasを利用するので、
		//           	// クロスドメインの画像は無理かも。。
		//           	var canvas = document.createElement("canvas");
		//           	canvas.width = image.width;
		//           	canvas.height = image.height;
		//           	canvas.getContext('2d').drawImage(image, 0, 0);
		//           	var base64 = canvas.toDataURL();
		//           	for (var i = _this.index; i < _this.length; i++){
		// 			if ( _this.models[i].get("imageUrl") ){
		// 				_this.models[i].set("imageUrl", base64);
		// 				_this.index++;
		// 				if ( _this.index >= _this.length ){
		// 					var model = new SlideShowModel( { id: AppConf.core.localStorageKey } );
		// 					model.safeFetch();
		//         			model.setSlideInfo( _this.models );
		// 					_this.index = 0;
		//           			}
		// 				return;
		// 			}else{
		// 				_this.index++;
		// 			}
		//           	}
		// 	}
		// },
		onLoad: function() {
			this.showSlide();
		},
		showSlide: function() {			
			$('.slickSlider').slick({
				autoplay: true,
				autoplaySpeed: AppConf.slideshow.autoplaySpeed,
				accessibility: false,
				speed: AppConf.slideshow.speed,
				arrows: false,
				dots: true
			});
		},
		successSlideShow: function(data, model) {
			this.reset();
			if (data.slideshowContentsList.length === 0) {
				$('.sliderImages').remove();
			} else {
				this.add(data.slideshowContentsList);
				model.setSlideInfo(data.slideshowContentsList);
			}
			$(window).bind('load', this.onLoad());
		}
	});

	return SlideShowCollection;
})();

},{"../../../../lib/components/slickSlider/slick/slick.min.js":2,"./slideshow_model.js":228,"backbone":"5kFNoY"}],227:[function(require,module,exports){
var Backbone = require('backbone');
var SlideShowItemView = require('./slideshow_view.js');
module.exports = (function () {
	var SlideShowCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: SlideShowItemView
	});

	return SlideShowCollectionView;

})();

},{"./slideshow_view.js":230,"backbone":"5kFNoY"}],228:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = (function(){

	var SlideShowModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("slide-show"),
		idAttribute: "id",
		defaults: {
			id: AppConf.core.localStorageKey
		},
		getSlideInfo: function(){
			return this.get("slideInfo");
		},
		setSlideInfo: function( slideInfo ){
			var slideInfor = this.get("slideInfo");
			slideInfor = slideInfo;
			this.set("slideInfo", slideInfor);
			this.save();
		},
		safeFetch: function(options){
			var _options = options || {};
			var _this = this;
			this.fetch( _options )
			.done(function(data){
				_this.trigger('ready', _this);
			})
			.fail(function(err){
				if( err !== "Record Not Found" ){ // Record Not Foundは無視してよい(初回起動を意味する)
					console.log( err ); // TODO: サーバにエラー通知が出来るしくみを確立したい
				}
				_this.trigger('ready', _this);
			});
		}
	});

	return SlideShowModel;


})();
},{"backbone":"5kFNoY"}],229:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if( imageUrl ){ 
__p+='\n\t\n\t';
 if( linkUrl ){ 
__p+='\n\t\t<a class="slide-link"><img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" /></a>\n\t';
 }else{ 
__p+='\n\t\t<img src="'+
((__t=( imageUrl ))==null?'':__t)+
'" />\n\t';
 } 
__p+='\n\n';
 }else{ 
__p+='\n\t<img src="./image/common/noImage.png" />\n';
 } 
__p+='';
}
return __p;
};

},{}],230:[function(require,module,exports){
var Backbone = require('backbone');
var $ = require('jquery');
module.exports = (function () {
	var SlideshowItemView = Backbone.Marionette.ItemView.extend({
		template: require('./slideshow_template_view.html'),
    	tagName: 'span',
		className: 'slide-img',
		ui: {
			'imageLink': '.slide-link'
		},
		events: {
			'click @ui.imageLink': 'openSlideLink'
		},
		onLoadImage: function(e) {
			e.target.classList.add('fadeIn');
		},
		onRender: function() {
			this.$('img').on('load', this.onLoadImage);
		},
		openSlideLink: function() { 
			App.util.text.processOpenLink(this.model.get('linkUrl'), this.model.get('webviewFlag'));
		}
	});

	return SlideshowItemView;

})();
},{"./slideshow_template_view.html":229,"backbone":"5kFNoY","jquery":"HlZQrA"}],231:[function(require,module,exports){
/**
 * 雛形アプリにおけるでバッジ設定用メソッド郡を提供
 */

var InformationCollection = require('../models/information_collection');
var PassticketPurchaseCollection = require('../models/passticket_purchase_collection.js');
module.exports = (function () {
	var BadgeUtil = {
		setBadgeAppIcon: function( unReadCounts ){},
		showBadge:function(){
			var informationCollection = new InformationCollection();
			var onGetUnread = onGetUnreadDone.bind(null,informationCollection);
			if (App.getAuthInfo().token) {
				informationCollection.fetchWithAuthInfo().done(onGetUnread);
			} else {
				informationCollection.fetchWithoutLogin(App.appModel.getPushToken()).done(onGetUnread);
			};
		},
		showBadgePassticket: function() { 
			var passticketPurchaseCollection = new PassticketPurchaseCollection();
			if (App.getAuthInfo().token) {
				passticketPurchaseCollection.fetchPassTicketPurchase().done(function() { 
					if(passticketPurchaseCollection.checkingHasNewCard()){
						App.headerView.showBadgePassTicket();
					} else {
						App.headerView.hideBadgePassTicket();
					}
				});
			}
		}
	}; 
	var onGetUnreadDone = function(informationCollection){
		var unReadCounts = informationCollection.getUnReadCounts();
		BadgeUtil.setBadgeAppIcon(unReadCounts);
		var $dadgeNumber = $(".badge-number");
		if($dadgeNumber.length){
			if (unReadCounts >= 1) {
				$dadgeNumber.text(unReadCounts);
				$dadgeNumber.addClass('show');
			} else {
				$dadgeNumber.removeClass('show');
			}
		}
	};
	return BadgeUtil;

})();

},{"../models/information_collection":214,"../models/passticket_purchase_collection.js":216}],232:[function(require,module,exports){
(function (Buffer){
// ビートレンドCRMのAPIを叩くメソッド群です
module.exports = (function () {
	var BtApi = function(options){
		this.ApplicationId = options.ApplicationId;
		this.rootUrl = options.rootUrl;
		this.ContentsVersion = options.ContentsVersion;

		this.BundleId = applican.device.package_name;
		this.BundleVersion = "";
		this.Platform = "";
		this.PlatformVersion = "";
		this.DeviceName = "";
		this.ApplicanVersion = "";
		this.Uuid = "";
		this.UuidRfc4122 = "";
		this.RegistrationId = "";

		this.TrackingID = "";

		$.ajaxSetup({
			beforeSend: this.setupAjax
		});
	};
	BtApi.prototype = {
		setupAjax: function (xhr, settings) {
			xhr.done(function (data, status, xhr) {
				if (typeof xhr.getResponseHeader != 'function') {
					return;
				}
				var serverContentsVersion = xhr.getResponseHeader("X-Server-Contents-Version");
				if (App.btApi.ContentsVersion && serverContentsVersion && App.btApi.ContentsVersion < serverContentsVersion) {
					console.log("Application finish because old contents.");
					applican.notification.alert(
						AppConf.message.contentsVersionUp,
						function () { },
						AppConf.message.information,
						AppConf.message.yes);
					applican.finish();
				}
			});
			xhr.fail(function (xhr, status, err) {
				if(xhr.status === 401) {
					if(App.getAuthInfo().token){
						App.appModel.saveAsLogout();
					}
				}
				if (xhr.status === 503) {
					if(xhr.responseJSON && xhr.responseJSON.url){
						location.href = xhr.responseJSON.url;
					} else {
						App.util.text.alertMaintenance();
					}
				}
			});
		},
		getDefaultAjaxHeaders: function () {
			var headers = {};
			headers["X-Client-Contents-Version"] = (this.ContentsVersion) ? this.ContentsVersion: null;
			headers["X-Bundle-Id"] = (this.BundleId) ? this.BundleId: null;
			headers["X-Bundle-Version"] = (this.BundleVersion) ? this.BundleVersion: null;
			headers["X-Platform"] = (this.Platform) ? this.Platform: null;
			headers["X-Platform-Version"] = (this.PlatformVersion) ? this.PlatformVersion: null;
			headers["X-Device-Name"] = (this.DeviceName) ? this.DeviceName: null;
			headers["X-Applican-Version"] = (this.ApplicanVersion) ? this.ApplicanVersion: null;
			headers["X-Uuid"] = (this.Uuid) ? this.Uuid: null;
			headers["X-Uuid-Rfc4122"] = (this.UuidRfc4122) ? this.UuidRfc4122: null;
			headers["X-Registration-Id"] = (this.RegistrationId) ? this.RegistrationId: null;
			return headers;
		},
		getAjaxAuthHeaders: function(){
			var headers= this.getDefaultAjaxHeaders();
			headers.ApplicationId = this.ApplicationId;
			headers["Content-Type"] = "application/json"
			if( App.getAuthInfo().token ){
				headers.Authorization = App.getAuthInfo().token;
			}
			// NOTE : 取得不能な場合（ブラウザ等）はandroidとして送信する
			headers.ApplicationType = applican.config.device_os === "ANDROID" ? 1 : 2;
			console.log(headers);
			return headers;
		},
		// ログインAPIを叩く
		login: function( userid, password ){
			var a = {};
			a.url = this.rootUrl + "/auth/login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = { mailaddress: userid , password: password};
			// if( App.appModel.get("pushToken") ){
			// 	data.registrationId = App.appModel.get("pushToken");
			// }
			if ( !_.isEmpty(this.Uuid) ) {
				data.uuid = this.Uuid;
				if ( !_.isEmpty(this.TrackingID) ) {
					data.trackingid = this.TrackingID;
				}
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// SMS用ログインAPIを叩く
		loginSms: function( smstel, password ){
			var a = {};
			a.url = this.rootUrl + "/auth/login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = {smstel: smstel, password: password, authType: "3"};
			if( App.appModel.get("pushToken") ){
				data.registrationId = App.appModel.get("pushToken");
			}
			if ( !_.isEmpty(this.Uuid) ) {
				data.uuid = this.Uuid;
				if ( !_.isEmpty(this.TrackingID) ) {
					data.trackingid = this.TrackingID;
				}
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// SMS送信APIを叩く(URL通知用)
		sendsms: function( smstel ){
			var msg = AppConf.sms.message;
			var a = {};
			a.url = this.rootUrl + "/sms/sendApp";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = {tel: smstel, msg: msg, formUrl: AppConf.url.smsRegisterForm};
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// SMS送信APIを叩く(パスワード通知用)
		sendsmsPass: function( smstel ){
			var msg = AppConf.sms.message;
			var a = {};
			a.url = this.rootUrl + "/sms/sendApp";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = {tel: smstel, msg: msg};
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// シームレスログインAPIを叩く
		seamlessLogin: function( token ){
			console.log('seamlessLogin: ' + token);
			token = Buffer(token, 'base64').toString();
//			console.log('seamlessLoginBase64Dec: ' + token);
			token = decodeURIComponent(token);
//			console.log('seamlessLoginUrlDec: ' + token);
			var a = {};
			a.url = this.rootUrl + "/auth/seamless_login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = { seamlessparam: token };
			if( App.appModel.get("pushToken") ){
				data.registrationId = App.appModel.get("pushToken");
			}
			if ( !_.isEmpty(this.Uuid) ) {
				data.uuid = this.Uuid;
				if ( !_.isEmpty(this.TrackingID) ) {
					data.trackingid = this.TrackingID;
				}
			}
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// ログアウトAPIを叩く
		logout: function(){
			var a = {};
			a.url = this.rootUrl + "/auth/logout"
			if ( !_.isEmpty(this.Uuid) ) {
				a.url += "?uuid=" + this.Uuid;
				if ( !_.isEmpty(this.TrackingID) ) {
					a.url += "&trackingid=" + this.TrackingID;
				}
			}
			a.type = "POST";
			a.headers = this.getAjaxAuthHeaders();
			return $.ajax(a);
		},
		// options
		//  id,uCoupId,longitude,latitude
		// クーポン利用APIを叩く
		useCoupon: function( params ){
			var options = {};
			options.url = this.rootUrl + "/coupon/use";
			options.headers = this.getAjaxAuthHeaders();
			options.type = "POST"
			options.data = JSON.stringify({ id: params.id, uCoupId: params.uCoupId, longitude: params.longitude, latitude: params.latitude});
			console.log(options.data);
			return $.ajax( options );
		},
		// ポイントを利用してクーポンを取得するAPIを叩く
		exchangeCoupon: function( couponId ){
			var options = {};
			options.url = this.rootUrl + "/user/exchange_coupon";
			options.headers = this.getAjaxAuthHeaders();
			options.type = "POST"
			options.data = JSON.stringify({ couponId: couponId });
			return $.ajax( options );
		},

		// スタンプを取得するAPIを叩く
		getStamp: function( options ){
			var a = {}
			a.url = this.rootUrl + "/stamp/use";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({"latitude": options.latitude,"longitude": options.longitude });
			return $.ajax( a );
		},
		// livepass の registrationID をビートレンドCRMに登録する
		insert: function( args ){

			var a = {}
			a.url = this.rootUrl + "/notification/insert";
			if( AppConf.features.autoregist ){
				a.url = this.rootUrl + "/notification/regist";
			}
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"

			a.data = JSON.stringify({
				"registrationId": args.registrationId,
				//"old": args.registrationId,
			});
			return $.ajax( a );
		},
		// trackingidあり
		insertTracking: function( args ){

			var a = {}
			a.url = this.rootUrl + "/notification/insert";
            var data = { "registrationId": args.registrationId};
			if( AppConf.features.autoregist ){
				a.url = this.rootUrl + "/notification/regist";
	            if ( !_.isEmpty(this.Uuid) ) {
	                data.uuid = this.Uuid;
	                if ( !_.isEmpty(this.TrackingID) ) {
	                    data.trackingid = this.TrackingID;
	                }
	            }
			}
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"

            a.data = JSON.stringify( data );
			return $.ajax( a );
		},

		// 情報表示済みであることをlivepassに伝える
		popInformation: function( args ){
			var a = {}
			a.url = this.rootUrl + "/information/pop";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({
				"informationId": args.informationId,
				"registrationId": args.registrationId
			});
			return $.ajax( a );
		},
		// 新着情報を既読にする
		readInformation: function( args ){
			var a = {}
			a.url = this.rootUrl + "/information/read";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({
				"informationId": args.informationId,
				"registrationId": args.registrationId
			});
			return $.ajax( a );
		},
		// hitapのスタンプ獲得・利用APIにする
		getStampHitap: function( args ){
			var a = {}
			a.url = this.rootUrl + "/hitap/stamp/use";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST";			
			a.data = JSON.stringify({
				"point": args.point,
				"device": args.device,
				"ratio": args.ratio,
				"orientation": args.orientation
			});
			return $.ajax( a );
		},
		// hitapのスタンプ利用にする
		useStampHitap: function(args) {
			var a = {}
			a.url = this.rootUrl + "/hitap/stamp/use_verified";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST";
			a.data = JSON.stringify({
				"shopId": args.shopId,
				"uCoupId": args.uCoupId,
				"hitapCode": args.hitapCode,
				"securityCode": args.securityCode
			});
			return $.ajax( a );	
		},
		drawScratch: function( args ) {
			var a = {}
			var type = args.type;
			var _isQuickScratch = window.isQuickScratch ? '?isQuickScratch=true' : '';
			a.url = this.rootUrl + "/scratch/draw" + _isQuickScratch;
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			var param;
			switch ( AppConf.scratch.type ) {
				case 1:
					param = {"custId": args.custId};
					break;
				case 2:
					param = {"shopId": args.shopId};
					break;
				default:
					param = {"scratchId": args.scratchId};
					break;
			};
			a.data = JSON.stringify(param);
			return $.ajax( a );
		},
		completeScratch: function( args ) {
			var a = {}
			var type = args.type;
			var _isQuickScratch = window.isQuickScratch ? '?isQuickScratch=true' : '';
			a.url = this.rootUrl + "/scratch/complete" + _isQuickScratch;
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({
				"lotId": args.lotId
			});
			return $.ajax( a );
		},
		// uuid、trackingidで自動ログインする
		tracking: function(args) {
			var a = {}
			a.url = this.rootUrl + "/auth/device_login";
			a.headers = this.getAjaxAuthHeaders();
			a.type = "POST"
			var data = { "registrationId": args.registrationId };
			if (!_.isEmpty(this.Uuid)) {
				data.uuid = this.Uuid;
				if (!_.isEmpty(this.TrackingID)) {
					data.trackingid = this.TrackingID;
				}
			}

			a.data = JSON.stringify(data);
			return $.ajax(a);
		},
		// ユーザの退会処理を実行する
		deleteUser: function(password) {
			var a = {};
			a.url = this.rootUrl + "/user/delete";
			a.headers = this.getAjaxAuthHeaders();
			a.type = "POST"
			var data = { password: password };
			a.data = JSON.stringify(data);
			return $.ajax(a);
		},
		getPayment4gToken: function(args) {
			var a = {}
			a.url = 'https://api.veritrans.co.jp/4gtoken';
			a.headers = this.getAjaxAuthHeaders();
			a.type = "POST"
			var data = {
				card_number: args.card_number,
				card_expire: args.card_expire,
				security_code: args.security_code,
				token_api_key: AppConf.passTicket.tokenApiKey,
				lang: 'ja',
			};
			a.data = JSON.stringify(data);
			return $.ajax(a);
		},
		paymentPurchase: function(args) {
			var a = {}
			a.url = this.rootUrl + "/payments/purchase";
			a.headers = this.getAjaxAuthHeaders();
			a.type = "POST"
			var data = {
				token: args.token,
				tokenExpireDate: args.tokenExpireDate,
				cardNumber: args.cardNumber,
				productCd: args.productCd,
				amount: 1,
				useRepurchase: args.useRepurchase,
			};
			a.data = JSON.stringify(data);
			return $.ajax(a);
		},
		paymentRepurchase: function(args) {
			var a = {}
			a.url = this.rootUrl + "/payments/rePurchase";
			a.headers = this.getAjaxAuthHeaders();
			a.type = "POST"
			var data = {
				securityCode: args.securityCode,
				productCd: args.productCd,
				amount: 1,
				useRepurchase: args.useRepurchase,
			};
			a.data = JSON.stringify(data);
			return $.ajax(a);
		},
		useCouponHitap: function(args) {
			var a = {}
			a.url = this.rootUrl + "/hitap/coupon/use";
			a.headers = this.getAjaxAuthHeaders();
			a.type = "POST";
			a.data = JSON.stringify({
				"point": args.point,
				"device": args.device,
				"ratio": args.ratio,
				"orientation": args.orientation,
				"couponId": args.couponId,
				"uCoupId": args.uCoupId
			});
			return $.ajax(a);
		},
		useCouponVerifiedHitap: function(args) {
			var a = {}
			a.url = this.rootUrl + "/hitap/coupon/use_verified";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST";
			a.data = JSON.stringify({
				"shopId": args.shopId,
				"uCoupId": args.uCoupId,
				"couponId": args.couponId,
				"hitapCode": args.hitapCode,
				"securityCode": args.securityCode,
				"useButtonFlg": args.useButtonFlg
			});
			return $.ajax( a );	
		},
		// 空メール送信APIを叩く
		sendBlankmail: function( blankMailId, email ){
			var a = {};
			a.url = this.rootUrl + "/blankmail/send";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = { "blankMailId": blankMailId , "address": email};
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		loginByLine: function(idToken) {
			var a = {};
			a.url = this.rootUrl + "/line/auth/login";
			a.type = "POST"
			a.headers = this.getAjaxAuthHeaders();
			var data = { idToken: idToken};
			a.data = JSON.stringify( data );
			return $.ajax(a);
		},
		// camera QRcode
		getQRCode: function( args ){
			var a = {}
			a.url = this.rootUrl + "/qr/read";
			a.headers= this.getAjaxAuthHeaders();
			a.type = "POST"
			a.data = JSON.stringify({ "code": args.code });
			return $.ajax( a );
		},
	};
	return BtApi;

})();

}).call(this,require("buffer").Buffer)
},{"buffer":4}],233:[function(require,module,exports){
/**
 * レスポンスデータを有効期限付きでキャッシュする仕組み
 */

var Backbone = require('backbone');
var moment = require("moment");
module.exports = (function () {

	var CacheUtil = {
		responseCache: function(cls, key, expire){
			// キャッシュ用のロジックを入れてBackbone.syncをオーバーライドする
			var originalSync = cls.sync;
			cls.sync = function(method, model, options) {
				if (method === "read") {
					// 通信成功時のコールバック関数をコピー
					var originalSuccess = options.success;

					var cache = App.util.storage.getStorage(key);
					if (cache !== undefined) {
						// localStorage内の検索を行い、キャッシュデータを使って処理を継続させる
						var CacheModel = Backbone.Model.extend({
							localStorage: new Backbone.LocalStorage(AppConf.core.localStorageKey),
							id: key,
						});
						var cacheModel = new CacheModel();
						options.success = function(collection) {
							originalSuccess(cache);
						};
						return originalSync(method, cacheModel, options);
					} else {
						// キャッシュがなければオリジナルのBackbone.syncでAPI通信を行う
						// さらにレスポンスを保存してから成功時のコールバックを呼び出すよう上書き
						options.success = function(collection) {
							App.util.storage.setStorage(key, collection, expire);
							originalSuccess(collection);
						};
						return originalSync(method, model, options);
					}
				} else {
					// read 以外のsave等はキャッシュしないためオリジナルのBackbone.syncを呼び出す
					return originalSync(method, model, options);
				}
			};
		},
		clearCache: function(key){
			App.util.storage.remove(key);
		},
	};
	return CacheUtil;
})();

},{"backbone":"5kFNoY","moment":"iROhDJ"}],234:[function(require,module,exports){
module.exports = (function () {
    var CommonUtil = {
        loadSlick: function(el){
			var _this = this;
            el.on('init', function(event, slick){
				_this.$el.removeClass('cS-hidden');
				if(slick.slideCount > 10){
					$('.page-center .paging-region li').eq(8).addClass('dot_small_1');
					$('.page-center .paging-region li').eq(9).addClass('dot_small_2');
				} else {
					$('.page-center .paging-region').width(slick.slideCount*12);
				}
			})
			.slick({
				centerMode: true,
				centerPadding: '25px',
				autoplay: false,
				// autoplaySpeed: AppConf.slideshow.autoplaySpeed,
				accessibility: false,
				// speed: AppConf.slideshow.speed,
				arrows: true, 
				dots: true,
				infinite: false,
				customPaging: function(slider, i) {
				  return '<span class="dot"></span>';
				},
				prevArrow: '<span data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">&lt;</span>',
				nextArrow: '<span data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">&gt;</span>',
				appendDots: $(".page-center .paging-region")
			})
			.on('afterChange', function(event, slick, currentSlide){
				if(slick.slideCount > 10){
					var idx = currentSlide;
					var slideCount = slick.slideCount;
					$('.page-center .paging-region li.dot_small_1').removeClass('dot_small_1');
					$('.page-center .paging-region li.dot_small_2').removeClass('dot_small_2');
					if( idx >= 4){
						if(slideCount - 5 > idx){
							var position = (idx - 4) * 12;
							$('.slick-dots').css("transform", "translateX(-" + position + "px)");
							$('.page-center .paging-region li').eq(idx+4).addClass('dot_small_1');
							$('.page-center .paging-region li').eq(idx+5).addClass('dot_small_2');
							$('.page-center .paging-region li').eq(idx+6).addClass('dot_small_2');
							$('.page-center .paging-region li').eq(idx-3).addClass('dot_small_1');
							$('.page-center .paging-region li').eq(idx-4).addClass('dot_small_2');
							$('.page-center .paging-region li').eq(idx-5).addClass('dot_small_2');
						} else {
							var position = (slideCount - 10) * 12;
							$('.slick-dots').css("transform", "translateX(-" + position + "px)");
							$('.page-center .paging-region li').eq(slideCount-9).addClass('dot_small_1');
							$('.page-center .paging-region li').eq(slideCount-10).addClass('dot_small_2');
						}
					} else if( idx < 4){
						$('.slick-dots').css("transform", "translateX(0px)");
						$('.page-center .paging-region li').eq(8).addClass('dot_small_1');
						$('.page-center .paging-region li').eq(9).addClass('dot_small_2');
					}
				}
			});    
		},
		countActiveFeatureInWallet: function(){
			var walletList = {
				passTicket: AppConf.features.passTicket,
				ticket: AppConf.features.ticket,
				coupon: AppConf.features.coupon
			};
			var featureActive = 0;
			for (var item in walletList) {
				if (walletList.hasOwnProperty(item) && walletList[item] === true) {
					featureActive++;
				}
			};
			return featureActive;
		},
		countActiveFeature: function(){
			var activeFeatures = {
				passTicket: AppConf.features.passTicket,
				ticket: AppConf.features.ticket,
				coupon: AppConf.features.coupon,
				stamp: AppConf.features.stamp,
				point: AppConf.features.point,
			};
			var featureActive = 0;
			for (var item in activeFeatures) {
				if (activeFeatures.hasOwnProperty(item) && activeFeatures[item] === true) {
					featureActive++;
				}
			};
			return featureActive;
		}
    };
	return CommonUtil;
})();
},{}],235:[function(require,module,exports){
/**
 * 雛形アプリにおける日付操作を共通かしたメソッド群を提供
 */

var moment = require("moment");
module.exports = (function () {

	var DateUtil = {
		isToday: function( date ){
			return DateUtil.atSameDate( date, new Date() );
		},
		atSameDate: function(date1, date2){
			var format = "YYYYMMDD";
			return moment(date1).format(format) === moment(date2).format(format);
		}
	};
	return DateUtil;
})();

},{"moment":"iROhDJ"}],236:[function(require,module,exports){
/**
 * 雛形アプリにおけるでバッグ用メソッド郡を提供
 */
module.exports = (function () {

	var DebugUtil = {
		log: function( arg ){
			if( !AppConf.core.debug ) return;
			console.log( arg );
		},
	}; 

	return DebugUtil;

})();

},{}],237:[function(require,module,exports){
/**
 * 有効期限付きでObjectデータをlocalStorageへ保存する仕組み
 */

var moment = require("moment");
module.exports = (function () {

	var StorageUtil = {
		setStorage: function(key, value, expire){
			try {
				expire = isNaN(expire) ? 0 : expire;
				expire = (new Date).getTime() + expire * 1000;
				var data = {
					expire: expire,
					value: JSON.stringify(value)
				};
				localStorage.setItem(AppConf.core.localStorageKey + '-' + key, JSON.stringify(data));
			} catch(e){
			}
		},
		getStorage: function(key){
			try {
				var data = localStorage[AppConf.core.localStorageKey + '-' + key];
				if (data === undefined) {
					return undefined;
				}
				data = JSON.parse(data);
				if (data.expire > (new Date).getTime()) {
					return JSON.parse(data.value);
				} else {
					localStorage.removeItem(AppConf.core.localStorageKey + '-' + key);
					return undefined;
				}
			} catch(e){
				return undefined;
			}
		},
		remove: function(key){
			try {
				localStorage.removeItem(AppConf.core.localStorageKey + '-' + key);
			} catch(e){
			}
		},
		removeMember: function(){
			try {
				localStorage.removeItem('data-temp');
				localStorage.removeItem('data-temp-' + AppConf.core.localStorageKey);
			} catch(e){
			}
		},
	};
	return StorageUtil;
})();

},{"moment":"iROhDJ"}],238:[function(require,module,exports){
/**
 * 雛形アプリにおけるスタイル操作を共通かしたメソッド群を提供
 * 主に template.css に対応したスタイルを付与するメソッドで構成
 */
module.exports = (function () {

	var StyleUtil = {
		toActive: function( $target ){
			$target.addClass("active");
		},
		toInactive: function( $target ){
			$target.removeClass("active");
		},
	};

	return StyleUtil;

})();

},{}],239:[function(require,module,exports){
var moment = require('moment');
var UserModel = require('../models/user_model.js');

module.exports = (function () {
	// debounce function that will wrap our event
	function debounce(fn, delay) {
		// maintain a timer
		var timer = null;
		// closure function that has access to timer
		return function() {
			// get the scope and parameters of the function 
			// via 'this' and 'arguments'
			var context = this;
			var args = arguments;
			// if event is called, clear the timer and start over
			clearTimeout(timer);
			timer = setTimeout(function() {
				fn.apply(context, args);
			}, delay);
		}
	}

	var TextUtil = {
		nl2br: function(str){
			if(!str) return "";
			return str.replace(/\r\n/g, "<br />").replace(/(\n|\r)/g, "<br />");
		}, 
		numberWithDelimiter: function( number ){
			return String(number).toString().replace(/(\d)(?=(\d\d\d)+$)/g , '$1,');
		},
		cardnumWithDelimiter: function( cardnum, delimiter){
			if (!_.isString(cardnum)) {
				return '登録されていません';
			}
			if(!delimiter){
				delimiter = ' ';
			}
			return String(cardnum).toString().replace(/(\d)(?=(\d\d\d\d)+$)/g, '$1' + delimiter);
		},
		formatDate: function(dateTime){
			return moment(dateTime).format('YYYY/MM/DD');
		},
		formatExpireDate: function(number, dateTime){
			if (number == 0 || !_.isNumber(dateTime)) {
				return '';
			}
			return '(有効期限：' + this.formatDate(dateTime) + ')';
		},
		addUrlParameters: function(url, params){
			if (params instanceof Array) {
				url += (url.indexOf('?') == -1) ? '?':'&';
				url += params.join('&');
			}
			return url;
		},
		setValue: function( param ) {
      		return !_.isUndefined(param) ? param.value : null;
		},
		formatInputText: function(cardnum, delimiter) {
			var regex = new RegExp(delimiter, 'g');
			cardnum = cardnum.replace(regex, '');
			var countDelimiter = Math.ceil(cardnum.length / 4) - 1;
			var arrCardNum = cardnum.split('');
			for (var i = 1; i <= countDelimiter; i++) {
				arrCardNum.splice(i * 4 + i - 1, 0, delimiter); // i - 1 is position after insert delimiter
			}
			return arrCardNum.join('');
		},isStartwithArray: function(deviceName, patterns) {
			var isStartwithArray = false;

			if (_.isEmpty(deviceName) || _.isEmpty(patterns)) {
				return isStartwithArray;
			}
			if (patterns instanceof Array) {
				for (var i = 0; i < patterns.length; i++) {
					var pattern = patterns[i] + "";
					if (_.isEmpty(pattern)) {
						continue;
					}
					if (deviceName.indexOf(pattern) == 0) {
						isStartwithArray = true;
						//						console.log("isStartwithArray: true");
						break;
					}
				}
			}
			return isStartwithArray;
		},
		padStart: function(srcstr, targetLength, padString) {
			targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
			padString = String(typeof padString !== 'undefined' ? padString : ' ');
			if (this.length >= targetLength) {
				return srcstr;
			} else {
				targetLength = targetLength - srcstr.length;
				if (targetLength > padString.length) {
					padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
				}
				return padString.slice(0, targetLength) + srcstr;
			}
		},
		processOpenLink: function(url, webviewFlg) {
			url = url || '';
			if (!url) {
				return;
			}
			var _this = this;
			var reg = /\$\$\{(.*?)}/g; //example $${メールアドレス}
			var result = reg.exec(url);
			if (result && result.length) {
				var userModel = new UserModel();
				App.util.bindProgressScreen(userModel, userModel);

				userModel.fetchWithAuthInfo().done(function() {
					var member = userModel.get("member")[0]
					if (!member) {
						return applican.notification.alert("ユーザ情報の取得に失敗しました。一度ログアウトして、ログインし直してください。", function() { }, "", "OK");
					}
					url = _this.replaceTagColumnName(member, url);
					if (webviewFlg === "1" || url.indexOf("launch_webview=yes") > -1) {
						App.util.text.openWindow(url);
					} else if(url.indexOf("launch_browser=yes") > -1) {
						App.util.text.openWindow(url, true);
					} else {
						location.href = url;
					}
				});
			} else {
				if (webviewFlg === "1" || url.indexOf("launch_webview=yes") > -1) {
					App.util.text.openWindow(url);
				} else if(url.indexOf("launch_browser=yes") > -1) {
					App.util.text.openWindow(url, true);
				} else {
					location.href = url;
				}
			}
		},
		replaceTagColumnName: function(member, url) {
			var reg = /\$\$\{(.*?)}/g
			var arrTags;
			while (arrTags = reg.exec(url)) {
				if (arrTags[1]) {
					var obj = _.findWhere(member.extras, { name: arrTags[1] });
					if(arrTags[1] == "smid"){
						obj = { value: member.seamlessparam };
					}
					if (obj) {
						var re = new RegExp(this.RegExpQuote(arrTags[0]), "gi");
						url = url.replace(re, obj.value);
					}
				}
			}
			return url;
		},
		RegExpQuote: function(str) {
			return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
		},
		// open browser: external = true 
		// open webview: external = false 
		openWindow: function(url,external){
			external = external || false;
			url = url || '';
			if (!url) {
				return;
			}
			liff.openWindow({
				url: url,
				external: external
			});
		},
		alertMaintenance: debounce(function(msg) {
			applican.notification.alert(msg ? msg : AppConf.message.maintenance, function() { }, AppConf.message.information, AppConf.message.yes);
		}, 500)
	};
	return TextUtil;

})();

},{"../models/user_model.js":222,"moment":"iROhDJ"}],240:[function(require,module,exports){
var Backbone = require('backbone');
var CommonEmptyView = require('./common_empty_view.js');
module.exports = (function () {
	var BaseCollectionView = Backbone.Marionette.CollectionView.extend({
		emptyView: CommonEmptyView
	});
	return BaseCollectionView;
})();

},{"./common_empty_view.js":242,"backbone":"5kFNoY"}],241:[function(require,module,exports){
var Backbone = require('backbone');
var CommonEmptyView = require('./common_empty_view.js');
module.exports = (function () {
	var BaseCompositeView = Backbone.Marionette.CompositeView.extend({
		emptyView: CommonEmptyView
	});
	return BaseCompositeView;
})();

},{"./common_empty_view.js":242,"backbone":"5kFNoY"}],242:[function(require,module,exports){
// データが存在しない場合に表示する共通のViewクラス
// See emptyView options of Marionette.CollectionView  
// https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.collectionview.md#collectionviews-emptyview
var Backbone = require('backbone');
module.exports = (function () {
	var CommonEmptyView = Backbone.Marionette.ItemView.extend({
		template: require("./common_empty_view_template.html"),
		initialize: function(options){
		},
	});
	return CommonEmptyView;
})();

},{"./common_empty_view_template.html":243,"backbone":"5kFNoY"}],243:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="emptyView ftcolor1">データがありません</div>\r\n';
}
return __p;
};

},{}],244:[function(require,module,exports){
var Backbone = require('backbone');
var SlideCardItemView = require('./slidecard_item_view');
module.exports = (function() {
	var SlideCardCollectionView = Backbone.Marionette.CollectionView.extend({
		childView: SlideCardItemView,
		className: "card-slide-container cS-hidden",
		initialize: function(options) {
			// this.collection.bind("sync", this.slick, this);
		},
		initSlick: function(){
			App.util.common.loadSlick.bind(this, $('.page-center .card-region'))();
		}
	});
	return SlideCardCollectionView;
})();

},{"./slidecard_item_view":245,"backbone":"5kFNoY"}],245:[function(require,module,exports){
var Backbone = require('backbone');
var moment = require('moment');
module.exports = (function() {
	var SlideCardItemView = Backbone.Marionette.ItemView.extend({
		className: "card-slide-item",
		template: require('./slidecard_template.html'),
		ui: {
			"couponItem": '.coupon-item'
		},
		events: function() {
			var iosEvent = {
				'touchend @ui.couponItem': 'selectCoupon'
			};
			var androidEvent = {
				'click @ui.couponItem': 'selectCoupon'
			};
			return (applican.config.device_os === "IOS") ? iosEvent : androidEvent;
		},
		templateHelpers: function() {
			var _this = this;
			return {
				formatDate: function(time) {
					var m = moment(time);
					return "<span class='small'> " + m.year() + "</span>" + App.util.text.padStart(m.month() + 1 + "", 2, '0') + "." + App.util.text.padStart(m.date() + "", 2, '0');
				},
				formatTime: function(time) {
					return moment(time).format("HH:mm");
				},
				isDisableUse: function() {
					return !!_this.model.get('disableUse');
				},
				remainDay: function(endDate) {
					var end = moment(endDate);
					var now = moment();
					return (end.diff(now, 'days'));
				},
				hasUsed: function() {
					var flg = false;
					var item = _this.model;
					var isBeforeTerm = _this.isBeforeTerm(item);
					if (item.get('limitCode') != 0 && !isBeforeTerm && item.get('memberOnly') == 1 && item.get('finalUseDate')) {
						flg = true;
					}
					return flg;
				},
				expiresFormat: function( date ){	
					if (AppConf.features.wallet){
						return moment(date).format("YYYY MM.DD");
					} else{
						return moment(date).format("YYYY年MM月DD日");
					}
				},
			};
		},
		isBeforeTerm: function(item) {
			if (!item.get('usePeriodStartDate')) return false; // 日付による期間指定ではない場合
			return Number(new Date()) < item.get('usePeriodStartDate');
		},
		onRender: function() {
			
		},
		selectCoupon: function() {
			// get date item for pass-ticket-detail
			window.passTicketDetailModel = this.model;
		}
	});
	return SlideCardItemView;
})();
},{"./slidecard_template.html":246,"backbone":"5kFNoY","moment":"iROhDJ"}],246:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="card-wrapper coupon-item" data-id="'+
((__t=( id ))==null?'':_.escape(__t))+
'">\n    <div  class="card-item-region">\n        ';
 if(type !== 5){ 
__p+='\n            ';
 if(!canBeUsed && !isBeforeTerm && isMemberOnly){ 
__p+='\n                ';
 if (finalUseCoupon == true){ 
__p+='\n                    <a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'&typeParam=complete" class="card">\n                        <div class="indisable">\n                            <div class="inner">\n                                <span id="triangle-topleft"></span>\n                                <p class="rotate ';
 if (applican.config.device_os === 'ANDROID'){ 
__p+='android_rotate';
}
__p+='">使用済み</p>\n                            </div>\n                        </div>\t\t\t\t\n                ';
 } else { 
__p+='\n                    <div class="disable">\n                        <div class="inner">\n                            <span id="triangle-topleft"></span>\n                            <p class="rotate ';
 if (applican.config.device_os === 'ANDROID'){ 
__p+='android_rotate';
}
__p+='">使用済み</p>\n                        </div>\n                    </div>\n                    <a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'&typeParam=complete" class="card">\n                ';
 } 
__p+='\n            ';
 } else { 
__p+='\n                <a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'" class="card">\n                    ';
 if(isBeforeTerm){ 
__p+='\n                        <div class="BEFORE-TERM-MARK">\n                            <div class="inner">\n                                <span class=""></span>\n                                <p class="rotate ';
 if (applican.config.device_os === 'ANDROID'){ 
__p+='android_rotate';
}
__p+='">期間外</p>\n                            </div>\n                        </div>\n                    ';
 } 
__p+='\n            ';
 } 
__p+='\t\t\t\t\t\t\n        ';
 } else {
__p+='\n            <a href="#pass-ticket-detail/'+
((__t=( id ))==null?'':_.escape(__t))+
'/2" class="card">\n        ';
 } 
__p+='\n            <div class="card-type">\n            ';
 if(couponImageUrl){ 
__p+='\n                ';
 if(textColor && layerTransparency && layerColor){ 
__p+='\n                    <div class="card-detail-wrapper top-half-card" style="\n                        background: url(\''+
((__t=( couponImageUrl ))==null?'':_.escape(__t))+
'\'); \n                        background-size: cover; \n                        color: '+
((__t=( textColor ))==null?'':_.escape(__t))+
';">\n                        <div class="transparency" style="background: '+
((__t=( layerColor ))==null?'':_.escape(__t))+
'; opacity: '+
((__t=( layerTransparency ))==null?'':_.escape(__t))+
'"></div>\n                        <div class="card-detail">\n                            ';
 if(isSpecialUser){ 
__p+='\n                            <p class=\'special-user\'>ゴールドメンバー</p>\n                            ';
 } 
__p+='\n                            <p class=\'discount\'>\n                                <span>'+
((__t=( cardPageTitle ))==null?'':_.escape(__t))+
'</span>\n                                <span class="value">\n                                    '+
((__t=( cardName ))==null?'':_.escape(__t))+
'\n                                </span>\n                            </p>\n                        </div>                        \n                    </div>\n                    <div class="card-detail-wrapper bottom-half-card">\n                        <div class="card-detail">\n                            ';
 if(type !== "1"){ 
__p+='\n                            <div class="expire-date">\n                                <span class="month-date">'+
((__t=( formatDate(expires) ))==null?'':__t)+
'</span>\n                                <p class="expire-date-title">\n                                    <span class="time">'+
((__t=( formatTime(expires) ))==null?'':__t)+
'</span>\n                                    <span class="title">まで有効</span>\n                                </p>\n                                <p class="remain-day"><span>残'+
((__t=( remainDay(expires) ))==null?'':__t)+
'日</span></p>\n                            </div>\n                            ';
 } 
__p+='\n                            <p class="bottom">\n                                '+
((__t=( bottom ))==null?'':_.escape(__t))+
'\n                            </p>\n                        </div>\n                    </div>\n                ';
 } else { 
__p+='\n                    <div class="card-img">\n                        <img src="'+
((__t=( couponImageUrl ))==null?'':__t)+
'">\n                    </div>\n                    <div class="card-img-detail">\n                        <span class="month-date">'+
((__t=( formatDate(expires) ))==null?'':__t)+
'まで有効</span>\n                        <span class="remain-day">残'+
((__t=( remainDay(expires) ))==null?'':__t)+
'日</span>\n                    </div>\n                ';
 } 
__p+='\n            ';
 } else { 
__p+='\n                <div class="card-detail-wrapper top-half-card" style="background: '+
((__t=( titleBackgroundColor ))==null?'':_.escape(__t))+
'; color: '+
((__t=( textColor ))==null?'':_.escape(__t))+
'">\n                    <div class="card-detail">\n                        ';
 if(isSpecialUser){ 
__p+='\n                        <p class=\'special-user\'>ゴールドメンバー</p>\n                        ';
 } 
__p+='\n                        <p class=\'discount\'>\n                            <span>'+
((__t=( cardPageTitle ))==null?'':_.escape(__t))+
'</span>\n                            <span class="value">\n                                '+
((__t=( cardName ))==null?'':_.escape(__t))+
'\n                            </span>\n                        </p>\n                    </div>\n                </div>\n                <div class="card-detail-wrapper bottom-half-card">\n                    <div class="card-detail">\n                        ';
 if(type !== "1"){ 
__p+='\n                        <div class="expire-date">\n                            <span class="month-date">'+
((__t=( formatDate(expires) ))==null?'':__t)+
'</span>\n                            <p class="expire-date-title">\n                                <span class="time">'+
((__t=( formatTime(expires) ))==null?'':__t)+
'</span>\n                                <span class="title">まで有効</span>\n                            </p>\n                            <p class="remain-day"><span>残'+
((__t=( remainDay(expires) ))==null?'':__t)+
'日</span></p>\n                        </div>\n                        ';
 } 
__p+='\n                        <p class="bottom">\n                            '+
((__t=( bottom ))==null?'':_.escape(__t))+
'\n                        </p>\n                    </div>\n                </div>\n            ';
 } 
__p+='\n                ';
 if(isDisableUse()){ 
__p+='\n                <div class="card-disable"><span class="text">有効な定期券がありません</span></div>\n                ';
 } 
__p+='\n                ';
 if(hasUsed()){ 
__p+='\n                <div class="card-disable"><span class="text">本日分は利用済みです。</span></div>\n                ';
 } 
__p+='\t\n            </div>\n            ';
 if(type === "1"){ 
__p+='\n                <div class="ticket-price cf">\n                    <span class="title">価格</span>\n                    <span class="price">\n                        <span class="capacity">'+
((__t=( unitPrice ))==null?'':_.escape(__t))+
'</span>円\n                    </span>\n                </div>\n            ';
 } 
__p+='\n        </a>\n    \n        \n        <div class="btn-block-detail">\n            ';
 if(type !== 5){ 
__p+='\t\n                ';
 if(!canBeUsed && !isBeforeTerm && isMemberOnly){ 
__p+='\t\t\t\t\n                    <a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'&typeParam=complete" class="go-to-detail btbgcolor1 btftcolor1">使用する</a>\t\t\t\t\t\n                ';
 } else { 
__p+='\n                    <a href="#coupon/'+
((__t=( id ))==null?'':__t)+
'?uCoupId='+
((__t=( uCoupId ))==null?'':__t)+
'" class="go-to-detail btbgcolor1 btftcolor1">使用する</a>\t\n                ';
 } 
__p+='\n            ';
 } else { 
__p+='\n                <a href="#pass-ticket-detail/'+
((__t=( id ))==null?'':_.escape(__t))+
'/2" class="go-to-detail btbgcolor1 btftcolor1">使用する</a>\t\n            ';
 } 
__p+='\n        </div>\n    </div>\n</div>';
}
return __p;
};

},{}]},{},[8]);