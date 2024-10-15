import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appTooltip]',
  providers: [MatTooltip],
  standalone: true,
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') public tooltipText!: string;

  constructor(private matTooltip: MatTooltip) {}

  @HostListener('mouseenter') public onMouseEnter(): void {
    this.matTooltip.message = this.tooltipText;
    this.matTooltip.show();
  }

  @HostListener('mouseleave') public onMouseLeave(): void {
    this.matTooltip.hide();
  }

  public ngOnInit(): void {
    this.matTooltip.position = 'above';
  }
}
