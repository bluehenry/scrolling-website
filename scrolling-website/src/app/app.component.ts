import { Component, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  AfterViewInit {
  @ViewChildren('slides') slides: QueryList<ElementRef>;
  @ViewChildren('dot') dots: QueryList<ElementRef>;
  

  isDarkTheme = false;
  themeChecked: boolean;
  slideIndex = 1;
  rendere: Renderer2

  constructor(overlayContainer: OverlayContainer, rendere: Renderer2) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    this.rendere = rendere;
  }

  ngAfterViewInit() {
    this.showSlides(this.slideIndex);
  }

  toggleTheme() {    
    this.isDarkTheme = !this.isDarkTheme;
  }

  // Next/previous controls
  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  // Thumbnail image controls
  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

  // currentSlide() {
  //   this.showSlides(2);
  // }

  showSlides(n: number) {   
    if (n > this.slides.length ) {
      this.slideIndex = 1;
    } 
    
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    this.slides.forEach(slide => this.rendere.setStyle(slide.nativeElement, "display", "none"));
    this.dots.forEach(dot => this.rendere.removeClass(dot.nativeElement, "active"));
    
    let slideElement = this.slides.toArray();
    this.rendere.setStyle(slideElement[this.slideIndex-1].nativeElement, "display", "block");
    
    let dotsElement = this.dots.toArray();
    this.rendere.addClass(dotsElement[this.slideIndex-1].nativeElement, "active");    
  }
}
