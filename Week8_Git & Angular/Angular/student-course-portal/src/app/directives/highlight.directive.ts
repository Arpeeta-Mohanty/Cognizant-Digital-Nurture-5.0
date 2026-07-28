import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

// Custom attribute directive: highlights an element on hover
// Usage: <div appHighlight highlightColor="yellow">...</div>
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  // Input allows the parent to pass a custom color
  @Input() highlightColor: string = '#fefcbf';
  @Input() defaultColor: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.defaultColor = this.el.nativeElement.style.backgroundColor || '';
  }

  // HostListener listens to DOM events on the host element
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
    this.el.nativeElement.style.transition = 'background-color 0.3s';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.defaultColor;
  }
}
