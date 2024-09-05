import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appTooltip]',
  providers: [MatTooltip],
  standalone: true,
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') tooltipText!: string;

  constructor(private matTooltip: MatTooltip) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.matTooltip.message = this.tooltipText;
    this.matTooltip.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.matTooltip.hide();
  }

  ngOnInit() {
    this.matTooltip.position = 'above';
  }
}
