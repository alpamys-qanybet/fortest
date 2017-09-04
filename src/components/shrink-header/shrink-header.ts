
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[shrink-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class ShrinkHeader {

  header: any;
  headerHeight: any;
  translateAmt: any;
  opacity: number = 1;

  lastScrollTop: number = 0;
  
  constructor(public element: ElementRef, public renderer: Renderer) {

  }

  ngAfterViewInit() {      
    this.header = document.getElementsByTagName("ion-header")[0];
    this.headerHeight = this.header.clientHeight;

/*
    this.renderer.setStyle(this.header, 'webkitTransformOrigin', 'center bottom');
    this.content.ionScroll.subscribe(function ($event) {
        window.requestAnimationFrame(function () {
            _this.updateElasticHeader();
        });
    });
    window.addEventListener('resize', function () {
        this.headerHeight = this.header.clientHeight;
    }, false);
*/
  }
 
  onContentScroll(ev) {
    /*
    ev.domWrite(() => {
      //this.updateHeader(ev);
      this.updateElasticHeader(ev);
    });
    */

    window.requestAnimationFrame(() => {
      this.updateElasticHeader(ev);
    });
  }

  updateHeader(ev) {

    if (ev.scrollTop >= 0) {
      this.translateAmt = -ev.scrollTop / 2;
      
    } else {
       this.translateAmt =ev.scrollTop / 2;
    }

    this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0)');

  }

  updateElasticHeader(ev) {
    if (this.lastScrollTop <= ev.scrollTop) {
      if (this.translateAmt >= (-this.headerHeight)) {
        this.translateAmt -= (ev.scrollTop - this.lastScrollTop) / 4;
      }
      else {
        this.translateAmt = -this.headerHeight - 12;
        this.opacity = 0;
      }
    }
    else {
      if (this.translateAmt < 0) {
        let result = this.translateAmt + (this.lastScrollTop - ev.scrollTop) / 4;
        if (result > 0) {
          result = 0;
        }
        this.translateAmt = result;
      }
      else {
        this.translateAmt = 0;
      }
    }
    this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0)');
    //this.renderer.setStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0)');
    this.lastScrollTop = ev.scrollTop;
  }


}
